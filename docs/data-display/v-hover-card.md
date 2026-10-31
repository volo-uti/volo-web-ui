# VHoverCard

Rich preview card that opens on hover and closes when the pointer leaves.

Hover opens it and a click on the hovered trigger keeps it open; touch and Enter/Space toggle
it, Escape or an outside press closes it. By default the trigger is a `div` with
`role="button"`; set `asChild` when the child is already a button or a link.

## Examples

### VHoverCard

```tsx
<VHoverCard content={<p>John Doe</p>}>
  <span>{'@johndoe'}</span>
</VHoverCard>
```

```tsx
<VHoverCard asChild content={<p>John Doe</p>}>
  <VLink href="/johndoe">@johndoe</VLink>
</VHoverCard>
```

## Props

### VHoverCardProps

VHoverCard props — native `<div>` props go to the root wrapper.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | yes | Trigger element. |
| `content` | `ReactNode` | — | yes | Content rendered inside the card. |
| `position` | `VHoverCardPosition` | `'bottom'` | no | Placement of the card relative to the trigger. |
| `asChild` | `boolean` | `false` | no | Makes the single child element the trigger instead of wrapping it in a `div`. Use it when the child is already a button or a link; the child gets the click handler, `id` and `aria-*` attributes. No role or tabIndex is added, so `disabled` only stops the card from opening and the child stays focusable unless you disable it too. |
| `disabled` | `boolean` | `false` | no | Turns the card off: it never opens and the trigger is not focusable. |
| `openDelay` | `number` | `700` | no | Delay in ms before the card opens on hover. |
| `closeDelay` | `number` | `300` | no | Delay in ms before the card closes after the pointer leaves. |
| `semanticLabel` | `string` | — | no | Accessible label of the card dialog. |

## Types

### VHoverCardPosition

VHoverCard position

```ts
type VHoverCardPosition =
  | "top"
  | "topStart"
  | "topEnd"
  | "bottom"
  | "bottomStart"
  | "bottomEnd"
  | "left"
  | "leftStart"
  | "leftEnd"
  | "right"
  | "rightStart"
  | "rightEnd";
```
