import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VCheckListTile } from "./v-check-list-tile";

describe("VCheckListTile", () => {
  it("renders by default", () => {
    renderWithTheme(<VCheckListTile title="Option A" />);
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    renderWithTheme(<VCheckListTile title="Title" subtitle="Sub" />);
    expect(screen.getByText("Sub")).toBeInTheDocument();
  });

  it("toggles the checked state on click", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VCheckListTile title="Option" checked={false} onCheckedChange={onCheckedChange} />,
    );
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("is disabled", () => {
    renderWithTheme(<VCheckListTile title="Disabled" disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it('places the checkbox on the left for variant="leading"', () => {
    const { container } = renderWithTheme(<VCheckListTile title="Leading" variant="leading" />);
    const label = container.querySelector(".v-check-list-tile");
    expect(label).toHaveAttribute("data-v-variant", "leading");
  });

  it('applies the variant="card" style', () => {
    const { container } = renderWithTheme(<VCheckListTile title="Card" variant="card" />);
    const label = container.querySelector(".v-check-list-tile");
    expect(label).toHaveAttribute("data-v-variant", "card");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLLabelElement>();
    renderWithTheme(<VCheckListTile ref={ref} title="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VCheckListTile title="T" className="custom" />);
    const label = container.querySelector(".v-check-list-tile");
    expect(label?.className).toContain("custom");
  });

  it("does not call the callback when disabled", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VCheckListTile title="Off" disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("shows the selected state", () => {
    const { container } = renderWithTheme(<VCheckListTile title="S" selected />);
    expect(container.querySelector(".v-check-list-tile")).toHaveAttribute(
      "data-v-selected",
      "true",
    );
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VCheckListTile title="Option" />);
    await axeTest(container);
  });
});
