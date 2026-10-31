"use client";

import { forwardRef, useCallback, useEffect, useId, useRef, type ChangeEvent } from "react";
import { cn, createSafeContext } from "../../../lib";
import type { VSize } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useControllable } from "../../../hooks/use-controllable";
import { useRovingFocus } from "../../../hooks/use-roving-focus";
import type { VRadioGroupContextValue, VRadioGroupProps, VRadioProps } from "./v-radio.types";

// ─────────────────────────────────────────
// Context
// ─────────────────────────────────────────

const [RadioGroupProvider, useRadioGroup] =
  createSafeContext<VRadioGroupContextValue>("RadioGroup");

// ─────────────────────────────────────────
// Size styles
// ─────────────────────────────────────────

const radioSizeMap: Record<VSize, string> = {
  xs: "h-[var(--v-size-xs-icon-size)] w-[var(--v-size-xs-icon-size)]",
  sm: "h-[var(--v-size-sm-icon-size)] w-[var(--v-size-sm-icon-size)]",
  md: "h-[var(--v-size-md-icon-size)] w-[var(--v-size-md-icon-size)]",
  lg: "h-[var(--v-size-lg-icon-size)] w-[var(--v-size-lg-icon-size)]",
  xl: "h-[var(--v-size-xl-icon-size)] w-[var(--v-size-xl-icon-size)]",
};

/* WCAG 2.5.8: Ensure minimum 24x24px touch target */
const touchTargetSizeMap: Record<VSize, string> = {
  xs: "min-h-6 min-w-6",
  sm: "min-h-6 min-w-6",
  md: "min-h-6 min-w-6",
  lg: "min-h-6 min-w-6",
  xl: "min-h-6 min-w-6",
};

const dotSizeMap: Record<VSize, string> = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-4 w-4",
};

const labelSizeMap: Record<VSize, string> = {
  xs: "text-[length:var(--v-size-xs-font-size)]",
  sm: "text-[length:var(--v-size-sm-font-size)]",
  md: "text-[length:var(--v-size-md-font-size)]",
  lg: "text-[length:var(--v-size-lg-font-size)]",
  xl: "text-[length:var(--v-size-xl-font-size)]",
};

/** The roving item is the native radio input, never its wrapper. */
const RADIO_ITEM_SELECTOR = "input[data-roving-item]";

// ─────────────────────────────────────────
// VRadioGroup
// ─────────────────────────────────────────

/**
 * Container of VRadio items that owns the selected value and arrow-key navigation.
 *
 * @example
 * <VRadioGroup value={value} onValueChange={setValue}>
 *   <VRadio value="a" label="Option A" />
 *   <VRadio value="b" label="Option B" />
 * </VRadioGroup>
 */
const VRadioGroup = forwardRef<HTMLDivElement, VRadioGroupProps>((props, ref) => {
  const override = useComponentOverride("VRadioGroup");

  const {
    // 2. Visual
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    // 3. Content
    children,
    value: valueProp,
    defaultValue = "",
    // 7. Layout
    orientation = "vertical",
    // 8. State
    disabled = false,
    // 9. Callbacks
    onValueChange,
    // 10. Advanced
    name: nameProp,
    className,
    ...restProps
  } = props;

  const autoId = useId();
  const groupName = nameProp ?? autoId;

  const [currentValue, setValue] = useControllable({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleActiveChange = useCallback(
    (index: number) => {
      if (!containerRef.current) return;
      const items = Array.from(
        containerRef.current.querySelectorAll<HTMLInputElement>(RADIO_ITEM_SELECTOR),
      ).filter((el) => !el.disabled);
      const radioValue = items[index]?.getAttribute("data-radio-value");
      if (radioValue !== null && radioValue !== undefined) {
        setValue(radioValue);
      }
    },
    [setValue],
  );

  const { handleKeyDown, initRoving } = useRovingFocus(containerRef, {
    selector: RADIO_ITEM_SELECTOR,
    orientation: orientation === "vertical" ? "vertical" : "horizontal",
    loop: true,
    onActiveChange: handleActiveChange,
  });

  // Runs after every render so the tab stop follows the checked radio and later changes
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
    <RadioGroupProvider
      value={{
        name: groupName,
        value: currentValue,
        onValueChange: setValue,
        size,
        disabled,
      }}
    >
      <div
        ref={mergedRef}
        role="radiogroup"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex",
          orientation === "vertical"
            ? "flex-col gap-[var(--v-spacing-sm)]"
            : "flex-row gap-[var(--v-spacing-lg)]",
          override?.styles?.root,
          className,
        )}
        data-v-size={size}
        {...restProps}
      >
        {children}
      </div>
    </RadioGroupProvider>
  );
});

VRadioGroup.displayName = "VRadioGroup";

// ─────────────────────────────────────────
// VRadio
// ─────────────────────────────────────────

/**
 * Labelled radio; must sit inside a VRadioGroup.
 *
 * @example
 * <VRadio value="option1" label="Option 1" sublabel="Billed monthly" />
 */
const VRadio = forwardRef<HTMLInputElement, VRadioProps>((props, ref) => {
  const ctx = useRadioGroup();
  const override = useComponentOverride("VRadio");

  const {
    // 3. Content
    label,
    value,
    sublabel,
    // 8. State
    disabled: disabledProp = false,
    // 10. Advanced
    id: idProp,
    className,
    ...restProps
  } = props;

  const autoId = useId();
  const radioId = idProp ?? autoId;

  const isDisabled = disabledProp || ctx.disabled;
  const isChecked = ctx.value === value;

  const handleChange = (_e: ChangeEvent<HTMLInputElement>) => {
    ctx.onValueChange(value);
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-[var(--v-spacing-sm)]",
        isDisabled && "opacity-50 pointer-events-none",
        override?.styles?.root,
        className,
      )}
    >
      <span
        className={cn(
          "relative inline-flex items-center justify-center",
          touchTargetSizeMap[ctx.size],
        )}
      >
        <input
          ref={ref}
          id={radioId}
          type="radio"
          name={ctx.name}
          value={value}
          checked={isChecked}
          onChange={handleChange}
          disabled={isDisabled}
          data-roving-item
          data-radio-value={value}
          className="peer sr-only"
          {...restProps}
        />
        <span
          className={cn(
            "flex items-center justify-center rounded-full border transition-all duration-150",
            "border-[var(--v-input)]",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--v-ring)] peer-focus-visible:ring-offset-2",
            !isDisabled &&
              "peer-hover:border-[var(--v-primary)] peer-hover:scale-110 peer-active:scale-95",
            isChecked && "border-[var(--v-primary)]",
            radioSizeMap[ctx.size],
            override?.styles?.radio,
          )}
          aria-hidden="true"
        >
          {isChecked && (
            <span className={cn("rounded-full bg-[var(--v-primary)]", dotSizeMap[ctx.size])} />
          )}
        </span>
      </span>

      {(label || sublabel) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={radioId}
              className={cn(
                "cursor-pointer select-none text-[var(--v-foreground)]",
                labelSizeMap[ctx.size],
                isDisabled && "cursor-default",
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
});

VRadio.displayName = "VRadio";

export { VRadioGroup, VRadio };
