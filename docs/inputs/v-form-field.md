# VFormField

Form field that stacks a label row, a control and a message row.

Composes VFormHeader and VFormFooter; message priority is error, then success, then helper.

## Examples

### VFormField

```tsx
<VFormField label="Username" required helper="Choose a unique name">
  <VTextField />
</VFormField>
```

```tsx
<VFormField label="Bio" maxLength={200} currentLength={text.length}>
  <VTextArea value={text} onValueChange={setText} />
</VFormField>
```

## Props

### VFormFieldProps

VFormField props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | The control, usually a VTextField body or any native input. |
| `label` | `ReactNode` | — | no | Label shown above the control. |
| `size` | `VSize` | `'md'` | no | Text size of the label and messages. |
| `required` | `boolean` | `false` | no | Shows the required mark after the label. |
| `requiredMark` | `string` | `'*'` | no | Character used as the required mark. |
| `tooltip` | `ReactNode` | — | no | Element placed next to the label, e.g. a help icon. |
| `more` | `ReactNode` | — | no | Extra info aligned to the right end of the label row. |
| `helper` | `ReactNode` | — | no | Hint shown when there is no error or success message. |
| `error` | `boolean` | `false` | no | Error state; shows `errorText` and takes priority over success and helper. |
| `errorText` | `ReactNode` | — | no | Message shown while `error` is true. |
| `success` | `boolean` | `false` | no | Success state; shows `successText` and takes priority over helper. |
| `successText` | `ReactNode` | — | no | Message shown while `success` is true. |
| `extra` | `ReactNode` | — | no | Note that stays visible below the message. |
| `maxLength` | `number` | — | no | Character limit; shows a `current/max` counter. |
| `currentLength` | `number` | — | no | Current character count shown in the counter. |
| `htmlFor` | `string` | — | no | `id` of the control the label belongs to; the message paragraph gets `<htmlFor>-message`. |
