# VTooltip

Text bubble shown after a delay on hover or focus; Escape closes it.

## Examples

### VTooltip

```tsx
<VTooltip message="Save changes" position="bottom">
  <VButton>Save</VButton>
</VTooltip>
```

## Props

### VTooltipProps

VTooltip props — native `<div>` props go to the wrapper around the trigger.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | yes | Trigger element. |
| `message` | `ReactNode` | — | yes | Tooltip content. |
| `position` | `VSide` | `'top'` | no | Side of the trigger the tooltip appears on. |
| `maxWidth` | `number` | `280` | no | Maximum width of the tooltip in px. |
| `waitDuration` | `number` | `500` | no | Wait in ms before the tooltip shows. |
| `showDuration` | `number` | `1500` | no | How long in ms the tooltip stays visible; 0 keeps it until the pointer or focus leaves. |
| `className` | `string` | — | no | Extra class names for the tooltip bubble, not the wrapper. |
