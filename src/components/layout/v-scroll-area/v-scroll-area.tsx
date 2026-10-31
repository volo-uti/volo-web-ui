"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { cn } from "../../../lib";
import type { VScrollAreaProps, VScrollAreaDirection } from "./v-scroll-area.types";

const overflowMap: Record<VScrollAreaDirection, string> = {
  vertical: "overflow-x-hidden overflow-y-auto",
  horizontal: "overflow-y-hidden overflow-x-auto",
  both: "overflow-auto",
};

/**
 * Scrollable region with a themed, optionally auto-hiding scrollbar.
 *
 * While its content overflows, the region becomes a keyboard tab stop so the keys can scroll it.
 * Pass `aria-label` or `aria-labelledby` to also expose it as a named `region`.
 *
 * @example
 * <VScrollArea maxHeight={240} scrollbar="always">
 *   <VStack spacing="sm">{items}</VStack>
 * </VScrollArea>
 */
const VScrollArea = forwardRef<HTMLDivElement, VScrollAreaProps>((props, ref) => {
  const {
    // 2. Visual
    scrollbarThickness = 6,
    scrollbarRadius = 3,
    thumbColor,
    trackColor,
    // 3. Content
    children,
    // 5. Layout
    maxHeight,
    maxWidth,
    direction = "vertical",
    padding,
    // 6. State
    scrollbar = "auto",
    // 8. Advanced
    className,
    style: styleProp,
    tabIndex,
    role,
    ...rest
  } = props;

  const innerRef = useRef<HTMLDivElement | null>(null);
  const [overflowing, setOverflowing] = useState(false);

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  // A region that can scroll must be reachable by keyboard; one that cannot is not a tab stop.
  useEffect(() => {
    const node = innerRef.current;
    if (!node) return;
    const measure = () => {
      setOverflowing(node.scrollHeight > node.clientHeight || node.scrollWidth > node.clientWidth);
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    for (const child of Array.from(node.children)) observer.observe(child);
    return () => observer.disconnect();
  }, [children, direction, maxHeight, maxWidth, padding]);

  const scopeId = useId();
  const scopeClass = `v-scroll-${scopeId.replace(/:/g, "")}`;

  const inlineStyle = useMemo<CSSProperties>(() => {
    const s: CSSProperties = { ...styleProp };
    if (maxHeight !== undefined)
      s.maxHeight = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;
    if (maxWidth !== undefined)
      s.maxWidth = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
    if (padding !== undefined) s.padding = typeof padding === "number" ? `${padding}px` : padding;
    return s;
  }, [maxHeight, maxWidth, padding, styleProp]);

  // Resolve colors — use CSS custom properties as defaults
  const resolvedThumb =
    thumbColor ?? "color-mix(in srgb, var(--v-muted-foreground) 40%, transparent)";
  const resolvedThumbHover =
    thumbColor ?? "color-mix(in srgb, var(--v-muted-foreground) 60%, transparent)";
  const resolvedTrack = trackColor ?? "var(--v-muted)";

  // Build scoped CSS for custom scrollbar styling
  const scrollbarCSS = useMemo(() => {
    const hidden = scrollbar === "hidden";
    const isAlways = scrollbar === "always";

    // Base webkit scrollbar styles
    const base = `
.${scopeClass}::-webkit-scrollbar {
  width: ${scrollbarThickness}px;
  height: ${scrollbarThickness}px;
}
.${scopeClass}::-webkit-scrollbar-track {
  background: ${hidden ? "transparent" : resolvedTrack};
  border-radius: ${scrollbarRadius}px;
}
.${scopeClass}::-webkit-scrollbar-thumb {
  background: ${hidden ? "transparent" : resolvedThumb};
  border-radius: ${scrollbarRadius}px;
  transition: background 0.2s;
}
.${scopeClass}::-webkit-scrollbar-thumb:hover {
  background: ${hidden ? "transparent" : resolvedThumbHover};
}
.${scopeClass}::-webkit-scrollbar-corner {
  background: transparent;
}`;

    // Firefox scrollbar
    const firefox = hidden
      ? `.${scopeClass} { scrollbar-width: none; }`
      : `.${scopeClass} { scrollbar-width: thin; scrollbar-color: ${resolvedThumb} ${resolvedTrack}; }`;

    // Auto-hide behavior: hide by default, show on hover/scroll
    const autoHide =
      !isAlways && !hidden
        ? `
.${scopeClass}::-webkit-scrollbar-thumb {
  background: transparent;
}
.${scopeClass}:hover::-webkit-scrollbar-thumb,
.${scopeClass}:focus-within::-webkit-scrollbar-thumb {
  background: ${resolvedThumb};
}
.${scopeClass}:hover::-webkit-scrollbar-thumb:hover,
.${scopeClass}:focus-within::-webkit-scrollbar-thumb:hover {
  background: ${resolvedThumbHover};
}`
        : "";

    return `${base}\n${firefox}\n${autoHide}`;
  }, [
    scopeClass,
    scrollbarThickness,
    scrollbarRadius,
    resolvedThumb,
    resolvedThumbHover,
    resolvedTrack,
    scrollbar,
  ]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarCSS }} />
      <div
        ref={setRefs}
        className={cn("v-scroll-area", "relative", overflowMap[direction], scopeClass, className)}
        style={inlineStyle}
        tabIndex={tabIndex ?? (overflowing ? 0 : undefined)}
        role={role ?? (rest["aria-label"] || rest["aria-labelledby"] ? "region" : undefined)}
        {...rest}
      >
        {children}
      </div>
    </>
  );
});

VScrollArea.displayName = "VScrollArea";
export { VScrollArea };
