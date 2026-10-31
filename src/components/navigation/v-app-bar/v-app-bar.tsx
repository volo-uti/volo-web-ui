"use client";

import { forwardRef } from "react";
import { cn } from "../../../lib";
import type { VAppBarProps, VAppBarVariant } from "./v-app-bar.types";

const variantStyles: Record<VAppBarVariant, string> = {
  default: "bg-[var(--v-background)] text-[var(--v-foreground)]",
  transparent: "bg-transparent text-[var(--v-foreground)]",
  elevated: "bg-[var(--v-background)] text-[var(--v-foreground)] shadow-[var(--v-shadow-sm)]",
  centered: "bg-[var(--v-background)] text-[var(--v-foreground)]",
};

/**
 * Top bar with title, leading element and actions.
 *
 * @example
 * <VAppBar
 *   title="Orders"
 *   leading={<VIconButton aria-label="Back">←</VIconButton>}
 *   actions={<VButton variant="text">Export</VButton>}
 * />
 */
const VAppBar = forwardRef<HTMLElement, VAppBarProps>((props, ref) => {
  const {
    variant = "default",
    children,
    title,
    leading,
    actions,
    bottom,
    centerTitle,
    sticky = false,
    className,
    ...rest
  } = props;

  const isCentered = centerTitle ?? variant === "centered";

  const classes = cn(
    "v-app-bar",
    "flex flex-col w-full",
    variantStyles[variant],
    sticky && "sticky top-0 z-[var(--v-z-sticky)]",
    className,
  );

  return (
    <header ref={ref} className={classes} role="banner" data-v-variant={variant} {...rest}>
      <div className="flex items-center h-14 px-[var(--v-spacing-xs)]">
        {/* Leading */}
        {leading && <div className="flex items-center justify-center w-12 shrink-0">{leading}</div>}
        {!leading && <div className="w-[var(--v-spacing-lg)] shrink-0" />}

        {/* Title */}
        <div className={cn("flex-1 min-w-0", isCentered && "text-center")}>
          {typeof title === "string" ? (
            <h1 className="text-lg font-semibold text-[var(--v-foreground)] truncate">{title}</h1>
          ) : (
            title
          )}
        </div>

        {/* Actions */}
        {actions ? (
          <div className="flex items-center gap-[var(--v-spacing-xs)] shrink-0">{actions}</div>
        ) : (
          <div className="w-[var(--v-spacing-lg)] shrink-0" />
        )}
      </div>

      {/* Bottom widget (e.g. tabs) */}
      {bottom}

      {children}
    </header>
  );
});

VAppBar.displayName = "VAppBar";
export { VAppBar };
