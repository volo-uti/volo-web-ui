/**
 * Helpers of gen-tokens.mjs that can be tested without writing files.
 */

/**
 * Convert a hex colour (3, 4, 6 or 8 digits) to `rgba(r, g, b, a)`.
 * @param {string} color
 * @returns {string}
 */
export function hexToRgba(color) {
  if (typeof color !== "string") throw new Error(`Invalid shadow colour: ${String(color)}`);
  let hex = color.replace(/^#/, "");
  if (!/^[0-9a-fA-F]+$/.test(hex) || ![3, 4, 6, 8].includes(hex.length)) {
    throw new Error(`Invalid shadow colour "${color}": use #rgb, #rgba, #rrggbb or #rrggbbaa`);
  }
  if (hex.length <= 4) {
    hex = [...hex].map((c) => c + c).join("");
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) / 255 : 1;
  return `rgba(${r}, ${g}, ${b}, ${parseFloat(a.toFixed(2))})`;
}

/**
 * Convert shadow token value to CSS box-shadow shorthand.
 * @param {object} val - { color, offsetX, offsetY, blur, spread }
 * @returns {string}
 */
export function shadowToCSS(val) {
  return `${val.offsetX} ${val.offsetY} ${val.blur} ${val.spread} ${hexToRgba(val.color)}`;
}

const BAD_VALUE = /undefined|NaN|\[object|\{[A-Za-z][\w.-]*\}/;

/**
 * Names declared by generated lines like `  --v-x: value;`.
 * @param {string[]} lines
 * @returns {Map<string, string>}
 */
function declarations(lines) {
  const map = new Map();
  for (const line of lines) {
    const m = /^\s*(--[\w-]+):\s*(.*);$/.exec(line);
    if (m) map.set(m[1], m[2]);
  }
  return map;
}

/**
 * Find problems in the generated variables that a plain "is the file up to date" check misses.
 *
 * - a value that contains `undefined`, `NaN`, `[object` or an unresolved `{alias}`
 * - a dark variable that has no light counterpart (a misspelled name)
 *
 * @param {string[]} rootLines - generated `:root` lines.
 * @param {string[]} darkLines - generated `.dark` lines.
 * @returns {string[]} one message per problem; empty when the output is sound.
 */
export function validateTokenOutput(rootLines, darkLines) {
  const root = declarations(rootLines);
  const dark = declarations(darkLines);
  const problems = [];
  for (const [scope, map] of [
    [":root", root],
    [".dark", dark],
  ]) {
    for (const [name, value] of map) {
      if (value.trim() === "" || BAD_VALUE.test(value)) {
        problems.push(`${scope} ${name}: invalid value "${value}"`);
      }
    }
  }
  for (const name of dark.keys()) {
    if (!root.has(name)) {
      problems.push(`.dark ${name}: no light value in :root (misspelled name?)`);
    }
  }
  return problems;
}
