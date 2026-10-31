"use client";

import { forwardRef, useMemo, Children, type CSSProperties } from "react";
import { cn } from "../../../lib";
import { resolveSpace } from "../resolve-space";
import type { VGridProps } from "./v-grid.types";

/**
 * Grid of children with a fixed column count or an auto-fill minimum width.
 *
 * @example
 * <VGrid minChildWidth={160} gap="md">
 *   <VCard>One</VCard>
 *   <VCard>Two</VCard>
 * </VGrid>
 */
const VGrid = forwardRef<HTMLDivElement, VGridProps>((props, ref) => {
  const {
    // 2. Visual
    aspectRatio,
    // 3. Content
    children,
    // 5. Layout
    columns,
    minChildWidth,
    gap,
    rowGap,
    colGap,
    padding,
    // 8. Advanced
    className,
    style: styleProp,
    ...rest
  } = props;

  const inlineStyle = useMemo<CSSProperties>(() => {
    const s: CSSProperties = { ...styleProp };

    // Grid template columns
    if (minChildWidth !== undefined) {
      // extent mode: auto-fill with minmax
      const minW = typeof minChildWidth === "number" ? `${minChildWidth}px` : minChildWidth;
      s.gridTemplateColumns = `repeat(auto-fill, minmax(${minW}, 1fr))`;
    } else {
      // count mode: fixed columns (default 2)
      const cols = columns !== undefined && columns > 0 ? columns : 2;
      s.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    }

    // Gap handling
    if (rowGap !== undefined || colGap !== undefined) {
      s.rowGap = resolveSpace(rowGap ?? gap);
      s.columnGap = resolveSpace(colGap ?? gap);
    } else if (gap !== undefined) {
      s.gap = resolveSpace(gap);
    }

    // Padding
    if (padding !== undefined) {
      s.padding = typeof padding === "number" ? `${padding}px` : padding;
    }

    return s;
  }, [columns, minChildWidth, gap, rowGap, colGap, padding, styleProp]);

  // If aspectRatio is specified, wrap each child in a div with aspect-ratio
  const wrappedChildren =
    aspectRatio !== undefined && aspectRatio > 0
      ? Children.map(children, (child) =>
          child != null ? (
            <div style={{ aspectRatio: `${aspectRatio}` }} className="overflow-hidden">
              {child}
            </div>
          ) : null,
        )
      : children;

  return (
    <div ref={ref} className={cn("v-grid", "grid", className)} style={inlineStyle} {...rest}>
      {wrappedChildren}
    </div>
  );
});

VGrid.displayName = "VGrid";
export { VGrid };
