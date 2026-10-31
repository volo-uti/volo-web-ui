import { describe, expect, it, vi } from "vitest";
import { VDialog, VDialogContent, VDialogTitle } from "../../feedback/v-dialog";
import { createRef, type ReactNode } from "react";
import { VButton } from "../../inputs/v-button";
import { renderWithTheme, screen, userEvent, axeTest, waitFor } from "../../../test-utils";
import {
  VMenu,
  VMenuTrigger,
  VMenuContent,
  VMenuItem,
  VMenuSeparator,
  VMenuGroup,
  VMenuLabel,
} from "./v-menu";

describe("VMenu", () => {
  const renderMenu = (props = {}) =>
    renderWithTheme(
      <VMenu {...props}>
        <VMenuTrigger>Options</VMenuTrigger>
        <VMenuContent>
          <VMenuLabel>Actions</VMenuLabel>
          <VMenuGroup>
            <VMenuItem onClick={vi.fn()}>Edit</VMenuItem>
            <VMenuItem onClick={vi.fn()}>Copy</VMenuItem>
          </VMenuGroup>
          <VMenuSeparator />
          <VMenuItem onClick={vi.fn()} disabled>
            Delete
          </VMenuItem>
        </VMenuContent>
      </VMenu>,
    );

  it("renders only the trigger", () => {
    renderMenu();
    expect(screen.getByText("Options")).toBeInTheDocument();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens the menu when the trigger is clicked", async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText("Options"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("sets aria-expanded/aria-haspopup correctly", async () => {
    const user = userEvent.setup();
    renderMenu();
    const trigger = screen.getByText("Options");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("applies the menuitem role", async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText("Options"));
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
  });

  it("calls onClick and closes the menu when an item is clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VMenu>
        <VMenuTrigger>Options</VMenuTrigger>
        <VMenuContent>
          <VMenuItem onClick={onClick}>Edit</VMenuItem>
        </VMenuContent>
      </VMenu>,
    );
    await user.click(screen.getByText("Options"));
    await user.click(screen.getByText("Edit"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("sets aria-disabled on a disabled item", async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText("Options"));
    const deleteItem = screen.getByText("Delete").closest('[role="menuitem"]');
    expect(deleteItem).toHaveAttribute("aria-disabled", "true");
  });

  it("applies the separator role", async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText("Options"));
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("applies the group role", async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText("Options"));
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByText("Options"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("stays open after select when closeOnSelect=false", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VMenu closeOnSelect={false}>
        <VMenuTrigger>Options</VMenuTrigger>
        <VMenuContent>
          <VMenuItem>Edit</VMenuItem>
        </VMenuContent>
      </VMenu>,
    );
    await user.click(screen.getByText("Options"));
    await user.click(screen.getByText("Edit"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("does not call onClick on a disabled item", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VMenu defaultOpen>
        <VMenuTrigger>Options</VMenuTrigger>
        <VMenuContent>
          <VMenuItem disabled onClick={onClick}>
            Delete
          </VMenuItem>
        </VMenuContent>
      </VMenu>,
    );
    await user.click(screen.getByText("Delete"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("is controlled by open / onOpenChange", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VMenu open={false} onOpenChange={onOpenChange}>
        <VMenuTrigger>Options</VMenuTrigger>
        <VMenuContent>
          <VMenuItem>Edit</VMenuItem>
        </VMenuContent>
      </VMenu>,
    );
    await user.click(screen.getByText("Options"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("moves between items with arrow keys and picks with Enter", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VMenu>
        <VMenuTrigger>Options</VMenuTrigger>
        <VMenuContent>
          <VMenuItem>Edit</VMenuItem>
          <VMenuItem onClick={onClick}>Copy</VMenuItem>
          <VMenuItem disabled>Delete</VMenuItem>
        </VMenuContent>
      </VMenu>,
    );
    await user.click(screen.getByText("Options"));
    await waitFor(() =>
      expect(screen.getByText("Edit").closest('[role="menuitem"]')).toHaveFocus(),
    );
    await user.keyboard("{ArrowDown}");
    expect(screen.getByText("Copy").closest('[role="menuitem"]')).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByText("Edit").closest('[role="menuitem"]')).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(screen.getByText("Copy").closest('[role="menuitem"]')).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("changes the panel position class by align", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VMenu>
        <VMenuTrigger>Options</VMenuTrigger>
        <VMenuContent align="end">
          <VMenuItem>Edit</VMenuItem>
        </VMenuContent>
      </VMenu>,
    );
    await user.click(screen.getByText("Options"));
    expect(screen.getByRole("menu")).toHaveClass("right-0");
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderMenu();
    await axeTest(container);
  });
});

describe("VMenu focus and dismissal", () => {
  it("returns focus to the trigger after Escape", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VMenu>
        <VMenuTrigger>Options</VMenuTrigger>
        <VMenuContent>
          <VMenuItem>One</VMenuItem>
        </VMenuContent>
      </VMenu>,
    );
    await user.click(screen.getByText("Options"));
    await waitFor(() => expect(screen.getByRole("menuitem")).toHaveFocus());
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByText("Options")).toHaveFocus();
  });

  it("returns focus to the trigger after an item is selected", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VMenu>
        <VMenuTrigger>Options</VMenuTrigger>
        <VMenuContent>
          <VMenuItem>One</VMenuItem>
        </VMenuContent>
      </VMenu>,
    );
    await user.click(screen.getByText("Options"));
    await waitFor(() => expect(screen.getByRole("menuitem")).toHaveFocus());
    await user.keyboard("{Enter}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByText("Options")).toHaveFocus();
  });

  it("does not take focus back when an item handler moved it elsewhere", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <>
        <input aria-label="elsewhere" />
        <VMenu>
          <VMenuTrigger>Options</VMenuTrigger>
          <VMenuContent>
            <VMenuItem onClick={() => screen.getByLabelText("elsewhere").focus()}>One</VMenuItem>
          </VMenuContent>
        </VMenu>
      </>,
    );
    await user.click(screen.getByText("Options"));
    await user.click(screen.getByRole("menuitem"));
    expect(screen.getByLabelText("elsewhere")).toHaveFocus();
  });

  it("closes on Tab and lets focus move on from the trigger", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <>
        <VMenu>
          <VMenuTrigger>Options</VMenuTrigger>
          <VMenuContent>
            <VMenuItem>One</VMenuItem>
          </VMenuContent>
        </VMenu>
        <button type="button">after</button>
      </>,
    );
    await user.click(screen.getByText("Options"));
    await waitFor(() => expect(screen.getByRole("menuitem")).toHaveFocus());
    await user.tab();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByText("after")).toHaveFocus();
  });

  it("closes from the trigger when the trigger and content sit in separate wrappers", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VMenu>
        <div>
          <VMenuTrigger>Options</VMenuTrigger>
        </div>
        <div>
          <VMenuContent>
            <VMenuItem>One</VMenuItem>
          </VMenuContent>
        </div>
      </VMenu>,
    );
    await user.click(screen.getByText("Options"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.click(screen.getByText("Options"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes only the menu, not the enclosing dialog, on Escape", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderWithTheme(
      <VDialog defaultOpen onOpenChange={onOpenChange}>
        <VDialogContent>
          <VDialogTitle>Dialog</VDialogTitle>
          <VMenu>
            <VMenuTrigger>Options</VMenuTrigger>
            <VMenuContent>
              <VMenuItem>One</VMenuItem>
            </VMenuContent>
          </VMenu>
        </VDialogContent>
      </VDialog>,
    );
    await user.click(screen.getByText("Options"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalled();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("VMenuTrigger asChild", () => {
  const renderAsChild = (triggerProps = {}, buttonProps = {}) =>
    renderWithTheme(
      <VMenu>
        <VMenuTrigger asChild {...triggerProps}>
          <VButton {...buttonProps}>Options</VButton>
        </VMenuTrigger>
        <VMenuContent>
          <VMenuItem>Edit</VMenuItem>
        </VMenuContent>
      </VMenu>,
    );

  it("renders no extra button: the child is the only button", () => {
    const { container } = renderAsChild();
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0].querySelector("button")).toBeNull();
    expect(buttons[0].closest(".v-menu")).toBe(container.querySelector(".v-menu"));
    expect(buttons[0].parentElement).toBe(container.querySelector(".v-menu"));
  });

  it("puts aria-expanded and aria-haspopup on the child and toggles on click", async () => {
    const user = userEvent.setup();
    renderAsChild();
    const trigger = screen.getByRole("button", { name: "Options" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.click(trigger);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("calls the child onClick first, then the trigger onClick", async () => {
    const user = userEvent.setup();
    const calls: string[] = [];
    renderAsChild({ onClick: () => calls.push("trigger") }, { onClick: () => calls.push("child") });
    await user.click(screen.getByRole("button", { name: "Options" }));
    expect(calls).toEqual(["child", "trigger"]);
  });

  it("skips the toggle when the child calls preventDefault", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderWithTheme(
      <VMenu onOpenChange={onOpenChange}>
        <VMenuTrigger asChild>
          <VButton onClick={(e) => e.preventDefault()}>Options</VButton>
        </VMenuTrigger>
        <VMenuContent>
          <VMenuItem>Edit</VMenuItem>
        </VMenuContent>
      </VMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Options" }));
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("merges the forwarded ref and the child's own ref, and returns focus to the child", async () => {
    const user = userEvent.setup();
    const triggerRef = createRef<HTMLButtonElement>();
    const childRef = createRef<HTMLButtonElement>();
    renderWithTheme(
      <VMenu>
        <VMenuTrigger asChild ref={triggerRef}>
          <VButton ref={childRef}>Options</VButton>
        </VMenuTrigger>
        <VMenuContent>
          <VMenuItem>Edit</VMenuItem>
        </VMenuContent>
      </VMenu>,
    );
    const button = screen.getByRole("button", { name: "Options" });
    expect(triggerRef.current).toBe(button);
    expect(childRef.current).toBe(button);

    await user.click(button);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(button).toHaveFocus();
  });

  it("throws a clear error unless there is exactly one element child", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const renderWith = (children: ReactNode) =>
      renderWithTheme(
        <VMenu>
          <VMenuTrigger asChild>{children}</VMenuTrigger>
        </VMenu>,
      );
    expect(() => renderWith("just text")).toThrow(/VMenuTrigger.*exactly one React element/);
    spy.mockRestore();
  });

  it("a11y: has no accessibility violations with a VButton child, closed and open", async () => {
    const user = userEvent.setup();
    const { container } = renderAsChild();
    await axeTest(container);
    await user.click(screen.getByRole("button", { name: "Options" }));
    await axeTest(container);
  });
});
