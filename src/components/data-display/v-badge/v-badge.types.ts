import type { HTMLAttributes, ReactNode } from "react";
import type { VSize } from "../../../lib";

/** VBadge colour variants. */
export type VBadgeVariant =
  "muted" | "primary" | "secondary" | "success" | "warning" | "destructive" | "outline";

/** VBadge props — native `<div>` props are accepted too. */
export interface VBadgeProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  /**
   * Colour variant.
   * @default 'muted'
   */
  variant?: VBadgeVariant;
  /**
   * Size variant.
   * @default 'md'
   */
  size?: Extract<VSize, "sm" | "md" | "lg">;
  /** The element the badge is attached to. */
  children?: ReactNode;
  /** Badge content (number or text); numbers above `max` show as "{max}+". */
  content?: ReactNode;
  /**
   * Largest number shown as is; a bigger `content` number shows "{max}+".
   * @default 99
   */
  max?: number;
  /**
   * Hides the badge (scales it to zero) while keeping the children.
   * @default false
   */
  invisible?: boolean;
}
