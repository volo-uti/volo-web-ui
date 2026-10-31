import type { HTMLAttributes } from "react";
import type { VColor, VSize } from "../../../lib";

/** VProgress shape: a horizontal bar or a ring. */
export type VProgressVariant = "linear" | "circular";

/** VProgress colour: a `VColor` plus the status colours. */
export type VProgressColor = VColor | "success" | "warning";

/** VProgress props. */
export interface VProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  /**
   * Bar or ring.
   *
   * @default 'linear'
   */
  variant?: VProgressVariant;
  /**
   * Thickness (linear) or diameter (circular).
   *
   * @default 'md'
   */
  size?: VSize;
  /**
   * Colour of the filled part.
   *
   * @default 'primary'
   */
  color?: VProgressColor;
  /** Track colour as any CSS colour; defaults to the muted theme colour. */
  backgroundColor?: string;
  /**
   * Progress from 0 to 100; values outside are clamped and warned about in development.
   * Ignored while `indeterminate`.
   */
  value?: number;
  /**
   * Shows a looping animation and drops `aria-valuenow`.
   *
   * @default false
   */
  indeterminate?: boolean;
}
