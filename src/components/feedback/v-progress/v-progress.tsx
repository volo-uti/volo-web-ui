import { forwardRef } from "react";
import { cn } from "../../../lib";
import type { VSize } from "../../../lib";
import { devWarning } from "../../../utils/dev-warning";
import { useComponentOverride } from "../../../hooks/use-component-override";
import type { VProgressColor, VProgressProps, VProgressVariant } from "./v-progress.types";

// ─────────────────────────────────────────
// Color mapping
// ─────────────────────────────────────────

const colorStyles: Record<VProgressColor, string> = {
  tertiary: "bg-[var(--v-tertiary)]",
  primary: "bg-[var(--v-primary)]",
  secondary: "bg-[var(--v-secondary)]",
  destructive: "bg-[var(--v-destructive)]",
  success: "bg-[var(--v-success)]",
  warning: "bg-[var(--v-warning)]",
};

// ─────────────────────────────────────────
// Linear size
// ─────────────────────────────────────────

const linearSizeStyles: Record<VSize, string> = {
  xs: "h-0.5",
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
  xl: "h-4",
};

// ─────────────────────────────────────────
// Circular size
// ─────────────────────────────────────────

const circularSizes: Record<VSize, { size: number; strokeWidth: number }> = {
  xs: { size: 16, strokeWidth: 2 },
  sm: { size: 24, strokeWidth: 3 },
  md: { size: 40, strokeWidth: 4 },
  lg: { size: 56, strokeWidth: 5 },
  xl: { size: 72, strokeWidth: 6 },
};

const circularColorStyles: Record<VProgressColor, string> = {
  tertiary: "stroke-[var(--v-tertiary)]",
  primary: "stroke-[var(--v-primary)]",
  secondary: "stroke-[var(--v-secondary)]",
  destructive: "stroke-[var(--v-destructive)]",
  success: "stroke-[var(--v-success)]",
  warning: "stroke-[var(--v-warning)]",
};

/**
 * Linear or circular progress bar, determinate (0-100) or indeterminate.
 *
 * It has `role="progressbar"`.
 *
 * Give it an accessible name with `aria-label` or `aria-labelledby`.
 *
 * @example
 * <VProgress value={60} color="success" aria-label="Upload progress" />
 */
const VProgress = forwardRef<HTMLDivElement, VProgressProps>((props, ref) => {
  const override = useComponentOverride("VProgress");
  const {
    // 1. Identity
    variant = (override?.defaultProps?.variant as VProgressVariant | undefined) ?? "linear",
    // 2. Visual
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    color = (override?.defaultProps?.color as VProgressColor | undefined) ?? "primary",
    backgroundColor,
    // 3. Content
    value,
    // 8. State
    indeterminate = false,
    // 10. Advanced
    className,
    style,
    ...rest
  } = props;

  if (value !== undefined && (value < 0 || value > 100)) {
    devWarning("VProgress", "value must be between 0 and 100");
  }

  // NaN (from 0 / 0, for example) counts as 0; the clamp below handles infinities
  const numericValue = value === undefined || Number.isNaN(value) ? 0 : value;
  const clampedValue = indeterminate ? undefined : Math.min(100, Math.max(0, numericValue));

  if (variant === "circular") {
    const { size: svgSize, strokeWidth } = circularSizes[size];
    const radius = (svgSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset =
      clampedValue !== undefined
        ? circumference - (clampedValue / 100) * circumference
        : circumference * 0.75;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn("v-progress", "inline-flex", override?.styles?.root, className)}
        data-v-variant="circular"
        data-v-size={size}
        style={style}
        {...rest}
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className={cn(indeterminate && "animate-spin")}
          style={{ animationDuration: "1500ms" }}
        >
          {/* Track */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className={!backgroundColor ? "stroke-[var(--v-muted)]" : undefined}
            style={backgroundColor ? { stroke: backgroundColor } : undefined}
          />
          {/* Value */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={cn(
              circularColorStyles[color],
              "transition-[stroke-dashoffset]",
              override?.styles?.indicator,
            )}
            style={{
              transitionDuration: "var(--v-duration-normal, 300ms)",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />
        </svg>
      </div>
    );
  }

  // Linear variant
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "v-progress",
        "w-full overflow-hidden rounded-full",
        !backgroundColor && "bg-[var(--v-muted)]",
        linearSizeStyles[size],
        override?.styles?.root,
        className,
      )}
      data-v-variant="linear"
      data-v-size={size}
      style={backgroundColor ? { backgroundColor, ...style } : style}
      {...rest}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width]",
          colorStyles[color],
          indeterminate && "animate-[v-progress-indeterminate_1.5s_ease-in-out_infinite] w-1/2",
          override?.styles?.indicator,
        )}
        style={
          indeterminate
            ? undefined
            : {
                width: `${clampedValue}%`,
                transitionDuration: "var(--v-duration-normal, 300ms)",
              }
        }
      />
      {/* Indeterminate keyframes injected via inline style tag */}
      {indeterminate && (
        <style>{`
          @keyframes v-progress-indeterminate {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}</style>
      )}
    </div>
  );
});

VProgress.displayName = "VProgress";

export { VProgress };
