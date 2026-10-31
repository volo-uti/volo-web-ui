"use client";

import { forwardRef, useCallback } from "react";
import { cn } from "../../../lib";
import { devWarning } from "../../../utils/dev-warning";
import { VChip } from "./v-chip";
import type { VChipGroupProps } from "./v-chip.types";

/**
 * Row of filter VChips built from `items`, with single or multiple selection.
 *
 * Pass `aria-label` or `aria-labelledby` so the `role="group"` has an accessible name.
 *
 * @example
 * <VChipGroup
 *   items={[
 *     { value: 'flutter', label: 'Flutter' },
 *     { value: 'react', label: 'React' },
 *   ]}
 *   value={selected}
 *   onValueChange={setSelected}
 * />
 */
const VChipGroup = forwardRef<HTMLDivElement, VChipGroupProps>((props, ref) => {
  const {
    size = "md",
    items,
    value = [],
    spacing = 8,
    runSpacing = 8,
    allowMultiple = true,
    onValueChange,
    className,
    style,
    ...rest
  } = props;

  if (!rest["aria-label"] && !rest["aria-labelledby"]) {
    devWarning(
      "VChipGroup",
      "the group needs an accessible name: pass aria-label or aria-labelledby",
    );
  }

  const handleSelect = useCallback(
    (itemValue: string, selected: boolean) => {
      if (!onValueChange) return;

      if (selected) {
        if (allowMultiple) {
          onValueChange([...value, itemValue]);
        } else {
          onValueChange([itemValue]);
        }
      } else {
        onValueChange(value.filter((v) => v !== itemValue));
      }
    },
    [value, onValueChange, allowMultiple],
  );

  return (
    <div
      ref={ref}
      className={cn("v-chip-group", "flex flex-wrap", className)}
      role="group"
      {...rest}
      style={{ gap: `${runSpacing}px ${spacing}px`, ...style }}
    >
      {items.map((item) => {
        const isSelected = value.includes(item.value);
        return (
          <VChip
            key={String(item.value)}
            label={item.label}
            variant="filter"
            size={size}
            selected={isSelected}
            leading={item.leading}
            onSelectedChange={(sel) => handleSelect(String(item.value), sel)}
          />
        );
      })}
    </div>
  );
});

VChipGroup.displayName = "VChipGroup";

export { VChipGroup };
