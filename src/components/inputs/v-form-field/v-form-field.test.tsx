import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VFormField } from "./v-form-field";

describe("VFormField", () => {
  it("renders children", () => {
    renderWithTheme(
      <VFormField label="Name">
        <input id="name-input" />
      </VFormField>,
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("renders the label", () => {
    renderWithTheme(
      <VFormField label="Email">
        <input />
      </VFormField>,
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders the required mark (*)", () => {
    renderWithTheme(
      <VFormField label="Required Field" required>
        <input />
      </VFormField>,
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("shows the helper", () => {
    renderWithTheme(
      <VFormField label="Name" helper="Enter your full name">
        <input />
      </VFormField>,
    );
    expect(screen.getByText("Enter your full name")).toBeInTheDocument();
  });

  it("shows errorText in the error state", () => {
    renderWithTheme(
      <VFormField label="Name" error errorText="This field is required">
        <input />
      </VFormField>,
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("shows errorText instead of helper in the error state", () => {
    renderWithTheme(
      <VFormField label="Name" error errorText="Error!" helper="Helper">
        <input />
      </VFormField>,
    );
    expect(screen.getByText("Error!")).toBeInTheDocument();
    expect(screen.queryByText("Helper")).not.toBeInTheDocument();
  });

  it("applies the size prop", () => {
    const { container } = renderWithTheme(
      <VFormField label="Size" size="lg">
        <input />
      </VFormField>,
    );
    expect(container.querySelector('[data-v-size="lg"]')).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(
      <VFormField label="Custom" className="custom-field">
        <input />
      </VFormField>,
    );
    expect(container.firstElementChild?.className).toContain("custom-field");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <VFormField ref={ref} label="Ref">
        <input />
      </VFormField>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("composes VFormHeader and VFormFooter (label in the header row, helper and error in the footer row)", () => {
    const { container, rerender } = renderWithTheme(
      <VFormField label="Name" htmlFor="n" helper="Hint">
        <input id="n" />
      </VFormField>,
    );
    const label = screen.getByText("Name");
    const hint = screen.getByText("Hint");
    const [header, , footer] = Array.from(container.firstElementChild!.children);
    expect(header).toContainElement(label);
    expect(footer).toContainElement(hint);
    expect(hint).toHaveAttribute("id", "n-message");

    rerender(
      <VFormField label="Name" htmlFor="n" helper="Hint" error errorText="Bad">
        <input id="n" />
      </VFormField>,
    );
    expect(screen.getByText("Bad")).toHaveAttribute("id", "n-message");
    expect(screen.queryByText("Hint")).not.toBeInTheDocument();
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(
      <VFormField label="Accessible" htmlFor="a11y-input" helper="Help text">
        <input id="a11y-input" />
      </VFormField>,
    );
    await axeTest(container);
  });
});
