# VTextArea

Multi-line text input with label, messages, a counter and optional auto-resize.

Works controlled (`value` + `onValueChange`) or uncontrolled (`defaultValue`).
Wraps the textarea in VFormField; native textarea props pass through.

## Examples

### VTextArea

```tsx
<VTextArea label="Bio" rows={4} maxLength={200} value={bio} onValueChange={setBio} />
```

## Props

### VTextAreaProps

VTextArea props.

Every native `<textarea>` attribute (`name`, `placeholder`, `disabled`, `readOnly`,
`onChange`, `onBlur`, …) passes through to the textarea element.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `VSize` | `'md'` | no | Padding and font size. |
| `value` | `string` | — | no | Controlled value. |
| `defaultValue` | `string` | `''` | no | Initial value when uncontrolled. |
| `onValueChange` | `(value: string) => void` | — | no | Called with the new value on every edit. |
| `label` | `ReactNode` | — | no | Label shown above the textarea. |
| `required` | `boolean` | `false` | no | Shows the required mark after the label. |
| `requiredMark` | `string` | `'*'` | no | Character used as the required mark. |
| `tooltip` | `ReactNode` | — | no | Element placed next to the label, e.g. a help icon. |
| `more` | `ReactNode` | — | no | Extra info aligned to the right end of the label row. |
| `helper` | `ReactNode` | — | no | Hint shown below the textarea when there is no error or success message. |
| `error` | `boolean` | `false` | no | Error state; sets `aria-invalid`, shows `errorText` and turns the border to the error colour. |
| `errorText` | `ReactNode` | — | no | Message shown while `error` is true. |
| `success` | `boolean` | `false` | no | Success state; shows `successText`. |
| `successText` | `ReactNode` | — | no | Message shown while `success` is true. |
| `extra` | `ReactNode` | — | no | Note that stays visible below the message. |
| `maxLength` | `number` | — | no | Character limit; shows a `current/max` counter when `showCounter` is on. |
| `showCounter` | `boolean` | `true` | no | Shows the `current/max` counter; only has an effect when `maxLength` is set. |
| `fullWidth` | `boolean` | `false` | no | Stretches the field to the full width of its parent. |
| `rows` | `number` | `3` | no | Number of visible text rows. |
| `resize` | `VTextAreaResize` | `'vertical'` | no | Which directions the user can drag to resize; ignored with `autoResize`. |
| `autoResize` | `boolean` | `false` | no | Grows the height with the content. |

## Types

### VTextAreaResize

Resize handles a VTextArea offers.

```ts
type VTextAreaResize = "none" | "vertical" | "horizontal" | "both";
```
