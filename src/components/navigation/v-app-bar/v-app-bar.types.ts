import type { HTMLAttributes, ReactNode } from "react";

/** Visual style of a VAppBar. */
export type VAppBarVariant = "default" | "transparent" | "elevated" | "centered";

/** VAppBar props; other props go to the `<header>`. */
export interface VAppBarProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /**
   * Visual style; `centered` also centers the title.
   * @default 'default'
   */
  variant?: VAppBarVariant;
  /** Title; a string renders as an `<h1>`, any other node is placed as is. */
  title?: ReactNode;
  /** Row under the title, e.g. a VTabsList. */
  bottom?: ReactNode;
  /** Element before the title, e.g. a back button or menu icon. */
  leading?: ReactNode;
  /** Elements after the title, e.g. icon buttons. */
  actions?: ReactNode;
  /** Centers the title; defaults to true for the `centered` variant. */
  centerTitle?: boolean;
  /**
   * Sticks the bar to the top while scrolling.
   * @default false
   */
  sticky?: boolean;
}
