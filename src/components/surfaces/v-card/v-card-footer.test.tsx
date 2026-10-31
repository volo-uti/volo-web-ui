import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VCardFooter } from "./v-card-footer";

describe("VCardFooter", () => {
  it("renders children", () => {
    renderWithTheme(<VCardFooter>OK</VCardFooter>);
    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("defaults alignment to end", () => {
    const { container } = renderWithTheme(<VCardFooter>OK</VCardFooter>);
    expect(container.querySelector(".v-card-footer")?.className).toContain("justify-end");
  });

  it.each([
    ["start", "justify-start"],
    ["center", "justify-center"],
    ["between", "justify-between"],
  ] as const)("applies alignment=%s", (alignment, cls) => {
    const { container } = renderWithTheme(<VCardFooter alignment={alignment}>OK</VCardFooter>);
    expect(container.querySelector(".v-card-footer")?.className).toContain(cls);
  });

  it("merges className and passes native attributes through", () => {
    const { container } = renderWithTheme(
      <VCardFooter className="custom" data-testid="f">
        OK
      </VCardFooter>,
    );
    const footer = container.querySelector(".v-card-footer");
    expect(footer?.className).toContain("custom");
    expect(footer).toHaveAttribute("data-testid", "f");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VCardFooter ref={ref}>OK</VCardFooter>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VCardFooter>OK</VCardFooter>);
    await axeTest(container);
  });
});
