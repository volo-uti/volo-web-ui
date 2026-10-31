"use client";

import { forwardRef } from "react";
import { cn } from "../../../lib";
import type { VColor } from "../../../lib";
import type { VFabPosition, VFabProps, VFabSize, VFabVariant } from "./v-fab.types";

const sizeStyles: Record<VFabSize, string> = {
  sm: "h-10 min-w-10 text-[length:var(--v-size-sm-icon-size)]",
  md: "h-14 min-w-14 text-[length:var(--v-size-md-icon-size)]",
  lg: "h-24 min-w-24 text-[length:var(--v-size-xl-icon-size)]",
};

const iconOnlyStyles: Record<VFabSize, string> = {
  sm: "w-10 rounded-[var(--v-size-sm-radius)]",
  md: "w-14 rounded-[var(--v-size-lg-radius)]",
  lg: "w-24 rounded-[var(--v-size-xl-radius)]",
};

const extendedStyles = "gap-2 px-5 rounded-full font-[var(--v-font-weight-medium)]";

const positionStyles: Record<VFabPosition, string> = {
  "bottom-right": "fixed bottom-6 right-6 z-50",
  "bottom-left": "fixed bottom-6 left-6 z-50",
  "bottom-center": "fixed bottom-6 left-1/2 z-50 -translate-x-1/2",
  static: "",
};

const variantColorStyles: Record<VFabVariant, Record<VColor, string>> = {
  filled: {
    primary: "bg-[var(--v-primary)] text-[var(--v-primary-foreground)]",
    secondary: "bg-[var(--v-secondary)] text-[var(--v-secondary-foreground)]",
    tertiary: "bg-[var(--v-accent)] text-[var(--v-accent-foreground)]",
    destructive: "bg-[var(--v-destructive)] text-[var(--v-destructive-foreground)]",
  },
  tonal: {
    primary: "bg-[var(--v-primary)]/15 text-[var(--v-primary)]",
    secondary: "bg-[var(--v-secondary)] text-[var(--v-secondary-foreground)]",
    tertiary: "bg-[var(--v-accent)]/15 text-[var(--v-accent-foreground)]",
    destructive: "bg-[var(--v-destructive)]/15 text-[var(--v-destructive)]",
  },
  outlined: {
    primary: "border border-[var(--v-primary)] bg-[var(--v-background)] text-[var(--v-primary)]",
    secondary:
      "border border-[var(--v-border)] bg-[var(--v-background)] text-[var(--v-foreground)]",
    tertiary:
      "border border-[var(--v-accent)] bg-[var(--v-background)] text-[var(--v-accent-foreground)]",
    destructive:
      "border border-[var(--v-destructive)] bg-[var(--v-background)] text-[var(--v-destructive)]",
  },
};

/**
 * Floating action button for the main action of a screen, fixed in a corner.
 *
 * It extends when it has a label.
 *
 * @example
 * <VFab icon={<PlusIcon />} tooltip="New note" onClick={create} />
 * <VFab icon={<PlusIcon />} label="New note" position="bottom-left" onClick={create} />
 */
const VFab = forwardRef<HTMLButtonElement, VFabProps>((props, ref) => {
  const {
    // 1. Identity
    variant = "filled",
    // 2. Visual
    size = "md",
    color = "primary",
    backgroundColor,
    foregroundColor,
    // 3. Content
    label,
    // 4. Decorations
    icon,
    // 5. Header/Meta
    tooltip,
    // 7. Layout
    position = "bottom-right",
    // 8. State
    disabled = false,
    // 10. Advanced
    className,
    style,
    type = "button",
    ...rest
  } = props;

  const extended = label !== undefined && label !== null && label !== false;

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      title={tooltip}
      aria-label={!extended && tooltip && !rest["aria-labelledby"] ? tooltip : undefined}
      data-v-size={size}
      data-v-variant={variant}
      data-v-color={color}
      data-v-position={position}
      style={{
        ...(backgroundColor && { backgroundColor }),
        ...(foregroundColor && { color: foregroundColor }),
        ...style,
      }}
      className={cn(
        "v-fab inline-flex items-center justify-center whitespace-nowrap transition-all duration-150",
        "shadow-[var(--v-shadow-lg)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)] focus-visible:ring-offset-2",
        sizeStyles[size],
        extended ? extendedStyles : iconOnlyStyles[size],
        variantColorStyles[variant][color],
        positionStyles[position],
        !disabled && "hover:shadow-[var(--v-shadow-xl)] active:scale-[0.95]",
        disabled && "pointer-events-none opacity-[0.38] shadow-none",
        className,
      )}
      {...rest}
    >
      {icon}
      {extended && <span>{label}</span>}
    </button>
  );
});

VFab.displayName = "VFab";
export { VFab };
