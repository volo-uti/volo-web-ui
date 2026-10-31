// Checks that the built index bundles start with the "use client" directive, that the tailwind
// plugin and `@volo-uti/volo-web-ui/core` bundles do not, that core imports no React and stays small, and that
// every file the package.json points at exists.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const directive = /^(["'])use client\1;?\s*\n/;
const failures = [];

const read = (dist, file) => {
  try {
    return readFileSync(join(dist, file), "utf8");
  } catch {
    failures.push(`${file}: missing (run pnpm build first)`);
    return null;
  }
};

const uiDist = join(process.cwd(), "dist");
for (const file of ["index.js", "index.cjs"]) {
  const text = read(uiDist, file);
  if (text !== null && !directive.test(text)) {
    failures.push(`${file}: first line is not "use client"`);
  }
}

for (const file of ["tailwind-plugin.js", "tailwind-plugin.cjs"]) {
  const text = read(uiDist, file);
  if (text !== null && directive.test(text)) {
    failures.push(`${file}: must not start with "use client"`);
  }
}

// `@volo-uti/volo-web-ui/core` is read by server components: no directive, no React, no chunk of the root
// bundle, and small. Its only runtime imports are the two packages `cn` is built on.
const CORE_MAX_BYTES = 30 * 1024;
const CORE_IMPORTS = new Set(["clsx", "tailwind-merge"]);
const importSpecifier =
  /(?:\bfrom\s*|\bimport\s*\(?\s*|\brequire\(\s*)(["'])([^"']+)\1|^\s*import\s*(["'])([^"']+)\3/gm;

for (const file of ["core.js", "core.cjs"]) {
  const text = read(uiDist, file);
  if (text === null) continue;
  if (/^\s*(["'])use client\1/.test(text))
    failures.push(`${file}: must not start with "use client"`);
  const size = Buffer.byteLength(text);
  if (size > CORE_MAX_BYTES)
    failures.push(`${file}: ${size} bytes is over the ${CORE_MAX_BYTES} byte ceiling`);
  for (const match of text.matchAll(importSpecifier)) {
    const specifier = match[2] ?? match[4];
    if (
      specifier === "react" ||
      specifier.startsWith("react/") ||
      specifier.startsWith("react-dom")
    ) {
      failures.push(`${file}: imports "${specifier}"`);
    } else if (!CORE_IMPORTS.has(specifier)) {
      failures.push(
        `${file}: imports "${specifier}", which is not one of ${[...CORE_IMPORTS].join(", ")}`,
      );
    }
  }
}

// The types of core must not lean on React's types either: a server-only project may not have them.
for (const file of ["core.d.ts", "core.d.cts"]) {
  const text = read(uiDist, file);
  if (text !== null && /\bfrom\s*(["'])react(?:-dom)?(?:\/[^"']*)?\1/.test(text)) {
    failures.push(`${file}: imports types from react`);
  }
}

// Every path in main, module, types, bin and exports (conditions nested to any depth)
const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
const targets = new Set();
const collect = (value) => {
  if (typeof value === "string") {
    if (value.startsWith("./")) targets.add(value);
  } else if (value && typeof value === "object") {
    Object.values(value).forEach(collect);
  }
};
[pkg.main, pkg.module, pkg.types, pkg.bin, pkg.exports].forEach(collect);
for (const target of targets) {
  if (!existsSync(join(process.cwd(), target))) {
    failures.push(`package.json points at ${target}, which does not exist`);
  }
}

if (failures.length > 0) {
  console.error(`check:dist failed\n${failures.map((f) => `  ${f}`).join("\n")}`);
  process.exit(1);
}
console.log("check:dist: ok");
