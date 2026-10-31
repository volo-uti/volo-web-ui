# VSnackbar

Brief message bar at the screen bottom with an optional action.

It times out or swipes away.

## Examples

### VSnackbar

```tsx
<VSnackbar visible={show} variant="success" content="Saved!" onClose={() => setShow(false)} />
```

## Props

### VSnackbarProps

Props of VSnackbar; other props go to the inner message bar `<div>`.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VSnackbarVariant` | `'default'` | no | Colour and icon. |
| `content` | `ReactNode` | — | no | The message. |
| `action` | `VSnackbarAction` | — | no | Action button shown after the message. |
| `behavior` | `VSnackbarBehavior` | `'fixed'` | no | `'fixed'` spans the full width; `'floating'` is a rounded card. |
| `width` | `number \| string` | — | no | Width of a floating snackbar; a number is pixels. |
| `dismissDirection` | `"left" \| "right" \| "none"` | `'right'` | no | Swipe direction that dismisses the snackbar; `'none'` turns swiping off. |
| `visible` | `boolean` | `true` | no | Whether the snackbar is shown. |
| `onClose` | `() => void` | — | no | Called when the snackbar should go away: the timer ran out or the user swiped it off. |
| `duration` | `number` | `5000` | no | Milliseconds before `onClose` fires; 0 keeps it until dismissed. |

## Types

### VSnackbarVariant

Colour and icon of a VSnackbar.

```ts
type VSnackbarVariant = "default" | "success" | "error" | "warning" | "info";
```

### VSnackbarBehavior

Whether a VSnackbar spans the full width or floats as a card.

```ts
type VSnackbarBehavior = "fixed" | "floating";
```

### VSnackbarAction

Action button of a VSnackbar.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `label` | `string` | — | yes | Button label. |
| `onClick` | `() => void` | — | yes | Called when the button is pressed. |
