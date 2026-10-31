import { afterEach, describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import ts from "typescript";
import * as core from "../core";
import * as root from "../index";

const ROOT = resolve(__dirname, "../..");
const CORE_FILE = join(ROOT, "src/core.ts");

/** Runtime (non type-only) module specifiers of one source file. */
function runtimeImports(file: string): string[] {
  const source = ts.createSourceFile(
    file,
    readFileSync(file, "utf8"),
    ts.ScriptTarget.ES2022,
    true,
  );
  const specifiers: string[] = [];
  for (const node of source.statements) {
    if (ts.isImportDeclaration(node) && !node.importClause?.isTypeOnly) {
      specifiers.push((node.moduleSpecifier as ts.StringLiteral).text);
    } else if (ts.isExportDeclaration(node) && !node.isTypeOnly && node.moduleSpecifier) {
      specifiers.push((node.moduleSpecifier as ts.StringLiteral).text);
    }
  }
  return specifiers;
}

/** Resolves `./x` to `x.ts`, `x.tsx` or `x/index.ts` next to the importer. */
function resolveLocal(from: string, specifier: string): string {
  const base = resolve(dirname(from), specifier);
  const found = [`${base}.ts`, `${base}.tsx`, join(base, "index.ts"), join(base, "index.tsx")].find(
    existsSync,
  );
  if (!found) throw new Error(`cannot resolve ${specifier} from ${from}`);
  return found;
}

/** Every file reachable from `entry` through runtime imports, with the bare packages it imports. */
function runtimeGraph(entry: string) {
  const files = new Set<string>();
  const packages = new Set<string>();
  const visit = (file: string) => {
    if (files.has(file)) return;
    files.add(file);
    for (const specifier of runtimeImports(file)) {
      if (specifier.startsWith(".")) visit(resolveLocal(file, specifier));
      else packages.add(specifier);
    }
  };
  visit(entry);
  return { files: [...files], packages: [...packages] };
}

describe("@volo-uti/volo-web-ui/core source", () => {
  it("reaches no React and no file marked as a client file", () => {
    const { files, packages } = runtimeGraph(CORE_FILE);

    expect(
      packages.filter((p) => p === "react" || p.startsWith("react/") || p === "react-dom"),
    ).toEqual([]);
    expect(packages.sort()).toEqual(["clsx", "tailwind-merge"]);
    const clients = files.filter((f) => /^\s*(["'])use client\1/.test(readFileSync(f, "utf8")));
    expect(clients).toEqual([]);
    expect(files.some((f) => f.endsWith(".tsx"))).toBe(false);
  });

  it("is not a re-export of the root or of a barrel that holds React code", () => {
    const { files } = runtimeGraph(CORE_FILE);

    expect(files).not.toContain(join(ROOT, "src/index.ts"));
    for (const barrel of ["lib", "theme", "provider", "hooks"]) {
      expect(files).not.toContain(join(ROOT, "src", barrel, "index.ts"));
    }
  });

  it("exports only names the root exports too, with the same values", () => {
    const rootValues = root as Record<string, unknown>;
    const names = Object.keys(core);

    expect(names.sort()).toEqual([
      "cn",
      "createTheme",
      "defaultLocaleText",
      "defaultTheme",
      "devWarning",
    ]);
    for (const name of names) expect(name in rootValues, name).toBe(true);
    expect(core.cn).toBe(root.cn);
    expect(core.createTheme).toBe(root.createTheme);
    expect(core.defaultLocaleText).toBe(root.defaultLocaleText);
    expect(core.devWarning).toBe(root.devWarning);
    expect(core.defaultTheme).toBe(root.defaultTheme);
  });

  it("works as plain functions and data", () => {
    expect(core.cn("px-2 py-1", "px-4", Math.abs(0) && "hidden")).toBe("py-1 px-4");
    expect(core.cn("p-v-md", "p-4")).toBe("p-4");
    expect(core.createTheme({}).cssVariables).toEqual({});
    expect(
      core.createTheme({ tokens: { colors: { primary: "#123456" } } }).cssVariables["--v-primary"],
    ).toBe("#123456");
    expect(core.defaultLocaleText.noData).toBe("No data");
  });
});

describe("package.json", () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));

  it("exposes ./core like the other entries and keeps ./package.json", () => {
    expect(pkg.exports["./core"]).toEqual({
      import: { types: "./dist/core.d.ts", default: "./dist/core.js" },
      require: { types: "./dist/core.d.cts", default: "./dist/core.cjs" },
    });
    expect(pkg.exports["./package.json"]).toBe("./package.json");
    expect(pkg.files).toContain("dist");
  });

  it("does not declare engines: Node 26 is for working on the repository, not for consumers", () => {
    expect(pkg.engines).toBeUndefined();
    expect(readFileSync(join(ROOT, ".nvmrc"), "utf8").trim()).toMatch(/^26\./);
    expect(pkg.packageManager).toMatch(/^pnpm@/);
  });
});

describe("tsup.config", () => {
  const config = readFileSync(join(ROOT, "tsup.config.ts"), "utf8");

  it("builds core on its own and prepends the directive to the root bundle only", () => {
    expect(config).toContain('core: "src/core.ts"');
    expect(config).toMatch(/for \(const file of \["dist\/index\.js", "dist\/index\.cjs"\]\)/);
    expect(config).not.toMatch(/dist\/core/);
  });
});

describe("check-dist on a core bundle", () => {
  const dirs: string[] = [];
  afterEach(() => {
    for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true });
  });

  /** A minimal package with a dist/, so the script has something to read. */
  function run(overrides: Record<string, string>) {
    const cwd = mkdtempSync(join(tmpdir(), "volo-dist-"));
    dirs.push(cwd);
    const files: Record<string, string> = {
      "index.js": '"use client";\nexport const a = 1;\n',
      "index.cjs": '"use client";\nexports.a = 1;\n',
      "tailwind-plugin.js": "export const b = 1;\n",
      "tailwind-plugin.cjs": "exports.b = 1;\n",
      "core.js": 'import { clsx } from "clsx";\nexport const cn = clsx;\n',
      "core.cjs": 'const { clsx } = require("clsx");\nexports.cn = clsx;\n',
      "core.d.ts": "export declare const cn: () => string;\n",
      "core.d.cts": "export declare const cn: () => string;\n",
      ...overrides,
    };
    mkdirSync(join(cwd, "dist"));
    for (const [name, text] of Object.entries(files)) writeFileSync(join(cwd, "dist", name), text);
    writeFileSync(join(cwd, "package.json"), JSON.stringify({ name: "x" }));
    return spawnSync("node", [join(ROOT, "scripts/check-dist.mjs")], { cwd, encoding: "utf8" });
  }

  it("passes a clean core bundle", () => {
    const result = run({});

    expect(result.stderr).toBe("");
    expect(result.status).toBe(0);
  });

  it("fails when core starts with the client directive", () => {
    const result = run({ "core.js": '"use client";\nexport const cn = 1;\n' });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('core.js: must not start with "use client"');
  });

  it.each([
    ["core.js", 'import { useState } from "react";\nexport const cn = useState;\n'],
    ["core.js", 'import "react";\nexport const cn = 1;\n'],
    ["core.cjs", 'const React = require("react");\nexports.cn = React;\n'],
    ["core.js", 'import { jsx } from "react/jsx-runtime";\nexport const cn = jsx;\n'],
  ])("fails when %s imports react", (file, text) => {
    const result = run({ [file]: text });

    expect(result.status).toBe(1);
    expect(result.stderr).toMatch(new RegExp(`${file.replace(".", "\\.")}: imports "react`));
  });

  it("fails when core pulls in a shared chunk", () => {
    const result = run({
      "core.js": 'import { x } from "./chunk-ABC.js";\nexport const cn = x;\n',
    });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('imports "./chunk-ABC.js"');
  });

  it("fails when core is over the size ceiling", () => {
    const result = run({ "core.cjs": `exports.big = "${"x".repeat(31 * 1024)}";\n` });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("core.cjs:");
    expect(result.stderr).toContain("ceiling");
  });

  it("fails when the types of core import from react", () => {
    const result = run({
      "core.d.ts": 'import type { ReactNode } from "react";\nexport type A = ReactNode;\n',
    });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("core.d.ts: imports types from react");
  });

  it("fails when core is missing", () => {
    const result = run({});
    expect(result.status).toBe(0);
    rmSync(join(dirs[0]!, "dist/core.js"));
    const again = spawnSync("node", [join(ROOT, "scripts/check-dist.mjs")], {
      cwd: dirs[0],
      encoding: "utf8",
    });

    expect(again.status).toBe(1);
    expect(again.stderr).toContain("core.js: missing");
  });
});
