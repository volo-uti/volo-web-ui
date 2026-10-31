import type { HTMLAttributes, ReactNode } from "react";
import type { VOrientation, VSize } from "../../../lib";
import type { VButtonVariant } from "../v-button/v-button.types";

/** Context value that VButtonGroup shares with the buttons inside it. */
export interface VButtonGroupContextValue {
  variant?: VButtonVariant;
  size?: VSize;
}

/** Props of VButtonGroup. */
export interface VButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  // ── 1. Identity ──
  /** Variant for every VButton in the group. */
  variant?: VButtonVariant;
  // ── 2. Visual ──
  /** Size for every VButton in the group. */
  size?: VSize;
  // ── 3. Content ──
  /** The VButtons to join. */
  children?: ReactNode;
  // ── 7. Layout ──
  /**
   * Direction the buttons are laid out in; also sets the arrow-key axis.
   *
   * @default 'horizontal'
   */
  orientation?: VOrientation;
  /**
   * Gap between buttons in px; any value above 0 separates them instead of joining them.
   *
   * @default 0
   */
  spacing?: number;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}
