import type { HTMLAttributes, ReactNode } from "react";

/** VBreadcrumb props; other props go to the `<nav>`. */
export interface VBreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** VBreadcrumbItem elements, in order from the root to the current page. */
  children?: ReactNode;
  /**
   * Node shown between items.
   * @default '/'
   */
  separator?: ReactNode;
  /** Most items shown; when exceeded the middle ones collapse into "...". */
  maxItems?: number;
}

/** VBreadcrumbItem props; other props go to the rendered `<a>`, `<button>` or `<span>`. */
export interface VBreadcrumbItemProps extends HTMLAttributes<HTMLElement> {
  /** Item label. */
  children?: ReactNode;
  /** Link target; renders an `<a>` unless the item is `active`. */
  href?: string;
  /** Icon shown before the label. */
  icon?: ReactNode;
  /**
   * Marks the current page: plain text with `aria-current="page"`, not pressable.
   * @default false
   */
  active?: boolean;
}
