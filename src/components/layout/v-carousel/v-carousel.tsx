"use client";

import { Children, forwardRef, useCallback, useEffect, useRef } from "react";
import { useLocaleText } from "../../../hooks/use-locale";
import { useRovingFocus } from "../../../hooks/use-roving-focus";
import { cn } from "../../../lib";
import { useControllable } from "../../../hooks/use-controllable";
import type { VCarouselProps } from "./v-carousel.types";
import { variantDefaults } from "./v-carousel.types";

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────

/** Clamp a number between min and max */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ─────────────────────────────────────────
// Arrow Button
// ─────────────────────────────────────────

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const localeText = useLocaleText();
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? localeText.carouselPrevious : localeText.carouselNext}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-10",
        "flex items-center justify-center",
        "w-8 h-8 rounded-full",
        "bg-[var(--v-card)]/80 text-[var(--v-foreground)]",
        "border border-[var(--v-border)]",
        "shadow-[var(--v-shadow-sm)]",
        "transition-opacity duration-[var(--v-duration-fast)]",
        "hover:bg-[var(--v-card)] cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)]",
        disabled && "opacity-0 pointer-events-none",
        direction === "prev" ? "left-2" : "right-2",
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {direction === "prev" ? <path d="M10 12L6 8L10 4" /> : <path d="M6 4L10 8L6 12" />}
      </svg>
    </button>
  );
}

// ─────────────────────────────────────────
// Dot Indicator
// ─────────────────────────────────────────

function DotIndicator({
  total,
  current,
  onDotClick,
}: {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}) {
  const localeText = useLocaleText();
  const listRef = useRef<HTMLDivElement>(null);
  const { handleKeyDown, initRoving } = useRovingFocus(listRef, {
    selector: '[role="tab"]',
    orientation: "horizontal",
    loop: true,
  });

  // The selected dot is the tab stop; arrow keys move between the dots
  useEffect(() => {
    initRoving();
  }, [initRoving, total, current]);

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={localeText.carouselIndicators}
      onKeyDown={handleKeyDown}
      className="flex items-center justify-center gap-[var(--v-spacing-xs)]"
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === current}
          aria-label={localeText.carouselGoTo(i + 1)}
          onClick={() => onDotClick(i)}
          className={cn(
            "rounded-full transition-all duration-[var(--v-duration-fast)] cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)]",
            i === current
              ? "w-2 h-2 bg-[var(--v-primary)]"
              : "w-1.5 h-1.5 bg-[var(--v-muted-foreground)]/30 hover:bg-[var(--v-muted-foreground)]/50",
          )}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// VCarousel
// ─────────────────────────────────────────

/**
 * Swipeable slideshow with keyboard, arrows, auto-play and page dots.
 *
 * The slide area is a `region`; name it with `aria-label` or `aria-labelledby` when a page
 * shows more than one carousel.
 *
 * @example
 * <VCarousel height={200} showArrows onValueChange={setPage}>
 *   <VCard>Slide 1</VCard>
 *   <VCard>Slide 2</VCard>
 *   <VCard>Slide 3</VCard>
 * </VCarousel>
 */
