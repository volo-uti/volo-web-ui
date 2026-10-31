import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VBox } from "./v-box";

describe("VBox", () => {
  it("renders by default", () => {
    renderWithTheme(<VBox>content</VBox>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VBox className="custom">content</VBox>);
    expect(container.firstChild).toHaveClass("v-box", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VBox ref={ref}>content</VBox>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies per-variant styles and data-v-variant", () => {
    const { container } = renderWithTheme(<VBox variant="elevated">x</VBox>);
    expect(container.firstChild).toHaveAttribute("data-v-variant", "elevated");
    expect((container.firstChild as HTMLElement).className).toContain("shadow");
  });

  it("applies padding, margin, width, and height as px for numbers and as-is for strings", () => {
    const { container } = renderWithTheme(
      <VBox padding={8} margin="1rem" width={100} height="50%">
        x
      </VBox>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.padding).toBe("8px");
    expect(el.style.margin).toBe("1rem");
    expect(el.style.width).toBe("100px");
    expect(el.style.height).toBe("50%");
  });

  it("adds a border to the default variant when bordered", () => {
    const { container } = renderWithTheme(<VBox bordered>x</VBox>);
    expect(container.firstChild).toHaveClass("border");
  });

  it("applies the radius class per size when rounded", () => {
    const { container, rerender } = renderWithTheme(<VBox rounded>x</VBox>);
    expect((container.firstChild as HTMLElement).className).toContain("--v-radius-md");
    rerender(<VBox rounded="lg">x</VBox>);
    expect((container.firstChild as HTMLElement).className).toContain("--v-radius-lg");
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VBox>content</VBox>);
    await axeTest(container);
  });
});
