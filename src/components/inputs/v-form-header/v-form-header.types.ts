import type { HTMLAttributes, ReactNode } from "react";
import type { VSize } from "../../../lib";

/** VFormHeader props. */
export interface VFormHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Label shown above the field body; renders a `<label>` tied to `htmlFor`. */
  label?: ReactNode;
  /**
   * Shows the required mark after the label.
   * @default false
   */
  required?: boolean;
  /**
   * Character used as the required mark.
   * @default '*'
   */
  requiredMark?: string;
  /** Element placed next to the label, e.g. a help icon. */
  tooltip?: ReactNode;
  /** Extra info aligned to the right end of the header. */
  more?: ReactNode;
  /**
   * Label text size.
   * @default 'md'
   */
  size?: VSize;
  /** `id` of the control the label belongs to. */
  htmlFor?: string;
}
