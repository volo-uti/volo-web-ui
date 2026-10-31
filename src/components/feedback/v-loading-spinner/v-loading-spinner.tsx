"use client";

import { forwardRef } from "react";
import { cn } from "../../../lib";
import type { VSize } from "../../../lib";
import { useLocaleText } from "../../../hooks/use-locale";
import type { VLoadingSpinnerProps } from "./v-loading-spinner.types";

const sizePx: Record<VSize, number> = { xs: 16, sm: 20, md: 24, lg: 32, xl: 40 };

/**
 * Circular arc spinner for an unknown wait; `role="status"` with a localized label.
 *
 * Animated with CSS only. Pass `color="currentColor"` to follow the surrounding text colour.
 *
 * @example
 * <VLoadingSpinner size="lg" color="var(--v-success)" />
 */
const VLoadingSpinner = forwardRef<HTMLDivElement, VLoadingSpinnerProps>((props, ref) => {
  const {
    // 2. Visual
    size: sizeProp = "md",
    color = "var(--v-primary)",
    strokeWidth: strokeWidthProp,
    // 10. Advanced
    className,
    ...rest
  } = props;

  const localeText = useLocaleText();
  const size = typeof sizeProp === "number" ? sizeProp : sizePx[sizeProp];
  const sw = strokeWidthProp ?? Math.max(2, size / 12);
  const radius = (size - sw) / 2;
  const circumference = 2 * Math.PI * radius;
  // Active arc: 120 degrees (1/3 of circle)
  const arcLength = circumference / 3;
  const dashOffset = circumference - arcLength;

  return (
    <div
      ref={ref}
      role="status"
      aria-label={localeText.loading}
      className={cn("v-loading-spinner", "inline-flex", className)}
      {...rest}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="animate-spin"
        style={{ animationDuration: "var(--v-duration-very-slow)" }}
      >
        {/* Background track (30% opacity) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={sw}
          strokeLinecap="round"
          style={{ stroke: color, opacity: 0.3 }}
        />
        {/* Active arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            stroke: color,
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
    </div>
  );
});

VLoadingSpinner.displayName = "VLoadingSpinner";

export { VLoadingSpinner };
