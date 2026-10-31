"use client";

import { forwardRef, useCallback } from "react";
import { cn } from "../../../lib";
import { useControllable } from "../../../hooks/use-controllable";
import { useLocaleText } from "../../../hooks/use-locale";
import type { VPageIndicatorProps, VPageIndicatorSeparator } from "./v-page-indicator.types";

const separatorText: Record<VPageIndicatorSeparator, string> = {
  slash: " / ",
  of: " of ",
  dash: " - ",
  pipe: " | ",
};

/**
 * Page position as dots, a number or a progress line.
 *
 * @example
 * <VPageIndicator total={5} value={page} onValueChange={setPage} />
 */
const VPageIndicator = forwardRef<HTMLDivElement, VPageIndicatorProps>((props, ref) => {
  const {
    // 1. Identity
    variant = "dots",
    // 2. Visual
    size = "md",
    // 3. Content
    children,
    total,
    value,
    defaultValue = 0,
    // 5. Layout
    expandActive = true,
    separator = "slash",
    // 7. Callbacks
    onValueChange,
    // 8. Advanced
    className,
    ...rest
  } = props;

  const localeText = useLocaleText();
  const [current, setCurrent] = useControllable({ value, defaultValue, onChange: onValueChange });
  const onSelect = onValueChange ? setCurrent : undefined;

  const dotSize = size === "sm" ? 6 : size === "lg" ? 10 : 8;
  const lineHeight = size === "sm" ? 2 : size === "lg" ? 4 : 3;

  const handleClick = useCallback(
    (index: number) => {
      onSelect?.(index);
    },
    [onSelect],
  );

  const renderDots = () => (
    <div className="flex items-center justify-center gap-[var(--v-spacing-xs)]">
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === current;
        return (
          <button
            key={i}
            type="button"
            aria-label={localeText.pageIndicatorPage(i + 1)}
            className={cn(
              "rounded-full transition-all",
              `duration-[var(--v-duration-fast)]`,
              "min-w-6 min-h-6 flex items-center justify-center",
              onSelect && "cursor-pointer",
              !onSelect && "cursor-default",
            )}
            onClick={() => handleClick(i)}
            tabIndex={onSelect ? 0 : -1}
          >
            <span
              className={cn(
                "block rounded-full transition-all",
                `duration-[var(--v-duration-fast)]`,
                isActive ? "bg-[var(--v-primary)]" : "bg-[var(--v-muted-foreground)]/30",
              )}
              style={{
                width: isActive && expandActive ? dotSize * 1.5 : dotSize,
                height: dotSize,
              }}
            />
          </button>
        );
      })}
    </div>
  );

  const renderNumber = () => {
    const numberContent = (
      <>
        <span className="font-semibold text-[var(--v-foreground)]">{current + 1}</span>
        <span className="text-[var(--v-muted-foreground)]">{separatorText[separator]}</span>
        <span className="text-[var(--v-muted-foreground)]">{total}</span>
      </>
    );

    // Prev/next chevron buttons appear when onValueChange is provided
    if (onSelect) {
      return (
        <div className="flex items-center gap-[var(--v-spacing-xs)]">
          <button
            type="button"
            aria-label={localeText.paginationPrevious}
            onClick={() => current > 0 && handleClick(current - 1)}
            className={cn(
              "p-[var(--v-spacing-sm)] cursor-pointer",
              current <= 0 && "opacity-30 pointer-events-none",
            )}
            tabIndex={0}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M11 4.5L6.5 9L11 13.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {numberContent}
          <button
            type="button"
            aria-label={localeText.paginationNext}
            onClick={() => current < total - 1 && handleClick(current + 1)}
            className={cn(
              "p-[var(--v-spacing-sm)] cursor-pointer",
              current >= total - 1 && "opacity-30 pointer-events-none",
            )}
            tabIndex={0}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M7 4.5L11.5 9L7 13.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      );
    }

    return <div className="flex items-center gap-[var(--v-spacing-xs)]">{numberContent}</div>;
  };

  const renderLine = () => (
    <div className="flex items-center gap-1 w-full">
      {Array.from({ length: total }, (_, i) => {
        const isActive = i <= current;
        return (
          <button
            key={i}
            type="button"
            aria-label={localeText.pageIndicatorPage(i + 1)}
            className={cn("flex-1", onSelect && "cursor-pointer", !onSelect && "cursor-default")}
            onClick={() => handleClick(i)}
            tabIndex={onSelect ? 0 : -1}
          >
            <span
              className={cn(
                "block w-full rounded-full transition-all",
                `duration-[var(--v-duration-fast)]`,
                isActive ? "bg-[var(--v-primary)]" : "bg-[var(--v-muted-foreground)]/30",
              )}
              style={{ height: lineHeight }}
            />
          </button>
        );
      })}
    </div>
  );

  return (
    <div
      ref={ref}
      className={cn("v-page-indicator", className)}
      role="group"
      aria-label={localeText.pageIndicatorLabel(current + 1, total)}
      data-v-variant={variant}
      {...rest}
    >
      {variant === "dots" && renderDots()}
      {variant === "number" && renderNumber()}
      {variant === "line" && renderLine()}
      {children}
    </div>
  );
});

VPageIndicator.displayName = "VPageIndicator";
export { VPageIndicator };
