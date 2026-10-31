import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import { useTheme } from "./use-theme";
import { ThemeProvider } from "../theme/provider";

function wrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe("useTheme", () => {
  it("returns resolvedColorScheme inside a ThemeProvider", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.resolvedColorScheme).toMatch(/^(light|dark)$/);
  });

  it("switches the color scheme with toggleDark", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    const initial = result.current.resolvedColorScheme;

    act(() => {
      result.current.toggleDark();
    });

    expect(result.current.resolvedColorScheme).not.toBe(initial);
  });

  it("sets a specific scheme with setColorScheme", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setColorScheme("dark");
    });

    expect(result.current.resolvedColorScheme).toBe("dark");

    act(() => {
      result.current.setColorScheme("light");
    });

    expect(result.current.resolvedColorScheme).toBe("light");
  });

  it("returns the componentOverrides object", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.componentOverrides).toBeDefined();
    expect(typeof result.current.componentOverrides).toBe("object");
  });

  it("throws without a ThemeProvider", () => {
    // createSafeContext was created without a defaultValue, so it throws outside a Provider
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow(/useTheme must be used within a ThemeProvider/);
  });
});
