# VToggleButton

Button that toggles and exposes aria-pressed.

## Examples

### VToggleButton

```tsx
<VToggleButton pressed={bold} onPressedChange={setBold}>
  Bold
</VToggleButton>
```

## Props

### VToggleButtonProps

Props of VToggleButton.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VToggleButtonVariant` | `'ghost'` | no | Visual variant. |
| `size` | `VSize` | `'md'` | no | Component size. |
| `children` | `ReactNode` | — | no | Content of the button. |
| `disabled` | `boolean` | `false` | no | Disables the button. |
| `pressed` | `boolean` | — | no | Pressed state (controlled). |
| `defaultPressed` | `boolean` | `false` | no | Initial pressed state (uncontrolled). |
| `onPressedChange` | `(pressed: boolean) => void` | — | no | Called with the new pressed state when the user toggles the button. |
| `className` | `string` | — | no | Additional class names (Tailwind). |

## Types

### VToggleButtonVariant

Look of a VToggleButton; the pressed state is drawn on top of it.

```ts
type VToggleButtonVariant = Extract<VVariant, "filled" | "outlined" | "ghost">;
```
