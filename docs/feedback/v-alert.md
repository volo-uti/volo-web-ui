# VAlert

Inline message box with a severity icon, optional title, action and close button.

Announced to assistive technology as `role="alert"`.

## Examples

### VAlert

```tsx
<VAlert severity="success" title="Saved">
  Your changes have been saved.
</VAlert>
```

## Props

### VAlertProps

Props of VAlert; other props go to the root `<div>`.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VAlertVariant` | `'standard'` | no | Visual variant. |
| `severity` | `VAlertSeverity` | `'default'` | no | Severity; sets the colour and the default icon. |
| `children` | `ReactNode` | — | no | The message body. |
| `title` | `ReactNode` | — | no | Bold title above the message. |
| `icon` | `ReactNode \| false` | — | no | Replaces the severity icon; `false` hides the icon. |
| `action` | `ReactNode` | — | no | Element shown at the end of the alert, such as a button. |
| `onClose` | `() => void` | — | no | Called when the close button is pressed; the close button only appears when this is set. |

## Types

### VAlertSeverity

Severity of a VAlert; sets its colour and default icon.

```ts
type VAlertSeverity = "default" | "info" | "success" | "warning" | "error";
```

### VAlertVariant

Look of a VAlert: tinted, solid or outlined.

```ts
type VAlertVariant = "standard" | "filled" | "outlined";
```
