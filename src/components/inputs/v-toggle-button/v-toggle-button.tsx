"use client";

import { forwardRef, type MouseEvent } from "react";
import { cn } from "../../../lib";
import type { VSize } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useControllable } from "../../../hooks/use-controllable";
import type { VToggleButtonProps, VToggleButtonVariant } from "./v-toggle-button.types";

// ─────────────────────────────────────────
// Size styles
// ─────────────────────────────────────────

const sizeStyles: Record<VSize, string> = {
  xs: "h-[var(--v-size-xs-height)] px-[var(--v-size-xs-padding-x)] text-[length:var(--v-size-xs-font-size)] gap-[var(--v-size-xs-gap)] rounded-[var(--v-size-xs-radius)]",
  sm: "h-[var(--v-size-sm-height)] px-[var(--v-size-sm-padding-x)] text-[length:var(--v-size-sm-font-size)] gap-[var(--v-size-sm-gap)] rounded-[var(--v-size-sm-radius)]",
  md: "h-[var(--v-size-md-height)] px-[var(--v-size-md-padding-x)] text-[length:var(--v-size-md-font-size)] gap-[var(--v-size-md-gap)] rounded-[var(--v-size-md-radius)]",
  lg: "h-[var(--v-size-lg-height)] px-[var(--v-size-lg-padding-x)] text-[length:var(--v-size-lg-font-size)] gap-[var(--v-size-lg-gap)] rounded-[var(--v-size-lg-radius)]",
  xl: "h-[var(--v-size-xl-height)] px-[var(--v-size-xl-padding-x)] text-[length:var(--v-size-xl-font-size)] gap-[var(--v-size-xl-gap)] rounded-[var(--v-size-xl-radius)]",
};

// ─────────────────────────────────────────
// Variant styles (unpressed / pressed)
// ─────────────────────────────────────────

const variantStyles: Record<VToggleButtonVariant, { base: string; pressed: string }> = {
  filled: {
    base: "bg-[var(--v-muted)] text-[var(--v-foreground)] hover:bg-[var(--v-secondary)]",
    pressed: "bg-[var(--v-primary)] text-[var(--v-primary-foreground)] hover:opacity-90",
  },
  outlined: {
    base: "border border-[var(--v-border)] bg-transparent text-[var(--v-foreground)] hover:bg-[var(--v-muted)]",
    pressed: "border border-[var(--v-primary)] bg-[var(--v-primary)]/10 text-[var(--v-foreground)]",
  },
  ghost: {
    base: "bg-transparent text-[var(--v-foreground)] hover:bg-[var(--v-accent)]",
    pressed: "bg-[var(--v-accent)] text-[var(--v-accent-foreground)]",
  },
};

// ─────────────────────────────────────────
// VToggleButton
// ─────────────────────────────────────────

/**
 * Button that toggles and exposes aria-pressed.
 *
 * @example
 * <VToggleButton pressed={bold} onPressedChange={setBold}>
 *   Bold
 * </VToggleButton>
 */
const VToggleButton = forwardRef<HTMLButtonElement, VToggleButtonProps>((props, ref) => {
  const override = useComponentOverride("VToggleButton");

  const {
    // 1. Identity
    variant = (override?.defaultProps?.variant as VToggleButtonVariant | undefined) ?? "ghost",
    // 2. Visual
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    // 3. Content
    children,
    // 8. State
    disabled = false,
    pressed: pressedProp,
    defaultPressed = false,
    // 9. Callbacks
    onPressedChange,
    // 10. Advanced
    className,
    onClick,
    ...restProps
  } = props;

  const [isPressed, setIsPressed] = useControllable({
    value: pressedProp,
    defaultValue: defaultPressed,
    onChange: onPressedChange,
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (!disabled) {
      setIsPressed(!isPressed);
    }
  };

  const styles = variantStyles[variant];

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={isPressed}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center font-[var(--v-font-weight-medium)] whitespace-nowrap transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)] focus-visible:ring-offset-2",
        "active:scale-[0.95]",
        sizeStyles[size],
        isPressed ? styles.pressed : styles.base,
        disabled && "pointer-events-none opacity-50",
        override?.styles?.root,
        className,
      )}
      data-v-size={size}
      data-v-variant={variant}
      data-v-pressed={isPressed}
      {...restProps}
    >
      {children}
    </button>
  );
});

VToggleButton.displayName = "VToggleButton";

export { VToggleButton };
