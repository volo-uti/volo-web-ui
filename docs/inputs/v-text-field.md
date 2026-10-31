# VTextField

Single-line text input with label, messages, adornments and a clear button.

Works controlled (`value` + `onValueChange`) or uncontrolled (`defaultValue`).
Wraps the input in VFormBody and VFormField; native input props pass through.

## Examples

### VTextField

```tsx
<VTextField
  label="Email"
  type="email"
  value={email}
  onValueChange={setEmail}
  error={!valid}
  errorText="Enter a valid email"
/>
```

## Props

### VTextFieldProps

VTextField props.

Every native `<input>` attribute (`type`, `name`, `placeholder`, `disabled`, `readOnly`,
`onChange`, `onBlur`, …) passes through to the input element.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VTextFieldVariant` | `'outlined'` | no | Surface style. |
| `size` | `VSize` | `'md'` | no | Height, padding and font size. |
| `color` | `VTextFieldColor` | `'primary'` | no | Colour of the focus ring. |
| `corner` | `VTextFieldCorner` | `'rounded'` | no | Corner shape. |
| `value` | `string` | — | no | Controlled value. |
| `defaultValue` | `string` | `''` | no | Initial value when uncontrolled. |
| `onValueChange` | `(value: string) => void` | — | no | Called with the new value on every edit and on clear. |
| `label` | `ReactNode` | — | no | Label shown above the input. |
| `required` | `boolean` | `false` | no | Shows the required mark after the label. |
| `requiredMark` | `string` | `'*'` | no | Character used as the required mark. |
| `tooltip` | `ReactNode` | — | no | Element placed next to the label, e.g. a help icon. |
| `more` | `ReactNode` | — | no | Extra info aligned to the right end of the label row. |
| `leading` | `ReactNode` | — | no | Element before the input text, e.g. an icon. |
| `trailing` | `ReactNode` | — | no | Element after the input text, e.g. an icon. |
| `suffix` | `ReactNode` | — | no | Text after the input text, e.g. a unit. |
| `helper` | `ReactNode` | — | no | Hint shown below the input when there is no error or success message. |
| `error` | `boolean` | `false` | no | Error state; sets `aria-invalid`, shows `errorText` and turns the border to the error colour. |
| `errorText` | `ReactNode` | — | no | Message shown while `error` is true. |
| `success` | `boolean` | `false` | no | Success state; shows `successText` and turns the border to the success colour. |
| `successText` | `ReactNode` | — | no | Message shown while `success` is true. |
| `extra` | `ReactNode` | — | no | Note that stays visible below the message. |
| `maxLength` | `number` | — | no | Character limit; shows a `current/max` counter. |
| `fullWidth` | `boolean` | `false` | no | Stretches the field to the full width of its parent. |
| `loading` | `boolean` | `false` | no | Shows a spinner after the input text. |
| `clearable` | `boolean` | `false` | no | Shows a clear button while the input has a value. |

## Types

### VTextFieldVariant

VTextField surface style; same set as VFormBody.

```ts
type VTextFieldVariant = VFormBodyVariant;
```

### VTextFieldColor

VTextField focus-ring colour; same set as VFormBody.

```ts
type VTextFieldColor = VFormBodyColor;
```

### VTextFieldCorner

VTextField corner shape; same set as VFormBody.

```ts
type VTextFieldCorner = VFormBodyCorner;
```
