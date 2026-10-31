import type { HTMLAttributes, ReactNode } from "react";
import type { VOrientation, VSize } from "../../../lib";

/** One option of a VCheckboxGroup. */
export interface VCheckboxGroupItem<T extends string = string> {
  /** Value reported in the selection when this option is checked. */
  value: T;
  /** Label of the option. */
  label: ReactNode;
  /** Secondary text below the label. */
  sublabel?: ReactNode;
  /** Disables only this option. */
  disabled?: boolean;
}

/** Props of VCheckboxGroup. */
export interface VCheckboxGroupProps<T extends string = string> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  // ── 2. Visual ──
  /**
   * Size of every checkbox.
   *
   * @default 'md'
   */
  size?: VSize;
  // ── 3. Content ──
  /** Options to render, one checkbox each. */
  options: VCheckboxGroupItem<T>[];
  /** Selected values (controlled). */
  value?: T[];
  /**
   * Initially selected values (uncontrolled).
   *
   * @default []
   */
  defaultValue?: T[];
  // ── 7. Layout ──
  /**
   * Direction the checkboxes are laid out in.
   *
   * @default 'vertical'
   */
  orientation?: VOrientation;
  // ── 8. State ──
  /**
   * Disables every option.
   *
   * @default false
   */
  disabled?: boolean;
  // ── 9. Callbacks ──
  /** Called with the full list of selected values when one option is toggled. */
  onValueChange?: (values: T[]) => void;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}
