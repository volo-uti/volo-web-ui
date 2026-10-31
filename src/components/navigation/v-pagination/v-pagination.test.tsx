import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VPagination } from "./v-pagination";

describe("VPagination", () => {
  it('renders with role="navigation"', () => {
    renderWithTheme(<VPagination totalPages={10} />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
  });

  it("shows page numbers", () => {
    renderWithTheme(<VPagination totalPages={5} defaultValue={1} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it('sets aria-current="page" on the active page', () => {
    renderWithTheme(<VPagination totalPages={5} defaultValue={3} />);
    const activeButton = screen.getByText("3");
    expect(activeButton).toHaveAttribute("aria-current", "page");
  });

  it("changes the active page when a page is clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VPagination totalPages={5} defaultValue={1} />);
    await user.click(screen.getByText("3"));
    expect(screen.getByText("3")).toHaveAttribute("aria-current", "page");
  });

  it("works in controlled mode", () => {
    const onChange = vi.fn();
    renderWithTheme(<VPagination totalPages={5} value={2} onValueChange={onChange} />);
    expect(screen.getByText("2")).toHaveAttribute("aria-current", "page");
  });

  it("calls onValueChange with the new page when a page is pressed", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VPagination totalPages={5} value={2} onValueChange={onValueChange} />);
    await user.click(screen.getByText("4"));
    expect(onValueChange).toHaveBeenCalledWith(4);
    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(onValueChange).toHaveBeenCalledWith(3);
  });

  it("does not call onValueChange when disabled", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VPagination totalPages={5} disabled onValueChange={onValueChange} />);
    await user.click(screen.getByText("3"));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("renders the previous/next buttons", () => {
    renderWithTheme(<VPagination totalPages={5} defaultValue={3} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next page" })).toBeInTheDocument();
  });

  it("disables the previous button on the first page", () => {
    renderWithTheme(<VPagination totalPages={5} defaultValue={1} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
  });

  it("disables the next button on the last page", () => {
    renderWithTheme(<VPagination totalPages={5} defaultValue={5} />);
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("applies the disabled state", () => {
    renderWithTheme(<VPagination totalPages={5} disabled />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<VPagination ref={ref} totalPages={5} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VPagination totalPages={5} defaultValue={1} />);
    await axeTest(container);
  });
});

describe("VPagination range and clamping", () => {
  const slots = (container: HTMLElement) =>
    Array.from(container.querySelectorAll("li"))
      .map((li) => li.textContent ?? "")
      .filter((text) => text === "..." || /^\d+$/.test(text));

  it("never lets an ellipsis stand in for a single page", () => {
    for (const total of [8, 9, 10, 12, 20]) {
      for (let page = 1; page <= total; page++) {
        const { container, unmount } = renderWithTheme(
          <VPagination totalPages={total} defaultValue={page} />,
        );
        const items = slots(container);
        items.forEach((item, i) => {
          if (item !== "...") return;
          const before = Number(items[i - 1]);
          const after = Number(items[i + 1]);
          expect(
            after - before,
            `total ${total}, page ${page}: ${items.join(" ")}`,
          ).toBeGreaterThan(2);
        });
        unmount();
      }
    }
  });

  it("keeps the same number of slots on every page", () => {
    const counts = new Set<number>();
    for (let page = 1; page <= 10; page++) {
      const { container, unmount } = renderWithTheme(
        <VPagination totalPages={10} defaultValue={page} />,
      );
      counts.add(slots(container).length);
      unmount();
    }
    expect([...counts]).toEqual([7]);
  });

  it("shows page 7 instead of an ellipsis for 8 pages on page 1", () => {
    const { container } = renderWithTheme(<VPagination totalPages={8} defaultValue={1} />);
    expect(slots(container)).toEqual(["1", "2", "3", "4", "5", "...", "8"]);
  });

  it("clamps an uncontrolled page when totalPages shrinks", async () => {
    const user = userEvent.setup();
    const { rerender } = renderWithTheme(<VPagination totalPages={10} defaultValue={10} />);
    rerender(<VPagination totalPages={3} defaultValue={10} />);
    expect(screen.getByText("3")).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Previous page" }));
    expect(screen.getByText("2")).toHaveAttribute("aria-current", "page");
  });
});
