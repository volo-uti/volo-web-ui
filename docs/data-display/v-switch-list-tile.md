# VSwitchListTile

List tile with a built-in switch.

## Examples

### VSwitchListTile

```tsx
<VSwitchListTile title="Wi-Fi" subtitle="Home network" checked={wifi} onCheckedChange={setWifi} />
```

## Props

### VSwitchListTileProps

VSwitchListTile props; native `<label>` props (`onClick`, `className`, …) are accepted.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VSwitchListTileVariant` | `'default'` | no | Switch position: after the text, before it, or in a bordered card. |
| `title` | `ReactNode` | — | yes | Primary text. |
| `subtitle` | `ReactNode` | — | no | Secondary text under the title. |
| `leading` | `ReactNode` | — | no | Element before the text; ignored when `variant` is `'leading'`. |
| `trailing` | `ReactNode` | — | no | Element between the text and the switch. |
| `activeColor` | `string` | — | no | Track colour while on; any CSS color. |
| `dense` | `boolean` | `false` | no | Tighter vertical padding. |
| `disabled` | `boolean` | `false` | no | Dims the tile and blocks input. |
| `checked` | `boolean` | — | no | On/off state for controlled use. |
| `defaultChecked` | `boolean` | `false` | no | Initial on/off state for uncontrolled use. |
| `selected` | `boolean` | `false` | no | Highlights the tile as the current choice. |
| `onCheckedChange` | `(checked: boolean) => void` | — | no | Called with the new on/off state. |

## Types

### VSwitchListTileVariant

Where VSwitchListTile puts the switch: after the text, before it, or in a bordered card.

```ts
type VSwitchListTileVariant = "default" | "leading" | "card";
```
