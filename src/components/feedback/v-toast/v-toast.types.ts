import type { HTMLAttributes, ReactNode } from "react";

/** Severity of a toast; sets the accent colour. */
export type VToastType = "default" | "success" | "info" | "warning" | "error";

/** Corner or edge of the screen where the VToaster stacks toasts. */
export type VToastPosition =
  "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

/** Action button of a toast. */
export interface VToastAction {
  /** Button label. */
  label: string;
  /** Called when the button is pressed; the toast then closes. */
  onClick: () => void;
}

/** One toast in the toaster's list, as stored by the `toast` API. */
export interface VToastData {
  // ── 1. Identity ──
  /** Severity; sets the accent colour. */
  type: VToastType;
  // ── 3. Content ──
  /** Unique ID returned by the `toast` call; pass it to `toast.dismiss`. */
  id: string;
  /** The message. */
  message: ReactNode;
  // ── 4. Decorations ──
  /** Action button shown after the message. */
  action?: VToastAction;
  // ── 10. Advanced ──
  /** Milliseconds before the toast closes; 0 keeps it until dismissed. */
  duration: number;
}

/** Props of VToaster; other props go to the container `<div>`. */
export interface VToasterProps extends HTMLAttributes<HTMLDivElement> {
  // ── 7. Layout ──
  /**
   * Where the toasts stack.
   *
   * @default 'bottom-right'
   */
  position?: VToastPosition;
}

/** Options of a `toast.*` call. */
export interface VToastOptions {
  // ── 4. Decorations ──
  /** Action button shown after the message. */
  action?: VToastAction;
  // ── 10. Advanced ──
  /**
   * Milliseconds before the toast closes; 0 keeps it until dismissed.
   *
   * @default 5000
   */
  duration?: number;
}
