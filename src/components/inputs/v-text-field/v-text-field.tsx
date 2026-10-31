"use client";

import { forwardRef, useCallback, useId, useRef, type ChangeEvent } from "react";
import { cn } from "../../../lib";
import type { VSize } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useControllable } from "../../../hooks/use-controllable";
import { useLocaleText } from "../../../hooks/use-locale";
import { VFormField } from "../v-form-field";
import { VFormBody } from "../v-form-body";
import type { VTextFieldProps } from "./v-text-field.types";

// ─────────────────────────────────────────
// Clear icon
// ─────────────────────────────────────────

function ClearIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="h-[1em] w-[1em] flex-shrink-0 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─────────────────────────────────────────
// VTextField
// ─────────────────────────────────────────

/**
 * Single-line text input with label, messages, adornments and a clear button.
 *
 * Works controlled (`value` + `onValueChange`) or uncontrolled (`defaultValue`).
 * Wraps the input in VFormBody and VFormField; native input props pass through.
 *
 * @example
 * <VTextField
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onValueChange={setEmail}
 *   error={!valid}
 *   errorText="Enter a valid email"
 * />
 */
const VTextField = forwardRef<HTMLInputElement, VTextFieldProps>((props, ref) => {
  const override = useComponentOverride("VTextField");
  const localeText = useLocaleText();

  const {
    variant = "outlined",
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    color = "primary",
    corner = "rounded",
    label,
    value: valueProp,
    defaultValue = "",
    onValueChange,
    leading,
    trailing,
    suffix,
    required = false,
    requiredMark,
    tooltip,
    more,
    helper,
    error = false,
    errorText,
    success = false,
    successText,
    extra,
    maxLength,
    fullWidth = false,
    disabled = false,
    loading = false,
    readOnly = false,
    clearable = false,
    onChange,
    id: idProp,
    className,
    ...restProps
  } = props;

  const autoId = useId();
  const inputId = idProp ?? autoId;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const setInputRef = useCallback(
    (el: HTMLInputElement | null) => {
      inputRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ref],
  );

  const [currentValue, setValue] = useControllable({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  const hasMessage = (error && errorText) || (success && successText) || helper;
  const messageId = hasMessage ? `${inputId}-message` : undefined;

  const showClear = clearable && currentValue && !disabled && !readOnly;

  return (
    <VFormField
      label={label}
      required={required}
      requiredMark={requiredMark}
      tooltip={tooltip}
      more={more}
      helper={helper}
      error={error}
      errorText={errorText}
      success={success}
      successText={successText}
      extra={extra}
      maxLength={maxLength}
      currentLength={currentValue.length}
      size={size}
      htmlFor={inputId}
      className={cn(fullWidth && "w-full", override?.styles?.root, className)}
    >
      <VFormBody
        variant={variant}
        size={size}
        color={color}
        corner={corner}
        leading={leading}
        disabled={disabled}
        readOnly={readOnly}
        error={error}
        success={success}
        className={override?.styles?.wrapper}
        trailing={
          (suffix || showClear || loading || trailing) && (
            <>
              {suffix}
              {showClear && (
                <button
                  type="button"
                  onClick={() => {
                    setValue("");
                    // The button unmounts once the field is empty; keep focus in the field
                    inputRef.current?.focus();
                  }}
                  className="flex-shrink-0 text-[var(--v-muted-foreground)] transition-colors hover:text-[var(--v-foreground)]"
                  aria-label={localeText.textFieldClear}
                >
                  <ClearIcon className="h-[1em] w-[1em]" />
                </button>
              )}
              {loading && <Spinner />}
              {trailing}
            </>
          )
        }
      >
        <input
          ref={setInputRef}
          id={inputId}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          aria-invalid={error || undefined}
          aria-describedby={messageId}
          className={cn(
            "min-w-0 flex-1 bg-transparent outline-none placeholder:text-[var(--v-muted-foreground)]",
            override?.styles?.input,
          )}
          {...restProps}
        />
      </VFormBody>
    </VFormField>
  );
});

VTextField.displayName = "VTextField";

export { VTextField };
