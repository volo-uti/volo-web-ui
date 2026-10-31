# VSwitch

On/off switch with label (role switch).

## Examples

### VSwitch

```tsx
<VSwitch label="Dark mode" checked={isDark} onCheckedChange={setIsDark} />
```

## Props

### VSwitchProps

Props of VSwitch.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VSwitchVariant` | `'default'` | no | Visual variant; `'labeled'` shows an I/O mark inside the track. |
| `size` | `VSize` | `'md'` | no | Component size. |
| `activeColor` | `string` | — | no | Track colour while on; any CSS color. |
| `label` | `ReactNode` | — | no | Label next to the switch; clicking it toggles the switch. |
| `sublabel` | `ReactNode` | — | no | Secondary text below the label. |
| `disabled` | `boolean` | `false` | no | Disables the switch. |
| `checked` | `boolean` | — | no | On/off state (controlled). |
| `defaultChecked` | `boolean` | `false` | no | Initial on/off state (uncontrolled). |
| `onCheckedChange` | `(checked: boolean) => void` | — | no | Called with the new on/off state when the user toggles the switch. |
| `className` | `string` | — | no | Additional class names (Tailwind). |
