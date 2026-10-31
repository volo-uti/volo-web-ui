# VSettingTile

Settings row ending in a chevron, switch, checkbox or custom content.

## Examples

### VSettingTile

```tsx
<VSettingTile title="Language" value="English" variant="navigation" onClick={openLanguages} />
<VSettingTile title="Dark mode" variant="switch" checked={dark} onCheckedChange={setDark} />
```

## Props

### VSettingTileProps

VSettingTile props; native `<div>` props (`className`, …) are accepted.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VSettingTileVariant` | `'simple'` | no | What the tile shows at its end: custom content, a chevron, a switch or a checkbox. |
| `title` | `ReactNode` | — | yes | Setting name. |
| `subtitle` | `ReactNode` | — | no | Secondary text under the title. |
| `value` | `ReactNode` | — | no | Current value shown before the chevron; `navigation` variant only. |
| `leading` | `ReactNode` | — | no | Element before the text, such as an icon. |
| `trailing` | `ReactNode` | — | no | Element at the end; `simple` variant only. |
| `checked` | `boolean` | — | no | On/off state for controlled use; `switch` and `checkbox` variants. |
| `defaultChecked` | `boolean` | `false` | no | Initial on/off state for uncontrolled use. |
| `selected` | `boolean` | `false` | no | Highlights the tile as the current choice. |
| `disabled` | `boolean` | `false` | no | Dims the tile and blocks presses. |
| `onCheckedChange` | `(checked: boolean) => void` | — | no | Called with the new on/off state; `switch` and `checkbox` variants. |

## Types

### VSettingTileVariant

What VSettingTile shows at its end: custom content, a chevron, a switch or a checkbox.

```ts
type VSettingTileVariant = "simple" | "navigation" | "switch" | "checkbox";
```
