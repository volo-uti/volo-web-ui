# VButton

Text button with variants, loading state and leading/trailing slots.

`as` renders another element.

## Examples

### VButton

```tsx
<VButton variant="filled" leading={<PlusIcon />} onClick={add}>Add item</VButton>
<VButton as="a" href="/path" variant="link">Go</VButton>
```

## Props

### VButtonOwnProps

Own props of VButton (before the polymorphic merge).

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VButtonVariant` | `'filled'` | no | Visual variant. |
| `size` | `VSize` | `'md'` | no | Component size; maps to the `--v-size-{size}-*` CSS variables. |
| `color` | `VColor` | `'primary'` | no | Semantic colour. |
| `corner` | `VButtonCorner` | `'rounded'` | no | Corner style. |
| `children` | `ReactNode` | — | no | Label of the button. |
| `leading` | `ReactNode` | — | no | Content placed before the label (icon, avatar). |
| `trailing` | `ReactNode` | — | no | Content placed after the label (icon, badge). |
| `leadingGap` | `number` | — | no | Gap in px between `leading` and the label; defaults to the size's gap token. |
| `trailingGap` | `number` | — | no | Gap in px between the label and `trailing`; defaults to the size's gap token. |
| `loadingIndicator` | `ReactNode` | — | no | Replaces the default spinner shown while `loading`. |
| `tooltip` | `string` | — | no | Hover hint, set as the native `title` attribute. |
| `fullWidth` | `boolean` | `false` | no | Stretches the button to the full width of its container. |
| `align` | `VButtonAlign` | `'center'` | no | Horizontal alignment of the content. |
| `disabled` | `boolean` | `false` | no | Disables the button. |
| `loading` | `boolean` | `false` | no | Shows a spinner and blocks interaction. |
| `loadingPosition` | `VButtonLoadingPosition` | `'center'` | no | Where the spinner appears while `loading`. |
| `onLongPress` | `() => void` | — | no | Called when the pointer stays pressed for 500 ms. |
| `className` | `string` | — | no | Additional class names (Tailwind). |

### VButtonProps

Polymorphic VButton props; `as` changes the rendered element.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VButtonVariant` | `'filled'` | no | Visual variant. |
| `size` | `VSize` | `'md'` | no | Component size; maps to the `--v-size-{size}-*` CSS variables. |
| `color` | `VColor` | `'primary'` | no | Semantic colour. |
| `corner` | `VButtonCorner` | `'rounded'` | no | Corner style. |
| `children` | `ReactNode` | — | no | Label of the button. |
| `leading` | `ReactNode` | — | no | Content placed before the label (icon, avatar). |
| `trailing` | `ReactNode` | — | no | Content placed after the label (icon, badge). |
| `leadingGap` | `number` | — | no | Gap in px between `leading` and the label; defaults to the size's gap token. |
| `trailingGap` | `number` | — | no | Gap in px between the label and `trailing`; defaults to the size's gap token. |
| `loadingIndicator` | `ReactNode` | — | no | Replaces the default spinner shown while `loading`. |
| `tooltip` | `string` | — | no | Hover hint, set as the native `title` attribute. |
| `fullWidth` | `boolean` | `false` | no | Stretches the button to the full width of its container. |
| `align` | `VButtonAlign` | `'center'` | no | Horizontal alignment of the content. |
| `disabled` | `boolean` | `false` | no | Disables the button. |
| `loading` | `boolean` | `false` | no | Shows a spinner and blocks interaction. |
| `loadingPosition` | `VButtonLoadingPosition` | `'center'` | no | Where the spinner appears while `loading`. |
| `onLongPress` | `() => void` | — | no | Called when the pointer stays pressed for 500 ms. |
| `className` | `string` | — | no | Additional class names (Tailwind). |
| `as` | `E` | — | no | — |
| `ref` | `ComponentPropsWithRef<E>["ref"]` | — | no | — |

## Types

### VButtonVariant

Look of a VButton.

```ts
type VButtonVariant = "filled" | "outlined" | "text" | "ghost" | "icon" | "link";
```
