# VCommand

Searchable command palette with arrow-key selection.

## Examples

### VCommand

```tsx
<VCommand
  groups={[{ heading: 'File', items: [{ label: 'New file', onClick: createFile }] }]}
  onOpenChange={setOpen}
/>
```

## Props

### VCommandProps

Props of VCommand.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `placeholder` | `string` | `"Search..."` | no | Search input placeholder. |
| `emptyContent` | `ReactNode` | `"No results found."` | no | Content shown when no item matches. |
| `groups` | `VCommandGroup[]` | — | no | Groups of items to search and choose from. |
| `filter` | `(item: VCommandItem, query: string) => boolean` | — | no | Replaces the default label/value/keywords match; return true to keep the item. |
| `open` | `boolean` | `true` | no | Whether the palette is shown (controlled). |
| `defaultOpen` | `boolean` | `true` | no | Initial open state when `open` is not given. |
| `loading` | `boolean` | `false` | no | Shows a spinner in the search row. |
| `onOpenChange` | `(open: boolean) => void` | — | no | Called with `false` after an item is chosen or Escape is pressed on an empty query. |

## Types

### VCommandItem

One selectable entry of a VCommand group.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `label` | `string` | — | yes | Item label text. |
| `value` | `string` | — | no | Identifier, also matched by the default search filter. |
| `leading` | `ReactNode` | — | no | Leading content such as an icon. |
| `trailing` | `string` | — | no | Trailing hint such as shortcut keys. |
| `keywords` | `string[]` | — | no | Extra words the default search filter matches. |
| `disabled` | `boolean` | `false` | no | Whether the item cannot be chosen. |
| `onClick` | `() => void` | — | no | Called when the item is chosen by click or Enter. |

### VCommandGroup

A headed list of VCommand items.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `heading` | `string` | — | yes | Group heading. |
| `items` | `VCommandItem[]` | — | yes | Items shown under the heading. |
