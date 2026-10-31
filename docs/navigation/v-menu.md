# VMenu

Dropdown menu opened by a trigger, with arrow-key navigation.

## Parts

- `VMenuTrigger` — Button that toggles the enclosing VMenu; `asChild` makes your own button the trigger.
- `VMenuContent` — Floating menu panel with arrow-key navigation between its items.
- `VMenuItem` — Menu entry with the menuitem role; can be disabled.
- `VMenuSeparator` — Horizontal line that separates groups of menu items.
- `VMenuGroup` — Wrapper that groups related menu items for assistive technology.
- `VMenuLabel` — Non-interactive caption for a group of menu items.

## Examples

### VMenu

```tsx
<VMenu>
  <VMenuTrigger>Options</VMenuTrigger>
  <VMenuContent>
    <VMenuItem onClick={edit}>Edit</VMenuItem>
    <VMenuSeparator />
    <VMenuItem onClick={remove}>Delete</VMenuItem>
  </VMenuContent>
</VMenu>
```

### VMenuTrigger

```tsx
<VMenuTrigger asChild>
  <VButton>Options</VButton>
</VMenuTrigger>
```

## Props

### VMenuProps

Props of VMenu.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | Trigger and content parts. |
| `closeOnSelect` | `boolean` | `true` | no | Whether choosing an item closes the menu. |
| `open` | `boolean` | — | no | Whether the menu is open (controlled). |
| `defaultOpen` | `boolean` | `false` | no | Initial open state when `open` is not given. |
| `onOpenChange` | `(open: boolean) => void` | — | no | Called with the next open state. |

### VMenuTriggerProps

Props of VMenuTrigger.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | Trigger content; with `asChild`, exactly one element. |
| `asChild` | `boolean` | `false` | no | Makes the single child element the trigger instead of rendering a `button`. Use it when the child is already a button or a link; the child gets the click handler, `aria-expanded` and `aria-haspopup`, and keeps its own ref. |

### VMenuContentProps

Props of VMenuContent.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | Menu items, groups, labels and separators. |
| `align` | `VAlign` | `"start"` | no | Horizontal alignment against the trigger. |

### VMenuItemProps

Props of VMenuItem.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | Item label. |
| `leading` | `ReactNode` | — | no | Content before the label, such as an icon. |
| `trailing` | `ReactNode` | — | no | Content after the label, such as shortcut text. |
| `disabled` | `boolean` | `false` | no | Whether the item cannot be chosen. |
| `destructive` | `boolean` | `false` | no | Styles the item as a destructive action. |

### VMenuSeparatorProps

Props of VMenuSeparator.

_No own members; see the types it extends._

### VMenuGroupProps

Props of VMenuGroup.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | Items of the group. |

### VMenuLabelProps

Props of VMenuLabel.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | Label content. |
