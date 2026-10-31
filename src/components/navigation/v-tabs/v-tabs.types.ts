import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import type { VOrientation } from "../../../lib";

/** Visual style of a VTabsList. */
export type VTabsVariant = "default" | "pills" | "underline";

/** VTabs props; other props go to the root `<div>`. */
export interface VTabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> {
  /** Active tab value (controlled). */
  value?: string;
  /**
   * Active tab value when uncontrolled.
   * @default ''
   */
  defaultValue?: string;
  /** VTabsList and VTabsContent elements. */
  children?: ReactNode;
  /**
   * Direction of the tab list; arrow keys follow it.
   * @default 'horizontal'
   */
  orientation?: VOrientation;
  /**
   * Lets the tabs scroll horizontally instead of wrapping.
   * @default false
   */
  isScrollable?: boolean;
  /** Called with the tab value when the active tab changes. */
  onValueChange?: (value: string) => void;
}

/** VTabsList props; other props go to the `<div role="tablist">`. */
export interface VTabsListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style of the tabs.
   * @default 'default'
   */
  variant?: VTabsVariant;
  /** VTabsTrigger elements. */
  children?: ReactNode;
}

/** VTabsTrigger props; other props go to the `<button role="tab">`. */
export interface VTabsTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** Tab value; matches the VTabsContent with the same value. */
  value: string;
  /** Tab label. */
  children?: ReactNode;
  /** Icon shown before the label. */
  icon?: ReactNode;
  /**
   * Prevents selecting the tab and skips it in keyboard navigation.
   * @default false
   */
  disabled?: boolean;
}

/** VTabsContent props; other props go to the `<div role="tabpanel">`. */
export interface VTabsContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Tab value; the panel shows while this tab is active. */
  value: string;
  /** Panel content. */
  children?: ReactNode;
}
