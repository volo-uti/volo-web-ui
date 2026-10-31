/**
 * All UI text strings.
 *
 * Override individual keys via VoloProvider's localeText prop.
 * All values default to English.
 */
export interface VoloLocaleText {
  // ── Common ──────────────────────────────────────
  /** Empty state text for data views. @default 'No data' */
  noData: string;
  /** Empty search result text. @default 'No results found' */
  noResults: string;
  /** Loading indicator label. @default 'Loading...' */
  loading: string;

  // ── VSelect ────────────────────────────────────
  /** Trigger text of a VSelect while nothing is selected. @default 'Select...' */
  selectPlaceholder: string;

  // ── VAutocomplete ──────────────────────────────
  /** Text shown when autocomplete has no matches. */
  autocompleteNoResults: string | ((query: string) => string);

  // ── VTable ─────────────────────────────────────
  /** Empty state text for tables. @default 'No data' */
  tableNoData: string;

  // ── VAvatarGroup ───────────────────────────────
  /** Overflow count label. @default (n) => `+${n} more` */
  avatarGroupOverflow: (n: number) => string;
  /** Group aria-label. @default (total) => `${total} avatars` */
  avatarGroupLabel: (total: number) => string;

  // ── VChip ──────────────────────────────────────
  /** Delete button aria-label. @default (label) => `Remove ${label}` */
  chipRemove: (label: string) => string;

  // ── VTextField ─────────────────────────────────
  /** Clear button aria-label. @default 'Clear' */
  textFieldClear: string;

  // ── VAlert ─────────────────────────────────────
  /** Close button aria-label. @default 'Close alert' */
  alertClose: string;

  // ── VToast ─────────────────────────────────────
  /** Dismiss button aria-label. @default 'Dismiss toast' */
  toastDismiss: string;

  // ── VPopover ───────────────────────────────────
  /** Close button aria-label. @default 'Close popover' */
  popoverClose: string;

  // ── VPagination ────────────────────────────────
  /** Nav aria-label. @default 'Pagination' */
  paginationLabel: string;
  /** Previous button aria-label. @default 'Previous page' */
  paginationPrevious: string;
  /** Next button aria-label. @default 'Next page' */
  paginationNext: string;
  /** First page button aria-label. @default 'First page' */
  paginationFirst: string;
  /** Last page button aria-label. @default 'Last page' */
  paginationLast: string;

  // ── VBreadcrumb ────────────────────────────────
  /** Nav aria-label. @default 'Breadcrumb' */
  breadcrumbLabel: string;

  // ── VStepper ───────────────────────────────────
  /** Progress aria-label. @default 'Progress' */
  stepperProgress: string;
  /** Marker next to the label of an optional step. @default '(Optional)' */
  stepperOptional: string;

  // ── VPageIndicator ─────────────────────────────
  /** Aria-label of the dot or button for one page. @default (page) => `Page ${page}` */
  pageIndicatorPage: (page: number) => string;
  /** Aria-label of the whole indicator. @default (page, total) => `Page ${page} of ${total}` */
  pageIndicatorLabel: (page: number, total: number) => string;

  // ── VBottomNav ─────────────────────────────────
  /** Nav aria-label. @default 'Bottom navigation' */
  bottomNavLabel: string;

  // ── VCommand ───────────────────────────────────
  /** Placeholder of the search input. @default 'Search...' */
  commandPlaceholder: string;
  /** Text shown when no command matches. @default 'No results found.' */
  commandNoResults: string;

  // ── VCarousel ──────────────────────────────────
  /** Aria-label of the carousel region. @default 'Carousel' */
  carouselLabel: string;
  /** Previous arrow aria-label. @default 'Previous slide' */
  carouselPrevious: string;
  /** Next arrow aria-label. @default 'Next slide' */
  carouselNext: string;
  /** Aria-label of the page dots. @default 'Carousel page indicators' */
  carouselIndicators: string;
  /** Aria-label of the dot for one slide (1-based). @default (slide) => `Go to slide ${slide}` */
  carouselGoTo: (slide: number) => string;
  /** Aria-label of one slide (1-based). @default (slide, total) => `Slide ${slide} of ${total}` */
  carouselSlide: (slide: number, total: number) => string;
}

/**
 * English text.
 * Used as fallback when no localeText is provided.
 */
export const defaultLocaleText: VoloLocaleText = {
  // Common
  noData: "No data",
  noResults: "No results found",
  loading: "Loading...",

  // VSelect
  selectPlaceholder: "Select...",

  // VAutocomplete
  autocompleteNoResults: (query: string) =>
    query ? `No results for "${query}"` : "No results found",

  // VTable
  tableNoData: "No data",

  // VAvatarGroup
  avatarGroupOverflow: (n: number) => `+${n} more`,
  avatarGroupLabel: (total: number) => `${total} avatars`,

  // VChip
  chipRemove: (label: string) => `Remove ${label}`,

  // VTextField
  textFieldClear: "Clear",

  // VAlert
  alertClose: "Close alert",

  // VToast
  toastDismiss: "Dismiss toast",

  // VPopover
  popoverClose: "Close popover",

  // VPagination
  paginationLabel: "Pagination",
  paginationPrevious: "Previous page",
  paginationNext: "Next page",
  paginationFirst: "First page",
  paginationLast: "Last page",

  // VBreadcrumb
  breadcrumbLabel: "Breadcrumb",

  // VStepper
  stepperProgress: "Progress",
  stepperOptional: "(Optional)",

  // VPageIndicator
  pageIndicatorPage: (page: number) => `Page ${page}`,
  pageIndicatorLabel: (page: number, total: number) => `Page ${page} of ${total}`,

  // VBottomNav
  bottomNavLabel: "Bottom navigation",

  // VCommand
  commandPlaceholder: "Search...",
  commandNoResults: "No results found.",

  // VCarousel
  carouselLabel: "Carousel",
  carouselPrevious: "Previous slide",
  carouselNext: "Next slide",
  carouselIndicators: "Carousel page indicators",
  carouselGoTo: (slide: number) => `Go to slide ${slide}`,
  carouselSlide: (slide: number, total: number) => `Slide ${slide} of ${total}`,
};
