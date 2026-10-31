"use client";

import type { ReactNode } from "react";
import { ThemeProvider, type ThemeProviderProps } from "../theme/provider";
import { LocaleProvider, type LocaleProviderProps } from "./locale-provider";

/** Props of VoloProvider: the ThemeProvider and LocaleProvider props together. */
export interface VoloProviderProps
  extends Omit<ThemeProviderProps, "children">, Omit<LocaleProviderProps, "children"> {
  /** The app subtree. */
  children: ReactNode;
}

/**
 * Wraps the app in ThemeProvider and LocaleProvider at once.
 *
 * Theme: colour scheme, tokens, component overrides. Locale: locale tag and `localeText` overrides.
 *
 * @example
 * ```tsx
 * <VoloProvider
 *   theme={myTheme}
 *   defaultColorScheme="system"
 *   locale="en"
 *   localeText={{
 *     noData: 'Nothing here',
 *     paginationPrevious: 'Back',
 *   }}
 * >
 *   <App />
 * </VoloProvider>
 * ```
 */
export function VoloProvider({
  // Theme
  theme,
  defaultColorScheme,
  storageKey,
  // Locale
  locale,
  localeText,
  // Children
  children,
}: VoloProviderProps) {
  return (
    <ThemeProvider theme={theme} defaultColorScheme={defaultColorScheme} storageKey={storageKey}>
      <LocaleProvider locale={locale} localeText={localeText}>
        {children}
      </LocaleProvider>
    </ThemeProvider>
  );
}
