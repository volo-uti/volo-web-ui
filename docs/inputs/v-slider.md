# VSlider

Draggable single-value slider with keyboard control.

## Examples

### VSlider

```tsx
<VSlider aria-label="Volume" value={volume} onValueChange={setVolume} min={0} max={100} />
```

## Props

### VSliderProps

Props of VSlider.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `VSize` | `'md'` | no | Component size. |
| `value` | `number` | — | no | Current value (controlled). |
| `defaultValue` | `number` | `0` | no | Initial value (uncontrolled). |
| `min` | `number` | `0` | no | Smallest value. |
| `max` | `number` | `100` | no | Largest value. |
| `step` | `number` | `1` | no | Distance between selectable values; ignored when `divisions` is set. |
| `divisions` | `number` | — | no | Splits `min`..`max` into this many equal steps and snaps the value to them; overrides `step`. |
| `showLabel` | `boolean` | `false` | no | Shows the current value above the thumb. |
| `disabled` | `boolean` | `false` | no | Disables the slider. |
| `onValueChange` | `(value: number) => void` | — | no | Called with the new value while the user drags the thumb or presses a key. |
| `onValueCommitted` | `(value: number) => void` | — | no | Called with the final value when a drag ends or a key press changes the value. |
| `className` | `string` | — | no | Additional class names (Tailwind). |
