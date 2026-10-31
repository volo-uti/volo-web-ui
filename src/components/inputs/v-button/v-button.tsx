"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type MouseEvent,
  type PointerEvent,
  type Ref,
} from "react";
import { cn } from "../../../lib";
import type { VColor, VSize } from "../../../lib";
import { useComponentOverride } from "../../../hooks";
import type {
  VButtonOwnProps,
  VButtonVariant,
  VButtonCorner,
  VButtonAlign,
} from "./v-button.types";

// ─────────────────────────────────────────
// Size styles — CSS Variables reference
// ─────────────────────────────────────────

const sizeStyles: Record<VSize, string> = {
  xs: "h-[var(--v-size-xs-height)] px-[var(--v-size-xs-padding-x)] py-[var(--v-size-xs-padding-y)] text-[length:var(--v-size-xs-font-size)] gap-[var(--v-size-xs-gap)] rounded-[var(--v-size-xs-radius)]",
  sm: "h-[var(--v-size-sm-height)] px-[var(--v-size-sm-padding-x)] py-[var(--v-size-sm-padding-y)] text-[length:var(--v-size-sm-font-size)] gap-[var(--v-size-sm-gap)] rounded-[var(--v-size-sm-radius)]",
  md: "h-[var(--v-size-md-height)] px-[var(--v-size-md-padding-x)] py-[var(--v-size-md-padding-y)] text-[length:var(--v-size-md-font-size)] gap-[var(--v-size-md-gap)] rounded-[var(--v-size-md-radius)]",
  lg: "h-[var(--v-size-lg-height)] px-[var(--v-size-lg-padding-x)] py-[var(--v-size-lg-padding-y)] text-[length:var(--v-size-lg-font-size)] gap-[var(--v-size-lg-gap)] rounded-[var(--v-size-lg-radius)]",
  xl: "h-[var(--v-size-xl-height)] px-[var(--v-size-xl-padding-x)] py-[var(--v-size-xl-padding-y)] text-[length:var(--v-size-xl-font-size)] gap-[var(--v-size-xl-gap)] rounded-[var(--v-size-xl-radius)]",
};

// ─────────────────────────────────────────
// Variant × Color styles
// ─────────────────────────────────────────

const variantColorStyles: Record<VButtonVariant, Record<VColor, string>> = {
  filled: {
    primary:
      "bg-[var(--v-primary)] text-[var(--v-primary-foreground)] hover:scale-[1.02] active:opacity-80",
    secondary:
      "bg-[var(--v-secondary)] text-[var(--v-secondary-foreground)] hover:scale-[1.02] active:opacity-80",
    tertiary:
      "bg-[var(--v-accent)] text-[var(--v-accent-foreground)] hover:scale-[1.02] active:opacity-80",
    destructive:
      "bg-[var(--v-destructive)] text-[var(--v-destructive-foreground)] hover:scale-[1.02] active:opacity-80",
  },
  outlined: {
    primary:
      "border border-[var(--v-primary)] text-[var(--v-primary)] bg-transparent hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80",
    secondary:
      "border border-[var(--v-border)] text-[var(--v-secondary-foreground)] bg-transparent hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80",
    tertiary:
      "border border-[var(--v-accent)] text-[var(--v-accent-foreground)] bg-transparent hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80",
    destructive:
      "border border-[var(--v-destructive)] text-[var(--v-destructive)] bg-transparent hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80",
  },
  text: {
    primary:
      "text-[var(--v-primary)] bg-transparent hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80",
    secondary:
      "text-[var(--v-secondary-foreground)] bg-transparent hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80",
    tertiary:
      "text-[var(--v-accent-foreground)] bg-transparent hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80",
    destructive:
      "text-[var(--v-destructive)] bg-transparent hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80",
  },
  ghost: {
    primary:
      "text-[var(--v-primary)] bg-transparent hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80",
    secondary:
      "text-[var(--v-secondary-foreground)] bg-transparent hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80",
    tertiary:
      "text-[var(--v-accent-foreground)] bg-transparent hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80",
    destructive:
      "text-[var(--v-destructive)] bg-transparent hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80",
  },
  icon: {
    primary:
      "text-[var(--v-primary)] bg-transparent hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80 !aspect-square !px-0",
    secondary:
      "text-[var(--v-secondary-foreground)] bg-transparent hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80 !aspect-square !px-0",
    tertiary:
      "text-[var(--v-accent-foreground)] bg-transparent hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80 !aspect-square !px-0",
    destructive:
      "text-[var(--v-destructive)] bg-transparent hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80 !aspect-square !px-0",
  },
  link: {
    primary:
      "text-[var(--v-primary)] bg-transparent underline underline-offset-4 hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80",
    secondary:
      "text-[var(--v-secondary-foreground)] bg-transparent underline underline-offset-4 hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80",
    tertiary:
      "text-[var(--v-accent-foreground)] bg-transparent underline underline-offset-4 hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80",
    destructive:
      "text-[var(--v-destructive)] bg-transparent underline underline-offset-4 hover:bg-[var(--v-accent)] hover:scale-[1.02] active:opacity-80",
  },
};

// ─────────────────────────────────────────
// Corner styles
// ─────────────────────────────────────────

const cornerStyles: Record<VButtonCorner, string> = {
  square: "!rounded-none",
  rounded: "", // default from size tokens
  pill: "!rounded-full",
  circle: "!rounded-full !aspect-square !px-0",
};

