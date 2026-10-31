"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../../lib";
import type { VSnackbarProps, VSnackbarVariant } from "./v-snackbar.types";

/** Variant icon SVGs */
function SnackbarIcon({ variant }: { variant: VSnackbarVariant }) {
  if (variant === "default") return null;

  const iconProps = {
    width: 20,
    height: 20,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2,
  };

  switch (variant) {
    case "success":
      return (
        <svg {...iconProps} className="text-[var(--v-success)]" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "error":
      return (
        <svg {...iconProps} className="text-[var(--v-destructive)]" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "warning":
      return (
        <svg {...iconProps} className="text-[var(--v-warning)]" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      );
    case "info":
      return (
        <svg {...iconProps} className="text-[var(--v-info)]" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    default:
      return null;
  }
}

const variantBgStyles: Record<VSnackbarVariant, string> = {
  default: "bg-[var(--v-foreground)] text-[var(--v-background)]",
  success: "bg-[var(--v-success)] text-[var(--v-success-foreground)]",
  error: "bg-[var(--v-destructive)] text-[var(--v-destructive-foreground)]",
  warning: "bg-[var(--v-warning)] text-[var(--v-warning-foreground)]",
  info: "bg-[var(--v-info)] text-[var(--v-info-foreground)]",
};

/** Swipe dismiss threshold in pixels */
const SWIPE_THRESHOLD = 80;

/**
 * Brief message bar at the screen bottom with an optional action.
 *
 * It times out or swipes away.
 *
 * @example
 * <VSnackbar visible={show} variant="success" content="Saved!" onClose={() => setShow(false)} />
 */
const VSnackbar = forwardRef<HTMLDivElement, VSnackbarProps>((props, ref) => {
  const {
    // 1. Identity
    variant = "default",
    // 3. Content
    content,
    // 4. Decorations
    action,
    // 7. Layout
    behavior = "fixed",
    width,
    duration = 5000,
    dismissDirection = "right",
    // 8. State
    visible = true,
    // 9. Callbacks
    onClose,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    // 10. Advanced
    className,
    style,
    ...rest
  } = props;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dismissing, setDismissing] = useState(false);

  // Swipe dismiss state
  const [swipeX, setSwipeX] = useState(0);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);

  // The latest `onClose` is read when a timer fires, so an inline callback never restarts the timers
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // `onClose` fires once per showing, whichever of the timer or the swipe gets there first
  const closedRef = useRef(false);
  const close = useCallback(() => {
    if (closedRef.current) return;
    closedRef.current = true;
    onCloseRef.current?.();
  }, []);

  const handleSwipeDismiss = useCallback(() => {
    if (closedRef.current) return;
    // The swipe takes over from the auto-dismiss timer
    if (timerRef.current) clearTimeout(timerRef.current);
    setDismissing(true);
    swipeTimerRef.current = setTimeout(() => {
      setDismissing(false);
      setSwipeX(0);
      close();
    }, 200);
  }, [close]);

  useEffect(() => {
    if (!visible) return;
    closedRef.current = false;
    if (duration === 0) return;
    timerRef.current = setTimeout(close, duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, duration, close]);

  // No callback after unmount
  useEffect(
    () => () => {
      if (swipeTimerRef.current) clearTimeout(swipeTimerRef.current);
    },
    [],
  );

  // Pointer/touch handlers for swipe dismiss
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerDown?.(e);
      if (dismissDirection === "none") return;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      isDraggingRef.current = false;
    },
    [dismissDirection, onPointerDown],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerMove?.(e);
      if (!dragStartRef.current || dismissDirection === "none") return;
      const dx = e.clientX - dragStartRef.current.x;
      // Only track horizontal movement
      if (Math.abs(dx) > 10) {
        isDraggingRef.current = true;
      }
      if (isDraggingRef.current) {
        // Right-only: allow positive dx; Left-only: allow negative dx
        if (dismissDirection === "right" && dx > 0) {
          setSwipeX(dx);
        } else if (dismissDirection === "left" && dx < 0) {
          setSwipeX(dx);
        }
      }
    },
    [dismissDirection, onPointerMove],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.type === "pointercancel") onPointerCancel?.(e);
      else onPointerUp?.(e);
      if (!isDraggingRef.current) {
        dragStartRef.current = null;
        return;
      }
      dragStartRef.current = null;
      isDraggingRef.current = false;
      if (Math.abs(swipeX) > SWIPE_THRESHOLD) {
        handleSwipeDismiss();
      } else {
        setSwipeX(0);
      }
    },
    [swipeX, handleSwipeDismiss, onPointerUp, onPointerCancel],
  );

  if (!visible) return null;

  const isFloating = behavior === "floating";

  return (
    <div
      ref={ref}
      role="alert"
      aria-live="polite"
      className={cn(
        "v-snackbar",
        "fixed bottom-0 left-0 right-0 z-[var(--v-z-toast)]",
        "flex",
        isFloating ? "justify-center pb-[var(--v-spacing-md)]" : "",
        !dismissing && "animate-[v-snackbar-enter_var(--v-duration-normal)_ease-out]",
        dismissing && "animate-[v-snackbar-exit_200ms_ease-in_forwards]",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-[var(--v-spacing-md)]",
          "px-[var(--v-spacing-lg)] py-[var(--v-spacing-lg)]",
          "min-h-[48px]",
          "shadow-[var(--v-shadow-md)]",
          variantBgStyles[variant],
          isFloating ? cn("rounded-[var(--v-radius-md)]", "mx-[var(--v-spacing-sm)]") : "w-full",
          dismissDirection !== "none" && "touch-pan-y",
          className,
        )}
        style={{
          ...style,
          ...(isFloating && width
            ? { width: typeof width === "number" ? `${width}px` : width }
            : {}),
          ...(swipeX !== 0
            ? {
                transform: `translateX(${swipeX}px)`,
                opacity: Math.max(0, 1 - Math.abs(swipeX) / (SWIPE_THRESHOLD * 2)),
              }
            : {}),
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        {...rest}
      >
        <SnackbarIcon variant={variant} />
        <span className="flex-1 text-[length:var(--v-size-md-font-size)]">{content}</span>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className={cn(
              "font-[var(--v-font-weight-semibold)] text-[length:var(--v-size-sm-font-size)]",
              "px-[var(--v-spacing-sm)] py-[var(--v-spacing-xs)]",
              "hover:opacity-80 cursor-pointer",
              "min-h-6 min-w-6",
            )}
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
});

VSnackbar.displayName = "VSnackbar";

export { VSnackbar };
