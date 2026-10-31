import type { HTMLAttributes } from "react";
import type { VSize } from "../../../lib";

/** Props of VSlider. */
export interface VSliderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  // ── 2. Visual ──
  /**
   * Component size.
   *
   * @default 'md'
   */
  size?: VSize;
  // ── 3. Content ──
  /** Current value (controlled). */
  value?: number;
  /**
   * Initial value (uncontrolled).
   *
   * @default 0
   */
  defaultValue?: number;
  /**
   * Smallest value.
   *
   * @default 0
   */
  min?: number;
  /**
   * Largest value.
   *
   * @default 100
   */
  max?: number;
  /**
   * Distance between selectable values; ignored when `divisions` is set.
   *
   * @default 1
   */
  step?: number;
  /** Splits `min`..`max` into this many equal steps and snaps the value to them; overrides `step`. */
  divisions?: number;
  /**
   * Shows the current value above the thumb.
   *
   * @default false
   */
  showLabel?: boolean;
  // ── 8. State ──
  /**
   * Disables the slider.
   *
   * @default false
   */
  disabled?: boolean;
  // ── 9. Callbacks ──
  /** Called with the new value while the user drags the thumb or presses a key. */
  onValueChange?: (value: number) => void;
  /** Called with the final value when a drag ends or a key press changes the value. */
  onValueCommitted?: (value: number) => void;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}
