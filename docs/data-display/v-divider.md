# VDivider

Separator line, solid or dashed, with an optional centre label.

## Examples

### VDivider

```tsx
<VDivider />
<VDivider orientation="vertical" />
<VDivider label="OR" />
<VDivider variant="dashed" />
```

## Props

### VDividerProps

VDivider props — native `<div>` props are accepted too.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VDividerVariant` | `'solid'` | no | Line style. |
| `color` | `string` | — | no | Line colour — any CSS color. Defaults to the theme border colour. |
| `label` | `ReactNode` | — | no | Label shown in the middle of a horizontal line. |
| `orientation` | `VOrientation` | `'horizontal'` | no | Line direction. |
| `bold` | `boolean` | `false` | no | Bold line — 2px thickness. |
| `thickness` | `number` | — | no | Line thickness in px; overrides `bold`. |
| `indent` | `number` | `0` | no | Start indent in px. |
| `endIndent` | `number` | `0` | no | End indent in px. |

## Types

### VDividerVariant

VDivider style variant.

```ts
type VDividerVariant = "solid" | "dashed";
```
