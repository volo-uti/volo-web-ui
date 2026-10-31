/**
 * @volo-uti/volo-web-ui/core: the pure, framework-neutral part of `@volo-uti/volo-web-ui`.
 *
 * This entry has no `"use client"` directive and loads no React code, so a Next.js server
 * component can call `cn(...)` and `createTheme(...)` and read `defaultLocaleText` on the server,
 * and importing it does not pull the component bundle into the client graph. Everything here is
 * also exported from the package root, which stays the entry for components, hooks and providers.
 *
 * Left out on purpose: anything that creates a React context, uses a hook or renders JSX
 * (`ThemeProvider`, `ThemeContext`, `createSafeContext`, `VoloProvider`, every `use*` hook), and
 * the polymorphic component types, which are written against React's types.
 */

export { cn } from "./lib/cn";
export type { VAlign, VColor, VOption, VOrientation, VSide, VSize, VVariant } from "./lib/types";

export { createTheme } from "./theme/create-theme";
export type {
  VComponentDefaultProps,
  VComponentOverride,
  VComponentOverrides,
  VComponentStyles,
  VResolvedTheme,
  VThemeConfig,
  VTokenColors,
  VTokenRadius,
  VTokenSizeLevel,
  VTokenSizes,
  VTokenSpacing,
  VTokens,
} from "./theme/create-theme";

export { defaultLocaleText } from "./provider/locale-text";
export type { VoloLocaleText } from "./provider/locale-text";

export { devWarning } from "./utils/dev-warning";

export { defaultTheme } from "./theme/default-theme";
