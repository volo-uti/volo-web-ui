import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VBadge } from "./v-badge";

describe("VBadge", () => {
  it("renders by default", () => {
    renderWithTheme(
      <VBadge content={5}>
        <span>Mail</span>
      </VBadge>,
    );
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Mail")).toBeInTheDocument();
  });

  it("shows content as a number", () => {
    renderWithTheme(
      <VBadge content={42}>
        <span>Icon</span>
      </VBadge>,
    );
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it('shows "99+" when over max', () => {
    renderWithTheme(
      <VBadge content={150} max={99}>
        <span>Icon</span>
      </VBadge>,
    );
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("applies the variant prop", () => {
    const { container } = renderWithTheme(
      <VBadge content={5} variant="primary">
        <span>Icon</span>
      </VBadge>,
    );
    expect(container.querySelector('[data-v-variant="primary"]')).toBeInTheDocument();
  });

  it("applies the destructive variant", () => {
    const { container } = renderWithTheme(
      <VBadge content={1} variant="destructive">
        <span>X</span>
      </VBadge>,
    );
    expect(container.querySelector('[data-v-variant="destructive"]')).toBeInTheDocument();
  });

  it("applies scale-0 when invisible", () => {
    const { container } = renderWithTheme(
      <VBadge content={1} invisible>
        <span>X</span>
      </VBadge>,
    );
    const badge = container.querySelector(".v-badge span:last-child");
    expect(badge?.className).toContain("scale-0");
  });

  it("merges className", () => {
    const { container } = renderWithTheme(
      <VBadge content={1} className="my-badge">
        <span>X</span>
      </VBadge>,
    );
    expect(container.firstElementChild?.className).toContain("my-badge");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <VBadge ref={ref} content={1}>
        <span>X</span>
      </VBadge>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards native div props", () => {
    renderWithTheme(
      <VBadge content={1} data-testid="badge">
        <span>X</span>
      </VBadge>,
    );
    expect(screen.getByTestId("badge")).toHaveClass("v-badge");
  });

  it("applies the size prop", () => {
    const { container } = renderWithTheme(
      <VBadge content={1} size="lg">
        <span>X</span>
      </VBadge>,
    );
    expect(container.querySelector('[data-v-size="lg"]')).toBeInTheDocument();
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(
      <VBadge content={3}>
        <span>Notifications</span>
      </VBadge>,
    );
    await axeTest(container);
  });
});

describe("VBadge count edge cases", () => {
  it("never renders a zero cap", () => {
    renderWithTheme(
      <VBadge content={5} max={0}>
        <span>Icon</span>
      </VBadge>,
    );
    expect(screen.queryByText("0+")).toBeNull();
    expect(screen.getByText("1+")).toBeInTheDocument();
  });

  it("renders nothing for a non-finite count", () => {
    renderWithTheme(
      <VBadge content={Number.NaN}>
        <span>Icon</span>
      </VBadge>,
    );
    expect(screen.queryByText("NaN")).toBeNull();
  });

  it("floors a fractional cap", () => {
    renderWithTheme(
      <VBadge content={50} max={9.9}>
        <span>Icon</span>
      </VBadge>,
    );
    expect(screen.getByText("9+")).toBeInTheDocument();
  });
});
