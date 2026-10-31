/**
 * Volo Tailwind CSS Plugin
 *
 * Maps Volo design tokens (CSS Variables) to Tailwind utility classes.
 *
 * Generated utilities:
 *   bg-v-primary       → background-color: var(--v-primary)
 *   text-v-foreground  → color: var(--v-foreground)
 *   border-v-border    → border-color: var(--v-border)
 *   rounded-v-md       → border-radius: var(--v-radius-md)
 *   shadow-v-md        → box-shadow: var(--v-shadow-md)
 *
 * @example
 * // tailwind.config.ts (JS config, loaded with `@config`)
 * import { voloPlugin } from '@volo-uti/volo-web-ui/tailwind-plugin'
 * export default {
 *   plugins: [voloPlugin()],
 * }
 *
 * @example
 * // app.css (Tailwind 4, CSS-first)
 * // @import "tailwindcss"; @plugin "@volo-uti/volo-web-ui/tailwind-plugin";
 */

type AddUtilitiesFn = (utilities: Record<string, Record<string, string>>) => void;

/**
 * Tailwind plugin that maps the Volo tokens to `bg-v-*`, `rounded-v-*`, `p-v-*` utilities.
 *
 * @returns Plugin object for the `plugins` array of a JS config.
 */
export function voloPlugin() {
  return {
    handler({ addUtilities }: { addUtilities: AddUtilitiesFn }) {
      // Color utilities
      const colorTokens = [
        "background",
        "foreground",
        "primary",
        "primary-foreground",
        "secondary",
        "secondary-foreground",
        "tertiary",
        "tertiary-foreground",
        "muted",
        "muted-foreground",
        "accent",
        "accent-foreground",
        "destructive",
        "destructive-foreground",
        "success",
        "success-foreground",
        "warning",
        "warning-foreground",
        "error",
        "error-foreground",
        "info",
        "info-foreground",
        "border",
        "input",
        "ring",
        "card",
        "card-foreground",
        "popover",
        "popover-foreground",
        "disabled",
        "disabled-foreground",
        "scrim",
      ];

      const colorUtilities: Record<string, Record<string, string>> = {};
      for (const token of colorTokens) {
        colorUtilities[`.bg-v-${token}`] = { "background-color": `var(--v-${token})` };
        colorUtilities[`.text-v-${token}`] = { color: `var(--v-${token})` };
        colorUtilities[`.border-v-${token}`] = { "border-color": `var(--v-${token})` };
        colorUtilities[`.fill-v-${token}`] = { fill: `var(--v-${token})` };
        colorUtilities[`.stroke-v-${token}`] = { stroke: `var(--v-${token})` };
      }

      // Border radius utilities
      const radiusTokens = ["none", "xs", "sm", "md", "lg", "xl", "card", "full"];
      const radiusUtilities: Record<string, Record<string, string>> = {};
      for (const token of radiusTokens) {
        radiusUtilities[`.rounded-v-${token}`] = { "border-radius": `var(--v-radius-${token})` };
      }

      // Shadow utilities
      const shadowTokens = ["xs", "sm", "md", "lg", "xl", "glow"];
      const shadowUtilities: Record<string, Record<string, string>> = {};
      for (const token of shadowTokens) {
        shadowUtilities[`.shadow-v-${token}`] = { "box-shadow": `var(--v-shadow-${token})` };
      }

      // Spacing utilities
      const spacingTokens = [
        "xxs",
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "xxl",
        "xxxl",
        "4xl",
        "5xl",
        "6xl",
      ];
      const spacingUtilities: Record<string, Record<string, string>> = {};
      for (const token of spacingTokens) {
        spacingUtilities[`.p-v-${token}`] = { padding: `var(--v-spacing-${token})` };
        spacingUtilities[`.px-v-${token}`] = {
          "padding-left": `var(--v-spacing-${token})`,
          "padding-right": `var(--v-spacing-${token})`,
        };
        spacingUtilities[`.py-v-${token}`] = {
          "padding-top": `var(--v-spacing-${token})`,
          "padding-bottom": `var(--v-spacing-${token})`,
        };
        spacingUtilities[`.m-v-${token}`] = { margin: `var(--v-spacing-${token})` };
        spacingUtilities[`.gap-v-${token}`] = { gap: `var(--v-spacing-${token})` };
      }

      addUtilities({
        ...colorUtilities,
        ...radiusUtilities,
        ...shadowUtilities,
        ...spacingUtilities,
      });
    },
  };
}

/** Default export for Tailwind 4's CSS-first `@plugin "@volo-uti/volo-web-ui/tailwind-plugin"`. */
export default voloPlugin();
