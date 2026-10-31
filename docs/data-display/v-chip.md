# VChip

Compact tag; clickable, a toggleable filter or removable.

## Parts

- `VChipGroup` — Row of filter VChips built from `items`, with single or multiple selection.

## Examples

### VChipGroup

```tsx
<VChipGroup
  items={[
    { value: 'flutter', label: 'Flutter' },
    { value: 'react', label: 'React' },
  ]}
  value={selected}
  onValueChange={setSelected}
/>
```

### VChip

```tsx
<VChip label="React" />
<VChip label="Filter" variant="filter" selected={on} onSelectedChange={setOn} />
<VChip label="Removable" variant="input" onDelete={() => remove()} />
```

## Props

### VChipProps

VChip props — native `<div>` props are accepted too.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VChipVariant` | `'filled'` | no | Visual variant: `filter` toggles `selected`, `input` can show a delete button. |
| `size` | `VSize` | `'md'` | no | Size variant. |
| `label` | `string` | — | yes | Chip text label. |
| `leading` | `ReactNode` | — | no | Element placed before the label. |
| `deleteIcon` | `ReactNode` | — | no | Custom icon for the delete button (`input` variant). |
| `disabled` | `boolean` | `false` | no | Disables the chip and its delete button. |
| `selected` | `boolean` | `false` | no | Whether the chip is selected (`filter` variant). |
| `onSelectedChange` | `(selected: boolean) => void` | — | no | Called with the next selected state when a `filter` chip is toggled. |
| `onDelete` | `() => void` | — | no | Called when the delete button is pressed; renders the button (`input` variant). |

### VChipGroupProps

VChipGroup props — native `<div>` props are accepted too.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `VSize` | `'md'` | no | Size variant of every chip. |
| `items` | `VChipItem<T>[]` | — | yes | Chip items. |
| `value` | `T[]` | `[]` | no | Selected item values. |
| `allowMultiple` | `boolean` | `true` | no | Allow several chips to be selected at once. |
| `spacing` | `number` | `8` | no | Horizontal gap between chips in px. |
| `runSpacing` | `number` | `8` | no | Vertical gap between rows in px. |
| `onValueChange` | `(value: T[]) => void` | — | no | Called with the next selected values. |

## Types

### VChipVariant

VChip visual variant.

```ts
type VChipVariant = "filled" | "outlined" | "filter" | "input";
```

### VChipItem

Item definition for VChipGroup.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `T` | — | yes | Value reported in `onValueChange`. |
| `label` | `string` | — | yes | Display text. |
| `leading` | `ReactNode` | — | no | Element placed before the label. |
