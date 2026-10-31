import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, useState } from "react";
import { fireEvent } from "@testing-library/react";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VSnackbar } from "./v-snackbar";

describe("VSnackbar", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders by default", () => {
    renderWithTheme(<VSnackbar content="hello" />);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VSnackbar content="hello" className="custom" />);
    const inner = container.querySelector(".custom");
    expect(inner).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VSnackbar ref={ref} content="hello" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("does not render when visible=false", () => {
    renderWithTheme(<VSnackbar content="hello" visible={false} />);
    expect(screen.queryByText("hello")).not.toBeInTheDocument();
  });

  it("calls action.onClick when the action button is clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VSnackbar content="hello" action={{ label: "Undo", onClick }} />);
    await user.click(screen.getByRole("button", { name: "Undo" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClose after duration", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    renderWithTheme(<VSnackbar content="hello" duration={1000} onClose={onClose} />);
    act(() => {
      vi.advanceTimersByTime(999);
    });
    expect(onClose).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close automatically when duration=0", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    renderWithTheme(<VSnackbar content="hello" duration={0} onClose={onClose} />);
    act(() => {
      vi.advanceTimersByTime(60000);
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders as a rounded card when behavior="floating"', () => {
    const { container } = renderWithTheme(
      <VSnackbar content="hello" behavior="floating" className="inner" />,
    );
    expect(container.querySelector(".inner")?.className).toContain("rounded");
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VSnackbar content="hello" duration={0} />);
    await axeTest(container);
  });
});

describe("VSnackbar timers and handlers", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  const swipe = (inner: Element) => {
    fireEvent.pointerDown(inner, { clientX: 0, clientY: 0 });
    fireEvent.pointerMove(inner, { clientX: 200, clientY: 0 });
    fireEvent.pointerUp(inner);
  };

  it("keeps its auto-dismiss timer when the parent re-renders with an inline onClose", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    function App() {
      const [n, setN] = useState(0);
      return (
        <>
          <button type="button" onClick={() => setN(n + 1)}>
            tick
          </button>
          <VSnackbar content="hi" duration={1000} onClose={() => onClose(n)} />
        </>
      );
    }
    renderWithTheme(<App />);
    for (let i = 0; i < 5; i++) {
      act(() => {
        vi.advanceTimersByTime(400);
      });
      fireEvent.click(screen.getByText("tick"));
    }
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls the latest onClose when the timer fires", () => {
    vi.useFakeTimers();
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = renderWithTheme(
      <VSnackbar content="hi" duration={1000} onClose={first} />,
    );
    rerender(<VSnackbar content="hi" duration={1000} onClose={second} />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose after unmount during the swipe exit", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    const { unmount, container } = renderWithTheme(
      <VSnackbar content="hi" duration={0} onClose={onClose} />,
    );
    swipe(container.querySelector(".v-snackbar > div") as Element);
    unmount();
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose once when the timer would fire during the swipe exit", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    const { container } = renderWithTheme(
      <VSnackbar content="hi" duration={1000} onClose={onClose} />,
    );
    act(() => {
      vi.advanceTimersByTime(900);
    });
    swipe(container.querySelector(".v-snackbar > div") as Element);
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose once when the timer fires first and a swipe follows", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    const { container } = renderWithTheme(
      <VSnackbar content="hi" duration={1000} onClose={onClose} />,
    );
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    swipe(container.querySelector(".v-snackbar > div") as Element);
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("keeps swiping when the user passes pointer handlers, and calls them too", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    const onPointerDown = vi.fn();
    const onPointerMove = vi.fn();
    const onPointerUp = vi.fn();
    const { container } = renderWithTheme(
      <VSnackbar
        content="hi"
        duration={0}
        onClose={onClose}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />,
    );
    const inner = container.querySelector(".v-snackbar > div") as HTMLElement;
    fireEvent.pointerDown(inner, { clientX: 0, clientY: 0 });
    fireEvent.pointerMove(inner, { clientX: 200, clientY: 0 });
    expect(inner.style.transform).toContain("translateX");
    fireEvent.pointerUp(inner);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(onPointerDown).toHaveBeenCalledTimes(1);
    expect(onPointerMove).toHaveBeenCalled();
    expect(onPointerUp).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("merges a user style with the swipe transform", () => {
    const { container } = renderWithTheme(
      <VSnackbar content="hi" duration={0} style={{ color: "red" }} />,
    );
    const inner = container.querySelector(".v-snackbar > div") as HTMLElement;
    expect(inner.style.color).toBe("red");
    fireEvent.pointerDown(inner, { clientX: 0, clientY: 0 });
    fireEvent.pointerMove(inner, { clientX: 50, clientY: 0 });
    expect(inner.style.color).toBe("red");
    expect(inner.style.transform).toContain("translateX");
  });
});
