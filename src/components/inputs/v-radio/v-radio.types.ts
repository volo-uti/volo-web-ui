import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import type { VOrientation, VSize } from "../../../lib";

/** Context value shared between VRadioGroup and its VRadio children. */
export interface VRadioGroupContextValue {
  name: string;
  value: string;
  onValueChange: (value: string) => void;
  size: VSize;
  disabled: boolean;
}

/** Props of VRadioGroup. */
export interface VRadioGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  // ── 2. Visual ──
  /**
   * Size of every radio.
   *
   * @default 'md'
   */
  size?: VSize;
  // ── 3. Content ──
  /** Value of the selected radio (controlled). */
  value?: string;
  /**
   * Value of the initially selected radio (uncontrolled).
   *
   * @default ''
   */
  defaultValue?: string;
  /** The VRadio items. */
  children?: ReactNode;
  // ── 7. Layout ──
  /**
   * Direction the radios are laid out in; also sets the arrow-key axis.
   *
   * @default 'vertical'
   */
  orientation?: VOrientation;
  // ── 8. State ──
  /**
   * Disables every radio.
   *
   * @default false
   */
  disabled?: boolean;
  // ── 9. Callbacks ──
  /** Called with the value of the radio the user selects. */
  onValueChange?: (value: string) => void;
  // ── 10. Advanced ──
  /** Shared `name` of the radios for form submission; generated when omitted. */
  name?: string;
  /** Additional class names (Tailwind). */
  className?: string;
}

/** Props of VRadio. */
export interface VRadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "checked" | "type" | "value"
> {
  // ── 3. Content ──
  /** Value the group reports when this radio is selected. */
  value: string;
  /** Label next to the radio; clicking it selects the radio. */
  label?: ReactNode;
  /** Secondary text below the label. */
  sublabel?: ReactNode;
  // ── 8. State ──
  /**
   * Disables this radio; a disabled group disables it too.
   *
   * @default false
   */
  disabled?: boolean;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}
