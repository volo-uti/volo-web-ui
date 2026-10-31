import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VToggleButton } from "./v-toggle-button";

describe("VToggleButton", () => {
  it("keeps the text of a pressed outlined button in the foreground colour", () => {
    renderWithTheme(
      <VToggleButton variant="outlined" pressed onPressedChange={() => {}}>
        Bold
      </VToggleButton>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-[var(--v-primary)]", "text-[var(--v-foreground)]");
    expect(button).not.toHaveClass("text-[var(--v-primary)]");
  });

  it("renders with aria-pressed", () => {
    renderWithTheme(<VToggleButton>Bold</VToggleButton>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("toggles the pressed state on click", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VToggleButton>Bold</VToggleButton>);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("follows pressed in controlled mode", async () => {
    const onPressedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VToggleButton pressed={true} onPressedChange={onPressedChange}>
        B
      </VToggleButton>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "true");
    await user.click(button);
    expect(onPressedChange).toHaveBeenCalledWith(false);
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("applies the variant prop", () => {
    const { container } = renderWithTheme(<VToggleButton variant="outlined">V</VToggleButton>);
    expect(container.querySelector('[data-v-variant="outlined"]')).toBeInTheDocument();
  });

  it("applies the size prop", () => {
    const { container } = renderWithTheme(<VToggleButton size="sm">S</VToggleButton>);
    expect(container.querySelector('[data-v-size="sm"]')).toBeInTheDocument();
  });

  it("applies the disabled state", () => {
    renderWithTheme(<VToggleButton disabled>D</VToggleButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("ignores clicks when disabled", async () => {
    const onPressedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VToggleButton disabled onPressedChange={onPressedChange}>
        D
      </VToggleButton>,
    );
    const button = screen.getByRole("button");
    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(onPressedChange).not.toHaveBeenCalled();
  });

  it("merges className", () => {
    renderWithTheme(<VToggleButton className="my-toggle">T</VToggleButton>);
    expect(screen.getByRole("button").className).toContain("my-toggle");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLButtonElement>();
    renderWithTheme(<VToggleButton ref={ref}>R</VToggleButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("still toggles when a user onClick is passed", async () => {
    const onClick = vi.fn();
    const onPressedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VToggleButton onClick={onClick} onPressedChange={onPressedChange}>
        Bold
      </VToggleButton>,
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onPressedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("skips the toggle when the user onClick calls preventDefault", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VToggleButton onClick={(e) => e.preventDefault()}>Bold</VToggleButton>);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VToggleButton>Accessible</VToggleButton>);
    await axeTest(container);
  });
});
