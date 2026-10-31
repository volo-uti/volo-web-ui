import { useRef, useState, useEffect } from "react";

/**
 * Hook that reads the resolved runtime value of a CSS variable.
 * getComputedStyle() is called in useEffect, so it is SSR safe.
 */
export function useCssVarValue(varName: string): {
  ref: React.RefObject<HTMLElement | null>;
  value: string;
} {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (ref.current) {
      const resolved = getComputedStyle(ref.current).getPropertyValue(varName).trim();
      setValue(resolved);
    }
  }, [varName]);

  return { ref, value };
}

/**
 * Hook that reads several CSS variable values at once.
 * Use it to read many variables from a single ref.
 */
export function useCssVarValues(varNames: string[]): {
  ref: React.RefObject<HTMLElement | null>;
  values: Record<string, string>;
} {
  const ref = useRef<HTMLElement | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});

  const key = varNames.join(",");

  useEffect(() => {
    if (ref.current) {
      const style = getComputedStyle(ref.current);
      const result: Record<string, string> = {};
      for (const name of varNames) {
        result[name] = style.getPropertyValue(name).trim();
      }
      setValues(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { ref, values };
}
