import { createRef, type ReactNode } from "react";
import { act, fireEvent } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, waitFor, axeTest } from "../../../test-utils";
import { VButton } from "../../inputs/v-button";
import { VHoverCard } from "./v-hover-card";

describe("VHoverCard", () => {
  it("renders the trigger", () => {
    renderWithTheme(
      <VHoverCard content={<p>Card content</p>}>
        <span>trigger</span>
      </VHoverCard>,
    );
    expect(screen.getByText("trigger")).toBeInTheDocument();
  });

  it("hides the hover card content initially", () => {
    renderWithTheme(
      <VHoverCard content={<p>Hidden</p>}>
        <span>trigger</span>
      </VHoverCard>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows the hover card on click", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard content={<p>Visible</p>} openDelay={0}>
        <span>trigger</span>
      </VHoverCard>,
    );
    await user.click(screen.getByText("trigger"));
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
    expect(screen.getByText("Visible")).toBeInTheDocument();
  });

  it("keeps a hover-opened card open when the trigger is clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard content={<p>Stay</p>} openDelay={0}>
        <span>trigger</span>
      </VHoverCard>,
    );
    await user.click(screen.getByText("trigger"));
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
    await user.click(screen.getByText("trigger"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("closes after closeDelay when the pointer leaves", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard content={<p>Leave</p>} openDelay={0} closeDelay={0}>
        <span>trigger</span>
      </VHoverCard>,
    );
    await user.hover(screen.getByText("trigger"));
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    await user.unhover(screen.getByText("trigger"));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard content={<p>Escape me</p>} openDelay={0}>
        <span>trigger</span>
      </VHoverCard>,
    );
    await user.click(screen.getByText("trigger"));
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("opens and closes on Enter", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard content={<p>Keyboard</p>} openDelay={0}>
        <span>trigger</span>
      </VHoverCard>,
    );
    // Focus the trigger button
    await user.tab();
    await user.keyboard("{Enter}");
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
    await user.keyboard("{Enter}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("opens on Space", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard content={<p>Space</p>} openDelay={0}>
        <span>trigger</span>
      </VHoverCard>,
    );
    await user.tab();
    await user.keyboard(" ");
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it("toggles aria-expanded", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    renderWithTheme(
      <VHoverCard content={<p>ARIA</p>} openDelay={0}>
        <span>trigger</span>
      </VHoverCard>,
    );
    const triggerBtn = screen.getByRole("button");
    expect(triggerBtn).toHaveAttribute("aria-expanded", "false");
    await user.click(triggerBtn);
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(triggerBtn).toHaveAttribute("aria-expanded", "true");
    });
    // It can also be opened and closed with the keyboard.
    await user.unhover(triggerBtn);
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    triggerBtn.focus();
    await user.keyboard("{Enter}");
    await waitFor(() => expect(triggerBtn).toHaveAttribute("aria-expanded", "true"));
  });

  it('sets aria-haspopup="dialog"', () => {
    renderWithTheme(
      <VHoverCard content={<p>ARIA</p>}>
        <span>trigger</span>
      </VHoverCard>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("reflects semanticLabel in the dialog aria-label", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard content={<p>Info</p>} semanticLabel="User profile" openDelay={0}>
        <span>trigger</span>
      </VHoverCard>,
    );
    await user.click(screen.getByText("trigger"));
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "User profile");
    });
  });

  it("does not focus the trigger or open on hover when disabled", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard content={<p>Off</p>} openDelay={0} disabled>
        <span>trigger</span>
      </VHoverCard>,
    );
    expect(screen.getByRole("button")).not.toHaveAttribute("tabindex");
    await user.hover(screen.getByText("trigger"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(
      <VHoverCard content={<p>Content</p>} className="custom">
        <span>trigger</span>
      </VHoverCard>,
    );
    expect(container.firstChild).toHaveClass("v-hover-card", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <VHoverCard ref={ref} content={<p>Ref</p>}>
        <span>trigger</span>
      </VHoverCard>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("limits content to max-w-[320px]", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard content={<p>Width check</p>} openDelay={0}>
        <span>trigger</span>
      </VHoverCard>,
    );
    await user.click(screen.getByText("trigger"));
    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog.className).toContain("max-w-[320px]");
    });
  });

  it("applies the CSS class for the position", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard content={<p>Top</p>} position="top" openDelay={0}>
        <span>trigger</span>
      </VHoverCard>,
    );
    await user.click(screen.getByText("trigger"));
    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog.className).toContain("bottom-full");
    });
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(
      <VHoverCard content={<p>Accessible content</p>}>
        <span>Accessible trigger</span>
      </VHoverCard>,
    );
    await axeTest(container);
  });

  it("a11y: has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    const { container } = renderWithTheme(
      <VHoverCard content={<p>Open content</p>} openDelay={0}>
        <span>trigger</span>
      </VHoverCard>,
    );
    await user.click(screen.getByText("trigger"));
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
    await axeTest(container);
  });
});

