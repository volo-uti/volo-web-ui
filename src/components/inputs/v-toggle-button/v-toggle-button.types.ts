import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { VSize, VVariant } from "../../../lib";

/** Look of a VToggleButton; the pressed state is drawn on top of it. */
export type VToggleButtonVariant = Extract<VVariant, "filled" | "outlined" | "ghost">;

/** Props of VToggleButton. */
export interface VToggleButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "defaultValue"
> {
  // ── 1. Identity ──
  /**
   * Visual variant.
   *
   * @default 'ghost'
   */
  variant?: VToggleButtonVariant;
  // ── 2. Visual ──
  /**
   * Component size.
   *
   * @default 'md'
   */
  size?: VSize;
  // ── 3. Content ──
  /** Content of the button. */
  children?: ReactNode;
  // ── 8. State ──
  /**
   * Disables the button.
   *
   * @default false
   */
  disabled?: boolean;
  /** Pressed state (controlled). */
  pressed?: boolean;
  /**
   * Initial pressed state (uncontrolled).
   *
   * @default false
   */
  defaultPressed?: boolean;
  // ── 9. Callbacks ──
  /** Called with the new pressed state when the user toggles the button. */
  onPressedChange?: (pressed: boolean) => void;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}
