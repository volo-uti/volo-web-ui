"use client";

import { forwardRef } from "react";
import { cn } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import type { VBackdropProps } from "./v-backdrop.types";

/**
 * Full-screen dimming layer for custom modals and drawers; press it with `onClick`.
 *
 * @example
 * <VBackdrop open={isOpen} onClick={() => setIsOpen(false)} />
 * <VBackdrop open={isOpen} opacity={0.7} color="#000" onClick={close} />
 */
const VBackdrop = forwardRef<HTMLDivElement, VBackdropProps>((props, ref) => {
  const override = useComponentOverride("VBackdrop");
  const {
    // 2. Visual
    color,
    opacity = 0.5,
    // 8. State
    open,
    className,
    ...rest
  } = props;

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "v-backdrop",
        "fixed inset-0 z-[var(--v-z-modal-backdrop)]",
        "transition-opacity",
        !color && "bg-black",
        override?.styles?.root,
        className,
      )}
      style={{
        opacity,
        backgroundColor: color || undefined,
      }}
      aria-hidden="true"
      {...rest}
    />
  );
});

VBackdrop.displayName = "VBackdrop";

export { VBackdrop };
