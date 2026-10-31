"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import type { VFormFooterProps } from "./v-form-footer.types";

/**
 * Message row below a form field: error, success or helper text, counter and extra note.
 *
 * Message priority is error, then success, then helper. Renders nothing when there is
 * nothing to show. VFormField uses it internally; use it on its own for a custom field layout.
 *
 * @example
 * <VFormFooter helper="At least 8 characters" maxLength={20} currentLength={5} />
 */
const VFormFooter = forwardRef<HTMLDivElement, VFormFooterProps>((props, ref) => {
  const override = useComponentOverride("VFormFooter");

  const {
    helper,
    error = false,
    errorText,
    success = false,
    successText,
    extra,
    maxLength,
    currentLength,
    counter,
    messageId,
    className,
    ...rest
  } = props;

  let message: ReactNode;
  let messageColor = "";
  if (error && errorText) {
    message = errorText;
    messageColor = "text-[var(--v-error)]";
  } else if (success && successText) {
    message = successText;
    messageColor = "text-[var(--v-success)]";
  } else if (helper) {
    message = helper;
    messageColor = "text-[var(--v-muted-foreground)]";
  }

  const showCounter = counter != null || maxLength != null;
  if (message == null && !showCounter && extra == null) return null;

  const overLimit = maxLength != null && currentLength != null && currentLength > maxLength;

  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-[var(--v-spacing-xxs)]", override?.styles?.root, className)}
      {...rest}
    >
      <div className="flex items-start justify-between">
        {message ? (
          <p
            id={messageId}
            className={cn(
              "flex-1 text-[length:var(--v-size-sm-font-size)]",
              messageColor,
              override?.styles?.message,
            )}
          >
            {message}
          </p>
        ) : (
          <span />
        )}
        {showCounter &&
          (counter ?? (
            <span
              className={cn(
                "shrink-0 text-[length:var(--v-size-sm-font-size)]",
                overLimit ? "text-[var(--v-error)]" : "text-[var(--v-muted-foreground)]",
              )}
            >
              {currentLength ?? 0}/{maxLength}
            </span>
          ))}
      </div>
      {extra && (
        <div className="text-[length:var(--v-size-sm-font-size)] text-[var(--v-muted-foreground)]">
          {extra}
        </div>
      )}
    </div>
  );
});

VFormFooter.displayName = "VFormFooter";

export { VFormFooter };