// ─────────────────────────────────────────
// Align styles
// ─────────────────────────────────────────

const alignStyles: Record<VButtonAlign, string> = {
  left: "!justify-start",
  center: "", // default
  right: "!justify-end",
};

// ─────────────────────────────────────────
// Spinner
// ─────────────────────────────────────────

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
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
// VButton
// ─────────────────────────────────────────

/**
 * Text button with variants, loading state and leading/trailing slots.
 *
 * `as` renders another element.
 *
 * @example
 * <VButton variant="filled" leading={<PlusIcon />} onClick={add}>Add item</VButton>
 * <VButton as="a" href="/path" variant="link">Go</VButton>
 */
const VButton = forwardRef<
  HTMLButtonElement,
  VButtonOwnProps &
    Omit<ComponentPropsWithoutRef<"button">, keyof VButtonOwnProps> & { as?: ElementType }
>((props, ref) => {
  const override = useComponentOverride("VButton");

  const {
    // 1. Identity
    variant = (override?.defaultProps?.variant as VButtonVariant | undefined) ?? "filled",
    // 2. Visual
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    color = (override?.defaultProps?.color as VColor | undefined) ?? "primary",
    corner = "rounded",
    // 3. Content
    children,
    // 4. Decorations
    leading,
    trailing,
    leadingGap,
    trailingGap,
    loadingIndicator,
    // 5. Header/Meta
    tooltip,
    // 7. Layout
    fullWidth = false,
    align = "center",
    // 8. State
    disabled = false,
    loading = false,
    loadingPosition = "center",
    // 9. Callbacks
    onLongPress,
    // 10. Advanced
    as: Component = "button",
    className,
    onClick,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
    onPointerCancel,
    ...restProps
  } = props;

  // A custom gap cancels the size's gap token (negative margin) and adds its own.
  const gapStyle = (gap: number | undefined, side: "Start" | "End") =>
    gap === undefined
      ? undefined
      : {
          [`margin${side === "Start" ? "InlineEnd" : "InlineStart"}`]: `calc(${gap}px - var(--v-size-${size}-gap))`,
        };
  const spinner = loadingIndicator ?? <Spinner />;

  const isDisabled = disabled || loading;
  const showCenterLoading = loading && loadingPosition === "center";

  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressedRef = useRef(false);
  const onLongPressRef = useRef(onLongPress);
  useEffect(() => {
    onLongPressRef.current = onLongPress;
  });

  const clearLongPress = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  // A pending long press must not fire after the button is gone
  useEffect(() => clearLongPress, [clearLongPress]);

  const handlePointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    onPointerDown?.(e);
    if (e.defaultPrevented || !onLongPress || isDisabled) return;
    clearLongPress();
    longPressedRef.current = false;
    longPressTimerRef.current = setTimeout(() => {
      longPressTimerRef.current = null;
      longPressedRef.current = true;
      onLongPressRef.current?.();
    }, 500);
  };
  const handlePointerUp = (e: PointerEvent<HTMLButtonElement>) => {
    onPointerUp?.(e);
    clearLongPress();
  };
  const handlePointerLeave = (e: PointerEvent<HTMLButtonElement>) => {
    onPointerLeave?.(e);
    clearLongPress();
  };
  const handlePointerCancel = (e: PointerEvent<HTMLButtonElement>) => {
    onPointerCancel?.(e);
    clearLongPress();
  };
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // The click that ends a long press is not a press of its own
    if (longPressedRef.current) {
      longPressedRef.current = false;
      e.preventDefault();
      return;
    }
    // A non-button element has no native `disabled`, so block the press here
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <Component
      ref={ref as Ref<never>}
      disabled={Component === "button" ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      title={tooltip}
      data-v-size={size}
      data-v-variant={variant}
      data-v-color={color}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerCancel}
      onClick={handleClick}
      className={cn(
        // base
        "inline-flex items-center justify-center font-(--v-font-weight-medium) whitespace-nowrap transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--v-ring) focus-visible:ring-offset-2",
        "active:scale-[0.98]",
        // size
        sizeStyles[size],
        // corner
        corner !== "rounded" && cornerStyles[corner],
        // align
        align !== "center" && alignStyles[align],
        // variant x color
        variantColorStyles[variant]?.[color],
        // states
        isDisabled && "pointer-events-none opacity-50",
        fullWidth && "w-full",
        // Level 3 theme override
        override?.styles?.root,
        // Level 2 user className
        className,
      )}
      {...restProps}
    >
      {showCenterLoading ? (
        <>
          {spinner}
          {/* The label stays in the accessibility tree so the button keeps its name */}
          {children !== undefined && children !== null && (
            <span className="sr-only">{children}</span>
          )}
        </>
      ) : (
        <>
          {loading && loadingPosition === "start" && spinner}
          {!loading && leading !== undefined && leading !== null && (
            <span className="inline-flex" style={gapStyle(leadingGap, "Start")}>
              {leading}
            </span>
          )}
          {children}
          {!loading && trailing !== undefined && trailing !== null && (
            <span className="inline-flex" style={gapStyle(trailingGap, "End")}>
              {trailing}
            </span>
          )}
          {loading && loadingPosition === "end" && spinner}
        </>
      )}
    </Component>
  );
});

VButton.displayName = "VButton";

export { VButton };
