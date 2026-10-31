"use client";

import {
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type MutableRefObject,
  type MouseEvent as ReactMouseEvent,
  type Ref,
} from "react";
import { cn, createSafeContext } from "../../../lib";
import { useControllable } from "../../../hooks/use-controllable";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useEscapeDismiss } from "../../feedback/overlay-stack";
import { composeHandlers, getAsChildElement, mergeRefs } from "../../surfaces/v-popover/as-child";
import type {
  VMenuContentProps,
  VMenuGroupProps,
  VMenuItemProps,
  VMenuLabelProps,
  VMenuProps,
  VMenuSeparatorProps,
  VMenuTriggerProps,
} from "./v-menu.types";

// ─────────────────────────────────────────
// Context
// ─────────────────────────────────────────

interface MenuContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  closeOnSelect: boolean;
  /** The element that holds the trigger and the content; presses inside it are not "outside". */
  rootRef: MutableRefObject<HTMLDivElement | null>;
  /** The trigger button, which takes focus back when the menu closes from the keyboard. */
  triggerRef: MutableRefObject<HTMLElement | null>;
}

const [MenuProvider, useMenu] = createSafeContext<MenuContextValue>("VMenu");

/**
 * Moves focus to the trigger when it is on the menu or lost, so closing never drops it on `body`.
 * Focus that already went somewhere else (for example an item handler focused an input) stays.
 */
function restoreTriggerFocus(ctx: Pick<MenuContextValue, "rootRef" | "triggerRef">) {
  const active = document.activeElement;
  const inMenu = !!active && !!ctx.rootRef.current?.contains(active);
  if (!active || active === document.body || inMenu) ctx.triggerRef.current?.focus();
}

/** Sets a forwarded ref (function or object) next to an internal one. */
function assignRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === "function") ref(node);
  else if (ref) (ref as MutableRefObject<T | null>).current = node;
}

// ─────────────────────────────────────────
// Root
// ─────────────────────────────────────────

/**
 * Dropdown menu opened by a trigger, with arrow-key navigation.
 *
 * @example
 * <VMenu>
 *   <VMenuTrigger>Options</VMenuTrigger>
 *   <VMenuContent>
 *     <VMenuItem onClick={edit}>Edit</VMenuItem>
 *     <VMenuSeparator />
 *     <VMenuItem onClick={remove}>Delete</VMenuItem>
 *   </VMenuContent>
 * </VMenu>
 */
function VMenu({
  // 3. Content
  children,
  // 5. Layout
  closeOnSelect = true,
  // 6. State
  open,
  defaultOpen = false,
  // 7. Callbacks
  onOpenChange,
}: VMenuProps) {
  const [isOpen, setIsOpen] = useControllable({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  return (
    <MenuProvider
      value={{ open: isOpen, onOpenChange: setIsOpen, closeOnSelect, rootRef, triggerRef }}
    >
      <div ref={rootRef} className="v-menu relative inline-block">
        {children}
      </div>
    </MenuProvider>
  );
}

VMenu.displayName = "VMenu";

// ─────────────────────────────────────────
// Trigger
// ─────────────────────────────────────────

/**
 * Button that toggles the enclosing VMenu; `asChild` makes your own button the trigger.
 *
 * Set `asChild` when the trigger is already a VButton or another control, so no second button is
 * nested around it; the child then gets the click handler, `aria-expanded` and `aria-haspopup`.
 *
 * @example
 * <VMenuTrigger asChild>
 *   <VButton>Options</VButton>
 * </VMenuTrigger>
 */
const VMenuTrigger = forwardRef<HTMLButtonElement, VMenuTriggerProps>((props, ref) => {
  const {
    // 3. Content
    children,
    // 5. Layout
    asChild = false,
    // 7. Callbacks
    onClick,
    // 8. Advanced
    className,
    ...rest
  } = props;
  const { open, onOpenChange, triggerRef } = useMenu();

  const child = asChild ? getAsChildElement(children, "VMenuTrigger") : null;
  const childProps = child?.props;
  const childRef = childProps?.ref;
  const mergedRef = useMemo(
    () => mergeRefs<HTMLElement>(triggerRef, ref, childRef),
    [triggerRef, ref, childRef],
  );

  if (child && childProps) {
    return cloneElement(child, {
      "aria-expanded": open,
      "aria-haspopup": "menu",
      ...rest,
      className: cn(childProps.className, className),
      ref: mergedRef,
      onClick: composeHandlers(
        childProps.onClick as ((e: ReactMouseEvent<HTMLElement>) => void) | undefined,
        onClick as ((e: ReactMouseEvent<HTMLElement>) => void) | undefined,
        () => onOpenChange(!open),
      ),
    });
  }

  return (
    <button
      ref={(node) => {
        triggerRef.current = node;
        assignRef(ref, node);
      }}
      type="button"
      aria-expanded={open}
      aria-haspopup="menu"
      className={className}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        onOpenChange(!open);
      }}
    >
      {children}
    </button>
  );
});
VMenuTrigger.displayName = "VMenuTrigger";

