import type { ElementType, HTMLAttributes } from "react";
import type { PolymorphicComponentPropsWithRef } from "../../../lib";

/** VCard surface style: raised with a shadow, outlined with a border, or filled. */
export type VCardVariant = "elevated" | "outlined" | "filled";

/** VCard own props (before polymorphic merge). */
export interface VCardOwnProps extends HTMLAttributes<HTMLElement> {
  /**
   * Surface style.
   *
   * @default 'elevated'
   */
  variant?: VCardVariant;
  /**
   * Makes the card a pressable `role="button"`: focusable, and Enter or Space call `onClick`.
   *
   * @default false
   */
  interactive?: boolean;
}

/** VCard props with polymorphic `as` and ref support. */
export type VCardProps<E extends ElementType = "div"> = PolymorphicComponentPropsWithRef<
  E,
  VCardOwnProps
>;
