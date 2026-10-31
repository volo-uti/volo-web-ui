import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VFormBody } from "./v-form-body";

describe("VFormBody", () => {
  it("renders children", () => {
    renderWithTheme(<VFormBody>body</VFormBody>);
    expect(screen.getByText("body")).toBeInTheDocument();
  });

  it("renders leading and trailing", () => {
    renderWithTheme(
      <VFormBody leading={<i data-testid="lead" />} trailing={<i data-testid="trail" />}>
        body
      </VFormBody>,
    );
    expect(screen.getByTestId("lead")).toBeInTheDocument();
    expect(screen.getByTestId("trail")).toBeInTheDocument();
  });

  it("changes shape by variant", () => {
    const { container, rerender } = renderWithTheme(<VFormBody variant="filled">b</VFormBody>);
    expect(container.firstChild).toHaveClass("bg-[var(--v-muted)]/30");
    rerender(<VFormBody variant="underline">b</VFormBody>);
    expect(container.firstChild).toHaveClass("border-b");
  });

  it("uses the error color border when error is set", () => {
    const { container } = renderWithTheme(<VFormBody error>b</VFormBody>);
    expect(container.firstChild).toHaveClass("border-[var(--v-error)]");
  });

  it("blocks pointer events when disabled", () => {
    const { container } = renderWithTheme(<VFormBody disabled>b</VFormBody>);
    expect(container.firstChild).toHaveClass("pointer-events-none");
  });

  it("does not leak its own props to DOM attributes", () => {
    const { container } = renderWithTheme(
      <VFormBody
        variant="filled"
        fullWidth
        focused
        success
        readOnly
        color="secondary"
        corner="pill"
      >
        b
      </VFormBody>,
    );
    const el = container.firstChild as HTMLElement;
    for (const name of [
      "variant",
      "fullwidth",
      "focused",
      "success",
      "readonly",
      "color",
      "corner",
    ]) {
      expect(el).not.toHaveAttribute(name);
    }
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VFormBody className="custom">b</VFormBody>);
    expect(container.firstChild).toHaveClass("custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VFormBody ref={ref}>b</VFormBody>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(
      <VFormBody>
        <input aria-label="x" />
      </VFormBody>,
    );
    await axeTest(container);
  });
});
