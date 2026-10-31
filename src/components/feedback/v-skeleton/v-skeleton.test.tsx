import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, axeTest } from "../../../test-utils";
import { VSkeleton } from "./v-skeleton";

describe("VSkeleton", () => {
  it("renders by default", () => {
    const { container } = renderWithTheme(<VSkeleton />);
    expect(container.querySelector(".v-skeleton")).toBeInTheDocument();
  });

  it('sets aria-hidden="true"', () => {
    const { container } = renderWithTheme(<VSkeleton />);
    const el = container.querySelector(".v-skeleton");
    expect(el).toHaveAttribute("aria-hidden", "true");
  });

  it("defaults to the text variant", () => {
    const { container } = renderWithTheme(<VSkeleton />);
    expect(container.querySelector('[data-v-variant="text"]')).toBeInTheDocument();
  });

  it("applies the circular variant", () => {
    const { container } = renderWithTheme(<VSkeleton variant="circular" />);
    expect(container.querySelector('[data-v-variant="circular"]')).toBeInTheDocument();
  });

  it("applies the rectangular variant", () => {
    const { container } = renderWithTheme(<VSkeleton variant="rectangular" />);
    expect(container.querySelector('[data-v-variant="rectangular"]')).toBeInTheDocument();
  });

  it("applies width/height as style", () => {
    const { container } = renderWithTheme(<VSkeleton width={200} height={100} />);
    const el = container.querySelector(".v-skeleton") as HTMLElement;
    expect(el.style.width).toBe("200px");
    expect(el.style.height).toBe("100px");
  });

  it("applies string width/height", () => {
    const { container } = renderWithTheme(<VSkeleton width="50%" height="2em" />);
    const el = container.querySelector(".v-skeleton") as HTMLElement;
    expect(el.style.width).toBe("50%");
    expect(el.style.height).toBe("2em");
  });

  it("defaults to the pulse animation", () => {
    const { container } = renderWithTheme(<VSkeleton />);
    const el = container.querySelector(".v-skeleton");
    expect(el?.className).toContain("animate-pulse");
  });

  it("has no animation class when animation={false}", () => {
    const { container } = renderWithTheme(<VSkeleton animation={false} />);
    expect(container.querySelector(".v-skeleton")?.className).not.toContain("animate-");
  });

  it("renders as many lines as the text variant lines prop", () => {
    const { container } = renderWithTheme(<VSkeleton variant="text" lines={3} />);
    expect(container.querySelectorAll(".v-skeleton")).toHaveLength(3);
  });

  it("uses size as the diameter for the circular variant", () => {
    const { container } = renderWithTheme(<VSkeleton variant="circular" size={48} />);
    const el = container.querySelector(".v-skeleton") as HTMLElement;
    expect(el.style.width).toBe("48px");
    expect(el.style.height).toBe("48px");
  });

  it("forwards native attributes", () => {
    const { container } = renderWithTheme(<VSkeleton data-testid="sk" />);
    expect(container.querySelector('[data-testid="sk"]')).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VSkeleton className="custom-skel" />);
    const el = container.querySelector(".v-skeleton");
    expect(el?.className).toContain("custom-skel");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VSkeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VSkeleton variant="text" width="200px" />);
    await axeTest(container);
  });
});
