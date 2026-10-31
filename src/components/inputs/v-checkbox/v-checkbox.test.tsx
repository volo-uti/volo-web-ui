import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VCheckbox } from "./v-checkbox";

describe("VCheckbox", () => {
  it("renders with role checkbox", () => {
    renderWithTheme(<VCheckbox label="Accept" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("shows the label", () => {
    renderWithTheme(<VCheckbox label="Remember me" />);
    expect(screen.getByText("Remember me")).toBeInTheDocument();
  });

  it("toggles the checked state when the label is clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VCheckbox label="Toggle" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    await user.click(screen.getByText("Toggle"));
    expect(checkbox).toBeChecked();
  });

  it("follows checked in controlled mode", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VCheckbox label="Ctrl" checked={false} onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(checkbox).not.toBeChecked();
  });

  it("works in uncontrolled mode", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VCheckbox label="Unctrl" defaultChecked={false} />);
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("applies the disabled state", () => {
    renderWithTheme(<VCheckbox label="Disabled" disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("applies the size prop", () => {
    const { container } = renderWithTheme(<VCheckbox label="Size" size="lg" />);
    expect(container.querySelector('[data-v-size="lg"]')).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VCheckbox label="Custom" className="my-check" />);
    expect(container.firstElementChild?.className).toContain("my-check");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLInputElement>();
    renderWithTheme(<VCheckbox ref={ref} label="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("calls onCheckedChange on click", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VCheckbox label="Test" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("does not call onCheckedChange when disabled", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VCheckbox label="Off" disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("keeps the native indeterminate flag equal to the prop after a click", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VCheckbox label="All" indeterminate />);
    const checkbox = screen.getByLabelText("All") as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);
    expect(checkbox.indeterminate).toBe(true);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VCheckbox label="Accessible" />);
    await axeTest(container);
  });
});
