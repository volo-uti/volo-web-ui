import { createRef } from "react";
import { fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VForm } from "../v-form";
import { VAutocomplete } from "./v-autocomplete";

const items = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

describe("VAutocomplete", () => {
  it("renders with role combobox", () => {
    renderWithTheme(<VAutocomplete items={items} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows the placeholder", () => {
    renderWithTheme(<VAutocomplete items={items} placeholder="Search..." />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("opens the dropdown on focus", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VAutocomplete items={items} />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("filters on input", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VAutocomplete items={items} />);
    const input = screen.getByRole("combobox");
    await user.clear(input);
    await user.type(input, "ban");
    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
  });

  it("calls onValueChange when an option is clicked", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VAutocomplete items={items} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Cherry"));
    expect(onValueChange).toHaveBeenCalledWith("cherry");
  });

  it("calls onInputChange on every input", async () => {
    const onInputChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VAutocomplete items={items} onInputChange={onInputChange} />);
    await user.type(screen.getByRole("combobox"), "ba");
    expect(onInputChange).toHaveBeenLastCalledWith("ba");
  });

  it("does not open when disabled", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VAutocomplete items={items} disabled onValueChange={onValueChange} />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("blocks input and opening the list when readOnly", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VAutocomplete items={items} readOnly defaultValue="apple" />);
    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("readonly");
    await user.click(input);
    await user.keyboard("{ArrowDown}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("uses the typed text as the value on Enter with allowCustomValue", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VAutocomplete items={items} allowCustomValue onValueChange={onValueChange} />);
    await user.type(screen.getByRole("combobox"), "durian{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("durian");
  });

  it("does not change the value on Enter without allowCustomValue", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VAutocomplete items={items} onValueChange={onValueChange} />);
    await user.type(screen.getByRole("combobox"), "durian{Enter}");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("renders empty results with emptyRenderer", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VAutocomplete items={items} emptyRenderer={(q) => <span>No match for {q}</span>} />,
    );
    await user.type(screen.getByRole("combobox"), "xyz");
    expect(screen.getByText("No match for xyz")).toBeInTheDocument();
  });

  it("sets aria-busy and shows the spinner while loading", () => {
    const { container } = renderWithTheme(<VAutocomplete items={items} loading />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-busy", "true");
    expect(container.querySelector("svg.animate-spin")).toBeInTheDocument();
  });

  it("shows the label", () => {
    renderWithTheme(<VAutocomplete items={items} label="Fruit" />);
    expect(screen.getByText("Fruit")).toBeInTheDocument();
  });

  it("applies the error state", () => {
    renderWithTheme(<VAutocomplete items={items} error errorText="Required" />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("applies the disabled state", () => {
    renderWithTheme(<VAutocomplete items={items} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("shows emptyText when there are no results", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VAutocomplete items={items} emptyText="Nothing found" />);
    const input = screen.getByRole("combobox");
    await user.clear(input);
    await user.type(input, "xyz");
    expect(screen.getByText("Nothing found")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLInputElement>();
    renderWithTheme(<VAutocomplete ref={ref} items={items} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  describe("regressions", () => {
    const input = () => screen.getByRole("combobox") as HTMLInputElement;

    it("follows a controlled value reset and change", () => {
      const { rerender } = renderWithTheme(<VAutocomplete items={items} value="apple" />);
      expect(input().value).toBe("Apple");
      rerender(<VAutocomplete items={items} value="" />);
      expect(input().value).toBe("");
      rerender(<VAutocomplete items={items} value="banana" />);
      expect(input().value).toBe("Banana");
    });

    it("shows the label of the value once async items arrive", () => {
      const { rerender } = renderWithTheme(<VAutocomplete items={[]} value="apple" />);
      expect(input().value).toBe("");
      rerender(<VAutocomplete items={items} value="apple" />);
      expect(input().value).toBe("Apple");
    });

    it("clears the value when the text is emptied", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      renderWithTheme(
        <VAutocomplete items={items} defaultValue="apple" onValueChange={onValueChange} />,
      );
      await user.clear(input());
      expect(onValueChange).toHaveBeenCalledWith("");
      await user.tab();
      expect(input().value).toBe("");
    });

    it("ignores Enter while an IME composition is running", () => {
      const onValueChange = vi.fn();
      renderWithTheme(
        <VAutocomplete items={items} allowCustomValue onValueChange={onValueChange} />,
      );
      fireEvent.change(input(), { target: { value: "x" } });
      fireEvent.keyDown(input(), { key: "Enter", isComposing: true, keyCode: 229 });
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("lets Enter submit the form while the list is closed", async () => {
      const onSubmit = vi.fn();
      const user = userEvent.setup();
      renderWithTheme(
        <VForm onSubmit={onSubmit}>
          <VAutocomplete items={items} defaultValue="apple" />
        </VForm>,
      );
      await user.click(input());
      await user.keyboard("{Escape}");
      await user.keyboard("{Enter}");
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it("selects the option value when the typed text equals its label", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      renderWithTheme(
        <VAutocomplete items={items} allowCustomValue onValueChange={onValueChange} />,
      );
      await user.type(input(), "Apple{Enter}");
      expect(onValueChange).toHaveBeenCalledWith("apple");
      expect(onValueChange).not.toHaveBeenCalledWith("Apple");
    });

    it("closes the list and reverts the text when focus moves away", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <>
          <VAutocomplete items={items} defaultValue="apple" />
          <VAutocomplete items={items} aria-label="other" />
        </>,
      );
      const [first, other] = screen.getAllByRole("combobox") as HTMLInputElement[];
      await user.click(first);
      await user.type(first, "zz");
      expect(first).toHaveAttribute("aria-expanded", "true");
      await user.tab();
      expect(other).toHaveFocus();
      expect(first).toHaveAttribute("aria-expanded", "false");
      expect(first.value).toBe("Apple");
    });

    it("keeps aria-activedescendant pointing at an existing element", async () => {
      const user = userEvent.setup();
      renderWithTheme(<VAutocomplete items={items} />);
      await user.click(input());
      await user.keyboard("{ArrowDown}");
      const id = input().getAttribute("aria-activedescendant");
      expect(id).toBeTruthy();
      expect(document.getElementById(id as string)).toBeInTheDocument();
      await user.keyboard("{Escape}");
      expect(input()).not.toHaveAttribute("aria-activedescendant");
    });

    it("forwards required to the input", () => {
      renderWithTheme(<VAutocomplete items={items} label="Fruit" required />);
      expect(input()).toBeRequired();
    });

    it("composes a user onKeyDown with the built-in keys", async () => {
      const onKeyDown = vi.fn();
      const user = userEvent.setup();
      renderWithTheme(<VAutocomplete items={items} onKeyDown={onKeyDown} />);
      await user.click(input());
      await user.keyboard("{ArrowDown}{Enter}");
      expect(onKeyDown).toHaveBeenCalled();
      expect(input().value).toBe("Apple");
    });
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VAutocomplete items={items} label="Fruit" />);
    await axeTest(container);
  });
});
