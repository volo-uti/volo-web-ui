# hooks/use-focus-trap

## useFocusTrap

Traps focus inside a container while open and restores it on close.

Focus lands on the first visible focusable element, or on the container itself when it has
none. Tab wraps at both ends and pulls stray focus back in. On close or unmount focus returns
to the element focused before opening, unless the user already moved it to another control.

## Examples

### useFocusTrap

```tsx
const ref = useRef<HTMLDivElement>(null)
useFocusTrap(ref, open)
return open ? <div ref={ref} role="dialog">...</div> : null
```
