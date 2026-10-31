import { act } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { ThemeProvider } from "../../../theme";
import { VToaster, toast } from "./v-toast";

describe("VToaster + toast()", () => {
  afterEach(() => {
    // Reset the global toast store: dismiss every visible toast
    const buttons = document.querySelectorAll('[aria-label="Dismiss toast"]');
    buttons.forEach((btn) => {
      act(() => {
        (btn as HTMLElement).click();
      });
    });
    cleanup();
  });

  it("renders VToaster (null when there are no toasts)", () => {
    const { container } = renderWithTheme(<VToaster />);
    expect(container.querySelector(".v-toaster")).not.toBeInTheDocument();
  });

  it("renders the viewport under document.body and marks it data-v-inert-ignore", () => {
    const { container } = renderWithTheme(<VToaster />);
    act(() => {
      toast.success("Portaled");
    });
    const viewport = screen.getByText("Portaled").closest(".v-toaster") as HTMLElement;
    expect(container).not.toContainElement(viewport);
    expect(viewport.parentElement).toBe(document.body);
    expect(viewport).toHaveAttribute("data-v-inert-ignore");
  });

  it("renders nothing on the server", () => {
    const html = renderToString(
      <ThemeProvider>
        <VToaster />
      </ThemeProvider>,
    );
    expect(html).toBe("");
  });

  it("shows a toast when toast.success() is called", async () => {
    renderWithTheme(<VToaster />);
    act(() => {
      toast.success("Saved!");
    });
    expect(screen.getByText("Saved!")).toBeInTheDocument();
  });

  it("shows a toast when toast.error() is called", async () => {
    renderWithTheme(<VToaster />);
    act(() => {
      toast.error("Something went wrong");
    });
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("shows a toast when toast.info() is called", async () => {
    renderWithTheme(<VToaster />);
    act(() => {
      toast.info("FYI");
    });
    expect(screen.getByText("FYI")).toBeInTheDocument();
  });

  it("shows a toast when toast.warning() is called", async () => {
    renderWithTheme(<VToaster />);
    act(() => {
      toast.warning("Be careful");
    });
    expect(screen.getByText("Be careful")).toBeInTheDocument();
  });

  it("removes the toast when the dismiss button is clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VToaster />);
    act(() => {
      toast.success("Dismiss me");
    });
    expect(screen.getByText("Dismiss me")).toBeInTheDocument();
    await user.click(screen.getByLabelText("Dismiss toast"));
    expect(screen.queryByText("Dismiss me")).not.toBeInTheDocument();
  });

  it("removes a toast programmatically with toast.dismiss()", () => {
    renderWithTheme(<VToaster />);
    let id: string;
    act(() => {
      id = toast.success("Remove me");
    });
    expect(screen.getByText("Remove me")).toBeInTheDocument();
    act(() => {
      toast.dismiss(id);
    });
    expect(screen.queryByText("Remove me")).not.toBeInTheDocument();
  });

  it("shows a clickable action button", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VToaster />);
    act(() => {
      toast.success("With action", { action: { label: "Undo", onClick } });
    });
    expect(screen.getByText("Undo")).toBeInTheDocument();
    await user.click(screen.getByText("Undo"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('sets role="status" and aria-live', () => {
    renderWithTheme(<VToaster />);
    act(() => {
      toast.default("Status toast");
    });
    const toastEl = screen.getByText("Status toast").closest('[role="status"]');
    expect(toastEl).toBeInTheDocument();
    expect(toastEl).toHaveAttribute("aria-live", "polite");
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VToaster />);
    act(() => {
      toast.success("A11y test");
    });
    expect(screen.getByText("A11y test")).toBeInTheDocument();
    await axeTest(container);
  });
  it("disappears after duration and stays when it is 0", () => {
    vi.useFakeTimers();
    renderWithTheme(<VToaster />);
    act(() => {
      toast.info("short", { duration: 1000 });
      toast.info("sticky", { duration: 0 });
    });
    expect(screen.getByText("short")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByText("short")).not.toBeInTheDocument();
    expect(screen.getByText("sticky")).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("returns an ID from toast and closes it with dismiss(id)", () => {
    renderWithTheme(<VToaster />);
    let id = "";
    act(() => {
      id = toast.default("hello");
    });
    expect(screen.getByText("hello")).toBeInTheDocument();
    act(() => toast.dismiss(id));
    expect(screen.queryByText("hello")).not.toBeInTheDocument();
  });

  it("calls action.onClick and closes the toast when the action is clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VToaster />);
    act(() => {
      toast.success("saved", { action: { label: "Undo", onClick } });
    });
    await user.click(screen.getByRole("button", { name: "Undo" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("saved")).not.toBeInTheDocument();
  });

  it("accepts native div attributes and position on VToaster", () => {
    renderWithTheme(<VToaster position="top-left" data-testid="toaster" />);
    act(() => {
      toast.info("x");
    });
    expect(screen.getByTestId("toaster").className).toContain("top-4 left-4");
  });
});

describe("toast duration", () => {
  afterEach(() => {
    vi.useRealTimers();
    act(() => {
      document.querySelectorAll('[aria-label="Dismiss toast"]').forEach((btn) => {
        (btn as HTMLElement).click();
      });
    });
    cleanup();
  });

  it("keeps a toast with an infinite duration until it is dismissed", () => {
    vi.useFakeTimers();
    renderWithTheme(<VToaster />);
    act(() => {
      toast.info("sticky", { duration: Infinity });
    });
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(screen.getByText("sticky")).toBeInTheDocument();
  });

  it("still removes a toast with a finite duration", () => {
    vi.useFakeTimers();
    renderWithTheme(<VToaster />);
    act(() => {
      toast.info("brief", { duration: 1000 });
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByText("brief")).not.toBeInTheDocument();
  });
});
