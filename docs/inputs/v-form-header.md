# VFormHeader

Label row above a form field: label, required mark, tooltip and extra info.

Renders nothing when `label`, `tooltip` and `more` are all empty.
VFormField uses it internally; use it on its own to build a custom field layout.

## Examples

### VFormHeader

```tsx
<VFormHeader label="Email" required htmlFor="email" more="Optional after sign-up" />
```

## Props

### VFormHeaderProps

VFormHeader props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `label` | `ReactNode` | — | no | Label shown above the field body; renders a `<label>` tied to `htmlFor`. |
| `required` | `boolean` | `false` | no | Shows the required mark after the label. |
| `requiredMark` | `string` | `'*'` | no | Character used as the required mark. |
| `tooltip` | `ReactNode` | — | no | Element placed next to the label, e.g. a help icon. |
| `more` | `ReactNode` | — | no | Extra info aligned to the right end of the header. |
| `size` | `VSize` | `'md'` | no | Label text size. |
| `htmlFor` | `string` | — | no | `id` of the control the label belongs to. |
