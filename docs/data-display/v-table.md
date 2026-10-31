# VTable

Data table driven by `columns` and `data`, with sortable headers and an empty state.

## Examples

### VTable

```tsx
<VTable
  columns={[
    { key: 'name', title: 'Name', sortable: true },
    { key: 'age', title: 'Age', alignment: 'right', render: (v) => `${v} yrs` },
  ]}
  data={people}
  rowKey="name"
  sortColumn={sort.column}
  sortDirection={sort.direction}
  onSortChange={(column, direction) => setSort({ column, direction })}
  striped
/>
```

## Props

### VTableProps

VTable props; native `<table>` props are accepted and land on the table (`className` goes to the wrapper).

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `columns` | `VTableColumn<T>[]` | — | yes | Column definitions. |
| `data` | `T[]` | — | yes | Rows to show. |
| `rowKey` | `string \| ((row: T, index: number) => string)` | `row index` | no | Row field name, or a function, that gives each row a stable React key. |
| `emptyMessage` | `ReactNode` | `localized "No data"` | no | Shown in place of rows when `data` is empty. |
| `striped` | `boolean` | `false` | no | Shades every second row. |
| `bordered` | `boolean` | `false` | no | Draws borders around the table and every cell. |
| `hoverable` | `boolean` | `false` | no | Highlights the row under the pointer. |
| `dense` | `boolean` | `false` | no | Tighter cell padding. |
| `showHeader` | `boolean` | `true` | no | Renders the header row. |
| `stickyHeader` | `boolean` | `false` | no | Keeps the header visible while the table scrolls. |
| `headerStyle` | `VTableHeaderStyle` | — | no | Header look. |
| `rowStyle` | `VTableRowStyle` | — | no | Body row look. |
| `sortColumn` | `string` | — | no | `key` of the column the data is sorted by. |
| `sortDirection` | `VTableSortDirection` | — | no | Direction of the current sort. |
| `onSortChange` | `(column: string, direction: VTableSortDirection) => void` | — | no | Called with the clicked column and the next direction. |

## Types

### VTableAlignment

Horizontal text alignment of a VTable column.

```ts
type VTableAlignment = "left" | "center" | "right";
```

### VTableSortDirection

Sort direction of a VTable column.

```ts
type VTableSortDirection = "ascending" | "descending";
```

### VTableColumn

One VTable column; `T` is the row type, so `render` gets a typed `row`.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `key` | `string` | — | yes | Row field this column reads; also the column's identifier for sorting. |
| `title` | `ReactNode` | — | yes | Header content. |
| `width` | `string \| number` | — | no | Column width; a number is px. |
| `alignment` | `VTableAlignment` | `'left'` | no | Text alignment of header and cells. |
| `sortable` | `boolean` | `false` | no | Makes the header clickable and reports it through `onSortChange`. |
| `render` | `(value: unknown, row: T, index: number) => ReactNode` | — | no | Draws the cell yourself; `value` is `row[key]` (untyped, narrow it where you use it). |

### VTableHeaderStyle

Header look of VTable.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `backgroundColor` | `string` | — | no | Background colour; any CSS color. |
| `height` | `number` | — | no | Height in px. |
| `className` | `string` | — | no | Extra class names for the header cells. |

### VTableRowStyle

Body row look of VTable.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `backgroundColor` | `string` | — | no | Background colour; any CSS color. |
| `height` | `number` | — | no | Height in px. |
| `className` | `string` | — | no | Extra class names for each row. |
