import { describe, expect, it } from "vitest";
import { createTheme } from "./create-theme";

describe("createTheme", () => {
  it("creates a valid theme with defaults", () => {
    const theme = createTheme();
    expect(theme).toHaveProperty("cssVariables");
    expect(theme).toHaveProperty("darkCssVariables");
    expect(theme).toHaveProperty("componentOverrides");
    expect(theme.cssVariables).toEqual({});
    expect(theme.darkCssVariables).toEqual({});
    expect(theme.componentOverrides).toEqual({});
  });

  it("returns an empty theme for an empty config", () => {
    const theme = createTheme({});
    expect(Object.keys(theme.cssVariables)).toHaveLength(0);
    expect(Object.keys(theme.darkCssVariables)).toHaveLength(0);
  });

  it("converts custom color overrides to CSS variables", () => {
    const theme = createTheme({
      tokens: {
        colors: {
          primary: "#6366f1",
          background: "#ffffff",
          error: "#ef4444",
        },
      },
    });

    expect(theme.cssVariables["--v-primary"]).toBe("#6366f1");
    expect(theme.cssVariables["--v-background"]).toBe("#ffffff");
    expect(theme.cssVariables["--v-error"]).toBe("#ef4444");
  });

  it("converts radius tokens to CSS variables", () => {
    const theme = createTheme({
      tokens: {
        radius: { md: "12px", lg: "16px", full: "9999px" },
      },
    });

    expect(theme.cssVariables["--v-radius-md"]).toBe("12px");
    expect(theme.cssVariables["--v-radius-lg"]).toBe("16px");
    expect(theme.cssVariables["--v-radius-full"]).toBe("9999px");
  });

  it("converts sizes tokens to CSS variables", () => {
    const theme = createTheme({
      tokens: {
        sizes: {
          md: { height: "44px", paddingX: "16px", fontSize: "14px" },
          sm: { height: "32px", gap: "4px" },
        },
      },
    });

    expect(theme.cssVariables["--v-size-md-height"]).toBe("44px");
    expect(theme.cssVariables["--v-size-md-padding-x"]).toBe("16px");
    expect(theme.cssVariables["--v-size-md-font-size"]).toBe("14px");
    expect(theme.cssVariables["--v-size-sm-height"]).toBe("32px");
    expect(theme.cssVariables["--v-size-sm-gap"]).toBe("4px");
  });

  it("converts spacing tokens to CSS variables", () => {
    const theme = createTheme({
      tokens: {
        spacing: { xs: "4px", md: "16px", xl: "32px" },
      },
    });

    expect(theme.cssVariables["--v-spacing-xs"]).toBe("4px");
    expect(theme.cssVariables["--v-spacing-md"]).toBe("16px");
    expect(theme.cssVariables["--v-spacing-xl"]).toBe("32px");
  });

  it("stores light and dark mode tokens separately", () => {
    const theme = createTheme({
      tokens: {
        colors: { background: "#ffffff", foreground: "#000000" },
      },
      darkTokens: {
        colors: { background: "#0a0a0a", foreground: "#fafafa" },
      },
    });

    expect(theme.cssVariables["--v-background"]).toBe("#ffffff");
    expect(theme.cssVariables["--v-foreground"]).toBe("#000000");
    expect(theme.darkCssVariables["--v-background"]).toBe("#0a0a0a");
    expect(theme.darkCssVariables["--v-foreground"]).toBe("#fafafa");
  });

  it("passes component overrides through unchanged", () => {
    const theme = createTheme({
      components: {
        VButton: {
          defaultProps: { variant: "outlined", size: "md" },
          styles: { root: "font-semibold" },
        },
      },
    });

    expect(theme.componentOverrides.VButton?.defaultProps?.variant).toBe("outlined");
    expect(theme.componentOverrides.VButton?.defaultProps?.size).toBe("md");
    expect(theme.componentOverrides.VButton?.styles?.root).toBe("font-semibold");
  });

  it("leaves undefined token values out of the CSS variables", () => {
    const theme = createTheme({
      tokens: {
        colors: { primary: "#6366f1" },
        radius: { md: "8px" },
      },
    });

    expect(theme.cssVariables["--v-primary"]).toBe("#6366f1");
    expect(theme.cssVariables["--v-radius-md"]).toBe("8px");
    // The undefined values must not exist
    expect(theme.cssVariables["--v-background"]).toBeUndefined();
    expect(theme.cssVariables["--v-radius-sm"]).toBeUndefined();
  });

  it("maps every color foreground pair to a CSS variable", () => {
    const theme = createTheme({
      tokens: {
        colors: {
          primary: "#1",
          primaryForeground: "#2",
          secondary: "#3",
          secondaryForeground: "#4",
          success: "#5",
          successForeground: "#6",
          warning: "#7",
          warningForeground: "#8",
          card: "#9",
          cardForeground: "#10",
          popover: "#11",
          popoverForeground: "#12",
        },
      },
    });

    expect(theme.cssVariables["--v-primary"]).toBe("#1");
    expect(theme.cssVariables["--v-primary-foreground"]).toBe("#2");
    expect(theme.cssVariables["--v-secondary"]).toBe("#3");
    expect(theme.cssVariables["--v-secondary-foreground"]).toBe("#4");
    expect(theme.cssVariables["--v-success"]).toBe("#5");
    expect(theme.cssVariables["--v-success-foreground"]).toBe("#6");
    expect(theme.cssVariables["--v-warning"]).toBe("#7");
    expect(theme.cssVariables["--v-warning-foreground"]).toBe("#8");
    expect(theme.cssVariables["--v-card"]).toBe("#9");
    expect(theme.cssVariables["--v-card-foreground"]).toBe("#10");
    expect(theme.cssVariables["--v-popover"]).toBe("#11");
    expect(theme.cssVariables["--v-popover-foreground"]).toBe("#12");
  });

  it("sets several token categories at once", () => {
    const theme = createTheme({
      tokens: {
        colors: { primary: "#6366f1" },
        radius: { md: "8px" },
        sizes: { md: { height: "40px" } },
        spacing: { md: "16px" },
      },
    });

    expect(theme.cssVariables["--v-primary"]).toBe("#6366f1");
    expect(theme.cssVariables["--v-radius-md"]).toBe("8px");
    expect(theme.cssVariables["--v-size-md-height"]).toBe("40px");
    expect(theme.cssVariables["--v-spacing-md"]).toBe("16px");
  });
});
