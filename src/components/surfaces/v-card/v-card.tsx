import { forwardRef, type ElementType, type KeyboardEvent, type Ref } from "react";
import { cn } from "../../../lib";
import type { VCardOwnProps, VCardVariant } from "./v-card.types";

const variantStyles: Record<VCardVariant, string> = {
  elevated: [
    "bg-[var(--v-card)]",
    "text-[var(--v-card-foreground)]",
    "shadow-[var(--v-shadow-sm)]",
    "rounded-[var(--v-radius-card)]",
  ].join(" "),
  outlined: [
    "bg-transparent",
    "text-[var(--v-card-foreground)]",
    "border",
    "border-[var(--v-border)]",
    "rounded-[var(--v-radius-card)]",
  ].join(" "),
  filled: [
    "bg-[var(--v-muted)]",
    "text-[var(--v-card-foreground)]",
    "rounded-[var(--v-radius-card)]",
  ].join(" "),
};

/**
 * Container that groups related content; becomes a pressable button with `interactive`.
 *
 * Compose it with VCardHeader and VCardFooter.
 *
 * @example
 * <VCard variant="outlined" interactive onClick={() => openDetails()}>
 *   <VCardHeader title="Plan" description="Pro, billed yearly" />
 * </VCard>
 */
const VCard = forwardRef<HTMLDivElement, VCardOwnProps & { as?: ElementType }>((props, ref) => {
  const {
    // 1. Identity
    variant = "elevated",
    // 3. Content
    children,
    // 6. State
    interactive = false,
    // 7. Callbacks
    onClick,
    onKeyDown,
    // 8. Advanced
    className,
    as: Component = "div",
    ...rest
  } = props;

  const classes = cn(
    "v-card",
    "p-[var(--v-spacing-lg)]",
    variantStyles[variant],
    interactive &&
      "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)] focus-visible:ring-offset-2 hover:shadow-lg active:bg-[var(--v-accent)]/50 transition-all duration-[var(--v-duration-fast)]",
    className,
  );

  return (
    <Component
      ref={ref as Ref<never>}
      className={classes}
      data-v-variant={variant}
      {...(interactive ? { role: "button", tabIndex: 0 } : { role: "article" })}
      {...rest}
      onClick={onClick}
      onKeyDown={(e: KeyboardEvent<HTMLElement>) => {
        onKeyDown?.(e);
        if (
          interactive &&
          !e.defaultPrevented &&
          e.target === e.currentTarget &&
          (e.key === "Enter" || e.key === " ")
        ) {
          e.preventDefault();
          e.currentTarget.click();
        }
      }}
    >
      {children}
    </Component>
  );
});

VCard.displayName = "VCard";

export { VCard };
