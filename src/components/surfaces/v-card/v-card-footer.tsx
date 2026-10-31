import { forwardRef } from "react";
import { cn } from "../../../lib";
import type { VCardFooterAlignment, VCardFooterProps } from "./v-card-footer.types";

const alignmentStyles: Record<VCardFooterAlignment, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

/**
 * Footer row of a VCard that lays out its actions and aligns them with `alignment`.
 *
 * @example
 * <VCard>
 *   <VCardHeader title="Title" />
 *   <p>Content</p>
 *   <VCardFooter alignment="end">
 *     <VButton variant="text">Cancel</VButton>
 *     <VButton>Confirm</VButton>
 *   </VCardFooter>
 * </VCard>
 */
const VCardFooter = forwardRef<HTMLDivElement, VCardFooterProps>((props, ref) => {
  const {
    // 3. Content
    children,
    // 5. Layout
    alignment = "end",
    // 8. Advanced
    className,
    ...rest
  } = props;

  return (
    <div
      ref={ref}
      className={cn(
        "v-card-footer",
        "flex items-center gap-[var(--v-spacing-sm)] pt-[var(--v-spacing-sm)]",
        alignmentStyles[alignment],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

VCardFooter.displayName = "VCardFooter";

export { VCardFooter };
