import type { InputHTMLAttributes, ReactNode } from "react";
import type { VSize } from "../../../lib";

/** Look of a VSwitch: plain track, or a track that shows an I (on) / O (off) mark. */
export type VSwitchVariant = "default" | "labeled";

/** Props of VSwitch. */
export interface VSwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "checked" | "defaultChecked" | "type"
> {
  // ── 1. Identity ──
  /**
   * Visual variant; `'labeled'` shows an I/O mark inside the track.
   *
   * @default 'default'
   */
  variant?: VSwitchVariant;
  // ── 2. Visual ──
  /**
   * Component size.
   *
   * @default 'md'
   */
  size?: VSize;
  /** Track colour while on; any CSS color. */
  activeColor?: string;
  // ── 3. Content ──
  /** Label next to the switch; clicking it toggles the switch. */
  label?: ReactNode;
  /** Secondary text below the label. */
  sublabel?: ReactNode;
  // ── 8. State ──
  /**
   * Disables the switch.
   *
   * @default false
   */
  disabled?: boolean;
  /** On/off state (controlled). */
  checked?: boolean;
  /**
   * Initial on/off state (uncontrolled).
   *
   * @default false
   */
  defaultChecked?: boolean;
  // ── 9. Callbacks ──
  /** Called with the new on/off state when the user toggles the switch. */
  onCheckedChange?: (checked: boolean) => void;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}
