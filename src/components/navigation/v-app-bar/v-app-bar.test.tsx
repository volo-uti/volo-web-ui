import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VAppBar } from "./v-app-bar";

describe("VAppBar", () => {
  it("renders by default", () => {
    renderWithTheme(<VAppBar>content</VAppBar>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VAppBar className="custom">content</VAppBar>);
    expect(container.firstChild).toHaveClass("v-app-bar", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<VAppBar ref={ref}>content</VAppBar>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("HEADER");
  });

  it("renders a string title as h1 along with leading/actions", () => {
    renderWithTheme(<VAppBar title="Orders" leading={<span>L</span>} actions={<span>A</span>} />);
    expect(screen.getByRole("heading", { level: 1, name: "Orders" })).toBeInTheDocument();
    expect(screen.getByText("L")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("centers the title with centered and centerTitle", () => {
    renderWithTheme(<VAppBar title="T" variant="centered" />);
    expect(screen.getByRole("heading").parentElement).toHaveClass("text-center");
  });

  it("adds the sticky class and forwards native props when sticky", () => {
    renderWithTheme(<VAppBar sticky data-testid="bar" />);
    expect(screen.getByTestId("bar")).toHaveClass("sticky");
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VAppBar title="Orders" />);
    await axeTest(container);
  });
});
