import type { VColor, VSize, VVariant } from "../lib";

// -----------------------------------------
// Token overrides (Level 1)
// -----------------------------------------

/** Colour token overrides, each mapped to a `--v-*` CSS variable. */
export interface VTokenColors {
  background?: string;
  foreground?: string;
  primary?: string;
  primaryForeground?: string;
  secondary?: string;
  secondaryForeground?: string;
  tertiary?: string;
  tertiaryForeground?: string;
  muted?: string;
  mutedForeground?: string;
  accent?: string;
  accentForeground?: string;
  destructive?: string;
  destructiveForeground?: string;
  success?: string;
  successForeground?: string;
  warning?: string;
  warningForeground?: string;
  error?: string;
  errorForeground?: string;
  info?: string;
  infoForeground?: string;
  border?: string;
  input?: string;
  ring?: string;
  card?: string;
  cardForeground?: string;
  popover?: string;
  popoverForeground?: string;
  disabled?: string;
  disabledForeground?: string;
  scrim?: string;
}

/** Corner radius token overrides (`--v-radius-*`). */
export interface VTokenRadius {
  none?: string;
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  card?: string;
  full?: string;
}

/** Dimension overrides of one size level (`--v-size-<level>-*`). */
export interface VTokenSizeLevel {
  height?: string;
  paddingX?: string;
  paddingY?: string;
  fontSize?: string;
  iconSize?: string;
  gap?: string;
  radius?: string;
}

/** Size token overrides per `VSize` level. */
export interface VTokenSizes {
  xs?: VTokenSizeLevel;
  sm?: VTokenSizeLevel;
  md?: VTokenSizeLevel;
  lg?: VTokenSizeLevel;
  xl?: VTokenSizeLevel;
}

/** Spacing token overrides (`--v-spacing-*`). */
export interface VTokenSpacing {
  xxs?: string;
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xxl?: string;
  xxxl?: string;
  "4xl"?: string;
  "5xl"?: string;
  "6xl"?: string;
}

/** Token overrides of one colour scheme: colours, radius, sizes and spacing. */
export interface VTokens {
  colors?: VTokenColors;
  radius?: VTokenRadius;
  sizes?: VTokenSizes;
  spacing?: VTokenSpacing;
}

// -----------------------------------------
// Component overrides (Level 3)
// -----------------------------------------

/** Default props a theme applies to one component; unknown keys pass through. */
export interface VComponentDefaultProps {
  variant?: VVariant | string;
  size?: VSize;
  color?: VColor | string;
  [key: string]: unknown;
}

/** Extra class names per slot of one component; `root` is the outer element. */
export interface VComponentStyles {
  root?: string;
  [slot: string]: string | undefined;
}

/** One component's default props and classes. */
export interface VComponentOverride {
  defaultProps?: VComponentDefaultProps;
  styles?: VComponentStyles;
}

/** Overrides by component name. */
export type VComponentOverrides = Partial<Record<string, VComponentOverride>>;

// -----------------------------------------
// Theme config
// -----------------------------------------

/** Input of `createTheme()`. */
export interface VThemeConfig {
  /** Token overrides applied in every colour scheme. */
  tokens?: VTokens;
  /** Token overrides applied on top of `tokens` in dark mode. */
  darkTokens?: VTokens;
  /** Default props and classes per component name. */
  components?: VComponentOverrides;
}

/** Result of `createTheme()`: CSS variables per scheme and the component overrides. */
export interface VResolvedTheme {
  /** CSS variables set on `<html>` in every scheme. */
  cssVariables: Record<string, string>;
  /** CSS variables added on `<html>` in dark mode. */
  darkCssVariables: Record<string, string>;
  /** Component overrides by name. */
  componentOverrides: VComponentOverrides;
}

// -----------------------------------------
// Token -> CSS Variable mapping
// -----------------------------------------

function colorsToVars(colors: VTokenColors): Record<string, string> {
  const map: Record<string, string> = {};
  const entries: [keyof VTokenColors, string][] = [
    ["background", "--v-background"],
    ["foreground", "--v-foreground"],
    ["primary", "--v-primary"],
    ["primaryForeground", "--v-primary-foreground"],
    ["secondary", "--v-secondary"],
    ["secondaryForeground", "--v-secondary-foreground"],
    ["tertiary", "--v-tertiary"],
    ["tertiaryForeground", "--v-tertiary-foreground"],
    ["muted", "--v-muted"],
    ["mutedForeground", "--v-muted-foreground"],
    ["accent", "--v-accent"],
    ["accentForeground", "--v-accent-foreground"],
    ["destructive", "--v-destructive"],
    ["destructiveForeground", "--v-destructive-foreground"],
    ["success", "--v-success"],
    ["successForeground", "--v-success-foreground"],
    ["warning", "--v-warning"],
    ["warningForeground", "--v-warning-foreground"],
    ["error", "--v-error"],
    ["errorForeground", "--v-error-foreground"],
    ["info", "--v-info"],
    ["infoForeground", "--v-info-foreground"],
    ["border", "--v-border"],
    ["input", "--v-input"],
    ["ring", "--v-ring"],
    ["card", "--v-card"],
    ["cardForeground", "--v-card-foreground"],
    ["popover", "--v-popover"],
    ["popoverForeground", "--v-popover-foreground"],
    ["disabled", "--v-disabled"],
    ["disabledForeground", "--v-disabled-foreground"],
    ["scrim", "--v-scrim"],
  ];
  for (const [key, varName] of entries) {
    const value = colors[key];
    if (value !== undefined) map[varName] = value;
  }
  return map;
}

