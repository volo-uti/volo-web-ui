# hooks/use-roving-focus

## useRovingFocus

Arrow-key focus movement between the items of a container (roving tabindex).

Disabled items are skipped. Call `initRoving` after render and spread `handleKeyDown`
onto the container's `onKeyDown`. The current position comes from the focused item, so
clicks and Tab keep it in sync; the tab stop follows focus, the selected item
(`aria-selected`, `aria-checked` or `:checked`) and later changes to the items.

## Examples

### useRovingFocus

```tsx
const ref = useRef<HTMLDivElement>(null)
const { handleKeyDown, initRoving } = useRovingFocus(ref, { orientation: 'horizontal' })
useEffect(initRoving)
return <div ref={ref} onKeyDown={handleKeyDown}><button data-roving-item>A</button></div>
```

## Types

### UseRovingFocusOptions

Options of useRovingFocus.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `selector` | `string` | `'[data-roving-item]'` | no | CSS selector of the items inside the container. |
| `orientation` | `VOrientation \| "both"` | `'both'` | no | Which arrow keys move focus. |
| `loop` | `boolean` | `true` | no | Wrap from the last item to the first and back. |
| `onActiveChange` | `(index: number) => void` | — | no | Called with the index of the item that just received focus. |
