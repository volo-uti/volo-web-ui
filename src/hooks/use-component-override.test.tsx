import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { useComponentOverride } from "./use-component-override";
import { ThemeProvider } from "../theme/provider";
import { createTheme } from "../theme/create-theme";

function wrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

function wrapperWithOverrides(children: ReactNode) {
  const theme = createTheme({
    components: {
      VButton: {
        defaultProps: { variant: "outlined", size: "lg" },
        styles: { root: "font-bold" },
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

describe("useComponentOverride", () => {
  it("returns undefined for a component without overrides", () => {
    const { result } = renderHook(() => useComponentOverride("VButton"), {
      wrapper,
    });
    expect(result.current).toBeUndefined();
  });

  it("returns the registered override", () => {
    const { result } = renderHook(() => useComponentOverride("VButton"), {
      wrapper: ({ children }) => wrapperWithOverrides(children),
    });

    expect(result.current).toBeDefined();
    expect(result.current?.defaultProps?.variant).toBe("outlined");
    expect(result.current?.defaultProps?.size).toBe("lg");
    expect(result.current?.styles?.root).toBe("font-bold");
  });

  it("returns undefined for an unregistered component (theme with overrides)", () => {
    const { result } = renderHook(() => useComponentOverride("VTextField"), {
      wrapper: ({ children }) => wrapperWithOverrides(children),
    });
    expect(result.current).toBeUndefined();
  });

  it("looks up overrides of several components independently", () => {
    const theme = createTheme({
      components: {
        VButton: { defaultProps: { variant: "filled" } },
        VCard: { styles: { root: "shadow-lg" } },
      },
    });

    const multiWrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    );

    const { result: btnResult } = renderHook(() => useComponentOverride("VButton"), {
      wrapper: multiWrapper,
    });
    const { result: cardResult } = renderHook(() => useComponentOverride("VCard"), {
      wrapper: multiWrapper,
    });

    expect(btnResult.current?.defaultProps?.variant).toBe("filled");
    expect(cardResult.current?.styles?.root).toBe("shadow-lg");
  });
});
