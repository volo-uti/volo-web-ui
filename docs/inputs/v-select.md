# VSelect

Dropdown select, single or multiple.

## Parts

- `VSelectTrigger` — Button of a VSelect that shows the current choice and opens the list.
- `VSelectContent` — Dropdown panel of a VSelect that holds its items; rendered only while open.
- `VSelectItem` — Selectable item of a VSelect that reports its `value` when picked.
- `VSelectGroup` — Groups related VSelectItem entries under an optional VSelectLabel.
- `VSelectLabel` — Heading of a VSelectGroup.

## Examples

### VSelect

```tsx
<VSelect value={fruit} onValueChange={setFruit}>
  <VSelectTrigger>Choose fruit</VSelectTrigger>
  <VSelectContent>
    <VSelectItem value="apple">Apple</VSelectItem>
    <VSelectItem value="banana">Banana</VSelectItem>
  </VSelectContent>
</VSelect>
```

## Props

### VSelectProps

Props of VSelect.

Values are strings only, so map option values to objects yourself for complex data.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `VSize` | `'md'` | no | Component size. |
| `value` | `string \| string[]` | — | no | Selected value (controlled); an array when `multiple`. |
| `defaultValue` | `string \| string[]` | `'' ('[]' when `multiple`)` | no | Initially selected value (uncontrolled). |
| `multiple` | `boolean` | `false` | no | Allows several items to be selected; the value is then a string array. |
| `maxSelection` | `number` | — | no | Most items that can be selected in `multiple` mode; the other items are disabled once reached. |
| `label` | `string` | — | no | Label above the select. |
| `placeholder` | `string` | — | no | Text shown while nothing is selected; defaults to the locale text. |
| `children` | `ReactNode` | — | no | A VSelectTrigger and a VSelectContent. |
| `required` | `boolean` | `false` | no | Marks the field as required. |
| `requiredMark` | `string` | — | no | Character of the required mark. |
| `tooltip` | `ReactNode` | — | no | Tooltip next to the label. |
| `more` | `ReactNode` | — | no | Extra info on the right of the header. |
| `helper` | `ReactNode` | — | no | Helper text below the select. |
| `error` | `boolean` | `false` | no | Error state; shows `errorText`. |
| `errorText` | `ReactNode` | — | no | Message shown in the error state. |
| `success` | `boolean` | `false` | no | Success state; shows `successText`. |
| `successText` | `ReactNode` | — | no | Message shown in the success state. |
| `extra` | `ReactNode` | — | no | Always-visible note below the message. |
| `fullWidth` | `boolean` | `false` | no | Stretches the select to the full width. |
| `disabled` | `boolean` | `false` | no | Disables the select. |
| `readOnly` | `boolean` | `false` | no | Keeps the value readable but blocks opening the list. |
| `loading` | `boolean` | `false` | no | Shows a spinner in the trigger. |
| `onValueChange` | `(value: string \| string[]) => void` | — | no | Called with the new value (an array when `multiple`) when the user picks an item. |
| `className` | `string` | — | no | Additional class names (Tailwind). |

### VSelectTriggerProps

Props of VSelectTrigger.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | What the trigger shows, usually the selected item's label. |
| `className` | `string` | — | no | Additional class names (Tailwind). |

### VSelectContentProps

Props of VSelectContent.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | The VSelectItem, VSelectGroup and VSelectLabel entries. |
| `className` | `string` | — | no | Additional class names (Tailwind). |

### VSelectItemProps

Props of VSelectItem.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | yes | Value reported when this item is picked. |
| `children` | `ReactNode` | — | no | Label of the item. |
| `disabled` | `boolean` | `false` | no | Disables this item. |
| `className` | `string` | — | no | Additional class names (Tailwind). |

### VSelectGroupProps

Props of VSelectGroup.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | A VSelectLabel followed by its items. |
| `className` | `string` | — | no | Additional class names (Tailwind). |

### VSelectLabelProps

Props of VSelectLabel.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | Text of the group heading. |
| `className` | `string` | — | no | Additional class names (Tailwind). |
