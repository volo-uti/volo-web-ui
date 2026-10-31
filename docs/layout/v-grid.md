# VGrid

Grid of children with a fixed column count or an auto-fill minimum width.

## Examples

### VGrid

```tsx
<VGrid minChildWidth={160} gap="md">
  <VCard>One</VCard>
  <VCard>Two</VCard>
</VGrid>
```

## Props

### VGridProps

VGrid props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `aspectRatio` | `number` | `undefined` | no | Width:height ratio forced on every cell. |
| `columns` | `number` | `2` | no | Fixed number of columns; ignored when `minChildWidth` is set. |
| `minChildWidth` | `string \| number` | `undefined` | no | Minimum column width; as many columns as fit are created (auto-fill). Accepts pixels as a number or any CSS length. |
| `gap` | `VSpace` | `undefined` | no | Gap between rows and columns: a `VSize` token, pixels as a number, or any CSS length. |
| `rowGap` | `VSpace` | `undefined` | no | Row gap; falls back to `gap`. |
| `colGap` | `VSpace` | `undefined` | no | Column gap; falls back to `gap`. |
| `padding` | `string \| number` | `undefined` | no | Padding inside the grid. Accepts pixels as a number or any CSS length. |
