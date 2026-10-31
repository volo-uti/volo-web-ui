# VIconButton

Icon-only button with four variants and an optional pressed (toggle) state.

## Examples

### VIconButton

```tsx
<VIconButton aria-label="Close" onClick={close}>
  <XIcon />
</VIconButton>

<VIconButton aria-label="Favorite" pressed={fav} onPressedChange={setFav} pressedIcon={<HeartFilled />}>
  <HeartOutline />
</VIconButton>
```

## Props

### VIconButtonOwnProps

Own props of VIconButton, without the accessible name.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VIconButtonVariant` | `'default'` | no | Visual variant. |
| `size` | `VSize` | `'md'` | no | Component size. |
| `color` | `VColor` | `'primary'` | no | Semantic colour. |
| `children` | `ReactNode` | — | yes | The icon. |
| `pressedIcon` | `ReactNode` | — | no | Icon shown instead of `children` while pressed; setting it makes the button a toggle. |
| `tooltip` | `string` | — | no | Hover hint, set as the native `title` attribute. |
| `disabled` | `boolean` | `false` | no | Disables the button. |
| `loading` | `boolean` | `false` | no | Shows a spinner and blocks interaction. |
| `pressed` | `boolean` | — | no | Pressed state of a toggle button (controlled). |
| `defaultPressed` | `boolean` | `false` | no | Initial pressed state of a toggle button (uncontrolled). |
| `onPressedChange` | `(pressed: boolean) => void` | — | no | Called with the new pressed state when the user toggles the button. |
| `className` | `string` | — | no | Additional class names (Tailwind). |

### VIconButtonProps

Props of VIconButton: own props, an accessible name, and the native button props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VIconButtonVariant` | `'default'` | no | Visual variant. |
| `size` | `VSize` | `'md'` | no | Component size. |
| `color` | `VColor` | `'primary'` | no | Semantic colour. |
| `children` | `ReactNode` | — | yes | The icon. |
| `pressedIcon` | `ReactNode` | — | no | Icon shown instead of `children` while pressed; setting it makes the button a toggle. |
| `tooltip` | `string` | — | no | Hover hint, set as the native `title` attribute. |
| `disabled` | `boolean` | `false` | no | Disables the button. |
| `loading` | `boolean` | `false` | no | Shows a spinner and blocks interaction. |
| `pressed` | `boolean` | — | no | Pressed state of a toggle button (controlled). |
| `defaultPressed` | `boolean` | `false` | no | Initial pressed state of a toggle button (uncontrolled). |
| `onPressedChange` | `(pressed: boolean) => void` | — | no | Called with the new pressed state when the user toggles the button. |
| `className` | `string` | — | no | Additional class names (Tailwind). |
| `aria-label` | `string` | — | no | — |
| `aria-labelledby` | `string` | — | no | — |
| `as` | `ElementType` | — | no | — |

## Types

### VIconButtonVariant

Look of a VIconButton.

```ts
type VIconButtonVariant = "default" | "filled" | "outlined" | "filledTonal";
```

### VIconButtonLabel

Accessible name of an icon-only button: `aria-label` or `aria-labelledby` is required.

```ts
type VIconButtonLabel =
  | { "aria-label": string; "aria-labelledby"?: string }
  | { "aria-label"?: string; "aria-labelledby": string };
```
