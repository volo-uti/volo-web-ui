import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { useLocale, useLocaleText } from "./use-locale";
import { LocaleProvider } from "../provider/locale-provider";
import { defaultLocaleText } from "../provider/locale-text";

function wrapper({ children }: { children: ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>;
}

function wrapperWithLocale(locale: string, localeText?: Record<string, unknown>) {
  return function LocaleWrapper({ children }: { children: ReactNode }) {
    return (
      <LocaleProvider locale={locale} localeText={localeText as never}>
        {children}
      </LocaleProvider>
    );
  };
}

describe("useLocale", () => {
  it('returns the default locale "en"', () => {
    const { result } = renderHook(() => useLocale(), { wrapper });
    expect(result.current).toBe("en");
  });

  it("returns a custom locale", () => {
    const { result } = renderHook(() => useLocale(), {
      wrapper: wrapperWithLocale("fr"),
    });
    expect(result.current).toBe("fr");
  });
});

describe("useLocaleText", () => {
  it("returns the default English localeText", () => {
    const { result } = renderHook(() => useLocaleText(), { wrapper });
    expect(result.current.noData).toBe(defaultLocaleText.noData);
    expect(result.current.loading).toBe("Loading...");
    expect(result.current.alertClose).toBe("Close alert");
  });

  it("applies custom localeText overrides", () => {
    const { result } = renderHook(() => useLocaleText(), {
      wrapper: wrapperWithLocale("en", {
        noData: "Nothing here",
        loading: "Please wait...",
      }),
    });
    expect(result.current.noData).toBe("Nothing here");
    expect(result.current.loading).toBe("Please wait...");
    // Values that are not overridden keep their defaults
    expect(result.current.alertClose).toBe(defaultLocaleText.alertClose);
  });

  it("works with defaults without a Provider (createSafeContext default)", () => {
    // LocaleProvider has defaults, so it must work without a Provider
    const { result } = renderHook(() => useLocaleText());
    expect(result.current.noData).toBe("No data");
  });
});
