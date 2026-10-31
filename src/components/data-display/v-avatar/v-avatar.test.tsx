import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VAvatar } from "./v-avatar";

describe("VAvatar", () => {
  it("renders by default", () => {
    renderWithTheme(<VAvatar fallback="JD" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders an img when src is set", () => {
    const { container } = renderWithTheme(<VAvatar src="/photo.jpg" alt="User" />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/photo.jpg");
    expect(img).toHaveAttribute("alt", "User");
  });

  it("shows the fallback when src is missing", () => {
    renderWithTheme(<VAvatar fallback="AB" />);
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("applies the size prop", () => {
    const { container } = renderWithTheme(<VAvatar fallback="S" size="lg" />);
    const el = container.querySelector('[data-v-size="lg"]');
    expect(el).toBeInTheDocument();
  });

  it("applies the shape prop", () => {
    const { container } = renderWithTheme(<VAvatar fallback="S" shape="square" />);
    const el = container.querySelector('[data-v-shape="square"]');
    expect(el).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VAvatar fallback="C" className="custom-class" />);
    expect(container.firstElementChild?.className).toContain("custom-class");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VAvatar ref={ref} fallback="R" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("calls onClick on click and Enter/Space keys and is focusable", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VAvatar fallback="JD" aria-label="Jane" onClick={onClick} />);
    const el = screen.getByRole("button", { name: "Jane" });
    await user.click(el);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(el).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it("forwards native div props", () => {
    renderWithTheme(<VAvatar fallback="JD" data-testid="av" id="a1" />);
    expect(screen.getByTestId("av")).toHaveAttribute("id", "a1");
  });

  it("shows errorFallback when src fails to load", () => {
    const { container } = renderWithTheme(
      <VAvatar src="/broken.jpg" alt="User" errorFallback={<span>ERR</span>} />,
    );
    fireEvent.error(container.querySelector("img")!);
    expect(screen.getByText("ERR")).toBeInTheDocument();
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VAvatar src="/photo.jpg" alt="User avatar" />);
    await axeTest(container);
  });
});

describe("VAvatar regressions", () => {
  it("tries the new src after the previous one failed", () => {
    const { container, rerender } = renderWithTheme(
      <VAvatar src="/bad.jpg" alt="User" fallback="FB" />,
    );
    fireEvent.error(container.querySelector("img")!);
    expect(container.querySelector("img")).toBeNull();

    rerender(<VAvatar src="/good.jpg" alt="User" fallback="FB" />);
    expect(container.querySelector("img")).toHaveAttribute("src", "/good.jpg");
  });

  it("shows the placeholder again when src changes after a load", () => {
    const { container, rerender } = renderWithTheme(
      <VAvatar src="/a.jpg" alt="User" placeholder={<span>loading</span>} />,
    );
    fireEvent.load(container.querySelector("img")!);
    expect(screen.queryByText("loading")).toBeNull();

    rerender(<VAvatar src="/b.jpg" alt="User" placeholder={<span>loading</span>} />);
    expect(screen.getByText("loading")).toBeInTheDocument();
  });

  it("is an image named by its alt, aria-label or text fallback", () => {
    const { rerender, container } = renderWithTheme(<VAvatar src="/a.jpg" alt="Jane" />);
    const root = () => container.querySelector(".v-avatar");
    expect(root()).toHaveAttribute("role", "img");
    expect(root()).toHaveAttribute("aria-label", "Jane");
    rerender(<VAvatar fallback="JD" aria-label="Jane Doe" />);
    expect(root()).toHaveAttribute("aria-label", "Jane Doe");
    rerender(<VAvatar fallback="JD" />);
    expect(root()).toHaveAttribute("role", "img");
    expect(root()).toHaveAttribute("aria-label", "JD");
  });

  it("has no image role when nothing names it", async () => {
    const { container } = renderWithTheme(<VAvatar fallback={<span>&#9733;</span>} />);
    expect(container.querySelector(".v-avatar")).not.toHaveAttribute("role");
    await axeTest(container);
  });

  it("is announced as a button when it has onClick", () => {
    renderWithTheme(<VAvatar fallback="JD" aria-label="Jane Doe" onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "Jane Doe" })).toHaveAttribute("tabindex", "0");
    expect(screen.queryByRole("img")).toBeNull();
  });
});
