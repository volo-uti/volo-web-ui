import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VSection } from "./v-section";

describe("VSection", () => {
  it("renders by default", () => {
    renderWithTheme(<VSection>content</VSection>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VSection className="custom">content</VSection>);
    expect(container.firstChild).toHaveClass("v-section", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<VSection ref={ref}>content</VSection>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("SECTION");
  });

  const renderCollapsible = (props: Record<string, unknown> = {}) =>
    renderWithTheme(
      <VSection title="Account" collapsible {...props}>
        body
      </VSection>,
    );

  it("renders title, description, and footer", () => {
    renderWithTheme(
      <VSection title="T" description={<em>desc</em>} footer="foot">
        body
      </VSection>,
    );
    expect(screen.getByRole("heading", { name: "T" })).toBeInTheDocument();
    expect(screen.getByText("desc")).toBeInTheDocument();
    expect(screen.getByText("foot")).toBeInTheDocument();
  });

  it("is open by default when collapsible and collapses on header click", async () => {
    const onOpenChange = vi.fn();
    renderCollapsible({ onOpenChange });
    const header = screen.getByRole("button");
    expect(header).toHaveAttribute("aria-expanded", "true");

    await userEvent.setup().click(header);

    expect(screen.queryByText("body")).not.toBeInTheDocument();
    expect(header).toHaveAttribute("aria-expanded", "false");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("toggles with Enter and Space", async () => {
    const user = userEvent.setup();
    renderCollapsible();
    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    expect(screen.queryByText("body")).not.toBeInTheDocument();
    await user.keyboard(" ");
    expect(screen.getByText("body")).toBeInTheDocument();
  });

  it("starts collapsed when defaultOpen=false", () => {
    renderCollapsible({ defaultOpen: false });
    expect(screen.queryByText("body")).not.toBeInTheDocument();
  });

  it("uses open as the state in controlled mode and clicks only call the callback", async () => {
    const onOpenChange = vi.fn();
    renderCollapsible({ open: true, onOpenChange });
    await userEvent.setup().click(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByText("body")).toBeInTheDocument();
  });

  it("does not collapse on click unless collapsible", async () => {
    renderWithTheme(<VSection title="T">body</VSection>);
    await userEvent.setup().click(screen.getByText("T"));
    expect(screen.getByText("body")).toBeInTheDocument();
  });

  it("hides the footer when collapsed", () => {
    renderCollapsible({ defaultOpen: false, footer: "foot" });
    expect(screen.queryByText("foot")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderCollapsible({ description: "d" });
    await axeTest(container);
  });
});
