import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VLabel } from "./v-label";

describe("VLabel", () => {
  it("renders a label tag", () => {
    renderWithTheme(<VLabel>Username</VLabel>);
    const label = screen.getByText("Username");
    expect(label.tagName).toBe("LABEL");
  });

  it("applies htmlFor", () => {
    renderWithTheme(<VLabel htmlFor="email-input">Email</VLabel>);
    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("for", "email-input");
  });

  it("renders the required mark (*)", () => {
    renderWithTheme(<VLabel required>Required</VLabel>);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("changes the mark character with requiredMark", () => {
    renderWithTheme(
      <VLabel required requiredMark="(required)">
        Name
      </VLabel>,
    );
    expect(screen.getByText("(required)")).toBeInTheDocument();
  });

  it("applies the size prop", () => {
    const { container } = renderWithTheme(<VLabel size="lg">Large</VLabel>);
    expect(container.querySelector('[data-v-size="lg"]')).toBeInTheDocument();
  });

  it("merges className", () => {
    renderWithTheme(<VLabel className="my-label">Custom</VLabel>);
    const label = screen.getByText("Custom");
    expect(label.className).toContain("my-label");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLLabelElement>();
    renderWithTheme(<VLabel ref={ref}>Ref</VLabel>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(
      <div>
        <VLabel htmlFor="test-input">Accessible</VLabel>
        <input id="test-input" />
      </div>,
    );
    await axeTest(container);
  });
});
