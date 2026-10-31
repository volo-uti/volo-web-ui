# VLabel

Form label with size tokens and a required mark; renders a native `<label>`.

## Examples

### VLabel

```tsx
<VLabel htmlFor="email" required>Email Address</VLabel>
```

## Props

### VLabelProps

Props of VLabel: own props and the native label props (`htmlFor`, ...).

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `VSize` | `'md'` | no | Text size. |
| `children` | `ReactNode` | — | no | Label text. |
| `required` | `boolean` | `false` | no | Shows the required mark after the text. |
| `requiredMark` | `string` | `'*'` | no | Character shown when `required`. |
| `className` | `string` | — | no | Additional class names (Tailwind). |
