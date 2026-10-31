# VAlertDialog

Modal dialog that needs an explicit answer.

Unlike VDialog, Escape never closes it and a backdrop click closes it only with `barrierDismissible`.
The content renders in a portal on `document.body` and the rest of the page is `inert` while it is open.

## Parts

- `VAlertDialogTrigger` — Button that opens the enclosing VAlertDialog.
- `VAlertDialogContent` — Modal alertdialog panel that traps focus and holds the title, description and actions.
- `VAlertDialogTitle` — Heading that names the alert dialog (labels it for assistive technology).
- `VAlertDialogDescription` — Paragraph that describes the alert dialog (its accessible description).
- `VAlertDialogAction` — Primary-styled button that closes the alert dialog when clicked.
- `VAlertDialogCancel` — Dismissing button that closes the alert dialog without confirming.

## Examples

### VAlertDialog

```tsx
<VAlertDialog>
  <VAlertDialogTrigger>Delete</VAlertDialogTrigger>
  <VAlertDialogContent>
    <VAlertDialogTitle>Confirm deletion</VAlertDialogTitle>
    <VAlertDialogDescription>This action cannot be undone.</VAlertDialogDescription>
    <VAlertDialogCancel>Cancel</VAlertDialogCancel>
    <VAlertDialogAction>Delete</VAlertDialogAction>
  </VAlertDialogContent>
</VAlertDialog>
```

## Props

### VAlertDialogProps

Props of the VAlertDialog root; it renders no element of its own.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | The trigger and content parts. |
| `open` | `boolean` | — | no | Open state (controlled). |
| `defaultOpen` | `boolean` | `false` | no | Initial open state (uncontrolled). |
| `destructive` | `boolean` | `false` | no | Styles VAlertDialogAction as a destructive (error-coloured) button. |
| `onOpenChange` | `(open: boolean) => void` | — | no | Called with the new open state when the dialog opens or closes. |
| `barrierDismissible` | `boolean` | `false` | no | Whether clicking the backdrop closes the dialog; Escape never closes it. |
| `portalContainer` | `HTMLElement \| null` | — | no | Element the dialog portal is appended to; the page body when omitted or `null`. The dialog mounts its own container inside it. Everything else on the path up to the body becomes `inert` while the dialog is open, so pick an element that is part of the page. |

### VAlertDialogTriggerProps

Props of VAlertDialogTrigger: native `<button>` attributes.

_No own members; see the types it extends._

### VAlertDialogContentProps

Props of VAlertDialogContent: native `<div>` attributes, applied to the dialog panel.

_No own members; see the types it extends._

### VAlertDialogTitleProps

Props of VAlertDialogTitle: native `<h2>` attributes.

_No own members; see the types it extends._

### VAlertDialogDescriptionProps

Props of VAlertDialogDescription: native `<p>` attributes.

_No own members; see the types it extends._

### VAlertDialogActionProps

Props of VAlertDialogAction: native `<button>` attributes; a click also closes the dialog.

_No own members; see the types it extends._

### VAlertDialogCancelProps

Props of VAlertDialogCancel: native `<button>` attributes; a click also closes the dialog.

_No own members; see the types it extends._
