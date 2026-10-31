"use client";

import { forwardRef } from "react";
import type { MouseEvent } from "react";
import { cn } from "../../../lib";
import type { VSize } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useLocaleText } from "../../../hooks/use-locale";
import type { VChipProps, VChipVariant } from "./v-chip.types";

const sizeStyles: Record<VSize, string> = {
  xs: "h-[var(--v-size-xs-height)] px-[var(--v-size-xs-padding-x)] text-[length:var(--v-size-xs-font-size)] gap-[var(--v-size-xs-gap)]",
  sm: "h-[var(--v-size-xs-height)] px-[var(--v-size-xs-padding-x)] text-[length:var(--v-size-xs-font-size)] gap-[var(--v-size-xs-gap)]",
  md: "h-[var(--v-size-sm-height)] px-[var(--v-size-sm-padding-x)] text-[length:var(--v-size-sm-font-size)] gap-[var(--v-size-sm-gap)]",
  lg: "h-[var(--v-size-md-height)] px-[var(--v-size-md-padding-x)] text-[length:var(--v-size-md-font-size)] gap-[var(--v-size-md-gap)]",
  xl: "h-[var(--v-size-lg-height)] px-[var(--v-size-lg-padding-x)] text-[length:var(--v-size-lg-font-size)] gap-[var(--v-size-lg-gap)]",
};

const variantStyles: Record<VChipVariant, string> = {
  filled: "bg-[var(--v-muted)] text-[var(--v-foreground)]",
  outlined: "border border-[var(--v-border)] text-[var(--v-foreground)] bg-transparent",
  filter: "bg-[var(--v-muted)] text-[var(--v-foreground)]",
  input: "bg-[var(--v-muted)] text-[var(--v-foreground)]",
};

const filterSelectedStyles =
  "bg-[var(--v-primary)] text-[var(--v-primary-foreground)] border-[var(--v-primary)]";

/** Default X icon for delete button */
function DefaultDeleteIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 4L10 10M10 4L4 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Check icon for filter variant */
function FilterCheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 7L6 10L11 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Compact tag; clickable, a toggleable filter or removable.
 *
 * @example
 * <VChip label="React" />
 * <VChip label="Filter" variant="filter" selected={on} onSelectedChange={setOn} />
 * <VChip label="Removable" variant="input" onDelete={() => remove()} />
 */
const VChip = forwardRef<HTMLDivElement, VChipProps>((props, ref) => {
  const override = useComponentOverride("VChip");
  const localeText = useLocaleText();
  const {
    variant = (override?.defaultProps?.variant as VChipVariant | undefined) ?? "filled",
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    label,
    leading,
    deleteIcon,
    disabled = false,
    selected = false,
    onClick,
    onKeyDown,
    onSelectedChange,
    onDelete,
    className,
    ...rest
  } = props;

  const isFilter = variant === "filter";
  const isInput = variant === "input";
  const isFilterSelected = isFilter && selected;
  const isInteractive = isFilter || !!onClick;

  const classes = cn(
    "v-chip",
    "inline-flex items-center rounded-full",
    "font-[var(--v-font-weight-medium)]",
    "select-none whitespace-nowrap",
    "transition-all duration-[var(--v-duration-fast)]",
    sizeStyles[size],
    isFilterSelected ? filterSelectedStyles : variantStyles[variant],
    isInteractive && "cursor-pointer active:scale-95",
    disabled && "opacity-50 pointer-events-none",
    override?.styles?.root,
    className,
  );

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (isFilter) onSelectedChange?.(!selected);
    onClick?.(e);
  };

  return (
    <div
      ref={ref}
      className={classes}
      data-v-variant={variant}
      data-v-size={size}
      data-v-selected={isFilterSelected || undefined}
      aria-disabled={disabled || undefined}
      role={isFilter ? "checkbox" : onClick ? "button" : undefined}
      aria-checked={isFilter ? selected : undefined}
      tabIndex={isInteractive && !disabled ? 0 : undefined}
      {...rest}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (
          isInteractive &&
          !disabled &&
          e.target === e.currentTarget &&
          (e.key === "Enter" || e.key === " ")
        ) {
          e.preventDefault();
          e.currentTarget.click();
        }
      }}
    >
      {isFilterSelected && (
        <span
          className={cn(
            "shrink-0",
            "animate-[v-chip-check-in_var(--v-duration-fast)_ease-out]",
            override?.styles?.leading,
          )}
        >
          <FilterCheckIcon />
        </span>
      )}
      {!isFilterSelected && leading && (
        <span className={cn("shrink-0", override?.styles?.leading)}>{leading}</span>
      )}
      <span className={cn(override?.styles?.label)}>{label}</span>
      {isInput && onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          disabled={disabled}
          className={cn(
            "shrink-0 rounded-full p-0.5 min-h-6 min-w-6 inline-flex items-center justify-center",
            "hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--v-ring)]",
            "cursor-pointer",
            override?.styles?.deleteButton,
          )}
          aria-label={localeText.chipRemove(label)}
        >
          {deleteIcon || <DefaultDeleteIcon />}
        </button>
      )}
    </div>
  );
});

VChip.displayName = "VChip";

export { VChip };
