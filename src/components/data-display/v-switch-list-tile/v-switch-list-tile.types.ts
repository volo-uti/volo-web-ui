import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** Where VSwitchListTile puts the switch: after the text, before it, or in a bordered card. */
export type VSwitchListTileVariant = "default" | "leading" | "card";

/** VSwitchListTile props; native `<label>` props (`onClick`, `className`, …) are accepted. */
export interface VSwitchListTileProps extends Omit<
  ComponentPropsWithoutRef<"label">,
  "title" | "onChange" | "defaultChecked" | "children"
> {
  /**
   * Switch position: after the text, before it, or in a bordered card.
   * @default 'default'
   */
  variant?: VSwitchListTileVariant;
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
   * Element between the text and the switch.
   */
  trailing?: ReactNode;
  /**
   * Track colour while on; any CSS color.
   */
  activeColor?: string;
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
   * On/off state for controlled use.
   */
  checked?: boolean;
  /**
   * Initial on/off state for uncontrolled use.
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * Highlights the tile as the current choice.
   * @default false
   */
  selected?: boolean;
  /**
   * Called with the new on/off state.
   */
  onCheckedChange?: (checked: boolean) => void;
}
