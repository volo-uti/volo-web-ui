import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VSwitchListTile } from "./v-switch-list-tile";

describe("VSwitchListTile", () => {
  it("renders by default", () => {
    renderWithTheme(<VSwitchListTile title="Wi-Fi" />);
    expect(screen.getByText("Wi-Fi")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("toggles the switch state on click", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VSwitchListTile title="Opt" checked={false} onCheckedChange={onCheckedChange} />,
    );
    await user.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("is disabled", () => {
    renderWithTheme(<VSwitchListTile title="Disabled" disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("renders the subtitle", () => {
    renderWithTheme(<VSwitchListTile title="T" subtitle="Sub" />);
    expect(screen.getByText("Sub")).toBeInTheDocument();
  });

  it('applies the variant="card" style', () => {
    const { container } = renderWithTheme(<VSwitchListTile title="Card" variant="card" />);
    const label = container.querySelector(".v-switch-list-tile");
    expect(label).toHaveAttribute("data-v-variant", "card");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLLabelElement>();
    renderWithTheme(<VSwitchListTile ref={ref} title="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it("does not call the callback when disabled", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VSwitchListTile title="Off" disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("uses activeColor as the track color when on", () => {
    renderWithTheme(<VSwitchListTile title="C" checked activeColor="red" />);
    expect(screen.getByRole("switch").style.backgroundColor).toBe("red");
  });

  it("renders trailing", () => {
    renderWithTheme(<VSwitchListTile title="T" trailing={<span data-testid="trail">x</span>} />);
    expect(screen.getByTestId("trail")).toBeInTheDocument();
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VSwitchListTile title="Option" />);
    await axeTest(container);
  });
});