function radiusToVars(radius: VTokenRadius): Record<string, string> {
  const map: Record<string, string> = {};
  if (radius.none !== undefined) map["--v-radius-none"] = radius.none;
  if (radius.xs !== undefined) map["--v-radius-xs"] = radius.xs;
  if (radius.sm !== undefined) map["--v-radius-sm"] = radius.sm;
  if (radius.md !== undefined) map["--v-radius-md"] = radius.md;
  if (radius.lg !== undefined) map["--v-radius-lg"] = radius.lg;
  if (radius.xl !== undefined) map["--v-radius-xl"] = radius.xl;
  if (radius.card !== undefined) map["--v-radius-card"] = radius.card;
  if (radius.full !== undefined) map["--v-radius-full"] = radius.full;
  return map;
}

function sizesToVars(sizes: VTokenSizes): Record<string, string> {
  const map: Record<string, string> = {};
  const sizeLevels: Array<[keyof VTokenSizes, string]> = [
    ["xs", "xs"],
    ["sm", "sm"],
    ["md", "md"],
    ["lg", "lg"],
    ["xl", "xl"],
  ];
  for (const [key, prefix] of sizeLevels) {
    const level = sizes[key];
    if (!level) continue;
    if (level.height !== undefined) map[`--v-size-${prefix}-height`] = level.height;
    if (level.paddingX !== undefined) map[`--v-size-${prefix}-padding-x`] = level.paddingX;
    if (level.paddingY !== undefined) map[`--v-size-${prefix}-padding-y`] = level.paddingY;
    if (level.fontSize !== undefined) map[`--v-size-${prefix}-font-size`] = level.fontSize;
    if (level.iconSize !== undefined) map[`--v-size-${prefix}-icon-size`] = level.iconSize;
    if (level.gap !== undefined) map[`--v-size-${prefix}-gap`] = level.gap;
    if (level.radius !== undefined) map[`--v-size-${prefix}-radius`] = level.radius;
  }
  return map;
}

function spacingToVars(spacing: VTokenSpacing): Record<string, string> {
  const map: Record<string, string> = {};
  const entries: [keyof VTokenSpacing, string][] = [
    ["xxs", "--v-spacing-xxs"],
    ["xs", "--v-spacing-xs"],
    ["sm", "--v-spacing-sm"],
    ["md", "--v-spacing-md"],
    ["lg", "--v-spacing-lg"],
    ["xl", "--v-spacing-xl"],
    ["xxl", "--v-spacing-xxl"],
    ["xxxl", "--v-spacing-xxxl"],
    ["4xl", "--v-spacing-4xl"],
    ["5xl", "--v-spacing-5xl"],
    ["6xl", "--v-spacing-6xl"],
  ];
  for (const [key, varName] of entries) {
    const value = spacing[key];
    if (value !== undefined) map[varName] = value;
  }
  return map;
}

function tokensToVars(tokens: VTokens): Record<string, string> {
  let vars: Record<string, string> = {};
  if (tokens.colors) vars = { ...vars, ...colorsToVars(tokens.colors) };
  if (tokens.radius) vars = { ...vars, ...radiusToVars(tokens.radius) };
  if (tokens.sizes) vars = { ...vars, ...sizesToVars(tokens.sizes) };
  if (tokens.spacing) vars = { ...vars, ...spacingToVars(tokens.spacing) };
  return vars;
}

// -----------------------------------------
// createTheme()
// -----------------------------------------

/**
 * Builds a theme from token and component overrides.
 *
 * `tokens.generated.css` supplies the light and dark defaults; the theme adds CSS variable overrides on top.
 *
 * - Level 1: Global design token overrides via CSS Variables
 * - Level 2: Per-instance props (handled by user via component props)
 * - Level 3: Component-level default props & styles overrides
 *
 * @example
 * const myTheme = createTheme({
 *   tokens: {
 *     colors: { primary: '#6366f1' },
 *     radius: { md: '12px' },
 *     sizes: { md: { height: '44px' } },
 *   },
 *   components: {
 *     VButton: {
 *       defaultProps: { variant: 'outlined', size: 'md' },
 *       styles: { root: 'font-semibold tracking-wide' },
 *     },
 *   },
 * })
 */
export function createTheme(config: VThemeConfig = {}): VResolvedTheme {
  const cssVariables = config.tokens ? tokensToVars(config.tokens) : {};
  const darkCssVariables = config.darkTokens ? tokensToVars(config.darkTokens) : {};
  const componentOverrides = config.components ?? {};

  return {
    cssVariables,
    darkCssVariables,
    componentOverrides,
  };
}
