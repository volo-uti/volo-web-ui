import type { HTMLAttributes } from "react";

/** Axes a VScrollArea scrolls on. */
export type VScrollAreaDirection = "vertical" | "horizontal" | "both";

/** When the scrollbar thumb is visible. */
export type VScrollAreaScrollbar = "auto" | "always" | "hover" | "hidden";

/** VScrollArea props. */
export interface VScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Scrollbar thickness in pixels.
   * @default 6
   */
  scrollbarThickness?: number;
  /**
   * Scrollbar corner radius in pixels.
   * @default 3
   */
  scrollbarRadius?: number;
  /**
   * Thumb colour; any CSS colour. Defaults to a muted foreground tone.
   * @default undefined
   */
  thumbColor?: string;
  /**
   * Track colour; any CSS colour. Defaults to the muted surface.
   * @default undefined
   */
  trackColor?: string;
  /**
   * Height at which vertical scrolling starts. Accepts pixels as a number or any CSS length.
   * @default undefined
   */
  maxHeight?: number | string;
  /**
   * Width at which horizontal scrolling starts. Accepts pixels as a number or any CSS length.
   * @default undefined
   */
  maxWidth?: number | string;
  /**
   * Axes that scroll.
   * @default "vertical"
   */
  direction?: VScrollAreaDirection;
  /**
   * Padding inside the scroll area. Accepts pixels as a number or any CSS length.
   * @default undefined
   */
  padding?: string | number;
  /**
   * When the thumb shows: on hover or focus (`auto`, `hover`), always, or never (`hidden`).
   * @default "auto"
   */
  scrollbar?: VScrollAreaScrollbar;
}
