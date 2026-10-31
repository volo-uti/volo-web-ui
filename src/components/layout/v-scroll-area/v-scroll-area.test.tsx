import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VScrollArea } from "./v-scroll-area";

describe("VScrollArea", () => {
  it("renders by default", () => {
    renderWithTheme(<VScrollArea>content</VScrollArea>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VScrollArea className="custom">content</VScrollArea>);
    const div = container.querySelector(".v-scroll-area")!;
    expect(div).toHaveClass("v-scroll-area", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VScrollArea ref={ref}>content</VScrollArea>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies the vertical direction by default", () => {
    const { container } = renderWithTheme(<VScrollArea>content</VScrollArea>);
    const div = container.querySelector(".v-scroll-area")!;
    expect(div).toHaveClass("overflow-y-auto");
    expect(div).toHaveClass("overflow-x-hidden");
  });

  it("applies the horizontal direction", () => {
    const { container } = renderWithTheme(
      <VScrollArea direction="horizontal">content</VScrollArea>,
    );
    const div = container.querySelector(".v-scroll-area")!;
    expect(div).toHaveClass("overflow-x-auto");
    expect(div).toHaveClass("overflow-y-hidden");
  });

  it("applies the both direction", () => {
    const { container } = renderWithTheme(<VScrollArea direction="both">content</VScrollArea>);
    const div = container.querySelector(".v-scroll-area")!;
    expect(div).toHaveClass("overflow-auto");
  });

  it("applies maxHeight (number)", () => {
    const { container } = renderWithTheme(<VScrollArea maxHeight={300}>content</VScrollArea>);
    const div = container.querySelector(".v-scroll-area") as HTMLElement;
    expect(div.style.maxHeight).toBe("300px");
  });

  it("applies maxHeight (string)", () => {
    const { container } = renderWithTheme(<VScrollArea maxHeight="50vh">content</VScrollArea>);
    const div = container.querySelector(".v-scroll-area") as HTMLElement;
    expect(div.style.maxHeight).toBe("50vh");
  });

  it("applies maxWidth", () => {
    const { container } = renderWithTheme(
      <VScrollArea direction="horizontal" maxWidth={400}>
        content
      </VScrollArea>,
    );
    const div = container.querySelector(".v-scroll-area") as HTMLElement;
    expect(div.style.maxWidth).toBe("400px");
  });

  it("applies padding", () => {
    const { container } = renderWithTheme(<VScrollArea padding={16}>content</VScrollArea>);
    const div = container.querySelector(".v-scroll-area") as HTMLElement;
    expect(div.style.padding).toBe("16px");
  });

  it("renders the scoped style tag", () => {
    const { container } = renderWithTheme(<VScrollArea>content</VScrollArea>);
    const styleTag = container.querySelector("style");
    expect(styleTag).toBeTruthy();
    expect(styleTag!.textContent).toContain("webkit-scrollbar");
  });

  it('applies scrollbar-width: none when scrollbar="hidden"', () => {
    const { container } = renderWithTheme(<VScrollArea scrollbar="hidden">content</VScrollArea>);
    const styleTag = container.querySelector("style");
    expect(styleTag!.textContent).toContain("scrollbar-width: none");
  });

  it("reflects thumbColor and scrollbarThickness in the style", () => {
    const { container } = renderWithTheme(
      <VScrollArea thumbColor="red" scrollbarThickness={10}>
        x
      </VScrollArea>,
    );
    const css = container.querySelector("style")!.innerHTML;
    expect(css).toContain("red");
    expect(css).toContain("width: 10px");
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VScrollArea>content</VScrollArea>);
    await axeTest(container);
  });

  describe("keyboard access", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    function mockOverflow(overflowing: boolean) {
      vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(
        overflowing ? 400 : 100,
      );
      vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(100);
    }

    it("is a tab stop when its content overflows", () => {
      mockOverflow(true);
      const { container } = renderWithTheme(<VScrollArea maxHeight={100}>content</VScrollArea>);
      expect(container.querySelector(".v-scroll-area")).toHaveAttribute("tabindex", "0");
    });

    it("is not a tab stop when nothing scrolls", () => {
      mockOverflow(false);
      const { container } = renderWithTheme(<VScrollArea maxHeight={100}>content</VScrollArea>);
      expect(container.querySelector(".v-scroll-area")).not.toHaveAttribute("tabindex");
    });

    it("keeps an explicit tabIndex", () => {
      mockOverflow(true);
      const { container } = renderWithTheme(<VScrollArea tabIndex={-1}>content</VScrollArea>);
      expect(container.querySelector(".v-scroll-area")).toHaveAttribute("tabindex", "-1");
    });

    it("becomes a named region when it has an accessible name", async () => {
      mockOverflow(true);
      const { container } = renderWithTheme(
        <VScrollArea aria-label="Messages" maxHeight={100}>
          content
        </VScrollArea>,
      );
      expect(screen.getByRole("region", { name: "Messages" })).toHaveAttribute("tabindex", "0");
      await axeTest(container);
    });

    it("still forwards the ref to the element", () => {
      mockOverflow(true);
      const ref = createRef<HTMLDivElement>();
      renderWithTheme(<VScrollArea ref={ref}>content</VScrollArea>);
      expect(ref.current).toHaveAttribute("tabindex", "0");
    });
  });
});
