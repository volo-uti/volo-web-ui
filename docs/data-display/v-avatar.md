# VAvatar

User avatar with image, initials or icon fallback; focusable when it has `onClick`.

## Parts

- `VAvatarGroup` — Overlapping VAvatars; those beyond `max` collapse into a "+N" indicator.

## Examples

### VAvatarGroup

```tsx
<VAvatarGroup max={3} size="md">
  <VAvatar src="/a.jpg" alt="A" />
  <VAvatar src="/b.jpg" alt="B" />
  <VAvatar src="/c.jpg" alt="C" />
  <VAvatar src="/d.jpg" alt="D" />
</VAvatarGroup>
```

### VAvatar

```tsx
<VAvatar src="/photo.jpg" alt="Jane Doe" />
<VAvatar fallback="JD" size="lg" aria-label="Jane Doe" />
<VAvatar src="/photo.jpg" alt="Jane Doe" onClick={() => openProfile()} />
```

## Props

### VAvatarGroupProps

VAvatarGroup props — native `<div>` props are accepted too.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `VSize` | `'md'` | no | Avatar size, applied to every child VAvatar. |
| `children` | `ReactNode` | — | yes | VAvatar children. |
| `max` | `number` | — | no | Maximum number of avatars to display; the rest collapse into a "+N" indicator. |
| `renderSurplus` | `(count: number) => ReactNode` | — | no | Renders the indicator for the avatars beyond `max`; receives the hidden count. |

### VAvatarProps

VAvatar props — native `<div>` props are accepted too.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `shape` | `VAvatarShape` | `'circle'` | no | Shape of the avatar. |
| `size` | `VSize` | `'md'` | no | Size variant — xs(24) sm(32) md(40) lg(48) xl(64). |
| `backgroundColor` | `string` | — | no | Background colour override — any CSS color. |
| `foregroundColor` | `string` | — | no | Foreground (text) colour override — any CSS color. |
| `fallback` | `ReactNode` | — | no | Fallback content shown without an image — initials string or icon. |
| `placeholder` | `ReactNode` | — | no | Content shown while the image loads. |
| `errorFallback` | `ReactNode` | — | no | Content shown when the image fails to load; replaces `fallback` then. |
| `src` | `string` | — | no | Image source URL. |
| `alt` | `string` | — | no | Alt text for the image; an image without `alt` or `aria-label` logs a dev warning. |

## Types

### VAvatarShape

VAvatar shape variant

```ts
type VAvatarShape = "circle" | "rounded" | "square";
```
