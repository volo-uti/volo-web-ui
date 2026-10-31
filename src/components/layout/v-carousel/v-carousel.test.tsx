import { createRef } from "react";
import { act, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { renderWithTheme, screen, axeTest, userEvent } from "../../../test-utils";
import { VCarousel } from "./v-carousel";

describe("VCarousel", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // Helper: render carousel with 3 slides (as direct children, not fragment)
  const renderCarousel = (props: Record<string, unknown> = {}) =>
    renderWithTheme(
      <VCarousel {...props}>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </VCarousel>,
    );

  // ─── Rendering ───

  it("renders by default", () => {
    renderCarousel();
    expect(screen.getByRole("region", { name: "Carousel" })).toBeInTheDocument();
    expect(screen.getAllByRole("group")).toHaveLength(3);
  });

  it("names the region with aria-label so several carousels stay distinguishable", () => {
    const { container } = renderWithTheme(
      <>
        <VCarousel aria-label="Photos">
          <div>A</div>
          <div>B</div>
        </VCarousel>
        <VCarousel aria-label="Reviews">
          <div>C</div>
          <div>D</div>
        </VCarousel>
      </>,
    );
    expect(screen.getByRole("region", { name: "Photos" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Reviews" })).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Carousel" })).not.toBeInTheDocument();
    expect(container.querySelector(".v-carousel")).not.toHaveAttribute("aria-label");
  });

  it("names the region with aria-labelledby", () => {
    renderWithTheme(
      <>
        <h2 id="gallery-title">Gallery</h2>
        <VCarousel aria-labelledby="gallery-title">
          <div>A</div>
          <div>B</div>
        </VCarousel>
      </>,
    );
    expect(screen.getByRole("region", { name: "Gallery" })).toBeInTheDocument();
  });

  it("does not render with empty children", () => {
    const { container } = renderWithTheme(<VCarousel />);
    expect(container.querySelector(".v-carousel")).not.toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderCarousel({ className: "custom" });
    expect(container.firstChild).toHaveClass("v-carousel", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <VCarousel ref={ref}>
        <div>Slide</div>
      </VCarousel>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // ─── Variant ───

  it("sets data-v-variant (default)", () => {
    const { container } = renderCarousel();
    expect(container.querySelector('[data-v-variant="default"]')).toBeInTheDocument();
  });

  it("sets data-v-variant (hero)", () => {
    const { container } = renderCarousel({ variant: "hero" });
    expect(container.querySelector('[data-v-variant="hero"]')).toBeInTheDocument();
  });

  it("gives the hero variant autoplay/loop data attributes", () => {
    const { container } = renderCarousel({ variant: "hero" });
    const root = container.querySelector("[data-v-autoplay]");
    expect(root).toBeInTheDocument();
    expect(root).toHaveAttribute("data-v-loop");
  });

  // ─── Slides ───

  it('sets aria-roledescription="slide" on slides', () => {
    renderCarousel();
    const slideElements = screen.getAllByRole("group");
    for (const slide of slideElements) {
      expect(slide).toHaveAttribute("aria-roledescription", "slide");
    }
  });

  it("sets the right aria-label on slides", () => {
    renderCarousel();
    const slideElements = screen.getAllByRole("group");
    expect(slideElements[0]).toHaveAttribute("aria-label", "Slide 1 of 3");
    expect(slideElements[2]).toHaveAttribute("aria-label", "Slide 3 of 3");
  });

  // ─── Indicator ───

  it("renders the default dot indicator", () => {
    renderCarousel();
    const tablist = screen.getByRole("tablist", { name: /indicator/i });
    expect(tablist).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
  });

  it("has no indicator when showIndicator=false", () => {
    renderCarousel({ showIndicator: false });
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });

  it('has no indicator when indicatorPosition="none"', () => {
    renderCarousel({ indicatorPosition: "none" });
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });

  it("has no indicator with a single slide", () => {
    renderWithTheme(
      <VCarousel>
        <div>Only one</div>
      </VCarousel>,
    );
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });

  it("uses a custom indicatorBuilder", () => {
    renderWithTheme(
      <VCarousel
        indicatorBuilder={(total: number, current: number) => (
          <span data-testid="custom-indicator">
            {current + 1} / {total}
          </span>
        )}
      >
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </VCarousel>,
    );
    expect(screen.getByTestId("custom-indicator")).toHaveTextContent("1 / 3");
  });

  // ─── Arrows ───

  it("renders arrow buttons when showArrows=true", () => {
    renderCarousel({ showArrows: true });
    expect(screen.getByLabelText("Previous slide")).toBeInTheDocument();
    expect(screen.getByLabelText("Next slide")).toBeInTheDocument();
  });

  it("has no arrows when showArrows=false (default)", () => {
    renderCarousel();
    expect(screen.queryByLabelText("Previous slide")).not.toBeInTheDocument();
  });

  it("disables the prev button on the first page when loop=false", () => {
    renderCarousel({ showArrows: true });
    expect(screen.getByLabelText("Previous slide")).toBeDisabled();
  });

  // ─── Keyboard ───

  it("moves to the next slide with ArrowRight", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    renderCarousel({ onValueChange });

    const carousel = screen.getByRole("region", { name: "Carousel" });
    await user.click(carousel);
    await user.keyboard("{ArrowRight}");

    expect(onValueChange).toHaveBeenCalledWith(1);
  });

  // ─── Auto-play ───

  it("sets data-v-autoplay when autoPlay=true", () => {
    const { container } = renderCarousel({ autoPlay: true });
    expect(container.querySelector("[data-v-autoplay]")).toBeInTheDocument();
  });

  // ─── Height / Aspect Ratio ───

  it("applies height", () => {
    renderCarousel({ height: 300 });
    const carousel = screen.getByRole("region", { name: "Carousel" });
    const wrapper = carousel.parentElement!;
    expect(wrapper.style.height).toBe("300px");
  });

  it("does not set height when aspectRatio is given", () => {
    renderWithTheme(
      <VCarousel aspectRatio={16 / 9}>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </VCarousel>,
    );
    const carousel = screen.getByRole("region", { name: "Carousel" });
    const wrapper = carousel.parentElement!;
    // When aspectRatio is provided, height should not be set
    expect(wrapper.style.height).toBe("");
  });

  // ─── onValueChange ───

  it("calls onValueChange when a dot is clicked", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    renderCarousel({ onValueChange });

    const dots = screen.getAllByRole("tab");
    await user.click(dots[2]);

    expect(onValueChange).toHaveBeenCalledWith(2);
  });

  // ─── value / defaultValue ───

  it("sets the start page from defaultValue", () => {
    renderWithTheme(
      <VCarousel
        defaultValue={2}
        indicatorBuilder={(total, current) => <span data-testid="pos">{current}</span>}
      >
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </VCarousel>,
    );
    expect(screen.getByTestId("pos")).toHaveTextContent("2");
  });

  it("uses value as the current page in controlled mode and clicks only call the callback", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderCarousel({ value: 0, onValueChange });

    await user.click(screen.getAllByRole("tab")[1]);

    expect(onValueChange).toHaveBeenCalledWith(1);
    expect(screen.getAllByRole("tab")[0]).toHaveAttribute("aria-selected", "true");
  });

  // ─── Keyboard / arrows ───

  it("moves back to the previous slide with ArrowLeft", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderCarousel({ defaultValue: 2, onValueChange });

    await user.click(screen.getByRole("region", { name: "Carousel" }));
    await user.keyboard("{ArrowLeft}");

    expect(onValueChange).toHaveBeenCalledWith(1);
  });

  it("moves to the last and first pages with End and Home", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderCarousel({ onValueChange });

    await user.click(screen.getByRole("region", { name: "Carousel" }));
    await user.keyboard("{End}");
    expect(onValueChange).toHaveBeenLastCalledWith(2);
    await user.keyboard("{Home}");
    expect(onValueChange).toHaveBeenLastCalledWith(0);
  });

  it("calls onValueChange from the next arrow button", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderCarousel({ showArrows: true, onValueChange });

    await user.click(screen.getByLabelText("Next slide"));

    expect(onValueChange).toHaveBeenCalledWith(1);
  });

  it("wraps from the last slide to the first with ArrowRight when loop", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderCarousel({ loop: true, defaultValue: 2, onValueChange });

    await user.click(screen.getByRole("region", { name: "Carousel" }));
    await user.keyboard("{ArrowRight}");

    expect(onValueChange).toHaveBeenCalledWith(0);
  });

  it("disables the next arrow on the last page", () => {
    renderCarousel({ showArrows: true, defaultValue: 2 });
    expect(screen.getByLabelText("Next slide")).toBeDisabled();
  });

  it("accepts a CSS string for height", () => {
    renderCarousel({ height: "50vh" });
    const wrapper = screen.getByRole("region", { name: "Carousel" }).parentElement!;
    expect(wrapper.style.height).toBe("50vh");
  });

  // ─── a11y ───

  it("has no accessibility violations", async () => {
    const { container } = renderCarousel({ showArrows: true });
    await axeTest(container);
  });

  it("scrolls to the page when the controlled value changes", () => {
    const spy = vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(100);
    const slides = [<div key="a">A</div>, <div key="b">B</div>, <div key="c">C</div>];
    const { rerender } = renderWithTheme(
      <VCarousel variant="fullWidth" value={0}>
        {slides}
      </VCarousel>,
    );
    const scroller = screen.getByRole("region", { name: "Carousel" });
    rerender(
      <VCarousel variant="fullWidth" value={2}>
        {slides}
      </VCarousel>,
    );
    expect(scroller.scrollLeft).toBe(200);
    spy.mockRestore();
  });
});

