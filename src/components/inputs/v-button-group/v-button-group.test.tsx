import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VButtonGroup } from "./v-button-group";

describe("VButtonGroup", () => {
  it('renders with role="toolbar"', () => {
    renderWithTheme(
      <VButtonGroup>
        <button>A</button>
        <button>B</button>
      </VButtonGroup>,
    );
    expect(screen.getByRole("toolbar")).toBeInTheDocument();
  });

  it("renders children", () => {
    renderWithTheme(
      <VButtonGroup>
        <button>Left</button>
        <button>Right</button>
      </VButtonGroup>,
    );
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
  });

  it("defaults to horizontal orientation", () => {
    const { container } = renderWithTheme(
      <VButtonGroup>
        <button>A</button>
      </VButtonGroup>,
    );
    expect(container.querySelector('[data-v-orientation="horizontal"]')).toBeInTheDocument();
  });

  it("applies vertical orientation", () => {
    const { container } = renderWithTheme(
      <VButtonGroup orientation="vertical">
        <button>A</button>
      </VButtonGroup>,
    );
    expect(container.querySelector('[data-v-orientation="vertical"]')).toBeInTheDocument();
  });

  it("merges className", () => {
    renderWithTheme(
      <VButtonGroup className="my-group">
        <button>A</button>
      </VButtonGroup>,
    );
    expect(screen.getByRole("toolbar").className).toContain("my-group");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <VButtonGroup ref={ref}>
        <button>A</button>
      </VButtonGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("joins items when spacing is 0 and adds a gap when spacing is greater than 0", () => {
    const { rerender } = renderWithTheme(
      <VButtonGroup>
        <button>A</button>
        <button>B</button>
      </VButtonGroup>,
    );
    expect(screen.getByRole("toolbar").className).toContain("-ml-px");
    expect(screen.getByRole("toolbar")).not.toHaveAttribute("spacing");
    rerender(
      <VButtonGroup spacing={8}>
        <button>A</button>
        <button>B</button>
      </VButtonGroup>,
    );
    expect(screen.getByRole("toolbar").className).not.toContain("-ml-px");
    expect(screen.getByRole("toolbar")).toHaveStyle({ gap: "8px" });
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(
      <VButtonGroup aria-label="Actions">
        <button>Edit</button>
        <button>Delete</button>
      </VButtonGroup>,
    );
    await axeTest(container);
  });
});
