# VButtonGroup

Connected strip of VButtons with arrow-key focus.

## Parts

- `useButtonGroup` — Reads the variant and size of the enclosing VButtonGroup; throws outside one.

## Examples

### useButtonGroup

```tsx
const { variant, size } = useButtonGroup()
```

### VButtonGroup

```tsx
<VButtonGroup variant="outlined" size="sm">
  <VButton>Left</VButton>
  <VButton>Center</VButton>
  <VButton>Right</VButton>
</VButtonGroup>
```

## Props

### VButtonGroupProps

Props of VButtonGroup.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VButtonVariant` | — | no | Variant for every VButton in the group. |
| `size` | `VSize` | — | no | Size for every VButton in the group. |
| `children` | `ReactNode` | — | no | The VButtons to join. |
| `orientation` | `VOrientation` | `'horizontal'` | no | Direction the buttons are laid out in; also sets the arrow-key axis. |
| `spacing` | `number` | `0` | no | Gap between buttons in px; any value above 0 separates them instead of joining them. |
| `className` | `string` | — | no | Additional class names (Tailwind). |
