"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createTheme,
  type VComponentOverrides,
  type VResolvedTheme,
  type VThemeConfig,
} from "./create-theme";
import { defaultTheme } from "./default-theme";

// -----------------------------------------
// Context
// -----------------------------------------

/** Light, dark or system. */
export type VColorScheme = "light" | "dark" | "system";

/** Theme context value. */
export interface VThemeContextValue {
  /** Colour scheme in effect, with `'system'` resolved to light or dark. */
  resolvedColorScheme: "light" | "dark";
  /** Switches between light and dark. */
  toggleDark: () => void;
  /** Sets the colour scheme and stores it. */
  setColorScheme: (scheme: VColorScheme) => void;
  /** Component overrides from the theme, by component name. */
  componentOverrides: VComponentOverrides;
}

/** Context behind `ThemeProvider`; read it with `useTheme`. */
export const ThemeContext = createContext<VThemeContextValue | undefined>(undefined);

export { defaultTheme };

// -----------------------------------------
// ThemeProvider
// -----------------------------------------

/** Props of ThemeProvider. */
export interface ThemeProviderProps {
  /** A `createTheme()` result or a plain theme config. */
  theme?: VThemeConfig | VResolvedTheme;
  /**
   * Colour scheme used when nothing is stored yet.
   *
   * @default 'system'
   */
  defaultColorScheme?: VColorScheme;
  /**
   * localStorage key that remembers the chosen colour scheme.
   *
   * @default 'volo-color-scheme'
   */
  storageKey?: string;
  /** The app subtree. */
  children: ReactNode;
}

function isResolvedTheme(t: unknown): t is VResolvedTheme {
  return typeof t === "object" && t !== null && "cssVariables" in t && "componentOverrides" in t;
}

