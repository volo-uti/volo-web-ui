# VDialog

Modal dialog with backdrop and focus trap.

Compound parts: Trigger, Content, Header, Footer, Title, Description, Close. Escape and (unless `barrierDismissible` is false) a backdrop click close it.
The content renders in a portal on `document.body` and the rest of the page is `inert` while it is open.

## Parts

- `VDialogTrigger` — Button that opens the enclosing VDialog.
- `VDialogContent` — Modal dialog panel with focus trap.
- `VDialogHeader` — Layout block at the top of VDialogContent for the title and description.
- `VDialogFooter` — Layout block at the bottom of VDialogContent that holds the action buttons.
- `VDialogTitle` — Heading that names the dialog (labels it for assistive technology).
- `VDialogDescription` — Paragraph that describes the dialog (its accessible description).
- `VDialogClose` — Button that closes the enclosing VDialog.

## Examples

### VDialog

```tsx
<VDialog>
  <VDialogTrigger>Open</VDialogTrigger>
  <VDialogContent>
    <VDialogHeader>
      <VDialogTitle>Dialog Title</VDialogTitle>
      <VDialogDescription>Description text</VDialogDescription>
    </VDialogHeader>
    <p>Body content here</p>
    <VDialogFooter>
      <VDialogClose>Cancel</VDialogClose>
    </VDialogFooter>
  </VDialogContent>
</VDialog>
```

## Props

### VDialogProps

Props of the VDialog root; it renders no element of its own.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | The trigger and content parts. |
| `open` | `boolean` | — | no | Open state (controlled). |
| `defaultOpen` | `boolean` | `false` | no | Initial open state (uncontrolled). |
| `onOpenChange` | `(open: boolean) => void` | — | no | Called with the new open state when the dialog opens or closes (trigger, close button, Escape, backdrop). |
| `barrierDismissible` | `boolean` | `true` | no | Whether clicking the backdrop closes the dialog; Escape always closes it. |
| `portalContainer` | `HTMLElement \| null` | — | no | Element the dialog portal is appended to; the page body when omitted or `null`. The dialog mounts its own container inside it. Everything else on the path up to the body becomes `inert` while the dialog is open, so pick an element that is part of the page. |

### VDialogTriggerProps

Props of VDialogTrigger: native `<button>` attributes.

_No own members; see the types it extends._

### VDialogContentProps

Props of VDialogContent: native `<div>` attributes, applied to the dialog panel.

_No own members; see the types it extends._

### VDialogHeaderProps

Props of VDialogHeader: native `<div>` attributes.

_No own members; see the types it extends._

### VDialogFooterProps

Props of VDialogFooter.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `actionsAlignment` | `VDialogActionsAlignment` | `'end'` | no | Horizontal alignment of the buttons. |
| `actionsExpanded` | `boolean` | `false` | no | Stretches every direct child button to share the row evenly. |

### VDialogTitleProps

Props of VDialogTitle: native `<h2>` attributes.

_No own members; see the types it extends._

### VDialogDescriptionProps

Props of VDialogDescription: native `<p>` attributes.

_No own members; see the types it extends._

### VDialogCloseProps

Props of VDialogClose: native `<button>` attributes.

_No own members; see the types it extends._

## Types

### VDialogActionsAlignment

Horizontal alignment of the buttons in a VDialogFooter.

```ts
type VDialogActionsAlignment = "start" | "center" | "end";
```
