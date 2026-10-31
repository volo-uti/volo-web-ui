import { createRef, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { act } from "@testing-library/react";
import { renderWithTheme, screen, userEvent, waitFor, axeTest } from "../../../test-utils";
import { VButton } from "../../inputs/v-button";
import { VPopover, VPopoverTrigger, VPopoverContent, VPopoverClose } from "./v-popover";

describe("VPopover", () => {
  const renderPopover = (props = {}) =>
    renderWithTheme(
      <VPopover {...props}>
        <VPopoverTrigger>Open</VPopoverTrigger>
        <VPopoverContent>
          <p>Popover body</p>
          <VPopoverClose>Close</VPopoverClose>
        </VPopoverContent>
      </VPopover>,
    );

  it("renders the trigger", () => {
    renderPopover();
    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.queryByText("Popover body")).not.toBeInTheDocument();
  });

  it("opens the popover when the trigger is clicked", async () => {
    const user = userEvent.setup();
    renderPopover();
    await user.click(screen.getByText("Open"));
    expect(screen.getByText("Popover body")).toBeInTheDocument();
  });

  it("closes when the close button is clicked", async () => {
    const user = userEvent.setup();
    renderPopover();
    await user.click(screen.getByText("Open"));
    expect(screen.getByText("Popover body")).toBeInTheDocument();
    await user.click(screen.getByText("Close"));
    expect(screen.queryByText("Popover body")).not.toBeInTheDocument();
  });

  it("sets aria-expanded on the trigger correctly", async () => {
    const user = userEvent.setup();
    renderPopover();
    const trigger = screen.getByText("Open");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it('sets aria-haspopup="dialog"', () => {
    renderPopover();
    expect(screen.getByText("Open")).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("gives the content the dialog role", async () => {
    const user = userEvent.setup();
    renderPopover();
    await user.click(screen.getByText("Open"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("applies data-v-position", async () => {
    const user = userEvent.setup();
    renderPopover({ position: "top" });
    await user.click(screen.getByText("Open"));
    expect(screen.getByRole("dialog")).toHaveAttribute("data-v-position", "top");
  });

  it("calls the onOpenChange callback", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    renderPopover({ onOpenChange });
    await user.click(screen.getByText("Open"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("closes on Escape and calls onOpenChange(false)", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderPopover({ onOpenChange });
    await user.click(screen.getByText("Open"));
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Popover body")).not.toBeInTheDocument();
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("opens from the trigger on Enter", async () => {
    const user = userEvent.setup();
    renderPopover();
    screen.getByText("Open").focus();
    await user.keyboard("{Enter}");
    expect(screen.getByText("Popover body")).toBeInTheDocument();
  });

  it("closes when clicking outside", async () => {
    const user = userEvent.setup();
    renderPopover({ defaultOpen: true });
    await user.click(document.body);
    expect(screen.queryByText("Popover body")).not.toBeInTheDocument();
  });

  it("stays open when clicking outside with barrierDismissible={false}", async () => {
    const user = userEvent.setup();
    renderPopover({ defaultOpen: true, barrierDismissible: false });
    await user.click(document.body);
    expect(screen.getByText("Popover body")).toBeInTheDocument();
  });

  it("controlled mode: stays open until open changes", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderPopover({ open: true, onOpenChange });
    await user.click(screen.getByText("Close"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByText("Popover body")).toBeInTheDocument();
  });

  it("calls the onClick of both the trigger and the close button", async () => {
    const user = userEvent.setup();
    const onTrigger = vi.fn();
    const onClose = vi.fn();
    renderWithTheme(
      <VPopover>
        <VPopoverTrigger onClick={onTrigger}>Open</VPopoverTrigger>
        <VPopoverContent>
          <VPopoverClose onClick={onClose}>Close</VPopoverClose>
        </VPopoverContent>
      </VPopover>,
    );
    await user.click(screen.getByText("Open"));
    await user.click(screen.getByText("Close"));
    expect(onTrigger).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("forwards the trigger ref", () => {
    const ref = createRef<HTMLSpanElement>();
    renderWithTheme(
      <VPopover>
        <VPopoverTrigger ref={ref}>Open</VPopoverTrigger>
      </VPopover>,
    );
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("leaves focus on the control the user pressed outside the popover", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <div>
        <VPopover>
          <VPopoverTrigger>Open</VPopoverTrigger>
          <VPopoverContent>
            <button type="button">Inside</button>
          </VPopoverContent>
        </VPopover>
        <input aria-label="Other" />
      </div>,
    );
    await user.click(screen.getByText("Open"));
    await waitFor(() => expect(screen.getByText("Inside")).toHaveFocus());

    await user.click(screen.getByLabelText("Other"));
    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
    });

    expect(screen.queryByText("Inside")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Other")).toHaveFocus();
  });

  it("links the trigger and the content and names the dialog after the trigger", async () => {
    const user = userEvent.setup();
    renderPopover();
    const trigger = screen.getByRole("button", { name: "Open" });
    expect(trigger).not.toHaveAttribute("aria-controls");

    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Open" });
    expect(trigger).toHaveAttribute("aria-controls", dialog.id);
    expect(dialog).toHaveAttribute("aria-labelledby", trigger.id);
  });

  it("keeps the dialog label pointing at a custom trigger id", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VPopover>
        <VPopoverTrigger id="my-trigger">Open</VPopoverTrigger>
        <VPopoverContent>Body</VPopoverContent>
      </VPopover>,
    );
    await user.click(screen.getByText("Open"));
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-labelledby", "my-trigger");
    expect(screen.getByRole("dialog", { name: "Open" })).toBeInTheDocument();
  });

  it("prefers an explicit aria-label over the trigger label", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VPopover>
        <VPopoverTrigger>Open</VPopoverTrigger>
        <VPopoverContent aria-label="Filters">Body</VPopoverContent>
      </VPopover>,
    );
    await user.click(screen.getByText("Open"));
    expect(screen.getByRole("dialog", { name: "Filters" })).toBeInTheDocument();
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderPopover();
    await axeTest(container);
  });
});

describe("VPopoverTrigger asChild", () => {
  const renderAsChild = (triggerProps = {}, buttonProps = {}) =>
    renderWithTheme(
      <VPopover>
        <VPopoverTrigger asChild {...triggerProps}>
          <VButton {...buttonProps}>Open</VButton>
        </VPopoverTrigger>
        <VPopoverContent>
          <p>Popover body</p>
          <VPopoverClose asChild>
            <VButton>Done</VButton>
          </VPopoverClose>
        </VPopoverContent>
      </VPopover>,
    );

  it("renders no wrapper: the child is the only button and gets no role or tabIndex", () => {
    const { container } = renderAsChild();
    expect(container.querySelector("span.v-popover-trigger")).toBeNull();
    expect(container.querySelector('[role="button"]')).toBeNull();
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toBe(screen.getByRole("button", { name: "Open" }));
    expect(buttons[0]).not.toHaveAttribute("role");
    expect(buttons[0]).not.toHaveAttribute("tabindex");
  });

  it("keeps the default wrapper when asChild is not set", () => {
    const { container } = renderWithTheme(
      <VPopover>
        <VPopoverTrigger>Open</VPopoverTrigger>
      </VPopover>,
    );
    expect(container.querySelector('span.v-popover-trigger[role="button"]')).not.toBeNull();
  });

  it("puts id and the aria attributes on the child, aria-controls only while open", async () => {
    const user = userEvent.setup();
    renderAsChild();
    const trigger = screen.getByRole("button", { name: "Open" });
    expect(trigger).toHaveAttribute("id");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).not.toHaveAttribute("aria-controls");

    await user.click(trigger);
    const dialog = screen.getByRole("dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", dialog.id);
    expect(dialog).toHaveAttribute("aria-labelledby", trigger.id);
    expect(screen.getByRole("dialog", { name: "Open" })).toBeInTheDocument();
  });

  it("uses the id of the trigger or, failing that, of the child for the dialog label", async () => {
    const user = userEvent.setup();
    const { unmount } = renderAsChild({ id: "from-trigger" });
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute("id", "from-trigger");
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-labelledby", "from-trigger");
    unmount();

    renderAsChild({}, { id: "from-child" });
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-labelledby", "from-child");
  });

  it("toggles on click and on Enter and Space through the native button", async () => {
    const user = userEvent.setup();
    renderAsChild();
    const trigger = screen.getByRole("button", { name: "Open" });
    await user.click(trigger);
    expect(screen.getByText("Popover body")).toBeInTheDocument();
    await user.click(trigger);
    expect(screen.queryByText("Popover body")).not.toBeInTheDocument();

    trigger.focus();
    await user.keyboard("{Enter}");
    expect(screen.getByText("Popover body")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Popover body")).not.toBeInTheDocument();
    trigger.focus();
    await user.keyboard(" ");
    expect(screen.getByText("Popover body")).toBeInTheDocument();
  });

  it("calls the child onClick first, then the trigger onClick, then toggles", async () => {
    const user = userEvent.setup();
    const calls: string[] = [];
    renderAsChild({ onClick: () => calls.push("trigger") }, { onClick: () => calls.push("child") });
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(calls).toEqual(["child", "trigger"]);
    expect(screen.getByText("Popover body")).toBeInTheDocument();
  });

  it("skips the toggle when the child calls preventDefault", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderWithTheme(
      <VPopover onOpenChange={onOpenChange}>
        <VPopoverTrigger asChild>
          <VButton onClick={(e) => e.preventDefault()}>Open</VButton>
        </VPopoverTrigger>
        <VPopoverContent>Body</VPopoverContent>
      </VPopover>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.queryByText("Body")).not.toBeInTheDocument();
  });

  it("merges the forwarded ref and the child's own ref onto the child element", () => {
    const triggerRef = createRef<HTMLElement>();
    const childRef = createRef<HTMLButtonElement>();
    const callbackNodes: Array<HTMLButtonElement | null> = [];
    renderWithTheme(
      <VPopover>
        <VPopoverTrigger asChild ref={triggerRef}>
          <VButton ref={childRef}>Open</VButton>
        </VPopoverTrigger>
        <VPopoverContent>Body</VPopoverContent>
      </VPopover>,
    );
    const button = screen.getByRole("button", { name: "Open" });
    expect(triggerRef.current).toBe(button);
    expect(childRef.current).toBe(button);

    renderWithTheme(
      <VPopover>
        <VPopoverTrigger asChild>
          <VButton ref={(node) => void callbackNodes.push(node)}>Other</VButton>
        </VPopoverTrigger>
        <VPopoverContent>Body</VPopoverContent>
      </VPopover>,
    );
    expect(callbackNodes[0]).toBe(screen.getByRole("button", { name: "Other" }));
  });

  it("treats a press on the child trigger as inside, so mousedown does not close first", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderWithTheme(
      <VPopover defaultOpen onOpenChange={onOpenChange}>
        <VPopoverTrigger asChild>
          <VButton>Open</VButton>
        </VPopoverTrigger>
        <VPopoverContent>Body</VPopoverContent>
      </VPopover>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    // One toggle from the click; the outside-press handler must not add a second close.
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes through a VPopoverClose asChild without nesting a button", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <VPopover defaultOpen>
        <VPopoverTrigger asChild>
          <VButton>Open</VButton>
        </VPopoverTrigger>
        <VPopoverContent>
          <VPopoverClose asChild onClick={onClick}>
            <VButton>Done</VButton>
          </VPopoverClose>
        </VPopoverContent>
      </VPopover>,
    );
    const done = screen.getByRole("button", { name: "Done" });
    expect(done.closest("button")).toBe(done);
    expect(done.querySelector("button")).toBeNull();
    expect(done).toHaveClass("v-popover-close");
    await user.click(done);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("throws a clear error unless there is exactly one element child", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const renderWith = (children: ReactNode) =>
      renderWithTheme(
        <VPopover>
          <VPopoverTrigger asChild>{children}</VPopoverTrigger>
        </VPopover>,
      );
    expect(() => renderWith("just text")).toThrow(/VPopoverTrigger.*exactly one React element/);
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

  it("a11y: has no accessibility violations with a VButton child", async () => {
    const { container } = renderAsChild();
    await axeTest(container);
  });

  it("a11y: has no accessibility violations while open", async () => {
    const user = userEvent.setup();
    const { container } = renderAsChild();
    await user.click(screen.getByRole("button", { name: "Open" }));
    await axeTest(container);
  });
});
