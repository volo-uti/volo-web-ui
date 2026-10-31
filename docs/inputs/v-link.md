# VLink

Styled anchor with underline and colour options; `as` swaps in a router Link.

## Examples

### VLink

```tsx
<VLink href="/about">About</VLink>
<VLink href="https://example.com" external>External</VLink>
<VLink as={NextLink} href="/dashboard">Dashboard</VLink>
```

## Props

### VLinkOwnProps

Own props of VLink.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `color` | `VLinkColor` | `'primary'` | no | Link colour. |
| `underline` | `VLinkUnderline` | `'hover'` | no | Underline behaviour. |
| `children` | `ReactNode` | — | no | Link content. |
| `href` | `string` | — | no | Link destination. |
| `external` | `boolean` | `false` | no | Opens in a new tab (`target="_blank"`, `rel="noopener noreferrer"`) and shows an arrow icon. |
| `as` | `ElementType` | — | no | Element or router Link to render instead of `<a>`. |
| `className` | `string` | — | no | Additional class names (Tailwind). |

### VLinkProps

Props of VLink: own props and the native anchor props (`target`, `rel`, ...).

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `color` | `VLinkColor` | `'primary'` | no | Link colour. |
| `underline` | `VLinkUnderline` | `'hover'` | no | Underline behaviour. |
| `children` | `ReactNode` | — | no | Link content. |
| `href` | `string` | — | no | Link destination. |
| `external` | `boolean` | `false` | no | Opens in a new tab (`target="_blank"`, `rel="noopener noreferrer"`) and shows an arrow icon. |
| `as` | `ElementType` | — | no | Element or router Link to render instead of `<a>`. |
| `className` | `string` | — | no | Additional class names (Tailwind). |

## Types

### VLinkUnderline

Underline behaviour of a VLink.

```ts
type VLinkUnderline = "always" | "hover" | "none";
```

### VLinkColor

Colour of a VLink: the primary colour, a muted one, or the surrounding text colour.

```ts
type VLinkColor = "primary" | "secondary" | "inherit";
```
