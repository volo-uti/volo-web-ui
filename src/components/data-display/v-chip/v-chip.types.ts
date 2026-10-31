import type { HTMLAttributes, ReactNode } from "react";
import type { VSize } from "../../../lib";

/** VChip visual variant. */
export type VChipVariant = "filled" | "outlined" | "filter" | "input";

/** VChip props — native `<div>` props are accepted too. */
export interface VChipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant: `filter` toggles `selected`, `input` can show a delete button.
   * @default 'filled'
   */
  variant?: VChipVariant;
  /**
   * Size variant.
   * @default 'md'
   */
  size?: VSize;
  /** Chip text label. */
  label: string;
  /** Element placed before the label. */
  leading?: ReactNode;
  /** Custom icon for the delete button (`input` variant). */
  deleteIcon?: ReactNode;
  /**
   * Disables the chip and its delete button.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the chip is selected (`filter` variant).
   * @default false
   */
  selected?: boolean;
  /** Called with the next selected state when a `filter` chip is toggled. */
  onSelectedChange?: (selected: boolean) => void;
  /** Called when the delete button is pressed; renders the button (`input` variant). */
  onDelete?: () => void;
}

/** Item definition for VChipGroup. */
export interface VChipItem<T = string> {
  /** Value reported in `onValueChange`. */
  value: T;
  /** Display text. */
  label: string;
  /** Element placed before the label. */
  leading?: ReactNode;
}

/** VChipGroup props — native `<div>` props are accepted too. */
export interface VChipGroupProps<T = string> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  /**
   * Size variant of every chip.
   * @default 'md'
   */
  size?: VSize;
  /** Chip items. */
  items: VChipItem<T>[];
  /**
   * Selected item values.
   * @default []
   */
  value?: T[];
  /**
   * Allow several chips to be selected at once.
   * @default true
   */
  allowMultiple?: boolean;
  /**
   * Horizontal gap between chips in px.
   * @default 8
   */
  spacing?: number;
  /**
   * Vertical gap between rows in px.
   * @default 8
   */
  runSpacing?: number;
  /** Called with the next selected values. */
  onValueChange?: (value: T[]) => void;
}
