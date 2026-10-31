import type { FormHTMLAttributes } from "react";

/**
 * VForm props.
 *
 * Every native `<form>` attribute (`action`, `noValidate`, `onChange`, `onReset`, …) passes
 * through to the form element.
 */
export interface VFormProps extends FormHTMLAttributes<HTMLFormElement> {
  /**
   * Gap between children; a number is read as px. Defaults to the theme's large spacing.
   * @default 'var(--v-spacing-lg)'
   */
  spacing?: number | string;
}
