import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VStack } from "./v-stack";

describe("VStack", () => {
  it("renders by default", () => {
    renderWithTheme(<VStack>content</VStack>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VStack className="custom">content</VStack>);
    expect(container.firstChild).toHaveClass("v-stack", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VStack ref={ref}>content</VStack>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("is a vertical flex by default and horizontal when horizontal", () => {
    const { container, rerender } = renderWithTheme(<VStack>x</VStack>);
    expect(container.firstChild).toHaveClass("flex", "flex-col");
    rerender(<VStack direction="horizontal">x</VStack>);
    expect(container.firstChild).toHaveClass("flex-row");
  });

  it("maps a spacing token to a spacing variable, a number to px, and uses a string as-is", () => {
    const { container, rerender } = renderWithTheme(<VStack spacing="md">x</VStack>);
    expect((container.firstChild as HTMLElement).style.gap).toBe("var(--v-spacing-md)");
    rerender(<VStack spacing={12}>x</VStack>);
    expect((container.firstChild as HTMLElement).style.gap).toBe("12px");
    rerender(<VStack spacing="2rem">x</VStack>);
    expect((container.firstChild as HTMLElement).style.gap).toBe("2rem");
  });

  it("applies align, justify, wrap, and inline as classes", () => {
    const { container } = renderWithTheme(
      <VStack align="center" justify="between" wrap inline>
        x
      </VStack>,
    );
    expect(container.firstChild).toHaveClass(
      "items-center",
      "justify-between",
      "flex-wrap",
      "inline-flex",
    );
  });

  it("accepts native props", () => {
    renderWithTheme(<VStack data-testid="s" aria-label="stack" />);
    expect(screen.getByTestId("s")).toHaveAttribute("aria-label", "stack");
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VStack>content</VStack>);
    await axeTest(container);
  });
});
