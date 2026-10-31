import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VAlert } from "./v-alert";

describe("VAlert", () => {
  it('renders with role="alert"', () => {
    renderWithTheme(<VAlert>Message</VAlert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Message")).toBeInTheDocument();
  });

  it("applies the severity prop", () => {
    renderWithTheme(<VAlert severity="success">OK</VAlert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-v-severity", "success");
  });

  it("applies the variant prop", () => {
    renderWithTheme(<VAlert variant="filled">Filled</VAlert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-v-variant", "filled");
  });

  it("renders the title", () => {
    renderWithTheme(<VAlert title="Alert Title">Body</VAlert>);
    expect(screen.getByText("Alert Title")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("shows the close button when onClose is set", () => {
    const onClose = vi.fn();
    renderWithTheme(<VAlert onClose={onClose}>Closable</VAlert>);
    expect(screen.getByRole("button", { name: "Close alert" })).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VAlert onClose={onClose}>Close me</VAlert>);
    await user.click(screen.getByRole("button", { name: "Close alert" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders the action", () => {
    renderWithTheme(<VAlert action={<button>Undo</button>}>Action alert</VAlert>);
    expect(screen.getByText("Undo")).toBeInTheDocument();
  });

  it("hides the icon when icon={false}", () => {
    const { container } = renderWithTheme(<VAlert icon={false}>No icon</VAlert>);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(0);
  });

  it("merges className", () => {
    renderWithTheme(<VAlert className="custom-alert">C</VAlert>);
    const alert = screen.getByRole("alert");
    expect(alert.className).toContain("custom-alert");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VAlert ref={ref}>Ref</VAlert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(
      <VAlert severity="warning" title="Warning">
        Check this
      </VAlert>,
    );
    await axeTest(container);
  });
  it("forwards native div attributes", () => {
    renderWithTheme(<VAlert data-testid="a" id="x" />);
    expect(screen.getByTestId("a")).toHaveAttribute("id", "x");
  });
});

describe("VAlert colour classes", () => {
  const source = readFileSync(resolve(import.meta.dirname, "v-alert.tsx"), "utf8");
  const severities = ["default", "success", "info", "warning", "error"] as const;
  const variants = ["filled", "outlined", "standard"] as const;

  // Tailwind only generates classes it finds as whole strings in the source, so each class an alert
  // can render must appear there literally (a template literal that builds it from parts hides it).
  it.each(
    variants.flatMap((variant) => severities.map((severity) => [variant, severity] as const)),
  )("writes every %s / %s class out in full in the source", (variant, severity) => {
    renderWithTheme(
      <VAlert variant={variant} severity={severity}>
        msg
      </VAlert>,
    );
    const classes = screen.getByRole("alert").className.split(/\s+/);
    const colourClasses = classes.filter((c) => /^(bg|text|border)-\[var\(--v-/.test(c));
    expect(colourClasses.length).toBeGreaterThan(0);
    for (const cls of colourClasses) {
      expect(source).toContain(cls);
    }
    expect(source).not.toMatch(/`[^`]*\b(bg|text|border)-\[\$\{/);
  });

  it("tints the standard info alert with the info colour and keeps its text readable", () => {
    const { container } = renderWithTheme(
      <VAlert variant="standard" severity="info" title="Heads up">
        msg
      </VAlert>,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("bg-[var(--v-info)]/10", "text-[var(--v-foreground)]");
    expect(alert).not.toHaveClass("text-[var(--v-info)]");
    // The severity colour is kept for the icon
    expect(container.querySelector("svg")?.parentElement).toHaveClass("text-[var(--v-info)]");
  });

  it.each(["outlined", "standard"] as const)(
    "%s alerts use the foreground colour for the text in every severity",
    (variant) => {
      for (const severity of ["default", "success", "info", "warning", "error"] as const) {
        const { unmount } = renderWithTheme(
          <VAlert variant={variant} severity={severity}>
            msg
          </VAlert>,
        );
        expect(screen.getByRole("alert")).toHaveClass("text-[var(--v-foreground)]");
        unmount();
      }
    },
  );

  it("borders the outlined warning alert with the warning colour", () => {
    renderWithTheme(
      <VAlert variant="outlined" severity="warning">
        msg
      </VAlert>,
    );
    expect(screen.getByRole("alert")).toHaveClass("border", "border-[var(--v-warning)]");
  });
});
