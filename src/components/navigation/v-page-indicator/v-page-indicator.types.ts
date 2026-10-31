import type { HTMLAttributes } from "react";
import type { VSize } from "../../../lib";

/** How VPageIndicator draws the position. */
export type VPageIndicatorStyle = "dots" | "number" | "line";

/** Text between the numbers of the "number" variant. */
export type VPageIndicatorSeparator = "slash" | "of" | "dash" | "pipe";

/** Props of VPageIndicator. */
export interface VPageIndicatorProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> {
  /**
   * Visual style.
   * @default "dots"
   */
  variant?: VPageIndicatorStyle;
  /**
   * Indicator size.
   * @default "md"
   */
  size?: Extract<VSize, "sm" | "md" | "lg">;
  /** Total number of pages. */
  total: number;
  /** Current page index, 0-based (controlled). */
  value?: number;
  /**
   * Initial page index when `value` is not given.
   * @default 0
   */
  defaultValue?: number;
  /**
   * Whether the active dot is wider than the others.
   * @default true
   */
  expandActive?: boolean;
  /**
   * Separator of the "number" variant.
   * @default "slash"
   */
  separator?: VPageIndicatorSeparator;
  /** Called with the chosen index; when given, dots, bars and arrows become pressable. */
  onValueChange?: (index: number) => void;
}
