import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VProgress } from "./v-progress";

describe("VProgress", () => {
  it('renders with role="progressbar"', () => {
    renderWithTheme(<VProgress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("reflects value in aria-valuenow", () => {
    renderWithTheme(<VProgress value={75} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "75");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("defaults to the linear variant", () => {
    const { container } = renderWithTheme(<VProgress value={50} />);
    expect(container.querySelector('[data-v-variant="linear"]')).toBeInTheDocument();
  });

  it("applies the circular variant", () => {
    const { container } = renderWithTheme(<VProgress value={50} variant="circular" />);
    expect(container.querySelector('[data-v-variant="circular"]')).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies the size prop", () => {
    const { container } = renderWithTheme(<VProgress value={50} size="lg" />);
    expect(container.querySelector('[data-v-size="lg"]')).toBeInTheDocument();
  });

  it("has no aria-valuenow in indeterminate mode", () => {
    renderWithTheme(<VProgress indeterminate />);
    const bar = screen.getByRole("progressbar");
    expect(bar).not.toHaveAttribute("aria-valuenow");
  });

  it("clamps value to the 0-100 range", () => {
    renderWithTheme(<VProgress value={150} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "100");
  });

  it("applies color to the fill", () => {
    const { container } = renderWithTheme(<VProgress value={50} color="success" />);
    expect(container.querySelector(".bg-\\[var\\(--v-success\\)\\]")).toBeInTheDocument();
  });

  it("applies backgroundColor to the track", () => {
    renderWithTheme(<VProgress value={50} backgroundColor="rgb(255, 0, 0)" />);
    expect(screen.getByRole("progressbar")).toHaveStyle({ backgroundColor: "rgb(255, 0, 0)" });
  });

  it("forwards aria-label and native attributes", () => {
    renderWithTheme(<VProgress value={50} aria-label="Upload" data-testid="p" />);
    expect(screen.getByLabelText("Upload")).toHaveAttribute("data-testid", "p");
  });

  it("merges className", () => {
    renderWithTheme(<VProgress value={50} className="custom-progress" />);
    const bar = screen.getByRole("progressbar");
    expect(bar.className).toContain("custom-progress");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VProgress ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VProgress value={60} aria-label="Loading progress" />);
    await axeTest(container);
  });
});

describe("VProgress with a non-numeric value", () => {
  it("treats NaN as 0 instead of rendering aria-valuenow=NaN", () => {
    const { container } = renderWithTheme(<VProgress value={NaN} aria-label="p" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
    expect(container.innerHTML).not.toContain("NaN");
  });

  it("treats NaN as 0 in the circular variant", () => {
    const { container } = renderWithTheme(
      <VProgress variant="circular" value={NaN} aria-label="p" />,
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
    expect(container.innerHTML).not.toContain("NaN");
  });

  it("clamps infinities", () => {
    renderWithTheme(<VProgress value={Infinity} aria-label="p" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
  });
});
