import type { HTMLAttributes } from "react";
import type { VSize } from "../../../lib";

/** How VPagination lays out its controls. */
export type VPaginationVariant = "default" | "simple" | "minimal";

/** Sizes of VPagination. */
export type VPaginationSize = Extract<VSize, "sm" | "md" | "lg">;

/** Props of VPagination. */
export interface VPaginationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "defaultValue" | "onChange"
> {
  /**
   * Layout: numbered pages, "page / total" with arrows, or previous/next only.
   * @default "default"
   */
  variant?: VPaginationVariant;
  /**
   * Button size.
   * @default "md"
   */
  size?: VPaginationSize;
  /** Total number of pages. */
  totalPages: number;
  /** Current page, 1-based (controlled). */
  value?: number;
  /**
   * Initial page when `value` is not given.
   * @default 1
   */
  defaultValue?: number;
  /**
   * Pages shown on each side of the current page.
   * @default 1
   */
  siblingCount?: number;
  /**
   * Pages always shown at the start and end.
   * @default 1
   */
  boundaryCount?: number;
  /**
   * Whether the default variant shows first and last page buttons.
   * @default true
   */
  showFirstLast?: boolean;
  /** Previous button text for simple and minimal variants. */
  previousText?: string;
  /** Next button text for simple and minimal variants. */
  nextText?: string;
  /** Builds the page text of the simple variant. */
  pageTextBuilder?: (current: number, total: number) => string;
  /**
   * Whether every control is disabled.
   * @default false
   */
  disabled?: boolean;
  /** Called with the new 1-based page. */
  onValueChange?: (page: number) => void;
}
