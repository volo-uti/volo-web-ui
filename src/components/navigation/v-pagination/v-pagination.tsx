"use client";

import { forwardRef, useMemo } from "react";
import { cn } from "../../../lib";
import { devWarning } from "../../../utils/dev-warning";
import { useControllable } from "../../../hooks/use-controllable";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useLocaleText } from "../../../hooks/use-locale";
import type { VPaginationProps, VPaginationSize } from "./v-pagination.types";

// ─────────────────────────────────────────
// Size styles
// ─────────────────────────────────────────

const sizeButtonStyles: Record<VPaginationSize, string> = {
  sm: "h-[var(--v-size-xs-height)] min-w-[var(--v-size-xs-height)] text-[length:var(--v-size-xs-font-size)]",
  md: "h-[var(--v-size-sm-height)] min-w-[var(--v-size-sm-height)] text-[length:var(--v-size-sm-font-size)]",
  lg: "h-[var(--v-size-md-height)] min-w-[var(--v-size-md-height)] text-[length:var(--v-size-md-font-size)]",
};

// ─────────────────────────────────────────
// Pagination range computation
// ─────────────────────────────────────────

function range(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i++) result.push(i);
  return result;
}

/**
 * Page numbers and ellipses to show.
 *
 * Every layout has the same number of slots (`2 * boundary + 2 * sibling + 3`), so the control
 * keeps its width while paging, and an ellipsis never stands in for a single page.
 */
