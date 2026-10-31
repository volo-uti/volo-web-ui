# VRadio

Labelled radio; must sit inside a VRadioGroup.

## Parts

- `VRadioGroup` — Container of VRadio items that owns the selected value and arrow-key navigation.

## Examples

### VRadioGroup

```tsx
<VRadioGroup value={value} onValueChange={setValue}>
  <VRadio value="a" label="Option A" />
  <VRadio value="b" label="Option B" />
</VRadioGroup>
```

### VRadio

```tsx
<VRadio value="option1" label="Option 1" sublabel="Billed monthly" />
```

## Props

### VRadioGroupProps

Props of VRadioGroup.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `VSize` | `'md'` | no | Size of every radio. |
| `value` | `string` | — | no | Value of the selected radio (controlled). |
| `defaultValue` | `string` | `''` | no | Value of the initially selected radio (uncontrolled). |
| `children` | `ReactNode` | — | no | The VRadio items. |
| `orientation` | `VOrientation` | `'vertical'` | no | Direction the radios are laid out in; also sets the arrow-key axis. |
| `disabled` | `boolean` | `false` | no | Disables every radio. |
| `onValueChange` | `(value: string) => void` | — | no | Called with the value of the radio the user selects. |
| `name` | `string` | — | no | Shared `name` of the radios for form submission; generated when omitted. |
| `className` | `string` | — | no | Additional class names (Tailwind). |

### VRadioProps

Props of VRadio.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | yes | Value the group reports when this radio is selected. |
| `label` | `ReactNode` | — | no | Label next to the radio; clicking it selects the radio. |
| `sublabel` | `ReactNode` | — | no | Secondary text below the label. |
| `disabled` | `boolean` | `false` | no | Disables this radio; a disabled group disables it too. |
| `className` | `string` | — | no | Additional class names (Tailwind). |
