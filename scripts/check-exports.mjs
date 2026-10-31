#!/usr/bin/env node
/**
 * Fails when a barrel exports a name that `@volo-uti/volo-web-ui` (src/index.ts) does not.
 *
 * The docs name types such as `VFabVariant` as prop types, so every name a barrel exports has to
 * be importable from the package root. Barrels checked: the theme, hooks, utils, provider and lib
 * folders and every category folder under src/components.
 *
 * `src/core.ts` (the entry `@volo-uti/volo-web-ui/core`) is checked the other way round: it is a subset of the
 * root, so every name it exports must also be exported by `src/index.ts`.
 *
 * Usage: node scripts/check-exports.mjs
 */

import { readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");

const barrels = ["theme", "hooks", "utils", "provider", "lib"].map((d) => join(SRC, d, "index.ts"));
for (const category of readdirSync(join(SRC, "components"), { withFileTypes: true })) {
  if (category.isDirectory()) barrels.push(join(SRC, "components", category.name, "index.ts"));
}

const configPath = join(ROOT, "tsconfig.json");
const config = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, ROOT);
const rootFile = join(SRC, "index.ts");
const coreFile = join(SRC, "core.ts");
const program = ts.createProgram([rootFile, coreFile, ...barrels], parsed.options);
const checker = program.getTypeChecker();

function exportNames(file) {
  const source = program.getSourceFile(file);
  const symbol = source && checker.getSymbolAtLocation(source);
  return symbol ? checker.getExportsOfModule(symbol).map((s) => s.getName()) : [];
}

const rootNames = new Set(exportNames(rootFile));
const missing = [];
for (const barrel of barrels) {
  for (const name of exportNames(barrel)) {
    if (!rootNames.has(name)) missing.push(`${relative(ROOT, barrel)}: ${name}`);
  }
}

const coreNames = exportNames(coreFile);
const coreMissing = coreNames.filter((name) => !rootNames.has(name));

if (coreNames.length === 0) {
  console.error("src/core.ts exports nothing; `@volo-uti/volo-web-ui/core` would be empty");
  process.exit(1);
}
if (missing.length > 0 || coreMissing.length > 0) {
  if (missing.length > 0) {
    console.error("Exported by a barrel but not by src/index.ts:");
    for (const line of missing) console.error(`  ${line}`);
  }
  if (coreMissing.length > 0) {
    console.error("Exported by src/core.ts but not by src/index.ts:");
    for (const name of coreMissing) console.error(`  ${name}`);
  }
  process.exit(1);
}
console.log(
  `check-exports: ${rootNames.size} root exports cover every barrel and the ${coreNames.length} of core`,
);
