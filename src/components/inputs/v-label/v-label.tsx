import { forwardRef } from "react";
import { cn } from "../../../lib";
import type { VSize } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import type { VLabelProps } from "./v-label.types";

// ─────────────────────────────────────────
// Size styles
// ─────────────────────────────────────────

const labelSizeStyles: Record<VSize, string> = {
  xs: "text-[length:var(--v-size-xs-font-size)]",
  sm: "text-[length:var(--v-size-sm-font-size)]",
  md: "text-[length:var(--v-size-sm-font-size)]",
  lg: "text-[length:var(--v-size-md-font-size)]",
  xl: "text-[length:var(--v-size-lg-font-size)]",
};

// ─────────────────────────────────────────
// VLabel
// ─────────────────────────────────────────

/**
 * Form label with size tokens and a required mark; renders a native `<label>`.
 *
 * @example
 * <VLabel htmlFor="email" required>Email Address</VLabel>
 */
const VLabel = forwardRef<HTMLLabelElement, VLabelProps>((props, ref) => {
  const override = useComponentOverride("VLabel");

  const {
    // 2. Visual
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    // 3. Content
    children,
    // 5. Header/Meta
    required = false,
    requiredMark = "*",
    // 10. Advanced
    className,
    ...restProps
  } = props;

  return (
    <label
      ref={ref}
      className={cn(
        "font-[var(--v-font-weight-medium)] text-[var(--v-foreground)] leading-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        labelSizeStyles[size],
        override?.styles?.root,
        className,
      )}
      data-v-size={size}
      {...restProps}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-[var(--v-error)]" aria-hidden="true">
          {requiredMark}
        </span>
      )}
    </label>
  );
});

VLabel.displayName = "VLabel";

export { VLabel };
