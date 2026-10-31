"use client";

import { forwardRef, useCallback } from "react";
import { cn } from "../../../lib";
import { useControllable } from "../../../hooks/use-controllable";
import type { VSectionProps, VSectionVariant } from "./v-section.types";

const variantStyles: Record<VSectionVariant, string> = {
  default: "px-[var(--v-spacing-lg)]",
  card: "bg-[var(--v-card)] p-[var(--v-spacing-lg)] rounded-[var(--v-radius-card)]",
  inset: "px-[var(--v-spacing-lg)]",
};

const spacingMap: Record<string, string> = {
  sm: "gap-[var(--v-spacing-sm)]",
  md: "gap-[var(--v-spacing-md)]",
  lg: "gap-[var(--v-spacing-lg)]",
};

/**
 * Titled content section that can collapse.
 *
 * @example
 * <VSection title="Account" description="Manage your profile" collapsible>
 *   <VListTile title="Email" />
 * </VSection>
 */
const VSection = forwardRef<HTMLDivElement, VSectionProps>((props, ref) => {
  const {
    // 1. Identity
    variant = "default",
    // 3. Content
    children,
    title,
    description,
    footer,
    // 5. Layout
    divider = false,
    spacing = "md",
    collapsible = false,
    // 6. State
    open: openProp,
    defaultOpen = true,
    onOpenChange,
    // 8. Advanced
    className,
    ...rest
  } = props;

  const [open, setOpen] = useControllable<boolean>({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const collapsed = collapsible && !open;

  const toggleCollapsed = useCallback(() => {
    if (collapsible) setOpen(!open);
  }, [collapsible, open, setOpen]);

  const classes = cn(
    "v-section",
    "flex flex-col",
    variantStyles[variant],
    spacingMap[spacing],
    className,
  );

  return (
    <section ref={ref} className={classes} data-v-variant={variant} {...rest}>
      {/* Header */}
      {(title || description) && (
        <div
          className={cn(
            "flex flex-col",
            variant === "inset" && "px-[var(--v-spacing-lg)]",
            collapsible && "cursor-pointer select-none",
          )}
          onClick={toggleCollapsed}
          onKeyDown={
            collapsible
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCollapsed();
                  }
                }
              : undefined
          }
          role={collapsible ? "button" : undefined}
          tabIndex={collapsible ? 0 : undefined}
          aria-expanded={collapsible ? open : undefined}
        >
          {typeof title === "string" ? (
            <h3 className="text-sm font-medium text-[var(--v-foreground)]">{title}</h3>
          ) : (
            title
          )}
          {description && (
            <div className="text-sm text-[var(--v-muted-foreground)] mt-[var(--v-spacing-xxs)]">
              {description}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      {!collapsed && (
        <div
          className={cn(
            "flex flex-col",
            variant === "inset" && "px-[var(--v-spacing-lg)]",
            divider && "divide-y divide-[var(--v-border)]",
          )}
        >
          {children}
        </div>
      )}

      {/* Footer */}
      {footer && !collapsed && (
        <div className="text-sm text-[var(--v-muted-foreground)]">
          {typeof footer === "string" ? <p>{footer}</p> : footer}
        </div>
      )}
    </section>
  );
});

VSection.displayName = "VSection";
export { VSection };
