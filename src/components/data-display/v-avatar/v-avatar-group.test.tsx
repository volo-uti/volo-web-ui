import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VAvatar } from "./v-avatar";
import { VAvatarGroup } from "./v-avatar-group";

describe("VAvatarGroup", () => {
  it("renders by default", () => {
    renderWithTheme(
      <VAvatarGroup>
        <VAvatar fallback="A" />
        <VAvatar fallback="B" />
      </VAvatarGroup>,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("shows the surplus when over max", () => {
    renderWithTheme(
      <VAvatarGroup max={2}>
        <VAvatar fallback="A" />
        <VAvatar fallback="B" />
        <VAvatar fallback="C" />
        <VAvatar fallback="D" />
      </VAvatarGroup>,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("+2 more")).toBeInTheDocument();
    expect(screen.queryByText("C")).not.toBeInTheDocument();
  });

  it("uses a custom renderSurplus renderer", () => {
    renderWithTheme(
      <VAvatarGroup max={1} renderSurplus={(n) => <span data-testid="surplus">{n} more</span>}>
        <VAvatar fallback="A" />
        <VAvatar fallback="B" />
      </VAvatarGroup>,
    );
    expect(screen.getByTestId("surplus")).toHaveTextContent("1 more");
  });

  it('sets role="group"', () => {
    renderWithTheme(
      <VAvatarGroup>
        <VAvatar fallback="A" />
      </VAvatarGroup>,
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <VAvatarGroup ref={ref}>
        <VAvatar fallback="A" />
      </VAvatarGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("merges className", () => {
    renderWithTheme(
      <VAvatarGroup className="custom">
        <VAvatar fallback="A" />
      </VAvatarGroup>,
    );
    expect(screen.getByRole("group").className).toContain("custom");
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(
      <VAvatarGroup>
        <VAvatar fallback="A" />
        <VAvatar fallback="B" />
      </VAvatarGroup>,
    );
    await axeTest(container);
  });
});

describe("VAvatarGroup max limits", () => {
  const renderMax = (max: number) =>
    renderWithTheme(
      <VAvatarGroup max={max}>
        <VAvatar fallback="A" />
        <VAvatar fallback="B" />
        <VAvatar fallback="C" />
      </VAvatarGroup>,
    );

  it("treats a negative max as zero visible avatars", () => {
    renderMax(-1);
    expect(screen.queryByText("A")).toBeNull();
    expect(screen.getByText("+3 more")).toBeInTheDocument();
  });

  it("floors a fractional max", () => {
    renderMax(2.5);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.queryByText("C")).toBeNull();
    expect(screen.getByText("+1 more")).toBeInTheDocument();
  });

  it("shows every avatar when max is NaN", () => {
    renderMax(Number.NaN);
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.queryByText(/more/)).toBeNull();
  });
});
