import { useTheme } from "./use-theme";
import type { VComponentOverride } from "../theme/create-theme";

/**
 * Reads the theme overrides of one component by name.
 *
 * Call it inside a component to merge the theme's `defaultProps` and `styles` into its own.
 *
 * @param componentName - Component name as used in `createTheme({ components })`, e.g. `"VButton"`.
 * @returns The component's override, or undefined when the theme sets none.
 *
 * @example
 * const override = useComponentOverride('VButton')
 * const variant = props.variant ?? override?.defaultProps?.variant ?? 'filled'
 */
export function useComponentOverride(componentName: string): VComponentOverride | undefined {
  const { componentOverrides } = useTheme();
  return componentOverrides[componentName];
}
