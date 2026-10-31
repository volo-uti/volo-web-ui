import type { HTMLAttributes, ReactNode } from "react";

/** VFormFooter props. */
export interface VFormFooterProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
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
  /** Replaces the default `current/max` counter. */
  counter?: ReactNode;
  /** `id` of the message paragraph; use it for `aria-describedby` on the control. */
  messageId?: string;
}
