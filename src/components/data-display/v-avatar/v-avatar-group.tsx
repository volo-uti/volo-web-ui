"use client";

import { Children, cloneElement, forwardRef, isValidElement } from "react";
import { cn } from "../../../lib";
import type { VSize } from "../../../lib";
import { devWarning } from "../../../utils/dev-warning";
import { useLocaleText } from "../../../hooks/use-locale";
import type { VAvatarGroupProps } from "./v-avatar-group.types";

const surplusSizeStyles: Record<VSize, string> = {
  xs: "h-6 w-6 text-[length:10px]",
  sm: "h-[var(--v-size-sm-height)] w-[var(--v-size-sm-height)] text-[length:var(--v-size-xs-font-size)]",
  md: "h-[var(--v-size-md-height)] w-[var(--v-size-md-height)] text-[length:var(--v-size-sm-font-size)]",
  lg: "h-[var(--v-size-lg-height)] w-[var(--v-size-lg-height)] text-[length:var(--v-size-md-font-size)]",
  xl: "h-16 w-16 text-[length:var(--v-size-lg-font-size)]",
};

/**
 * Overlapping VAvatars; those beyond `max` collapse into a "+N" indicator.
 *
 * @example
 * <VAvatarGroup max={3} size="md">
 *   <VAvatar src="/a.jpg" alt="A" />
 *   <VAvatar src="/b.jpg" alt="B" />
 *   <VAvatar src="/c.jpg" alt="C" />
 *   <VAvatar src="/d.jpg" alt="D" />
 * </VAvatarGroup>
 */
const VAvatarGroup = forwardRef<HTMLDivElement, VAvatarGroupProps>((props, ref) => {
  const { size = "md", children, max, renderSurplus, className, ...rest } = props;

  if (max !== undefined && max < 1) {
    devWarning("VAvatarGroup", "max must be at least 1");
  }

  const localeText = useLocaleText();
  const childArray = Children.toArray(children).filter(isValidElement);
  const totalCount = childArray.length;
  // Negative, fractional or NaN limits would slice from the end or show a fractional surplus
  const limit = max === undefined || Number.isNaN(max) ? totalCount : Math.max(0, Math.floor(max));
  const displayCount = Math.min(limit, totalCount);
  const surplusCount = totalCount - displayCount;

  const displayedChildren = childArray.slice(0, displayCount).map((child) => {
    if (isValidElement(child)) {
      return cloneElement(child as React.ReactElement<{ size?: VSize; className?: string }>, {
        size,
        className: cn(
          (child.props as { className?: string }).className,
          "ring-2 ring-[var(--v-background)]",
        ),
      });
    }
    return child;
  });

  return (
    <div
      ref={ref}
      role="group"
      aria-label={localeText.avatarGroupLabel(totalCount)}
      className={cn("v-avatar-group", "flex -space-x-2", className)}
      {...rest}
    >
      {displayedChildren}
      {surplusCount > 0 &&
        (renderSurplus ? (
          renderSurplus(surplusCount)
        ) : (
          <div
            className={cn(
              "relative inline-flex items-center justify-center rounded-full",
              "bg-[var(--v-muted)] text-[var(--v-muted-foreground)]",
              "font-[var(--v-font-weight-medium)]",
              "ring-2 ring-[var(--v-background)]",
              surplusSizeStyles[size],
            )}
          >
            {localeText.avatarGroupOverflow(surplusCount)}
          </div>
        ))}
    </div>
  );
});

VAvatarGroup.displayName = "VAvatarGroup";

export { VAvatarGroup };
