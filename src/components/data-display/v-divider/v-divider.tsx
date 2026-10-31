import { forwardRef } from "react";
import { cn } from "../../../lib";
import type { VDividerProps } from "./v-divider.types";

/**
 * Separator line, solid or dashed, with an optional centre label.
 *
 * @example
 * <VDivider />
 * <VDivider orientation="vertical" />
 * <VDivider label="OR" />
 * <VDivider variant="dashed" />
 */
const VDivider = forwardRef<HTMLDivElement, VDividerProps>((props, ref) => {
  const {
    variant = "solid",
    color,
    bold = false,
    thickness: thicknessProp,
    label,
    orientation = "horizontal",
    indent = 0,
    endIndent = 0,
    className,
    style,
    ...rest
  } = props;

  const isHorizontal = orientation === "horizontal";
  const resolvedThickness = thicknessProp ?? (bold ? 2 : 1);
  const thicknessValue = `${resolvedThickness}px`;
  const borderStyle = variant === "dashed" ? "border-dashed" : "border-solid";
  const borderColor = color || undefined;

  if (label && isHorizontal) {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn("v-divider", "flex items-center gap-[var(--v-spacing-lg)]", className)}
        {...rest}
        style={{
          paddingLeft: indent > 0 ? `${indent}px` : undefined,
          paddingRight: endIndent > 0 ? `${endIndent}px` : undefined,
          ...style,
        }}
      >
        <div
          className={cn("flex-1 border-t", !color && "border-[var(--v-border)]", borderStyle)}
          style={{ borderTopWidth: thicknessValue, borderColor }}
        />
        <span className="text-[length:var(--v-size-sm-font-size)] text-[var(--v-muted-foreground)] shrink-0">
          {label}
        </span>
        <div
          className={cn("flex-1 border-t", !color && "border-[var(--v-border)]", borderStyle)}
          style={{ borderTopWidth: thicknessValue, borderColor }}
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      data-v-variant={variant}
      className={cn(
        "v-divider",
        isHorizontal
          ? cn("w-full border-t", !color && "border-[var(--v-border)]", borderStyle)
          : cn("self-stretch border-l", !color && "border-[var(--v-border)]", borderStyle),
        className,
      )}
      {...rest}
      style={{
        ...(isHorizontal
          ? {
              // A block with width: 100% ignores margin-right, so the indents are taken off the width
              width:
                indent > 0 || endIndent > 0
                  ? `calc(100% - ${Math.max(indent, 0) + Math.max(endIndent, 0)}px)`
                  : undefined,
              borderTopWidth: thicknessValue,
              borderColor,
              marginLeft: indent > 0 ? `${indent}px` : undefined,
              marginRight: endIndent > 0 ? `${endIndent}px` : undefined,
            }
          : {
              borderLeftWidth: thicknessValue,
              borderColor,
              marginTop: indent > 0 ? `${indent}px` : undefined,
              marginBottom: endIndent > 0 ? `${endIndent}px` : undefined,
            }),
        ...style,
      }}
    />
  );
});

VDivider.displayName = "VDivider";

export { VDivider };
