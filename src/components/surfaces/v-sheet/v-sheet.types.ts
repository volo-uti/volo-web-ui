import type { ElementType, HTMLAttributes } from "react";
import type { PolymorphicComponentPropsWithRef } from "../../../lib";

/** VSheet surface style: a filled panel or an outlined one. */
export type VSheetVariant = "filled" | "outlined";

/** VSheet own props (before polymorphic merge). */
export interface VSheetOwnProps extends HTMLAttributes<HTMLElement> {
  /**
   * Surface style.
   *
   * @default 'filled'
   */
  variant?: VSheetVariant;
}

/** VSheet props with polymorphic `as` and ref support. */
export type VSheetProps<E extends ElementType = "div"> = PolymorphicComponentPropsWithRef<
  E,
  VSheetOwnProps
>;
