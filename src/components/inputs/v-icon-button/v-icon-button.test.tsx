import { createRef } from "react";
import { fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VIconButton } from "./v-icon-button";

describe("VIconButton", () => {
  it("renders by default", () => {
    renderWithTheme(<VIconButton aria-label="Close">X</VIconButton>);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("applies the variant prop", () => {
    renderWithTheme(
      <VIconButton aria-label="Test" variant="filled">
        X
      </VIconButton>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("data-v-variant", "filled");
  });

  it("applies the size prop", () => {
    renderWithTheme(
      <VIconButton aria-label="Test" size="lg">
        X
      </VIconButton>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("data-v-size", "lg");
  });

  it("applies the disabled state", () => {
    renderWithTheme(
      <VIconButton aria-label="Test" disabled>
        X
      </VIconButton>,
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies the loading state", () => {
    renderWithTheme(
      <VIconButton aria-label="Test" loading>
        X
      </VIconButton>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("toggle mode: changes the pressed state on click", async () => {
    const onPressedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VIconButton aria-label="Favorite" pressed={false} onPressedChange={onPressedChange}>
        Heart
      </VIconButton>,
    );
    await user.click(screen.getByRole("button"));
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it("toggle mode: sets aria-pressed", () => {
    renderWithTheme(
      <VIconButton aria-label="Favorite" pressed={true} onPressedChange={() => {}}>
        Heart
      </VIconButton>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("shows pressedIcon when pressed", () => {
    renderWithTheme(
      <VIconButton
        aria-label="Favorite"
        pressed={true}
        onPressedChange={() => {}}
        pressedIcon={<span data-testid="filled">Filled</span>}
      >
        <span data-testid="outline">Outline</span>
      </VIconButton>,
    );
    expect(screen.getByTestId("filled")).toBeInTheDocument();
    expect(screen.queryByTestId("outline")).not.toBeInTheDocument();
  });

  it("does not fire click events when disabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VIconButton aria-label="Test" disabled onClick={onClick}>
        X
      </VIconButton>,
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("is named by aria-labelledby alone", () => {
    renderWithTheme(
      <>
        <span id="lbl">Close</span>
        <VIconButton aria-labelledby="lbl">X</VIconButton>
      </>,
    );
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("toggles uncontrolled with defaultPressed", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VIconButton aria-label="Fav" defaultPressed={false} onPressedChange={() => {}}>
        X
      </VIconButton>,
    );
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("merges className", () => {
    renderWithTheme(
      <VIconButton aria-label="Test" className="custom">
        X
      </VIconButton>,
    );
    expect(screen.getByRole("button").className).toContain("custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLButtonElement>();
    renderWithTheme(
      <VIconButton ref={ref} aria-label="Test">
        X
      </VIconButton>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("fires click events", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VIconButton aria-label="Test" onClick={onClick}>
        X
      </VIconButton>,
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("becomes a toggle with defaultPressed alone", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VIconButton aria-label="Star" defaultPressed>
        X
      </VIconButton>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "true");
    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("does not call onClick of a disabled non-button element", () => {
    const onClick = vi.fn();
    renderWithTheme(
      <VIconButton as="a" href="#" aria-label="Go" disabled onClick={onClick}>
        X
      </VIconButton>,
    );
    fireEvent.click(screen.getByLabelText("Go"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VIconButton aria-label="Close">X</VIconButton>);
    await axeTest(container);
  });
});
