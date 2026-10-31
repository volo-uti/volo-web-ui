# provider/locale-provider

## useLocaleContext

Reads the locale context; returns the English defaults outside a `LocaleProvider`.

## LocaleProvider

Provides locale and text overrides.

## Examples

### LocaleProvider

```tsx
<LocaleProvider locale="en" localeText={{ noData: "Nothing here" }}>
  <App />
</LocaleProvider>
```

## Props

### LocaleProviderProps

Props of LocaleProvider.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `locale` | `string` | — | no | BCP 47 locale tag returned by `useLocale`; it does not translate anything by itself. Inherits the enclosing provider's tag; `'en'` at the root. |
| `localeText` | `Partial<VoloLocaleText>` | — | no | Text entries that replace the inherited text; `undefined` entries are ignored. |
| `children` | `ReactNode` | — | yes | The subtree that reads the locale. |

## Types

### LocaleContextValue

Locale context value.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `locale` | `string` | — | yes | BCP 47 locale tag (informational, no built-in translations). |
| `localeText` | `VoloLocaleText` | — | yes | Resolved locale text (defaults merged with overrides). |
