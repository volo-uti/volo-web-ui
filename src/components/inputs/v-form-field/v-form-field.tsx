import { forwardRef, useId } from "react";
import { cn } from "../../../lib";
import type { VSize } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { VFormHeader } from "../v-form-header";
import { VFormFooter } from "../v-form-footer";
import type { VFormFieldProps } from "./v-form-field.types";

/**
 * Form field that stacks a label row, a control and a message row.
 *
 * Composes VFormHeader and VFormFooter; message priority is error, then success, then helper.
 *
 * @example
 * <VFormField label="Username" required helper="Choose a unique name">
 *   <VTextField />
 * </VFormField>
 *
 * @example
 * <VFormField label="Bio" maxLength={200} currentLength={text.length}>
 *   <VTextArea value={text} onValueChange={setText} />
 * </VFormField>
 */
const VFormField = forwardRef<HTMLDivElement, VFormFieldProps>((props, ref) => {
  const override = useComponentOverride("VFormField");

  const {
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    children,
    label,
    maxLength,
    currentLength,
    required = false,
    requiredMark = "*",
    tooltip,
    more,
    helper,
    error = false,
    errorText,
    success = false,
    successText,
    extra,
    htmlFor: htmlForProp,
    className,
    ...restProps
  } = props;

  const autoId = useId();
  const fieldId = htmlForProp ?? autoId;

  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-[var(--v-spacing-xs)]", override?.styles?.root, className)}
      data-v-size={size}
      {...restProps}
    >
      <VFormHeader
        label={label}
        required={required}
        requiredMark={requiredMark}
        tooltip={tooltip}
        more={more}
        size={size}
        htmlFor={fieldId}
      />
      {children}
      <VFormFooter
        helper={helper}
        error={error}
        errorText={errorText}
        success={success}
        successText={successText}
        extra={extra}
        maxLength={maxLength}
        currentLength={currentLength}
        messageId={`${fieldId}-message`}
      />
    </div>
  );
});

VFormField.displayName = "VFormField";

export { VFormField };
