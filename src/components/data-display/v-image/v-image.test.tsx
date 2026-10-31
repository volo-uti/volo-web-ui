import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VImage } from "./v-image";

describe("VImage", () => {
  it("renders by default", () => {
    renderWithTheme(<VImage src="/test.jpg" alt="Test" />);
    const el = document.querySelector(".v-image");
    expect(el).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VImage src="/test.jpg" className="custom" />);
    expect(container.firstChild).toHaveClass("v-image", "custom");
  });

  it("forwards native img props and callbacks to the img", () => {
    const onLoad = vi.fn();
    const { container } = renderWithTheme(
      <VImage src="/test.jpg" alt="Test" loading="lazy" srcSet="/a.jpg 2x" onLoad={onLoad} />,
    );
    const img = container.querySelector("img")!;
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("srcset", "/a.jpg 2x");
    fireEvent.load(img);
    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it("calls onError and shows errorFallback when loading fails", () => {
    const onError = vi.fn();
    const { container } = renderWithTheme(
      <VImage src="/x.jpg" onError={onError} errorFallback={<span>FAIL</span>} />,
    );
    fireEvent.error(container.querySelector("img")!);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(screen.getByText("FAIL")).toBeInTheDocument();
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VImage src="/test.jpg" alt="Test" />);
    await axeTest(container);
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLImageElement>();
    renderWithTheme(<VImage ref={ref} src="/test.jpg" />);
    expect(ref.current).toBeInstanceOf(HTMLImageElement);
  });
});

describe("VImage regressions", () => {
  it("tries the new src after the previous one failed", () => {
    const { container, rerender } = renderWithTheme(<VImage src="/bad.jpg" alt="Photo" />);
    fireEvent.error(container.querySelector("img")!);
    expect(container.querySelector("img")).toBeNull();

    rerender(<VImage src="/good.jpg" alt="Photo" />);
    expect(container.querySelector("img")).toHaveAttribute("src", "/good.jpg");
  });

  it("restarts the fade-in and placeholder when src changes after a load", () => {
    const { container, rerender } = renderWithTheme(
      <VImage src="/a.jpg" alt="Photo" placeholder={<span>loading</span>} />,
    );
    fireEvent.load(container.querySelector("img")!);
    expect(container.querySelector("img")).toHaveStyle({ opacity: "1" });
    expect(screen.queryByText("loading")).toBeNull();

    rerender(<VImage src="/b.jpg" alt="Photo" placeholder={<span>loading</span>} />);
    expect(container.querySelector("img")).toHaveStyle({ opacity: "0" });
    expect(screen.getByText("loading")).toBeInTheDocument();
  });
});
