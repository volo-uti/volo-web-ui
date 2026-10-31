import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { VoloProvider } from "./volo-provider";
import { useTheme } from "../hooks/use-theme";
import { useLocaleContext } from "./locale-provider";
import { createTheme } from "../theme/create-theme";

/** Test component that displays both the Theme and Locale context values */
function ContextConsumer() {
  const { resolvedColorScheme, componentOverrides } = useTheme();
  const { locale, localeText } = useLocaleContext();
  return (
    <div>
      <span data-testid="scheme">{resolvedColorScheme}</span>
      <span data-testid="overrides">{JSON.stringify(componentOverrides)}</span>
      <span data-testid="locale">{locale}</span>
      <span data-testid="noData">{localeText.noData}</span>
    </div>
  );
}

describe("VoloProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    document.documentElement.removeAttribute("data-v-color-scheme");
  });

  it("renders children", () => {
    render(
      <VoloProvider>
        <span>App Content</span>
      </VoloProvider>,
    );
    expect(screen.getByText("App Content")).toBeInTheDocument();
  });

  it("provides the theme and locale contexts together", () => {
    render(
      <VoloProvider>
        <ContextConsumer />
      </VoloProvider>,
    );

    expect(screen.getByTestId("scheme")).toHaveTextContent("light");
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(screen.getByTestId("noData")).toHaveTextContent("No data");
  });

  it("accepts a custom theme", () => {
    const customTheme = createTheme({
      components: {
        VButton: { defaultProps: { variant: "ghost" } },
      },
    });

    render(
      <VoloProvider theme={customTheme}>
        <ContextConsumer />
      </VoloProvider>,
    );

    const overrides = JSON.parse(screen.getByTestId("overrides").textContent ?? "{}");
    expect(overrides.VButton.defaultProps.variant).toBe("ghost");
  });

  it("accepts a theme config object directly", () => {
    render(
      <VoloProvider
        theme={{
          components: {
            VCard: { styles: { root: "rounded-xl" } },
          },
        }}
      >
        <ContextConsumer />
      </VoloProvider>,
    );

    const overrides = JSON.parse(screen.getByTestId("overrides").textContent ?? "{}");
    expect(overrides.VCard.styles.root).toBe("rounded-xl");
  });

  it("can set a custom locale and text", () => {
    render(
      <VoloProvider locale="fr" localeText={{ noData: "Nothing here" }}>
        <ContextConsumer />
      </VoloProvider>,
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("fr");
    expect(screen.getByTestId("noData")).toHaveTextContent("Nothing here");
  });

  it("customizes theme and locale at the same time", () => {
    render(
      <VoloProvider
        theme={{ tokens: { colors: { primary: "#10b981" } } }}
        defaultColorScheme="dark"
        locale="fr"
        localeText={{ noData: "Nothing here" }}
      >
        <ContextConsumer />
      </VoloProvider>,
    );

    expect(screen.getByTestId("scheme")).toHaveTextContent("dark");
    expect(screen.getByTestId("locale")).toHaveTextContent("fr");
    expect(screen.getByTestId("noData")).toHaveTextContent("Nothing here");
    expect(document.documentElement.style.getPropertyValue("--v-primary")).toBe("#10b981");
  });

  it("accepts defaultColorScheme", () => {
    render(
      <VoloProvider defaultColorScheme="dark">
        <ContextConsumer />
      </VoloProvider>,
    );

    expect(screen.getByTestId("scheme")).toHaveTextContent("dark");
  });

  it("accepts storageKey", () => {
    localStorage.setItem("my-app-scheme", "dark");

    render(
      <VoloProvider storageKey="my-app-scheme">
        <ContextConsumer />
      </VoloProvider>,
    );

    expect(screen.getByTestId("scheme")).toHaveTextContent("dark");
  });
});
