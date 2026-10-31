import type { ElementType, ReactNode } from "react";
import type { PolymorphicComponentPropsWithRef } from "../../../lib";

/** VListTile own props; native element props (`onClick`, `className`, …) come from `as`. */
export interface VListTileOwnProps {
  /**
   * Primary text.
   */
  title: ReactNode;
  /**
   * Secondary text under the title.
   */
  subtitle?: ReactNode;
  /**
   * Extra content under the subtitle.
   */
  children?: ReactNode;
  /**
   * Element before the text, such as an icon or avatar.
   */
  leading?: ReactNode;
  /**
   * Element after the text, such as an icon or meta text.
   */
  trailing?: ReactNode;
  /**
   * Background colour; any CSS color.
   */
  tileColor?: string;
  /**
   * Background colour while `selected`; any CSS color.
   */
  selectedTileColor?: string;
  /**
   * Tighter vertical padding.
   * @default false
   */
  dense?: boolean;
  /**
   * Allows the subtitle to wrap to two lines.
   * @default false
   */
  threeLine?: boolean;
  /**
   * Dims the tile and blocks presses.
   * @default false
   */
  disabled?: boolean;
  /**
   * Highlights the tile as the current choice.
   * @default false
   */
  selected?: boolean;
}

/** VListTile props with polymorphic `as` support. */
export type VListTileProps<E extends ElementType = "div"> = PolymorphicComponentPropsWithRef<
  E,
  VListTileOwnProps
>;
