# VPagination

Page navigation with numbered buttons and ellipses.

## Examples

### VPagination

```tsx
<VPagination totalPages={20} value={page} onValueChange={setPage} />
```

## Props

### VPaginationProps

Props of VPagination.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VPaginationVariant` | `"default"` | no | Layout: numbered pages, "page / total" with arrows, or previous/next only. |
| `size` | `VPaginationSize` | `"md"` | no | Button size. |
| `totalPages` | `number` | — | yes | Total number of pages. |
| `value` | `number` | — | no | Current page, 1-based (controlled). |
| `defaultValue` | `number` | `1` | no | Initial page when `value` is not given. |
| `siblingCount` | `number` | `1` | no | Pages shown on each side of the current page. |
| `boundaryCount` | `number` | `1` | no | Pages always shown at the start and end. |
| `showFirstLast` | `boolean` | `true` | no | Whether the default variant shows first and last page buttons. |
| `previousText` | `string` | — | no | Previous button text for simple and minimal variants. |
| `nextText` | `string` | — | no | Next button text for simple and minimal variants. |
| `pageTextBuilder` | `(current: number, total: number) => string` | — | no | Builds the page text of the simple variant. |
| `disabled` | `boolean` | `false` | no | Whether every control is disabled. |
| `onValueChange` | `(page: number) => void` | — | no | Called with the new 1-based page. |

## Types

### VPaginationVariant

How VPagination lays out its controls.

```ts
type VPaginationVariant = "default" | "simple" | "minimal";
```

### VPaginationSize

Sizes of VPagination.

```ts
type VPaginationSize = Extract<VSize, "sm" | "md" | "lg">;
```
