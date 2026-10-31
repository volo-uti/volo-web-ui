"use client";

import { forwardRef, useId, type ChangeEvent } from "react";
import { cn } from "../../../lib";
import type { VSize } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useControllable } from "../../../hooks/use-controllable";
import type { VSwitchProps } from "./v-switch.types";

// ─────────────────────────────────────────
// Size styles
// ─────────────────────────────────────────

const trackSizeMap: Record<VSize, string> = {
  xs: "h-5 w-9",
  sm: "h-6 w-10",
  md: "h-6 w-11",
  lg: "h-7 w-[52px]",
  xl: "h-8 w-[60px]",
};

const thumbSizeMap: Record<VSize, { size: string; translate: string }> = {
  xs: { size: "h-4 w-4", translate: "translate-x-4" },
  sm: { size: "h-5 w-5", translate: "translate-x-4" },
  md: { size: "h-5 w-5", translate: "translate-x-5" },
  lg: { size: "h-6 w-6", translate: "translate-x-6" },
  xl: { size: "h-7 w-7", translate: "translate-x-7" },
};

const labelSizeMap: Record<VSize, string> = {
  xs: "text-[length:var(--v-size-xs-font-size)]",
  sm: "text-[length:var(--v-size-sm-font-size)]",
  md: "text-[length:var(--v-size-md-font-size)]",
  lg: "text-[length:var(--v-size-lg-font-size)]",
  xl: "text-[length:var(--v-size-xl-font-size)]",
};

// ─────────────────────────────────────────
// VSwitch
// ─────────────────────────────────────────

/**
 * On/off switch with label (role switch).
 *
 * @example
 * <VSwitch label="Dark mode" checked={isDark} onCheckedChange={setIsDark} />
 */
const VSwitch = forwardRef<HTMLInputElement, VSwitchProps>((props, ref) => {
  const override = useComponentOverride("VSwitch");

  const {
    // 1. Identity
    variant = "default",
    // 2. Visual
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    activeColor,
    // 3. Content
    label,
    sublabel,
    // 8. State
    disabled = false,
    checked: checkedProp,
    defaultChecked = false,
    // 9. Callbacks
    onCheckedChange,
    // 10. Advanced
    id: idProp,
    className,
    ...restProps
  } = props;

  const autoId = useId();
  const switchId = idProp ?? autoId;
  const sublabelId = `${switchId}-sublabel`;
  const labelId = `${switchId}-label`;

  const [isChecked, setIsChecked] = useControllable({
    value: checkedProp,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const thumb = thumbSizeMap[size];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-[var(--v-spacing-sm)]",
        disabled && "opacity-50 pointer-events-none",
        override?.styles?.root,
        className,
      )}
      data-v-size={size}
    >
      <label htmlFor={switchId} className="relative inline-flex cursor-pointer items-center">
        <input
          ref={ref}
          id={switchId}
          type="checkbox"
          role="switch"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          aria-checked={isChecked}
          aria-labelledby={label && !restProps["aria-label"] ? labelId : undefined}
          aria-describedby={sublabel ? sublabelId : undefined}
          className="peer sr-only"
          {...restProps}
        />

        {/* Track */}
        <span
          className={cn(
            "relative inline-flex shrink-0 items-center rounded-full border-2 border-transparent transition-all duration-150",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--v-ring)] peer-focus-visible:ring-offset-2",
            !disabled &&
              "peer-hover:scale-105 peer-hover:border-[var(--v-primary)] peer-active:scale-95",
            isChecked ? "bg-[var(--v-primary)]" : "bg-[var(--v-input)]",
            trackSizeMap[size],
            override?.styles?.track,
          )}
          style={isChecked && activeColor ? { backgroundColor: activeColor } : undefined}
          aria-hidden="true"
        >
          {variant === "labeled" && (
            <span
              className={cn(
                "pointer-events-none absolute select-none text-[10px] font-bold leading-none",
                isChecked
                  ? "left-1.5 text-[var(--v-primary-foreground)]"
                  : "right-1.5 text-[var(--v-muted-foreground)]",
              )}
            >
              {isChecked ? "I" : "O"}
            </span>
          )}
          {/* Thumb */}
          <span
            className={cn(
              "pointer-events-none block rounded-full bg-[var(--v-background)] shadow-sm transition-transform",
              thumb.size,
              isChecked ? thumb.translate : "translate-x-0",
              override?.styles?.thumb,
            )}
          />
        </span>
      </label>

      {(label || sublabel) && (
        <div className="flex flex-col">
          {label && (
            <label
              id={labelId}
              htmlFor={switchId}
              className={cn(
                "cursor-pointer select-none text-[var(--v-foreground)]",
                labelSizeMap[size],
                disabled && "cursor-default",
                override?.styles?.label,
              )}
            >
              {label}
            </label>
          )}
          {sublabel && (
            <span
              id={sublabelId}
              className="text-[var(--v-muted-foreground)] text-[length:var(--v-size-sm-font-size)]"
            >
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

VSwitch.displayName = "VSwitch";

export { VSwitch };
