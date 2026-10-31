import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VBreadcrumb, VBreadcrumbItem } from "./v-breadcrumb";

describe("VBreadcrumb", () => {
  it("renders by default", () => {
    renderWithTheme(
      <VBreadcrumb>
        <VBreadcrumbItem href="#">Home</VBreadcrumbItem>
        <VBreadcrumbItem active>Current</VBreadcrumbItem>
      </VBreadcrumb>,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
  });

  it("renders as a nav element", () => {
    renderWithTheme(
      <VBreadcrumb>
        <VBreadcrumbItem active>Home</VBreadcrumbItem>
      </VBreadcrumb>,
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("sets aria-current on the active item", () => {
    renderWithTheme(
      <VBreadcrumb>
        <VBreadcrumbItem active>Current</VBreadcrumbItem>
      </VBreadcrumb>,
    );
    expect(screen.getByText("Current")).toHaveAttribute("aria-current", "page");
  });

  it("renders as an a tag when href is set", () => {
    renderWithTheme(
      <VBreadcrumb>
        <VBreadcrumbItem href="/home">Home</VBreadcrumbItem>
      </VBreadcrumb>,
    );
    const link = screen.getByText("Home");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/home");
  });

  it("renders as a button and calls onClick when onClick is set", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <VBreadcrumb>
        <VBreadcrumbItem onClick={onClick}>Back</VBreadcrumbItem>
      </VBreadcrumb>,
    );
    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("collapses the middle when over maxItems", () => {
    renderWithTheme(
      <VBreadcrumb maxItems={3}>
        {["A", "B", "C", "D", "E"].map((label) => (
          <VBreadcrumbItem key={label} href="#">
            {label}
          </VBreadcrumbItem>
        ))}
      </VBreadcrumb>,
    );
    expect(screen.queryByText("B")).not.toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("E")).toBeInTheDocument();
  });

  it("forwards native props", () => {
    renderWithTheme(
      <VBreadcrumb data-testid="bc">
        <VBreadcrumbItem active title="here">
          Now
        </VBreadcrumbItem>
      </VBreadcrumb>,
    );
    expect(screen.getByTestId("bc")).toBeInTheDocument();
    expect(screen.getByText("Now")).toHaveAttribute("title", "here");
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(
      <VBreadcrumb>
        <VBreadcrumbItem href="/">Home</VBreadcrumbItem>
        <VBreadcrumbItem active>Now</VBreadcrumbItem>
      </VBreadcrumb>,
    );
    await axeTest(container);
  });
});
