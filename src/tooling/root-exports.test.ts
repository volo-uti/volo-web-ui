import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import { appendFileSync, cpSync, mkdtempSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import * as root from "../index";

describe("root exports", () => {
  it("includes the context and the hook that the docs name", () => {
    expect(root.ThemeContext).toBeDefined();
    expect(typeof root.useButtonGroup).toBe("function");
  });

  it("covers every name a barrel exports (check-exports)", () => {
    const script = resolve(__dirname, "../../scripts/check-exports.mjs");
    const result = spawnSync("node", [script], { encoding: "utf8" });

    expect(result.stderr).toBe("");
    expect(result.status).toBe(0);
  }, 60_000);

  it("reports a name that core exports and the root does not", () => {
    // The script resolves its own ROOT, so run it against a copy of the tree with core.ts edited.
    const copy = mkdtempSync(join(tmpdir(), "volo-core-exports-"));
    try {
      const repo = resolve(__dirname, "../..");
      cpSync(join(repo, "src"), join(copy, "src"), { recursive: true });
      cpSync(join(repo, "scripts"), join(copy, "scripts"), { recursive: true });
      cpSync(join(repo, "tsconfig.json"), join(copy, "tsconfig.json"));
      symlinkSync(join(repo, "node_modules"), join(copy, "node_modules"));
      appendFileSync(join(copy, "src/core.ts"), "\nexport const onlyInCore = 1;\n");

      const result = spawnSync("node", [join(copy, "scripts/check-exports.mjs")], {
        encoding: "utf8",
      });

      expect(result.status).toBe(1);
      expect(result.stderr).toContain("Exported by src/core.ts but not by src/index.ts");
      expect(result.stderr).toContain("onlyInCore");
    } finally {
      rmSync(copy, { recursive: true, force: true });
    }
  }, 60_000);
});
