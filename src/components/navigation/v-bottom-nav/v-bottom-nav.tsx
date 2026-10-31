"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "../../../lib";
import { useControllable } from "../../../hooks/use-controllable";
import { useLocaleText } from "../../../hooks/use-locale";
import type { VBottomNavProps } from "./v-bottom-nav.types";

/** A badge shows unless it is empty: `0`, `""`, `false`, `null` and `undefined` render nothing. */
const hasBadge = (badge: ReactNode): boolean =>
  badge !== undefined && badge !== null && badge !== false && badge !== 0 && badge !== "";

/**
 * Bottom bar for switching between three to five primary destinations.
 *
 * @example
 * <VBottomNav
 *   items={[
 *     { value: 'home', label: 'Home', icon: '🏠' },
 *     { value: 'chat', label: 'Chat', icon: '💬', badge: 3 },
 *   ]}
 *   defaultValue="home"
 *   onValueChange={(value) => navigate(value)}
 * />
 */
const VBottomNav = forwardRef<HTMLElement, VBottomNavProps>((props, ref) => {
  const {
    variant = "default",
    children,
    items = [],
    showLabels = true,
    value: valueProp,
    defaultValue = "",
    onValueChange,
    className,
    ...rest
  } = props;

  const localeText = useLocaleText();
  const [value, setValue] = useControllable({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

  const classes = cn(
    "v-bottom-nav",
    "flex items-center justify-around",
    "h-20 w-full",
    "bg-[var(--v-background)]",
    "shadow-[var(--v-shadow-sm)]",
    className,
  );

  return (
    <nav
      ref={ref}
      className={classes}
      role="tablist"
      aria-label={localeText.bottomNavLabel}
      data-v-variant={variant}
      {...rest}
    >
      {items.map((item) => {
        const isSelected = item.value === value;
        const shouldShowLabel = variant === "labeled" || showLabels || isSelected;

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-label={item.label}
            disabled={item.disabled}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full",
              "cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed",
              `duration-[var(--v-duration-normal)]`,
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)]",
              isSelected ? "text-[var(--v-primary)]" : "text-[var(--v-muted-foreground)]",
            )}
            onClick={() => setValue(item.value)}
          >
            <div className="relative">
              <span
                className={cn(
                  "transition-transform",
                  `duration-[var(--v-duration-normal)]`,
                  isSelected && variant === "shifting" && "scale-125",
                )}
              >
                {isSelected && item.activeIcon ? item.activeIcon : item.icon}
              </span>
              {hasBadge(item.badge) && (
                <span className="absolute -top-1 -right-2">{item.badge}</span>
              )}
            </div>
            {shouldShowLabel && (
              <span
                className={cn(
                  "text-xs mt-[var(--v-spacing-xs)] truncate max-w-full",
                  isSelected && "font-semibold",
                )}
              >
                {item.label}
              </span>
            )}
          </button>
        );
      })}
      {children}
    </nav>
  );
});

VBottomNav.displayName = "VBottomNav";
export { VBottomNav };
