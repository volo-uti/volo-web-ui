#!/usr/bin/env node
/**
 * DTCG Token Parser for Web
 *
 * Reads tokens/*.tokens.json files and generates
 * src/theme/tokens.generated.css (CSS Custom Properties).
 *
 * Usage: node scripts/gen-tokens.mjs [--check]
 *   --check  generate in memory and fail if tokens.generated.css differs
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { shadowToCSS, validateTokenOutput } from "./lib/tokens.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, "..");
const TOKENS_DIR = join(PACKAGE_ROOT, "src", "theme", "tokens");
const OUTPUT_FILE = join(PACKAGE_ROOT, "src", "theme", "tokens.generated.css");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Read and parse a JSON token file.
 * @param {string} filename
 * @returns {object}
 */
function readTokenFile(filename) {
  return JSON.parse(readFileSync(join(TOKENS_DIR, filename), "utf-8"));
}

/**
 * Flatten nested token groups into a flat { name: tokenObj } map.
 * @param {object} obj
 * @param {string} prefix
 * @param {string|null} parentType
 * @returns {Map<string, object>}
 */
function flattenTokens(obj, prefix = "", parentType = null) {
  const result = new Map();

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    if (typeof value !== "object" || value === null) continue;

    const type = value.$type ?? parentType;

    if ("$value" in value) {
      const tokenName = prefix ? `${prefix}-${key}` : key;
      result.set(tokenName, { ...value, $type: type });
    } else {
      const newPrefix = prefix ? `${prefix}-${key}` : key;
      const groupType = value.$type ?? parentType;
      const nested = flattenTokens(value, newPrefix, groupType);
      for (const [k, v] of nested) {
        result.set(k, v);
      }
    }
  }
  return result;
}

/**
 * Convert font family array to CSS font-family string.
 * @param {string[]} families
 * @returns {string}
 */
function fontFamilyToCSS(families) {
  return families
    .map((f) => {
      // Generic families don't need quotes
      const generics = [
        "sans-serif",
        "serif",
        "monospace",
        "cursive",
        "fantasy",
        "system-ui",
        "ui-sans-serif",
        "ui-serif",
        "ui-monospace",
      ];
      if (generics.includes(f)) return f;
      // System vendor prefixes
      if (f.startsWith("-apple-")) return f;
      return `'${f}'`;
    })
    .join(", ");
}

// ---------------------------------------------------------------------------
// Main generation
// ---------------------------------------------------------------------------

