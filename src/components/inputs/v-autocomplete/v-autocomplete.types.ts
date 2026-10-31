import type { InputHTMLAttributes, ReactNode } from "react";
import type { VOption, VSize } from "../../../lib";

/**
 * Props of VAutocomplete.
 *
 * Selects one item from a fixed `items` list.
 */
export interface VAutocompleteProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "value" | "defaultValue"
> {
  // ── 2. Visual ──
  /**
   * Component size.
   *
   * @default 'md'
   */
  size?: VSize;
  // ── 3. Content ──
  /** Value of the selected item (controlled). */
  value?: string;
  /**
   * Value of the initially selected item (uncontrolled).
   *
   * @default ''
   */
  defaultValue?: string;
  /** Label above the input. */
  label?: string;
  /** Text shown while the input is empty. */
  placeholder?: string;
  /** Items to suggest; those matching the typed text are listed. */
  items: VOption[];
  /**
   * Lets the user press Enter to select the typed text when it matches no item; it becomes the value.
   *
   * @default false
   */
  allowCustomValue?: boolean;
  /**
   * Decides which items match the typed text; return true to keep the item.
   *
   * @default case-insensitive "label contains query"
   */
  filterFn?: (query: string, item: VOption) => boolean;
  /** Message shown when no item matches; defaults to the locale text. */
  emptyText?: string;
  /** Renders a custom empty state in place of `emptyText`. */
  emptyRenderer?: (query: string) => ReactNode;
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
  /** Helper text below the input. */
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
   * Stretches the field to the full width.
   *
   * @default false
   */
  fullWidth?: boolean;
  // ── 8. State ──
  /**
   * Disables the input.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows a spinner in the input.
   *
   * @default false
   */
  loading?: boolean;
  /**
   * Blocks editing and opening the list; the value stays readable.
   *
   * @default false
   */
  readOnly?: boolean;
  // ── 9. Callbacks ──
  /** Called with the picked value, the custom text, or `""` when the text is emptied. */
  onValueChange?: (value: string | null) => void;
  /** Called with the typed text each time it changes. */
  onInputChange?: (query: string) => void;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}
