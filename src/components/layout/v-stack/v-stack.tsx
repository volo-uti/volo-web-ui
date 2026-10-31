"use client";

import { forwardRef, useMemo, type CSSProperties } from "react";
import { cn } from "../../../lib";
import { resolveSpace } from "../resolve-space";
import type { VStackProps } from "./v-stack.types";

const alignMap: Record<string, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyMap: Record<string, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

/**
 * Row or column of children with spacing.
 *
 * @example
 * <VStack direction="horizontal" spacing="md" align="center">
 *   <VAvatar fallback="A" />
 *   <VBadge count={3}>Inbox</VBadge>
 * </VStack>
 */
const VStack = forwardRef<HTMLDivElement, VStackProps>((props, ref) => {
  const {
    // 3. Content
    children,
    // 5. Layout
    direction = "vertical",
    spacing,
    align = "stretch",
    justify = "start",
    wrap = false,
    inline = false,
    // 8. Advanced
    className,
    style: styleProp,
    ...rest
  } = props;

  const inlineStyle = useMemo<CSSProperties>(() => {
    const s: CSSProperties = { ...styleProp };
    if (spacing !== undefined) s.gap = resolveSpace(spacing);
    return s;
  }, [spacing, styleProp]);

  const classes = cn(
    "v-stack",
    inline ? "inline-flex" : "flex",
    direction === "horizontal" ? "flex-row" : "flex-col",
    alignMap[align],
    justifyMap[justify],
    wrap && "flex-wrap",
    className,
  );

  return (
    <div ref={ref} className={classes} style={inlineStyle} {...rest}>
      {children}
    </div>
  );
});

VStack.displayName = "VStack";
export { VStack };