// ─────────────────────────────────────────
// Content
// ─────────────────────────────────────────

/** Floating menu panel with arrow-key navigation between its items. */
const VMenuContent = forwardRef<HTMLDivElement, VMenuContentProps>((props, ref) => {
  const {
    // 3. Content
    children,
    // 5. Layout
    align = "start",
    // 8. Advanced
    className,
    ...rest
  } = props;
  const { open, onOpenChange, rootRef, triggerRef } = useMenu();
  const override = useComponentOverride("VMenu");
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Escape closes only the topmost overlay (a menu inside a dialog leaves the dialog open)
  // and hands focus back to the trigger, because the focused item unmounts
  useEscapeDismiss(open, () => {
    onOpenChange(false);
    restoreTriggerFocus({ rootRef, triggerRef });
  });

  // Arrow key navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Tab leaves the menu: close it and let the default Tab move on from the trigger
      if (e.key === "Tab") {
        onOpenChange(false);
        restoreTriggerFocus({ rootRef, triggerRef });
        return;
      }

      // WCAG 2.1.1: Arrow Up/Down keyboard navigation
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const el = contentRef.current;
        if (!el) return;
        const items = Array.from(
          el.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])'),
        );
        if (items.length === 0) return;

        const currentIndex = items.indexOf(document.activeElement as HTMLElement);
        let nextIndex: number;
        if (e.key === "ArrowDown") {
          nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        }
        items[nextIndex]?.focus();
      }

      if (e.key === "Home") {
        e.preventDefault();
        const el = contentRef.current;
        if (!el) return;
        const items = el.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([aria-disabled="true"])',
        );
        items[0]?.focus();
      }

      if (e.key === "End") {
        e.preventDefault();
        const el = contentRef.current;
        if (!el) return;
        const items = el.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([aria-disabled="true"])',
        );
        items[items.length - 1]?.focus();
      }
    },
    [onOpenChange, rootRef, triggerRef],
  );

  // Focus first item when menu opens
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      const el = contentRef.current;
      if (!el) return;
      const firstItem = el.querySelector<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])',
      );
      firstItem?.focus();
    });
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const root = rootRef.current;
      if (root && !root.contains(e.target as Node)) {
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, handleKeyDown, onOpenChange, rootRef]);

  if (!open) return null;

  const alignStyles = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  return (
    <div
      ref={(node) => {
        contentRef.current = node;
        assignRef(ref, node);
      }}
      role="menu"
      className={cn(
        "absolute z-[var(--v-z-dropdown)] mt-1",
        "min-w-[180px]",
        "bg-[var(--v-popover)] text-[var(--v-popover-foreground)]",
        "rounded-[var(--v-radius-md)]",
        "border border-[var(--v-border)]",
        "shadow-[var(--v-shadow-lg)]",
        "p-1",
        alignStyles[align],
        override?.styles?.root,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
VMenuContent.displayName = "VMenuContent";

// ─────────────────────────────────────────
// Item
// ─────────────────────────────────────────

/** Menu entry with the menuitem role; can be disabled. */
const VMenuItem = forwardRef<HTMLDivElement, VMenuItemProps>((props, ref) => {
  const {
    // 1. Identity
    destructive = false,
    // 3. Content
    children,
    // 4. Decorations
    leading,
    trailing,
    // 6. State
    disabled = false,
    // 7. Callbacks
    onClick,
    onKeyDown,
    // 8. Advanced
    className,
    ...rest
  } = props;
  const { onOpenChange, closeOnSelect, rootRef, triggerRef } = useMenu();
  const override = useComponentOverride("VMenu");

  const handleClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onClick?.(e);
    if (closeOnSelect) {
      onOpenChange(false);
      // The focused item unmounts with the menu; keep focus on the trigger
      restoreTriggerFocus({ rootRef, triggerRef });
    }
  };

  return (
    <div
      ref={ref}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.currentTarget.click();
        }
      }}
      className={cn(
        "flex items-center gap-[var(--v-spacing-sm)]",
        "px-[var(--v-spacing-sm)] py-[var(--v-spacing-xs)]",
        "text-[length:var(--v-size-md-font-size)] rounded-[var(--v-radius-sm)]",
        "cursor-pointer select-none",
        "transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)] focus-visible:ring-inset",
        destructive && "text-[var(--v-destructive)]",
        disabled
          ? "opacity-50 pointer-events-none"
          : destructive
            ? "hover:bg-[var(--v-destructive)]/10 focus:bg-[var(--v-destructive)]/10"
            : "hover:bg-[var(--v-accent)] hover:text-[var(--v-accent-foreground)] focus:bg-[var(--v-accent)]",
        override?.styles?.item,
        className,
      )}
      {...rest}
    >
      {leading && <span className="shrink-0">{leading}</span>}
      <span className="flex-1">{children}</span>
      {trailing && (
        <span className="shrink-0 ml-auto text-[var(--v-muted-foreground)]">{trailing}</span>
      )}
    </div>
  );
});
VMenuItem.displayName = "VMenuItem";

