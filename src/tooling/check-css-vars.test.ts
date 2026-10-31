import { describe, expect, it } from "vitest";
import { declaredNames, findUndefinedVars, pluginTokenNames } from "../../scripts/lib/css-vars.mjs";

// Built from parts so the repo scan does not read these samples as real references
const use = (name: string) => `var(${name})`;

const run = (source: string, defined: string[] = ["--v-known"], file = "a.tsx") =>
  findUndefinedVars({ defined: new Set(defined), texts: new Map([[file, source]]) }).missing;

describe("check-css-vars scanner", () => {
  it("reports a reference nothing defines", () => {
    expect(run(`x = "${use("--v-nope")}"`)).toEqual([expect.stringContaining("--v-nope")]);
    expect(run(`x = "${use("--v-known")}"`)).toEqual([]);
  });

  it("finds a reference whose name sits on the next line", () => {
    const source = ["const a = `", "  var(", "    --v-nope", "  )", "`"].join("\n");
    expect(run(source)).toEqual([expect.stringContaining("a.tsx:2 --v-nope")]);
  });

  it("fails on a template name with a placeholder that is not a size", () => {
    const source = "x = `" + use("--v-bogus-${kind}") + "`";
    expect(run(source)).toEqual([expect.stringContaining("placeholder is not a size")]);
  });

  it("expands a size or space placeholder over the VSize values", () => {
    const defined = ["xs", "sm", "md", "lg", "xl"].map((s) => `--v-spacing-${s}`);
    const source = "x = `" + use("--v-spacing-${space}") + "`";
    expect(run(source, defined)).toEqual([]);
    expect(run(source, defined.slice(1))).toHaveLength(1);
  });

  it("does not count a ternary string as a declaration", () => {
    const source = `const a = open ? "--v-local" : "x"; const b = "${use("--v-local")}";`;
    expect(run(source)).toEqual([expect.stringContaining("--v-local")]);
  });

  it("counts style-object keys and CSS declarations as local declarations", () => {
    expect(declaredNames(`const s = { "--v-a": 1, '--v-b': 2 }`)).toEqual(
      new Set(["--v-a", "--v-b"]),
    );
    expect(declaredNames(".x { --v-c: 1px; }")).toEqual(new Set(["--v-c"]));
  });
});

describe("pluginTokenNames", () => {
  it("lists the variables behind the token arrays of the plugin", () => {
    const source = `const colorTokens = ["primary", "ring"];
const radiusTokens = ["none", "sm"];
const spacingTokens = ["xs"];`;
    expect(pluginTokenNames(source)).toEqual([
      "--v-primary",
      "--v-ring",
      "--v-radius-none",
      "--v-radius-sm",
      "--v-spacing-xs",
    ]);
  });
});
