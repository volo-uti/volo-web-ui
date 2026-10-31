import { createRef, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { devWarning } from "../../../utils/dev-warning";
import { VChipGroup } from "./v-chip-group";

vi.mock("../../../utils/dev-warning", () => ({ devWarning: vi.fn() }));

const items = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta", leading: <span data-testid="lead">*</span> },
  { value: "c", label: "Gamma" },
];

describe("VChipGroup", () => {
  it("renders items as filter chips and reflects value as the selection", () => {
    renderWithTheme(<VChipGroup items={items} value={["a"]} />);
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
    expect(screen.getByText("Alpha").closest('[role="checkbox"]')).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByTestId("lead")).toBeInTheDocument();
  });

  it("calls onValueChange with the next value array on select", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VChipGroup items={items} value={["a"]} onValueChange={onValueChange} />);
    await user.click(screen.getByText("Gamma"));
    expect(onValueChange).toHaveBeenCalledWith(["a", "c"]);
    await user.click(screen.getByText("Alpha"));
    expect(onValueChange).toHaveBeenLastCalledWith([]);
  });

  it("selects only one when allowMultiple=false", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VChipGroup
        items={items}
        value={["a"]}
        allowMultiple={false}
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByText("Beta"));
    expect(onValueChange).toHaveBeenCalledWith(["b"]);
  });

  it("reflects toggles in controlled mode", async () => {
    const Controlled = () => {
      const [value, setValue] = useState<string[]>([]);
      return <VChipGroup items={items} value={value} onValueChange={setValue} />;
    };
    const user = userEvent.setup();
    renderWithTheme(<Controlled />);
    await user.click(screen.getByText("Alpha"));
    expect(screen.getByText("Alpha").closest('[role="checkbox"]')).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("applies spacing, native props, and ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <VChipGroup
        ref={ref}
        items={items}
        spacing={4}
        runSpacing={2}
        data-testid="g"
        className="x"
      />,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(screen.getByTestId("g")).toHaveClass("v-chip-group", "x");
    expect(screen.getByTestId("g")).toHaveStyle({ gap: "2px 4px" });
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VChipGroup items={items} value={["a"]} />);
    await axeTest(container);
  });
});

describe("VChipGroup accessible name", () => {
  it("warns in development when the group has no accessible name", () => {
    vi.mocked(devWarning).mockClear();
    renderWithTheme(<VChipGroup items={items} />);
    expect(devWarning).toHaveBeenCalledWith("VChipGroup", expect.stringContaining("aria-label"));
  });

  it("names the group from aria-label without warning", () => {
    vi.mocked(devWarning).mockClear();
    renderWithTheme(<VChipGroup items={items} aria-label="Frameworks" />);
    expect(screen.getByRole("group", { name: "Frameworks" })).toBeInTheDocument();
    expect(devWarning).not.toHaveBeenCalled();
  });
});
