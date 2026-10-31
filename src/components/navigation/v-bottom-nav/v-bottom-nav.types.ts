import type { HTMLAttributes, ReactNode } from "react";

/** Visual style of a VBottomNav. */
export type VBottomNavVariant = "default" | "labeled" | "shifting";

/** One destination of a VBottomNav. */
export interface VBottomNavItem {
  /** Identifier passed to `onValueChange` and compared with `value`. */
  value: string;
  /** Icon shown above the label. */
  icon: ReactNode;
  /** Label text; also the accessible name. */
  label: string;
  /** Icon shown instead of `icon` while selected. */
  activeIcon?: ReactNode;
  /** Badge pinned to the icon, e.g. a notification count. */
  badge?: ReactNode;
  /**
   * Prevents selecting this item.
   * @default false
   */
  disabled?: boolean;
}

/** VBottomNav props; other props go to the `<nav>`. */
export interface VBottomNavProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  /**
   * Visual style; `labeled` always shows labels, `shifting` enlarges the selected icon.
   * @default 'default'
   */
  variant?: VBottomNavVariant;
  /** Destinations, usually three to five. */
  items?: VBottomNavItem[];
  /** Selected item value (controlled). */
  value?: string;
  /** Selected item value when uncontrolled. */
  defaultValue?: string;
  /**
   * Shows the label under every icon; otherwise only under the selected one.
   * @default true
   */
  showLabels?: boolean;
  /** Called with the item value when the user selects an item. */
  onValueChange?: (value: string) => void;
}
