"use client";

import { forwardRef, type Ref } from "react";
import { cn } from "../../../lib";
import type { VColor, VSize } from "../../../lib";
import { useControllable } from "../../../hooks/use-controllable";
import { useComponentOverride } from "../../../hooks/use-component-override";
import type { VIconButtonProps, VIconButtonVariant } from "./v-icon-button.types";

// ─────────────────────────────────────────
// Size styles
// ─────────────────────────────────────────

const sizeStyles: Record<VSize, string> = {
  xs: "h-[var(--v-size-xs-height)] w-[var(--v-size-xs-height)] text-[length:var(--v-size-xs-icon-size)] rounded-[var(--v-size-xs-radius)]",
  sm: "h-[var(--v-size-sm-height)] w-[var(--v-size-sm-height)] text-[length:var(--v-size-sm-icon-size)] rounded-[var(--v-size-sm-radius)]",
  md: "h-[var(--v-size-md-height)] w-[var(--v-size-md-height)] text-[length:var(--v-size-md-icon-size)] rounded-[var(--v-size-md-radius)]",
  lg: "h-[var(--v-size-lg-height)] w-[var(--v-size-lg-height)] text-[length:var(--v-size-lg-icon-size)] rounded-[var(--v-size-lg-radius)]",
  xl: "h-[var(--v-size-xl-height)] w-[var(--v-size-xl-height)] text-[length:var(--v-size-xl-icon-size)] rounded-[var(--v-size-xl-radius)]",
};

// ─────────────────────────────────────────
// Variant x Color styles
// ─────────────────────────────────────────

const variantColorStyles: Record<VIconButtonVariant, Record<VColor, string>> = {
  default: {
    primary: "text-[var(--v-primary)] bg-transparent hover:bg-[var(--v-muted)]/30",
    secondary: "text-[var(--v-foreground)] bg-transparent hover:bg-[var(--v-muted)]/30",
    tertiary: "text-[var(--v-accent-foreground)] bg-transparent hover:bg-[var(--v-muted)]/30",
    destructive: "text-[var(--v-destructive)] bg-transparent hover:bg-[var(--v-muted)]/30",
  },
  filled: {
    primary: "bg-[var(--v-primary)] text-[var(--v-primary-foreground)] hover:scale-[1.05]",
    secondary: "bg-[var(--v-secondary)] text-[var(--v-secondary-foreground)] hover:scale-[1.05]",
    tertiary: "bg-[var(--v-accent)] text-[var(--v-accent-foreground)] hover:scale-[1.05]",
    destructive:
      "bg-[var(--v-destructive)] text-[var(--v-destructive-foreground)] hover:scale-[1.05]",
  },
  outlined: {
    primary:
      "border border-[var(--v-border)] text-[var(--v-primary)] bg-transparent hover:bg-[var(--v-muted)]/30",
    secondary:
      "border border-[var(--v-border)] text-[var(--v-foreground)] bg-transparent hover:bg-[var(--v-muted)]/30",
    tertiary:
      "border border-[var(--v-accent)] text-[var(--v-accent-foreground)] bg-transparent hover:bg-[var(--v-muted)]/30",
    destructive:
      "border border-[var(--v-border)] text-[var(--v-destructive)] bg-transparent hover:bg-[var(--v-muted)]/30",
  },
  filledTonal: {
    primary: "bg-[var(--v-primary)]/15 text-[var(--v-primary)] hover:scale-[1.05]",
    secondary: "bg-[var(--v-secondary)] text-[var(--v-secondary-foreground)] hover:scale-[1.05]",
    tertiary: "bg-[var(--v-accent)]/15 text-[var(--v-accent-foreground)] hover:scale-[1.05]",
    destructive: "bg-[var(--v-destructive)]/15 text-[var(--v-destructive)] hover:scale-[1.05]",
  },
};

