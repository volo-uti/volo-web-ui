# VPopover

Floating panel anchored to a trigger; closes on Escape or an outside press.

Compose it from VPopoverTrigger, VPopoverContent and an optional VPopoverClose;
the open state is controlled with `open` or uncontrolled with `defaultOpen`.

## Parts

- `VPopoverTrigger` — Toggles the popover on click, Enter or Space; `asChild` renders no wrapper element.
- `VPopoverContent` — Floating panel (`role="dialog"`) shown while the popover is open, with focus trapped inside.
- `VPopoverClose` — Button that closes the popover; labelled by the locale text unless you pass `aria-label`.

## Examples

### VPopover

```tsx
<VPopover position="bottom">
  <VPopoverTrigger>
    <button>Open</button>
  </VPopoverTrigger>
  <VPopoverContent>
    <p>Popover content</p>
    <VPopoverClose>Close</VPopoverClose>
  </VPopoverContent>
</VPopover>
```

### VPopoverTrigger

```tsx
<VPopoverTrigger>Open</VPopoverTrigger>
```

```tsx
<VPopoverTrigger asChild>
  <VButton>Open</VButton>
</VPopoverTrigger>
```

### VPopoverContent

```tsx
<VPopoverContent align="start" sideOffset={12}>Details</VPopoverContent>
```

### VPopoverClose

```tsx
<VPopoverClose>Done</VPopoverClose>
```

```tsx
<VPopoverClose asChild>
  <VButton size="sm">Done</VButton>
</VPopoverClose>
```

## Props

### VPopoverProps

VPopover root props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | A `VPopoverTrigger` and a `VPopoverContent`. |
| `position` | `VSide` | `'bottom'` | no | Side of the trigger the content opens on; fine placement along that side is `align` on the content. |
| `open` | `boolean` | — | no | Controlled open state; pair it with `onOpenChange`. |
| `defaultOpen` | `boolean` | `false` | no | Initial open state when uncontrolled. |
| `barrierDismissible` | `boolean` | `true` | no | Whether a press outside the content closes the popover; Escape always closes it. |
| `onOpenChange` | `(open: boolean) => void` | — | no | Called with the next open state when the user opens or closes the popover. |

### VPopoverTriggerProps

VPopoverTrigger props; the native `<span>` attributes are accepted.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | no | Makes the single child element the trigger instead of wrapping it in a `span`. Use it when the child is already a button or a link; the child gets the handlers, `id` and `aria-*` attributes and keeps its own ref. No role or tabIndex is added. |

### VPopoverContentProps

VPopoverContent props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `align` | `VAlign` | `'center'` | no | Alignment along the trigger's edge. |
| `sideOffset` | `number` | `8` | no | Gap in px between the trigger and the content. |

### VPopoverCloseProps

VPopoverClose props; the native `<button>` attributes are accepted.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | no | Makes the single child element the close control instead of rendering a `button`. Use it when the child is already a button; it keeps its own accessible name. |
