"use client";

import { forwardRef, useCallback, useEffect, useRef } from "react";
import { cn, createSafeContext } from "../../../lib";
import type { VSize } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useRovingFocus } from "../../../hooks/use-roving-focus";
import type { VButtonGroupContextValue, VButtonGroupProps } from "./v-button-group.types";
import type { VButtonVariant } from "../v-button/v-button.types";

// ─────────────────────────────────────────
// Context
// ─────────────────────────────────────────

const [ButtonGroupProvider, useButtonGroupContext] =
  createSafeContext<VButtonGroupContextValue>("ButtonGroup");

/**
 * Reads the variant and size of the enclosing VButtonGroup; throws outside one.
 *
 * @example
 * const { variant, size } = useButtonGroup()
 */
function useButtonGroup(): VButtonGroupContextValue {
  return useButtonGroupContext();
}

export { useButtonGroup };

// ─────────────────────────────────────────
// VButtonGroup
// ─────────────────────────────────────────

/**
 * Connected strip of VButtons with arrow-key focus.
 *
 * @example
 * <VButtonGroup variant="outlined" size="sm">
 *   <VButton>Left</VButton>
 *   <VButton>Center</VButton>
 *   <VButton>Right</VButton>
 * </VButtonGroup>
 */
const VButtonGroup = forwardRef<HTMLDivElement, VButtonGroupProps>((props, ref) => {
  const override = useComponentOverride("VButtonGroup");

  const {
    // 1. Identity
    variant = override?.defaultProps?.variant as VButtonVariant | undefined,
    // 2. Visual
    size = override?.defaultProps?.size as VSize | undefined,
    // 3. Content
    children,
    // 7. Layout
    orientation = "horizontal",
    spacing = 0,
    // 10. Advanced
    className,
    style,
    ...restProps
  } = props;

  const connected = spacing === 0;

  const containerRef = useRef<HTMLDivElement>(null);

  const { handleKeyDown, initRoving } = useRovingFocus(containerRef, {
    selector: "button:not([disabled])",
    orientation: orientation === "vertical" ? "vertical" : "horizontal",
    loop: true,
  });

  // Runs after every render so children added, removed or disabled later keep one tab stop
  useEffect(() => {
    initRoving();
  });

  // Merge forwarded ref and internal containerRef
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref],
  );

  return (
    <ButtonGroupProvider value={{ variant, size }}>
      <div
        ref={mergedRef}
        role="toolbar"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex",
          orientation === "vertical" ? "flex-col" : "flex-row",
          // Connected border radius
          connected &&
            orientation === "horizontal" &&
            "[&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none",
          connected &&
            orientation === "vertical" &&
            "[&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-t-none",
          // Remove double borders
          connected && orientation === "horizontal" && "[&>*:not(:first-child)]:-ml-px",
          connected && orientation === "vertical" && "[&>*:not(:first-child)]:-mt-px",
          override?.styles?.root,
          className,
        )}
        style={connected ? style : { gap: spacing, ...style }}
        data-v-orientation={orientation}
        {...restProps}
      >
        {children}
      </div>
    </ButtonGroupProvider>
  );
});

VButtonGroup.displayName = "VButtonGroup";

export { VButtonGroup };
