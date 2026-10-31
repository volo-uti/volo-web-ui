import type { HTMLAttributes } from "react";
import type { VSpace } from "../resolve-space";

/** VGrid props. */
export interface VGridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Width:height ratio forced on every cell.
   * @default undefined
   */
  aspectRatio?: number;
  /**
   * Fixed number of columns; ignored when `minChildWidth` is set.
   * @default 2
   */
  columns?: number;
  /**
   * Minimum column width; as many columns as fit are created (auto-fill).
   * Accepts pixels as a number or any CSS length.
   * @default undefined
   */
  minChildWidth?: string | number;
  /**
   * Gap between rows and columns: a `VSize` token, pixels as a number, or any CSS length.
   * @default undefined
   */
  gap?: VSpace;
  /**
   * Row gap; falls back to `gap`.
   * @default undefined
   */
  rowGap?: VSpace;
  /**
   * Column gap; falls back to `gap`.
   * @default undefined
   */
  colGap?: VSpace;
  /**
   * Padding inside the grid. Accepts pixels as a number or any CSS length.
   * @default undefined
   */
  padding?: string | number;
}
