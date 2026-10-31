# VFab

Floating action button for the main action of a screen, fixed in a corner.

It extends when it has a label.

## Examples

### VFab

```tsx
<VFab icon={<PlusIcon />} tooltip="New note" onClick={create} />
<VFab icon={<PlusIcon />} label="New note" position="bottom-left" onClick={create} />
```

## Props

### VFabOwnProps

Own props of VFab.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VFabVariant` | `'filled'` | no | Visual variant. |
| `size` | `VFabSize` | `'md'` | no | Component size. |
| `color` | `VColor` | `'primary'` | no | Semantic colour. |
| `backgroundColor` | `string` | — | no | Background colour; any CSS color. Overrides `color`. |
| `foregroundColor` | `string` | — | no | Icon and label colour; any CSS color. Overrides `color`. |
| `label` | `ReactNode` | — | no | Text next to the icon; setting it makes the FAB extended. |
| `icon` | `ReactNode` | — | no | The icon. |
| `tooltip` | `string` | — | no | Hover hint, set as the native `title`; also the accessible name of an icon-only FAB. |
| `position` | `VFabPosition` | `'bottom-right'` | no | Fixed placement on the screen. |
| `disabled` | `boolean` | `false` | no | Disables the button. |
| `className` | `string` | — | no | Additional class names (Tailwind). |

### VFabProps

Props of VFab: own props and the native button props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VFabVariant` | `'filled'` | no | Visual variant. |
| `size` | `VFabSize` | `'md'` | no | Component size. |
| `color` | `VColor` | `'primary'` | no | Semantic colour. |
| `backgroundColor` | `string` | — | no | Background colour; any CSS color. Overrides `color`. |
| `foregroundColor` | `string` | — | no | Icon and label colour; any CSS color. Overrides `color`. |
| `label` | `ReactNode` | — | no | Text next to the icon; setting it makes the FAB extended. |
| `icon` | `ReactNode` | — | no | The icon. |
| `tooltip` | `string` | — | no | Hover hint, set as the native `title`; also the accessible name of an icon-only FAB. |
| `position` | `VFabPosition` | `'bottom-right'` | no | Fixed placement on the screen. |
| `disabled` | `boolean` | `false` | no | Disables the button. |
| `className` | `string` | — | no | Additional class names (Tailwind). |

## Types

### VFabVariant

Look of a VFab.

```ts
type VFabVariant = "filled" | "tonal" | "outlined";
```

### VFabSize

Sizes a VFab comes in: 40, 56 and 96 px.

```ts
type VFabSize = Extract<VSize, "sm" | "md" | "lg">;
```

### VFabPosition

Where a VFab sits on the screen; `static` leaves it in the normal flow.

```ts
type VFabPosition = "bottom-right" | "bottom-left" | "bottom-center" | "static";
```
