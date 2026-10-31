"use client";

import { useLocaleContext } from "../provider/locale-provider";
import type { VoloLocaleText } from "../provider/locale-text";

/**
 * Returns the current locale tag.
 *
 * @example
 * const locale = useLocale() // 'en'
 */
export function useLocale(): string {
  return useLocaleContext().locale;
}

/**
 * Returns the resolved UI text.
 *
 * @example
 * const { noData } = useLocaleText()
 */
export function useLocaleText(): VoloLocaleText {
  return useLocaleContext().localeText;
}
