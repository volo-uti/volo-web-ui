"use client";

import { forwardRef } from "react";
import { cn } from "../../../lib";
import { useControllable } from "../../../hooks/use-controllable";
import type { VSwitchListTileProps } from "./v-switch-list-tile.types";

/**
 * List tile with a built-in switch.
 *
 * @example
 * <VSwitchListTile title="Wi-Fi" subtitle="Home network" checked={wifi} onCheckedChange={setWifi} />
 */
const VSwitchListTile = forwardRef<HTMLLabelElement, VSwitchListTileProps>((props, ref) => {
  const {
    variant = "default",
    title,
    subtitle,
    leading,
    trailing,
    activeColor,
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

  const toggle = (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={() => setIsChecked(!isChecked)}
      style={isChecked && activeColor ? { backgroundColor: activeColor } : undefined}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)] focus-visible:ring-offset-2",
        isChecked ? "bg-[var(--v-primary)]" : "bg-[var(--v-muted)]",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
          isChecked ? "translate-x-[22px]" : "translate-x-[2px]",
          "mt-[2px]",
        )}
      />
    </button>
  );

  const isCard = variant === "card";
  const isLeading = variant === "leading";

  return (
    <label
      ref={ref}
      className={cn(
        "v-switch-list-tile",
        "flex items-center gap-[var(--v-spacing-md)] cursor-pointer transition-all duration-150",
        dense
          ? "py-[var(--v-spacing-xs)] px-[var(--v-spacing-md)]"
          : "py-[var(--v-spacing-sm)] px-[var(--v-spacing-md)]",
        selected && !isCard && "bg-[var(--v-accent)]",
        !isCard && "hover:bg-[var(--v-accent)] active:bg-[var(--v-accent)]",
        isCard && [
          "rounded-[var(--v-radius-card)] border border-[var(--v-border)]",
          isChecked && "border-[var(--v-primary)] bg-[var(--v-primary)]/5",
        ],
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      data-v-variant={variant}
      data-v-selected={selected || undefined}
      {...restProps}
    >
      {isLeading && toggle}
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
      {!isLeading && toggle}
    </label>
  );
});

VSwitchListTile.displayName = "VSwitchListTile";

export { VSwitchListTile };
