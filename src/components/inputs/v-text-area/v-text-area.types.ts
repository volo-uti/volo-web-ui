import type { ReactNode, TextareaHTMLAttributes } from "react";
import type { VSize } from "../../../lib";

/** Resize handles a VTextArea offers. */
export type VTextAreaResize = "none" | "vertical" | "horizontal" | "both";

/**
 * VTextArea props.
 *
 * Every native `<textarea>` attribute (`name`, `placeholder`, `disabled`, `readOnly`,
 * `onChange`, `onBlur`, …) passes through to the textarea element.
 */
export interface VTextAreaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "value" | "defaultValue"
> {
  /**
   * Padding and font size.
   * @default 'md'
   */
  size?: VSize;
  /** Controlled value. */
  value?: string;
  /**
   * Initial value when uncontrolled.
   * @default ''
   */
  defaultValue?: string;
  /** Called with the new value on every edit. */
  onValueChange?: (value: string) => void;
  /** Label shown above the textarea. */
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
  /** Hint shown below the textarea when there is no error or success message. */
  helper?: ReactNode;
  /**
   * Error state; sets `aria-invalid`, shows `errorText` and turns the border to the error colour.
   * @default false
   */
  error?: boolean;
  /** Message shown while `error` is true. */
  errorText?: ReactNode;
  /**
   * Success state; shows `successText`.
   * @default false
   */
  success?: boolean;
  /** Message shown while `success` is true. */
  successText?: ReactNode;
  /** Note that stays visible below the message. */
  extra?: ReactNode;
  /** Character limit; shows a `current/max` counter when `showCounter` is on. */
  maxLength?: number;
  /**
   * Shows the `current/max` counter; only has an effect when `maxLength` is set.
   * @default true
   */
  showCounter?: boolean;
  /**
   * Stretches the field to the full width of its parent.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Number of visible text rows.
   * @default 3
   */
  rows?: number;
  /**
   * Which directions the user can drag to resize; ignored with `autoResize`.
   * @default 'vertical'
   */
  resize?: VTextAreaResize;
  /**
   * Grows the height with the content.
   * @default false
   */
  autoResize?: boolean;
}
