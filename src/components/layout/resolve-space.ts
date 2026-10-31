import type { VSize } from "../../lib";

/** Space between elements: a `VSize` token, pixels as a number, or any CSS length. */
export type VSpace = VSize | number | (string & {});

const SIZES: readonly string[] = ["xs", "sm", "md", "lg", "xl"];

/** Turns a `VSpace` into a CSS length; tokens map to `var(--v-spacing-*)`. */
export function resolveSpace(space: VSpace | undefined): string | undefined {
  if (space === undefined) return undefined;
  if (typeof space === "number") return `${space}px`;
  return SIZES.includes(space) ? `var(--v-spacing-${space})` : space;
}
