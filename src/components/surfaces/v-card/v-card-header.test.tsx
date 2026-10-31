import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VCardHeader } from "./v-card-header";

describe("VCardHeader", () => {
  it("renders title and description", () => {
    renderWithTheme(<VCardHeader title="Title" description="Description" />);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("renders action", () => {
    renderWithTheme(<VCardHeader title="Title" action={<span>Action</span>} />);
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("accepts a ReactNode as title", () => {
    renderWithTheme(<VCardHeader title={<strong>Bold</strong>} />);
    expect(screen.getByText("Bold").tagName).toBe("STRONG");
  });

  it("does not render the title area without title", () => {
    const { container } = renderWithTheme(<VCardHeader description="Only" />);
    expect(container.querySelectorAll(".v-card-header > div > div")).toHaveLength(1);
  });

  it("merges className and passes native attributes through", () => {
    const { container } = renderWithTheme(
      <VCardHeader title="T" className="custom" data-testid="h" />,
    );
    const header = container.querySelector(".v-card-header");
    expect(header?.className).toContain("custom");
    expect(header).toHaveAttribute("data-testid", "h");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VCardHeader ref={ref} title="T" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VCardHeader title="T" description="D" />);
    await axeTest(container);
  });
});
