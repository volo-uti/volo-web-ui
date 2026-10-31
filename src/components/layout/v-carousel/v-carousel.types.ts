import type { HTMLAttributes, ReactNode } from "react";

/** Preset of a VCarousel: default, fullWidth, card or hero. */
export type VCarouselVariant = "default" | "fullWidth" | "card" | "hero";

/** Where the VCarousel indicator is drawn. */
export type VCarouselIndicatorPosition = "bottom" | "belowCarousel" | "overlay" | "none";

/** Preset values of each variant. */
export const variantDefaults: Record<
  VCarouselVariant,
  {
    viewportFraction: number;
    padEnds: boolean;
    pageSpacing: number;
    autoPlay: boolean;
    autoPlayInterval: number;
    loop: boolean;
    indicatorPosition: VCarouselIndicatorPosition;
  }
> = {
  default: {
    viewportFraction: 0.8,
    padEnds: true,
    pageSpacing: 8,
    autoPlay: false,
    autoPlayInterval: 3,
    loop: false,
    indicatorPosition: "bottom",
  },
  fullWidth: {
    viewportFraction: 1.0,
    padEnds: false,
    pageSpacing: 0,
    autoPlay: false,
    autoPlayInterval: 3,
    loop: false,
    indicatorPosition: "bottom",
  },
  card: {
    viewportFraction: 0.85,
    padEnds: true,
    pageSpacing: 12,
    autoPlay: false,
    autoPlayInterval: 3,
    loop: false,
    indicatorPosition: "bottom",
  },
  hero: {
    viewportFraction: 1.0,
    padEnds: false,
    pageSpacing: 0,
    autoPlay: true,
    autoPlayInterval: 5,
    loop: true,
    indicatorPosition: "overlay",
  },
};

/** VCarousel props. */
export interface VCarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  /**
   * Preset for viewport fraction, spacing, auto-play, loop and indicator.
   * @default "default"
   */
  variant?: VCarouselVariant;
  /**
   * Whether to show the page indicator.
   * @default true
   */
  showIndicator?: boolean;
  /**
   * Where the indicator sits; defaults to the variant preset.
   * @default "bottom"
   */
  indicatorPosition?: VCarouselIndicatorPosition;
  /** Slides; each child is one page. */
  children?: ReactNode;
  /**
   * Carousel height. Accepts pixels as a number or any CSS length.
   * @default 200
   */
  height?: number | string;
  /**
   * Width:height ratio used when `height` is not set.
   * @default undefined
   */
  aspectRatio?: number;
  /**
   * Share of the width one slide takes, from 0 to 1; defaults to the variant preset.
   * @default 0.8
   */
  viewportFraction?: number;
  /**
   * Whether the first and last slide can be centred; defaults to the variant preset.
   * @default true
   */
  padEnds?: boolean;
  /**
   * Space between slides in pixels; defaults to the variant preset.
   * @default 8
   */
  pageSpacing?: number;
  /**
   * Whether navigation wraps around at the ends; defaults to the variant preset.
   * @default false
   */
  loop?: boolean;
  /**
   * Whether slides advance on their own; defaults to the variant preset.
   * @default false
   */
  autoPlay?: boolean;
  /**
   * Seconds between automatic advances; defaults to the variant preset.
   * @default 3
   */
  autoPlayInterval?: number;
  /**
   * Current page index when controlled.
   * @default undefined
   */
  value?: number;
  /**
   * Initial page index when uncontrolled.
   * @default 0
   */
  defaultValue?: number;
  /** Called with the new page index when the page changes. */
  onValueChange?: (value: number) => void;
  /**
   * Whether to show previous and next arrow buttons.
   * @default false
   */
  showArrows?: boolean;
  /** Replaces the dot indicator; receives the slide count and the current index. */
  indicatorBuilder?: (total: number, current: number) => ReactNode;
}
