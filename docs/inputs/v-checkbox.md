# VCheckbox

Checkbox with label, indeterminate state and card variant.

## Parts

- `VCheckboxGroup` — Group of checkboxes for multi-select that tracks the list of selected values.

## Examples

### VCheckboxGroup

```tsx
<VCheckboxGroup
  options={[
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push' },
  ]}
  value={selected}
  onValueChange={setSelected}
/>
```

### VCheckbox

```tsx
<VCheckbox label="Remember me" checked={value} onCheckedChange={setValue} />
```

## Props

### VCheckboxGroupProps

Props of VCheckboxGroup.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `VSize` | `'md'` | no | Size of every checkbox. |
| `options` | `VCheckboxGroupItem<T>[]` | — | yes | Options to render, one checkbox each. |
| `value` | `T[]` | — | no | Selected values (controlled). |
| `defaultValue` | `T[]` | `[]` | no | Initially selected values (uncontrolled). |
| `orientation` | `VOrientation` | `'vertical'` | no | Direction the checkboxes are laid out in. |
| `disabled` | `boolean` | `false` | no | Disables every option. |
| `onValueChange` | `(values: T[]) => void` | — | no | Called with the full list of selected values when one option is toggled. |
| `className` | `string` | — | no | Additional class names (Tailwind). |

### VCheckboxProps

Props of VCheckbox.

Indeterminate is a separate flag next to `checked`, like the DOM `indeterminate` property.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VCheckboxVariant` | `'default'` | no | Visual variant. |
| `size` | `VSize` | `'md'` | no | Component size. |
| `label` | `ReactNode` | — | no | Label next to the box; clicking it toggles the checkbox. |
| `sublabel` | `ReactNode` | — | no | Secondary text below the label. |
| `disabled` | `boolean` | `false` | no | Disables the checkbox. |
| `checked` | `boolean` | — | no | Checked state (controlled). |
| `defaultChecked` | `boolean` | `false` | no | Initial checked state (uncontrolled). |
| `indeterminate` | `boolean` | `false` | no | Shows the mixed state (a minus instead of a check); visual only, `checked` is unchanged. |
| `onCheckedChange` | `(checked: boolean) => void` | — | no | Called with the new checked state when the user toggles the checkbox. |
| `className` | `string` | — | no | Additional class names (Tailwind). |

## Types

### VCheckboxGroupItem

One option of a VCheckboxGroup.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `T` | — | yes | Value reported in the selection when this option is checked. |
| `label` | `ReactNode` | — | yes | Label of the option. |
| `sublabel` | `ReactNode` | — | no | Secondary text below the label. |
| `disabled` | `boolean` | — | no | Disables only this option. |

### VCheckboxVariant

Look of a VCheckbox: plain, or a bordered card around the whole control.

```ts
type VCheckboxVariant = "default" | "card";
```
