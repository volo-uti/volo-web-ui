# lib/cn

## cn

Merges class names using clsx and tailwind-merge.
Resolves Tailwind CSS class conflicts intelligently.

## Examples

### cn

```tsx
cn('px-2 py-1', 'px-4') // → 'py-1 px-4'
cn('text-red-500', condition && 'text-blue-500') // → conditional merge
```
