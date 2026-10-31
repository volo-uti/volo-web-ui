# toast

Imperative toast API: `success`, `info`, `warning`, `error`, `default`, `dismiss`.

Needs one VToaster mounted. Each call returns the toast's ID.

## Parts

- `VToaster` — Container that renders the active toasts; mount it once near the app root.

## Examples

### toast

```tsx
toast.success('Saved!')
toast.error('Something went wrong')
toast.info('FYI', { duration: 3000 })
```

### VToaster

```tsx
// In your root layout:
<VToaster position="bottom-right" />

// Anywhere in your app:
import { toast } from '@volo-uti/volo-web-ui'
toast.success('Changes saved!')
```

## Props

### VToasterProps

Props of VToaster; other props go to the container `<div>`.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `position` | `VToastPosition` | `'bottom-right'` | no | Where the toasts stack. |

## Types

### VToastType

Severity of a toast; sets the accent colour.

```ts
type VToastType = "default" | "success" | "info" | "warning" | "error";
```

### VToastPosition

Corner or edge of the screen where the VToaster stacks toasts.

```ts
type VToastPosition =
  "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
```

### VToastAction

Action button of a toast.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `label` | `string` | — | yes | Button label. |
| `onClick` | `() => void` | — | yes | Called when the button is pressed; the toast then closes. |

### VToastData

One toast in the toaster's list, as stored by the `toast` API.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `type` | `VToastType` | — | yes | Severity; sets the accent colour. |
| `id` | `string` | — | yes | Unique ID returned by the `toast` call; pass it to `toast.dismiss`. |
| `message` | `ReactNode` | — | yes | The message. |
| `action` | `VToastAction` | — | no | Action button shown after the message. |
| `duration` | `number` | — | yes | Milliseconds before the toast closes; 0 keeps it until dismissed. |

### VToastOptions

Options of a `toast.*` call.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `action` | `VToastAction` | — | no | Action button shown after the message. |
| `duration` | `number` | `5000` | no | Milliseconds before the toast closes; 0 keeps it until dismissed. |
