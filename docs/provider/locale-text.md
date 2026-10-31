# provider/locale-text

## defaultLocaleText

English text.
Used as fallback when no localeText is provided.

## Types

### VoloLocaleText

All UI text strings.

Override individual keys via VoloProvider's localeText prop.
All values default to English.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `noData` | `string` | `'No data'` | yes | Empty state text for data views. |
| `noResults` | `string` | `'No results found'` | yes | Empty search result text. |
| `loading` | `string` | `'Loading...'` | yes | Loading indicator label. |
| `selectPlaceholder` | `string` | `'Select...'` | yes | Trigger text of a VSelect while nothing is selected. |
| `autocompleteNoResults` | `string \| ((query: string) => string)` | — | yes | Text shown when autocomplete has no matches. |
| `tableNoData` | `string` | `'No data'` | yes | Empty state text for tables. |
| `avatarGroupOverflow` | `(n: number) => string` | `(n) => `+${n} more`` | yes | Overflow count label. |
| `avatarGroupLabel` | `(total: number) => string` | `(total) => `${total} avatars`` | yes | Group aria-label. |
| `chipRemove` | `(label: string) => string` | `(label) => `Remove ${label}`` | yes | Delete button aria-label. |
| `textFieldClear` | `string` | `'Clear'` | yes | Clear button aria-label. |
| `alertClose` | `string` | `'Close alert'` | yes | Close button aria-label. |
| `toastDismiss` | `string` | `'Dismiss toast'` | yes | Dismiss button aria-label. |
| `popoverClose` | `string` | `'Close popover'` | yes | Close button aria-label. |
| `paginationLabel` | `string` | `'Pagination'` | yes | Nav aria-label. |
| `paginationPrevious` | `string` | `'Previous page'` | yes | Previous button aria-label. |
| `paginationNext` | `string` | `'Next page'` | yes | Next button aria-label. |
| `paginationFirst` | `string` | `'First page'` | yes | First page button aria-label. |
| `paginationLast` | `string` | `'Last page'` | yes | Last page button aria-label. |
| `breadcrumbLabel` | `string` | `'Breadcrumb'` | yes | Nav aria-label. |
| `stepperProgress` | `string` | `'Progress'` | yes | Progress aria-label. |
| `stepperOptional` | `string` | `'(Optional)'` | yes | Marker next to the label of an optional step. |
| `pageIndicatorPage` | `(page: number) => string` | `(page) => `Page ${page}`` | yes | Aria-label of the dot or button for one page. |
| `pageIndicatorLabel` | `(page: number, total: number) => string` | `(page, total) => `Page ${page} of ${total}`` | yes | Aria-label of the whole indicator. |
| `bottomNavLabel` | `string` | `'Bottom navigation'` | yes | Nav aria-label. |
| `commandPlaceholder` | `string` | `'Search...'` | yes | Placeholder of the search input. |
| `commandNoResults` | `string` | `'No results found.'` | yes | Text shown when no command matches. |
| `carouselLabel` | `string` | `'Carousel'` | yes | Aria-label of the carousel region. |
| `carouselPrevious` | `string` | `'Previous slide'` | yes | Previous arrow aria-label. |
| `carouselNext` | `string` | `'Next slide'` | yes | Next arrow aria-label. |
| `carouselIndicators` | `string` | `'Carousel page indicators'` | yes | Aria-label of the page dots. |
| `carouselGoTo` | `(slide: number) => string` | `(slide) => `Go to slide ${slide}`` | yes | Aria-label of the dot for one slide (1-based). |
| `carouselSlide` | `(slide: number, total: number) => string` | `(slide, total) => `Slide ${slide} of ${total}`` | yes | Aria-label of one slide (1-based). |