describe("VCarousel regressions", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(1000);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  const slides = [
    <div key="a">A</div>,
    <div key="b">B</div>,
    <div key="c">C</div>,
    <div key="d">D</div>,
  ];
  const region = () => screen.getByRole("region", { name: "Carousel" });
  const selectedDot = () =>
    screen.getAllByRole("tab").findIndex((tab) => tab.getAttribute("aria-selected") === "true");

  it("scrolls to defaultValue on mount", () => {
    renderWithTheme(
      <VCarousel variant="fullWidth" defaultValue={2}>
        {slides}
      </VCarousel>,
    );
    expect(region().scrollLeft).toBe(2000);
    expect(selectedDot()).toBe(2);
  });

  it("centres a slide at page * slideWidth when padEnds is on", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithTheme(
      <VCarousel viewportFraction={0.4} pageSpacing={0} showArrows>
        {slides}
      </VCarousel>,
    );
    await user.click(screen.getByLabelText("Next slide"));
    expect(region().scrollLeft).toBe(400);
  });

  it("reads the page from a settled padEnds scroll position", () => {
    renderWithTheme(
      <VCarousel viewportFraction={0.4} pageSpacing={0}>
        {slides}
      </VCarousel>,
    );
    Object.defineProperty(region(), "scrollLeft", { configurable: true, value: 800 });
    fireEvent.scroll(region());
    expect(selectedDot()).toBe(2);
  });

  it("does not report intermediate pages while following a controlled value", () => {
    const onValueChange = vi.fn();
    const { rerender } = renderWithTheme(
      <VCarousel variant="fullWidth" value={0} onValueChange={onValueChange}>
        {slides}
      </VCarousel>,
    );
    rerender(
      <VCarousel variant="fullWidth" value={3} onValueChange={onValueChange}>
        {slides}
      </VCarousel>,
    );
    Object.defineProperty(region(), "scrollLeft", { configurable: true, value: 1000 });
    fireEvent.scroll(region());
    expect(onValueChange).not.toHaveBeenCalled();

    // After the programmatic scroll settles, user scrolling is reported again
    act(() => {
      vi.advanceTimersByTime(500);
    });
    fireEvent.scroll(region());
    expect(onValueChange).toHaveBeenCalledWith(1);
  });

  it("clamps the page when the slide count shrinks", () => {
    const { rerender } = renderWithTheme(
      <VCarousel variant="fullWidth" defaultValue={3} showArrows>
        {slides}
      </VCarousel>,
    );
    expect(selectedDot()).toBe(3);

    rerender(
      <VCarousel variant="fullWidth" defaultValue={3} showArrows>
        {slides.slice(0, 2)}
      </VCarousel>,
    );
    expect(selectedDot()).toBe(1);
    expect(screen.getByLabelText("Next slide")).toBeDisabled();
    expect(screen.getByLabelText("Previous slide")).not.toBeDisabled();
  });

  it("leaves caret keys inside a slide to the control that received them", () => {
    renderWithTheme(
      <VCarousel variant="fullWidth">
        <div>
          <input aria-label="note" />
        </div>
        <div>B</div>
      </VCarousel>,
    );
    const input = screen.getByLabelText("note");
    for (const key of ["ArrowLeft", "ArrowRight", "Home", "End"]) {
      const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
      input.dispatchEvent(event);
      expect(event.defaultPrevented, key).toBe(false);
    }
  });

  it("does not auto-play with a zero or invalid interval", () => {
    const onValueChange = vi.fn();
    renderWithTheme(
      <VCarousel variant="fullWidth" autoPlay autoPlayInterval={0} onValueChange={onValueChange}>
        {slides}
      </VCarousel>,
    );
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("auto-plays with a positive interval", () => {
    const onValueChange = vi.fn();
    renderWithTheme(
      <VCarousel variant="fullWidth" autoPlay autoPlayInterval={2} onValueChange={onValueChange}>
        {slides}
      </VCarousel>,
    );
    act(() => {
      vi.advanceTimersByTime(2100);
    });
    expect(onValueChange).toHaveBeenCalledWith(1);
  });

  it("moves focus between the dots with the arrow keys", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithTheme(<VCarousel variant="fullWidth">{slides}</VCarousel>);
    const dots = screen.getAllByRole("tab");
    expect(dots[0]).toHaveAttribute("tabindex", "0");
    expect(dots[1]).toHaveAttribute("tabindex", "-1");

    dots[0]!.focus();
    await user.keyboard("{ArrowRight}");
    expect(dots[1]).toHaveFocus();
    await user.keyboard("{End}");
    expect(dots[3]).toHaveFocus();
  });
});
