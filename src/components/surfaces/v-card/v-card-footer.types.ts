import type { HTMLAttributes } from "react";

/** VCardFooter alignment of its children along the row. */
export type VCardFooterAlignment = "start" | "center" | "end" | "between";

/** VCardFooter props. */
export interface VCardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Alignment of the children along the row.
   *
   * @default 'end'
   */
  alignment?: VCardFooterAlignment;
}
