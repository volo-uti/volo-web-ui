"use client";

import { forwardRef } from "react";
import { cn } from "../../../lib";
import type { VSize } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import type { VFormHeaderProps } from "./v-form-header.types";

const labelSizeStyles: Record<VSize, string> = {
  xs: "text-[length:var(--v-size-xs-font-size)]",
  sm: "text-[length:var(--v-size-sm-font-size)]",
  md: "text-[length:var(--v-size-md-font-size)]",
  lg: "text-[length:var(--v-size-lg-font-size)]",
  xl: "text-[length:var(--v-size-xl-font-size)]",
};

/**
 * Label row above a form field: label, required mark, tooltip and extra info.
 *
 * Renders nothing when `label`, `tooltip` and `more` are all empty.
 * VFormField uses it internally; use it on its own to build a custom field layout.
 *
 * @example
 * <VFormHeader label="Email" required htmlFor="email" more="Optional after sign-up" />
 */
const VFormHeader = forwardRef<HTMLDivElement, VFormHeaderProps>((props, ref) => {
  const override = useComponentOverride("VFormHeader");

  const {
    label,
    required = false,
    requiredMark = "*",
    tooltip,
    more,
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    htmlFor,
    className,
    ...rest
  } = props;

  if (label == null && tooltip == null && more == null) return null;

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-between", override?.styles?.root, className)}
      {...rest}
    >
      <label
        htmlFor={htmlFor}
        className={cn(
          "inline-flex items-center gap-1 font-[var(--v-font-weight-medium)] text-[var(--v-foreground)]",
          labelSizeStyles[size],
          override?.styles?.label,
        )}
      >
        {label}
        {required && (
          <span className="text-[var(--v-error)]" aria-hidden="true">
            {requiredMark}
          </span>
        )}
        {tooltip && <span className="inline-flex items-center">{tooltip}</span>}
      </label>
      {more && (
        <span className="text-[length:var(--v-size-sm-font-size)] text-[var(--v-muted-foreground)]">
          {more}
        </span>
      )}
    </div>
  );
});

VFormHeader.displayName = "VFormHeader";

export { VFormHeader };
