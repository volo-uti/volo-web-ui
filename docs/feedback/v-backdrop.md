# VBackdrop

Full-screen dimming layer for custom modals and drawers; press it with `onClick`.

## Examples

### VBackdrop

```tsx
<VBackdrop open={isOpen} onClick={() => setIsOpen(false)} />
<VBackdrop open={isOpen} opacity={0.7} color="#000" onClick={close} />
```

## Props

### VBackdropProps

Props of VBackdrop; other props go to the root `<div>`.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `color` | `string` | — | no | Fill colour; any CSS color. Black when omitted. |
| `opacity` | `number` | `0.5` | no | Opacity from 0 to 1. |
| `open` | `boolean` | — | yes | Whether the backdrop is rendered; when false it renders nothing. |
