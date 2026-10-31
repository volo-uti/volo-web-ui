import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

/** Props of the VAlertDialog root; it renders no element of its own. */
export interface VAlertDialogProps {
  // ── 3. Content ──
  /** The trigger and content parts. */
  children?: ReactNode;
  // ── 8. State ──
  /** Open state (controlled). */
  open?: boolean;
  /**
   * Initial open state (uncontrolled).
   *
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Styles VAlertDialogAction as a destructive (error-coloured) button.
   *
   * @default false
   */
  destructive?: boolean;
  // ── 9. Callbacks ──
  /** Called with the new open state when the dialog opens or closes. */
  onOpenChange?: (open: boolean) => void;
  // ── 10. Advanced ──
  /**
   * Whether clicking the backdrop closes the dialog; Escape never closes it.
   *
   * @default false
   */
  barrierDismissible?: boolean;
  /**
   * Element the dialog portal is appended to; the page body when omitted or `null`.
   *
   * The dialog mounts its own container inside it. Everything else on the path up to the body
   * becomes `inert` while the dialog is open, so pick an element that is part of the page.
   */
  portalContainer?: HTMLElement | null;
}

/** Props of VAlertDialogTrigger: native `<button>` attributes. */
export type VAlertDialogTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

/** Props of VAlertDialogContent: native `<div>` attributes, applied to the dialog panel. */
export type VAlertDialogContentProps = HTMLAttributes<HTMLDivElement>;

/** Props of VAlertDialogTitle: native `<h2>` attributes. */
export type VAlertDialogTitleProps = HTMLAttributes<HTMLHeadingElement>;

/** Props of VAlertDialogDescription: native `<p>` attributes. */
export type VAlertDialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

/** Props of VAlertDialogAction: native `<button>` attributes; a click also closes the dialog. */
export type VAlertDialogActionProps = ButtonHTMLAttributes<HTMLButtonElement>;

/** Props of VAlertDialogCancel: native `<button>` attributes; a click also closes the dialog. */
export type VAlertDialogCancelProps = ButtonHTMLAttributes<HTMLButtonElement>;
