# VFormBody

Bordered surface that holds a form control with optional leading and trailing elements.

Draws the border, background, focus ring and error or success look; the control inside
stays yours. VTextField uses it internally.

## Examples

### VFormBody

```tsx
<VFormBody leading={<SearchIcon />} error={!valid}>
  <input className="min-w-0 flex-1 bg-transparent outline-none" />
</VFormBody>
```

## Props

### VFormBodyProps

VFormBody props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | Control placed inside the body, e.g. a native `<input>`. |
| `variant` | `VFormBodyVariant` | `'outlined'` | no | Surface style. |
| `size` | `VSize` | `'md'` | no | Height, padding and font size. |
| `color` | `VFormBodyColor` | `'primary'` | no | Colour of the focus ring. |
| `corner` | `VFormBodyCorner` | `'rounded'` | no | Corner shape. |
| `leading` | `ReactNode` | — | no | Element before the control, e.g. an icon or prefix. |
| `trailing` | `ReactNode` | — | no | Element after the control, e.g. an icon or suffix. |
| `fullWidth` | `boolean` | `false` | no | Stretches the body to the full width of its parent. |
| `disabled` | `boolean` | `false` | no | Dims the body and blocks pointer events. |
| `readOnly` | `boolean` | `false` | no | Read-only look; the body gets a muted background. |
| `focused` | `boolean` | `false` | no | Draws the focus ring even without focus inside. |
| `error` | `boolean` | `false` | no | Error look; the border turns to the error colour. |
| `success` | `boolean` | `false` | no | Success look; the border turns to the success colour. |

## Types

### VFormBodyColor

Colours VFormBody draws its focus ring in.

```ts
type VFormBodyColor = Extract<VColor, "primary" | "secondary" | "destructive">;
```

### VFormBodyCorner

Corner shape of VFormBody.

```ts
type VFormBodyCorner = "square" | "rounded" | "pill";
```

### VFormBodyVariant

Surface style of VFormBody.

```ts
type VFormBodyVariant = "outlined" | "filled" | "underline";
```
