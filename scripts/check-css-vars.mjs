#!/usr/bin/env node
/**
 * Fails when src or the storybook sources (stories, .storybook) reference a
 * `var(--v-…)` that nothing in the library defines.
 *
 * Defined names come from:
 *   - theme/tokens.generated.css and theme/tokens.css (declarations)
 *   - every '--v-…' string literal in theme/create-theme.ts (set at runtime
 *     by ThemeProvider through setProperty)
 *   - local declarations in the scanned sources (`--v-x:` in CSS, style-object
 *     keys such as '--v-x': …, or Tailwind arbitrary properties [--v-x:…]);
 *     a local declaration only counts for references in the same file
 *
 * Template names such as `var(--v-size-${size}-height)` are expanded over the
 * VSize values when the placeholder is a size or a space; any other dynamic name
 * fails. A `var(` and its name may sit on different lines. Every name that
 * create-theme.ts can set needs a default in the token CSS, and every entry of
 * the token lists in tailwind-plugin.ts must exist there.
 *
 * Usage: node scripts/check-css-vars.mjs
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
  declaredNames,
  findUndefinedVars,
  literalNames,
  pluginTokenNames,
} from "./lib/css-vars.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const UI_SRC = join(ROOT, "src");
const THEME = join(UI_SRC, "theme");
const SCAN_DIRS = [UI_SRC, join(ROOT, "stories"), join(ROOT, ".storybook")];
const SCAN_EXT = /\.(ts|tsx|js|jsx|mjs|css|mdx)$/;
const SKIP_DIRS = new Set(["node_modules", "dist", "storybook-static"]);
const SKIP_FILES = new Set(["tokens.generated.css"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (SCAN_EXT.test(name) && !SKIP_FILES.has(name)) out.push(full);
  }
  return out;
}

const defined = new Set();
const collect = (names) => {
  for (const name of names) defined.add(name);
};

for (const f of ["tokens.generated.css", "tokens.css"]) {
  collect(declaredNames(readFileSync(join(THEME, f), "utf-8")));
}
const cssDeclared = new Set(defined);

const problems = [];

// ThemeProvider sets these at runtime; each one needs a default in the token CSS
const themeSource = readFileSync(join(THEME, "create-theme.ts"), "utf-8");
for (const name of literalNames(themeSource)) {
  if (!cssDeclared.has(name))
    problems.push(`src/theme/create-theme.ts ${name} (no default in the token CSS)`);
  defined.add(name);
}

// The Tailwind plugin builds its utilities from token lists; each entry must exist in the CSS
const PLUGIN = join(UI_SRC, "tailwind-plugin.ts");
for (const name of pluginTokenNames(readFileSync(PLUGIN, "utf-8"))) {
  if (!cssDeclared.has(name))
    problems.push(`src/tailwind-plugin.ts ${name} (listed, not in the token CSS)`);
}

const files = SCAN_DIRS.flatMap((d) => walk(d));
const texts = new Map(files.map((f) => [relative(ROOT, f), readFileSync(f, "utf-8")]));
const { missing } = findUndefinedVars({
  defined,
  texts,
  skipDynamic: (file) => file === relative(ROOT, PLUGIN),
});
missing.push(...problems);

if (missing.length > 0) {
  console.error("Undefined CSS variables referenced:");
  for (const line of missing) console.error(`  ${line}`);
  process.exit(1);
}
console.log(`check-css-vars: ${defined.size} variables defined, all references resolve`);
