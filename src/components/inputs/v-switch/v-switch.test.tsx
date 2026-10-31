import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VSwitch } from "./v-switch";

describe("VSwitch", () => {
  it('renders with role="switch"', () => {
    renderWithTheme(<VSwitch label="Dark mode" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("shows the label", () => {
    renderWithTheme(<VSwitch label="Enable" />);
    expect(screen.getByText("Enable")).toBeInTheDocument();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VSwitch label="Toggle" />);
    const sw = screen.getByRole("switch");
    expect(sw).not.toBeChecked();
    await user.click(sw);
    expect(sw).toBeChecked();
  });

  it("follows checked in controlled mode", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VSwitch label="Ctrl" checked={true} onCheckedChange={onCheckedChange} />);
    const sw = screen.getByRole("switch");
    expect(sw).toBeChecked();
    await user.click(sw);
    expect(onCheckedChange).toHaveBeenCalledWith(false);
    expect(sw).toBeChecked();
  });

  it("applies the disabled state", () => {
    renderWithTheme(<VSwitch label="Disabled" disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("applies the size prop", () => {
    const { container } = renderWithTheme(<VSwitch label="Size" size="sm" />);
    expect(container.querySelector('[data-v-size="sm"]')).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VSwitch label="Custom" className="my-switch" />);
    expect(container.firstElementChild?.className).toContain("my-switch");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLInputElement>();
    renderWithTheme(<VSwitch ref={ref} label="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("calls onCheckedChange on click", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VSwitch label="Test" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("does not call onCheckedChange when disabled", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VSwitch label="Off" disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("names the switch by its label even when a sublabel describes it", async () => {
    const { container } = renderWithTheme(<VSwitch label="Sync" sublabel="Every hour" />);
    const input = screen.getByRole("switch", { name: "Sync" });
    expect(input).toHaveAttribute("aria-labelledby");
    expect(input).toHaveAccessibleDescription("Every hour");
    await axeTest(container);
  });

  it("keeps an explicit aria-label over the label", () => {
    renderWithTheme(<VSwitch label="Sync" aria-label="Sync now" />);
    expect(screen.getByRole("switch", { name: "Sync now" })).toBeInTheDocument();
  });

  it("shows the sublabel and associates it with the switch", () => {
    renderWithTheme(<VSwitch label="Sync" sublabel="Every hour" />);
    expect(screen.getByText("Every hour")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toHaveAccessibleDescription("Every hour");
  });

  it("shows the I/O marks following the state with variant='labeled'", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VSwitch variant="labeled" label="Mark" />);
    expect(screen.getByText("O")).toBeInTheDocument();
    await user.click(screen.getByRole("switch"));
    expect(screen.getByText("I")).toBeInTheDocument();
  });

  it("applies activeColor to the track when on", () => {
    const { container } = renderWithTheme(<VSwitch defaultChecked activeColor="rgb(1, 2, 3)" />);
    expect(container.querySelector('[style*="background-color"]')).toHaveStyle({
      backgroundColor: "rgb(1, 2, 3)",
    });
  });

  it("does not leak variant, activeColor, and sublabel to the input", () => {
    renderWithTheme(<VSwitch variant="labeled" activeColor="red" sublabel="s" label="x" />);
    const input = screen.getByRole("switch");
    expect(input).not.toHaveAttribute("variant");
    expect(input).not.toHaveAttribute("activecolor");
    expect(input).not.toHaveAttribute("sublabel");
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VSwitch label="Accessible switch" />);
    await axeTest(container);
  });
});