function getSystemScheme(): "light" | "dark" {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Reads the stored scheme; storage can throw (blocked cookies, sandboxed iframe). */
function readStoredScheme(key: string): VColorScheme | null {
  try {
    const stored = localStorage.getItem(key);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    // Storage is unavailable; the scheme just is not remembered
  }
  return null;
}

function writeStoredScheme(key: string, scheme: VColorScheme): void {
  try {
    localStorage.setItem(key, scheme);
  } catch {
    // Storage is unavailable or full; the choice still applies for this session
  }
}

/** Reads and writes one thing on `<html>`: a style property, an attribute or a class. */
interface RootProperty {
  get: () => string | null;
  set: (value: string | null) => void;
}

/**
 * What the providers have put on `<html>`, by property. The value in effect is the one claimed
 * last; when every claim is released the value from before the first claim comes back. This keeps
 * an inline value the app set itself, and lets nested providers unmount in any order.
 */
const claimed = new Map<
  string,
  { base: string | null; owners: { id: string; value: string | null }[] }
>();

function claimRootProperty(key: string, id: string, value: string | null, property: RootProperty) {
  let entry = claimed.get(key);
  if (!entry) {
    entry = { base: property.get(), owners: [] };
    claimed.set(key, entry);
  }
  entry.owners.push({ id, value });
  property.set(value);
}

function releaseRootProperty(key: string, id: string, property: RootProperty) {
  const entry = claimed.get(key);
  if (!entry) return;
  entry.owners = entry.owners.filter((owner) => owner.id !== id);
  if (entry.owners.length === 0) {
    claimed.delete(key);
    property.set(entry.base);
  } else {
    property.set(entry.owners[entry.owners.length - 1]?.value ?? null);
  }
}

const rootProperties = {
  darkClass: {
    get: () => (document.documentElement.classList.contains("dark") ? "dark" : null),
    set: (value) => document.documentElement.classList.toggle("dark", value === "dark"),
  },
  schemeAttribute: {
    get: () => document.documentElement.getAttribute("data-v-color-scheme"),
    set: (value) => {
      if (value === null) document.documentElement.removeAttribute("data-v-color-scheme");
      else document.documentElement.setAttribute("data-v-color-scheme", value);
    },
  },
  colorScheme: {
    get: () => document.documentElement.style.colorScheme || null,
    set: (value) => {
      document.documentElement.style.colorScheme = value ?? "";
    },
  },
} satisfies Record<string, RootProperty>;

const styleVariable = (name: string): RootProperty => ({
  get: () => document.documentElement.style.getPropertyValue(name) || null,
  set: (value) => {
    if (value === null) document.documentElement.style.removeProperty(name);
    else document.documentElement.style.setProperty(name, value);
  },
});

// useLayoutEffect warns on the server in older React; this runs before paint on the client.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Applies the theme's CSS variables and holds the colour scheme.
 *
 * Sets the `dark` class on `<html>`, follows the system preference and stores the choice.
 *
 * @example
 * <ThemeProvider theme={createTheme({ tokens: { colors: { primary: '#6366f1' } } })}>
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({
  theme: themeInput,
  defaultColorScheme = "system",
  storageKey = "volo-color-scheme",
  children,
}: ThemeProviderProps) {
  const resolved: VResolvedTheme = useMemo(() => {
    if (!themeInput) return createTheme();
    if (isResolvedTheme(themeInput)) return themeInput;
    return createTheme(themeInput);
  }, [themeInput]);

  // The first render matches the server (no storage, no media query); the stored and system
  // values are read in a layout effect, so hydration agrees and nothing paints in the wrong scheme.
  const [colorScheme, setColorSchemeState] = useState<VColorScheme>(defaultColorScheme);
  const [systemScheme, setSystemScheme] = useState<"light" | "dark">("light");

  const resolvedColorScheme = colorScheme === "system" ? systemScheme : colorScheme;

  useIsomorphicLayoutEffect(() => {
    const stored = readStoredScheme(storageKey);
    if (stored) setColorSchemeState(stored);
    setSystemScheme(getSystemScheme());
  }, [storageKey]);

  // Watch system prefers-color-scheme changes
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setSystemScheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const ownerId = useId();

  // Apply the dark class, the attribute and the native `color-scheme` to <html>
  useIsomorphicLayoutEffect(() => {
    const entries = [
      ["dark-class", resolvedColorScheme === "dark" ? "dark" : null, rootProperties.darkClass],
      ["scheme-attribute", resolvedColorScheme, rootProperties.schemeAttribute],
      ["color-scheme", resolvedColorScheme, rootProperties.colorScheme],
    ] as const;
    for (const [key, value, property] of entries) claimRootProperty(key, ownerId, value, property);

    return () => {
      for (const [key, , property] of entries) releaseRootProperty(key, ownerId, property);
    };
  }, [resolvedColorScheme, ownerId]);

  // Inject CSS Variables overrides
  useIsomorphicLayoutEffect(() => {
    const vars =
      resolvedColorScheme === "dark" && Object.keys(resolved.darkCssVariables).length > 0
        ? { ...resolved.cssVariables, ...resolved.darkCssVariables }
        : resolved.cssVariables;

    for (const [name, value] of Object.entries(vars)) {
      claimRootProperty(`var:${name}`, ownerId, value, styleVariable(name));
    }

    return () => {
      for (const name of Object.keys(vars)) {
        releaseRootProperty(`var:${name}`, ownerId, styleVariable(name));
      }
    };
  }, [resolved.cssVariables, resolved.darkCssVariables, resolvedColorScheme, ownerId]);

  const setColorScheme = useCallback(
    (scheme: VColorScheme) => {
      setColorSchemeState(scheme);
      writeStoredScheme(storageKey, scheme);
    },
    [storageKey],
  );

  const toggleDark = useCallback(() => {
    setColorScheme(resolvedColorScheme === "dark" ? "light" : "dark");
  }, [resolvedColorScheme, setColorScheme]);

  const contextValue = useMemo<VThemeContextValue>(
    () => ({
      resolvedColorScheme,
      toggleDark,
      setColorScheme,
      componentOverrides: resolved.componentOverrides,
    }),
    [resolved, resolvedColorScheme, toggleDark, setColorScheme],
  );

  return <ThemeContext value={contextValue}>{children}</ThemeContext>;
}
