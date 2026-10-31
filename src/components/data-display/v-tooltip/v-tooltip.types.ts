import type { HTMLAttributes, ReactNode } from "react";
import type { VSide } from "../../../lib";

/** VTooltip props — native `<div>` props go to the wrapper around the trigger. */
export interface VTooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  /** Trigger element. */
  children: ReactNode;
  /** Tooltip content. */
  message: ReactNode;
  /**
   * Side of the trigger the tooltip appears on.
   * @default 'top'
   */
  position?: VSide;
  /**
   * Maximum width of the tooltip in px.
   * @default 280
   */
  maxWidth?: number;
  /**
   * Wait in ms before the tooltip shows.
   * @default 500
   */
  waitDuration?: number;
  /**
   * How long in ms the tooltip stays visible; 0 keeps it until the pointer or focus leaves.
   * @default 1500
   */
  showDuration?: number;
  /** Extra class names for the tooltip bubble, not the wrapper. */
  className?: string;
}
