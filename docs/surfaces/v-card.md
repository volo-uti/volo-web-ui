# VCard

Container that groups related content; becomes a pressable button with `interactive`.

Compose it with VCardHeader and VCardFooter.

## Parts

- `VCardFooter` — Footer row of a VCard that lays out its actions and aligns them with `alignment`.
- `VCardHeader` — Header row of a VCard with a title, a description and a right-aligned action slot.

## Examples

### VCardFooter

```tsx
<VCard>
  <VCardHeader title="Title" />
  <p>Content</p>
  <VCardFooter alignment="end">
    <VButton variant="text">Cancel</VButton>
    <VButton>Confirm</VButton>
  </VCardFooter>
</VCard>
```

### VCardHeader

```tsx
<VCardHeader title="Card Title" description="Description" action={<VIconButton aria-label="More"><MoreIcon /></VIconButton>} />
```

### VCard

```tsx
<VCard variant="outlined" interactive onClick={() => openDetails()}>
  <VCardHeader title="Plan" description="Pro, billed yearly" />
</VCard>
```

## Props

### VCardFooterProps

VCardFooter props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `alignment` | `VCardFooterAlignment` | `'end'` | no | Alignment of the children along the row. |

### VCardHeaderProps

VCardHeader props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `title` | `ReactNode` | — | no | Title shown in the semibold first line. |
| `description` | `ReactNode` | — | no | Muted line below the title. |
| `action` | `ReactNode` | — | no | Content pinned to the right, such as an icon button. |

### VCardOwnProps

VCard own props (before polymorphic merge).

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VCardVariant` | `'elevated'` | no | Surface style. |
| `interactive` | `boolean` | `false` | no | Makes the card a pressable `role="button"`: focusable, and Enter or Space call `onClick`. |

### VCardProps

VCard props with polymorphic `as` and ref support.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VCardVariant` | `'elevated'` | no | Surface style. |
| `interactive` | `boolean` | `false` | no | Makes the card a pressable `role="button"`: focusable, and Enter or Space call `onClick`. |
| `as` | `E` | — | no | — |
| `ref` | `ComponentPropsWithRef<E>["ref"]` | — | no | — |

## Types

### VCardFooterAlignment

VCardFooter alignment of its children along the row.

```ts
type VCardFooterAlignment = "start" | "center" | "end" | "between";
```

### VCardVariant

VCard surface style: raised with a shadow, outlined with a border, or filled.

```ts
type VCardVariant = "elevated" | "outlined" | "filled";
```
