import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VDivider } from "./v-divider";

describe("VDivider", () => {
  it("renders (horizontal separator)", () => {
    renderWithTheme(<VDivider />);
    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("vertical orientation", () => {
    renderWithTheme(<VDivider orientation="vertical" />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
  });

  it("dashed variant", () => {
    renderWithTheme(<VDivider variant="dashed" />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("data-v-variant", "dashed");
  });

  it("renders the label", () => {
    renderWithTheme(<VDivider label="OR" />);
    expect(screen.getByText("OR")).toBeInTheDocument();
  });

  it("merges className", () => {
    renderWithTheme(<VDivider className="my-4" />);
    const separator = screen.getByRole("separator");
    expect(separator.className).toContain("my-4");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VDivider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("merges native div props and style", () => {
    renderWithTheme(<VDivider data-testid="d" style={{ marginTop: 4 }} />);
    expect(screen.getByTestId("d")).toHaveStyle({ marginTop: "4px" });
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VDivider />);
    await axeTest(container);
  });
});

describe("VDivider indents", () => {
  it("shortens a horizontal divider by indent and endIndent", () => {
    const { container } = renderWithTheme(<VDivider indent={20} endIndent={30} />);
    const line = container.querySelector(".v-divider") as HTMLElement;
    expect(line.style.width).toBe("calc(100% - 50px)");
    expect(line.style.marginLeft).toBe("20px");
    expect(line.style.marginRight).toBe("30px");
  });

  it("applies endIndent on its own", () => {
    const { container } = renderWithTheme(<VDivider endIndent={16} />);
    expect((container.querySelector(".v-divider") as HTMLElement).style.width).toBe(
      "calc(100% - 16px)",
    );
  });

  it("keeps the full width without indents", () => {
    const { container } = renderWithTheme(<VDivider />);
    expect((container.querySelector(".v-divider") as HTMLElement).style.width).toBe("");
  });
});
