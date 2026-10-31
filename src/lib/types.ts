/**
 * Component sizes.
 * Maps to --v-size-{size}-* CSS Variables.
 */
export type VSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Semantic colours.
 * Maps to --v-color-{color} CSS Variables.
 */
export type VColor = "primary" | "secondary" | "tertiary" | "destructive";

/**
 * Visual variants.
 */
export type VVariant = "filled" | "outlined" | "text" | "ghost";

/**
 * Option of Select-like components.
 */
export type VOption<T = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

/**
 * Layout orientation.
 */
export type VOrientation = "horizontal" | "vertical";

/**
 * Four sides.
 */
export type VSide = "top" | "right" | "bottom" | "left";

/**
 * Start, center or end alignment.
 */
export type VAlign = "start" | "center" | "end";
