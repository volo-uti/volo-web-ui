# VStack

Row or column of children with spacing.

## Examples

### VStack

```tsx
<VStack direction="horizontal" spacing="md" align="center">
  <VAvatar fallback="A" />
  <VBadge count={3}>Inbox</VBadge>
</VStack>
```

## Props

### VStackProps

VStack props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `direction` | `VOrientation` | `"vertical"` | no | Direction the children run in. |
| `spacing` | `VSpace` | `undefined` | no | Space between children: a `VSize` token, pixels as a number, or any CSS length. |
| `align` | `VAlign \| "stretch" \| "baseline"` | `"stretch"` | no | Cross-axis alignment. |
| `justify` | `VAlign \| "between" \| "around" \| "evenly"` | `"start"` | no | Main-axis distribution. |
| `wrap` | `boolean` | `false` | no | Whether children wrap onto the next line when space runs out. |
| `inline` | `boolean` | `false` | no | Whether the stack shrinks to fit its content instead of filling the line. |
