import { forwardRef } from "react";
import { cn } from "../../../lib";
import type { VCardHeaderProps } from "./v-card-header.types";

/**
 * Header row of a VCard with a title, a description and a right-aligned action slot.
 *
 * @example
 * <VCardHeader title="Card Title" description="Description" action={<VIconButton aria-label="More"><MoreIcon /></VIconButton>} />
 */
const VCardHeader = forwardRef<HTMLDivElement, VCardHeaderProps>((props, ref) => {
  const {
    // 3. Content
    title,
    description,
    // 4. Decorations
    action,
    // 8. Advanced
    className,
    ...rest
  } = props;

  return (
    <div
      ref={ref}
      className={cn("v-card-header", "flex items-start gap-[var(--v-spacing-md)]", className)}
      {...rest}
    >
      <div className="flex flex-col gap-[var(--v-spacing-xxs)] flex-1">
        {title && (
          <div className="text-[length:var(--v-size-md-font-size)] font-[var(--v-font-weight-semibold)] text-[var(--v-foreground)]">
            {title}
          </div>
        )}
        {description && (
          <div className="text-[length:var(--v-size-sm-font-size)] text-[var(--v-muted-foreground)]">
            {description}
          </div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
});

VCardHeader.displayName = "VCardHeader";

export { VCardHeader };
