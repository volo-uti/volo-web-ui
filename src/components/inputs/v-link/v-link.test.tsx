import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VLink } from "./v-link";

describe("VLink", () => {
  it("renders an a tag", () => {
    renderWithTheme(<VLink href="/about">About</VLink>);
    const link = screen.getByRole("link", { name: "About" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/about");
  });

  it("applies target/rel to external links", () => {
    renderWithTheme(
      <VLink href="https://example.com" external>
        External
      </VLink>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("shows an icon on external links", () => {
    const { container } = renderWithTheme(
      <VLink href="https://example.com" external>
        Ext
      </VLink>,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it('applies underline="always"', () => {
    renderWithTheme(
      <VLink href="#" underline="always">
        Underlined
      </VLink>,
    );
    const link = screen.getByRole("link");
    expect(link.className).toContain("underline");
  });

  it("applies the color prop", () => {
    renderWithTheme(
      <VLink href="#" color="secondary">
        Secondary
      </VLink>,
    );
    const link = screen.getByRole("link");
    expect(link.className).toContain("v-link");
  });

  it("merges className", () => {
    renderWithTheme(
      <VLink href="#" className="custom-link">
        Custom
      </VLink>,
    );
    const link = screen.getByRole("link");
    expect(link.className).toContain("custom-link");
  });

  it("calls onClick", async () => {
    const onClick = vi.fn((e: { preventDefault: () => void }) => e.preventDefault());
    const user = userEvent.setup();
    renderWithTheme(
      <VLink href="#" onClick={onClick}>
        Go
      </VLink>,
    );
    await user.click(screen.getByRole("link"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("passes native attributes (target, rel) through", () => {
    renderWithTheme(
      <VLink href="/x" target="_self" rel="nofollow">
        Native
      </VLink>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_self");
    expect(link).toHaveAttribute("rel", "nofollow");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLAnchorElement>();
    renderWithTheme(
      <VLink ref={ref} href="#">
        Ref
      </VLink>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VLink href="/page">Accessible link</VLink>);
    await axeTest(container);
  });
});
