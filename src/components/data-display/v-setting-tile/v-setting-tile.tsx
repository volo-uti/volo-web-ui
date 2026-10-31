"use client";

import { forwardRef, useId, type MouseEvent } from "react";
import { cn } from "../../../lib";
import { useControllable } from "../../../hooks/use-controllable";
import type { VSettingTileProps } from "./v-setting-tile.types";

/**
 * Settings row ending in a chevron, switch, checkbox or custom content.
 *
 * @example
 * <VSettingTile title="Language" value="English" variant="navigation" onClick={openLanguages} />
 * <VSettingTile title="Dark mode" variant="switch" checked={dark} onCheckedChange={setDark} />
 */
const VSettingTile = forwardRef<HTMLDivElement, VSettingTileProps>((props, ref) => {
  const {
    variant = "simple",
    title,
    subtitle,
    value,
    checked: checkedProp,
    defaultChecked = false,
    leading,
    trailing: trailingProp,
    selected = false,
    disabled = false,
    onCheckedChange,
    onClick,
    onKeyDown,
    className,
    ...restProps
  } = props;

  const [isOn, setIsOn] = useControllable({
    value: checkedProp,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  const titleId = useId();
  const subtitleId = useId();

  const isInteractive = variant !== "simple" || onClick !== undefined;
  // A switch or checkbox tile holds its own control; that control is the focusable element,
  // so the row must not also be a button (nested interactive controls are invalid ARIA).
  const ownsControl = variant === "switch" || variant === "checkbox";
  const isButton = isInteractive && !ownsControl;
  const controlLabel = {
    "aria-labelledby": titleId,
    "aria-describedby": subtitle ? subtitleId : undefined,
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (variant === "switch" || variant === "checkbox") {
      setIsOn(!isOn);
    } else {
      onClick?.(e);
    }
  };

  const trailing = (() => {
    if (variant === "simple") {
      return trailingProp || null;
    }
    switch (variant) {
      case "navigation":
        return (
          <div className="flex items-center gap-[var(--v-spacing-sm)]">
            {value && (
              <span className="text-[length:var(--v-size-sm-font-size)] text-[var(--v-muted-foreground)]">
                {value}
              </span>
            )}
            <svg
              className="h-5 w-5 text-[var(--v-muted-foreground)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        );
      case "switch":
        return (
          <button
            type="button"
            role="switch"
            aria-checked={isOn}
            {...controlLabel}
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              setIsOn(!isOn);
            }}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)]",
              isOn ? "bg-[var(--v-primary)]" : "bg-[var(--v-muted)]",
            )}
          >
            <span
              className={cn(
                "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm transition-transform mt-[2px]",
                isOn ? "translate-x-[22px]" : "translate-x-[2px]",
              )}
            />
          </button>
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={isOn}
            {...controlLabel}
            disabled={disabled}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setIsOn(e.target.checked)}
            className="h-4 w-4 rounded border-[var(--v-border)] accent-[var(--v-primary)] focus:ring-2 focus:ring-[var(--v-ring)]"
          />
        );
      default:
        return null;
    }
  })();

  return (
    <div
      {...restProps}
      ref={ref}
      role={isButton ? "button" : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={isButton && !disabled ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (isButton && e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          e.currentTarget.click();
        }
      }}
      data-v-variant={variant}
      data-v-selected={selected || undefined}
      className={cn(
        "v-setting-tile",
        "flex items-center gap-[var(--v-spacing-md)] py-[var(--v-spacing-sm)] px-[var(--v-spacing-md)]",
        isInteractive &&
          "cursor-pointer hover:bg-[var(--v-accent)]/50 active:bg-[var(--v-accent)] transition-all duration-150",
        selected && "bg-[var(--v-accent)]",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {leading && <div className="shrink-0 text-[var(--v-muted-foreground)]">{leading}</div>}
      <div className="flex flex-col flex-1 min-w-0">
        <span
          id={titleId}
          className="text-[length:var(--v-size-md-font-size)] text-[var(--v-foreground)]"
        >
          {title}
        </span>
        {subtitle && (
          <span
            id={subtitleId}
            className="text-[length:var(--v-size-sm-font-size)] text-[var(--v-muted-foreground)]"
          >
            {subtitle}
          </span>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
});

VSettingTile.displayName = "VSettingTile";

export { VSettingTile };
