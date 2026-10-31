# VResizable

Split panels with draggable handles.

## Parts

- `VResizablePanelGroup` — Split panels with draggable handles.
- `VResizablePanel` — Panel inside a VResizablePanelGroup; its size follows the group.
- `VResizableHandle` — Draggable divider between panels; arrow keys resize by 10px, double-click collapses.

## Examples

### VResizable

```tsx
<VResizablePanelGroup direction="horizontal">
  <VResizablePanel defaultSize={0.3}>
    <Sidebar />
  </VResizablePanel>
  <VResizableHandle />
  <VResizablePanel defaultSize={0.7}>
    <MainContent />
  </VResizablePanel>
</VResizablePanelGroup>
```

### VResizablePanelGroup

```tsx
<VResizablePanelGroup direction="horizontal">
  <VResizablePanel defaultSize={0.3}>
    <Sidebar />
  </VResizablePanel>
  <VResizableHandle />
  <VResizablePanel defaultSize={0.7}>
    <MainContent />
  </VResizablePanel>
</VResizablePanelGroup>
```

### VResizablePanel

```tsx
<VResizablePanel defaultSize={0.3} minSize={0.15} maxSize={0.5}>
  <Sidebar />
</VResizablePanel>
```

### VResizableHandle

```tsx
<VResizableHandle />
<VResizableHandle withHandle={false} />
<VResizableHandle disabled />
```

## Props

### VResizablePanelGroupProps

VResizablePanelGroup props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | Panels and the handles between them. |
| `direction` | `VOrientation` | `"horizontal"` | no | Axis the panels are laid out along. |
| `onValueChange` | `(sizes: number[]) => void` | — | no | Called with the panel sizes (fractions 0-1) after a drag or keyboard resize. |

### VResizablePanelProps

VResizablePanel props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | no | Panel content. |
| `defaultSize` | `number` | — | yes | Initial size as a fraction of the group, 0 to 1. |
| `minSize` | `number` | `0` | no | Smallest size as a fraction, 0 to 1. |
| `maxSize` | `number` | `1` | no | Largest size as a fraction, 0 to 1. |
| `collapsible` | `boolean` | `false` | no | Whether double-clicking the handle after this panel collapses it. |
| `collapsedSize` | `number` | `0` | no | Size as a fraction when collapsed. |
| `onCollapse` | `() => void` | — | no | Called when the panel collapses. |
| `onExpand` | `() => void` | — | no | Called when the panel expands again. |
| `onSizeChange` | `(size: number) => void` | — | no | Called with the new size (fraction 0-1) when a resize changes this panel. |

### VResizableHandleProps

VResizableHandle props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `withHandle` | `boolean` | `true` | no | Whether to show the grip on the handle. |
| `disabled` | `boolean` | `false` | no | Disables dragging, keyboard resizing and collapsing. |
