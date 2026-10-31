import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, beforeEach, vi } from "vitest";
import { renderWithTheme, screen } from "../test-utils";
import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "./provider";
import { useTheme } from "../hooks/use-theme";
import { createTheme } from "./create-theme";

/** Test component that displays the useTheme value */
function ThemeConsumer() {
  const { resolvedColorScheme, componentOverrides } = useTheme();
  return (
    <div>
      <span data-testid="scheme">{resolvedColorScheme}</span>
      <span data-testid="overrides">{JSON.stringify(componentOverrides)}</span>
    </div>
  );
}

/** Test component with a button that calls toggleDark */
function ThemeToggler() {
  const { resolvedColorScheme, toggleDark } = useTheme();
  return (
    <div>
      <span data-testid="scheme">{resolvedColorScheme}</span>
      <button type="button" onClick={toggleDark}>
        toggle
      </button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    document.documentElement.removeAttribute("data-v-color-scheme");
  });

  it("renders children", () => {
    render(
      <ThemeProvider>
        <span>Hello</span>
      </ThemeProvider>,
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("provides the theme context", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    // system is the default and the matchMedia mock returns light
    expect(screen.getByTestId("scheme")).toHaveTextContent("light");
    expect(screen.getByTestId("overrides")).toHaveTextContent("{}");
  });

  it('applies light mode with defaultColorScheme="light"', () => {
    render(
      <ThemeProvider defaultColorScheme="light">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("scheme")).toHaveTextContent("light");
  });

  it('applies dark mode with defaultColorScheme="dark"', () => {
    render(
      <ThemeProvider defaultColorScheme="dark">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("scheme")).toHaveTextContent("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.getAttribute("data-v-color-scheme")).toBe("dark");
  });

  it("accepts a custom theme config object", () => {
    render(
      <ThemeProvider
        theme={{
          components: {
            VButton: { defaultProps: { variant: "outlined" } },
          },
        }}
      >
        <ThemeConsumer />
      </ThemeProvider>,
    );

    const overrides = JSON.parse(screen.getByTestId("overrides").textContent ?? "{}");
    expect(overrides.VButton.defaultProps.variant).toBe("outlined");
  });

  it("accepts a createTheme() result (VResolvedTheme) directly", () => {
    const resolved = createTheme({
      components: {
        VCard: { styles: { root: "shadow-lg" } },
      },
    });

    render(
      <ThemeProvider theme={resolved}>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    const overrides = JSON.parse(screen.getByTestId("overrides").textContent ?? "{}");
    expect(overrides.VCard.styles.root).toBe("shadow-lg");
  });

  it("switches between light and dark with toggleDark", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultColorScheme="light">
        <ThemeToggler />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("scheme")).toHaveTextContent("light");

    await user.click(screen.getByRole("button", { name: "toggle" }));
    expect(screen.getByTestId("scheme")).toHaveTextContent("dark");
  });

  it("saves color scheme changes to localStorage", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultColorScheme="light" storageKey="test-scheme">
        <ThemeToggler />
      </ThemeProvider>,
    );

    await user.click(screen.getByRole("button", { name: "toggle" }));
    expect(localStorage.getItem("test-scheme")).toBe("dark");
  });

  it("restores the color scheme saved in localStorage", () => {
    localStorage.setItem("volo-color-scheme", "dark");

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("scheme")).toHaveTextContent("dark");
  });

  it("applies CSS variable overrides to the document", () => {
    render(
      <ThemeProvider
        theme={{ tokens: { colors: { primary: "#6366f1" } } }}
        defaultColorScheme="light"
      >
        <span>test</span>
      </ThemeProvider>,
    );

    expect(document.documentElement.style.getPropertyValue("--v-primary")).toBe("#6366f1");
  });

  it("wraps in a ThemeProvider with the renderWithTheme helper", () => {
    renderWithTheme(<ThemeConsumer />);
    expect(screen.getByTestId("scheme")).toHaveTextContent("light");
  });

  it("applies darkTokens only in dark mode and removes them when back to light", async () => {
    const theme = createTheme({
      tokens: { colors: { primary: "#111111" } },
      darkTokens: { colors: { primary: "#eeeeee" } },
    });
    render(
      <ThemeProvider theme={theme} defaultColorScheme="light">
        <ThemeToggler />
      </ThemeProvider>,
    );
    const root = document.documentElement;
    expect(root.style.getPropertyValue("--v-primary")).toBe("#111111");
    await userEvent.click(screen.getByRole("button"));
    expect(root.style.getPropertyValue("--v-primary")).toBe("#eeeeee");
    await userEvent.click(screen.getByRole("button"));
    expect(root.style.getPropertyValue("--v-primary")).toBe("#111111");
  });

  it("removes the injected CSS variables on unmount", () => {
    const { unmount } = render(
      <ThemeProvider theme={{ tokens: { colors: { primary: "#6366f1" } } }}>
        <span>test</span>
      </ThemeProvider>,
    );
    unmount();
    expect(document.documentElement.style.getPropertyValue("--v-primary")).toBe("");
  });

  it("saves to and restores from the key given by storageKey", async () => {
    localStorage.setItem("my-key", "dark");
    render(
      <ThemeProvider storageKey="my-key">
        <ThemeToggler />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("scheme")).toHaveTextContent("dark");
    await userEvent.click(screen.getByRole("button"));
    expect(localStorage.getItem("my-key")).toBe("light");
    expect(localStorage.getItem("volo-color-scheme")).toBeNull();
  });

  it("follows prefers-color-scheme changes when set to system", () => {
    let listener: ((e: MediaQueryListEvent) => void) | undefined;
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      addEventListener: (_: string, l: (e: MediaQueryListEvent) => void) => (listener = l),
      removeEventListener: () => {},
    })) as unknown as typeof window.matchMedia;
    try {
      render(
        <ThemeProvider defaultColorScheme="system">
          <ThemeConsumer />
        </ThemeProvider>,
      );
      expect(screen.getByTestId("scheme")).toHaveTextContent("light");
      act(() => listener?.({ matches: true } as MediaQueryListEvent));
      expect(screen.getByTestId("scheme")).toHaveTextContent("dark");
    } finally {
      window.matchMedia = original;
    }
  });
});

