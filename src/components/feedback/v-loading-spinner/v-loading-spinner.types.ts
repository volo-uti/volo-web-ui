import type { HTMLAttributes } from "react";
import type { VSize } from "../../../lib";

/** VLoadingSpinner props. */
export interface VLoadingSpinnerProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  /**
   * Spinner size: a `VSize` step or a diameter in px.
   *
   * @default 'md'
   */
  size?: VSize | number;
  /**
   * Spinner colour: any CSS colour, such as `"currentColor"` or `"var(--v-success)"`.
   *
   * @default 'var(--v-primary)'
   */
  color?: string;
  /**
   * Stroke width in px.
   *
   * @default size / 12, at least 2
   */
  strokeWidth?: number;
}
