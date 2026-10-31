import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { defineConfig } from "tsup";

/** Copy CSS files to dist */
function copyCssPlugin() {
  return {
    name: "copy-css",
    buildEnd() {
      const files = [
        ["src/theme/tokens.generated.css", "dist/theme/tokens.generated.css"],
        ["src/theme/tokens.css", "dist/theme/tokens.css"],
      ] as const;
      for (const [src, dest] of files) {
        const destDir = dirname(join(process.cwd(), dest));
        mkdirSync(destDir, { recursive: true });
        copyFileSync(join(process.cwd(), src), join(process.cwd(), dest));
      }
    },
  };
}

/**
 * Put `"use client";` first in the index bundles: every part is a client part, and without it a
 * Next.js server component that imports `@volo-uti/volo-web-ui` breaks. The bundler drops a banner directive, so
 * it is prepended after the build; the source maps shift by the added line.
 */
async function prependUseClient() {
  for (const file of ["dist/index.js", "dist/index.cjs"]) {
    const path = join(process.cwd(), file);
    const text = readFileSync(path, "utf8");
    if (text.startsWith('"use client"')) continue;
    writeFileSync(path, `"use client";\n${text}`);
    const mapPath = `${path}.map`;
    if (existsSync(mapPath)) {
      const map = JSON.parse(readFileSync(mapPath, "utf8"));
      map.mappings = `;${map.mappings}`;
      writeFileSync(mapPath, JSON.stringify(map));
    }
  }
}

// Both builds write into dist/ in parallel. A per-build `clean` would let the first build's
// declaration step delete the second build's `.d.ts` files, so dist/ is emptied once, here.
rmSync(join(process.cwd(), "dist"), { recursive: true, force: true });

export default defineConfig([
  {
    entry: {
      index: "src/index.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    clean: false,
    sourcemap: true,
    treeshake: true,
    external: ["react", "react-dom", "tailwindcss"],
    esbuildOptions(options) {
      options.jsx = "automatic";
    },
    plugins: [copyCssPlugin()],
    onSuccess: prependUseClient,
  },
  {
    // `@volo-uti/volo-web-ui/core`: pure helpers for server components. It is its own build on purpose: in the
    // root build the two entries would share a chunk, and the root bundle starts with "use client".
    // No "use client" is added here, and react stays external so a stray import would show up in
    // `check:dist`.
    entry: {
      core: "src/core.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    clean: false,
    sourcemap: true,
    treeshake: true,
    external: ["react", "react-dom", "tailwindcss"],
  },
  {
    entry: {
      "tailwind-plugin": "src/tailwind-plugin.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    clean: false,
    sourcemap: true,
    external: ["tailwindcss"],
  },
]);
