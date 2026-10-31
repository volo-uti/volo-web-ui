"use client";

import { forwardRef, useCallback, useRef } from "react";
import { cn } from "../../../lib";
import type { VSize } from "../../../lib";
import { devWarning } from "../../../utils/dev-warning";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useControllable } from "../../../hooks/use-controllable";
import type { VSliderProps } from "./v-slider.types";

// ─────────────────────────────────────────
// Size styles
// ─────────────────────────────────────────

const trackSizeMap: Record<VSize, string> = {
  xs: "h-0.5",
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
  xl: "h-2.5",
};

const thumbSizeMap: Record<VSize, string> = {
  xs: "h-5 w-5",
  sm: "h-6 w-6",
  md: "h-6 w-6",
  lg: "h-7 w-7",
  xl: "h-8 w-8",
};

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Number of digits after the decimal point of a finite number. */
function decimalsOf(n: number) {
  const [mantissa = "", exponent = "0"] = String(n).toLowerCase().split("e");
  const fraction = mantissa.split(".")[1]?.length ?? 0;
  return Math.max(0, fraction - Number(exponent));
}

/** Rounds away the binary floating point noise (`0.30000000000000004` becomes `0.3`). */
function roundTo(value: number, decimals: number) {
  return Number(value.toFixed(Math.min(decimals, 20)));
}

function snapToStep(value: number, min: number, step: number) {
  const decimals = Math.max(decimalsOf(step), decimalsOf(min));
  return roundTo(Math.round((value - min) / step) * step + min, decimals);
}

/** The grid value one `step` above (`direction` 1) or below (-1) `value`; off-grid values land on the grid. */
function stepFromValue(value: number, min: number, step: number, direction: 1 | -1) {
  const decimals = Math.max(decimalsOf(step), decimalsOf(min));
  const position = (value - min) / step;
  const onGrid = Math.abs(position - Math.round(position)) < 1e-9;
  const index = onGrid ? Math.round(position) : position;
  const next = direction === 1 ? Math.floor(index) + 1 : Math.ceil(index) - 1;
  return roundTo(next * step + min, decimals);
}

// ─────────────────────────────────────────
// VSlider
// ─────────────────────────────────────────

/**
 * Draggable single-value slider with keyboard control.
 *
 * @example
 * <VSlider aria-label="Volume" value={volume} onValueChange={setVolume} min={0} max={100} />
 */
const VSlider = forwardRef<HTMLDivElement, VSliderProps>((props, ref) => {
  const override = useComponentOverride("VSlider");

  const {
    // 2. Visual
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    // 3. Content
    value: valueProp,
    defaultValue = 0,
    min = 0,
    max = 100,
    step: stepProp = 1,
    divisions,
    showLabel = false,
    // 8. State
    disabled = false,
    // 9. Callbacks
    onValueChange,
    onValueCommitted,
    // 10. Advanced
    onKeyDown: onKeyDownProp,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    className,
    ...restProps
  } = props;

  if (min >= max) {
    devWarning("VSlider", "min must be less than max");
  }
  if (valueProp !== undefined && (valueProp < min || valueProp > max)) {
    devWarning("VSlider", "value is out of range [min, max]");
  }

  const rawStep = divisions && divisions > 0 ? (max - min) / divisions : stepProp;
  // A zero, negative or non-finite step falls back to 1 so no value turns into NaN
  const step = rawStep > 0 && Number.isFinite(rawStep) ? rawStep : 1;
  const hasRange = max > min;

  const trackRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const latestValue = useRef(0);

  const [currentValue, setValue] = useControllable({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

  latestValue.current = currentValue;

  const percentage = hasRange ? ((clamp(currentValue, min, max) - min) / (max - min)) * 100 : 0;

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return currentValue;
      const rect = track.getBoundingClientRect();
      if (!hasRange || rect.width <= 0) return currentValue;
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      const raw = min + ratio * (max - min);
      return clamp(snapToStep(raw, min, step), min, max);
    },
    [min, max, step, currentValue, hasRange],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Only the main button (or a touch/pen contact) starts a drag
      if (disabled || e.button !== 0) return;
      e.preventDefault();
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      const newValue = getValueFromPosition(e.clientX);
      latestValue.current = newValue;
      setValue(newValue);
    },
    [disabled, getValueFromPosition, setValue],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current || disabled) return;
      const newValue = getValueFromPosition(e.clientX);
      latestValue.current = newValue;
      setValue(newValue);
    },
    [disabled, getValueFromPosition, setValue],
  );

  // Also ends a drag the system cancelled or took the pointer capture from
  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    onValueCommitted?.(latestValue.current);
  }, [onValueCommitted]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDownProp?.(e);
      if (e.defaultPrevented || disabled) return;
      let newValue: number;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          newValue = clamp(stepFromValue(currentValue, min, step, 1), min, max);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          newValue = clamp(stepFromValue(currentValue, min, step, -1), min, max);
          break;
        case "Home":
          newValue = min;
          break;
        case "End":
          newValue = max;
          break;
        default:
          return;
      }

      e.preventDefault();
      if (newValue === currentValue) return;
      setValue(newValue);
      onValueCommitted?.(newValue);
    },
    [onKeyDownProp, disabled, currentValue, step, min, max, setValue, onValueCommitted],
  );

  return (
    <div
      ref={ref}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={currentValue}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        disabled && "opacity-50 pointer-events-none",
        override?.styles?.root,
        className,
      )}
      data-v-size={size}
      {...restProps}
    >
      {/* Track */}
      <div
        ref={trackRef}
        className={cn(
          "relative w-full cursor-pointer overflow-hidden rounded-full bg-[var(--v-secondary)]",
          trackSizeMap[size],
          override?.styles?.track,
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
      >
        {/* Fill */}
        <div
          className={cn(
            "absolute left-0 top-0 h-full rounded-full bg-[var(--v-primary)]",
            override?.styles?.fill,
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Thumb */}
      <div
        className={cn(
          "absolute block -translate-x-1/2 rounded-full border-2 border-[var(--v-primary)] bg-[var(--v-background)] shadow-sm transition-all duration-150",
          "focus-visible:ring-2 focus-visible:ring-[var(--v-ring)]",
          !disabled && "hover:scale-125",
          thumbSizeMap[size],
          override?.styles?.thumb,
        )}
        style={{ left: `${percentage}%` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
      >
        {showLabel && (
          <span
            className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[length:var(--v-size-sm-font-size)] text-[var(--v-foreground)]"
            aria-hidden="true"
          >
            {currentValue}
          </span>
        )}
      </div>
    </div>
  );
});

VSlider.displayName = "VSlider";

export { VSlider };
