"use client";

import {
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn, createSafeContext } from "../../../lib";
import type { VAlign, VSide } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useControllable } from "../../../hooks/use-controllable";
import { useFocusTrap } from "../../../hooks/use-focus-trap";
import { useLocaleText } from "../../../hooks/use-locale";
import { composeHandlers, getAsChildElement, mergeRefs } from "./as-child";
import type {
  VPopoverCloseProps,
  VPopoverContentProps,
  VPopoverProps,
  VPopoverTriggerProps,
} from "./v-popover.types";

// ─────────────────────────────────────────
// Context
// ─────────────────────────────────────────

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  position: VSide;
  barrierDismissible: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
  /** Id of the content element, referenced by the trigger's `aria-controls`. */
  contentId: string;
  /** Id of the trigger element, referenced by the content's `aria-labelledby`. */
  triggerId: string;
  /** Lets the trigger report a custom `id` so the content label keeps pointing at it. */
  setTriggerId: (id: string) => void;
}

const [PopoverProvider, usePopoverContext] = createSafeContext<PopoverContextValue>("Popover");

// ─────────────────────────────────────────
// Placement styles
// ─────────────────────────────────────────

function getPositionClasses(position: VSide, align: VAlign): string {
  const alignClasses: Record<VSide, Record<VAlign, string>> = {
    top: { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" },
    bottom: { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" },
    left: { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" },
    right: { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" },
  };

  const sideClasses: Record<VSide, string> = {
    top: "bottom-full mb-[var(--v-popover-offset,8px)]",
    bottom: "top-full mt-[var(--v-popover-offset,8px)]",
    left: "right-full mr-[var(--v-popover-offset,8px)]",
    right: "left-full ml-[var(--v-popover-offset,8px)]",
  };

  return cn(sideClasses[position], alignClasses[position][align]);
}

// ─────────────────────────────────────────
// VPopover (root)
// ─────────────────────────────────────────

/**
 * Floating panel anchored to a trigger; closes on Escape or an outside press.
 *
 * Compose it from VPopoverTrigger, VPopoverContent and an optional VPopoverClose;
 * the open state is controlled with `open` or uncontrolled with `defaultOpen`.
 *
 * @example
 * <VPopover position="bottom">
 *   <VPopoverTrigger>
 *     <button>Open</button>
 *   </VPopoverTrigger>
 *   <VPopoverContent>
 *     <p>Popover content</p>
 *     <VPopoverClose>Close</VPopoverClose>
 *   </VPopoverContent>
 * </VPopover>
 */
function VPopover(props: VPopoverProps): ReactNode {
  const override = useComponentOverride("VPopover");
  const {
    // 3. Content
    children,
    // 5. Layout
    position = (override?.defaultProps?.position as VSide | undefined) ?? "bottom",
    // 6. State
    open: controlledOpen,
    defaultOpen = false,
    barrierDismissible = true,
    // 7. Callbacks
    onOpenChange,
  } = props;

  const [open, setOpenState] = useControllable<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const triggerRef = useRef<HTMLElement | null>(null);
  const baseId = useId();
  const contentId = `${baseId}-content`;
  const [triggerId, setTriggerId] = useState(`${baseId}-trigger`);

  const setOpen = useCallback(
    (next: boolean) => {
      setOpenState(next);
    },
    [setOpenState],
  );

  const contextValue = useMemo<PopoverContextValue>(
    () => ({
      open,
      setOpen,
      position,
      barrierDismissible,
      triggerRef,
      contentId,
      triggerId,
      setTriggerId,
    }),
    [open, setOpen, position, barrierDismissible, contentId, triggerId],
  );

  return (
    <PopoverProvider value={contextValue}>
      <div className="v-popover relative inline-flex">{children}</div>
    </PopoverProvider>
  );
}

VPopover.displayName = "VPopover";

// ─────────────────────────────────────────
// VPopoverTrigger
// ─────────────────────────────────────────

/**
 * Toggles the popover on click, Enter or Space; `asChild` renders no wrapper element.
 *
 * By default it renders a `span` with `role="button"`, which suits text, an icon or an avatar.
 * When the child is already a button or a link, set `asChild` so the child itself becomes the
 * trigger and no second button is nested around it.
 *
 * @example
 * <VPopoverTrigger>Open</VPopoverTrigger>
 *
 * @example
 * <VPopoverTrigger asChild>
 *   <VButton>Open</VButton>
 * </VPopoverTrigger>
 */
const VPopoverTrigger = forwardRef<HTMLElement, VPopoverTriggerProps>((props, ref) => {
  const {
    // 3. Content
    children,
    // 5. Layout
    asChild = false,
    // 7. Callbacks
    onClick,
    onKeyDown,
    // 8. Advanced
    id: idProp,
    className,
    ...rest
  } = props;
  const { open, setOpen, triggerRef, contentId, triggerId, setTriggerId } = usePopoverContext();

  const child = asChild ? getAsChildElement(children, "VPopoverTrigger") : null;
  const childProps = child?.props;

  // A custom id (on the trigger or on the child) wins; the content label follows it.
  const customId = idProp ?? childProps?.id;
  const id = customId ?? triggerId;
  useEffect(() => {
    if (customId) setTriggerId(customId);
  }, [customId, setTriggerId]);

  const childRef = childProps?.ref;
  const mergedRef = useMemo(
    () => mergeRefs<HTMLElement>(triggerRef, ref, childRef),
    [triggerRef, ref, childRef],
  );

  if (child && childProps) {
    // The child is the trigger: a button or a link activates itself on Enter or Space through
    // its click, so only `onClick` is wired and no role or tabIndex is added.
    return cloneElement(child, {
      "aria-expanded": open,
      "aria-haspopup": "dialog",
      "aria-controls": open ? contentId : undefined,
      ...rest,
      id,
      className: cn("v-popover-trigger", childProps.className, className),
      ref: mergedRef,
      onClick: composeHandlers(
        childProps.onClick as ((e: React.MouseEvent<HTMLElement>) => void) | undefined,
        onClick as ((e: React.MouseEvent<HTMLElement>) => void) | undefined,
        () => setOpen(!open),
      ),
      onKeyDown: composeHandlers(
        childProps.onKeyDown as ((e: React.KeyboardEvent<HTMLElement>) => void) | undefined,
        onKeyDown as ((e: React.KeyboardEvent<HTMLElement>) => void) | undefined,
      ),
    });
  }

  const classes = cn("v-popover-trigger", "inline-flex", className);

  return (
    <span
      ref={mergedRef}
      id={id}
      className={classes}
      aria-expanded={open}
      aria-haspopup="dialog"
      aria-controls={open ? contentId : undefined}
      role="button"
      tabIndex={0}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        setOpen(!open);
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(!open);
        }
      }}
    >
      {children}
    </span>
  );
});

VPopoverTrigger.displayName = "VPopoverTrigger";

// ─────────────────────────────────────────
// VPopoverContent
// ─────────────────────────────────────────

/**
 * Floating panel (`role="dialog"`) shown while the popover is open, with focus trapped inside.
 *
 * @example
 * <VPopoverContent align="start" sideOffset={12}>Details</VPopoverContent>
 */
const VPopoverContent = forwardRef<HTMLDivElement, VPopoverContentProps>((props, ref) => {
  const {
    // 3. Content
    children,
    // 5. Layout
    align = "center",
    sideOffset,
    // 8. Advanced
    className,
    ...rest
  } = props;
  const { open, setOpen, position, barrierDismissible, triggerRef, contentId, triggerId } =
    usePopoverContext();
  const override = useComponentOverride("VPopover");
  const contentRef = useRef<HTMLDivElement>(null);

  // Focus trap: cycle focus inside the popover while it is open
  useFocusTrap(contentRef, open);

  // Click outside to close
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (barrierDismissible && contentRef.current && !contentRef.current.contains(target)) {
        // Check if click is on trigger (trigger handles its own toggle)
        if (triggerRef.current?.contains(target)) return;
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, setOpen, barrierDismissible, triggerRef]);

  if (!open) return null;

  const positionClasses = getPositionClasses(position, align);

  const classes = cn(
    "v-popover-content",
    "absolute",
    "z-[var(--v-z-popover,50)]",
    "min-w-[8rem]",
    "bg-[var(--v-popover)]",
    "text-[var(--v-popover-foreground)]",
    "rounded-[var(--v-radius-md)]",
    "border",
    "border-[var(--v-border)]",
    "shadow-[var(--v-shadow-lg)]",
    "p-[var(--v-spacing-lg)]",
    positionClasses,
    // Entrance animation
    "animate-in",
    "fade-in-0",
    "zoom-in-95",
    override?.styles?.content,
    className,
  );

  const style =
    sideOffset !== undefined
      ? ({ "--v-popover-offset": `${sideOffset}px` } as React.CSSProperties)
      : undefined;

  return (
    <div
      ref={(node) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={classes}
      style={style}
      id={contentId}
      role="dialog"
      aria-labelledby={rest["aria-label"] ? undefined : triggerId}
      data-v-state="open"
      data-v-position={position}
      {...rest}
    >
      {children}
    </div>
  );
});

VPopoverContent.displayName = "VPopoverContent";

// ─────────────────────────────────────────
// VPopoverClose
// ─────────────────────────────────────────

/**
 * Button that closes the popover; labelled by the locale text unless you pass `aria-label`.
 *
 * With `asChild` the child (a VButton, say) becomes the close control instead of being nested in
 * a second button; it then keeps its own accessible name.
 *
 * @example
 * <VPopoverClose>Done</VPopoverClose>
 *
 * @example
 * <VPopoverClose asChild>
 *   <VButton size="sm">Done</VButton>
 * </VPopoverClose>
 */
const VPopoverClose = forwardRef<HTMLButtonElement, VPopoverCloseProps>((props, ref) => {
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
  const { setOpen } = usePopoverContext();
  const localeText = useLocaleText();

  const child = asChild ? getAsChildElement(children, "VPopoverClose") : null;
  const childProps = child?.props;
  const childRef = childProps?.ref;
  const mergedRef = useMemo(() => mergeRefs<HTMLElement>(ref, childRef), [ref, childRef]);

  if (child && childProps) {
    return cloneElement(child, {
      ...rest,
      className: cn("v-popover-close", childProps.className, className),
      ref: mergedRef,
      onClick: composeHandlers(
        childProps.onClick as ((e: React.MouseEvent<HTMLElement>) => void) | undefined,
        onClick as ((e: React.MouseEvent<HTMLElement>) => void) | undefined,
        () => setOpen(false),
      ),
    });
  }

  const classes = cn("v-popover-close", className);

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      aria-label={localeText.popoverClose}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
    >
      {children}
    </button>
  );
});

VPopoverClose.displayName = "VPopoverClose";

export { VPopover, VPopoverTrigger, VPopoverContent, VPopoverClose };
