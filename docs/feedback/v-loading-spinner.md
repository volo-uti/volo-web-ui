# VLoadingSpinner

Circular arc spinner for an unknown wait; `role="status"` with a localized label.

Animated with CSS only. Pass `color="currentColor"` to follow the surrounding text colour.

## Examples

### VLoadingSpinner

```tsx
<VLoadingSpinner size="lg" color="var(--v-success)" />
```

## Props

### VLoadingSpinnerProps

VLoadingSpinner props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `VSize \| number` | `'md'` | no | Spinner size: a `VSize` step or a diameter in px. |
| `color` | `string` | `'var(--v-primary)'` | no | Spinner colour: any CSS colour, such as `"currentColor"` or `"var(--v-success)"`. |
| `strokeWidth` | `number` | `size / 12, at least 2` | no | Stroke width in px. |
