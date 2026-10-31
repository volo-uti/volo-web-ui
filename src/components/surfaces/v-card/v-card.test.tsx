import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VCard } from "./v-card";

describe("VCard", () => {
  it("renders by default", () => {
    renderWithTheme(<VCard>Content</VCard>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies the variant prop", () => {
    const { container } = renderWithTheme(<VCard variant="outlined">Content</VCard>);
    const card = container.querySelector(".v-card");
    expect(card).toHaveAttribute("data-v-variant", "outlined");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VCard ref={ref}>Content</VCard>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("calls onClick when an interactive card is clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <VCard interactive onClick={onClick}>
        Press
      </VCard>,
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClick on Enter / Space for an interactive card", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <VCard interactive onClick={onClick}>
        Press
      </VCard>,
    );
    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("is an article and not focusable when not interactive", () => {
    renderWithTheme(<VCard>Plain</VCard>);
    expect(screen.getByRole("article")).not.toHaveAttribute("tabindex");
  });

  it("passes as and native attributes through", () => {
    const { container } = renderWithTheme(
      <VCard as="section" data-testid="card">
        S
      </VCard>,
    );
    expect(container.querySelector("section.v-card")).toHaveAttribute("data-testid", "card");
  });

  it("lets Enter and Space activate a nested button instead of swallowing them", async () => {
    const user = userEvent.setup();
    const inner = vi.fn();
    renderWithTheme(
      <VCard interactive>
        <button type="button" onClick={inner}>
          inner
        </button>
      </VCard>,
    );
    screen.getByText("inner").focus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(inner).toHaveBeenCalledTimes(2);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VCard>Content</VCard>);
    await axeTest(container);
  });
});
