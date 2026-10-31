# VSheet

Plain themed surface for grouping content; lighter than VCard.

`as` renders another element.

It has no open state or dismissal; use VDialog or VDrawer for overlays.

## Examples

### VSheet

```tsx
<VSheet variant="outlined" as="section" aria-label="Summary">
  <p>Content inside a sheet</p>
</VSheet>
```

## Props

### VSheetOwnProps

VSheet own props (before polymorphic merge).

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VSheetVariant` | `'filled'` | no | Surface style. |

### VSheetProps

VSheet props with polymorphic `as` and ref support.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VSheetVariant` | `'filled'` | no | Surface style. |
| `as` | `E` | — | no | — |
| `ref` | `ComponentPropsWithRef<E>["ref"]` | — | no | — |

## Types

### VSheetVariant

VSheet surface style: a filled panel or an outlined one.

```ts
type VSheetVariant = "filled" | "outlined";
```
