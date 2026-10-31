import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, waitFor, axeTest } from "../../../test-utils";
import { VDialog, VDialogContent } from "../../feedback/v-dialog";
import { VTextField } from "../v-text-field";
import { VSelect, VSelectTrigger, VSelectContent, VSelectItem } from "./v-select";

describe("VSelect", () => {
  const renderSelect = (props = {}, triggerText: string | null = "Choose") =>
    renderWithTheme(
      <VSelect {...props}>
        <VSelectTrigger>{triggerText}</VSelectTrigger>
        <VSelectContent>
          <VSelectItem value="apple">Apple</VSelectItem>
          <VSelectItem value="banana">Banana</VSelectItem>
          <VSelectItem value="cherry">Cherry</VSelectItem>
        </VSelectContent>
      </VSelect>,
    );

  it("renders with role combobox", () => {
    renderSelect();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Choose")).toBeInTheDocument();
  });

  it("opens the dropdown when the trigger is clicked", async () => {
    const user = userEvent.setup();
    renderSelect();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("selects and closes when an item is clicked", async () => {
    const user = userEvent.setup();
    renderSelect();
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Banana"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("updates aria-expanded correctly", async () => {
    const user = userEvent.setup();
    renderSelect();
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    renderSelect({ disabled: true });
    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("applies the size prop", () => {
    const { container } = renderSelect({ size: "lg" });
    expect(container.querySelector('[data-v-size="lg"]')).toBeInTheDocument();
  });

  it("closes on the Escape key", async () => {
    const user = userEvent.setup();
    renderSelect();
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("calls onValueChange when an item is selected", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderSelect({ onValueChange });
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Banana"));
    expect(onValueChange).toHaveBeenCalledWith("banana");
  });

  it("calls onValueChange with an array in multiple mode", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderSelect({ multiple: true, onValueChange });
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Apple"));
    await user.click(screen.getByText("Cherry"));
    expect(onValueChange).toHaveBeenLastCalledWith(["apple", "cherry"]);
  });

  it("does not call onValueChange when disabled", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderSelect({ disabled: true, onValueChange });
    await user.click(screen.getByRole("combobox"));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("shows the label and associates it with the trigger", async () => {
    const user = userEvent.setup();
    renderSelect({ label: "Fruit", required: true });
    expect(screen.getByLabelText(/Fruit/)).toBe(screen.getByRole("combobox"));
    await user.click(screen.getByText("Fruit"));
    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  it("shows helper and errorText and associates them with the trigger", () => {
    renderSelect({ helper: "Pick one" });
    expect(screen.getByRole("combobox")).toHaveAccessibleDescription("Pick one");
  });

  it("applies the error state", () => {
    renderSelect({ error: true, errorText: "Required" });
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger).toHaveAccessibleDescription("Required");
  });

  it("shows the placeholder when nothing is selected", () => {
    renderSelect({ placeholder: "Pick fruit" }, null);
    expect(screen.getByText("Pick fruit")).toBeInTheDocument();
  });

  it("shows the locale default text without a placeholder", () => {
    renderSelect({}, null);
    expect(screen.getByText("Select...")).toBeInTheDocument();
  });

  it("does not open when readOnly", async () => {
    const user = userEvent.setup();
    renderSelect({ readOnly: true });
    await user.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("sets aria-busy and shows the spinner while loading", () => {
    renderSelect({ loading: true });
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-busy", "true");
    expect(trigger.querySelector("svg.animate-spin")).toBeInTheDocument();
  });

  it("takes the full width when fullWidth is set", () => {
    const { container } = renderSelect({ fullWidth: true });
    expect(container.firstElementChild?.className).toContain("w-full");
  });

  it("disables the remaining items when maxSelection is reached", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderSelect({ multiple: true, maxSelection: 2, onValueChange });
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Apple"));
    await user.click(screen.getByText("Banana"));
    expect(screen.getByText("Cherry").closest('[role="option"]')).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    await user.click(screen.getByText("Cherry"));
    expect(onValueChange).toHaveBeenLastCalledWith(["apple", "banana"]);
    expect(onValueChange).toHaveBeenCalledTimes(2);
  });

  describe("focus, keyboard scope and handlers", () => {
    const Fruit = (props: {
      triggerProps?: Record<string, unknown>;
      itemProps?: Record<string, unknown>;
      required?: boolean;
    }) => (
      <VSelect required={props.required}>
        <VSelectTrigger {...props.triggerProps}>Choose</VSelectTrigger>
        <VSelectContent>
          <VSelectItem value="apple" {...props.itemProps}>
            Apple
          </VSelectItem>
          <VSelectItem value="banana">Banana</VSelectItem>
        </VSelectContent>
      </VSelect>
    );
    const optionFocused = () =>
      waitFor(() => expect(document.activeElement?.getAttribute("role")).toBe("option"));

    it("returns focus to the trigger after a keyboard pick", async () => {
      const user = userEvent.setup();
      renderWithTheme(<Fruit />);
      screen.getByRole("combobox").focus();
      await user.keyboard("{Enter}");
      await optionFocused();
      await user.keyboard("{Enter}");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(screen.getByRole("combobox")).toHaveFocus();
    });

    it("returns focus to the trigger after a mouse pick", async () => {
      const user = userEvent.setup();
      renderWithTheme(<Fruit />);
      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByText("Banana"));
      expect(screen.getByRole("combobox")).toHaveFocus();
    });

    it("closes the list when Tab moves focus out of the select", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <>
          <Fruit />
          <VTextField label="Other" />
        </>,
      );
      await user.click(screen.getByRole("combobox"));
      await optionFocused();
      await user.tab();
      await user.tab();
      expect(screen.getByLabelText("Other")).toHaveFocus();
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("does not swallow arrow keys pressed outside an open select", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <>
          <Fruit />
          <VTextField label="Other" />
        </>,
      );
      await user.click(screen.getByRole("combobox"));
      await optionFocused();
      const other = screen.getByLabelText("Other");
      other.focus();
      const event = new KeyboardEvent("keydown", {
        key: "ArrowDown",
        bubbles: true,
        cancelable: true,
      });
      other.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(false);
    });

    it("closes only the list, not the dialog around it, on Escape", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderWithTheme(
        <VDialog open onOpenChange={onOpenChange}>
          <VDialogContent>
            <Fruit />
          </VDialogContent>
        </VDialog>,
      );
      await user.click(screen.getByRole("combobox"));
      await optionFocused();
      await user.keyboard("{Escape}");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(screen.getByRole("combobox")).toHaveFocus();
    });

    it("sets aria-required on the trigger when required", () => {
      renderWithTheme(<Fruit required />);
      expect(screen.getByRole("combobox")).toHaveAttribute("aria-required", "true");
    });

    it("still opens when a user onClick is passed to the trigger", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      renderWithTheme(<Fruit triggerProps={{ onClick }} />);
      await user.click(screen.getByRole("combobox"));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("still selects when a user onClick is passed to an item", async () => {
      const onClick = vi.fn();
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      renderWithTheme(
        <VSelect onValueChange={onValueChange}>
          <VSelectTrigger>Choose</VSelectTrigger>
          <VSelectContent>
            <VSelectItem value="apple" onClick={onClick}>
              Apple
            </VSelectItem>
          </VSelectContent>
        </VSelect>,
      );
      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByText("Apple"));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onValueChange).toHaveBeenCalledWith("apple");
    });

    it("does not open when the user onClick calls preventDefault", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Fruit
          triggerProps={{ onClick: (e: { preventDefault: () => void }) => e.preventDefault() }}
        />,
      );
      await user.click(screen.getByRole("combobox"));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("accessible name", () => {
    it("names an unlabeled trigger by its placeholder", () => {
      renderWithTheme(
        <VSelect placeholder="Pick a fruit">
          <VSelectTrigger />
          <VSelectContent>
            <VSelectItem value="apple">Apple</VSelectItem>
          </VSelectContent>
        </VSelect>,
      );
      expect(screen.getByRole("combobox", { name: "Pick a fruit" })).toBeInTheDocument();
    });

    it("names an unlabeled trigger by the shown value", () => {
      renderSelect({}, "Apple");
      expect(screen.getByRole("combobox", { name: "Apple" })).toBeInTheDocument();
    });

    it("keeps the field label as the name when there is one", () => {
      renderSelect({ label: "Fruit" });
      const trigger = screen.getByRole("combobox", { name: "Fruit" });
      expect(trigger).not.toHaveAttribute("aria-labelledby");
    });

    it("keeps an explicit aria-label", () => {
      renderWithTheme(
        <VSelect>
          <VSelectTrigger aria-label="Sort order">Newest</VSelectTrigger>
          <VSelectContent>
            <VSelectItem value="new">Newest</VSelectItem>
          </VSelectContent>
        </VSelect>,
      );
      expect(screen.getByRole("combobox", { name: "Sort order" })).toBeInTheDocument();
    });

    it("has no accessibility violations without a label", async () => {
      const { container } = renderWithTheme(
        <VSelect placeholder="Pick a fruit">
          <VSelectTrigger />
          <VSelectContent>
            <VSelectItem value="apple">Apple</VSelectItem>
          </VSelectContent>
        </VSelect>,
      );
      await axeTest(container);
    });
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(
      <VSelect defaultValue="apple">
        <VSelectTrigger aria-label="Select fruit">Apple</VSelectTrigger>
        <VSelectContent>
          <VSelectItem value="apple">Apple</VSelectItem>
          <VSelectItem value="banana">Banana</VSelectItem>
        </VSelectContent>
      </VSelect>,
    );
    await axeTest(container);
  });
});
