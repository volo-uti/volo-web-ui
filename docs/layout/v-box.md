# VBox

Plain container with optional card, outlined or elevated surface.

## Examples

### VBox

```tsx
<VBox variant="card" padding={16} rounded="lg">
  <VStack spacing="sm">Content</VStack>
</VBox>
```

## Props

### VBoxProps

VBox props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VBoxVariant` | `"default"` | no | Visual variant. |
| `padding` | `string \| number` | `undefined` | no | Inner padding. Accepts pixels as a number or any CSS length. |
| `margin` | `string \| number` | `undefined` | no | Outer margin. Accepts pixels as a number or any CSS length. |
| `bordered` | `boolean` | `false` | no | Draws a border around the default variant; the other variants already have one. |
| `rounded` | `boolean \| Extract<VSize, "sm" \| "md" \| "lg">` | `false` | no | Corner radius: `true` is medium, or pick `sm`, `md` or `lg`. |
| `width` | `string \| number` | `undefined` | no | Width. Accepts pixels as a number or any CSS length. |
| `height` | `string \| number` | `undefined` | no | Height. Accepts pixels as a number or any CSS length. |

## Types

### VBoxVariant

Look of a VBox: plain, card, outlined or elevated.

```ts
type VBoxVariant = "default" | "card" | "outlined" | "elevated";
```
