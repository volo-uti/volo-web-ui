"use client";

import { useContext } from "react";
import { ThemeContext, type VThemeContextValue } from "../theme/provider";

/**
 * Reads the colour scheme, its setters and component overrides.
 *
 * Reads the nearest ThemeProvider. Throws outside a `ThemeProvider` (or `VoloProvider`).
 *
 * @returns The theme context value.
 *
 * @example
 * const { resolvedColorScheme, toggleDark, setColorScheme } = useTheme()
 */
export function useTheme(): VThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error(
      "useTheme must be used within a ThemeProvider.\nWrap your component tree with <ThemeProvider> or <VoloProvider>.",
    );
  }
  return ctx;
}
