"use client";

import { forwardRef } from "react";
import { cn } from "../../../lib";
import type { VSize } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import type { VFormBodyColor, VFormBodyProps } from "./v-form-body.types";

const sizeStyles: Record<VSize, string> = {
  xs: "h-[var(--v-size-xs-height)] px-[var(--v-size-xs-padding-x)] text-[length:var(--v-size-xs-font-size)] gap-[var(--v-size-xs-gap)] rounded-[var(--v-size-xs-radius)]",
  sm: "h-[var(--v-size-sm-height)] px-[var(--v-size-sm-padding-x)] text-[length:var(--v-size-sm-font-size)] gap-[var(--v-size-sm-gap)] rounded-[var(--v-size-sm-radius)]",
  md: "h-[var(--v-size-md-height)] px-[var(--v-size-md-padding-x)] text-[length:var(--v-size-md-font-size)] gap-[var(--v-size-md-gap)] rounded-[var(--v-size-md-radius)]",
  lg: "h-[var(--v-size-lg-height)] px-[var(--v-size-lg-padding-x)] text-[length:var(--v-size-lg-font-size)] gap-[var(--v-size-lg-gap)] rounded-[var(--v-size-lg-radius)]",
  xl: "h-[var(--v-size-xl-height)] px-[var(--v-size-xl-padding-x)] text-[length:var(--v-size-xl-font-size)] gap-[var(--v-size-xl-gap)] rounded-[var(--v-size-xl-radius)]",
};

const ringStyles: Record<VFormBodyColor, { focus: string; focused: string }> = {
  primary: {
    focus: "focus-within:border-[var(--v-ring)] focus-within:ring-[var(--v-ring)]",
    focused: "border-[var(--v-ring)] ring-[var(--v-ring)]",
  },
  secondary: {
    focus: "focus-within:border-[var(--v-secondary)] focus-within:ring-[var(--v-secondary)]",
    focused: "border-[var(--v-secondary)] ring-[var(--v-secondary)]",
  },
  destructive: {
    focus: "focus-within:border-[var(--v-destructive)] focus-within:ring-[var(--v-destructive)]",
    focused: "border-[var(--v-destructive)] ring-[var(--v-destructive)]",
  },
};

/**
 * Bordered surface that holds a form control with optional leading and trailing elements.
 *
 * Draws the border, background, focus ring and error or success look; the control inside
 * stays yours. VTextField uses it internally.
 *
 * @example
 * <VFormBody leading={<SearchIcon />} error={!valid}>
 *   <input className="min-w-0 flex-1 bg-transparent outline-none" />
 * </VFormBody>
 */
const VFormBody = forwardRef<HTMLDivElement, VFormBodyProps>((props, ref) => {
  const override = useComponentOverride("VFormBody");

  const {
    children,
    variant = "outlined",
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    color = "primary",
    corner = "rounded",
    leading,
    trailing,
    fullWidth = false,
    disabled = false,
    readOnly = false,
    focused = false,
    error = false,
    success = false,
    className,
    ...rest
  } = props;

  const ring = ringStyles[color];

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center transition-colors",
        sizeStyles[size],
        variant === "filled" && "border border-transparent bg-[var(--v-muted)]/30",
        variant === "outlined" && "border border-[var(--v-input)] bg-transparent",
        variant === "underline" && "!rounded-none border-0 border-b border-[var(--v-input)]",
        readOnly && variant !== "filled" && "bg-[var(--v-muted)]/20",
        "focus-within:ring-1",
        ring.focus,
        focused && ["ring-1", ring.focused],
        success &&
          "border-[var(--v-success)] focus-within:border-[var(--v-success)] focus-within:ring-[var(--v-success)]",
        error &&
          "border-[var(--v-error)] focus-within:border-[var(--v-error)] focus-within:ring-[var(--v-error)]",
        corner === "square" && "!rounded-none",
        corner === "pill" && "!rounded-full",
        fullWidth && "w-full",
        disabled && "pointer-events-none opacity-50",
        override?.styles?.root,
        className,
      )}
      data-disabled={disabled || undefined}
      {...rest}
    >
      {leading && <span className="flex-shrink-0 text-[var(--v-muted-foreground)]">{leading}</span>}
      {children}
      {trailing && (
        <span className="flex flex-shrink-0 items-center gap-[inherit] text-[var(--v-muted-foreground)]">
          {trailing}
        </span>
      )}
    </div>
  );
});

VFormBody.displayName = "VFormBody";

export { VFormBody };
