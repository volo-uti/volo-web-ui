# VAppBar

Top bar with title, leading element and actions.

## Examples

### VAppBar

```tsx
<VAppBar
  title="Orders"
  leading={<VIconButton aria-label="Back">←</VIconButton>}
  actions={<VButton variant="text">Export</VButton>}
/>
```

## Props

### VAppBarProps

VAppBar props; other props go to the `<header>`.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VAppBarVariant` | `'default'` | no | Visual style; `centered` also centers the title. |
| `title` | `ReactNode` | — | no | Title; a string renders as an `<h1>`, any other node is placed as is. |
| `bottom` | `ReactNode` | — | no | Row under the title, e.g. a VTabsList. |
| `leading` | `ReactNode` | — | no | Element before the title, e.g. a back button or menu icon. |
| `actions` | `ReactNode` | — | no | Elements after the title, e.g. icon buttons. |
| `centerTitle` | `boolean` | — | no | Centers the title; defaults to true for the `centered` variant. |
| `sticky` | `boolean` | `false` | no | Sticks the bar to the top while scrolling. |

## Types

### VAppBarVariant

Visual style of a VAppBar.

```ts
type VAppBarVariant = "default" | "transparent" | "elevated" | "centered";
```
