# theme/create-theme

## createTheme

Builds a theme from token and component overrides.

`tokens.generated.css` supplies the light and dark defaults; the theme adds CSS variable overrides on top.

- Level 1: Global design token overrides via CSS Variables
- Level 2: Per-instance props (handled by user via component props)
- Level 3: Component-level default props & styles overrides

## Examples

### createTheme

```tsx
const myTheme = createTheme({
  tokens: {
    colors: { primary: '#6366f1' },
    radius: { md: '12px' },
    sizes: { md: { height: '44px' } },
  },
  components: {
    VButton: {
      defaultProps: { variant: 'outlined', size: 'md' },
      styles: { root: 'font-semibold tracking-wide' },
    },
  },
})
```

## Props

### VComponentDefaultProps

Default props a theme applies to one component; unknown keys pass through.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VVariant \| string` | — | no | — |
| `size` | `VSize` | — | no | — |
| `color` | `VColor \| string` | — | no | — |

## Types

### VTokenColors

Colour token overrides, each mapped to a `--v-*` CSS variable.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `background` | `string` | — | no | — |
| `foreground` | `string` | — | no | — |
| `primary` | `string` | — | no | — |
| `primaryForeground` | `string` | — | no | — |
| `secondary` | `string` | — | no | — |
| `secondaryForeground` | `string` | — | no | — |
| `tertiary` | `string` | — | no | — |
| `tertiaryForeground` | `string` | — | no | — |
| `muted` | `string` | — | no | — |
| `mutedForeground` | `string` | — | no | — |
| `accent` | `string` | — | no | — |
| `accentForeground` | `string` | — | no | — |
| `destructive` | `string` | — | no | — |
| `destructiveForeground` | `string` | — | no | — |
| `success` | `string` | — | no | — |
| `successForeground` | `string` | — | no | — |
| `warning` | `string` | — | no | — |
| `warningForeground` | `string` | — | no | — |
| `error` | `string` | — | no | — |
| `errorForeground` | `string` | — | no | — |
| `info` | `string` | — | no | — |
| `infoForeground` | `string` | — | no | — |
| `border` | `string` | — | no | — |
| `input` | `string` | — | no | — |
| `ring` | `string` | — | no | — |
| `card` | `string` | — | no | — |
| `cardForeground` | `string` | — | no | — |
| `popover` | `string` | — | no | — |
| `popoverForeground` | `string` | — | no | — |
| `disabled` | `string` | — | no | — |
| `disabledForeground` | `string` | — | no | — |
| `scrim` | `string` | — | no | — |

### VTokenRadius

Corner radius token overrides (`--v-radius-*`).

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `none` | `string` | — | no | — |
| `xs` | `string` | — | no | — |
| `sm` | `string` | — | no | — |
| `md` | `string` | — | no | — |
| `lg` | `string` | — | no | — |
| `xl` | `string` | — | no | — |
| `card` | `string` | — | no | — |
| `full` | `string` | — | no | — |

### VTokenSizeLevel

Dimension overrides of one size level (`--v-size-<level>-*`).

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `height` | `string` | — | no | — |
| `paddingX` | `string` | — | no | — |
| `paddingY` | `string` | — | no | — |
| `fontSize` | `string` | — | no | — |
| `iconSize` | `string` | — | no | — |
| `gap` | `string` | — | no | — |
| `radius` | `string` | — | no | — |

### VTokenSizes

Size token overrides per `VSize` level.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `xs` | `VTokenSizeLevel` | — | no | — |
| `sm` | `VTokenSizeLevel` | — | no | — |
| `md` | `VTokenSizeLevel` | — | no | — |
| `lg` | `VTokenSizeLevel` | — | no | — |
| `xl` | `VTokenSizeLevel` | — | no | — |

### VTokenSpacing

Spacing token overrides (`--v-spacing-*`).

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `xxs` | `string` | — | no | — |
| `xs` | `string` | — | no | — |
| `sm` | `string` | — | no | — |
| `md` | `string` | — | no | — |
| `lg` | `string` | — | no | — |
| `xl` | `string` | — | no | — |
| `xxl` | `string` | — | no | — |
| `xxxl` | `string` | — | no | — |
| `4xl` | `string` | — | no | — |
| `5xl` | `string` | — | no | — |
| `6xl` | `string` | — | no | — |

### VTokens

Token overrides of one colour scheme: colours, radius, sizes and spacing.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `colors` | `VTokenColors` | — | no | — |
| `radius` | `VTokenRadius` | — | no | — |
| `sizes` | `VTokenSizes` | — | no | — |
| `spacing` | `VTokenSpacing` | — | no | — |

### VComponentStyles

Extra class names per slot of one component; `root` is the outer element.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `root` | `string` | — | no | — |

### VComponentOverride

One component's default props and classes.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `defaultProps` | `VComponentDefaultProps` | — | no | — |
| `styles` | `VComponentStyles` | — | no | — |

### VComponentOverrides

Overrides by component name.

```ts
type VComponentOverrides = Partial<Record<string, VComponentOverride>>;
```

### VThemeConfig

Input of `createTheme()`.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `tokens` | `VTokens` | — | no | Token overrides applied in every colour scheme. |
| `darkTokens` | `VTokens` | — | no | Token overrides applied on top of `tokens` in dark mode. |
| `components` | `VComponentOverrides` | — | no | Default props and classes per component name. |

### VResolvedTheme

Result of `createTheme()`: CSS variables per scheme and the component overrides.

| Member | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `cssVariables` | `Record<string, string>` | — | yes | CSS variables set on `<html>` in every scheme. |
| `darkCssVariables` | `Record<string, string>` | — | yes | CSS variables added on `<html>` in dark mode. |
| `componentOverrides` | `VComponentOverrides` | — | yes | Component overrides by name. |
