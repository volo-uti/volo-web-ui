# hooks/use-theme

## useTheme

Reads the colour scheme, its setters and component overrides.

Reads the nearest ThemeProvider. Throws outside a `ThemeProvider` (or `VoloProvider`).

## Examples

### useTheme

```tsx
const { resolvedColorScheme, toggleDark, setColorScheme } = useTheme()
```
