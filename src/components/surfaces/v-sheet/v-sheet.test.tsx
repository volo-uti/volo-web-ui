import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VSheet } from "./v-sheet";

describe("VSheet", () => {
  it("renders by default", () => {
    renderWithTheme(<VSheet>Content</VSheet>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("defaults to the filled variant", () => {
    const { container } = renderWithTheme(<VSheet>V</VSheet>);
    expect(container.querySelector('[data-v-variant="filled"]')).toBeInTheDocument();
  });

  it("applies the outlined variant", () => {
    const { container } = renderWithTheme(<VSheet variant="outlined">V</VSheet>);
    expect(container.querySelector('[data-v-variant="outlined"]')).toBeInTheDocument();
  });

  it("applies the v-sheet class", () => {
    const { container } = renderWithTheme(<VSheet>S</VSheet>);
    expect(container.querySelector(".v-sheet")).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VSheet className="custom-sheet">S</VSheet>);
    expect(container.firstElementChild?.className).toContain("custom-sheet");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VSheet ref={ref}>R</VSheet>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("renders another element with as", () => {
    const { container } = renderWithTheme(<VSheet as="section">S</VSheet>);
    expect(container.querySelector("section.v-sheet")).toBeInTheDocument();
  });

  it("passes role and native attributes through", () => {
    renderWithTheme(
      <VSheet role="region" aria-label="Info" data-testid="sheet">
        S
      </VSheet>,
    );
    expect(screen.getByRole("region", { name: "Info" })).toHaveAttribute("data-testid", "sheet");
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VSheet>Accessible sheet</VSheet>);
    await axeTest(container);
  });
});
