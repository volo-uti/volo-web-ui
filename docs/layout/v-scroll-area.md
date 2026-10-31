# VScrollArea

Scrollable region with a themed, optionally auto-hiding scrollbar.

While its content overflows, the region becomes a keyboard tab stop so the keys can scroll it.
Pass `aria-label` or `aria-labelledby` to also expose it as a named `region`.

## Examples

### VScrollArea

```tsx
<VScrollArea maxHeight={240} scrollbar="always">
  <VStack spacing="sm">{items}</VStack>
</VScrollArea>
```

## Props

### VScrollAreaProps

VScrollArea props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `scrollbarThickness` | `number` | `6` | no | Scrollbar thickness in pixels. |
| `scrollbarRadius` | `number` | `3` | no | Scrollbar corner radius in pixels. |
| `thumbColor` | `string` | `undefined` | no | Thumb colour; any CSS colour. Defaults to a muted foreground tone. |
| `trackColor` | `string` | `undefined` | no | Track colour; any CSS colour. Defaults to the muted surface. |
| `maxHeight` | `number \| string` | `undefined` | no | Height at which vertical scrolling starts. Accepts pixels as a number or any CSS length. |
| `maxWidth` | `number \| string` | `undefined` | no | Width at which horizontal scrolling starts. Accepts pixels as a number or any CSS length. |
| `direction` | `VScrollAreaDirection` | `"vertical"` | no | Axes that scroll. |
| `padding` | `string \| number` | `undefined` | no | Padding inside the scroll area. Accepts pixels as a number or any CSS length. |
| `scrollbar` | `VScrollAreaScrollbar` | `"auto"` | no | When the thumb shows: on hover or focus (`auto`, `hover`), always, or never (`hidden`). |

## Types

### VScrollAreaDirection

Axes a VScrollArea scrolls on.

```ts
type VScrollAreaDirection = "vertical" | "horizontal" | "both";
```

### VScrollAreaScrollbar

When the scrollbar thumb is visible.

```ts
type VScrollAreaScrollbar = "auto" | "always" | "hover" | "hidden";
```
