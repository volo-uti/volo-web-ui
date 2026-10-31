import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** What VSettingTile shows at its end: custom content, a chevron, a switch or a checkbox. */
export type VSettingTileVariant = "simple" | "navigation" | "switch" | "checkbox";

/** VSettingTile props; native `<div>` props (`className`, …) are accepted. */
export interface VSettingTileProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "title" | "onChange" | "children"
> {
  /**
   * What the tile shows at its end: custom content, a chevron, a switch or a checkbox.
   * @default 'simple'
   */
  variant?: VSettingTileVariant;
  /**
   * Setting name.
   */
  title: ReactNode;
  /**
   * Secondary text under the title.
   */
  subtitle?: ReactNode;
  /**
   * Current value shown before the chevron; `navigation` variant only.
   */
  value?: ReactNode;
  /**
   * Element before the text, such as an icon.
   */
  leading?: ReactNode;
  /**
   * Element at the end; `simple` variant only.
   */
  trailing?: ReactNode;
  /**
   * On/off state for controlled use; `switch` and `checkbox` variants.
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
   * Dims the tile and blocks presses.
   * @default false
   */
  disabled?: boolean;
  /**
   * Called with the new on/off state; `switch` and `checkbox` variants.
   */
  onCheckedChange?: (checked: boolean) => void;
}