// ─────────────────────────────────────────
// Separator
// ─────────────────────────────────────────

/** Horizontal line that separates groups of menu items. */
const VMenuSeparator = forwardRef<HTMLDivElement, VMenuSeparatorProps>((props, ref) => {
  const {
    // 8. Advanced
    className,
    ...rest
  } = props;
  const override = useComponentOverride("VMenu");

  return (
    <div
      ref={ref}
      role="separator"
      className={cn("-mx-1 my-1 h-px bg-[var(--v-border)]", override?.styles?.separator, className)}
      {...rest}
    />
  );
});
VMenuSeparator.displayName = "VMenuSeparator";

// ─────────────────────────────────────────
// Group
// ─────────────────────────────────────────

/** Wrapper that groups related menu items for assistive technology. */
const VMenuGroup = forwardRef<HTMLDivElement, VMenuGroupProps>((props, ref) => {
  const {
    // 3. Content
    children,
    // 8. Advanced
    className,
    ...rest
  } = props;
  const override = useComponentOverride("VMenu");

  return (
    <div ref={ref} role="group" className={cn(override?.styles?.group, className)} {...rest}>
      {children}
    </div>
  );
});
VMenuGroup.displayName = "VMenuGroup";

// ─────────────────────────────────────────
// Label
// ─────────────────────────────────────────

/** Non-interactive caption for a group of menu items. */
const VMenuLabel = forwardRef<HTMLDivElement, VMenuLabelProps>((props, ref) => {
  const {
    // 3. Content
    children,
    // 8. Advanced
    className,
    ...rest
  } = props;
  const override = useComponentOverride("VMenu");

  return (
    <div
      ref={ref}
      className={cn(
        "px-[var(--v-spacing-sm)] py-[var(--v-spacing-xs)]",
        "text-xs font-[var(--v-font-weight-semibold)] text-[var(--v-muted-foreground)]",
        override?.styles?.label,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
VMenuLabel.displayName = "VMenuLabel";

export { VMenu, VMenuTrigger, VMenuContent, VMenuItem, VMenuSeparator, VMenuGroup, VMenuLabel };
