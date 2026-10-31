import { describe, expect, it } from "vitest";
import { compile } from "tailwindcss";
import * as pluginModule from "./tailwind-plugin";

async function css(candidates: string[]) {
  const compiler = await compile(
    '@plugin "@volo-uti/volo-web-ui/tailwind-plugin"; @tailwind utilities;',
    {
      base: "/",
      // The Tailwind loader hands over `module.default ?? module`
      loadModule: async () => ({
        module: pluginModule.default ?? pluginModule,
        base: "/",
        path: "",
      }),
    },
  );
  return compiler.build(candidates);
}

describe("tailwind plugin", () => {
  it("has a default export for the CSS-first @plugin directive", () => {
    expect(typeof pluginModule.default.handler).toBe("function");
  });

  it("keeps the named export for a JS config", () => {
    expect(typeof pluginModule.voloPlugin().handler).toBe("function");
  });

  it("loads through @plugin and emits utilities", async () => {
    const out = await css(["bg-v-primary", "rounded-v-md", "p-v-md"]);

    expect(out).toContain("var(--v-primary)");
    expect(out).toContain("var(--v-radius-md)");
    expect(out).toContain("var(--v-spacing-md)");
  });

  it("covers the tokens that tokens.generated.css defines", async () => {
    const out = await css([
      "bg-v-disabled",
      "text-v-disabled-foreground",
      "bg-v-scrim",
      "rounded-v-xs",
      "rounded-v-xl",
      "p-v-4xl",
      "gap-v-6xl",
    ]);

    for (const name of [
      "--v-disabled",
      "--v-disabled-foreground",
      "--v-scrim",
      "--v-radius-xs",
      "--v-radius-xl",
      "--v-spacing-4xl",
      "--v-spacing-6xl",
    ]) {
      expect(out).toContain(`var(${name})`);
    }
  });
});
