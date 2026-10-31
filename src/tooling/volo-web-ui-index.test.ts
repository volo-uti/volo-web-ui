import { afterEach, describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const BIN = resolve(__dirname, "../../bin/volo-web-ui-index.mjs");
const dirs: string[] = [];

function run(agents: string | null, args: string[] = []) {
  const cwd = mkdtempSync(join(tmpdir(), "volo-index-"));
  dirs.push(cwd);
  if (agents !== null) writeFileSync(join(cwd, "AGENTS.md"), agents);
  const result = spawnSync("node", [BIN, ...args], { cwd, encoding: "utf8" });
  const file = join(cwd, "AGENTS.md");
  return { ...result, text: () => readFileSync(file, "utf8") };
}

const count = (text: string, needle: string) => text.split(needle).length - 1;

afterEach(() => {
  for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true });
});

describe("volo-web-ui-index", () => {
  it("appends one block to an AGENTS.md without one", () => {
    const result = run("# Product\n");

    expect(result.status).toBe(0);
    expect(count(result.text(), "<!-- BEGIN:volo-web-ui-index -->")).toBe(1);
    expect(result.text().startsWith("# Product")).toBe(true);
  });

  it("refuses a BEGIN marker without its END instead of adding a second block", () => {
    const result = run("# Product\n\n<!-- BEGIN:volo-web-ui-index -->\nhalf a block\n");

    expect(result.status).toBe(1);
    expect(result.stderr).toMatch(/unmatched BEGIN/);
  });

  it("passes --check after a write", () => {
    const first = run("# P\n");
    const check = spawnSync("node", [BIN, "--check"], {
      cwd: join(dirs[0] as string),
      encoding: "utf8",
    });

    expect(first.status).toBe(0);
    expect(check.status).toBe(0);
  });
});