const VCarousel = forwardRef<HTMLDivElement, VCarouselProps>((props, ref) => {
  const localeText = useLocaleText();
  const {
    // 1. Identity
    variant = "default",
    // 2. Visual
    showIndicator: showIndicatorProp,
    indicatorPosition: indicatorPositionProp,
    // 3. Content
    children,
    // 5. Layout
    height: heightProp,
    aspectRatio,
    viewportFraction: viewportFractionProp,
    padEnds: padEndsProp,
    pageSpacing: pageSpacingProp,
    // 6. State
    loop: loopProp,
    autoPlay: autoPlayProp,
    autoPlayInterval: autoPlayIntervalProp,
    // 7. State
    value,
    defaultValue = 0,
    onValueChange,
    // 8. Advanced
    showArrows = false,
    indicatorBuilder,
    className,
    style,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    ...rest
  } = props;

  // Resolve variant defaults
  const defaults = variantDefaults[variant];
  const viewportFraction = viewportFractionProp ?? defaults.viewportFraction;
  const padEnds = padEndsProp ?? defaults.padEnds;
  const pageSpacing = pageSpacingProp ?? defaults.pageSpacing;
  const autoPlay = autoPlayProp ?? defaults.autoPlay;
  const autoPlayInterval = autoPlayIntervalProp ?? defaults.autoPlayInterval;
  const loop = loopProp ?? defaults.loop;
  const showIndicator = showIndicatorProp ?? true;
  const indicatorPosition = indicatorPositionProp ?? defaults.indicatorPosition;
  const height = heightProp ?? (aspectRatio ? undefined : 200);

  // Child array
  const slides = Children.toArray(children);
  const totalSlides = slides.length;

  // Current page state
  const [currentPage, setCurrentPage] = useControllable<number>({
    value,
    defaultValue,
    onChange: onValueChange,
  });

  // Refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);
  const isScrollingRef = useRef(false);
  const scrollLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // A stored page can outlive the slides it pointed at (the slide count shrank)
  const activePage = totalSlides === 0 ? 0 : clamp(currentPage, 0, totalSlides - 1);

  /** Ignore scroll events for `ms` so programmatic scrolls do not report intermediate pages. */
  const lockScroll = useCallback((ms: number) => {
    isScrollingRef.current = true;
    if (scrollLockTimerRef.current) clearTimeout(scrollLockTimerRef.current);
    scrollLockTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      scrollLockTimerRef.current = null;
    }, ms);
  }, []);

  useEffect(
    () => () => {
      if (scrollLockTimerRef.current) clearTimeout(scrollLockTimerRef.current);
    },
    [],
  );

  /** Scroll offset that brings `page` into view; with padEnds the padding already centres it. */
  const getPageOffset = useCallback(
    (el: HTMLElement, page: number) => page * (el.offsetWidth * viewportFraction + pageSpacing),
    [viewportFraction, pageSpacing],
  );

  // ── Scroll to page ──

  const scrollToPage = useCallback(
    (page: number, behavior: ScrollBehavior = "smooth") => {
      const el = scrollRef.current;
      if (!el || totalSlides === 0) return;

      const targetPage = loop
        ? ((page % totalSlides) + totalSlides) % totalSlides
        : clamp(page, 0, totalSlides - 1);

      const scrollTarget = getPageOffset(el, targetPage);

      // Prevent scroll event from updating currentPage during programmatic scroll
      lockScroll(behavior === "smooth" ? 400 : 50);
      if (typeof el.scrollTo === "function") {
        el.scrollTo({ left: scrollTarget, behavior });
      } else {
        el.scrollLeft = scrollTarget;
      }

      // Update state immediately for programmatic scrolls
      setCurrentPage(targetPage);
    },
    [totalSlides, loop, getPageOffset, lockScroll, setCurrentPage],
  );

  // ── Follow an externally controlled value ──

  useEffect(() => {
    const el = scrollRef.current;
    if (value === undefined || !el || totalSlides === 0) return;
    const left = getPageOffset(el, clamp(value, 0, totalSlides - 1));
    // The scroll is ours: the scroll handler must not report the pages it passes through
    lockScroll(400);
    if (typeof el.scrollTo === "function") el.scrollTo({ left, behavior: "smooth" });
    else el.scrollLeft = left;
    // Only react to the value itself, not to layout props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // ── Start on defaultValue (uncontrolled) ──

  useEffect(() => {
    const el = scrollRef.current;
    if (value !== undefined || !el || totalSlides === 0) return;
    const page = clamp(defaultValue, 0, totalSlides - 1);
    if (page === 0) return;
    lockScroll(50);
    const left = getPageOffset(el, page);
    if (typeof el.scrollTo === "function") el.scrollTo({ left, behavior: "auto" });
    else el.scrollLeft = left;
    // Only the first render decides where the carousel starts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Handle scroll (detect current page from scroll position) ──

  const handleScroll = useCallback(() => {
    if (isScrollingRef.current) return;
    const el = scrollRef.current;
    if (!el || totalSlides === 0) return;

    const slideWidth = el.offsetWidth * viewportFraction + pageSpacing;
    if (slideWidth <= 0) return;

    const page = clamp(Math.round(el.scrollLeft / slideWidth), 0, totalSlides - 1);

    if (page !== activePage) {
      setCurrentPage(page);
    }
  }, [totalSlides, viewportFraction, pageSpacing, activePage, setCurrentPage]);

  // ── Auto-play ──

  const startAutoPlay = useCallback(() => {
    // A zero, negative or NaN interval would scroll continuously
    if (!autoPlay || totalSlides <= 1 || !(autoPlayInterval > 0)) return;
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);

    autoPlayTimerRef.current = setInterval(() => {
      if (isHoveredRef.current || isFocusedRef.current) return;

      const el = scrollRef.current;
      if (!el) return;

      const nextPage = activePage + 1;
      if (nextPage >= totalSlides) {
        if (loop) {
          scrollToPage(0);
        }
      } else {
        scrollToPage(nextPage);
      }
    }, autoPlayInterval * 1000);
  }, [autoPlay, totalSlides, loop, autoPlayInterval, activePage, scrollToPage]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, []);

  // Start/stop autoplay
  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  // ── Keyboard navigation ──

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Keys that bubble up from a control inside a slide (an input, say) belong to that control
      if (totalSlides <= 1 || e.target !== e.currentTarget) return;

      let handled = false;
      if (e.key === "ArrowLeft") {
        if (activePage > 0) {
          scrollToPage(activePage - 1);
        } else if (loop) {
          scrollToPage(totalSlides - 1);
        }
        handled = true;
      } else if (e.key === "ArrowRight") {
        if (activePage < totalSlides - 1) {
          scrollToPage(activePage + 1);
        } else if (loop) {
          scrollToPage(0);
        }
        handled = true;
      } else if (e.key === "Home") {
        scrollToPage(0);
        handled = true;
      } else if (e.key === "End") {
        scrollToPage(totalSlides - 1);
        handled = true;
      }

      if (handled) e.preventDefault();
    },
    [activePage, totalSlides, loop, scrollToPage],
  );

  // ── Hover/focus pause ──

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
  }, []);

  const handleFocus = useCallback(() => {
    isFocusedRef.current = true;
  }, []);

  const handleBlur = useCallback(() => {
    isFocusedRef.current = false;
  }, []);

  // ── Arrow navigation ──

  const goPrev = useCallback(() => {
    if (activePage > 0) {
      scrollToPage(activePage - 1);
    } else if (loop) {
      scrollToPage(totalSlides - 1);
    }
  }, [activePage, loop, totalSlides, scrollToPage]);

  const goNext = useCallback(() => {
    if (activePage < totalSlides - 1) {
      scrollToPage(activePage + 1);
    } else if (loop) {
      scrollToPage(0);
    }
  }, [activePage, loop, totalSlides, scrollToPage]);

  // ── Don't render empty ──

  if (totalSlides === 0) return null;

  // ── Sizing ──

  const sizeStyle: React.CSSProperties = {};
  if (height != null) {
    sizeStyle.height = typeof height === "number" ? `${height}px` : height;
  } else if (aspectRatio != null) {
    sizeStyle.aspectRatio = `${aspectRatio}`;
  }

  // ── Build indicator ──

  const showIndicatorResolved = showIndicator && indicatorPosition !== "none" && totalSlides > 1;

  const indicator = showIndicatorResolved ? (
    indicatorBuilder ? (
      indicatorBuilder(totalSlides, activePage)
    ) : (
      <DotIndicator total={totalSlides} current={activePage} onDotClick={scrollToPage} />
    )
  ) : null;

  // ── Compute slide item width ──
  // Each item width = viewportFraction * 100%
  // pageSpacing is added as gap between items

  const itemWidthCalc =
    viewportFraction === 1
      ? "100%"
      : `calc(${viewportFraction * 100}% - ${pageSpacing * (1 - viewportFraction)}px)`;

  // ── Scroll container ──

  const scrollContainer = (
    <div
      className="relative overflow-hidden"
      style={sizeStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={scrollRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabelledBy ? undefined : (ariaLabel ?? localeText.carouselLabel)}
        aria-labelledby={ariaLabelledBy}
        tabIndex={0}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "flex h-full overflow-x-auto",
          "snap-x snap-mandatory",
          "scrollbar-none",
          // Hide scrollbar across browsers
          "[&::-webkit-scrollbar]:hidden",
          "[-ms-overflow-style:none]",
          "[scrollbar-width:none]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)] focus-visible:ring-inset",
        )}
        style={{
          gap: `${pageSpacing}px`,
          ...(padEnds
            ? {
                scrollPaddingInline: `${((1 - viewportFraction) / 2) * 100}%`,
                paddingInline: `${((1 - viewportFraction) / 2) * 100}%`,
              }
            : {}),
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={localeText.carouselSlide(i + 1, totalSlides)}
            className="shrink-0 snap-center"
            style={{ width: itemWidthCalc }}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <ArrowButton direction="prev" onClick={goPrev} disabled={!loop && activePage === 0} />
          <ArrowButton
            direction="next"
            onClick={goNext}
            disabled={!loop && activePage === totalSlides - 1}
          />
        </>
      )}

      {/* Overlay indicator */}
      {indicator && indicatorPosition === "overlay" && (
        <div className="absolute bottom-[var(--v-spacing-md)] left-0 right-0 flex justify-center">
          {indicator}
        </div>
      )}
    </div>
  );

  // ── Layout with indicator position ──

  const content = (() => {
    if (!indicator || indicatorPosition === "overlay" || indicatorPosition === "none") {
      return scrollContainer;
    }

    if (indicatorPosition === "bottom") {
      return (
        <div className="flex flex-col items-stretch">
          {scrollContainer}
          <div className="mt-[var(--v-spacing-sm)] flex justify-center">{indicator}</div>
        </div>
      );
    }

    // belowCarousel
    return (
      <div className="flex flex-col items-stretch">
        {scrollContainer}
        <div className="mt-[var(--v-spacing-md)] flex justify-center">{indicator}</div>
      </div>
    );
  })();

  return (
    <div
      ref={ref}
      className={cn("v-carousel", className)}
      data-v-variant={variant}
      data-v-autoplay={autoPlay || undefined}
      data-v-loop={loop || undefined}
      style={style}
      {...rest}
    >
      {content}
    </div>
  );
});

VCarousel.displayName = "VCarousel";
export { VCarousel };
