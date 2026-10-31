import type { HTMLAttributes, ReactNode } from "react";

/** Colour and icon of a VSnackbar. */
export type VSnackbarVariant = "default" | "success" | "error" | "warning" | "info";

/** Whether a VSnackbar spans the full width or floats as a card. */
export type VSnackbarBehavior = "fixed" | "floating";

/** Action button of a VSnackbar. */
export interface VSnackbarAction {
  /** Button label. */
  label: string;
  /** Called when the button is pressed. */
  onClick: () => void;
}

/** Props of VSnackbar; other props go to the inner message bar `<div>`. */
export interface VSnackbarProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  // ── 1. Identity ──
  /**
   * Colour and icon.
   *
   * @default 'default'
   */
  variant?: VSnackbarVariant;
  // ── 3. Content ──
  /** The message. */
  content?: ReactNode;
  // ── 4. Decorations ──
  /** Action button shown after the message. */
  action?: VSnackbarAction;
  // ── 7. Layout ──
  /**
   * `'fixed'` spans the full width; `'floating'` is a rounded card.
   *
   * @default 'fixed'
   */
  behavior?: VSnackbarBehavior;
  /** Width of a floating snackbar; a number is pixels. */
  width?: number | string;
  /**
   * Swipe direction that dismisses the snackbar; `'none'` turns swiping off.
   *
   * @default 'right'
   */
  dismissDirection?: "left" | "right" | "none";
  // ── 8. State ──
  /**
   * Whether the snackbar is shown.
   *
   * @default true
   */
  visible?: boolean;
  // ── 9. Callbacks ──
  /** Called when the snackbar should go away: the timer ran out or the user swiped it off. */
  onClose?: () => void;
  // ── 10. Advanced ──
  /**
   * Milliseconds before `onClose` fires; 0 keeps it until dismissed.
   *
   * @default 5000
   */
  duration?: number;
}
