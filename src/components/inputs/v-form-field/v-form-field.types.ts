import type { HTMLAttributes, ReactNode } from "react";
import type { VSize } from "../../../lib";

/** VFormField props. */
export interface VFormFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** The control, usually a VTextField body or any native input. */
  children?: ReactNode;
  /** Label shown above the control. */
  label?: ReactNode;
  /**
   * Text size of the label and messages.
   * @default 'md'
   */
  size?: VSize;
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
  /** Hint shown when there is no error or success message. */
  helper?: ReactNode;
  /**
   * Error state; shows `errorText` and takes priority over success and helper.
   * @default false
   */
  error?: boolean;
  /** Message shown while `error` is true. */
  errorText?: ReactNode;
  /**
   * Success state; shows `successText` and takes priority over helper.
   * @default false
   */
  success?: boolean;
  /** Message shown while `success` is true. */
  successText?: ReactNode;
  /** Note that stays visible below the message. */
  extra?: ReactNode;
  /** Character limit; shows a `current/max` counter. */
  maxLength?: number;
  /** Current character count shown in the counter. */
  currentLength?: number;
  /** `id` of the control the label belongs to; the message paragraph gets `<htmlFor>-message`. */
  htmlFor?: string;
}
