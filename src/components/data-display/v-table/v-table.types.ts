import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** Horizontal text alignment of a VTable column. */
export type VTableAlignment = "left" | "center" | "right";

/** Sort direction of a VTable column. */
export type VTableSortDirection = "ascending" | "descending";

/** One VTable column; `T` is the row type, so `render` gets a typed `row`. */
export interface VTableColumn<T extends object = Record<string, unknown>> {
  /**
   * Row field this column reads; also the column's identifier for sorting.
   */
  key: string;
  /**
   * Header content.
   */
  title: ReactNode;
  /**
   * Column width; a number is px.
   */
  width?: string | number;
  /**
   * Text alignment of header and cells.
   * @default 'left'
   */
  alignment?: VTableAlignment;
  /**
   * Makes the header clickable and reports it through `onSortChange`.
   * @default false
   */
  sortable?: boolean;
  /**
   * Draws the cell yourself; `value` is `row[key]` (untyped, narrow it where you use it).
   */
  render?: (value: unknown, row: T, index: number) => ReactNode;
}

/** Header look of VTable. */
export interface VTableHeaderStyle {
  /** Background colour; any CSS color. */
  backgroundColor?: string;
  /** Height in px. */
  height?: number;
  /** Extra class names for the header cells. */
  className?: string;
}

/** Body row look of VTable. */
export interface VTableRowStyle {
  /** Background colour; any CSS color. */
  backgroundColor?: string;
  /** Height in px. */
  height?: number;
  /** Extra class names for each row. */
  className?: string;
}

/** VTable props; native `<table>` props are accepted and land on the table (`className` goes to the wrapper). */
export interface VTableProps<T extends object = Record<string, unknown>> extends Omit<
  ComponentPropsWithoutRef<"table">,
  "children"
> {
  /**
   * Column definitions.
   */
  columns: VTableColumn<T>[];
  /**
   * Rows to show.
   */
  data: T[];
  /**
   * Row field name, or a function, that gives each row a stable React key.
   * @default row index
   */
  rowKey?: string | ((row: T, index: number) => string);
  /**
   * Shown in place of rows when `data` is empty.
   * @default localized "No data"
   */
  emptyMessage?: ReactNode;
  /**
   * Shades every second row.
   * @default false
   */
  striped?: boolean;
  /**
   * Draws borders around the table and every cell.
   * @default false
   */
  bordered?: boolean;
  /**
   * Highlights the row under the pointer.
   * @default false
   */
  hoverable?: boolean;
  /**
   * Tighter cell padding.
   * @default false
   */
  dense?: boolean;
  /**
   * Renders the header row.
   * @default true
   */
  showHeader?: boolean;
  /**
   * Keeps the header visible while the table scrolls.
   * @default false
   */
  stickyHeader?: boolean;
  /**
   * Header look.
   */
  headerStyle?: VTableHeaderStyle;
  /**
   * Body row look.
   */
  rowStyle?: VTableRowStyle;
  /**
   * `key` of the column the data is sorted by.
   */
  sortColumn?: string;
  /**
   * Direction of the current sort.
   */
  sortDirection?: VTableSortDirection;
  /**
   * Called with the clicked column and the next direction.
   */
  onSortChange?: (column: string, direction: VTableSortDirection) => void;
}
