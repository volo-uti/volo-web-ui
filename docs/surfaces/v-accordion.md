# VAccordion

Collapsible content sections; arrow keys move between triggers.

Compose it from VAccordionItem, VAccordionTrigger and VAccordionContent.
The expanded items are controlled with `value` or uncontrolled with `defaultValue`.

## Parts

- `VAccordionItem` — One accordion section identified by `value`; holds a VAccordionTrigger and a VAccordionContent.
- `VAccordionTrigger` — Button that toggles its item and shows a chevron that rotates while expanded.
- `VAccordionContent` — Body of an accordion item (`role="region"`) that animates open and closed with the item.

## Examples

### VAccordion

```tsx
<VAccordion type="single" defaultValue="item-1" onValueChange={(open) => save(open)}>
  <VAccordionItem value="item-1">
    <VAccordionTrigger>Section 1</VAccordionTrigger>
    <VAccordionContent>Content 1</VAccordionContent>
  </VAccordionItem>
</VAccordion>
```

### VAccordionItem

```tsx
<VAccordionItem value="faq-1" disabled>...</VAccordionItem>
```

### VAccordionTrigger

```tsx
<VAccordionTrigger>What is included?</VAccordionTrigger>
```

### VAccordionContent

```tsx
<VAccordionContent>Everything in the Pro plan.</VAccordionContent>
```

## Props

### VAccordionProps

VAccordion root props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `type` | `VAccordionType` | `'single'` | no | `"single"` keeps one item open, `"multiple"` allows many. |
| `variant` | `VAccordionVariant` | `'default'` | no | Visual style. |
| `value` | `string \| string[]` | — | no | Controlled `value` of the expanded item(s); pair it with `onValueChange`. |
| `defaultValue` | `string \| string[]` | — | no | `value` of the item(s) expanded initially when uncontrolled. |
| `onValueChange` | `(value: string[]) => void` | — | no | Called with the `value`s of all expanded items after the user toggles one. |

### VAccordionItemProps

VAccordionItem props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | yes | Unique key of this item, matched against the root's `value`. |
| `disabled` | `boolean` | `false` | no | Blocks the trigger and dims the item. |

### VAccordionTriggerProps

VAccordionTrigger props; the native `<button>` attributes are accepted, except `disabled`, which is set on the item.

_No own members; see the types it extends._

### VAccordionContentProps

VAccordionContent props.

_No own members; see the types it extends._

## Types

### VAccordionType

VAccordion expansion mode: one item open at a time, or any number.

```ts
type VAccordionType = "single" | "multiple";
```

### VAccordionVariant

VAccordion visual variant: dividers only, separated cards, or one bordered box.

```ts
type VAccordionVariant = "default" | "separated" | "bordered";
```
