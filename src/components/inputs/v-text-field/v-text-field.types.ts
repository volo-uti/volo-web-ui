import type { InputHTMLAttributes, ReactNode } from "react";
import type { VSize } from "../../../lib";
import type { VFormBodyColor, VFormBodyCorner, VFormBodyVariant } from "../v-form-body";

/** VTextField surface style; same set as VFormBody. */
export type VTextFieldVariant = VFormBodyVariant;

/** VTextField focus-ring colour; same set as VFormBody. */
export type VTextFieldColor = VFormBodyColor;

/** VTextField corner shape; same set as VFormBody. */
export type VTextFieldCorner = VFormBodyCorner;

/**
 * VTextField props.
 *
 * Every native `<input>` attribute (`type`, `name`, `placeholder`, `disabled`, `readOnly`,
 * `onChange`, `onBlur`, …) passes through to the input element.
 */
export interface VTextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "color" | "value" | "defaultValue"
> {
  /**
   * Surface style.
   * @default 'outlined'
   */
  variant?: VTextFieldVariant;
  /**
   * Height, padding and font size.
   * @default 'md'
   */
  size?: VSize;
  /**
   * Colour of the focus ring.
   * @default 'primary'
   */
  color?: VTextFieldColor;
  /**
   * Corner shape.
   * @default 'rounded'
   */
  corner?: VTextFieldCorner;
  /** Controlled value. */
  value?: string;
  /**
   * Initial value when uncontrolled.
   * @default ''
   */
  defaultValue?: string;
  /** Called with the new value on every edit and on clear. */
  onValueChange?: (value: string) => void;
  /** Label shown above the input. */
  label?: ReactNode;
  /**
   * Shows the required mark after the label.
   * @default false
   */
  required?: boolean;
  /**
   * Character used as the required mark.
   * @default '*'
   */
  requiredMark?: string;
  /** Element placed next to the label, e.g. a help icon. */
  tooltip?: ReactNode;
  /** Extra info aligned to the right end of the label row. */
  more?: ReactNode;
  /** Element before the input text, e.g. an icon. */
  leading?: ReactNode;
  /** Element after the input text, e.g. an icon. */
  trailing?: ReactNode;
  /** Text after the input text, e.g. a unit. */
  suffix?: ReactNode;
  /** Hint shown below the input when there is no error or success message. */
  helper?: ReactNode;
  /**
   * Error state; sets `aria-invalid`, shows `errorText` and turns the border to the error colour.
   * @default false
   */
  error?: boolean;
  /** Message shown while `error` is true. */
  errorText?: ReactNode;
  /**
   * Success state; shows `successText` and turns the border to the success colour.
   * @default false
   */
  success?: boolean;
  /** Message shown while `success` is true. */
  successText?: ReactNode;
  /** Note that stays visible below the message. */
  extra?: ReactNode;
  /** Character limit; shows a `current/max` counter. */
  maxLength?: number;
  /**
   * Stretches the field to the full width of its parent.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Shows a spinner after the input text.
   * @default false
   */
  loading?: boolean;
  /**
   * Shows a clear button while the input has a value.
   * @default false
   */
  clearable?: boolean;
}
