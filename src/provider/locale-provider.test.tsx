import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "../theme";
import { LocaleProvider, useLocaleContext } from "./locale-provider";
import { defaultLocaleText } from "./locale-text";

/** Test component that displays the useLocaleContext value */
function LocaleConsumer() {
  const { locale, localeText } = useLocaleContext();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="noData">{localeText.noData}</span>
      <span data-testid="loading">{localeText.loading}</span>
      <span data-testid="alertClose">{localeText.alertClose}</span>
    </div>
  );
}

/** ThemeProvider + LocaleProvider wrapper */
function renderWithLocale(
  ui: React.ReactElement,
  options?: { locale?: string; localeText?: Partial<typeof defaultLocaleText> },
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider>
        <LocaleProvider locale={options?.locale} localeText={options?.localeText}>
          {children}
        </LocaleProvider>
      </ThemeProvider>
    ),
  });
}

describe("LocaleProvider", () => {
  it("renders children", () => {
    renderWithLocale(<span>Hello</span>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("defaults to the en locale", () => {
    renderWithLocale(<LocaleConsumer />);
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
  });

  it("provides the default English text", () => {
    renderWithLocale(<LocaleConsumer />);
    expect(screen.getByTestId("noData")).toHaveTextContent("No data");
    expect(screen.getByTestId("loading")).toHaveTextContent("Loading...");
    expect(screen.getByTestId("alertClose")).toHaveTextContent("Close alert");
  });

  it("provides a custom locale and its text", () => {
    renderWithLocale(<LocaleConsumer />, {
      locale: "fr",
      localeText: { noData: "Nothing here", loading: "Please wait", alertClose: "Dismiss" },
    });

    expect(screen.getByTestId("locale")).toHaveTextContent("fr");
    expect(screen.getByTestId("noData")).toHaveTextContent("Nothing here");
    expect(screen.getByTestId("loading")).toHaveTextContent("Please wait");
    expect(screen.getByTestId("alertClose")).toHaveTextContent("Dismiss");
  });

  it("merges a partial override with the defaults", () => {
    renderWithLocale(<LocaleConsumer />, {
      localeText: { noData: "Empty" },
    });

    // Overridden value
    expect(screen.getByTestId("noData")).toHaveTextContent("Empty");
    // Values that are not overridden keep their defaults
    expect(screen.getByTestId("loading")).toHaveTextContent("Loading...");
  });

  it("lets children read the locale text with useLocaleContext", () => {
    function DeepChild() {
      const { localeText } = useLocaleContext();
      return <span data-testid="deep">{localeText.paginationNext}</span>;
    }

    renderWithLocale(
      <div>
        <DeepChild />
      </div>,
    );

    expect(screen.getByTestId("deep")).toHaveTextContent("Next page");
  });
});

const defaultTextOf = (key: "noData") => defaultLocaleText[key];

describe("LocaleProvider overrides", () => {
  it("ignores undefined entries instead of overwriting the defaults", () => {
    renderWithLocale(<LocaleConsumer />, {
      localeText: { noData: undefined, loading: "Wait" },
    });

    expect(screen.getByTestId("noData")).toHaveTextContent(defaultTextOf("noData"));
    expect(screen.getByTestId("loading")).toHaveTextContent("Wait");
  });

  it("keeps function entries when another entry is undefined", () => {
    function Overflow() {
      const { localeText } = useLocaleContext();
      return <span data-testid="overflow">{localeText.avatarGroupOverflow(3)}</span>;
    }

    renderWithLocale(<Overflow />, { localeText: { avatarGroupOverflow: undefined } });

    expect(screen.getByTestId("overflow")).toHaveTextContent(/3/);
  });

  it("builds a nested provider on the text and locale of its parent", () => {
    render(
      <LocaleProvider locale="fr" localeText={{ loading: "Please wait" }}>
        <LocaleProvider localeText={{ noData: "x" }}>
          <LocaleConsumer />
        </LocaleProvider>
      </LocaleProvider>,
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("fr");
    expect(screen.getByTestId("noData")).toHaveTextContent("x");
    expect(screen.getByTestId("loading")).toHaveTextContent("Please wait");
  });

  it("lets a nested provider set its own locale tag", () => {
    render(
      <LocaleProvider locale="fr">
        <LocaleProvider locale="en-GB">
          <LocaleConsumer />
        </LocaleProvider>
      </LocaleProvider>,
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("en-GB");
  });

  it("returns the English defaults outside a provider", () => {
    render(<LocaleConsumer />);

    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(screen.getByTestId("loading")).toHaveTextContent("Loading...");
  });
});
