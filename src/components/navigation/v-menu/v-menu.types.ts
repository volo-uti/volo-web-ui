import type { HTMLAttributes, ReactNode } from "react";
import type { VAlign } from "../../../lib";

/** Props of VMenu. */
export interface VMenuProps {
  /** Trigger and content parts. */
  children?: ReactNode;
  /**
   * Whether choosing an item closes the menu.
   * @default true
   */
  closeOnSelect?: boolean;
  /** Whether the menu is open (controlled). */
  open?: boolean;
  /**
   * Initial open state when `open` is not given.
   * @default false
   */
  defaultOpen?: boolean;
  /** Called with the next open state. */
  onOpenChange?: (open: boolean) => void;
}

/** Props of VMenuTrigger. */
export interface VMenuTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /** Trigger content; with `asChild`, exactly one element. */
  children?: ReactNode;
  /**
   * Makes the single child element the trigger instead of rendering a `button`.
   *
   * Use it when the child is already a button or a link; the child gets the click handler,
   * `aria-expanded` and `aria-haspopup`, and keeps its own ref.
   *
   * @default false
   */
  asChild?: boolean;
}

/** Props of VMenuContent. */
export interface VMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Menu items, groups, labels and separators. */
  children?: ReactNode;
  /**
   * Horizontal alignment against the trigger.
   * @default "start"
   */
  align?: VAlign;
}

/** Props of VMenuItem. */
export interface VMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Item label. */
  children?: ReactNode;
  /** Content before the label, such as an icon. */
  leading?: ReactNode;
  /** Content after the label, such as shortcut text. */
  trailing?: ReactNode;
  /**
   * Whether the item cannot be chosen.
   * @default false
   */
  disabled?: boolean;
  /**
   * Styles the item as a destructive action.
   * @default false
   */
  destructive?: boolean;
}

/** Props of VMenuSeparator. */
export type VMenuSeparatorProps = HTMLAttributes<HTMLDivElement>;

/** Props of VMenuGroup. */
export interface VMenuGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Items of the group. */
  children?: ReactNode;
}

/** Props of VMenuLabel. */
export interface VMenuLabelProps extends HTMLAttributes<HTMLDivElement> {
  /** Label content. */
  children?: ReactNode;
}
