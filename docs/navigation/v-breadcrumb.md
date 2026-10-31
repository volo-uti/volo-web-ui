# VBreadcrumb

Trail of links showing where the page sits in the hierarchy.

## Parts

- `VBreadcrumbItem` — One step of a VBreadcrumb: a link, a button or the current page.

## Examples

### VBreadcrumb

```tsx
<VBreadcrumb>
  <VBreadcrumbItem href="/">Home</VBreadcrumbItem>
  <VBreadcrumbItem href="/products">Products</VBreadcrumbItem>
  <VBreadcrumbItem active>Detail</VBreadcrumbItem>
</VBreadcrumb>
```

### VBreadcrumbItem

```tsx
<VBreadcrumbItem href="/products" icon="📦">Products</VBreadcrumbItem>
```

## Props

### VBreadcrumbProps

VBreadcrumb props; other props go to the `<nav>`.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | VBreadcrumbItem elements, in order from the root to the current page. |
| `separator` | `ReactNode` | `'/'` | no | Node shown between items. |
| `maxItems` | `number` | — | no | Most items shown; when exceeded the middle ones collapse into "...". |

### VBreadcrumbItemProps

VBreadcrumbItem props; other props go to the rendered `<a>`, `<button>` or `<span>`.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | Item label. |
| `href` | `string` | — | no | Link target; renders an `<a>` unless the item is `active`. |
| `icon` | `ReactNode` | — | no | Icon shown before the label. |
| `active` | `boolean` | `false` | no | Marks the current page: plain text with `aria-current="page"`, not pressable. |
