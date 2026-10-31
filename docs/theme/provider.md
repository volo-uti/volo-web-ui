# theme/provider

## ThemeContext

Context behind `ThemeProvider`; read it with `useTheme`.

## ThemeProvider

Applies the theme's CSS variables and holds the colour scheme.

Sets the `dark` class on `<html>`, follows the system preference and stores the choice.

## Examples

### ThemeProvider

```tsx
<ThemeProvider theme={createTheme({ tokens: { colors: { primary: '#6366f1' } } })}>
  <App />
</ThemeProvider>
```

## Props

### ThemeProviderProps

Props of ThemeProvider.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `theme` | `VThemeConfig \| VResolvedTheme` | — | no | A `createTheme()` result or a plain theme config. |
| `defaultColorScheme` | `VColorScheme` | `'system'` | no | Colour scheme used when nothing is stored yet. |
| `storageKey` | `string` | `'volo-color-scheme'` | no | localStorage key that remembers the chosen colour scheme. |
| `children` | `ReactNode` | — | yes | The app subtree. |

## Types

### VColorScheme

Light, dark or system.

```ts
type VColorScheme = "light" | "dark" | "system";
```

### VThemeContextValue

Theme context value.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `resolvedColorScheme` | `"light" \| "dark"` | — | yes | Colour scheme in effect, with `'system'` resolved to light or dark. |
| `toggleDark` | `() => void` | — | yes | Switches between light and dark. |
| `setColorScheme` | `(scheme: VColorScheme) => void` | — | yes | Sets the colour scheme and stores it. |
| `componentOverrides` | `VComponentOverrides` | — | yes | Component overrides from the theme, by component name. |
