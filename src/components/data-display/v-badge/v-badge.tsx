"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "../../../lib";
import type { VBadgeProps, VBadgeVariant } from "./v-badge.types";

const variantStyles: Record<VBadgeVariant, string> = {
  muted: "bg-[var(--v-muted)] text-[var(--v-muted-foreground)]",
  primary: "bg-[var(--v-primary)] text-[var(--v-primary-foreground)]",
  secondary: "bg-[var(--v-secondary)] text-[var(--v-secondary-foreground)]",
  success: "bg-[var(--v-success)] text-[var(--v-success-foreground)]",
  warning: "bg-[var(--v-warning)] text-[var(--v-warning-foreground)]",
  destructive: "bg-[var(--v-destructive)] text-[var(--v-destructive-foreground)]",
  outline: "bg-transparent text-[var(--v-foreground)] border border-[var(--v-border)]",
};

const sizeStyles: Record<NonNullable<VBadgeProps["size"]>, string> = {
  sm: "min-w-[18px] h-[18px] px-[var(--v-spacing-xs)] text-[length:var(--v-size-xs-font-size)]",
  md: "min-w-[22px] h-[22px] px-[var(--v-spacing-sm)] text-[length:var(--v-size-sm-font-size)]",
  lg: "min-w-[26px] h-[26px] px-[var(--v-spacing-sm)] text-[length:var(--v-size-md-font-size)]",
};

/**
 * Count or label badge pinned to the corner of its child; counts above `max` show as "99+".
 *
 * @example
 * <VBadge content={5} variant="destructive">
 *   <MailIcon />
 * </VBadge>
 */
const VBadge = forwardRef<HTMLDivElement, VBadgeProps>((props, ref) => {
  const {
    variant = "muted",
    size = "md",
    children,
    content,
    max = 99,
    invisible = false,
    className,
    ...rest
  } = props;

  // A non-finite count has nothing to show; the cap is at least 1 so "0+" never appears
  const limit = Math.max(1, Math.floor(max));
  const displayContent =
    typeof content === "number"
      ? !Number.isFinite(content)
        ? null
        : content > limit
          ? `${limit}+`
          : content
      : content;

  // Bounce animation on content change
  const [bouncing, setBouncing] = useState(false);
  const prevContentRef = useRef(content);

  useEffect(() => {
    if (prevContentRef.current !== content) {
      prevContentRef.current = content;
      setBouncing(true);
      const timer = setTimeout(() => setBouncing(false), 200);
      return () => clearTimeout(timer);
    }
  }, [content]);

  const badgeClasses = cn(
    "absolute -top-1 -right-1 flex items-center justify-center",
    "font-[var(--v-font-weight-medium)]",
    "rounded-full leading-none",
    "transition-transform duration-[var(--v-duration-fast)] ease-out",
    variantStyles[variant],
    sizeStyles[size],
    invisible && "scale-0",
    bouncing && "animate-[v-badge-bounce_var(--v-duration-fast)_ease-out]",
  );

  return (
    <div
      ref={ref}
      className={cn("v-badge", "relative inline-flex", className)}
      data-v-variant={variant}
      data-v-size={size}
      {...rest}
    >
      {children}
      <span className={badgeClasses} aria-hidden={invisible}>
        {displayContent}
      </span>
    </div>
  );
});

VBadge.displayName = "VBadge";

export { VBadge };
