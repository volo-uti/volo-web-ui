# VSection

Titled content section that can collapse.

## Examples

### VSection

```tsx
<VSection title="Account" description="Manage your profile" collapsible>
  <VListTile title="Email" />
</VSection>
```

## Props

### VSectionProps

VSection props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VSectionVariant` | `"default"` | no | Visual variant. |
| `title` | `ReactNode` | `undefined` | no | Heading; a string renders as an `<h3>`. |
| `description` | `ReactNode` | `undefined` | no | Text shown below the title. |
| `footer` | `ReactNode` | `undefined` | no | Content shown below the children. |
| `divider` | `boolean` | `false` | no | Whether to draw dividers between children. |
| `spacing` | `Extract<VSize, "sm" \| "md" \| "lg">` | `"md"` | no | Vertical spacing between the header, content and footer. |
| `collapsible` | `boolean` | `false` | no | Makes the header a button that shows or hides the content. |
| `open` | `boolean` | `undefined` | no | Open state when `collapsible` and controlled. |
| `defaultOpen` | `boolean` | `true` | no | Initial open state when `collapsible` and uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | — | no | Called with the next open state when the header is toggled. |

## Types

### VSectionVariant

Look of a VSection: plain, card or inset.

```ts
type VSectionVariant = "default" | "card" | "inset";
```
