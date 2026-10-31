import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VRadioGroup, VRadio } from "./v-radio";

describe("VRadioGroup", () => {
  it("renders with role radiogroup", () => {
    renderWithTheme(
      <VRadioGroup>
        <VRadio value="a" label="Option A" />
        <VRadio value="b" label="Option B" />
      </VRadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  it("shows the label", () => {
    renderWithTheme(
      <VRadioGroup>
        <VRadio value="a" label="Option A" />
      </VRadioGroup>,
    );
    expect(screen.getByText("Option A")).toBeInTheDocument();
  });

  it("applies defaultValue", () => {
    renderWithTheme(
      <VRadioGroup defaultValue="b">
        <VRadio value="a" label="A" />
        <VRadio value="b" label="B" />
      </VRadioGroup>,
    );
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
  });

  it("selects the radio when the label is clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VRadioGroup>
        <VRadio value="a" label="A" />
        <VRadio value="b" label="B" />
      </VRadioGroup>,
    );
    await user.click(screen.getByText("A"));
    expect(screen.getAllByRole("radio")[0]).toBeChecked();
  });

  it("shares the name attribute across all radios", () => {
    renderWithTheme(
      <VRadioGroup name="mygroup">
        <VRadio value="a" label="A" />
        <VRadio value="b" label="B" />
      </VRadioGroup>,
    );
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toHaveAttribute("name", "mygroup");
    expect(radios[1]).toHaveAttribute("name", "mygroup");
  });

  it("applies the disabled state (group)", () => {
    renderWithTheme(
      <VRadioGroup disabled>
        <VRadio value="a" label="A" />
        <VRadio value="b" label="B" />
      </VRadioGroup>,
    );
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toBeDisabled();
    expect(radios[1]).toBeDisabled();
  });

  it("applies disabled to an individual radio", () => {
    renderWithTheme(
      <VRadioGroup>
        <VRadio value="a" label="A" disabled />
        <VRadio value="b" label="B" />
      </VRadioGroup>,
    );
    expect(screen.getAllByRole("radio")[0]).toBeDisabled();
    expect(screen.getAllByRole("radio")[1]).not.toBeDisabled();
  });

  it("applies orientation", () => {
    renderWithTheme(
      <VRadioGroup orientation="horizontal">
        <VRadio value="a" label="A" />
      </VRadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("applies the size prop", () => {
    renderWithTheme(
      <VRadioGroup size="lg">
        <VRadio value="a" label="A" />
      </VRadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toHaveAttribute("data-v-size", "lg");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <VRadioGroup ref={ref}>
        <VRadio value="a" label="A" />
      </VRadioGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("calls onValueChange when a radio is clicked", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VRadioGroup defaultValue="a" onValueChange={onValueChange}>
        <VRadio value="a" label="A" />
        <VRadio value="b" label="B" />
      </VRadioGroup>,
    );
    await user.click(screen.getByText("B"));
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("does not call onValueChange for a disabled radio", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VRadioGroup defaultValue="a" onValueChange={onValueChange}>
        <VRadio value="a" label="A" />
        <VRadio value="b" label="B" disabled />
      </VRadioGroup>,
    );
    await user.click(screen.getByText("B"));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(
      <VRadioGroup defaultValue="a">
        <VRadio value="a" label="Option A" />
        <VRadio value="b" label="Option B" />
      </VRadioGroup>,
    );
    await axeTest(container);
  });
});
