import type { HTMLAttributes, ReactNode } from "react";

/** Severity of a VAlert; sets its colour and default icon. */
export type VAlertSeverity = "default" | "info" | "success" | "warning" | "error";

/** Look of a VAlert: tinted, solid or outlined. */
export type VAlertVariant = "standard" | "filled" | "outlined";

/** Props of VAlert; other props go to the root `<div>`. */
export interface VAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  // ── 1. Identity ──
  /**
   * Visual variant.
   *
   * @default 'standard'
   */
  variant?: VAlertVariant;
  /**
   * Severity; sets the colour and the default icon.
   *
   * @default 'default'
   */
  severity?: VAlertSeverity;
  // ── 3. Content ──
  /** The message body. */
  children?: ReactNode;
  /** Bold title above the message. */
  title?: ReactNode;
  // ── 4. Decorations ──
  /** Replaces the severity icon; `false` hides the icon. */
  icon?: ReactNode | false;
  /** Element shown at the end of the alert, such as a button. */
  action?: ReactNode;
  // ── 9. Callbacks ──
  /** Called when the close button is pressed; the close button only appears when this is set. */
  onClose?: () => void;
}
