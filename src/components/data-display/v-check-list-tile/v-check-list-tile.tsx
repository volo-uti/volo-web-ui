"use client";

import { forwardRef } from "react";
import { cn } from "../../../lib";
import { useControllable } from "../../../hooks/use-controllable";
import type { VCheckListTileProps } from "./v-check-list-tile.types";

/**
 * List tile with a built-in checkbox.
 *
 * @example
 * <VCheckListTile
 *   title="Email me updates"
 *   subtitle="Weekly digest"
 *   checked={subscribed}
 *   onCheckedChange={setSubscribed}
 * />
 */
const VCheckListTile = forwardRef<HTMLLabelElement, VCheckListTileProps>((props, ref) => {
  const {
    variant = "default",
    title,
    subtitle,
    leading,
    trailing,
    dense = false,
    disabled = false,
    checked: checkedProp,
    defaultChecked = false,
    selected = false,
    onCheckedChange,
    className,
    ...restProps
  } = props;

  const [isChecked, setIsChecked] = useControllable({
    value: checkedProp,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  const checkbox = (
    <input
      type="checkbox"
      checked={isChecked}
      disabled={disabled}
      onChange={(e) => setIsChecked(e.target.checked)}
      className="h-4 w-4 rounded border-[var(--v-border)] text-[var(--v-primary)] accent-[var(--v-primary)] focus:ring-2 focus:ring-[var(--v-ring)]"
    />
  );

  const isCard = variant === "card";
  const isLeading = variant === "leading";

  return (
    <label
      ref={ref}
      className={cn(
        "v-check-list-tile",
        "flex items-center gap-[var(--v-spacing-md)] cursor-pointer transition-all duration-150",
        dense
          ? "py-[var(--v-spacing-xs)] px-[var(--v-spacing-md)]"
          : "py-[var(--v-spacing-sm)] px-[var(--v-spacing-md)]",
        selected && !isCard && "bg-[var(--v-accent)]",
        !isCard && "hover:bg-[var(--v-accent)] active:bg-[var(--v-accent)]",
        isCard && [
          "rounded-[var(--v-radius-card)] border border-[var(--v-border)]",
          isChecked && "bg-[var(--v-muted)]",
        ],
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      data-v-variant={variant}
      data-v-selected={selected || undefined}
      {...restProps}
    >
      {isLeading && checkbox}
      {!isLeading && leading && <div className="shrink-0">{leading}</div>}
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[length:var(--v-size-md-font-size)] text-[var(--v-foreground)] truncate">
          {title}
        </span>
        {subtitle && (
          <span className="text-[length:var(--v-size-sm-font-size)] text-[var(--v-muted-foreground)] truncate">
            {subtitle}
          </span>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
      {!isLeading && checkbox}
    </label>
  );
});

VCheckListTile.displayName = "VCheckListTile";

export { VCheckListTile };
