# VAutocomplete

Text input with suggestions filtered as you type.

## Examples

### VAutocomplete

```tsx
<VAutocomplete
  items={[{ value: 'apple', label: 'Apple' }, { value: 'banana', label: 'Banana' }]}
  placeholder="Search fruit..."
  value={fruit}
  onValueChange={setFruit}
/>
```

## Props

### VAutocompleteProps

Props of VAutocomplete.

Selects one item from a fixed `items` list.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `VSize` | `'md'` | no | Component size. |
| `value` | `string` | — | no | Value of the selected item (controlled). |
| `defaultValue` | `string` | `''` | no | Value of the initially selected item (uncontrolled). |
| `label` | `string` | — | no | Label above the input. |
| `placeholder` | `string` | — | no | Text shown while the input is empty. |
| `items` | `VOption[]` | — | yes | Items to suggest; those matching the typed text are listed. |
| `allowCustomValue` | `boolean` | `false` | no | Lets the user press Enter to select the typed text when it matches no item; it becomes the value. |
| `filterFn` | `(query: string, item: VOption) => boolean` | `case-insensitive "label contains query"` | no | Decides which items match the typed text; return true to keep the item. |
| `emptyText` | `string` | — | no | Message shown when no item matches; defaults to the locale text. |
| `emptyRenderer` | `(query: string) => ReactNode` | — | no | Renders a custom empty state in place of `emptyText`. |
| `required` | `boolean` | `false` | no | Marks the field as required. |
| `requiredMark` | `string` | — | no | Character of the required mark. |
| `tooltip` | `ReactNode` | — | no | Tooltip next to the label. |
| `more` | `ReactNode` | — | no | Extra info on the right of the header. |
| `helper` | `ReactNode` | — | no | Helper text below the input. |
| `error` | `boolean` | `false` | no | Error state; shows `errorText`. |
| `errorText` | `ReactNode` | — | no | Message shown in the error state. |
| `success` | `boolean` | `false` | no | Success state; shows `successText`. |
| `successText` | `ReactNode` | — | no | Message shown in the success state. |
| `extra` | `ReactNode` | — | no | Always-visible note below the message. |
| `fullWidth` | `boolean` | `false` | no | Stretches the field to the full width. |
| `disabled` | `boolean` | `false` | no | Disables the input. |
| `loading` | `boolean` | `false` | no | Shows a spinner in the input. |
| `readOnly` | `boolean` | `false` | no | Blocks editing and opening the list; the value stays readable. |
| `onValueChange` | `(value: string \| null) => void` | — | no | Called with the picked value, the custom text, or `""` when the text is emptied. |
| `onInputChange` | `(query: string) => void` | — | no | Called with the typed text each time it changes. |
| `className` | `string` | — | no | Additional class names (Tailwind). |
