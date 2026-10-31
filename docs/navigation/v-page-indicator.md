# VPageIndicator

Page position as dots, a number or a progress line.

## Examples

### VPageIndicator

```tsx
<VPageIndicator total={5} value={page} onValueChange={setPage} />
```

## Props

### VPageIndicatorProps

Props of VPageIndicator.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VPageIndicatorStyle` | `"dots"` | no | Visual style. |
| `size` | `Extract<VSize, "sm" \| "md" \| "lg">` | `"md"` | no | Indicator size. |
| `total` | `number` | — | yes | Total number of pages. |
| `value` | `number` | — | no | Current page index, 0-based (controlled). |
| `defaultValue` | `number` | `0` | no | Initial page index when `value` is not given. |
| `expandActive` | `boolean` | `true` | no | Whether the active dot is wider than the others. |
| `separator` | `VPageIndicatorSeparator` | `"slash"` | no | Separator of the "number" variant. |
| `onValueChange` | `(index: number) => void` | — | no | Called with the chosen index; when given, dots, bars and arrows become pressable. |

## Types

### VPageIndicatorStyle

How VPageIndicator draws the position.

```ts
type VPageIndicatorStyle = "dots" | "number" | "line";
```

### VPageIndicatorSeparator

Text between the numbers of the "number" variant.

```ts
type VPageIndicatorSeparator = "slash" | "of" | "dash" | "pipe";
```
