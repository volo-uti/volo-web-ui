"use client";

import { forwardRef, useRef } from "react";
import { createPortal } from "react-dom";
import { cn, createSafeContext } from "../../../lib";
import type { VSide } from "../../../lib";
import { useControllable } from "../../../hooks/use-controllable";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useFocusTrap } from "../../../hooks/use-focus-trap";
import { useBodyScrollLock, useEscapeDismiss, useModalLayer } from "../../feedback/overlay-stack";
import type {
  VDrawerCloseProps,
  VDrawerContentProps,
  VDrawerFooterProps,
  VDrawerHeaderProps,
  VDrawerProps,
  VDrawerTriggerProps,
} from "./v-drawer.types";

// ─────────────────────────────────────────
// Context
// ─────────────────────────────────────────

interface DrawerContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side: VSide;
  variant: "default" | "persistent";
  portalContainer: HTMLElement | null | undefined;
}

const [DrawerProvider, useDrawer] = createSafeContext<DrawerContextValue>("VDrawer");

// ─────────────────────────────────────────
// Side position styles
// ─────────────────────────────────────────

const sidePositionStyles: Record<VSide, string> = {
  left: "inset-y-0 left-0",
  right: "inset-y-0 right-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0",
};

const sideSizeStyles: Record<VSide, string> = {
  left: "h-full w-80 max-w-[80vw] border-r border-[var(--v-border)]",
  right: "h-full w-80 max-w-[80vw] border-l border-[var(--v-border)]",
  top: "w-full h-auto max-h-[85vh] border-b border-[var(--v-border)]",
  bottom: "w-full h-auto max-h-[85vh] border-t border-[var(--v-border)]",
};

// ─────────────────────────────────────────
// Root
// ─────────────────────────────────────────

/**
 * Panel that slides in from any screen edge, modal or persistent.
 *
 * The modal variant renders in a portal on `document.body` and makes the rest of the page
 * `inert` while open; the persistent variant stays in place and leaves the page usable.
 *
 * @example
 * <VDrawer side="right">
 *   <VDrawerTrigger>Open</VDrawerTrigger>
 *   <VDrawerContent>
 *     <VDrawerHeader>Title</VDrawerHeader>
 *     <p>Content</p>
 *     <VDrawerFooter>
 *       <VDrawerClose>Close</VDrawerClose>
 *     </VDrawerFooter>
 *   </VDrawerContent>
 * </VDrawer>
 */
function VDrawer({
  variant = "default",
  children,
  side = "left",
  open,
  defaultOpen = false,
  onOpenChange,
  portalContainer,
}: VDrawerProps) {
  const [isOpen, setIsOpen] = useControllable({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <DrawerProvider
      value={{ open: isOpen, onOpenChange: setIsOpen, side, variant, portalContainer }}
    >
      {children}
    </DrawerProvider>
  );
}

VDrawer.displayName = "VDrawer";

// ─────────────────────────────────────────
// Trigger
// ─────────────────────────────────────────

/** Button that opens the enclosing VDrawer. */
const VDrawerTrigger = forwardRef<HTMLButtonElement, VDrawerTriggerProps>((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  const { onOpenChange } = useDrawer();

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
VDrawerTrigger.displayName = "VDrawerTrigger";

// ─────────────────────────────────────────
// Content
// ─────────────────────────────────────────

/** Side panel of a VDrawer that opens as a dialog from the chosen edge. */
const VDrawerContent = forwardRef<HTMLDivElement, VDrawerContentProps>((props, ref) => {
  const {
    backgroundColor,
    children,
    width,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    className,
    ...rest
  } = props;
  const { open, onOpenChange, side, variant, portalContainer } = useDrawer();
  const override = useComponentOverride("VDrawer");
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // A persistent drawer is part of the page: no trap, no Escape, no scroll lock
  const isModal = variant !== "persistent";

  // A modal drawer gets a portal element on the client after mount, so server and first render match
  const layer = useModalLayer(open && isModal, portalContainer);
  const modal = layer !== null;

  // WCAG 2.4.3: Focus trap + focus restoration
  useFocusTrap(drawerRef, modal);

  // Escape closes only the topmost overlay; the page does not scroll behind the drawer
  useEscapeDismiss(modal, () => onOpenChange(false));
  useBodyScrollLock(modal);

  if (!open || (isModal && !layer)) return null;

  const widthStyle =
    width !== undefined ? { width: typeof width === "number" ? `${width}px` : width } : undefined;

  const bgStyle = backgroundColor !== undefined ? { backgroundColor } : undefined;

  const panelStyle = { ...widthStyle, ...bgStyle };

  const content = (
    <>
      {/* Backdrop — only for non-persistent variant */}
      {variant !== "persistent" && (
        <div
          className={cn(
            "fixed inset-0 z-[var(--v-z-modal-backdrop)]",
            "bg-black/50",
            override?.styles?.backdrop,
          )}
          onClick={() => onOpenChange(false)}
          aria-hidden="true"
        />
      )}
      {/* Drawer panel */}
      <div
        ref={(node) => {
          drawerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="dialog"
        aria-modal={variant !== "persistent"}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={cn(
          "v-drawer",
          variant === "persistent" ? "relative" : "fixed z-[var(--v-z-modal)]",
          "bg-[var(--v-card)] text-[var(--v-card-foreground)]",
          variant !== "persistent" && "shadow-[var(--v-shadow-lg)]",
          "flex flex-col",
          sidePositionStyles[side],
          !widthStyle && sideSizeStyles[side],
          override?.styles?.root,
          className,
        )}
        style={Object.keys(panelStyle).length > 0 ? panelStyle : undefined}
        data-v-side={side}
        data-v-variant={variant}
        {...rest}
      >
        {children}
      </div>
    </>
  );

  return layer ? createPortal(content, layer) : content;
});
VDrawerContent.displayName = "VDrawerContent";

// ─────────────────────────────────────────
// Header
// ─────────────────────────────────────────

/** Layout block at the top of VDrawerContent for the title. */
const VDrawerHeader = forwardRef<HTMLDivElement, VDrawerHeaderProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const override = useComponentOverride("VDrawer");

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between",
        "p-[var(--v-spacing-xxl)]",
        "border-b border-[var(--v-border)]",
        "text-[length:var(--v-size-xl-font-size)] font-[var(--v-font-weight-semibold)]",
        override?.styles?.header,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
VDrawerHeader.displayName = "VDrawerHeader";

// ─────────────────────────────────────────
// Footer
// ─────────────────────────────────────────

/** Layout block at the bottom of VDrawerContent that holds the actions. */
const VDrawerFooter = forwardRef<HTMLDivElement, VDrawerFooterProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const override = useComponentOverride("VDrawer");

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-end gap-[var(--v-spacing-sm)]",
        "p-[var(--v-spacing-xxl)]",
        "border-t border-[var(--v-border)]",
        "mt-auto",
        override?.styles?.footer,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
VDrawerFooter.displayName = "VDrawerFooter";

// ─────────────────────────────────────────
// Close
// ─────────────────────────────────────────

/** Button that closes the enclosing VDrawer. */
const VDrawerClose = forwardRef<HTMLButtonElement, VDrawerCloseProps>((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  const { onOpenChange } = useDrawer();
  const override = useComponentOverride("VDrawer");

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) onOpenChange(false);
      }}
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
    >
      {children}
    </button>
  );
});
VDrawerClose.displayName = "VDrawerClose";

export { VDrawer, VDrawerTrigger, VDrawerContent, VDrawerHeader, VDrawerFooter, VDrawerClose };