function generate({ check = false } = {}) {
  const start = Date.now();

  const rootVars = [];
  const darkVars = [];

  // Helper to add a CSS variable
  const addRoot = (name, value) => rootVars.push(`  ${name}: ${value};`);
  const addDark = (name, value) => darkVars.push(`  ${name}: ${value};`);

  // ---- Colors ----
  rootVars.push("  /* Colors */");
  const colorLight = flattenTokens(readTokenFile("color.tokens.json"));
  for (const [name, token] of colorLight) {
    // color-background -> --v-background
    const cssName = `--v-${name.replace(/^color-/, "")}`;
    addRoot(cssName, token.$value);
  }

  darkVars.push("  /* Colors (dark) */");
  const colorDark = flattenTokens(readTokenFile("color-dark.tokens.json"));
  for (const [name, token] of colorDark) {
    const cssName = `--v-${name.replace(/^color-/, "")}`;
    addDark(cssName, token.$value);
  }

  // ---- Typography ----
  rootVars.push("");
  rootVars.push("  /* Typography */");
  const fontFamily = flattenTokens(readTokenFile("font-family.tokens.json"));
  for (const [name, token] of fontFamily) {
    // font-family-sans -> --v-font-sans
    const cssName = `--v-${name.replace("font-family-", "font-")}`;
    addRoot(cssName, fontFamilyToCSS(token.$value));
  }

  const fontWeight = flattenTokens(readTokenFile("font-weight.tokens.json"));
  for (const [name, token] of fontWeight) {
    // font-weight-regular -> --v-font-weight-regular
    const cssName = `--v-${name}`;
    addRoot(cssName, token.$value);
  }

  // Typography composite -> per-style CSS variables
  const typographyRaw = readTokenFile("typography.tokens.json");
  const typographyEntries = typographyRaw.typography;
  for (const [name, token] of Object.entries(typographyEntries)) {
    if (name.startsWith("$")) continue;
    const val = token.$value;
    addRoot(`--v-font-size-${name}`, val.fontSize);
    addRoot(`--v-font-weight-${name}`, val.fontWeight);
    addRoot(`--v-line-height-${name}`, val.lineHeight);
    addRoot(`--v-letter-spacing-${name}`, val.letterSpacing);
  }

  // Semantic line-height (tight, normal, relaxed)
  const lineHeight = flattenTokens(readTokenFile("line-height.tokens.json"));
  for (const [name, token] of lineHeight) {
    const cssName = `--v-line-height-${name.replace("line-height-", "")}`;
    addRoot(cssName, token.$value);
  }

  // Semantic letter-spacing (tight, normal, wide)
  const letterSpacing = flattenTokens(readTokenFile("letter-spacing.tokens.json"));
  for (const [name, token] of letterSpacing) {
    const cssName = `--v-${name}`;
    addRoot(cssName, token.$value);
  }

  // ---- Spacing ----
  rootVars.push("");
  rootVars.push("  /* Spacing */");
  const spacing = flattenTokens(readTokenFile("spacing.tokens.json"));
  for (const [name, token] of spacing) {
    const cssName = `--v-${name}`;
    addRoot(cssName, token.$value);
  }

  // ---- Radius ----
  rootVars.push("");
  rootVars.push("  /* Border Radius */");
  const radius = flattenTokens(readTokenFile("radius.tokens.json"));
  for (const [name, token] of radius) {
    const cssName = `--v-${name}`;
    addRoot(cssName, token.$value);
  }

  // ---- Shadows ----
  rootVars.push("");
  rootVars.push("  /* Shadows */");
  const shadowLight = flattenTokens(readTokenFile("shadow.tokens.json"));
  for (const [name, token] of shadowLight) {
    const cssName = `--v-${name}`;
    addRoot(cssName, shadowToCSS(token.$value));
  }

  darkVars.push("");
  darkVars.push("  /* Shadows (dark) */");
  const shadowDark = flattenTokens(readTokenFile("shadow-dark.tokens.json"));
  for (const [name, token] of shadowDark) {
    const cssName = `--v-${name}`;
    addDark(cssName, shadowToCSS(token.$value));
  }

  // ---- Animations ----
  rootVars.push("");
  rootVars.push("  /* Animations */");
  const duration = flattenTokens(readTokenFile("duration.tokens.json"));
  for (const [name, token] of duration) {
    const cssName = `--v-${name}`;
    addRoot(cssName, token.$value);
  }

  rootVars.push("");
  rootVars.push("  /* Easing */");
  const easing = flattenTokens(readTokenFile("cubic-bezier.tokens.json"));
  for (const [name, token] of easing) {
    const cssName = `--v-${name}`;
    const [a, b, c, d] = token.$value;
    addRoot(cssName, `cubic-bezier(${a}, ${b}, ${c}, ${d})`);
  }

  // ---- Transitions ----
  rootVars.push("");
  rootVars.push("  /* Transitions */");
  const transition = flattenTokens(readTokenFile("transition.tokens.json"));
  for (const [name, token] of transition) {
    const cssName = `--v-${name}`;
    const val = token.$value;
    const [ta, tb, tc, td] = val.timingFunction;
    addRoot(cssName, `${val.duration} cubic-bezier(${ta}, ${tb}, ${tc}, ${td})`);
  }

  // ---- Component Sizes ----
  rootVars.push("");
  rootVars.push("  /* Component Sizes */");
  const componentSize = flattenTokens(readTokenFile("component-size.tokens.json"));
  for (const [name, token] of componentSize) {
    // component-size-sm -> size parts
    const sizeName = name.replace("component-size-", "");
    addRoot(`--v-size-${sizeName}-height`, token.$value);

    const preset = token.$extensions?.["volo.preset"];
    if (preset) {
      addRoot(`--v-size-${sizeName}-padding-x`, preset.paddingX);
      addRoot(`--v-size-${sizeName}-padding-y`, preset.paddingY);
      addRoot(`--v-size-${sizeName}-font-size`, preset.fontSize);
      addRoot(`--v-size-${sizeName}-icon-size`, preset.iconSize);
      addRoot(`--v-size-${sizeName}-gap`, preset.gap);
      if (preset.radius) addRoot(`--v-size-${sizeName}-radius`, preset.radius);
    }
  }

  // ---- Z-Index ----
  rootVars.push("");
  rootVars.push("  /* Z-Index */");
  const zIndex = flattenTokens(readTokenFile("z-index.tokens.json"));
  for (const [name, token] of zIndex) {
    // z-index-dropdown -> --v-z-dropdown
    const cssName = `--v-z-${name.replace("z-index-", "")}`;
    addRoot(cssName, token.$value);
  }

  // ---- Borders ----
  rootVars.push("");
  rootVars.push("  /* Borders */");
  const borderData = readTokenFile("border.tokens.json");
  const borderLight = flattenTokens({ border: borderData.border });
  for (const [name, token] of borderLight) {
    const borderName = name.replace("border-", "");
    const val = token.$value;
    addRoot(`--v-border-${borderName}-width`, val.width);
    addRoot(`--v-border-${borderName}-style`, val.style);
  }

  // ---- Gradients ----
  rootVars.push("");
  rootVars.push("  /* Gradients */");
  const gradient = flattenTokens(readTokenFile("gradient.tokens.json"));
  // Lightning CSS strips keyword directions like "to bottom right".
  // Use angle equivalents to survive CSS processing.
  const directionMap = {
    "topLeft-bottomRight": "135deg",
    "topCenter-bottomCenter": "180deg",
    "topRight-bottomLeft": "225deg",
    "left-right": "90deg",
  };
  for (const [name, token] of gradient) {
    const cssName = `--v-${name}`;
    const stops = token.$value.map((s) => `${s.color} ${Math.round(s.position * 100)}%`).join(", ");
    const dir = token.$extensions?.["volo.direction"];
    const cssDir = dir ? (directionMap[`${dir.begin}-${dir.end}`] ?? "to bottom") : "to bottom";
    addRoot(cssName, `linear-gradient(${cssDir}, ${stops})`);
  }

  // A stale-file check alone would accept garbage the generator itself emitted
  const problems = validateTokenOutput(rootVars, darkVars);
  if (problems.length > 0) {
    console.error("gen-tokens: the token sources produce invalid CSS:");
    for (const problem of problems) console.error(`  ${problem}`);
    process.exit(1);
  }

  // Build CSS
  const css = `/* GENERATED BY gen-tokens.mjs -- DO NOT EDIT */
/* Source: tokens/*.tokens.json */

:root {
${rootVars.join("\n")}
}

.dark {
${darkVars.join("\n")}
}
`;

  if (check) {
    const current = existsSync(OUTPUT_FILE) ? readFileSync(OUTPUT_FILE, "utf-8") : null;
    if (current !== css) {
      console.error("tokens.generated.css is stale; run `pnpm tokens`");
      process.exit(1);
    }
    console.log("tokens.generated.css is up to date");
    return;
  }

  writeFileSync(OUTPUT_FILE, css, "utf-8");
  const elapsed = Date.now() - start;
  console.log(`Generated ${OUTPUT_FILE}`);
  console.log(
    `  ${rootVars.filter((v) => v.includes(":")).length} root vars, ${darkVars.filter((v) => v.includes(":")).length} dark vars in ${elapsed}ms`,
  );
}

generate({ check: process.argv.includes("--check") });
