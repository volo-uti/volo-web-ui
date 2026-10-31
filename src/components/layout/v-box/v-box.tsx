"use client";

import { forwardRef, useMemo, type CSSProperties } from "react";
import { cn } from "../../../lib";
import type { VBoxProps, VBoxVariant } from "./v-box.types";

const variantStyles: Record<VBoxVariant, string> = {
  default: "",
  card: "bg-[var(--v-card)] border border-[var(--v-border)] rounded-[var(--v-radius-card)]",
  outlined: "border border-[var(--v-border)] rounded-[var(--v-radius-card)]",
  elevated: "bg-[var(--v-card)] shadow-[var(--v-shadow-md)] rounded-[var(--v-radius-card)]",
};

const roundedMap: Record<string, string> = {
  sm: "rounded-[var(--v-radius-sm)]",
  md: "rounded-[var(--v-radius-md)]",
  lg: "rounded-[var(--v-radius-lg)]",
};

/**
 * Plain container with optional card, outlined or elevated surface.
 *
 * @example
 * <VBox variant="card" padding={16} rounded="lg">
 *   <VStack spacing="sm">Content</VStack>
 * </VBox>
 */
const VBox = forwardRef<HTMLDivElement, VBoxProps>((props, ref) => {
  const {
    // 1. Identity
    variant = "default",
    // 3. Content
    children,
    // 5. Layout
    padding,
    margin: marginProp,
    bordered = false,
    rounded = false,
    width,
    height,
    // 8. Advanced
    className,
    style: styleProp,
    ...rest
  } = props;

  const inlineStyle = useMemo<CSSProperties>(() => {
    const s: CSSProperties = { ...styleProp };
    if (padding !== undefined) s.padding = typeof padding === "number" ? `${padding}px` : padding;
    if (marginProp !== undefined)
      s.margin = typeof marginProp === "number" ? `${marginProp}px` : marginProp;
    if (width !== undefined) s.width = typeof width === "number" ? `${width}px` : width;
    if (height !== undefined) s.height = typeof height === "number" ? `${height}px` : height;
    return s;
  }, [padding, marginProp, width, height, styleProp]);

  const roundedClass =
    rounded === true
      ? "rounded-[var(--v-radius-md)]"
      : typeof rounded === "string"
        ? roundedMap[rounded]
        : "";

  const classes = cn(
    "v-box",
    variantStyles[variant],
    bordered && variant === "default" && "border border-[var(--v-border)]",
    roundedClass,
    className,
  );

  return (
    <div ref={ref} className={classes} style={inlineStyle} data-v-variant={variant} {...rest}>
      {children}
    </div>
  );
});

VBox.displayName = "VBox";
export { VBox };
