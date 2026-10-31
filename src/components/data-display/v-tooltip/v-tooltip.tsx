"use client";

import {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { cn } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import type { VSide } from "../../../lib";
import type { VTooltipProps } from "./v-tooltip.types";

const positionStyles: Record<VSide, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

/**
 * Text bubble shown after a delay on hover or focus; Escape closes it.
 *
 * @example
 * <VTooltip message="Save changes" position="bottom">
 *   <VButton>Save</VButton>
 * </VTooltip>
 */
const VTooltip = forwardRef<HTMLDivElement, VTooltipProps>((props, ref) => {
  const override = useComponentOverride("VTooltip");
  const {
    children,
    message,
    position = (override?.defaultProps?.position as VSide | undefined) ?? "top",
    maxWidth = 280,
    waitDuration = 500,
    showDuration = 1500,
    className,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  } = props;

  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveringTooltip = useRef(false);
  const autoHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current);
      autoHideTimerRef.current = null;
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  // Cleanup timers on unmount
  useEffect(() => clearTimers, [clearTimers]);

  const show = useCallback(() => {
    // Hover and focus both call show(); only the latest request may stay scheduled
    clearTimers();
    timerRef.current = setTimeout(() => {
      setVisible(true);
      // showDuration: Auto-hide after display
      if (showDuration > 0) {
        autoHideTimerRef.current = setTimeout(() => {
          setVisible(false);
          isHoveringTooltip.current = false;
        }, showDuration);
      }
    }, waitDuration);
  }, [waitDuration, showDuration, clearTimers]);

  const hide = useCallback(() => {
    clearTimers();
    // WCAG 1.4.13: Keep tooltip visible while user hovers over it
    hideTimerRef.current = setTimeout(() => {
      hideTimerRef.current = null;
      if (!isHoveringTooltip.current) {
        setVisible(false);
      }
    }, 100);
  }, [clearTimers]);

  // WCAG 1.4.13: Dismiss tooltip with Escape key
  useEffect(() => {
    if (!visible) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVisible(false);
        isHoveringTooltip.current = false;
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [visible]);

  // Point the trigger at the bubble so screen readers announce the message
  let trigger = children;
  if (visible && isValidElement(children)) {
    const existing = (children.props as { "aria-describedby"?: string })["aria-describedby"];
    trigger = cloneElement(children as ReactElement<{ "aria-describedby"?: string }>, {
      "aria-describedby": [existing, tooltipId].filter(Boolean).join(" "),
    });
  }

  return (
    <div
      ref={ref}
      className={cn("v-tooltip", "relative inline-flex", override?.styles?.root)}
      {...rest}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        show();
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        hide();
      }}
      onFocus={(e) => {
        onFocus?.(e);
        show();
      }}
      onBlur={(e) => {
        onBlur?.(e);
        hide();
      }}
    >
      {trigger}
      {visible && (
        <div
          id={tooltipId}
          role="tooltip"
          onMouseEnter={() => {
            isHoveringTooltip.current = true;
          }}
          onMouseLeave={() => {
            isHoveringTooltip.current = false;
            setVisible(false);
          }}
          className={cn(
            "absolute z-[var(--v-z-tooltip)]",
            "px-[var(--v-spacing-md)] py-[var(--v-spacing-sm)] rounded-[var(--v-radius-sm)]",
            "bg-[var(--v-foreground)] text-[var(--v-background)]",
            "text-xs leading-tight",
            maxWidth ? "whitespace-normal" : "whitespace-nowrap",
            "shadow-[var(--v-shadow-lg)]",
            "animate-in fade-in-0 zoom-in-95",
            "pointer-events-auto",
            positionStyles[position],
            override?.styles?.tooltip,
            className,
          )}
          style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}
        >
          {message}
        </div>
      )}
    </div>
  );
});

VTooltip.displayName = "VTooltip";

export { VTooltip };
