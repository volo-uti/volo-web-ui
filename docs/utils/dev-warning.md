# utils/dev-warning

## devWarning

Logs a warning to the console in development only.

- Suppressed in production builds via tree-shaking (process.env.NODE_ENV guard).
- Each unique (component + message) pair is logged at most once per session
  to avoid console noise from re-renders.

## Examples

### devWarning

```tsx
devWarning('VSlider', 'min must be less than max')
```
