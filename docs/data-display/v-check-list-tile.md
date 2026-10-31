# VCheckListTile

List tile with a built-in checkbox.

## Examples

### VCheckListTile

```tsx
<VCheckListTile
  title="Email me updates"
  subtitle="Weekly digest"
  checked={subscribed}
  onCheckedChange={setSubscribed}
/>
```

## Props

### VCheckListTileProps

VCheckListTile props; native `<label>` props (`onClick`, `className`, …) are accepted.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VCheckListTileVariant` | `'default'` | no | Checkbox position: after the text, before it, or in a bordered card. |
| `title` | `ReactNode` | — | yes | Primary text. |
| `subtitle` | `ReactNode` | — | no | Secondary text under the title. |
| `leading` | `ReactNode` | — | no | Element before the text; ignored when `variant` is `'leading'`. |
| `trailing` | `ReactNode` | — | no | Element between the text and the checkbox. |
| `dense` | `boolean` | `false` | no | Tighter vertical padding. |
| `disabled` | `boolean` | `false` | no | Dims the tile and blocks input. |
| `checked` | `boolean` | — | no | Checked state for controlled use. |
| `defaultChecked` | `boolean` | `false` | no | Initial checked state for uncontrolled use. |
| `selected` | `boolean` | `false` | no | Highlights the tile as the current choice. |
| `onCheckedChange` | `(checked: boolean) => void` | — | no | Called with the new checked state. |

## Types

### VCheckListTileVariant

Where VCheckListTile puts the checkbox: after the text, before it, or in a bordered card.

```ts
type VCheckListTileVariant = "default" | "leading" | "card";
```
