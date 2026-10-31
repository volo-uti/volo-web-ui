import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent } from "../../../test-utils";
import { VRadioGroup, VRadio } from "./v-radio";

function Group(props: { defaultValue?: string; onValueChange?: (v: string) => void }) {
  return (
    <VRadioGroup {...props}>
      <VRadio value="a" label="A" />
      <VRadio value="b" label="B" />
      <VRadio value="c" label="C" />
      <VRadio value="d" label="D" />
    </VRadioGroup>
  );
}

describe("VRadioGroup roving focus", () => {
  it("moves from the clicked radio, not from the first one", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithTheme(<Group onValueChange={onValueChange} />);

    await user.click(screen.getByRole("radio", { name: "C" }));
    onValueChange.mockClear();
    await user.keyboard("{ArrowDown}");

    expect(onValueChange).toHaveBeenCalledWith("d");
    expect(screen.getByRole("radio", { name: "D" })).toHaveFocus();
  });

  it("focuses the radio input, never its wrapper", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Group defaultValue="a" />);

    await user.click(screen.getByRole("radio", { name: "A" }));
    await user.keyboard("{ArrowDown}");

    expect(document.activeElement?.tagName).toBe("INPUT");
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: "B" }));
  });

  it("has one tab stop, on the checked radio", () => {
    renderWithTheme(<Group defaultValue="c" />);

    const radios = screen.getAllByRole("radio");
    expect(radios.map((r) => r.getAttribute("tabindex"))).toEqual(["-1", "-1", "0", "-1"]);
    for (const wrapper of radios.map((r) => r.parentElement?.parentElement)) {
      expect(wrapper).not.toHaveAttribute("tabindex");
    }
  });

  it("wraps around from the last radio", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Group defaultValue="d" />);

    await user.click(screen.getByRole("radio", { name: "D" }));
    await user.keyboard("{ArrowDown}");

    expect(screen.getByRole("radio", { name: "A" })).toHaveFocus();
  });
});
