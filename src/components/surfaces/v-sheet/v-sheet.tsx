import { forwardRef, type ElementType, type Ref } from "react";
import { cn } from "../../../lib";
import type { VSheetOwnProps, VSheetVariant } from "./v-sheet.types";

const variantStyles: Record<VSheetVariant, string> = {
  filled: [
    "bg-[var(--v-background)]",
    "text-[var(--v-foreground)]",
    "rounded-[var(--v-radius-md)]",
  ].join(" "),
  outlined: [
    "bg-[var(--v-background)]",
    "text-[var(--v-foreground)]",
    "border",
    "border-[var(--v-border)]",
    "rounded-[var(--v-radius-md)]",
  ].join(" "),
};

/**
 * Plain themed surface for grouping content; lighter than VCard.
 *
 * `as` renders another element.
 *
 * It has no open state or dismissal; use VDialog or VDrawer for overlays.
 *
 * @example
 * <VSheet variant="outlined" as="section" aria-label="Summary">
 *   <p>Content inside a sheet</p>
 * </VSheet>
 */
const VSheet = forwardRef<HTMLDivElement, VSheetOwnProps & { as?: ElementType }>((props, ref) => {
  const {
    // 1. Identity
    variant = "filled",
    // 3. Content
    children,
    // 8. Advanced
    className,
    as: Component = "div",
    ...rest
  } = props;

  const classes = cn("v-sheet", variantStyles[variant], className);

  return (
    <Component ref={ref as Ref<never>} className={classes} data-v-variant={variant} {...rest}>
      {children}
    </Component>
  );
});

VSheet.displayName = "VSheet";

export { VSheet };
