import type { InputHTMLAttributes, ReactNode } from "react";
import type { VSize } from "../../../lib";

/** Look of a VCheckbox: plain, or a bordered card around the whole control. */
export type VCheckboxVariant = "default" | "card";

/**
 * Props of VCheckbox.
 *
 * Indeterminate is a separate flag next to `checked`, like the DOM `indeterminate` property.
 */
export interface VCheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "checked" | "defaultChecked" | "type"
> {
  // ── 1. Identity ──
  /**
   * Visual variant.
   *
   * @default 'default'
   */
  variant?: VCheckboxVariant;
  // ── 2. Visual ──
  /**
   * Component size.
   *
   * @default 'md'
   */
  size?: VSize;
  // ── 3. Content ──
  /** Label next to the box; clicking it toggles the checkbox. */
  label?: ReactNode;
  /** Secondary text below the label. */
  sublabel?: ReactNode;
  // ── 8. State ──
  /**
   * Disables the checkbox.
   *
   * @default false
   */
  disabled?: boolean;
  /** Checked state (controlled). */
  checked?: boolean;
  /**
   * Initial checked state (uncontrolled).
   *
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * Shows the mixed state (a minus instead of a check); visual only, `checked` is unchanged.
   *
   * @default false
   */
  indeterminate?: boolean;
  // ── 9. Callbacks ──
  /** Called with the new checked state when the user toggles the checkbox. */
  onCheckedChange?: (checked: boolean) => void;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}
