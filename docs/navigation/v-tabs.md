# VTabs

Tabs that switch between panels; arrow keys move between tabs.

## Parts

- `VTabsList` — Tablist container that holds the VTabsTrigger buttons.
- `VTabsTrigger` — Tab button that activates its panel.
- `VTabsContent` — Tab panel that shows its children while its value is the active tab.

## Examples

### VTabs

```tsx
<VTabs defaultValue="tab1">
  <VTabsList>
    <VTabsTrigger value="tab1">Tab 1</VTabsTrigger>
    <VTabsTrigger value="tab2">Tab 2</VTabsTrigger>
  </VTabsList>
  <VTabsContent value="tab1">Content 1</VTabsContent>
  <VTabsContent value="tab2">Content 2</VTabsContent>
</VTabs>
```

## Props

### VTabsProps

VTabs props; other props go to the root `<div>`.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | no | Active tab value (controlled). |
| `defaultValue` | `string` | `''` | no | Active tab value when uncontrolled. |
| `children` | `ReactNode` | — | no | VTabsList and VTabsContent elements. |
| `orientation` | `VOrientation` | `'horizontal'` | no | Direction of the tab list; arrow keys follow it. |
| `isScrollable` | `boolean` | `false` | no | Lets the tabs scroll horizontally instead of wrapping. |
| `onValueChange` | `(value: string) => void` | — | no | Called with the tab value when the active tab changes. |

### VTabsListProps

VTabsList props; other props go to the `<div role="tablist">`.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VTabsVariant` | `'default'` | no | Visual style of the tabs. |
| `children` | `ReactNode` | — | no | VTabsTrigger elements. |

### VTabsTriggerProps

VTabsTrigger props; other props go to the `<button role="tab">`.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | yes | Tab value; matches the VTabsContent with the same value. |
| `children` | `ReactNode` | — | no | Tab label. |
| `icon` | `ReactNode` | — | no | Icon shown before the label. |
| `disabled` | `boolean` | `false` | no | Prevents selecting the tab and skips it in keyboard navigation. |

### VTabsContentProps

VTabsContent props; other props go to the `<div role="tabpanel">`.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | yes | Tab value; the panel shows while this tab is active. |
| `children` | `ReactNode` | — | no | Panel content. |

## Types

### VTabsVariant

Visual style of a VTabsList.

```ts
type VTabsVariant = "default" | "pills" | "underline";
```
