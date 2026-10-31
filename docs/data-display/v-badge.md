# VBadge

Count or label badge pinned to the corner of its child; counts above `max` show as "99+".

## Examples

### VBadge

```tsx
<VBadge content={5} variant="destructive">
  <MailIcon />
</VBadge>
```

## Props

### VBadgeProps

VBadge props — native `<div>` props are accepted too.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VBadgeVariant` | `'muted'` | no | Colour variant. |
| `size` | `Extract<VSize, "sm" \| "md" \| "lg">` | `'md'` | no | Size variant. |
| `children` | `ReactNode` | — | no | The element the badge is attached to. |
| `content` | `ReactNode` | — | no | Badge content (number or text); numbers above `max` show as "{max}+". |
| `max` | `number` | `99` | no | Largest number shown as is; a bigger `content` number shows "{max}+". |
| `invisible` | `boolean` | `false` | no | Hides the badge (scales it to zero) while keeping the children. |

## Types

### VBadgeVariant

VBadge colour variants.

```ts
type VBadgeVariant =
  "muted" | "primary" | "secondary" | "success" | "warning" | "destructive" | "outline";
```
