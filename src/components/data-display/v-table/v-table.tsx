"use client";

import { forwardRef, useEffect, useRef, useState, type ReactElement, type Ref } from "react";
import { cn } from "../../../lib";
import { devWarning } from "../../../utils/dev-warning";
import { useLocaleText } from "../../../hooks/use-locale";
import type { VTableAlignment, VTableProps, VTableSortDirection } from "./v-table.types";

const alignmentStyles: Record<VTableAlignment, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

/** Sort indicator icon */
function SortIcon({ direction }: { direction?: VTableSortDirection }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="inline-block ml-1 align-middle"
    >
      <path
        d="M4 5L7 2L10 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={direction === "ascending" ? 1 : 0.3}
      />
      <path
        d="M4 9L7 12L10 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={direction === "descending" ? 1 : 0.3}
      />
    </svg>
  );
}

function VTableInner<T extends object>(props: VTableProps<T>, ref: Ref<HTMLTableElement>) {
  const {
    columns,
    data,
    rowKey,
    emptyMessage: emptyMessageProp,
    dense = false,
    striped = false,
    bordered = false,
    hoverable = false,
    showHeader = true,
    stickyHeader = false,
    headerStyle,
    rowStyle,
    sortColumn,
    sortDirection,
    onSortChange,
    className,
    ...tableProps
  } = props;

  if (columns.length === 0) {
    devWarning("VTable", "columns must not be empty");
  }

  const localeText = useLocaleText();

  // A region that scrolls must be reachable by keyboard, so it joins the tab order only
  // while its content overflows.
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollable, setScrollable] = useState(false);
  const scrollName = tableProps["aria-label"] || tableProps["aria-labelledby"];
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const measure = () =>
      setScrollable(el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => observer.disconnect();
  }, [columns, data]);

  const emptyMessage = emptyMessageProp ?? localeText.tableNoData;

  const getRowKey = (row: T, index: number): string => {
    if (typeof rowKey === "function") return rowKey(row, index);
    if (typeof rowKey === "string")
      return String((row as Record<string, unknown>)[rowKey] ?? index);
    return String(index);
  };

  const cellPadding = dense
    ? "py-[var(--v-spacing-xs)] px-[var(--v-spacing-sm)]"
    : "py-[var(--v-spacing-sm)] px-[var(--v-spacing-md)]";

  return (
    <div
      ref={scrollRef}
      className={cn(
        "v-table",
        "w-full overflow-auto",
        scrollable &&
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)]",
        className,
      )}
      tabIndex={scrollable ? 0 : undefined}
      role={scrollable && scrollName ? "region" : undefined}
      aria-label={scrollable ? tableProps["aria-label"] : undefined}
      aria-labelledby={scrollable ? tableProps["aria-labelledby"] : undefined}
    >
      <table
        {...tableProps}
        ref={ref}
        role="table"
        className={cn(
          "w-full border-collapse text-[length:var(--v-size-md-font-size)]",
          bordered && "border border-[var(--v-border)]",
        )}
      >
        {showHeader && (
          <thead>
            <tr role="row" style={{ height: headerStyle?.height }}>
              {columns.map((col) => {
                const isSortable = col.sortable === true && onSortChange;
                const isSorted = sortColumn === col.key;
                const currentDirection = isSorted ? sortDirection : undefined;
                const ariaSort: "ascending" | "descending" | "none" | undefined = isSortable
                  ? isSorted && currentDirection
                    ? currentDirection
                    : "none"
                  : undefined;

                const handleSort = () => {
                  if (!isSortable) return;
                  const nextDirection: VTableSortDirection =
                    isSorted && sortDirection === "ascending" ? "descending" : "ascending";
                  onSortChange(col.key, nextDirection);
                };

                return (
                  <th
                    key={col.key}
                    role="columnheader"
                    aria-sort={ariaSort}
                    className={cn(
                      cellPadding,
                      "font-[var(--v-font-weight-semibold)] text-[var(--v-muted-foreground)]",
                      "border-b border-[var(--v-border)]",
                      stickyHeader && "sticky top-0 z-10 bg-[var(--v-background)]",
                      headerStyle?.className,
                      alignmentStyles[col.alignment ?? "left"],
                      bordered && "border border-[var(--v-border)]",
                      isSortable &&
                        "cursor-pointer select-none hover:text-[var(--v-foreground)] transition-colors",
                    )}
                    style={{ width: col.width, backgroundColor: headerStyle?.backgroundColor }}
                    onClick={isSortable ? handleSort : undefined}
                    onKeyDown={
                      isSortable
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleSort();
                            }
                          }
                        : undefined
                    }
                    tabIndex={isSortable ? 0 : undefined}
                  >
                    {col.title}
                    {isSortable && <SortIcon direction={currentDirection} />}
                  </th>
                );
              })}
            </tr>
          </thead>
        )}
        <tbody>
          {data.length === 0 ? (
            <tr role="row">
              <td
                role="cell"
                colSpan={columns.length}
                className={cn(cellPadding, "text-center text-[var(--v-muted-foreground)]")}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={getRowKey(row, rowIndex)}
                role="row"
                style={{ backgroundColor: rowStyle?.backgroundColor, height: rowStyle?.height }}
                className={cn(
                  "border-b border-[var(--v-border)] text-[var(--v-foreground)]",
                  striped && rowIndex % 2 === 1 && "bg-[var(--v-muted)]/50",
                  hoverable && "hover:bg-[var(--v-accent)] transition-colors",
                  rowStyle?.className,
                )}
              >
                {columns.map((col) => {
                  const value = (row as Record<string, unknown>)[col.key];
                  return (
                    <td
                      key={col.key}
                      role="cell"
                      className={cn(
                        cellPadding,
                        alignmentStyles[col.alignment ?? "left"],
                        bordered && "border border-[var(--v-border)]",
                      )}
                    >
                      {col.render ? col.render(value, row, rowIndex) : String(value ?? "")}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Data table driven by `columns` and `data`, with sortable headers and an empty state.
 *
 * @example
 * <VTable
 *   columns={[
 *     { key: 'name', title: 'Name', sortable: true },
 *     { key: 'age', title: 'Age', alignment: 'right', render: (v) => `${v} yrs` },
 *   ]}
 *   data={people}
 *   rowKey="name"
 *   sortColumn={sort.column}
 *   sortDirection={sort.direction}
 *   onSortChange={(column, direction) => setSort({ column, direction })}
 *   striped
 * />
 */
const VTable = forwardRef(VTableInner) as (<T extends object = Record<string, unknown>>(
  props: VTableProps<T> & { ref?: Ref<HTMLTableElement> },
) => ReactElement) & { displayName?: string };

VTable.displayName = "VTable";

export { VTable };
