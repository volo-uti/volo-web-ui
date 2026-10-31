import { forwardRef } from "react";
import { cn } from "../../../lib";
import type { VSkeletonAnimation, VSkeletonProps, VSkeletonVariant } from "./v-skeleton.types";

const variantStyles: Record<VSkeletonVariant, string> = {
  text: "rounded-[var(--v-radius-sm)]",
  circular: "rounded-full",
  rectangular: "rounded-[var(--v-radius-sm)]",
};

const animationStyles: Record<Exclude<VSkeletonAnimation, false>, string> = {
  pulse: "animate-pulse",
  wave: "animate-[v-skeleton-wave_1.5s_ease-in-out_infinite] relative overflow-hidden",
};

/**
 * Grey placeholder block, line or circle shown in place of content while it loads.
 *
 * It is `aria-hidden`; announce the loading state elsewhere, for example with VLoadingSpinner or `aria-busy`.
 *
 * @example
 * <VSkeleton variant="circular" size={48} />
 * <VSkeleton variant="text" lines={3} />
 */
const VSkeleton = forwardRef<HTMLDivElement, VSkeletonProps>((props, ref) => {
  const {
    // 1. Identity
    variant = "text",
    // 2. Visual
    size = 40,
    width,
    height,
    borderRadius: borderRadiusProp,
    // 3. Content
    lines = 1,
    spacing = 8,
    // 8. State
    animation = "pulse",
    // 10. Advanced
    className,
    style,
    ...rest
  } = props;

  const defaultWidth = variant === "circular" ? size : "100%";
  const defaultHeight = variant === "text" ? "1em" : variant === "circular" ? size : 120;

  const resolvedWidth = width ?? defaultWidth;
  const resolvedHeight = height ?? defaultHeight;

  const baseClasses = cn(
    "v-skeleton",
    "bg-[var(--v-muted)]",
    !borderRadiusProp && variantStyles[variant],
    animation !== false && animationStyles[animation],
  );

  const resolveSize = (val: string | number) => (typeof val === "number" ? `${val}px` : val);

  // Text variant with multiple lines
  if (variant === "text" && lines > 1) {
    const lineElements = Array.from({ length: lines }, (_, i) => {
      const isLast = i === lines - 1;
      const lineWidth = isLast
        ? typeof resolvedWidth === "number"
          ? `${resolvedWidth * 0.75}px`
          : `calc(${resolvedWidth} * 0.75)`
        : resolveSize(resolvedWidth);

      return (
        <div
          key={i}
          className={cn(baseClasses, className)}
          style={{
            width: lineWidth,
            height: resolveSize(resolvedHeight),
            marginBottom: isLast ? undefined : `${spacing}px`,
            borderRadius: borderRadiusProp ? resolveSize(borderRadiusProp) : undefined,
          }}
          aria-hidden="true"
        />
      );
    });

    return (
      <div ref={ref} style={style} {...rest}>
        {lineElements}
        {animation === "wave" && (
          <style>{`
            @keyframes v-skeleton-wave {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
            .animate-\\[v-skeleton-wave_1\\.5s_ease-in-out_infinite\\] {
              background-image: linear-gradient(
                90deg,
                transparent 0%,
                oklch(1 0 0 / 0.15) 50%,
                transparent 100%
              );
              background-size: 200% 100%;
            }
          `}</style>
        )}
      </div>
    );
  }

  return (
    <>
      <div
        ref={ref}
        className={cn(baseClasses, className)}
        style={{
          width: resolveSize(resolvedWidth),
          height: resolveSize(resolvedHeight),
          borderRadius: borderRadiusProp ? resolveSize(borderRadiusProp) : undefined,
          ...style,
        }}
        aria-hidden="true"
        data-v-variant={variant}
        {...rest}
      />
      {animation === "wave" && (
        <style>{`
          @keyframes v-skeleton-wave {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .animate-\\[v-skeleton-wave_1\\.5s_ease-in-out_infinite\\] {
            background-image: linear-gradient(
              90deg,
              transparent 0%,
              oklch(1 0 0 / 0.15) 50%,
              transparent 100%
            );
            background-size: 200% 100%;
          }
        `}</style>
      )}
    </>
  );
});

VSkeleton.displayName = "VSkeleton";

export { VSkeleton };
