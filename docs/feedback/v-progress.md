# VProgress

Linear or circular progress bar, determinate (0-100) or indeterminate.

It has `role="progressbar"`.

Give it an accessible name with `aria-label` or `aria-labelledby`.

## Examples

### VProgress

```tsx
<VProgress value={60} color="success" aria-label="Upload progress" />
```

## Props

### VProgressProps

VProgress props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VProgressVariant` | `'linear'` | no | Bar or ring. |
| `size` | `VSize` | `'md'` | no | Thickness (linear) or diameter (circular). |
| `color` | `VProgressColor` | `'primary'` | no | Colour of the filled part. |
| `backgroundColor` | `string` | — | no | Track colour as any CSS colour; defaults to the muted theme colour. |
| `value` | `number` | — | no | Progress from 0 to 100; values outside are clamped and warned about in development. Ignored while `indeterminate`. |
| `indeterminate` | `boolean` | `false` | no | Shows a looping animation and drops `aria-valuenow`. |

## Types

### VProgressVariant

VProgress shape: a horizontal bar or a ring.

```ts
type VProgressVariant = "linear" | "circular";
```

### VProgressColor

VProgress colour: a `VColor` plus the status colours.

```ts
type VProgressColor = VColor | "success" | "warning";
```
