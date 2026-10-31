import { createRef } from "react";
import { fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VSlider } from "./v-slider";

describe("VSlider", () => {
  it('renders with role="slider"', () => {
    renderWithTheme(<VSlider aria-label="Volume" />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("reflects value in aria-valuenow", () => {
    renderWithTheme(<VSlider value={50} aria-label="Volume" />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "50");
  });

  it("reflects min/max in aria attributes", () => {
    renderWithTheme(<VSlider min={10} max={200} aria-label="Range" />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuemin", "10");
    expect(slider).toHaveAttribute("aria-valuemax", "200");
  });

  it("applies the disabled state", () => {
    const { container } = renderWithTheme(<VSlider disabled aria-label="Disabled" />);
    expect(container.querySelector('[aria-disabled="true"]')).toBeInTheDocument();
  });

  it("applies the size prop", () => {
    const { container } = renderWithTheme(<VSlider size="lg" aria-label="Size" />);
    expect(container.querySelector('[data-v-size="lg"]')).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VSlider className="my-slider" aria-label="Custom" />);
    expect(container.firstElementChild?.className).toContain("my-slider");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VSlider ref={ref} aria-label="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("calls onValueChange on keyboard input", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VSlider aria-label="Key" defaultValue={50} onValueChange={onValueChange} />);
    screen.getByRole("slider").focus();
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalledWith(51);
    await user.keyboard("{End}");
    expect(onValueChange).toHaveBeenLastCalledWith(100);
  });

  it("follows value in controlled mode", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VSlider aria-label="Ctrl" value={50} onValueChange={onValueChange} />);
    screen.getByRole("slider").focus();
    await user.keyboard("{Home}");
    expect(onValueChange).toHaveBeenCalledWith(0);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "50");
  });

  it("does not call onValueChange when disabled", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VSlider aria-label="Off" disabled onValueChange={onValueChange} />);
    screen.getByRole("slider").focus();
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("calls onValueCommitted on key input", async () => {
    const onValueCommitted = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VSlider aria-label="Commit" defaultValue={50} onValueCommitted={onValueCommitted} />,
    );
    screen.getByRole("slider").focus();
    await user.keyboard("{ArrowLeft}");
    expect(onValueCommitted).toHaveBeenCalledWith(49);
  });

  it("uses divisions in place of step", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VSlider aria-label="Div" divisions={4} defaultValue={0} onValueChange={onValueChange} />,
    );
    screen.getByRole("slider").focus();
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalledWith(25);
  });

  it("shows the current value when showLabel is set", () => {
    renderWithTheme(<VSlider aria-label="Label" defaultValue={42} showLabel />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("hides the value without showLabel", () => {
    renderWithTheme(<VSlider aria-label="NoLabel" defaultValue={42} />);
    expect(screen.queryByText("42")).not.toBeInTheDocument();
  });

  it("does not leak divisions and showLabel to the DOM", () => {
    renderWithTheme(<VSlider aria-label="Leak" divisions={4} showLabel />);
    const slider = screen.getByRole("slider");
    expect(slider).not.toHaveAttribute("divisions");
    expect(slider).not.toHaveAttribute("showlabel");
  });

  describe("pointer and numeric edge cases", () => {
    const setup = (props: Record<string, unknown> = {}) => {
      const onValueChange = vi.fn();
      const onValueCommitted = vi.fn();
      const view = renderWithTheme(
        <VSlider
          aria-label="Edge"
          onValueChange={onValueChange}
          onValueCommitted={onValueCommitted}
          {...props}
        />,
      );
      const track = view.container.querySelector('[role="slider"] > div') as HTMLElement;
      track.getBoundingClientRect = () =>
        ({
          left: 0,
          width: 100,
          right: 100,
          top: 0,
          bottom: 10,
          height: 10,
          x: 0,
          y: 0,
        }) as DOMRect;
      track.setPointerCapture = () => {};
      return { onValueChange, onValueCommitted, track, view };
    };

    it("stops following the pointer after pointercancel and commits the drag", () => {
      const { onValueChange, onValueCommitted, track } = setup();
      fireEvent.pointerDown(track, { clientX: 10, pointerId: 1 });
      fireEvent.pointerCancel(track, { pointerId: 1 });
      onValueChange.mockClear();
      fireEvent.pointerMove(track, { clientX: 80, pointerId: 1 });
      expect(onValueChange).not.toHaveBeenCalled();
      expect(onValueCommitted).toHaveBeenCalledTimes(1);
    });

    it("stops dragging when the pointer capture is lost", () => {
      const { onValueChange, track } = setup();
      fireEvent.pointerDown(track, { clientX: 10, pointerId: 1 });
      fireEvent.lostPointerCapture(track, { pointerId: 1 });
      onValueChange.mockClear();
      fireEvent.pointerMove(track, { clientX: 80, pointerId: 1 });
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("ignores a right-button press", () => {
      const { onValueChange, track } = setup();
      fireEvent.pointerDown(track, { clientX: 50, pointerId: 1, button: 2 });
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("emits step-rounded values from the pointer without float noise", () => {
      const { onValueChange, track } = setup({ min: 0, max: 1, step: 0.1 });
      fireEvent.pointerDown(track, { clientX: 30, pointerId: 1 });
      expect(onValueChange).toHaveBeenLastCalledWith(0.3);
    });

    it("emits step-rounded values from the keyboard without float noise", () => {
      const { onValueChange } = setup({ min: 0, max: 1, step: 0.1, defaultValue: 0 });
      const slider = screen.getByRole("slider");
      for (let i = 0; i < 3; i++) fireEvent.keyDown(slider, { key: "ArrowRight" });
      expect(onValueChange.mock.calls.map((c) => c[0])).toEqual([0.1, 0.2, 0.3]);
    });

    it("moves an off-grid value onto the grid with the arrow keys", () => {
      const { onValueChange } = setup({ min: 0, max: 100, step: 10, defaultValue: 5 });
      fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowRight" });
      expect(onValueChange).toHaveBeenLastCalledWith(10);
      fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowLeft" });
      expect(onValueChange).toHaveBeenLastCalledWith(0);
    });

    it("never emits NaN for a zero step", () => {
      const { onValueChange, track } = setup({ step: 0 });
      fireEvent.pointerDown(track, { clientX: 50, pointerId: 1 });
      expect(onValueChange).toHaveBeenLastCalledWith(50);
    });

    it("renders no NaN fill and emits no NaN when min equals max", () => {
      const { onValueChange, track, view } = setup({ min: 5, max: 5 });
      const fill = view.container.querySelector('[role="slider"] > div > div') as HTMLElement;
      expect(fill.style.width).toBe("0%");
      fireEvent.pointerDown(track, { clientX: 50, pointerId: 1 });
      for (const [value] of onValueChange.mock.calls) expect(Number.isNaN(value)).toBe(false);
    });

    it("centres the thumb on its position for every size", () => {
      const { view } = setup({ defaultValue: 50, size: "xl" });
      const thumb = view.container.querySelector('[role="slider"] > div:last-child') as HTMLElement;
      expect(thumb.style.left).toBe("50%");
      expect(thumb.className).toContain("-translate-x-1/2");
    });

    it("does not report a commit when a key leaves the value unchanged", () => {
      const { onValueChange, onValueCommitted } = setup({ defaultValue: 100 });
      fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowRight" });
      expect(onValueChange).not.toHaveBeenCalled();
      expect(onValueCommitted).not.toHaveBeenCalled();
    });

    it("composes a user onKeyDown with the arrow keys", () => {
      const onKeyDown = vi.fn();
      const { onValueChange } = setup({ onKeyDown });
      fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowRight" });
      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onValueChange).toHaveBeenCalledWith(1);
    });
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(
      <VSlider aria-label="Accessible slider" defaultValue={50} />,
    );
    await axeTest(container);
  });
});
