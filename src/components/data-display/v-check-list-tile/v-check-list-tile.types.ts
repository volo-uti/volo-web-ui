import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** Where VCheckListTile puts the checkbox: after the text, before it, or in a bordered card. */
export type VCheckListTileVariant = "default" | "leading" | "card";

/** VCheckListTile props; native `<label>` props (`onClick`, `className`, …) are accepted. */
export interface VCheckListTileProps extends Omit<
  ComponentPropsWithoutRef<"label">,
  "title" | "onChange" | "defaultChecked" | "children"
> {
  /**
   * Checkbox position: after the text, before it, or in a bordered card.
   * @default 'default'
   */
  variant?: VCheckListTileVariant;
  /**
   * Primary text.
   */
  title: ReactNode;
  /**
   * Secondary text under the title.
   */
  subtitle?: ReactNode;
  /**
   * Element before the text; ignored when `variant` is `'leading'`.
   */
  leading?: ReactNode;
  /**
   * Element between the text and the checkbox.
   */
  trailing?: ReactNode;
  /**
   * Tighter vertical padding.
   * @default false
   */
  dense?: boolean;
  /**
   * Dims the tile and blocks input.
   * @default false
   */
  disabled?: boolean;
  /**
   * Checked state for controlled use.
   */
  checked?: boolean;
  /**
   * Initial checked state for uncontrolled use.
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * Highlights the tile as the current choice.
   * @default false
   */
  selected?: boolean;
  /**
   * Called with the new checked state.
   */
  onCheckedChange?: (checked: boolean) => void;
}
