# VFormFooter

Message row below a form field: error, success or helper text, counter and extra note.

Message priority is error, then success, then helper. Renders nothing when there is
nothing to show. VFormField uses it internally; use it on its own for a custom field layout.

## Examples

### VFormFooter

```tsx
<VFormFooter helper="At least 8 characters" maxLength={20} currentLength={5} />
```

## Props

### VFormFooterProps

VFormFooter props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `helper` | `ReactNode` | — | no | Hint shown when there is no error or success message. |
| `error` | `boolean` | `false` | no | Error state; shows `errorText` and takes priority over success and helper. |
| `errorText` | `ReactNode` | — | no | Message shown while `error` is true. |
| `success` | `boolean` | `false` | no | Success state; shows `successText` and takes priority over helper. |
| `successText` | `ReactNode` | — | no | Message shown while `success` is true. |
| `extra` | `ReactNode` | — | no | Note that stays visible below the message. |
| `maxLength` | `number` | — | no | Character limit; shows a `current/max` counter. |
| `currentLength` | `number` | — | no | Current character count shown in the counter. |
| `counter` | `ReactNode` | — | no | Replaces the default `current/max` counter. |
| `messageId` | `string` | — | no | `id` of the message paragraph; use it for `aria-describedby` on the control. |
