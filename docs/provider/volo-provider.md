# provider/volo-provider

## VoloProvider

Wraps the app in ThemeProvider and LocaleProvider at once.

Theme: colour scheme, tokens, component overrides. Locale: locale tag and `localeText` overrides.

## Examples

### VoloProvider

```tsx
<VoloProvider
  theme={myTheme}
  defaultColorScheme="system"
  locale="en"
  localeText={{
    noData: 'Nothing here',
    paginationPrevious: 'Back',
  }}
>
  <App />
</VoloProvider>
```

## Props

### VoloProviderProps

Props of VoloProvider: the ThemeProvider and LocaleProvider props together.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | yes | The app subtree. |
| `theme` | `VThemeConfig \| VResolvedTheme` | — | no | A `createTheme()` result or a plain theme config. |
| `defaultColorScheme` | `VColorScheme` | `'system'` | no | Colour scheme used when nothing is stored yet. |
| `storageKey` | `string` | `'volo-color-scheme'` | no | localStorage key that remembers the chosen colour scheme. |
| `locale` | `string` | — | no | BCP 47 locale tag returned by `useLocale`; it does not translate anything by itself. Inherits the enclosing provider's tag; `'en'` at the root. |
| `localeText` | `Partial<VoloLocaleText>` | — | no | Text entries that replace the inherited text; `undefined` entries are ignored. |