describe("VHoverCard regressions", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("stays visible when the pointer re-enters during the close animation", () => {
    vi.useFakeTimers();
    const { container } = renderWithTheme(
      <VHoverCard content={<p>Card</p>}>
        <span>trigger</span>
      </VHoverCard>,
    );
    const root = container.querySelector(".v-hover-card")!;

    act(() => {
      fireEvent.pointerEnter(root);
    });
    act(() => {
      vi.advanceTimersByTime(800);
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    act(() => {
      fireEvent.pointerLeave(root);
    });
    act(() => {
      vi.advanceTimersByTime(350); // closeDelay passed: the exit animation runs
    });
    expect(screen.getByRole("dialog").className).toContain("opacity-0");

    act(() => {
      fireEvent.pointerEnter(root);
    });
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).not.toContain("opacity-0");
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("lets Enter reach a link inside the trigger", async () => {
    const onClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard content={<p>Card</p>}>
        <a href="#profile" onClick={onClick}>
          profile
        </a>
      </VHoverCard>,
    );
    screen.getByText("profile").focus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("lets Space be typed into an input inside the trigger", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard content={<p>Card</p>}>
        <input aria-label="name" />
      </VHoverCard>,
    );
    const input = screen.getByLabelText("name");
    await user.type(input, "a b");
    expect(input).toHaveValue("a b");
  });

  it("still toggles with Enter on the trigger itself", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard content={<p>Card</p>}>
        <span>trigger</span>
      </VHoverCard>,
    );
    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("calls user onPointerEnter and onPointerLeave and keeps the hover behavior", () => {
    vi.useFakeTimers();
    const onPointerEnter = vi.fn();
    const onPointerLeave = vi.fn();
    const { container } = renderWithTheme(
      <VHoverCard
        content={<p>Card</p>}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        <span>trigger</span>
      </VHoverCard>,
    );
    const root = container.querySelector(".v-hover-card")!;

    act(() => {
      fireEvent.pointerEnter(root);
    });
    expect(onPointerEnter).toHaveBeenCalledTimes(1);
    act(() => {
      vi.advanceTimersByTime(800);
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    act(() => {
      fireEvent.pointerLeave(root);
    });
    expect(onPointerLeave).toHaveBeenCalledTimes(1);
  });

  it("links the trigger to the dialog and names the dialog", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard content={<p>Card</p>}>
        <span>@johndoe</span>
      </VHoverCard>,
    );
    const trigger = screen.getByRole("button");
    expect(trigger).not.toHaveAttribute("aria-controls");
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "@johndoe" });
    expect(trigger).toHaveAttribute("aria-controls", dialog.id);
  });

  it("prefers semanticLabel for the dialog name", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard content={<p>Card</p>} semanticLabel="Profile preview">
        <span>@johndoe</span>
      </VHoverCard>,
    );
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog", { name: "Profile preview" })).toBeInTheDocument();
  });
});

