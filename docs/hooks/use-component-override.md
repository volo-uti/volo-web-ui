# hooks/use-component-override

## useComponentOverride

Reads the theme overrides of one component by name.

Call it inside a component to merge the theme's `defaultProps` and `styles` into its own.

## Examples

### useComponentOverride

```tsx
const override = useComponentOverride('VButton')
const variant = props.variant ?? override?.defaultProps?.variant ?? 'filled'
```
