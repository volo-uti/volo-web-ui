import type { HTMLAttributes } from "react";

/** VSkeleton shape: a text line, a circle or a block. */
export type VSkeletonVariant = "text" | "circular" | "rectangular";

/** VSkeleton animation: `false` turns it off. */
export type VSkeletonAnimation = "pulse" | "wave" | false;

/** VSkeleton props. */
export interface VSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Shape of the placeholder.
   *
   * @default 'text'
   */
  variant?: VSkeletonVariant;
  /**
   * Diameter in px of the `circular` variant; it sets both width and height unless they are given.
   *
   * @default 40
   */
  size?: number;
  /** Corner radius as a CSS length or px number; overrides the variant's radius. */
  borderRadius?: string | number;
  /**
   * Loading animation.
   *
   * @default 'pulse'
   */
  animation?: VSkeletonAnimation;
  /** Width as a CSS length or px number; defaults to `100%` (the diameter for `circular`). */
  width?: string | number;
  /** Height as a CSS length or px number; defaults to `1em` for `text`, the diameter for `circular`, 120px otherwise. */
  height?: string | number;
  /**
   * Number of lines of the `text` variant; the last line is 75% wide.
   *
   * @default 1
   */
  lines?: number;
  /**
   * Gap in px between lines of the `text` variant.
   *
   * @default 8
   */
  spacing?: number;
}
