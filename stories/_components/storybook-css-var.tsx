import React from "react";
import { useCssVarValue } from "./use-css-var-value";

export interface StorybookCssVarProps {
  /** CSS variable to read, e.g. `--v-spacing-md`. */
  name: string;
  /** Shown instead of the resolved value. */
  display?: string;
  className?: string;
}

/** Monospace cell text showing the resolved value of a CSS variable. */
export function StorybookCssVar({ name, display, className }: StorybookCssVarProps) {
  const { ref, value } = useCssVarValue(name);
  return (
    <span ref={ref} className={className ?? "text-xs font-mono text-[var(--v-foreground)]"}>
      {display ?? value}
    </span>
  );
}

/** Bold monospace label used in the first column of token tables. */
export function StorybookTokenName({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-bold font-mono text-[var(--v-foreground)]">{children}</span>;
}
