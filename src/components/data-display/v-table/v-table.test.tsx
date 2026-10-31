import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VTable } from "./v-table";

const columns = [
  { key: "name", title: "Name" },
  { key: "age", title: "Age", alignment: "right" as const },
];

const data = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
];

describe("VTable", () => {
  it("renders (header + data)", () => {
    renderWithTheme(<VTable columns={columns} data={data} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  it("shows the empty message", () => {
    renderWithTheme(<VTable columns={columns} data={[]} emptyMessage="Empty" />);
    expect(screen.getByText("Empty")).toBeInTheDocument();
  });

  it("uses a custom render function", () => {
    const customColumns = [
      {
        key: "name",
        title: "Name",
        render: (value: unknown) => <strong data-testid="bold">{String(value)}</strong>,
      },
    ];
    renderWithTheme(<VTable columns={customColumns} data={[{ name: "Alice" }]} />);
    expect(screen.getByTestId("bold")).toHaveTextContent("Alice");
  });

  it("sets the right role attributes", () => {
    renderWithTheme(<VTable columns={columns} data={data} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3); // 1 header + 2 data
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
    expect(screen.getAllByRole("cell")).toHaveLength(4); // 2 rows x 2 cols
  });

  it("merges className", () => {
    const { container } = renderWithTheme(
      <VTable columns={columns} data={data} className="custom" />,
    );
    const wrapper = container.querySelector(".v-table");
    expect(wrapper?.className).toContain("custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLTableElement>();
    renderWithTheme(<VTable ref={ref} columns={columns} data={data} />);
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });

  it("calls onSortChange when a sortable header is pressed", async () => {
    const onSortChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VTable
        columns={[{ key: "name", title: "Name", sortable: true }]}
        data={data}
        onSortChange={onSortChange}
      />,
    );
    await user.click(screen.getByText("Name"));
    expect(onSortChange).toHaveBeenCalledWith("name", "ascending");
  });

  it("passes a typed row to render", () => {
    renderWithTheme(
      <VTable<{ name: string; age: number }>
        columns={[{ key: "name", title: "Name", render: (_v, row) => `${row.name}!` }]}
        data={data}
      />,
    );
    expect(screen.getByText("Alice!")).toBeInTheDocument();
  });

  it("has no header when showHeader=false", () => {
    renderWithTheme(<VTable columns={columns} data={data} showHeader={false} />);
    expect(screen.queryAllByRole("columnheader")).toHaveLength(0);
  });

  it("applies headerStyle and rowStyle", () => {
    renderWithTheme(
      <VTable
        columns={columns}
        data={data}
        headerStyle={{ backgroundColor: "red" }}
        rowStyle={{ height: 40, className: "row-x" }}
      />,
    );
    expect(screen.getByText("Name").style.backgroundColor).toBe("red");
    expect(screen.getAllByRole("row")[1].className).toContain("row-x");
  });

  it("forwards native table attributes", () => {
    renderWithTheme(<VTable columns={columns} data={data} aria-label="People" />);
    expect(screen.getByRole("table", { name: "People" })).toBeInTheDocument();
  });

  it("adds the sticky class to header cells when stickyHeader is on and omits it when off", () => {
    const { rerender } = renderWithTheme(<VTable columns={columns} data={data} stickyHeader />);
    for (const th of screen.getAllByRole("columnheader")) expect(th.className).toContain("sticky");
    rerender(<VTable columns={columns} data={data} />);
    for (const th of screen.getAllByRole("columnheader"))
      expect(th.className).not.toContain("sticky");
  });

  describe("scroll region", () => {
    const overflow = (scrollWidth: number, clientWidth: number) => {
      const sw = vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(scrollWidth);
      const cw = vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(clientWidth);
      return () => {
        sw.mockRestore();
        cw.mockRestore();
      };
    };

    it("is not a tab stop while the table fits", () => {
      const { container } = renderWithTheme(<VTable columns={columns} data={data} />);
      expect(container.querySelector(".v-table")).not.toHaveAttribute("tabindex");
    });

    it("becomes keyboard focusable and named while the table overflows", () => {
      const restore = overflow(800, 300);
      try {
        const { container } = renderWithTheme(
          <VTable columns={columns} data={data} aria-label="People" />,
        );
        const region = container.querySelector(".v-table") as HTMLElement;
        expect(region).toHaveAttribute("tabindex", "0");
        expect(screen.getByRole("region", { name: "People" })).toBe(region);
        region.focus();
        expect(region).toHaveFocus();
      } finally {
        restore();
      }
    });
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VTable columns={columns} data={data} />);
    await axeTest(container);
  });
});
