# VStepper

Numbered step progress with labels, in a row or a column.

## Examples

### VStepper

```tsx
<VStepper
  value={1}
  onValueChange={setStep}
  steps={[
    { label: 'Account' },
    { label: 'Profile' },
    { label: 'Review' },
  ]}
/>
```

## Props

### VStepperProps

Props of VStepper.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `steps` | `VStep[]` | — | yes | Steps in order. |
| `value` | `number` | — | no | Active step index, 0-based (controlled). |
| `defaultValue` | `number` | `0` | no | Initial active step when `value` is not given. |
| `orientation` | `VOrientation` | `"horizontal"` | no | Layout direction. |
| `alternativeLabel` | `boolean` | `false` | no | Whether labels sit below the circles (horizontal only). |
| `compact` | `boolean` | `false` | no | Shows only circles and connectors, without labels. |
| `onValueChange` | `(index: number) => void` | — | no | Called with the pressed step index; when given, steps become buttons. |

## Types

### VStep

One step of a VStepper.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `label` | `ReactNode` | — | yes | Step label. |
| `description` | `ReactNode` | — | no | Secondary text under the label. |
| `icon` | `ReactNode` | — | no | Icon shown in the circle instead of the step number. |
| `optional` | `boolean` | `false` | no | Marks the label as optional. |
| `error` | `boolean` | `false` | no | Shows the step in the error style. |
| `disabled` | `boolean` | `false` | no | Whether the step cannot be chosen. |
