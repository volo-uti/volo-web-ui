import type { LabelHTMLAttributes, ReactNode } from "react";
import type { VSize } from "../../../lib";

/** Props of VLabel: own props and the native label props (`htmlFor`, ...). */
export interface VLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  // ── 2. Visual ──
  /**
   * Text size.
   *
   * @default 'md'
   */
  size?: VSize;
  // ── 3. Content ──
  /** Label text. */
  children?: ReactNode;
  // ── 5. Header/Meta ──
  /**
   * Shows the required mark after the text.
   *
   * @default false
   */
  required?: boolean;
  /**
   * Character shown when `required`.
   *
   * @default '*'
   */
  requiredMark?: string;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}
