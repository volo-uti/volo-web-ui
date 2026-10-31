import { createRef } from "react";
import { fireEvent } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VButton } from "./v-button";

describe("VButton", () => {
  it("renders by default", () => {
    renderWithTheme(<VButton>Click me</VButton>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies the variant prop", () => {
    renderWithTheme(<VButton variant="outlined">Outlined</VButton>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-v-variant", "outlined");
  });

  it("applies the size prop", () => {
    renderWithTheme(<VButton size="lg">Large</VButton>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-v-size", "lg");
  });

  it("applies the color prop", () => {
    renderWithTheme(<VButton color="destructive">Delete</VButton>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-v-color", "destructive");
  });

  it("applies the disabled state", () => {
    renderWithTheme(<VButton disabled>Disabled</VButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  it("applies the loading state", () => {
    renderWithTheme(<VButton loading>Loading</VButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("keeps its accessible name while the spinner replaces the label", () => {
    renderWithTheme(<VButton loading>Save</VButton>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("has no accessibility violations while loading", async () => {
    const { container } = renderWithTheme(<VButton loading>Save</VButton>);
    await axeTest(container);
  });

  it("fires click events", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VButton onClick={onClick}>Click</VButton>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire click events when disabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VButton disabled onClick={onClick}>
        Click
      </VButton>,
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("merges className", () => {
    renderWithTheme(<VButton className="custom-class">Btn</VButton>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("custom-class");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLButtonElement>();
    renderWithTheme(<VButton ref={ref}>Ref</VButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("renders leading and trailing", () => {
    renderWithTheme(
      <VButton
        leading={<span data-testid="start">S</span>}
        trailing={<span data-testid="end">E</span>}
      >
        Icon
      </VButton>,
    );
    expect(screen.getByTestId("start")).toBeInTheDocument();
    expect(screen.getByTestId("end")).toBeInTheDocument();
  });

  it("replaces the default spinner with loadingIndicator", () => {
    renderWithTheme(
      <VButton loading loadingIndicator={<span data-testid="custom">...</span>}>
        Wait
      </VButton>,
    );
    expect(screen.getByTestId("custom")).toBeInTheDocument();
  });

  it("applies leadingGap as spacing", () => {
    renderWithTheme(
      <VButton leading={<span data-testid="lead">+</span>} leadingGap={20}>
        Add
      </VButton>,
    );
    expect(screen.getByTestId("lead").parentElement?.style.marginInlineEnd).toContain("20px");
  });

  it("applies trailingGap as spacing", () => {
    renderWithTheme(
      <VButton trailing={<span data-testid="trail">&rarr;</span>} trailingGap={12}>
        Next
      </VButton>,
    );
    expect(screen.getByTestId("trail").parentElement?.style.marginInlineStart).toContain("12px");
  });

  it("calls onLongPress on long press", async () => {
    const onLongPress = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VButton onLongPress={onLongPress}>Hold</VButton>);
    await user.pointer({ keys: "[MouseLeft>]", target: screen.getByRole("button") });
    await new Promise((r) => setTimeout(r, 600));
    expect(onLongPress).toHaveBeenCalledTimes(1);
  });

  it("applies fullWidth", () => {
    renderWithTheme(<VButton fullWidth>Full</VButton>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("w-full");
  });

  describe("long press and disabled elements", () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it("composes a user onPointerDown with the long press", () => {
      vi.useFakeTimers();
      const onLongPress = vi.fn();
      const onPointerDown = vi.fn();
      renderWithTheme(
        <VButton onLongPress={onLongPress} onPointerDown={onPointerDown}>
          Hold
        </VButton>,
      );
      fireEvent.pointerDown(screen.getByRole("button"));
      vi.advanceTimersByTime(600);
      expect(onPointerDown).toHaveBeenCalledTimes(1);
      expect(onLongPress).toHaveBeenCalledTimes(1);
    });

    it("does not fire a pending long press after unmount", () => {
      vi.useFakeTimers();
      const onLongPress = vi.fn();
      const { unmount } = renderWithTheme(<VButton onLongPress={onLongPress}>Hold</VButton>);
      fireEvent.pointerDown(screen.getByRole("button"));
      unmount();
      vi.advanceTimersByTime(600);
      expect(onLongPress).not.toHaveBeenCalled();
    });

    it("cancels the long press on pointercancel", () => {
      vi.useFakeTimers();
      const onLongPress = vi.fn();
      renderWithTheme(<VButton onLongPress={onLongPress}>Hold</VButton>);
      fireEvent.pointerDown(screen.getByRole("button"));
      fireEvent.pointerCancel(screen.getByRole("button"));
      vi.advanceTimersByTime(600);
      expect(onLongPress).not.toHaveBeenCalled();
    });

    it("swallows the click that ends a long press", () => {
      vi.useFakeTimers();
      const onLongPress = vi.fn();
      const onClick = vi.fn();
      renderWithTheme(
        <VButton onLongPress={onLongPress} onClick={onClick}>
          Hold
        </VButton>,
      );
      const button = screen.getByRole("button");
      fireEvent.pointerDown(button);
      vi.advanceTimersByTime(600);
      fireEvent.pointerUp(button);
      fireEvent.click(button);
      expect(onLongPress).toHaveBeenCalledTimes(1);
      expect(onClick).not.toHaveBeenCalled();
      // The next ordinary press is a click again
      fireEvent.pointerDown(button);
      fireEvent.pointerUp(button);
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick of a loading non-button element", () => {
      const onClick = vi.fn();
      renderWithTheme(
        <VButton as="a" href="#" loading onClick={onClick}>
          Go
        </VButton>,
      );
      fireEvent.click(screen.getByRole("link"));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VButton>Accessible</VButton>);
    await axeTest(container);
  });
});
