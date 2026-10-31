"use client";

import { forwardRef, useCallback, useEffect, useId, useRef, type ChangeEvent } from "react";
import { cn } from "../../../lib";
import type { VSize } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useControllable } from "../../../hooks/use-controllable";
import { VFormField } from "../v-form-field";
import type { VTextAreaProps, VTextAreaResize } from "./v-text-area.types";

// ─────────────────────────────────────────
// Size styles
// ─────────────────────────────────────────

const textareaSizeStyles: Record<VSize, string> = {
  xs: "px-[var(--v-size-xs-padding-x)] py-[var(--v-size-xs-padding-y)] text-[length:var(--v-size-xs-font-size)] rounded-[var(--v-size-xs-radius)]",
  sm: "px-[var(--v-size-sm-padding-x)] py-[var(--v-size-sm-padding-y)] text-[length:var(--v-size-sm-font-size)] rounded-[var(--v-size-sm-radius)]",
  md: "px-[var(--v-size-md-padding-x)] py-[var(--v-size-md-padding-y)] text-[length:var(--v-size-md-font-size)] rounded-[var(--v-size-md-radius)]",
  lg: "px-[var(--v-size-lg-padding-x)] py-[var(--v-size-lg-padding-y)] text-[length:var(--v-size-lg-font-size)] rounded-[var(--v-size-lg-radius)]",
  xl: "px-[var(--v-size-xl-padding-x)] py-[var(--v-size-xl-padding-y)] text-[length:var(--v-size-xl-font-size)] rounded-[var(--v-size-xl-radius)]",
};

const resizeMap: Record<VTextAreaResize, string> = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
};

// ─────────────────────────────────────────
// VTextArea
// ─────────────────────────────────────────

/**
 * Multi-line text input with label, messages, a counter and optional auto-resize.
 *
 * Works controlled (`value` + `onValueChange`) or uncontrolled (`defaultValue`).
 * Wraps the textarea in VFormField; native textarea props pass through.
 *
 * @example
 * <VTextArea label="Bio" rows={4} maxLength={200} value={bio} onValueChange={setBio} />
 */
const VTextArea = forwardRef<HTMLTextAreaElement, VTextAreaProps>((props, ref) => {
  const override = useComponentOverride("VTextArea");

  const {
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    label,
    value: valueProp,
    defaultValue = "",
    placeholder,
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
    showCounter = true,
    fullWidth = false,
    disabled = false,
    rows = 3,
    resize = "vertical",
    autoResize = false,
    onValueChange,
    onChange,
    id: idProp,
    className,
    ...restProps
  } = props;

  const autoId = useId();
  const inputId = idProp ?? autoId;

  const internalRef = useRef<HTMLTextAreaElement | null>(null);

  const [currentValue, setValue] = useControllable({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

  const adjustHeight = useCallback(() => {
    const el = internalRef.current;
    if (!el || !autoResize) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [autoResize]);

  useEffect(() => {
    adjustHeight();
  }, [currentValue, adjustHeight]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  const setRefs = useCallback(
    (el: HTMLTextAreaElement | null) => {
      internalRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
      }
    },
    [ref],
  );

  // Determine message for aria-describedby
  const hasMessage = (error && errorText) || (success && successText) || helper;
  const messageId = hasMessage ? `${inputId}-message` : undefined;

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
      maxLength={showCounter ? maxLength : undefined}
      currentLength={currentValue.length}
      size={size}
      htmlFor={inputId}
      className={cn(fullWidth && "w-full", override?.styles?.root, className)}
    >
      <textarea
        ref={setRefs}
        id={inputId}
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={error || undefined}
        aria-describedby={messageId}
        className={cn(
          "border bg-transparent transition-colors outline-none",
          "border-[var(--v-input)]",
          "focus-within:border-[var(--v-ring)] focus-within:ring-1 focus-within:ring-[var(--v-ring)]",
          "placeholder:text-[var(--v-muted-foreground)]",
          error &&
            "border-[var(--v-error)] focus-within:border-[var(--v-error)] focus-within:ring-[var(--v-error)]",
          disabled && "opacity-50 pointer-events-none",
          textareaSizeStyles[size],
          autoResize ? "resize-none overflow-hidden" : resizeMap[resize],
          override?.styles?.textarea,
        )}
        {...restProps}
      />
    </VFormField>
  );
});

VTextArea.displayName = "VTextArea";

export { VTextArea };
