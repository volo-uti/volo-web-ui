import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  typescript: { reactDocgen: "react-docgen-typescript" },

  stories: ["../stories/**/*.stories.@(ts|tsx|mdx)"],

  addons: ["@storybook/addon-a11y", "@chromatic-com/storybook", "@storybook/addon-docs"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  viteFinal: async (config) => {
    const tailwindcss = (await import("@tailwindcss/vite")).default;
    config.plugins = [...(config.plugins || []), tailwindcss()];
    // The stories import the library by its name; read it from the source, not from a build
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "@volo-uti/volo-web-ui": fileURLToPath(new URL("../src/index.ts", import.meta.url)),
      },
    };
    return config;
  },
};

export default config;
