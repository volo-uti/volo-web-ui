/**
 * Pure parts of check-css-vars.mjs: parsing declarations and references out of source text.
 */

export const VSIZES = ["xs", "sm", "md", "lg", "xl"];

const NAME = "--v-[A-Za-z0-9_-]*[A-Za-z0-9_]";

/**
 * A declaration: CSS `--v-x:`, a Tailwind arbitrary property `[--v-x:…]`, or a quoted key of an
 * object (`'--v-x': …`). A quoted name after `?` (a ternary branch) is not a declaration.
 */
export const DECL = new RegExp(
  `(?:^|[\\s{;\\[])(${NAME})\\s*:|(?:^|[{,])\\s*['"](${NAME})['"]\\s*:`,
  "gm",
);
const LITERAL = new RegExp(`['"](${NAME})['"]`, "g");
const USE = new RegExp(`var\\(\\s*(${NAME})(?![A-Za-z0-9_$-])(?!\\$\\{)`, "g");
// Template-literal names: --v-size-${size}-height
const DYNAMIC = /var\(\s*(--v-[A-Za-z0-9_-]*(?:\$\{[^}]*\}[A-Za-z0-9_-]*)+)/g;

/** Placeholders that are known to stand for a `VSize`. */
const SIZE_HOLE = /size|space/i;

/** @param {string} text */
export function declaredNames(text) {
  const names = new Set();
  for (const m of text.matchAll(DECL)) names.add(m[1] ?? m[2]);
  return names;
}

/** @param {string} text */
export function literalNames(text) {
  return new Set([...text.matchAll(LITERAL)].map((m) => m[1]));
}

/**
 * Finds the arrays like `const radiusTokens = ["none", "sm"]` in the Tailwind plugin and the
 * variable each entry stands for.
 * @param {string} text - source of tailwind-plugin.ts
 * @returns {string[]} variable names
 */
export function pluginTokenNames(text) {
  const prefixes = {
    color: "--v-",
    radius: "--v-radius-",
    shadow: "--v-shadow-",
    spacing: "--v-spacing-",
  };
  const names = [];
  for (const m of text.matchAll(/const (\w+)Tokens = \[([^\]]*)\]/g)) {
    const prefix = prefixes[m[1]];
    if (prefix === undefined) continue;
    for (const entry of m[2].matchAll(/"([^"]+)"/g)) names.push(`${prefix}${entry[1]}`);
  }
  return names;
}

/**
 * Finds the references to variables that nothing defines.
 *
 * @param {object} input
 * @param {Set<string>} input.defined - names declared by the token CSS.
 * @param {Map<string, string>} input.texts - file path to source text.
 * @param {(file: string) => boolean} [input.skipDynamic] - files whose template names are verified elsewhere.
 * @returns {{ missing: string[] }} `missing` lines are `file:line name`.
 */
export function findUndefinedVars({ defined, texts, skipDynamic = () => false }) {
  const missing = [];
  for (const [file, text] of texts) {
    const local = declaredNames(text);
    const isDefined = (name) => defined.has(name) || local.has(name);
    const lineOf = (index) => text.slice(0, index).split("\n").length;
    const where = (index) => `${file}:${lineOf(index)}`;

    // The whole text is scanned, so `var(` and the name may sit on different lines
    for (const m of text.matchAll(USE)) {
      if (!isDefined(m[1])) missing.push(`${where(m.index)} ${m[1]}`);
    }
    if (skipDynamic(file)) continue;
    for (const m of text.matchAll(DYNAMIC)) {
      const holes = [...m[1].matchAll(/\$\{([^}]*)\}/g)].map((h) => h[1]);
      if (holes.every((h) => SIZE_HOLE.test(h))) {
        for (const size of VSIZES) {
          const name = m[1].replace(/\$\{[^}]*\}/g, size);
          if (!isDefined(name)) missing.push(`${where(m.index)} ${name} (from ${m[1]})`);
        }
      } else {
        missing.push(
          `${where(m.index)} ${m[1]} (placeholder is not a size; write the names out or use a size placeholder)`,
        );
      }
    }
  }
  return { missing };
}
