# VBottomNav

Bottom bar for switching between three to five primary destinations.

## Examples

### VBottomNav

```tsx
<VBottomNav
  items={[
    { value: 'home', label: 'Home', icon: '🏠' },
    { value: 'chat', label: 'Chat', icon: '💬', badge: 3 },
  ]}
  defaultValue="home"
  onValueChange={(value) => navigate(value)}
/>
```

## Props

### VBottomNavProps

VBottomNav props; other props go to the `<nav>`.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VBottomNavVariant` | `'default'` | no | Visual style; `labeled` always shows labels, `shifting` enlarges the selected icon. |
| `items` | `VBottomNavItem[]` | — | no | Destinations, usually three to five. |
| `value` | `string` | — | no | Selected item value (controlled). |
| `defaultValue` | `string` | — | no | Selected item value when uncontrolled. |
| `showLabels` | `boolean` | `true` | no | Shows the label under every icon; otherwise only under the selected one. |
| `onValueChange` | `(value: string) => void` | — | no | Called with the item value when the user selects an item. |

## Types

### VBottomNavVariant

Visual style of a VBottomNav.

```ts
type VBottomNavVariant = "default" | "labeled" | "shifting";
```

### VBottomNavItem

One destination of a VBottomNav.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | yes | Identifier passed to `onValueChange` and compared with `value`. |
| `icon` | `ReactNode` | — | yes | Icon shown above the label. |
| `label` | `string` | — | yes | Label text; also the accessible name. |
| `activeIcon` | `ReactNode` | — | no | Icon shown instead of `icon` while selected. |
| `badge` | `ReactNode` | — | no | Badge pinned to the icon, e.g. a notification count. |
| `disabled` | `boolean` | `false` | no | Prevents selecting this item. |
