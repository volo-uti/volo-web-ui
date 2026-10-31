# VImage

Image with loading placeholder, fade-in and error fallback; `ref` is the `<img>`.

## Examples

### VImage

```tsx
<VImage src="/photo.jpg" alt="Photo" width={200} height={200} />
<VImage src="/photo.jpg" alt="Photo" borderRadius="var(--v-radius-md)" />
```

## Props

### VImageProps

VImage props — native `<img>` props (`srcSet`, `sizes`, `loading`, `crossOrigin`, `onLoad`, …)
go to the image; `className` and `style` go to the wrapper.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `src` | `string` | — | yes | Image source URL. |
| `fit` | `"contain" \| "cover" \| "fill" \| "none" \| "scale-down"` | `'cover'` | no | CSS object-fit of the image. |
| `borderRadius` | `string \| number` | — | no | Border radius of the wrapper — CSS value, or a number in px. |
| `placeholder` | `ReactNode` | — | no | Content shown while the image loads. |
| `errorFallback` | `ReactNode` | — | no | Content shown when the image fails to load; a default "!" tile otherwise. |
| `width` | `number \| string` | — | no | Wrapper width — CSS value, or a number in px. |
| `height` | `number \| string` | — | no | Wrapper height — CSS value, or a number in px. |
| `fadeInDuration` | `number` | `300` | no | Fade-in animation duration in ms. |
| `style` | `CSSProperties` | — | no | Styles of the wrapper element. |
