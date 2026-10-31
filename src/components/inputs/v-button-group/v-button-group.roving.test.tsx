import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, userEvent } from "../../../test-utils";
import { VButtonGroup } from "./v-button-group";

function Group({ count, disabled = [] }: { count: number; disabled?: number[] }) {
  return (
    <VButtonGroup orientation="horizontal">
      {Array.from({ length: count }, (_, i) => (
        <button key={i} type="button" disabled={disabled.includes(i)}>
          {`B${i}`}
        </button>
      ))}
    </VButtonGroup>
  );
}

const tabindexes = () => screen.getAllByRole("button").map((b) => b.getAttribute("tabindex"));

describe("VButtonGroup roving focus", () => {
  it("moves from the clicked button, not from the first one", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Group count={4} />);

    await user.click(screen.getByRole("button", { name: "B2" }));
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("button", { name: "B3" })).toHaveFocus();
  });

  it("gives buttons added later a tabindex", () => {
    const { rerender } = renderWithTheme(<Group count={2} />);
    rerender(<Group count={4} />);

    expect(tabindexes()).toEqual(["0", "-1", "-1", "-1"]);
  });

  it("keeps a reachable tab stop when the first button becomes disabled", () => {
    const { rerender } = renderWithTheme(<Group count={3} />);
    rerender(<Group count={3} disabled={[0]} />);

    expect(screen.getByRole("button", { name: "B1" })).toHaveAttribute("tabindex", "0");
  });
});