describe("ThemeProvider robustness", () => {
  const root = document.documentElement;

  beforeEach(() => {
    localStorage.clear();
    root.classList.remove("dark");
    root.removeAttribute("data-v-color-scheme");
    root.removeAttribute("style");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders when reading localStorage throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("blocked", "SecurityError");
    });

    render(
      <ThemeProvider defaultColorScheme="light">
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("scheme")).toHaveTextContent("light");
  });

  it("still switches the scheme when writing localStorage throws", async () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("full", "QuotaExceededError");
    });
    const user = userEvent.setup();
    const onError = vi.fn((e: ErrorEvent) => e.preventDefault());
    window.addEventListener("error", onError);

    render(
      <ThemeProvider defaultColorScheme="light">
        <ThemeToggler />
      </ThemeProvider>,
    );
    await user.click(screen.getByRole("button", { name: "toggle" }));
    window.removeEventListener("error", onError);

    expect(screen.getByTestId("scheme")).toHaveTextContent("dark");
    expect(onError).not.toHaveBeenCalled();
  });

  it("hydrates without a mismatch when the stored scheme is dark", () => {
    localStorage.setItem("volo-color-scheme", "dark");
    const ui = (
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    const html = renderToString(ui);
    expect(html).toContain("light");

    const host = document.createElement("div");
    host.innerHTML = html;
    document.body.appendChild(host);
    const onRecoverableError = vi.fn();
    let hydrated: ReturnType<typeof hydrateRoot> | undefined;
    act(() => {
      hydrated = hydrateRoot(host, ui, { onRecoverableError });
    });

    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(host.querySelector('[data-testid="scheme"]')).toHaveTextContent("dark");
    act(() => hydrated?.unmount());
    host.remove();
  });

  it("sets the native color-scheme property", () => {
    const { unmount } = render(
      <ThemeProvider defaultColorScheme="dark">
        <span>x</span>
      </ThemeProvider>,
    );
    expect(root.style.colorScheme).toBe("dark");

    unmount();
    expect(root.style.colorScheme).toBe("");
  });

  it("removes the dark class and the attribute on unmount", () => {
    const { unmount } = render(
      <ThemeProvider defaultColorScheme="dark">
        <span>x</span>
      </ThemeProvider>,
    );
    expect(root.classList.contains("dark")).toBe(true);

    unmount();

    expect(root.classList.contains("dark")).toBe(false);
    expect(root.hasAttribute("data-v-color-scheme")).toBe(false);
  });

  it("restores an inline variable that was set before mounting", () => {
    root.style.setProperty("--v-primary", "red");

    const { unmount } = render(
      <ThemeProvider theme={{ tokens: { colors: { primary: "#6366f1" } } }}>
        <span>x</span>
      </ThemeProvider>,
    );
    expect(root.style.getPropertyValue("--v-primary")).toBe("#6366f1");

    unmount();
    expect(root.style.getPropertyValue("--v-primary")).toBe("red");
  });

  it("lets nested providers unmount without wiping each other's variables", () => {
    const outerTheme = { tokens: { colors: { primary: "#111111" } } };
    const innerTheme = { tokens: { colors: { primary: "#222222" } } };

    const { rerender } = render(
      <ThemeProvider theme={outerTheme}>
        <ThemeProvider theme={innerTheme}>
          <span>x</span>
        </ThemeProvider>
      </ThemeProvider>,
    );
    // The provider claimed last (the outer one, whose effect runs after its child's) is in effect
    expect(root.style.getPropertyValue("--v-primary")).toBe("#111111");

    rerender(
      <ThemeProvider theme={outerTheme}>
        <span>x</span>
      </ThemeProvider>,
    );

    expect(root.style.getPropertyValue("--v-primary")).toBe("#111111");

    rerender(<span>x</span>);
    expect(root.style.getPropertyValue("--v-primary")).toBe("");
  });
});
