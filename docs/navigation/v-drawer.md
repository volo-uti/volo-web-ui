# VDrawer

Panel that slides in from any screen edge, modal or persistent.

The modal variant renders in a portal on `document.body` and makes the rest of the page
`inert` while open; the persistent variant stays in place and leaves the page usable.

## Parts

- `VDrawerTrigger` — Button that opens the enclosing VDrawer.
- `VDrawerContent` — Side panel of a VDrawer that opens as a dialog from the chosen edge.
- `VDrawerHeader` — Layout block at the top of VDrawerContent for the title.
- `VDrawerFooter` — Layout block at the bottom of VDrawerContent that holds the actions.
- `VDrawerClose` — Button that closes the enclosing VDrawer.

## Examples

### VDrawer

```tsx
<VDrawer side="right">
  <VDrawerTrigger>Open</VDrawerTrigger>
  <VDrawerContent>
    <VDrawerHeader>Title</VDrawerHeader>
    <p>Content</p>
    <VDrawerFooter>
      <VDrawerClose>Close</VDrawerClose>
    </VDrawerFooter>
  </VDrawerContent>
</VDrawer>
```

## Props

### VDrawerProps

VDrawer props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VDrawerVariant` | `'default'` | no | `default` is a modal with backdrop; `persistent` has no backdrop. |
| `children` | `ReactNode` | — | no | VDrawerTrigger and VDrawerContent elements. |
| `side` | `VSide` | `'left'` | no | Screen edge the panel slides in from. |
| `open` | `boolean` | — | no | Open state (controlled). |
| `defaultOpen` | `boolean` | `false` | no | Open state when uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | — | no | Called with the next open state on trigger, close button, backdrop or Escape. |
| `portalContainer` | `HTMLElement \| null` | — | no | Element the modal drawer portal is appended to; the page body when omitted or `null`. The persistent variant ignores it. The drawer mounts its own container inside it, and everything else on the path up to the body becomes `inert` while the drawer is open. |

### VDrawerTriggerProps

VDrawerTrigger props; other props go to the `<button>`.

_No own members; see the types it extends._

### VDrawerContentProps

VDrawerContent props; other props go to the `<div role="dialog">`.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `backgroundColor` | `string` | — | no | Panel background; any CSS color. |
| `children` | `ReactNode` | — | no | Panel content. |
| `width` | `string \| number` | — | no | Panel width in px (number) or any CSS length; replaces the default width. |

### VDrawerHeaderProps

VDrawerHeader props; other props go to the `<div>`.

_No own members; see the types it extends._

### VDrawerFooterProps

VDrawerFooter props; other props go to the `<div>`.

_No own members; see the types it extends._

### VDrawerCloseProps

VDrawerClose props; other props go to the `<button>`.

_No own members; see the types it extends._

## Types

### VDrawerVariant

Whether a VDrawer dims the page (`default`) or sits beside it (`persistent`).

```ts
type VDrawerVariant = "default" | "persistent";
```
