import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

/** Horizontal alignment of the buttons in a VDialogFooter. */
export type VDialogActionsAlignment = "start" | "center" | "end";

/** Props of the VDialog root; it renders no element of its own. */
export interface VDialogProps {
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
  // ── 9. Callbacks ──
  /** Called with the new open state when the dialog opens or closes (trigger, close button, Escape, backdrop). */
  onOpenChange?: (open: boolean) => void;
  // ── 10. Advanced ──
  /**
   * Whether clicking the backdrop closes the dialog; Escape always closes it.
   *
   * @default true
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

/** Props of VDialogTrigger: native `<button>` attributes. */
export type VDialogTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

/** Props of VDialogContent: native `<div>` attributes, applied to the dialog panel. */
export type VDialogContentProps = HTMLAttributes<HTMLDivElement>;

/** Props of VDialogHeader: native `<div>` attributes. */
export type VDialogHeaderProps = HTMLAttributes<HTMLDivElement>;

/** Props of VDialogFooter. */
export interface VDialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  // ── 7. Layout ──
  /**
   * Horizontal alignment of the buttons.
   *
   * @default 'end'
   */
  actionsAlignment?: VDialogActionsAlignment;
  /**
   * Stretches every direct child button to share the row evenly.
   *
   * @default false
   */
  actionsExpanded?: boolean;
}

/** Props of VDialogTitle: native `<h2>` attributes. */
export type VDialogTitleProps = HTMLAttributes<HTMLHeadingElement>;

/** Props of VDialogDescription: native `<p>` attributes. */
export type VDialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

/** Props of VDialogClose: native `<button>` attributes. */
export type VDialogCloseProps = ButtonHTMLAttributes<HTMLButtonElement>;
