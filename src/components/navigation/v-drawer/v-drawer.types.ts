import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import type { VSide } from "../../../lib";

/** Whether a VDrawer dims the page (`default`) or sits beside it (`persistent`). */
export type VDrawerVariant = "default" | "persistent";

/** VDrawer props. */
export interface VDrawerProps {
  /**
   * `default` is a modal with backdrop; `persistent` has no backdrop.
   * @default 'default'
   */
  variant?: VDrawerVariant;
  /** VDrawerTrigger and VDrawerContent elements. */
  children?: ReactNode;
  /**
   * Screen edge the panel slides in from.
   * @default 'left'
   */
  side?: VSide;
  /** Open state (controlled). */
  open?: boolean;
  /**
   * Open state when uncontrolled.
   * @default false
   */
  defaultOpen?: boolean;
  /** Called with the next open state on trigger, close button, backdrop or Escape. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Element the modal drawer portal is appended to; the page body when omitted or `null`.
   *
   * The persistent variant ignores it. The drawer mounts its own container inside it, and
   * everything else on the path up to the body becomes `inert` while the drawer is open.
   */
  portalContainer?: HTMLElement | null;
}

/** VDrawerTrigger props; other props go to the `<button>`. */
export type VDrawerTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

/** VDrawerContent props; other props go to the `<div role="dialog">`. */
export interface VDrawerContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Panel background; any CSS color. */
  backgroundColor?: string;
  /** Panel content. */
  children?: ReactNode;
  /** Panel width in px (number) or any CSS length; replaces the default width. */
  width?: string | number;
}

/** VDrawerHeader props; other props go to the `<div>`. */
export type VDrawerHeaderProps = HTMLAttributes<HTMLDivElement>;

/** VDrawerFooter props; other props go to the `<div>`. */
export type VDrawerFooterProps = HTMLAttributes<HTMLDivElement>;

/** VDrawerClose props; other props go to the `<button>`. */
export type VDrawerCloseProps = ButtonHTMLAttributes<HTMLButtonElement>;
