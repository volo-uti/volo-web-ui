import type { HTMLAttributes, ReactNode } from "react";
import type { VOrientation } from "../../../lib";

/** One step of a VStepper. */
export interface VStep {
  /** Step label. */
  label: ReactNode;
  /** Secondary text under the label. */
  description?: ReactNode;
  /** Icon shown in the circle instead of the step number. */
  icon?: ReactNode;
  /**
   * Marks the label as optional.
   * @default false
   */
  optional?: boolean;
  /**
   * Shows the step in the error style.
   * @default false
   */
  error?: boolean;
  /**
   * Whether the step cannot be chosen.
   * @default false
   */
  disabled?: boolean;
}

/** Props of VStepper. */
export interface VStepperProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> {
  /** Steps in order. */
  steps: VStep[];
  /** Active step index, 0-based (controlled). */
  value?: number;
  /**
   * Initial active step when `value` is not given.
   * @default 0
   */
  defaultValue?: number;
  /**
   * Layout direction.
   * @default "horizontal"
   */
  orientation?: VOrientation;
  /**
   * Whether labels sit below the circles (horizontal only).
   * @default false
   */
  alternativeLabel?: boolean;
  /**
   * Shows only circles and connectors, without labels.
   * @default false
   */
  compact?: boolean;
  /** Called with the pressed step index; when given, steps become buttons. */
  onValueChange?: (index: number) => void;
}
