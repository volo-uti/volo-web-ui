import { useCallback, useRef, useState } from "react";

/** Options of useControllable. */
export interface UseControllableOptions<T> {
  /** Controlled value; when defined the hook mirrors it and never keeps its own state. */
  value?: T;
  /** Initial value of the uncontrolled state. */
  defaultValue: T;
  /** Called with the next value on every `setValue`, controlled or not. */
  onChange?: (value: T) => void;
}

/**
 * State that works both controlled and uncontrolled.
 *
 * With `value` undefined it keeps its own state; with `value` defined it follows it and only
 * reports changes through `onChange`.
 *
 * @returns `[currentValue, setValue]`.
 *
 * @example
 * const [checked, setChecked] = useControllable({ value, defaultValue: false, onChange: onCheckedChange })
 */
export function useControllable<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableOptions<T>): [T, (next: T) => void] {
  const isControlled = value !== undefined;
  const isControlledRef = useRef(isControlled);

  if (process.env.NODE_ENV !== "production") {
    if (isControlledRef.current !== isControlled) {
      console.warn(
        "useControllable: a component switched between uncontrolled and controlled. " +
          "This can cause unexpected behaviour.",
      );
    }
  }
  // Warn once per switch, not on every later render
  isControlledRef.current = isControlled;

  // Wrapped in functions so a function-valued `T` is stored as is, not called as an initializer
  const [internalValue, setInternalValue] = useState<T>(() => defaultValue);

  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) {
        setInternalValue(() => next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [currentValue, setValue];
}
