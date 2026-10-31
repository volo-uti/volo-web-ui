import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VLoadingSpinner } from "./v-loading-spinner";

describe("VLoadingSpinner", () => {
  it('renders with role="status" and the default label', () => {
    renderWithTheme(<VLoadingSpinner />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading...");
  });

  it("allows overriding aria-label", () => {
    renderWithTheme(<VLoadingSpinner aria-label="Saving" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Saving");
  });

  it("accepts a VSize step and a px number for size", () => {
    const { container, rerender } = renderWithTheme(<VLoadingSpinner size="xl" />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "40");
    rerender(<VLoadingSpinner size={18} />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "18");
  });

  it("applies color to the circle stroke", () => {
    const { container } = renderWithTheme(<VLoadingSpinner color="rgb(255, 0, 0)" />);
    expect(container.querySelector("circle")).toHaveStyle({ stroke: "rgb(255, 0, 0)" });
  });

  it("applies strokeWidth", () => {
    const { container } = renderWithTheme(<VLoadingSpinner strokeWidth={5} />);
    expect(container.querySelector("circle")).toHaveAttribute("stroke-width", "5");
  });

  it("forwards className and native attributes", () => {
    renderWithTheme(<VLoadingSpinner className="custom" data-testid="spin" />);
    expect(screen.getByTestId("spin").className).toContain("custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VLoadingSpinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VLoadingSpinner />);
    await axeTest(container);
  });
});