const pressedVariantColorStyles: Record<VIconButtonVariant, Record<VColor, string>> = {
  default: {
    primary: "text-[var(--v-primary)] bg-[var(--v-primary)]/15",
    secondary: "text-[var(--v-foreground)] bg-[var(--v-accent)]",
    tertiary: "text-[var(--v-accent-foreground)] bg-[var(--v-accent)]/15",
    destructive: "text-[var(--v-destructive)] bg-[var(--v-destructive)]/15",
  },
  filled: {
    primary: "bg-[var(--v-primary)] text-[var(--v-primary-foreground)]",
    secondary: "bg-[var(--v-secondary)] text-[var(--v-secondary-foreground)]",
    tertiary: "bg-[var(--v-accent)] text-[var(--v-accent-foreground)]",
    destructive: "bg-[var(--v-destructive)] text-[var(--v-destructive-foreground)]",
  },
  outlined: {
    primary: "border border-[var(--v-primary)] bg-[var(--v-primary)]/10 text-[var(--v-primary)]",
    secondary: "border border-[var(--v-border)] bg-[var(--v-accent)] text-[var(--v-foreground)]",
    tertiary:
      "border border-[var(--v-accent)] bg-[var(--v-accent)]/10 text-[var(--v-accent-foreground)]",
    destructive:
      "border border-[var(--v-destructive)] bg-[var(--v-destructive)]/10 text-[var(--v-destructive)]",
  },
  filledTonal: {
    primary: "bg-[var(--v-primary)]/25 text-[var(--v-primary)]",
    secondary: "bg-[var(--v-secondary)]/80 text-[var(--v-secondary-foreground)]",
    tertiary: "bg-[var(--v-accent)]/25 text-[var(--v-accent-foreground)]",
    destructive: "bg-[var(--v-destructive)]/25 text-[var(--v-destructive)]",
  },
};

// ─────────────────────────────────────────
// Spinner
// ─────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
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
// VIconButton
// ─────────────────────────────────────────

/**
 * Icon-only button with four variants and an optional pressed (toggle) state.
 *
 * @example
 * <VIconButton aria-label="Close" onClick={close}>
 *   <XIcon />
 * </VIconButton>
 *
 * <VIconButton aria-label="Favorite" pressed={fav} onPressedChange={setFav} pressedIcon={<HeartFilled />}>
 *   <HeartOutline />
 * </VIconButton>
 */
const VIconButton = forwardRef<HTMLButtonElement, VIconButtonProps>((props, ref) => {
  const override = useComponentOverride("VIconButton");

  const {
    // 1. Identity
    variant = (override?.defaultProps?.variant as VIconButtonVariant | undefined) ?? "default",
    // 2. Visual
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    color = (override?.defaultProps?.color as VColor | undefined) ?? "primary",
    // 3. Content
    children,
    // 4. Decorations
    pressedIcon,
    // 5. Header/Meta
    tooltip,
    // 8. State
    disabled = false,
    loading = false,
    pressed: pressedProp,
    defaultPressed,
    // 9. Callbacks
    onPressedChange,
    // 10. Advanced
    as: Component = "button",
    className,
    ...restProps
  } = props;

  const isToggleable =
    pressedProp !== undefined ||
    defaultPressed !== undefined ||
    onPressedChange !== undefined ||
    pressedIcon !== undefined;
  const [isPressed, setIsPressed] = useControllable({
    value: pressedProp,
    defaultValue: defaultPressed ?? false,
    onChange: onPressedChange,
  });

  const isDisabled = disabled || loading;
  const showPressed = isToggleable && isPressed;

  const { onClick, ...nativeProps } = restProps as typeof restProps & {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // A non-button element (`as="a"`) has no native `disabled`, so block the press here
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    if (isToggleable && !isDisabled) {
      setIsPressed(!isPressed);
    }
    onClick?.(e);
  };

  return (
    <Component
      ref={ref as Ref<never>}
      disabled={Component === "button" ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      aria-pressed={isToggleable ? isPressed : undefined}
      aria-busy={loading || undefined}
      title={tooltip}
      data-v-size={size}
      data-v-variant={variant}
      data-v-color={color}
      onClick={handleClick}
      className={cn(
        "v-icon-button",
        "inline-flex items-center justify-center rounded-full transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)] focus-visible:ring-offset-2",
        "active:scale-[0.95] active:opacity-60",
        sizeStyles[size],
        showPressed
          ? pressedVariantColorStyles[variant]?.[color]
          : variantColorStyles[variant]?.[color],
        isDisabled && "pointer-events-none opacity-50",
        override?.styles?.root,
        className,
      )}
      {...nativeProps}
    >
      {loading ? <Spinner /> : showPressed && pressedIcon ? pressedIcon : children}
    </Component>
  );
});

VIconButton.displayName = "VIconButton";

export { VIconButton };
