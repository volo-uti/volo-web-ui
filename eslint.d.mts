import type { Linter } from "eslint";

/** Raw tag (or full JSX selector) to the message that names its replacement. */
export const rawElementReplacements: Record<string, string>;

/**
 * Flat-config object that blocks raw elements and names the replacement in the message.
 *
 * @param extra - Raw tag (or full JSX selector) to message; add to or override the defaults.
 * @returns Flat-config object; add `files` when merging.
 */
export function restrictRawElements(extra?: Record<string, string>): Linter.Config;