function computePages(
  count: number,
  currentPage: number,
  siblingCount: number,
  boundaryCount: number,
): (number | "ellipsis")[] {
  const totalSlots = boundaryCount * 2 + siblingCount * 2 + 3;
  if (totalSlots >= count) {
    return range(1, count);
  }

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

  const siblingsStart = Math.max(
    Math.min(currentPage - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(currentPage + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? (endPages[0] as number) - 2 : count - 1,
  );

  return [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? (["ellipsis"] as const)
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < count - boundaryCount - 1
      ? (["ellipsis"] as const)
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),
    ...endPages,
  ];
}

// ─────────────────────────────────────────
// Chevron icons
// ─────────────────────────────────────────

function FirstPageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M11 4L7 8L11 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10 4L6 8L10 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LastPageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5 4L9 8L5 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Page navigation with numbered buttons and ellipses.
 *
 * @example
 * <VPagination totalPages={20} value={page} onValueChange={setPage} />
 */
const VPagination = forwardRef<HTMLElement, VPaginationProps>((props, ref) => {
  const override = useComponentOverride("VPagination");
  const {
    // 1. Identity
    variant = "default",
    // 2. Visual
    size = "md",
    // 3. Content
    totalPages,
    previousText,
    nextText,
    pageTextBuilder,
    // 5. Layout
    siblingCount = 1,
    boundaryCount = 1,
    showFirstLast = true,
    // 6. State
    value: controlledCurrentPage,
    defaultValue = 1,
    disabled = false,
    // 7. Callbacks
    onValueChange,
    // 8. Advanced
    className,
    ...rest
  } = props;

  if (totalPages < 1) {
    devWarning("VPagination", "totalPages must be at least 1");
  }
  if (
    controlledCurrentPage !== undefined &&
    (controlledCurrentPage < 1 || controlledCurrentPage > totalPages)
  ) {
    devWarning("VPagination", "value is out of range [1, totalPages]");
  }

  const localeText = useLocaleText();

  const [rawPage, setCurrentPage] = useControllable({
    value: controlledCurrentPage,
    defaultValue,
    onChange: onValueChange,
  });
  // The page in use always lies in [1, totalPages], also after `totalPages` shrinks
  const currentPage = Math.min(Math.max(1, rawPage), Math.max(1, totalPages));

  const pages = useMemo(
    () => computePages(totalPages, currentPage, siblingCount, boundaryCount),
    [totalPages, currentPage, siblingCount, boundaryCount],
  );

  const buttonBase = cn(
    "inline-flex items-center justify-center",
    sizeButtonStyles[size],
    "min-h-6 min-w-6",
    "rounded-[var(--v-radius-sm)]",
    "transition-colors cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)]",
    disabled && "opacity-50 pointer-events-none",
  );

  const prevLabel = previousText ?? localeText.paginationPrevious;
  const nextLabel = nextText ?? localeText.paginationNext;

  // ── minimal variant: Previous / Next only ──
  if (variant === "minimal") {
    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label={localeText.paginationLabel}
        className={cn("v-pagination", override?.styles?.root, className)}
        {...rest}
      >
        <div className={cn("flex items-center gap-2", override?.styles?.list)}>
          <button
            type="button"
            disabled={disabled || currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={cn(
              buttonBase,
              "px-[var(--v-spacing-sm)]",
              "hover:bg-[var(--v-accent)]",
              (currentPage <= 1 || disabled) && "opacity-50 pointer-events-none",
              override?.styles?.prevButton,
            )}
          >
            <ChevronLeftIcon />
            <span className="ml-1">{prevLabel}</span>
          </button>
          <button
            type="button"
            disabled={disabled || currentPage >= totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={cn(
              buttonBase,
              "px-[var(--v-spacing-sm)]",
              "hover:bg-[var(--v-accent)]",
              (currentPage >= totalPages || disabled) && "opacity-50 pointer-events-none",
              override?.styles?.nextButton,
            )}
          >
            <span className="mr-1">{nextLabel}</span>
            <ChevronRightIcon />
          </button>
        </div>
      </nav>
    );
  }

  // ── simple variant: Previous / "Page X of Y" / Next ──
  if (variant === "simple") {
    const pageText = pageTextBuilder
      ? pageTextBuilder(currentPage, totalPages)
      : `${currentPage} / ${totalPages}`;

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label={localeText.paginationLabel}
        className={cn("v-pagination", override?.styles?.root, className)}
        {...rest}
      >
        <div className={cn("flex items-center gap-2", override?.styles?.list)}>
          <button
            type="button"
            disabled={disabled || currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={cn(
              buttonBase,
              "hover:bg-[var(--v-accent)]",
              (currentPage <= 1 || disabled) && "opacity-50 pointer-events-none",
              override?.styles?.prevButton,
            )}
            aria-label={prevLabel}
          >
            <ChevronLeftIcon />
          </button>
          <span
            className={cn(
              sizeButtonStyles[size],
              "inline-flex items-center justify-center text-[var(--v-foreground)] whitespace-nowrap px-[var(--v-spacing-sm)]",
            )}
          >
            {pageText}
          </span>
          <button
            type="button"
            disabled={disabled || currentPage >= totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={cn(
              buttonBase,
              "hover:bg-[var(--v-accent)]",
              (currentPage >= totalPages || disabled) && "opacity-50 pointer-events-none",
              override?.styles?.nextButton,
            )}
            aria-label={nextLabel}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </nav>
    );
  }

  // ── default variant ──
  return (
    <nav
      ref={ref}
      role="navigation"
      aria-label={localeText.paginationLabel}
      className={cn("v-pagination", override?.styles?.root, className)}
      {...rest}
    >
      <ul className={cn("flex items-center gap-1", override?.styles?.list)}>
        {/* First page */}
        {showFirstLast && (
          <li>
            <button
              type="button"
              disabled={disabled || currentPage <= 1}
              onClick={() => setCurrentPage(1)}
              className={cn(
                buttonBase,
                "hover:bg-[var(--v-accent)]",
                (currentPage <= 1 || disabled) && "opacity-50 pointer-events-none",
              )}
              aria-label={localeText.paginationFirst}
            >
              <FirstPageIcon />
            </button>
          </li>
        )}

        {/* Previous */}
        <li>
          <button
            type="button"
            disabled={disabled || currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={cn(
              buttonBase,
              "hover:bg-[var(--v-accent)]",
              (currentPage <= 1 || disabled) && "opacity-50 pointer-events-none",
              override?.styles?.prevButton,
            )}
            aria-label={prevLabel}
          >
            <ChevronLeftIcon />
          </button>
        </li>

        {/* Page buttons */}
        {pages.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <li key={`ellipsis-${index}`}>
                <span
                  className={cn(
                    buttonBase,
                    "pointer-events-none text-[var(--v-muted-foreground)]",
                    override?.styles?.ellipsis,
                  )}
                >
                  ...
                </span>
              </li>
            );
          }

          const isActive = item === currentPage;
          return (
            <li key={item}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => setCurrentPage(item)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  buttonBase,
                  isActive
                    ? "bg-[var(--v-primary)] text-[var(--v-primary-foreground)]"
                    : "hover:bg-[var(--v-accent)] text-[var(--v-foreground)]",
                  override?.styles?.pageButton,
                )}
              >
                {item}
              </button>
            </li>
          );
        })}

        {/* Next */}
        <li>
          <button
            type="button"
            disabled={disabled || currentPage >= totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={cn(
              buttonBase,
              "hover:bg-[var(--v-accent)]",
              (currentPage >= totalPages || disabled) && "opacity-50 pointer-events-none",
              override?.styles?.nextButton,
            )}
            aria-label={nextLabel}
          >
            <ChevronRightIcon />
          </button>
        </li>

        {/* Last page */}
        {showFirstLast && (
          <li>
            <button
              type="button"
              disabled={disabled || currentPage >= totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className={cn(
                buttonBase,
                "hover:bg-[var(--v-accent)]",
                (currentPage >= totalPages || disabled) && "opacity-50 pointer-events-none",
              )}
              aria-label={localeText.paginationLast}
            >
              <LastPageIcon />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
});

VPagination.displayName = "VPagination";

export { VPagination };
