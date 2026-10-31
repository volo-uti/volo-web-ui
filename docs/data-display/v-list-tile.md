# VListTile

Row with leading, title, subtitle and trailing slots; pressable with `onClick`.

## Examples

### VListTile

```tsx
<VListTile
  title="Inbox"
  subtitle="3 unread"
  leading={<VAvatar fallback="I" size="sm" />}
  selected={folder === 'inbox'}
  onClick={() => setFolder('inbox')}
/>
```

## Props

### VListTileOwnProps

VListTile own props; native element props (`onClick`, `className`, …) come from `as`.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `title` | `ReactNode` | — | yes | Primary text. |
| `subtitle` | `ReactNode` | — | no | Secondary text under the title. |
| `children` | `ReactNode` | — | no | Extra content under the subtitle. |
| `leading` | `ReactNode` | — | no | Element before the text, such as an icon or avatar. |
| `trailing` | `ReactNode` | — | no | Element after the text, such as an icon or meta text. |
| `tileColor` | `string` | — | no | Background colour; any CSS color. |
| `selectedTileColor` | `string` | — | no | Background colour while `selected`; any CSS color. |
| `dense` | `boolean` | `false` | no | Tighter vertical padding. |
| `threeLine` | `boolean` | `false` | no | Allows the subtitle to wrap to two lines. |
| `disabled` | `boolean` | `false` | no | Dims the tile and blocks presses. |
| `selected` | `boolean` | `false` | no | Highlights the tile as the current choice. |

### VListTileProps

VListTile props with polymorphic `as` support.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `title` | `ReactNode` | — | yes | Primary text. |
| `subtitle` | `ReactNode` | — | no | Secondary text under the title. |
| `children` | `ReactNode` | — | no | Extra content under the subtitle. |
| `leading` | `ReactNode` | — | no | Element before the text, such as an icon or avatar. |
| `trailing` | `ReactNode` | — | no | Element after the text, such as an icon or meta text. |
| `tileColor` | `string` | — | no | Background colour; any CSS color. |
| `selectedTileColor` | `string` | — | no | Background colour while `selected`; any CSS color. |
| `dense` | `boolean` | `false` | no | Tighter vertical padding. |
| `threeLine` | `boolean` | `false` | no | Allows the subtitle to wrap to two lines. |
| `disabled` | `boolean` | `false` | no | Dims the tile and blocks presses. |
| `selected` | `boolean` | `false` | no | Highlights the tile as the current choice. |
| `as` | `E` | — | no | — |
| `ref` | `ComponentPropsWithRef<E>["ref"]` | — | no | — |
