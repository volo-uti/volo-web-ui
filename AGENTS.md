# volo-web-ui: React component library

React 19, TypeScript (strict), Tailwind CSS 4. Working on this repository needs Node 26 or newer (`.nvmrc`) and the pnpm in `packageManager`; the published package declares no `engines`, so consumers are not held to them.
Read the rules below and the index at the bottom before changing anything. Do not rebuild a component or helper that already exists.

| Path          | What it holds                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------ |
| `src`         | `@volo-uti/volo-web-ui`: components, hooks, theme, providers (npm)                               |
| `src/core.ts` | `@volo-uti/volo-web-ui/core`: the pure parts for server components (no React, no `"use client"`) |
| `docs`        | The generated docs of the public API, shipped in the package                                     |
| `stories`     | The Storybook catalog for people to browse (autodocs); it is not shipped                         |
| `bin`         | `volo-web-ui-index`, which writes the index block into a product                                 |
| `scripts`     | The generators and checks behind `pnpm check`                                                    |

## Commands

```bash
pnpm check        # the gate: format · lint (0 warnings) · typecheck · check:tokens · check:css-vars · check:exports · check:index · check:docs · test · build · check:dist
pnpm verify       # the same gate in a clean Docker container (run before pushing main or develop)
pnpm index        # regenerates the index (blocks below, docs/index.txt) and the docs/
pnpm tokens       # regenerates tokens.generated.css
pnpm storybook    # http://localhost:6006
```

## Adding a component

Follow the `add-component` skill for the steps. The rules to keep are:

- Files and folders are `v-` + kebab-case, components are `V` + PascalCase, CSS variables use the `--v-` prefix.
- **Every export gets a JSDoc first sentence.** The index and `docs/` are built from it. Without it `check:index` and `check:docs` fail. The first sentence is at most 90 characters up to the period (`check:index` reports longer ones as `file:line name (N chars)`); put details from the second sentence on. The index block is at most 8,000 characters.
- Do not hand-write `argTypes` in stories. Autodocs reads them from types and JSDoc.
- Never edit `*.generated.css` by hand (`pnpm tokens`). The token source is `src/theme/tokens/*.tokens.json` (DTCG).
- Use only defined CSS variables (`check:css-vars`).
- `src/core.ts` (`@volo-uti/volo-web-ui/core`) re-exports only pure, framework-neutral things (no context, hook or JSX, nothing that imports `react`), and each name must also be exported from `src/index.ts`. Import from the file that defines a thing (`./lib/cn`, not `./lib`), because the barrels pull in React code. `check:exports` and `check:dist` enforce this.
- Every public component, hook and type reachable from a category barrel is also exported from `src/index.ts` (`check:exports`).
- Do not lean on external UI libraries (MUI, Radix, and so on). Build with React and Tailwind. Merge classes with `cn()`.
- Tests sit next to the source as `*.test.tsx` (vitest, testing-library, jest-axe; `renderWithTheme` and `testA11y` from `src/test-utils`).
- A component that replaces a raw element goes into `rawElementReplacements` in `eslint.mjs`. The stories may not use the raw elements on that list (`<button>` and so on); lint blocks them.
- Strings can be changed through `localeText` on `VoloProvider`. Do not hard-code text in components; use `useLocaleText`.

## Skills

| Task            | Skill           |
| --------------- | --------------- |
| Add a component | `add-component` |
| Update deps     | `update-deps`   |

There is no test CI. The `pre-push` hook (lefthook) runs `pnpm check`, and `pnpm verify` on `main` and `develop`. Remote GitHub Actions only build and deploy.

Skills live in `.agents/skills/` (`.claude/skills` links to it).

## Naming rules (React and Base UI conventions)