describe("VHoverCard asChild", () => {
  it("renders no trigger wrapper: the child is the only button and gets no role or tabIndex", () => {
    const { container } = renderWithTheme(
      <VHoverCard asChild content={<p>Card</p>}>
        <VButton>Details</VButton>
      </VHoverCard>,
    );
    expect(container.querySelector('[role="button"]')).toBeNull();
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).not.toHaveAttribute("role");
    expect(buttons[0]).not.toHaveAttribute("tabindex");
    expect(buttons[0].parentElement).toBe(container.querySelector(".v-hover-card"));
  });

  it("keeps the wrapper by default", () => {
    const { container } = renderWithTheme(<HoverCardWithText />);
    expect(container.querySelector('div[role="button"]')).not.toBeNull();
  });

  it("puts id and the aria attributes on the child, aria-controls only while open", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard asChild content={<p>Card</p>} openDelay={60000}>
        <VButton>Details</VButton>
      </VHoverCard>,
    );
    const trigger = screen.getByRole("button", { name: "Details" });
    expect(trigger).toHaveAttribute("id");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).not.toHaveAttribute("aria-controls");

    await user.click(trigger);
    const dialog = await screen.findByRole("dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", dialog.id);
    expect(dialog).toHaveAttribute("aria-labelledby", trigger.id);
  });

  it("keeps the child's own id as the label target", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard asChild content={<p>Card</p>} openDelay={60000}>
        <VButton id="my-details">Details</VButton>
      </VHoverCard>,
    );
    await user.click(screen.getByRole("button", { name: "Details" }));
    const dialog = await screen.findByRole("dialog");
    expect(screen.getByRole("button", { name: "Details" })).toHaveAttribute("id", "my-details");
    expect(dialog).toHaveAttribute("aria-labelledby", "my-details");
  });

  it("calls the child onClick first and skips the card when it calls preventDefault", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn((e: { preventDefault: () => void }) => e.preventDefault());
    renderWithTheme(
      <VHoverCard asChild content={<p>Card</p>} openDelay={60000}>
        <VButton onClick={onClick}>Details</VButton>
      </VHoverCard>,
    );
    await user.click(screen.getByRole("button", { name: "Details" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens from the keyboard through the native button and keeps the child's ref", async () => {
    const user = userEvent.setup();
    const childRef = createRef<HTMLButtonElement>();
    renderWithTheme(
      <VHoverCard asChild content={<p>Card</p>}>
        <VButton ref={childRef}>Details</VButton>
      </VHoverCard>,
    );
    const trigger = screen.getByRole("button", { name: "Details" });
    expect(childRef.current).toBe(trigger);
    trigger.focus();
    await user.keyboard("{Enter}");
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("does not open while disabled", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VHoverCard asChild disabled content={<p>Card</p>} openDelay={0}>
        <VButton>Details</VButton>
      </VHoverCard>,
    );
    await user.click(screen.getByRole("button", { name: "Details" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("throws a clear error unless there is exactly one element child", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const renderWith = (children: ReactNode) =>
      renderWithTheme(
        <VHoverCard asChild content="Card">
          {children}
        </VHoverCard>,
      );
    expect(() => renderWith("just text")).toThrow(/VHoverCard.*exactly one React element/);
    expect(() =>
      renderWith(
        <>
          <VButton>A</VButton>
          <VButton>B</VButton>
        </>,
      ),
    ).toThrow(/exactly one React element/);
    spy.mockRestore();
  });

  it("a11y: has no accessibility violations with a VButton child, closed and open", async () => {
    const user = userEvent.setup();
    const { container } = renderWithTheme(
      <VHoverCard asChild content={<p>Card</p>} openDelay={60000}>
        <VButton>Details</VButton>
      </VHoverCard>,
    );
    await axeTest(container);
    await user.click(screen.getByRole("button", { name: "Details" }));
    await screen.findByRole("dialog");
    await axeTest(container);
  });
});

function HoverCardWithText() {
  return (
    <VHoverCard content={<p>Card</p>}>
      <span>text</span>
    </VHoverCard>
  );
}
