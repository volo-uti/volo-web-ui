import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VFab } from "./v-fab";

describe("VFab", () => {
  it("renders a button element named by the tooltip", () => {
    renderWithTheme(<VFab icon={<span>+</span>} tooltip="New note" />);
    const button = screen.getByRole("button", { name: "New note" });
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("title", "New note");
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders extended and named by the label when label is set", () => {
    renderWithTheme(<VFab icon={<span>+</span>} label="Create" />);
    expect(screen.getByRole("button", { name: /Create/ })).toBeInTheDocument();
  });

  it("calls onClick", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VFab icon="+" tooltip="Add" onClick={onClick} />);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire clicks when disabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VFab icon="+" tooltip="Add" disabled onClick={onClick} />);
    expect(screen.getByRole("button")).toBeDisabled();
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("defaults position to fixed bottom-right", () => {
    renderWithTheme(<VFab icon="+" tooltip="Add" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-v-position", "bottom-right");
    expect(button.className).toContain("fixed");
  });

  it('is not fixed when position="static"', () => {
    renderWithTheme(<VFab icon="+" tooltip="Add" position="static" />);
    expect(screen.getByRole("button").className).not.toContain("fixed");
  });

  it("reflects variant, size, and color in data attributes", () => {
    renderWithTheme(<VFab icon="+" tooltip="Add" variant="tonal" size="lg" color="destructive" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-v-variant", "tonal");
    expect(button).toHaveAttribute("data-v-size", "lg");
    expect(button).toHaveAttribute("data-v-color", "destructive");
  });

  it("applies backgroundColor and foregroundColor to style", () => {
    renderWithTheme(
      <VFab icon="+" tooltip="Add" backgroundColor="rgb(1, 2, 3)" foregroundColor="rgb(4, 5, 6)" />,
    );
    expect(screen.getByRole("button")).toHaveStyle({
      backgroundColor: "rgb(1, 2, 3)",
      color: "rgb(4, 5, 6)",
    });
  });

  it("merges className", () => {
    renderWithTheme(<VFab icon="+" tooltip="Add" className="custom" />);
    expect(screen.getByRole("button")).toHaveClass("v-fab", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLButtonElement>();
    renderWithTheme(<VFab ref={ref} icon="+" tooltip="Add" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VFab icon="+" tooltip="Add" />);
    await axeTest(container);
  });
});
