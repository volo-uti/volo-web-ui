import { createRef } from "react";
import { VoloProvider } from "../../../provider";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VBottomNav } from "./v-bottom-nav";

const items = [
  { value: "home", label: "Home", icon: "H" },
  { value: "search", label: "Search", icon: "S" },
  { value: "off", label: "Off", icon: "O", disabled: true },
];

describe("VBottomNav", () => {
  it("renders by default", () => {
    renderWithTheme(<VBottomNav>content</VBottomNav>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VBottomNav className="custom">content</VBottomNav>);
    expect(container.firstChild).toHaveClass("v-bottom-nav", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<VBottomNav ref={ref}>content</VBottomNav>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("NAV");
  });

  it("shows the selection from value", () => {
    renderWithTheme(<VBottomNav items={items} value="search" />);
    expect(screen.getByRole("tab", { name: "Search" })).toHaveAttribute("aria-selected", "true");
  });

  it("calls onValueChange when an item is pressed", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithTheme(<VBottomNav items={items} value="home" onValueChange={onValueChange} />);
    await user.click(screen.getByRole("tab", { name: "Search" }));
    expect(onValueChange).toHaveBeenCalledWith("search");
    expect(screen.getByRole("tab", { name: "Home" })).toHaveAttribute("aria-selected", "true");
  });

  it("changes the uncontrolled selection from defaultValue", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VBottomNav items={items} defaultValue="home" />);
    await user.click(screen.getByRole("tab", { name: "Search" }));
    expect(screen.getByRole("tab", { name: "Search" })).toHaveAttribute("aria-selected", "true");
  });

  it("does not select a disabled item", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithTheme(<VBottomNav items={items} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("tab", { name: "Off" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VBottomNav items={items} value="home" />);
    await axeTest(container);
  });
});

describe("VBottomNav badge and label", () => {
  it("renders no stray 0 for a badge of 0", () => {
    renderWithTheme(<VBottomNav items={[{ value: "a", label: "A", icon: "i", badge: 0 }]} />);
    expect(screen.getByRole("tab").textContent).toBe("iA");
  });

  it("renders a positive badge", () => {
    renderWithTheme(<VBottomNav items={[{ value: "a", label: "A", icon: "i", badge: 3 }]} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("takes its label from the locale text", () => {
    renderWithTheme(
      <VoloProvider locale="fr" localeText={{ bottomNavLabel: "Main tabs" }}>
        <VBottomNav items={items} />
      </VoloProvider>,
    );
    expect(screen.getByRole("tablist")).toHaveAttribute("aria-label", "Main tabs");
  });
});
