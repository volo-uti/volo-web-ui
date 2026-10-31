import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VChip } from "./v-chip";

describe("VChip", () => {
  it("renders by default", () => {
    renderWithTheme(<VChip label="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("applies the variant prop", () => {
    const { container } = renderWithTheme(<VChip label="Outlined" variant="outlined" />);
    expect(container.querySelector('[data-v-variant="outlined"]')).toBeInTheDocument();
  });

  it("applies styles from the variant prop", () => {
    const { container } = renderWithTheme(<VChip label="Outlined" variant="outlined" />);
    expect(container.querySelector('[data-v-variant="outlined"]')).toBeInTheDocument();
  });

  it("applies the size prop", () => {
    const { container } = renderWithTheme(<VChip label="Small" size="sm" />);
    expect(container.querySelector('[data-v-size="sm"]')).toBeInTheDocument();
  });

  it("shows the delete button on the input variant when onDelete is set", () => {
    const onDelete = vi.fn();
    renderWithTheme(<VChip label="Removable" variant="input" onDelete={onDelete} />);
    expect(screen.getByRole("button", { name: "Remove Removable" })).toBeInTheDocument();
  });

  it("calls onDelete when the delete button is clicked on the input variant", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VChip label="Remove" variant="input" onDelete={onDelete} />);
    await user.click(screen.getByRole("button", { name: "Remove Remove" }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("renders leading", () => {
    renderWithTheme(<VChip label="Icon" leading={<span data-testid="icon">*</span>} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("calls onSelectedChange with the next value when the filter variant is clicked", async () => {
    const onSelectedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VChip label="F" variant="filter" selected={false} onSelectedChange={onSelectedChange} />,
    );
    const chip = screen.getByRole("checkbox");
    expect(chip).toHaveAttribute("aria-checked", "false");
    await user.click(chip);
    expect(onSelectedChange).toHaveBeenCalledWith(true);
    await user.keyboard("{Enter}");
    expect(onSelectedChange).toHaveBeenCalledTimes(2);
  });

  it("calls onClick on click and keyboard", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VChip label="Click" onClick={onClick} />);
    await user.click(screen.getByText("Click"));
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("does not call callbacks when disabled", async () => {
    const onClick = vi.fn();
    const onSelectedChange = vi.fn();
    const onDelete = vi.fn();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    renderWithTheme(
      <>
        <VChip label="A" onClick={onClick} disabled />
        <VChip label="B" variant="filter" onSelectedChange={onSelectedChange} disabled />
        <VChip label="C" variant="input" onDelete={onDelete} disabled />
      </>,
    );
    await user.click(screen.getByText("A"));
    await user.click(screen.getByText("B"));
    await user.click(screen.getByRole("button", { name: "Remove C" }));
    expect(onClick).not.toHaveBeenCalled();
    expect(onSelectedChange).not.toHaveBeenCalled();
    expect(onDelete).not.toHaveBeenCalled();
  });

  it("does not call the chip onClick on Enter in the delete button", async () => {
    const onClick = vi.fn();
    const onDelete = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VChip label="D" variant="input" onClick={onClick} onDelete={onDelete} />);
    await user.tab();
    await user.tab();
    await user.keyboard("{Enter}");
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("forwards native div props", () => {
    renderWithTheme(<VChip label="N" data-testid="chip" />);
    expect(screen.getByTestId("chip")).toBeInTheDocument();
  });

  it("applies the disabled state", () => {
    const { container } = renderWithTheme(<VChip label="Disabled" disabled />);
    expect(container.querySelector('[aria-disabled="true"]')).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VChip label="Custom" className="my-chip" />);
    expect(container.firstElementChild?.className).toContain("my-chip");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VChip ref={ref} label="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VChip label="Accessible" />);
    await axeTest(container);
  });
});

describe("VChip semantics", () => {
  it("is a button when it has onClick", () => {
    renderWithTheme(<VChip label="Open" onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute("tabindex", "0");
  });

  it("has no role and no tab stop without onClick", () => {
    renderWithTheme(<VChip label="Static" />);
    const chip = document.querySelector(".v-chip")!;
    expect(chip).not.toHaveAttribute("role");
    expect(chip).not.toHaveAttribute("tabindex");
  });

  it("leaves a disabled chip out of the tab order", () => {
    renderWithTheme(<VChip label="Off" variant="filter" disabled />);
    const chip = screen.getByRole("checkbox");
    expect(chip).toHaveAttribute("aria-disabled", "true");
    expect(chip).not.toHaveAttribute("tabindex");
  });
});
