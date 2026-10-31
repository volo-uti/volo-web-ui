import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen } from "../../../test-utils";
import { VGrid } from "./v-grid";

describe("VGrid", () => {
  it("renders by default", () => {
    renderWithTheme(<VGrid>content</VGrid>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VGrid className="custom">content</VGrid>);
    expect(container.firstChild).toHaveClass("v-grid", "grid", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VGrid ref={ref}>content</VGrid>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies a 2-column grid by default", () => {
    const { container } = renderWithTheme(<VGrid>content</VGrid>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gridTemplateColumns).toBe("repeat(2, 1fr)");
  });

  it("sets the column count with the columns prop", () => {
    const { container } = renderWithTheme(<VGrid columns={4}>content</VGrid>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gridTemplateColumns).toBe("repeat(4, 1fr)");
  });

  it("applies auto-fill mode with minChildWidth", () => {
    const { container } = renderWithTheme(<VGrid minChildWidth={200}>content</VGrid>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gridTemplateColumns).toBe("repeat(auto-fill, minmax(200px, 1fr))");
  });

  it("uses a minChildWidth string as-is", () => {
    const { container } = renderWithTheme(<VGrid minChildWidth="15rem">content</VGrid>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gridTemplateColumns).toBe("repeat(auto-fill, minmax(15rem, 1fr))");
  });

  it("applies gap (number)", () => {
    const { container } = renderWithTheme(<VGrid gap={16}>content</VGrid>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gap).toBe("16px");
  });

  it("applies gap (string)", () => {
    const { container } = renderWithTheme(<VGrid gap="1rem">content</VGrid>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gap).toBe("1rem");
  });

  it("applies rowGap and colGap separately", () => {
    const { container } = renderWithTheme(
      <VGrid rowGap={8} colGap={16}>
        content
      </VGrid>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.rowGap).toBe("8px");
    expect(el.style.columnGap).toBe("16px");
  });

  it("applies padding", () => {
    const { container } = renderWithTheme(<VGrid padding={24}>content</VGrid>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.padding).toBe("24px");
  });

  it("wraps children for aspectRatio", () => {
    const { container } = renderWithTheme(
      <VGrid aspectRatio={1.5}>
        <div data-testid="child-1">A</div>
        <div data-testid="child-2">B</div>
      </VGrid>,
    );
    const grid = container.firstChild as HTMLElement;
    const wrappers = grid.children;
    expect(wrappers).toHaveLength(2);
    // Each child is wrapped in a div with overflow-hidden class (aspect-ratio via inline style)
    expect(wrappers[0]).toHaveClass("overflow-hidden");
    // The original child is nested inside the wrapper
    expect(screen.getByTestId("child-1").parentElement).toHaveClass("overflow-hidden");
  });

  it("maps a gap token to a spacing variable", () => {
    const { container } = renderWithTheme(<VGrid gap="lg">content</VGrid>);
    expect((container.firstChild as HTMLElement).style.gap).toBe("var(--v-spacing-lg)");
  });

  it("follows gap for colGap when only rowGap is given", () => {
    const { container } = renderWithTheme(
      <VGrid gap="sm" rowGap={4}>
        content
      </VGrid>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.rowGap).toBe("4px");
    expect(el.style.columnGap).toBe("var(--v-spacing-sm)");
  });
});
