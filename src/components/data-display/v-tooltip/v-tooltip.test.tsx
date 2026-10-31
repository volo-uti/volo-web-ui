import { createRef } from "react";
import { act, fireEvent } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, waitFor, axeTest } from "../../../test-utils";
import { VTooltip } from "./v-tooltip";

describe("VTooltip", () => {
  it("renders the children", () => {
    renderWithTheme(
      <VTooltip message="Tooltip text">
        <button>Hover me</button>
      </VTooltip>,
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("hides the tooltip initially", () => {
    renderWithTheme(
      <VTooltip message="Hidden">
        <button>Button</button>
      </VTooltip>,
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows the tooltip on mouse hover", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VTooltip message="Visible" waitDuration={0}>
        <button>Hover</button>
      </VTooltip>,
    );
    await user.hover(screen.getByText("Hover"));
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
    expect(screen.getByText("Visible")).toBeInTheDocument();
  });

  it("hides the tooltip on mouse leave", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VTooltip message="Gone" waitDuration={0}>
        <button>Hover</button>
      </VTooltip>,
    );
    await user.hover(screen.getByText("Hover"));
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
    await user.unhover(screen.getByText("Hover"));
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it("merges className", () => {
    const { container } = renderWithTheme(
      <VTooltip message="Tip" className="custom-tooltip">
        <button>B</button>
      </VTooltip>,
    );
    expect(container.querySelector(".v-tooltip")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <VTooltip ref={ref} message="Ref">
        <button>B</button>
      </VTooltip>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("shows the tooltip on focus and closes it on Escape", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VTooltip message="Focus tip" waitDuration={0} showDuration={0}>
        <button>Focus</button>
      </VTooltip>,
    );
    await user.tab();
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeInTheDocument());
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("calls the user onMouseEnter and opens the tooltip", async () => {
    const onMouseEnter = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VTooltip message="Both" waitDuration={0} onMouseEnter={onMouseEnter}>
        <button>Hover</button>
      </VTooltip>,
    );
    await user.hover(screen.getByText("Hover"));
    expect(onMouseEnter).toHaveBeenCalled();
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeInTheDocument());
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(
      <VTooltip message="Accessible tip">
        <button>Accessible</button>
      </VTooltip>,
    );
    await axeTest(container);
  });
});

describe("VTooltip regressions", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not show after the pointer left when hover and focus both scheduled it", () => {
    vi.useFakeTimers();
    renderWithTheme(
      <VTooltip message="Tip">
        <button type="button">btn</button>
      </VTooltip>,
    );
    const button = screen.getByText("btn");
    const wrapper = button.parentElement!;

    act(() => {
      fireEvent.mouseEnter(wrapper);
    });
    act(() => {
      button.focus();
    });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    act(() => {
      fireEvent.mouseLeave(wrapper);
      button.blur();
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("closes after leaving even when showDuration is 0", () => {
    vi.useFakeTimers();
    renderWithTheme(
      <VTooltip message="Tip" showDuration={0}>
        <button type="button">btn</button>
      </VTooltip>,
    );
    const button = screen.getByText("btn");
    const wrapper = button.parentElement!;

    act(() => {
      fireEvent.mouseEnter(wrapper);
    });
    act(() => {
      button.focus();
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    act(() => {
      fireEvent.mouseLeave(wrapper);
      button.blur();
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("keeps the tooltip when the pointer re-enters within the hide delay", () => {
    vi.useFakeTimers();
    renderWithTheme(
      <VTooltip message="Tip" waitDuration={0} showDuration={0}>
        <button type="button">btn</button>
      </VTooltip>,
    );
    const button = screen.getByText("btn");
    const wrapper = button.parentElement!;

    act(() => {
      fireEvent.mouseEnter(wrapper);
    });
    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(wrapper);
    });
    act(() => {
      vi.advanceTimersByTime(50);
      fireEvent.mouseEnter(wrapper);
    });
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("describes the trigger with the tooltip while it is visible", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VTooltip message="Save changes" waitDuration={0}>
        <button type="button" aria-describedby="hint">
          Save
        </button>
      </VTooltip>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("aria-describedby", "hint");

    await user.hover(button);
    const tooltip = await screen.findByRole("tooltip");
    expect(button.getAttribute("aria-describedby")).toBe(`hint ${tooltip.id}`);
    expect(button).toHaveAccessibleDescription(/Save changes/);
  });
});
