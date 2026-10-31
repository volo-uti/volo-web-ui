"use client";

import { forwardRef, useEffect, useId, useRef, useCallback, type ChangeEvent } from "react";
import { cn } from "../../../lib";
import type { VSize } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useControllable } from "../../../hooks/use-controllable";
import type { VCheckboxProps } from "./v-checkbox.types";

// ─────────────────────────────────────────
// Size styles
// ─────────────────────────────────────────

const checkboxSizeMap: Record<VSize, string> = {
  xs: "h-[var(--v-size-xs-icon-size)] w-[var(--v-size-xs-icon-size)] rounded-[2px]",
  sm: "h-[var(--v-size-sm-icon-size)] w-[var(--v-size-sm-icon-size)] rounded-[3px]",
  md: "h-[var(--v-size-md-icon-size)] w-[var(--v-size-md-icon-size)] rounded-[var(--v-radius-sm)]",
  lg: "h-[var(--v-size-lg-icon-size)] w-[var(--v-size-lg-icon-size)] rounded-[var(--v-radius-sm)]",
  xl: "h-[var(--v-size-xl-icon-size)] w-[var(--v-size-xl-icon-size)] rounded-[var(--v-radius-sm)]",
};

/* WCAG 2.5.8: Wrapper size to ensure minimum 24x24px touch target */
const touchTargetSizeMap: Record<VSize, string> = {
  xs: "min-h-6 min-w-6",
  sm: "min-h-6 min-w-6",
  md: "min-h-6 min-w-6",
  lg: "min-h-6 min-w-6",
  xl: "min-h-6 min-w-6",
};

const iconSizeMap: Record<VSize, string> = {
  xs: "h-2.5 w-2.5",
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
  xl: "h-5 w-5",
};

const labelSizeMap: Record<VSize, string> = {
  xs: "text-[length:var(--v-size-xs-font-size)]",
  sm: "text-[length:var(--v-size-sm-font-size)]",
  md: "text-[length:var(--v-size-md-font-size)]",
  lg: "text-[length:var(--v-size-lg-font-size)]",
  xl: "text-[length:var(--v-size-xl-font-size)]",
};

// ─────────────────────────────────────────
// Icons
// ─────────────────────────────────────────

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// ─────────────────────────────────────────
// VCheckbox
// ─────────────────────────────────────────

/**
 * Checkbox with label, indeterminate state and card variant.
 *
 * @example
 * <VCheckbox label="Remember me" checked={value} onCheckedChange={setValue} />
 */
const VCheckbox = forwardRef<HTMLInputElement, VCheckboxProps>((props, ref) => {
  const override = useComponentOverride("VCheckbox");

  const {
    // 1. Identity
    variant = "default",
    // 2. Visual
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    // 3. Content
    label,
    sublabel,
    // 8. State
    disabled = false,
    checked: checkedProp,
    defaultChecked = false,
    indeterminate = false,
    // 9. Callbacks
    onCheckedChange,
    // 10. Advanced
    id: idProp,
    className,
    ...restProps
  } = props;

  const autoId = useId();
  const checkboxId = idProp ?? autoId;

  const internalRef = useRef<HTMLInputElement | null>(null);

  const [isChecked, setIsChecked] = useControllable({
    value: checkedProp,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  // Sync indeterminate property (not available as HTML attribute). A click clears it in the
  // DOM, so it is applied again after every change; the `indeterminate` prop stays in charge.
  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, isChecked]);

  const setRefs = useCallback(
    (el: HTMLInputElement | null) => {
      internalRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
      }
    },
    [ref],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    // The browser clears the native flag on click; keep it equal to what is drawn
    e.target.indeterminate = indeterminate;
  };

  const isCard = variant === "card";

  const checkboxContent = (
    <div
      className={cn(
        "inline-flex items-start gap-[var(--v-spacing-sm)]",
        disabled && "opacity-50 pointer-events-none",
        isCard && [
          "p-[var(--v-spacing-lg)] border rounded-[var(--v-radius-card)]",
          "bg-[var(--v-card)]",
          isChecked ? "border-[var(--v-primary)]" : "border-[var(--v-border)]",
        ],
        !isCard && override?.styles?.root,
        className,
      )}
      data-v-size={size}
    >
      <span
        className={cn(
          "relative inline-flex items-center justify-center mt-0.5",
          touchTargetSizeMap[size],
        )}
      >
        <input
          ref={setRefs}
          id={checkboxId}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className="peer sr-only"
          {...restProps}
        />
        <span
          className={cn(
            "flex items-center justify-center border transition-all duration-150",
            "border-[var(--v-input)]",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--v-ring)] peer-focus-visible:ring-offset-2",
            !disabled &&
              "peer-hover:border-[var(--v-primary)] peer-hover:scale-110 peer-active:scale-95",
            (isChecked || indeterminate) &&
              "bg-[var(--v-primary)] border-[var(--v-primary)] text-[var(--v-primary-foreground)]",
            checkboxSizeMap[size],
            override?.styles?.checkbox,
          )}
          aria-hidden="true"
        >
          {indeterminate ? (
            <MinusIcon className={iconSizeMap[size]} />
          ) : isChecked ? (
            <CheckIcon className={iconSizeMap[size]} />
          ) : null}
        </span>
      </span>

      {(label || sublabel) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={checkboxId}
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
            <span className="text-[var(--v-muted-foreground)] text-[length:var(--v-size-sm-font-size)]">
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );

  return checkboxContent;
});

VCheckbox.displayName = "VCheckbox";

export { VCheckbox };
