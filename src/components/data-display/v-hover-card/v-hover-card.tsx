"use client";

import {
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { composeHandlers, getAsChildElement } from "../../surfaces/v-popover/as-child";
import type { VHoverCardPosition, VHoverCardProps } from "./v-hover-card.types";

/** CSS positioning classes per placement. Uses absolute positioning relative to the trigger wrapper. */
const positionStyles: Record<VHoverCardPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  topStart: "bottom-full left-0 mb-2",
  topEnd: "bottom-full right-0 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  bottomStart: "top-full left-0 mt-2",
  bottomEnd: "top-full right-0 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  leftStart: "right-full top-0 mr-2",
  leftEnd: "right-full bottom-0 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
  rightStart: "left-full top-0 ml-2",
  rightEnd: "left-full bottom-0 ml-2",
};

/** Scale transform-origin per placement (animates from the opposite edge). */
const originStyles: Record<VHoverCardPosition, string> = {
  top: "origin-bottom",
  topStart: "origin-bottom-left",
  topEnd: "origin-bottom-right",
  bottom: "origin-top",
  bottomStart: "origin-top-left",
  bottomEnd: "origin-top-right",
  left: "origin-right",
  leftStart: "origin-top-right",
  leftEnd: "origin-bottom-right",
  right: "origin-left",
  rightStart: "origin-top-left",
  rightEnd: "origin-bottom-left",
};

/**
 * Rich preview card that opens on hover and closes when the pointer leaves.
 *
 * Hover opens it and a click on the hovered trigger keeps it open; touch and Enter/Space toggle
 * it, Escape or an outside press closes it. By default the trigger is a `div` with
 * `role="button"`; set `asChild` when the child is already a button or a link.
 *
 * @example
 * <VHoverCard content={<p>John Doe</p>}>
 *   <span>{'@johndoe'}</span>
 * </VHoverCard>
 *
 * @example
 * <VHoverCard asChild content={<p>John Doe</p>}>
 *   <VLink href="/johndoe">@johndoe</VLink>
 * </VHoverCard>
 */
