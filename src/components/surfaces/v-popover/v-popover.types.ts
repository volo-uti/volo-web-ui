import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import type { VAlign, VSide } from "../../../lib";

/** VPopover root props. */
export interface VPopoverProps {
  /** A `VPopoverTrigger` and a `VPopoverContent`. */
  children?: ReactNode;
  /**
   * Side of the trigger the content opens on; fine placement along that side is `align` on the content.
   *
   * @default 'bottom'
   */
  position?: VSide;
  /** Controlled open state; pair it with `onOpenChange`. */
  open?: boolean;
  /**
   * Initial open state when uncontrolled.
   *
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Whether a press outside the content closes the popover; Escape always closes it.
   *
   * @default true
   */
  barrierDismissible?: boolean;
  /** Called with the next open state when the user opens or closes the popover. */
  onOpenChange?: (open: boolean) => void;
}

/** VPopoverTrigger props; the native `<span>` attributes are accepted. */
export interface VPopoverTriggerProps extends HTMLAttributes<HTMLElement> {
  /**
   * Makes the single child element the trigger instead of wrapping it in a `span`.
   *
   * Use it when the child is already a button or a link; the child gets the handlers, `id` and
   * `aria-*` attributes and keeps its own ref. No role or tabIndex is added.
   *
   * @default false
   */
  asChild?: boolean;
}

/** VPopoverContent props. */
export interface VPopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Alignment along the trigger's edge.
   *
   * @default 'center'
   */
  align?: VAlign;
  /**
   * Gap in px between the trigger and the content.
   *
   * @default 8
   */
  sideOffset?: number;
}

/** VPopoverClose props; the native `<button>` attributes are accepted. */
export interface VPopoverCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Makes the single child element the close control instead of rendering a `button`.
   *
   * Use it when the child is already a button; it keeps its own accessible name.
   *
   * @default false
   */
  asChild?: boolean;
}
