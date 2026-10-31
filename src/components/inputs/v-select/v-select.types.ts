import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import type { VSize } from "../../../lib";

/** Context value shared between VSelect and its parts. */
export interface VSelectContextValue {
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  multiple: boolean;
  size: VSize;
  disabled: boolean;
  triggerId: string;
  contentId: string;
  readOnly: boolean;
  loading: boolean;
  error: boolean;
  maxSelection?: number;
  placeholder?: string;
  describedBy?: string;
  required?: boolean;
  hasLabel?: boolean;
}

/**
 * Props of VSelect.
 *
 * Values are strings only, so map option values to objects yourself for complex data.
 */
export interface VSelectProps {
  // ── 2. Visual ──
  /**
   * Component size.
   *
   * @default 'md'
   */
  size?: VSize;
  // ── 3. Content ──
  /** Selected value (controlled); an array when `multiple`. */
  value?: string | string[];
  /**
   * Initially selected value (uncontrolled).
   *
   * @default '' ('[]' when `multiple`)
   */
  defaultValue?: string | string[];
  /**
   * Allows several items to be selected; the value is then a string array.
   *
   * @default false
   */
  multiple?: boolean;
  /** Most items that can be selected in `multiple` mode; the other items are disabled once reached. */
  maxSelection?: number;
  /** Label above the select. */
  label?: string;
  /** Text shown while nothing is selected; defaults to the locale text. */
  placeholder?: string;
  /** A VSelectTrigger and a VSelectContent. */
  children?: ReactNode;
  // ── 5. Header/Meta ──
  /**
   * Marks the field as required.
   *
   * @default false
   */
  required?: boolean;
  /** Character of the required mark. */
  requiredMark?: string;
  /** Tooltip next to the label. */
  tooltip?: ReactNode;
  /** Extra info on the right of the header. */
  more?: ReactNode;
  // ── 6. Footer/Messages ──
  /** Helper text below the select. */
  helper?: ReactNode;
  /**
   * Error state; shows `errorText`.
   *
   * @default false
   */
  error?: boolean;
  /** Message shown in the error state. */
  errorText?: ReactNode;
  /**
   * Success state; shows `successText`.
   *
   * @default false
   */
  success?: boolean;
  /** Message shown in the success state. */
  successText?: ReactNode;
  /** Always-visible note below the message. */
  extra?: ReactNode;
  // ── 7. Layout ──
  /**
   * Stretches the select to the full width.
   *
   * @default false
   */
  fullWidth?: boolean;
  // ── 8. State ──
  /**
   * Disables the select.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Keeps the value readable but blocks opening the list.
   *
   * @default false
   */
  readOnly?: boolean;
  /**
   * Shows a spinner in the trigger.
   *
   * @default false
   */
  loading?: boolean;
  // ── 9. Callbacks ──
  /** Called with the new value (an array when `multiple`) when the user picks an item. */
  onValueChange?: (value: string | string[]) => void;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}

/** Props of VSelectTrigger. */
export interface VSelectTriggerProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  // ── 3. Content ──
  /** What the trigger shows, usually the selected item's label. */
  children?: ReactNode;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}

/** Props of VSelectContent. */
export interface VSelectContentProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  // ── 3. Content ──
  /** The VSelectItem, VSelectGroup and VSelectLabel entries. */
  children?: ReactNode;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}

/** Props of VSelectItem. */
export interface VSelectItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  // ── 3. Content ──
  /** Value reported when this item is picked. */
  value: string;
  /** Label of the item. */
  children?: ReactNode;
  // ── 8. State ──
  /**
   * Disables this item.
   *
   * @default false
   */
  disabled?: boolean;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}

/** Props of VSelectGroup. */
export interface VSelectGroupProps extends HTMLAttributes<HTMLDivElement> {
  // ── 3. Content ──
  /** A VSelectLabel followed by its items. */
  children?: ReactNode;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}

/** Props of VSelectLabel. */
export interface VSelectLabelProps extends HTMLAttributes<HTMLDivElement> {
  // ── 3. Content ──
  /** Text of the group heading. */
  children?: ReactNode;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}