const VHoverCard = forwardRef<HTMLDivElement, VHoverCardProps>((props, ref) => {
  const override = useComponentOverride("VHoverCard");
  const {
    children,
    content,
    position = (override?.defaultProps?.position as VHoverCardPosition | undefined) ?? "bottom",
    asChild = false,
    disabled = false,
    openDelay = 700,
    closeDelay = 300,
    semanticLabel,
    onPointerEnter,
    onPointerLeave,
    className,
    ...rest
  } = props;

  const baseId = useId();
  const asChildElement = asChild ? getAsChildElement(children, "VHoverCard") : null;
  // A child's own id wins, so the card label keeps pointing at it.
  const triggerId = asChildElement?.props.id ?? `${baseId}-trigger`;
  const contentId = `${baseId}-content`;

  const [isOpen, setIsOpen] = useState(false);
  /** Tracks whether the close animation is running (used to keep the DOM node mounted). */
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const isHoveringTrigger = useRef(false);
  const isHoveringContent = useRef(false);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Unmounts the card once the exit animation has finished. */
  const unmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Whether the last pointer interaction was from a touch device. */
  const isTouchDevice = useRef(false);

  // ── Helpers ──

  const clearTimers = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (unmountTimerRef.current) {
      clearTimeout(unmountTimerRef.current);
      unmountTimerRef.current = null;
    }
  }, []);

  /** Cancels a pending or running close, so a re-entered card stays fully visible. */
  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (unmountTimerRef.current) {
      clearTimeout(unmountTimerRef.current);
      unmountTimerRef.current = null;
    }
    setIsAnimatingOut(false);
  }, []);

  const show = useCallback(() => {
    if (isOpen) return;
    clearTimers();
    setIsAnimatingOut(false);
    setIsOpen(true);
  }, [isOpen, clearTimers]);

  const hide = useCallback(() => {
    if (!isOpen) return;
    clearTimers();
    // Trigger CSS exit animation, then unmount after duration
    setIsAnimatingOut(true);
    unmountTimerRef.current = setTimeout(() => {
      unmountTimerRef.current = null;
      setIsOpen(false);
      setIsAnimatingOut(false);
    }, 150); // matches --v-duration-fast (CSS transition duration)
  }, [isOpen, clearTimers]);

  const scheduleOpen = useCallback(() => {
    clearTimers();
    openTimerRef.current = setTimeout(show, openDelay);
  }, [openDelay, show, clearTimers]);

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimerRef.current = setTimeout(hide, closeDelay);
  }, [closeDelay, hide, clearTimers]);

  // ── Pointer handlers (hover) ──

  const handleTriggerEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerEnter?.(e);
      if (disabled) return;
      // Touch / stylus: ignore hover, rely on click/tap instead
      if (e.pointerType === "touch" || e.pointerType === "pen") {
        isTouchDevice.current = true;
        return;
      }
      isTouchDevice.current = false;
      isHoveringTrigger.current = true;
      if (!isOpen) scheduleOpen();
      else cancelClose(); // Cancel any pending or running close
    },
    [disabled, isOpen, scheduleOpen, cancelClose, onPointerEnter],
  );

  const handleTriggerLeave = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerLeave?.(e);
      isHoveringTrigger.current = false;
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
        openTimerRef.current = null;
      }
      if (isOpen && !isHoveringContent.current) {
        scheduleClose();
      }
    },
    [isOpen, scheduleClose, onPointerLeave],
  );

  const handleContentEnter = useCallback(() => {
    isHoveringContent.current = true;
    cancelClose();
  }, [cancelClose]);

  const handleContentLeave = useCallback(() => {
    isHoveringContent.current = false;
    if (isOpen && !isHoveringTrigger.current) {
      scheduleClose();
    }
  }, [isOpen, scheduleClose]);

  // ── Click / tap handler (touch + fallback) ──

  const handleTriggerClick = useCallback(() => {
    if (disabled) return;
    if (isOpen) {
      // A mouse click on a card that hover just opened must not close it (touch has no hover).
      if (isHoveringTrigger.current) return;
      hide();
    } else {
      clearTimers();
      show();
    }
  }, [disabled, isOpen, show, hide, clearTimers]);

  // ── Keyboard ──

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Keys that bubble up from a child control (link, input) belong to that control.
      if (disabled || e.target !== e.currentTarget) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (isOpen) hide();
        else show();
      }
    },
    [disabled, isOpen, show, hide],
  );

  // Escape to dismiss
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, hide]);

  // Click outside to dismiss
  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        hide();
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [isOpen, hide]);

  // Cleanup timers on unmount
  useEffect(() => clearTimers, [clearTimers]);

  // ── Merge refs ──
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  const visible = isOpen || isAnimatingOut;

  let trigger: ReactNode;
  if (asChildElement) {
    // The child is the trigger: a button or a link activates itself through its click, so only
    // `onClick` is wired, and no role or tabIndex is added (the child keeps its own ref).
    trigger = cloneElement(asChildElement, {
      id: triggerId,
      "aria-expanded": isOpen && !isAnimatingOut,
      "aria-haspopup": "dialog",
      "aria-controls": visible ? contentId : undefined,
      onClick: composeHandlers(
        asChildElement.props.onClick as ((e: React.MouseEvent<HTMLElement>) => void) | undefined,
        handleTriggerClick,
      ),
    });
  } else {
    trigger = (
      <div
        id={triggerId}
        role="button"
        tabIndex={disabled ? undefined : 0}
        aria-expanded={isOpen && !isAnimatingOut}
        aria-haspopup="dialog"
        aria-controls={visible ? contentId : undefined}
        onClick={handleTriggerClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={setRefs}
      {...rest}
      className={cn("v-hover-card", "relative inline-block", override?.styles?.root, className)}
      onPointerEnter={handleTriggerEnter}
      onPointerLeave={handleTriggerLeave}
    >
      {/* Trigger */}
      {trigger}

      {/* Content popup */}
      {visible && (
        <div
          id={contentId}
          role="dialog"
          aria-label={semanticLabel}
          aria-labelledby={semanticLabel ? undefined : triggerId}
          onPointerEnter={handleContentEnter}
          onPointerLeave={handleContentLeave}
          className={cn(
            "absolute z-[var(--v-z-popover)]",
            "max-w-[320px]",
            "p-[var(--v-spacing-lg)]",
            "rounded-[var(--v-radius-md)]",
            "border border-[var(--v-border)]",
            "bg-[var(--v-popover)] text-[var(--v-popover-foreground)]",
            "shadow-[var(--v-shadow-lg)]",
            "text-sm",
            "transition-all duration-[var(--v-duration-fast)] ease-out",
            isAnimatingOut ? "opacity-0 scale-[0.96]" : "opacity-100 scale-100",
            originStyles[position],
            positionStyles[position],
            override?.styles?.content,
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
});

VHoverCard.displayName = "VHoverCard";

export { VHoverCard };
