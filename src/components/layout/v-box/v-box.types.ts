import type { HTMLAttributes } from "react";
import type { VSize } from "../../../lib";

/** Look of a VBox: plain, card, outlined or elevated. */
export type VBoxVariant = "default" | "card" | "outlined" | "elevated";

/** VBox props. */
export interface VBoxProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant.
   * @default "default"
   */
  variant?: VBoxVariant;
  /**
   * Inner padding. Accepts pixels as a number or any CSS length.
   * @default undefined
   */
  padding?: string | number;
  /**
   * Outer margin. Accepts pixels as a number or any CSS length.
   * @default undefined
   */
  margin?: string | number;
  /**
   * Draws a border around the default variant; the other variants already have one.
   * @default false
   */
  bordered?: boolean;
  /**
   * Corner radius: `true` is medium, or pick `sm`, `md` or `lg`.
   * @default false
   */
  rounded?: boolean | Extract<VSize, "sm" | "md" | "lg">;
  /**
   * Width. Accepts pixels as a number or any CSS length.
   * @default undefined
   */
  width?: string | number;
  /**
   * Height. Accepts pixels as a number or any CSS length.
   * @default undefined
   */
  height?: string | number;
}
