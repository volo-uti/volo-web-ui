"use client";

import { forwardRef, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn, createSafeContext } from "../../../lib";
import { useControllable } from "../../../hooks/use-controllable";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useFocusTrap } from "../../../hooks/use-focus-trap";
import { useBodyScrollLock, useEscapeDismiss, useModalLayer } from "../overlay-stack";
import type {
  VDialogActionsAlignment,
  VDialogCloseProps,
  VDialogContentProps,
  VDialogDescriptionProps,
  VDialogFooterProps,
  VDialogHeaderProps,
  VDialogProps,
  VDialogTitleProps,
  VDialogTriggerProps,
} from "./v-dialog.types";

// ─────────────────────────────────────────
// Context
// ─────────────────────────────────────────

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  barrierDismissible: boolean;
  portalContainer: HTMLElement | null | undefined;
  /** Reports whether a VDialogTitle / VDialogDescription is mounted. */
  setHasTitle: (mounted: boolean) => void;
  setHasDescription: (mounted: boolean) => void;
  hasTitle: boolean;
  hasDescription: boolean;
}

const [DialogProvider, useDialog] = createSafeContext<DialogContextValue>("VDialog");

// ─────────────────────────────────────────
// Root
// ─────────────────────────────────────────

/**
 * Modal dialog with backdrop and focus trap.
 *
 * Compound parts: Trigger, Content, Header, Footer, Title, Description, Close. Escape and (unless `barrierDismissible` is false) a backdrop click close it.
 * The content renders in a portal on `document.body` and the rest of the page is `inert` while it is open.
 *
 * @example
 * <VDialog>
 *   <VDialogTrigger>Open</VDialogTrigger>
 *   <VDialogContent>
 *     <VDialogHeader>
 *       <VDialogTitle>Dialog Title</VDialogTitle>
 *       <VDialogDescription>Description text</VDialogDescription>
 *     </VDialogHeader>
 *     <p>Body content here</p>
 *     <VDialogFooter>
 *       <VDialogClose>Cancel</VDialogClose>
 *     </VDialogFooter>
 *   </VDialogContent>
 * </VDialog>
 */
function VDialog({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  barrierDismissible = true,
  portalContainer,
}: VDialogProps) {
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
    <DialogProvider
      value={{
        open: isOpen,
        onOpenChange: setIsOpen,
        titleId,
        descriptionId,
        barrierDismissible,
        portalContainer,
        hasTitle,
        hasDescription,
        setHasTitle,
        setHasDescription,
      }}
    >
      {children}
    </DialogProvider>
  );
}

VDialog.displayName = "VDialog";

// ─────────────────────────────────────────
// Trigger
// ─────────────────────────────────────────

/** Button that opens the enclosing VDialog. */
const VDialogTrigger = forwardRef<HTMLButtonElement, VDialogTriggerProps>((props, ref) => {
  const { className, children, onClick, ...rest } = props;
  const { onOpenChange } = useDialog();

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
});
VDialogTrigger.displayName = "VDialogTrigger";

// ─────────────────────────────────────────
// Content
// ─────────────────────────────────────────

/** Modal dialog panel with focus trap. */
const VDialogContent = forwardRef<HTMLDivElement, VDialogContentProps>((props, ref) => {
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
  } = useDialog();
  const override = useComponentOverride("VDialog");
  const contentRef = useRef<HTMLDivElement | null>(null);

  // The portal element exists only on the client after mount, so server and first render match
  const layer = useModalLayer(open, portalContainer);
  const active = layer !== null;

  // WCAG 2.4.3: Focus trap + focus restoration
  useFocusTrap(contentRef, active);

  // Escape closes only the topmost overlay; the page does not scroll behind the dialog
  useEscapeDismiss(active, () => onOpenChange(false));
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
          role="dialog"
          aria-modal="true"
          aria-labelledby={hasTitle ? titleId : undefined}
          aria-describedby={hasDescription ? descriptionId : undefined}
          className={cn(
            "v-dialog",
            "w-full max-w-lg",
            "bg-[var(--v-card)] text-[var(--v-card-foreground)]",
            "rounded-[var(--v-radius-lg)]",
            "shadow-[var(--v-shadow-lg)]",
            "flex flex-col",
            "animate-[v-dialog-enter_var(--v-duration-fast)_ease-out]",
            override?.styles?.root,
            className,
          )}
          {...rest}
          onClick={(e) => {
            rest.onClick?.(e);
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </>,
    layer,
  );
});
VDialogContent.displayName = "VDialogContent";

// ─────────────────────────────────────────
// Header
// ─────────────────────────────────────────

/** Layout block at the top of VDialogContent for the title and description. */
const VDialogHeader = forwardRef<HTMLDivElement, VDialogHeaderProps>((props, ref) => {
  const { className, children, ...rest } = props;
  const override = useComponentOverride("VDialog");

  return (
    <div
      ref={ref}
      className={cn("p-[var(--v-spacing-xxl)] pb-0", override?.styles?.header, className)}
      {...rest}
    >
      {children}
    </div>
  );
});
VDialogHeader.displayName = "VDialogHeader";

// ─────────────────────────────────────────
// Footer
// ─────────────────────────────────────────

const actionsAlignmentClass: Record<VDialogActionsAlignment, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
};

/** Layout block at the bottom of VDialogContent that holds the action buttons. */
const VDialogFooter = forwardRef<HTMLDivElement, VDialogFooterProps>((props, ref) => {
  const { className, children, actionsAlignment = "end", actionsExpanded = false, ...rest } = props;
  const override = useComponentOverride("VDialog");

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-[var(--v-spacing-sm)]",
        actionsAlignmentClass[actionsAlignment],
        actionsExpanded && "[&>*]:flex-1",
        "p-[var(--v-spacing-xxl)] pt-0",
        override?.styles?.footer,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
VDialogFooter.displayName = "VDialogFooter";

// ─────────────────────────────────────────
// Title
// ─────────────────────────────────────────

/** Heading that names the dialog (labels it for assistive technology). */
const VDialogTitle = forwardRef<HTMLHeadingElement, VDialogTitleProps>((props, ref) => {
  const { className, children, ...rest } = props;
  const { titleId, setHasTitle } = useDialog();
  const override = useComponentOverride("VDialog");

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
VDialogTitle.displayName = "VDialogTitle";

// ─────────────────────────────────────────
// Description
// ─────────────────────────────────────────

/** Paragraph that describes the dialog (its accessible description). */
const VDialogDescription = forwardRef<HTMLParagraphElement, VDialogDescriptionProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    const { descriptionId, setHasDescription } = useDialog();
    const override = useComponentOverride("VDialog");

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
VDialogDescription.displayName = "VDialogDescription";

// ─────────────────────────────────────────
// Close
// ─────────────────────────────────────────

/** Button that closes the enclosing VDialog. */
const VDialogClose = forwardRef<HTMLButtonElement, VDialogCloseProps>((props, ref) => {
  const { className, children, onClick, ...rest } = props;
  const { onOpenChange } = useDialog();
  const override = useComponentOverride("VDialog");

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
        override?.styles?.close,
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
VDialogClose.displayName = "VDialogClose";

export {
  VDialog,
  VDialogTrigger,
  VDialogContent,
  VDialogHeader,
  VDialogFooter,
  VDialogTitle,
  VDialogDescription,
  VDialogClose,
};
