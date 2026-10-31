"use client";

import { useContext, useMemo, type ReactNode } from "react";
import { createSafeContext } from "../lib";
import { defaultLocaleText, type VoloLocaleText } from "./locale-text";

// ── Context ──────────────────────────────────────

/** Locale context value. */
export interface LocaleContextValue {
  /** BCP 47 locale tag (informational, no built-in translations). */
  locale: string;
  /** Resolved locale text (defaults merged with overrides). */
  localeText: VoloLocaleText;
}

/** Reads the locale context; returns the English defaults outside a `LocaleProvider`. */
const [LocaleContextProvider, useLocaleContext, LocaleContext] =
  createSafeContext<LocaleContextValue>("Locale", {
    locale: "en",
    localeText: defaultLocaleText,
  });

export { useLocaleContext, LocaleContext };

// ── Provider ─────────────────────────────────────

/** Props of LocaleProvider. */
export interface LocaleProviderProps {
  /**
   * BCP 47 locale tag returned by `useLocale`; it does not translate anything by itself.
   * Inherits the enclosing provider's tag; `'en'` at the root.
   */
  locale?: string;
  /** Text entries that replace the inherited text; `undefined` entries are ignored. */
  localeText?: Partial<VoloLocaleText>;
  /** The subtree that reads the locale. */
  children: ReactNode;
}

/**
 * Provides locale and text overrides.
 *
 * @example
 * <LocaleProvider locale="en" localeText={{ noData: "Nothing here" }}>
 *   <App />
 * </LocaleProvider>
 */
export function LocaleProvider({
  locale: localeProp,
  localeText: overrides,
  children,
}: LocaleProviderProps) {
  // A nested provider builds on its parent, so inner overrides do not drop outer text
  const parent = useContext(LocaleContext);

  const localeText = useMemo<VoloLocaleText>(() => {
    if (!overrides) return parent.localeText;
    const defined = Object.fromEntries(
      Object.entries(overrides).filter(([, text]) => text !== undefined),
    );
    return { ...parent.localeText, ...defined };
  }, [overrides, parent.localeText]);

  const locale = localeProp ?? parent.locale;
  const value = useMemo<LocaleContextValue>(() => ({ locale, localeText }), [locale, localeText]);

  return <LocaleContextProvider value={value}>{children}</LocaleContextProvider>;
}
