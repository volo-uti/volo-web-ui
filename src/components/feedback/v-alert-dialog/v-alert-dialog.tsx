"use client";

import { forwardRef, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn, createSafeContext } from "../../../lib";
import { useControllable } from "../../../hooks/use-controllable";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useFocusTrap } from "../../../hooks/use-focus-trap";
import { useBodyScrollLock, useEscapeDismiss, useModalLayer } from "../overlay-stack";
import type {
  VAlertDialogActionProps,
  VAlertDialogCancelProps,
  VAlertDialogContentProps,
  VAlertDialogDescriptionProps,
  VAlertDialogProps,
  VAlertDialogTitleProps,
  VAlertDialogTriggerProps,
} from "./v-alert-dialog.types";

// ─────────────────────────────────────────
// Context
// ─────────────────────────────────────────

interface AlertDialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  destructive: boolean;
  barrierDismissible: boolean;
  portalContainer: HTMLElement | null | undefined;
  /** Whether a VAlertDialogTitle / VAlertDialogDescription is mounted. */
  hasTitle: boolean;
  hasDescription: boolean;
  setHasTitle: (mounted: boolean) => void;
  setHasDescription: (mounted: boolean) => void;
}

const [AlertDialogProvider, useAlertDialog] =
  createSafeContext<AlertDialogContextValue>("VAlertDialog");

// ─────────────────────────────────────────
// Root
// ─────────────────────────────────────────

/**
 * Modal dialog that needs an explicit answer.
 *
 * Unlike VDialog, Escape never closes it and a backdrop click closes it only with `barrierDismissible`.
 * The content renders in a portal on `document.body` and the rest of the page is `inert` while it is open.
 *
 * @example
 * <VAlertDialog>
 *   <VAlertDialogTrigger>Delete</VAlertDialogTrigger>
 *   <VAlertDialogContent>
 *     <VAlertDialogTitle>Confirm deletion</VAlertDialogTitle>
 *     <VAlertDialogDescription>This action cannot be undone.</VAlertDialogDescription>
 *     <VAlertDialogCancel>Cancel</VAlertDialogCancel>
 *     <VAlertDialogAction>Delete</VAlertDialogAction>
 *   </VAlertDialogContent>
 * </VAlertDialog>
 */
