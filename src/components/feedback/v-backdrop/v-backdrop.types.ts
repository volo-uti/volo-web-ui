import type { HTMLAttributes } from "react";

/** Props of VBackdrop; other props go to the root `<div>`. */
export interface VBackdropProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  // ── 2. Visual ──
  /** Fill colour; any CSS color. Black when omitted. */
  color?: string;
  /**
   * Opacity from 0 to 1.
   *
   * @default 0.5
   */
  opacity?: number;
  // ── 8. State ──
  /** Whether the backdrop is rendered; when false it renders nothing. */
  open: boolean;
}
