import type { HTMLAttributes, ReactNode } from "react";
import type { VOrientation } from "../../../lib";

/** VDivider style variant. */
export type VDividerVariant = "solid" | "dashed";

/** VDivider props — native `<div>` props are accepted too. */
export interface VDividerProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  /**
   * Line style.
   * @default 'solid'
   */
  variant?: VDividerVariant;
  /** Line colour — any CSS color. Defaults to the theme border colour. */
  color?: string;
  /** Label shown in the middle of a horizontal line. */
  label?: ReactNode;
  /**
   * Line direction.
   * @default 'horizontal'
   */
  orientation?: VOrientation;
  /**
   * Bold line — 2px thickness.
   * @default false
   */
  bold?: boolean;
  /** Line thickness in px; overrides `bold`. */
  thickness?: number;
  /**
   * Start indent in px.
   * @default 0
   */
  indent?: number;
  /**
   * End indent in px.
   * @default 0
   */
  endIndent?: number;
}