function VAlertDialog({
  children,
  open,
  defaultOpen = false,
  destructive = false,
  onOpenChange,
  barrierDismissible = false,
  portalContainer,
}: VAlertDialogProps) {
  const [isOpen, setIsOpen] = useControllable({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const titleId = useId();
  const descriptionId = useId();
  const [hasTitle, setHasTitle] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);

  return (
    <AlertDialogProvider
      value={{
        open: isOpen,
        onOpenChange: setIsOpen,
        titleId,
        descriptionId,
        destructive,
        barrierDismissible,
        portalContainer,
        hasTitle,
        hasDescription,
        setHasTitle,
        setHasDescription,
      }}
    >
      {children}
    </AlertDialogProvider>
  );
}

VAlertDialog.displayName = "VAlertDialog";

// ─────────────────────────────────────────
// Trigger
// ─────────────────────────────────────────

/** Button that opens the enclosing VAlertDialog. */
const VAlertDialogTrigger = forwardRef<HTMLButtonElement, VAlertDialogTriggerProps>(
  (props, ref) => {
    const { className, children, onClick, ...rest } = props;
    const { onOpenChange } = useAlertDialog();

    return (
      <button
        ref={ref}
        type="button"
        className={className}
        {...rest}
        onClick={(e) => {
          onClick?.(e);
          if (!e.defaultPrevented) onOpenChange(true);
        }}
      >
        {children}
      </button>
    );
  },
);
VAlertDialogTrigger.displayName = "VAlertDialogTrigger";

// ─────────────────────────────────────────
// Content
// ─────────────────────────────────────────

const noop = () => {};

/** Modal alertdialog panel that traps focus and holds the title, description and actions. */
const VAlertDialogContent = forwardRef<HTMLDivElement, VAlertDialogContentProps>((props, ref) => {
  const { className, children, ...rest } = props;
  const {
    open,
    onOpenChange,
    titleId,
    descriptionId,
    barrierDismissible,
    portalContainer,
    hasTitle,
    hasDescription,
  } = useAlertDialog();
  const override = useComponentOverride("VAlertDialog");
  const contentRef = useRef<HTMLDivElement | null>(null);

  // The portal element exists only on the client after mount, so server and first render match
  const layer = useModalLayer(open, portalContainer);
  const active = layer !== null;

  // WCAG 2.4.3: Focus trap + focus restoration
  useFocusTrap(contentRef, active);

  // Escape never closes an alert dialog, but it must not reach a dialog stacked below it
  useEscapeDismiss(active, noop);
  useBodyScrollLock(active);

  if (!layer) return null;

  return createPortal(
    <>
      {/* Backdrop: visual dimming only; the wrapper above it receives the pointer */}
      <div
        className={cn(
          "fixed inset-0 z-[var(--v-z-modal-backdrop)]",
          "bg-black/50",
          "animate-[v-backdrop-enter_var(--v-duration-fast)_ease-out]",
          override?.styles?.backdrop,
        )}
        aria-hidden="true"
      />
      {/* Dialog: this wrapper covers the viewport, so a press outside the panel lands on it */}
      <div
        className="fixed inset-0 z-[var(--v-z-modal)] flex items-center justify-center p-4"
        onClick={(e) => {
          if (barrierDismissible && e.target === e.currentTarget) onOpenChange(false);
        }}
      >
        <div
          ref={(node) => {
            contentRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={hasTitle ? titleId : undefined}
          aria-describedby={hasDescription ? descriptionId : undefined}
          className={cn(
            "v-alert-dialog",
            "w-full max-w-md",
            "bg-[var(--v-card)] text-[var(--v-card-foreground)]",
            "rounded-[var(--v-radius-lg)]",
            "shadow-[var(--v-shadow-lg)]",
            "p-[var(--v-spacing-xxl)]",
            "animate-[v-dialog-enter_var(--v-duration-fast)_ease-out]",
            override?.styles?.root,
            className,
          )}
          {...rest}
        >
          {children}
        </div>
      </div>
    </>,
    layer,
  );
});
VAlertDialogContent.displayName = "VAlertDialogContent";

// ─────────────────────────────────────────
// Title
// ─────────────────────────────────────────

/** Heading that names the alert dialog (labels it for assistive technology). */
const VAlertDialogTitle = forwardRef<HTMLHeadingElement, VAlertDialogTitleProps>((props, ref) => {
  const { className, children, ...rest } = props;
  const { titleId, setHasTitle } = useAlertDialog();
  const override = useComponentOverride("VAlertDialog");

  useEffect(() => {
    setHasTitle(true);
    return () => setHasTitle(false);
  }, [setHasTitle]);

  return (
    <h2
      ref={ref}
      id={titleId}
      className={cn(
        "text-[length:var(--v-size-xl-font-size)] font-[var(--v-font-weight-semibold)] leading-tight",
        override?.styles?.title,
        className,
      )}
      {...rest}
    >
      {children}
    </h2>
  );
});
VAlertDialogTitle.displayName = "VAlertDialogTitle";

// ─────────────────────────────────────────
// Description
// ─────────────────────────────────────────

/** Paragraph that describes the alert dialog (its accessible description). */
const VAlertDialogDescription = forwardRef<HTMLParagraphElement, VAlertDialogDescriptionProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    const { descriptionId, setHasDescription } = useAlertDialog();
    const override = useComponentOverride("VAlertDialog");

    useEffect(() => {
      setHasDescription(true);
      return () => setHasDescription(false);
    }, [setHasDescription]);

    return (
      <p
        ref={ref}
        id={descriptionId}
        className={cn(
          "mt-2 text-[length:var(--v-size-md-font-size)] text-[var(--v-muted-foreground)]",
          override?.styles?.description,
          className,
        )}
        {...rest}
      >
        {children}
      </p>
    );
  },
);
VAlertDialogDescription.displayName = "VAlertDialogDescription";

// ─────────────────────────────────────────
// Action
// ─────────────────────────────────────────

/** Primary-styled button that closes the alert dialog when clicked. */
const VAlertDialogAction = forwardRef<HTMLButtonElement, VAlertDialogActionProps>((props, ref) => {
  const { className, children, onClick, ...rest } = props;
  const { onOpenChange, destructive } = useAlertDialog();
  const override = useComponentOverride("VAlertDialog");

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center justify-center",
        "h-[var(--v-size-md-height)] px-[var(--v-size-md-padding-x)]",
        "text-[length:var(--v-size-md-font-size)]",
        "rounded-[var(--v-size-md-radius)]",
        destructive
          ? "bg-[var(--v-destructive)] text-[var(--v-destructive-foreground)]"
          : "bg-[var(--v-primary)] text-[var(--v-primary-foreground)]",
        "font-[var(--v-font-weight-medium)]",
        "hover:opacity-90 transition-opacity cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)]",
        override?.styles?.action,
        className,
      )}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) onOpenChange(false);
      }}
    >
      {children}
    </button>
  );
});
VAlertDialogAction.displayName = "VAlertDialogAction";

// ─────────────────────────────────────────
// Cancel
// ─────────────────────────────────────────

/** Dismissing button that closes the alert dialog without confirming. */
const VAlertDialogCancel = forwardRef<HTMLButtonElement, VAlertDialogCancelProps>((props, ref) => {
  const { className, children, onClick, ...rest } = props;
  const { onOpenChange } = useAlertDialog();
  const override = useComponentOverride("VAlertDialog");

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center justify-center",
        "h-[var(--v-size-md-height)] px-[var(--v-size-md-padding-x)]",
        "text-[length:var(--v-size-md-font-size)]",
        "rounded-[var(--v-size-md-radius)]",
        "border border-[var(--v-border)]",
        "bg-transparent text-[var(--v-foreground)]",
        "font-[var(--v-font-weight-medium)]",
        "hover:bg-[var(--v-muted)] transition-colors cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)]",
        override?.styles?.cancel,
        className,
      )}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) onOpenChange(false);
      }}
    >
      {children}
    </button>
  );
});
VAlertDialogCancel.displayName = "VAlertDialogCancel";

export {
  VAlertDialog,
  VAlertDialogTrigger,
  VAlertDialogContent,
  VAlertDialogTitle,
  VAlertDialogDescription,
  VAlertDialogAction,
  VAlertDialogCancel,
};
