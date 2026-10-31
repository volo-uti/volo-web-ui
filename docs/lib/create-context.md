# lib/create-context

## createSafeContext

Creates a context whose hook throws outside its Provider.

## Examples

### createSafeContext

```tsx
const [CartProvider, useCart] = createSafeContext<CartValue>('Cart')
const cart = useCart() // throws if not inside CartProvider
```
