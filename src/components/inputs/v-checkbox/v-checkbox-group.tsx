"use client";

import { forwardRef } from "react";
import { cn } from "../../../lib";
import type { VSize } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useControllable } from "../../../hooks/use-controllable";
import { VCheckbox } from "./v-checkbox";
import type { VCheckboxGroupProps } from "./v-checkbox-group.types";

// ─────────────────────────────────────────
// VCheckboxGroup
// ─────────────────────────────────────────

/**
 * Group of checkboxes for multi-select that tracks the list of selected values.
 *
 * @example
 * <VCheckboxGroup
 *   options={[
 *     { value: 'email', label: 'Email' },
 *     { value: 'sms', label: 'SMS' },
 *     { value: 'push', label: 'Push' },
 *   ]}
 *   value={selected}
 *   onValueChange={setSelected}
 * />
 */
const VCheckboxGroup = forwardRef<HTMLDivElement, VCheckboxGroupProps>((props, ref) => {
  const override = useComponentOverride("VCheckboxGroup");

  const {
    // 2. Visual
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    // 3. Content
    options,
    value: valueProp,
    defaultValue = [],
    // 7. Layout
    orientation = "vertical",
    // 8. State
    disabled = false,
    // 9. Callbacks
    onValueChange,
    // 10. Advanced
    className,
    ...restProps
  } = props;

  const [currentValues, setCurrentValues] = useControllable({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

  const handleItemChange = (itemValue: string, checked: boolean) => {
    const newValues = [...(currentValues ?? [])];
    if (checked) {
      if (!newValues.includes(itemValue)) {
        newValues.push(itemValue);
      }
    } else {
      const index = newValues.indexOf(itemValue);
      if (index > -1) {
        newValues.splice(index, 1);
      }
    }
    setCurrentValues(newValues);
  };

  return (
    <div
      ref={ref}
      role="group"
      className={cn(
        "flex",
        orientation === "vertical"
          ? "flex-col gap-[var(--v-spacing-sm)]"
          : "flex-row flex-wrap gap-[var(--v-spacing-sm)]",
        override?.styles?.root,
        className,
      )}
      data-v-size={size}
      {...restProps}
    >
      {options.map((option) => (
        <VCheckbox
          key={option.value}
          size={size}
          checked={currentValues?.includes(option.value) ?? false}
          onCheckedChange={(checked) => handleItemChange(option.value, checked)}
          label={option.label}
          sublabel={option.sublabel}
          disabled={disabled || option.disabled}
        />
      ))}
    </div>
  );
});

VCheckboxGroup.displayName = "VCheckboxGroup";

export { VCheckboxGroup };