| Subject                  | Rule                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| Disabled                 | `disabled`                                                                                     |
| Value callback           | `onValueChange(value)`                                                                         |
| On/off callback          | `onCheckedChange(checked)`                                                                     |
| Open callback            | `onOpenChange(open)`                                                                           |
| Close callback           | `onClose` (`onOpenChange` if there is an open state)                                           |
| Close on outside press   | `barrierDismissible`                                                                           |
| Position next to trigger | `position: VSide` + `align: VAlign` (screen-corner placement uses the part's `position` union) |
| Selection toggle (chip)  | `selected` + `onSelectedChange(selected)`                                                      |
| `onChange`               | the DOM event as is                                                                            |
| Press                    | `onClick`                                                                                      |
| Content slot             | `ReactNode`                                                                                    |
| On/off value             | `checked`                                                                                      |
| Size                     | `VSize` or a subset of it                                                                      |
| Semantic color           | a `VColor`-family union                                                                        |
| `@deprecated` alias      | do not create one; when you rename, delete the old name                                        |

## Index

The block below is written by `pnpm index`; do not edit it by hand.

<!-- BEGIN:volo-web-ui-index -->

## Index of @volo-uti/volo-web-ui

`pnpm index` builds this from the first JSDoc sentence; do not edit it by hand. Before writing UI, find the component here and read its doc. If nothing fits, say what you looked for, then add one. The doc of each entry is `docs/<section>/<name>.md` (`[.]` is the docs folder itself). Subcomponents and types are in each doc.

```text
[data-display]
v-avatar|VAvatar: User avatar with image, initials or icon fallback; focusable when it has `onClick`.
v-badge|VBadge: Count or label badge pinned to the corner of its child; counts above `max` show as "99+".
v-check-list-tile|VCheckListTile: List tile with a built-in checkbox.
v-chip|VChip: Compact tag; clickable, a toggleable filter or removable.
v-divider|VDivider: Separator line, solid or dashed, with an optional centre label.
v-hover-card|VHoverCard: Rich preview card that opens on hover and closes when the pointer leaves.
v-image|VImage: Image with loading placeholder, fade-in and error fallback; `ref` is the `<img>`.
v-list-tile|VListTile: Row with leading, title, subtitle and trailing slots; pressable with `onClick`.
v-setting-tile|VSettingTile: Settings row ending in a chevron, switch, checkbox or custom content.
v-switch-list-tile|VSwitchListTile: List tile with a built-in switch.
v-table|VTable: Data table driven by `columns` and `data`, with sortable headers and an empty state.
v-tooltip|VTooltip: Text bubble shown after a delay on hover or focus; Escape closes it.
[feedback]
v-alert-dialog|VAlertDialog: Modal dialog that needs an explicit answer.
v-alert|VAlert: Inline message box with a severity icon, optional title, action and close button.
v-backdrop|VBackdrop: Full-screen dimming layer for custom modals and drawers; press it with `onClick`.
v-dialog|VDialog: Modal dialog with backdrop and focus trap.
v-loading-spinner|VLoadingSpinner: Circular arc spinner for an unknown wait; `role="status"` with a localized label.
v-progress|VProgress: Linear or circular progress bar, determinate (0-100) or indeterminate.
v-skeleton|VSkeleton: Grey placeholder block, line or circle shown in place of content while it loads.
v-snackbar|VSnackbar: Brief message bar at the screen bottom with an optional action.
v-toast|toast: Imperative toast API: `success`, `info`, `warning`, `error`, `default`, `dismiss`.
[hooks]
use-component-override|useComponentOverride: Reads the theme overrides of one component by name.
use-controllable|useControllable: State that works both controlled and uncontrolled.
use-focus-trap|useFocusTrap: Traps focus inside a container while open and restores it on close.
use-locale|useLocale: Returns the current locale tag. useLocaleText: Returns the resolved UI text.
use-roving-focus|useRovingFocus: Arrow-key focus movement between the items of a container (roving tabindex).
use-snackbar-queue|useSnackbarQueue: Queues snackbars and exposes the current one.
use-theme|useTheme: Reads the colour scheme, its setters and component overrides.
[inputs]
v-autocomplete|VAutocomplete: Text input with suggestions filtered as you type.
v-button-group|VButtonGroup: Connected strip of VButtons with arrow-key focus.
v-button|VButton: Text button with variants, loading state and leading/trailing slots.
v-checkbox|VCheckbox: Checkbox with label, indeterminate state and card variant.
v-fab|VFab: Floating action button for the main action of a screen, fixed in a corner.
v-form-body|VFormBody: Bordered surface that holds a form control with optional leading and trailing elements.
v-form-field|VFormField: Form field that stacks a label row, a control and a message row.
v-form-footer|VFormFooter: Message row below a form field: error, success or helper text, counter and extra note.
v-form-header|VFormHeader: Label row above a form field: label, required mark, tooltip and extra info.
v-form|VForm: Vertical form layout that stops the browser's default submit navigation.
v-icon-button|VIconButton: Icon-only button with four variants and an optional pressed (toggle) state.
v-label|VLabel: Form label with size tokens and a required mark; renders a native `<label>`.
v-link|VLink: Styled anchor with underline and colour options; `as` swaps in a router Link.
v-radio|VRadio: Labelled radio; must sit inside a VRadioGroup.
v-select|VSelect: Dropdown select, single or multiple.
v-slider|VSlider: Draggable single-value slider with keyboard control.
v-switch|VSwitch: On/off switch with label (role switch).
v-text-area|VTextArea: Multi-line text input with label, messages, a counter and optional auto-resize.
v-text-field|VTextField: Single-line text input with label, messages, adornments and a clear button.
v-toggle-button|VToggleButton: Button that toggles and exposes aria-pressed.
[layout]
v-box|VBox: Plain container with optional card, outlined or elevated surface.
v-carousel|VCarousel: Swipeable slideshow with keyboard, arrows, auto-play and page dots.
v-grid|VGrid: Grid of children with a fixed column count or an auto-fill minimum width.
v-resizable|VResizable: Split panels with draggable handles.
v-scroll-area|VScrollArea: Scrollable region with a themed, optionally auto-hiding scrollbar.
v-section|VSection: Titled content section that can collapse.
v-stack|VStack: Row or column of children with spacing.
[lib]
cn|cn: Merges class names using clsx and tailwind-merge.
create-context|createSafeContext: Creates a context whose hook throws outside its Provider.
types|VSize: Component sizes. VColor: Semantic colours. VVariant: Visual variants. VOption: Option of Select-like components. VOrientation: Layout orientation. VSide: Four sides. VAlign: Start, center or end alignment.
[navigation]
v-app-bar|VAppBar: Top bar with title, leading element and actions.
v-bottom-nav|VBottomNav: Bottom bar for switching between three to five primary destinations.
v-breadcrumb|VBreadcrumb: Trail of links showing where the page sits in the hierarchy.
v-command|VCommand: Searchable command palette with arrow-key selection.
v-drawer|VDrawer: Panel that slides in from any screen edge, modal or persistent.
v-menu|VMenu: Dropdown menu opened by a trigger, with arrow-key navigation.
v-page-indicator|VPageIndicator: Page position as dots, a number or a progress line.
v-pagination|VPagination: Page navigation with numbered buttons and ellipses.
v-stepper|VStepper: Numbered step progress with labels, in a row or a column.
v-tabs|VTabs: Tabs that switch between panels; arrow keys move between tabs.
[provider]
locale-provider|useLocaleContext: Reads the locale context; returns the English defaults outside a `LocaleProvider`. LocaleProvider: Provides locale and text overrides.
locale-text|defaultLocaleText: English text.
volo-provider|VoloProvider: Wraps the app in ThemeProvider and LocaleProvider at once.
[surfaces]
v-accordion|VAccordion: Collapsible content sections; arrow keys move between triggers.
v-card|VCard: Container that groups related content; becomes a pressable button with `interactive`.
v-popover|VPopover: Floating panel anchored to a trigger; closes on Escape or an outside press.
v-sheet|VSheet: Plain themed surface for grouping content; lighter than VCard.
[theme]
create-theme|createTheme: Builds a theme from token and component overrides.
default-theme|defaultTheme: Default theme without overrides.
provider|ThemeContext: Context behind `ThemeProvider`; read it with `useTheme`. ThemeProvider: Applies the theme's CSS variables and holds the colour scheme.
[utils]
dev-warning|devWarning: Logs a warning to the console in development only.
```

<!-- END:volo-web-ui-index -->
