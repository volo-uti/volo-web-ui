import type { HTMLAttributes, ReactNode } from "react";

/** VHoverCard position */
export type VHoverCardPosition =
  | "top"
  | "topStart"
  | "topEnd"
  | "bottom"
  | "bottomStart"
  | "bottomEnd"
  | "left"
  | "leftStart"
  | "leftEnd"
  | "right"
  | "rightStart"
  | "rightEnd";

/** VHoverCard props — native `<div>` props go to the root wrapper. */
export interface VHoverCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  /** Trigger element. */
  children: ReactNode;
  /** Content rendered inside the card. */
  content: ReactNode;
  /**
   * Placement of the card relative to the trigger.
   * @default 'bottom'
   */
  position?: VHoverCardPosition;
  /**
   * Makes the single child element the trigger instead of wrapping it in a `div`.
   *
   * Use it when the child is already a button or a link; the child gets the click handler, `id`
   * and `aria-*` attributes. No role or tabIndex is added, so `disabled` only stops the card
   * from opening and the child stays focusable unless you disable it too.
   *
   * @default false
   */
  asChild?: boolean;
  /**
   * Turns the card off: it never opens and the trigger is not focusable.
   * @default false
   */
  disabled?: boolean;
  /**
   * Delay in ms before the card opens on hover.
   * @default 700
   */
  openDelay?: number;
  /**
   * Delay in ms before the card closes after the pointer leaves.
   * @default 300
   */
  closeDelay?: number;
  /** Accessible label of the card dialog. */
  semanticLabel?: string;
}
