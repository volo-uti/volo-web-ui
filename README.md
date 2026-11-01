# @volo-uti/volo-web-ui

React components, hooks, theme and providers of the Volo design system. Styled on Tailwind CSS 4 with CSS-variable (`--v-*`) tokens, built with React 19 and TypeScript. The Storybook catalog for browsing the components lives in this repository.

## Install

The package is published to GitHub Packages. Map the `@volo-uti` scope to it in the product's `.npmrc`, and put a token that can read packages in your user-level `~/.npmrc`. pnpm ignores credentials written in a project `.npmrc`, and GitHub Packages asks for a token even for public packages. In CI, `actions/setup-node` with `registry-url` writes the user-level file from `NODE_AUTH_TOKEN`.

```ini
# the product's .npmrc
@volo-uti:registry=https://npm.pkg.github.com
```

```ini
# ~/.npmrc (a token with read:packages)
//npm.pkg.github.com/:_authToken=<token>
```

pnpm waits `minimumReleaseAge` before it installs a new release. List the scope in the product's `pnpm-workspace.yaml` so releases of these packages install at once:

```yaml
minimumReleaseAgeExclude:
  - "@volo-uti/*"
```

```bash
pnpm add @volo-uti/volo-web-ui
```

Peer dependencies: `react ^19` · `react-dom ^19` · `tailwindcss ^4`.

## Using it in a product

Run the index step below before you plan or write any UI. It is what tells a coding agent which components already exist, so it does not rebuild them.

1. **Tokens and source path**: import the tokens in the app's global CSS and add `@source` so Tailwind finds the component classes (the path is relative to the CSS file).

   ```css
   @import "tailwindcss";
   @source '../node_modules/@volo-uti/volo-web-ui/dist';
   @import "@volo-uti/volo-web-ui/theme/tokens.css";
   ```

2. **Tailwind plugin**: turn the plugin on to use utilities such as `bg-v-primary`, `text-v-foreground`, `rounded-v-md`, `p-v-md`, `shadow-v-xs` … `shadow-v-xl` and `shadow-v-glow`.

   ```ts
   // tailwind.config.ts  (link it from CSS with `@config '../tailwind.config.ts';`)
   import { voloPlugin } from "@volo-uti/volo-web-ui/tailwind-plugin";

   export default { plugins: [voloPlugin()] };
   ```

   Or load it straight from CSS, without a config file:

   ```css
   @plugin "@volo-uti/volo-web-ui/tailwind-plugin";
   ```

3. **Provider**: wrap the app root.

   ```tsx
   import { VoloProvider } from "@volo-uti/volo-web-ui";

   export function Root({ children }: { children: React.ReactNode }) {
     return <VoloProvider>{children}</VoloProvider>;
   }
   ```

   The `@volo-uti/volo-web-ui` bundle starts with `"use client"`, so you can use `VoloProvider` directly in Next.js server components (`app/layout.tsx` and so on). Function and callback props (such as functions inside `theme`) cannot be passed from server to client. If you need such values, put the provider in a `'use client'` file like `Root` above and use that in the layout.

   **One owner for the colour scheme.** `VoloProvider` sets the `dark` class, `data-v-color-scheme` and `color-scheme` on `<html>`, and stores the choice in `localStorage` under `storageKey` (`volo-color-scheme` by default). If the product already has its own theme provider or toggle, remove the provider and drive the toggle with `toggleDark` or `setColorScheme` from `useTheme`. Two owners leave the page half light and half dark, and the dark scheme then fails contrast checks.

   Something outside the page that must follow the scheme, such as a desktop app's native theme, takes the stored choice (`light`, `dark`, or `system` when nothing is stored) each time `resolvedColorScheme` changes. Do not hand it `resolvedColorScheme` itself: that pins it to light or dark, and `system` stops following the OS.

4. **Server components**: the `@volo-uti/volo-web-ui` bundle is a client bundle, so in a server component `cn`, `createTheme` and the locale text are client references that you cannot call or read, and importing them pulls the whole bundle into the client graph. Import the pure parts from `@volo-uti/volo-web-ui/core` instead. It has no `"use client"` and loads no React code.

   ```tsx
   // app/page.tsx (a server component)
   import { cn, createTheme, defaultLocaleText } from "@volo-uti/volo-web-ui/core";

   export default function Page() {
     return <p className={cn("p-4", "text-v-foreground")}>{defaultLocaleText.noData}</p>;
   }
   ```

   `@volo-uti/volo-web-ui/core` exports `cn`, `createTheme` with its types (`VThemeConfig`, `VResolvedTheme`, `VTokens` and the other token and override types), `defaultTheme`, `defaultLocaleText` with `VoloLocaleText`, `devWarning`, and the shared types `VSize`, `VColor`, `VVariant`, `VOption`, `VOrientation`, `VSide` and `VAlign`. Everything in it is also exported from `@volo-uti/volo-web-ui`, so the two never disagree. Components, hooks, providers, `ThemeContext` and `createSafeContext` stay in `@volo-uti/volo-web-ui` because they use React.

5. **Index**: write an index block into `AGENTS.md` so coding agents find the existing components, and add `--check` to the product's `check` so it never goes stale. Run it again after upgrading dependencies.

   ```bash
   pnpm exec volo-web-ui-index           # writes the volo-web-ui-index block in ./AGENTS.md (appends it if missing)
   pnpm exec volo-web-ui-index --check   # exits 1 if the block is missing or stale
   ```

   The index has `name|description` lines under `[section]` heading lines. Each entry's doc is `node_modules/@volo-uti/volo-web-ui/docs/<section>/<name>.md` (props table and examples). `[.]` is the docs folder itself.

6. **ESLint**: merge in the rule that points to the replacement component when someone uses a raw element (`<button>` and so on).

   ```js
   // eslint.config.mjs
   import { restrictRawElements } from "@volo-uti/volo-web-ui/eslint";

   export default [
     // ...
     {
       files: ["src/**/*.tsx"],
       ...restrictRawElements({ img: "Use VImage from @volo-uti/volo-web-ui." }),
     },
   ];
   ```

   Rule options in flat config are not merged: a separate `no-restricted-syntax` for the same `files` overrides this rule. To block more elements in a product, pass them as the argument of `restrictRawElements(extra)` as above. The default list is available as `rawElementReplacements`.

   If the product's config already has a `no-restricted-syntax` rule for those files (its own raw elements, or other selectors), do not add a second one: spread `rawElementReplacements` into the product's replacement map so one rule keeps every selector. Its keys are tag names or full `JSXOpeningElement` selectors, so the product's rule uses a key that starts with `JSXOpeningElement` as the selector itself.

   ```js
   import { rawElementReplacements as voloReplacements } from "@volo-uti/volo-web-ui/eslint";

   const rawElementReplacements = { ...voloReplacements, ...productReplacements };
   const selector = (key) =>
     key.startsWith("JSXOpeningElement") ? key : `JSXOpeningElement[name.name='${key}']`;
   ```

## When something is missing

If a component almost fits, try its props and variants first. If one detail still cannot be done, write only that detail by hand in the product, mark it `// TODO(library: <what is missing>)` with what you tried, and open an issue in this repository. Do not copy or rebuild the whole component. When the package gets the detail, upgrade it and delete the marker. Search for `TODO(library:` to see what is still open.

## Working on this repository

Working on this repository needs Node 26 or newer (the version in `.nvmrc`) and the pnpm named by `packageManager`. Using the published package does not: it declares no `engines`, and its built output does not need Node 26. Read `AGENTS.md` before changing anything.

| Path      | What it holds                                                                             |
| --------- | ----------------------------------------------------------------------------------------- |
| `src`     | The library: components, hooks, theme and providers                                       |
| `docs`    | One generated doc per component or source file, and `index.txt`; `pnpm index` writes them |
| `stories` | The Storybook catalog (`pnpm storybook`); it is for people, not shipped                   |
| `bin`     | `volo-web-ui-index`, which writes the index block into a product                          |
| `scripts` | The generators and the checks behind `pnpm check`                                         |

### Check

```bash
pnpm check    # format, lint, typecheck, test, build and every other gate
pnpm verify   # the same gate in a clean Docker container (needs Docker)
```

Tests run locally, not on a remote CI. The `pre-push` hook runs `pnpm check`, and `pnpm verify` when you push `main` or `develop`. On Windows, use WSL2 and run everything inside it.

## Publishing

Push a tag named `v<version>`, where `<version>` equals `version` in `package.json`. `.github/workflows/publish.yml` then builds the package and publishes it to GitHub Packages with the workflow's own `GITHUB_TOKEN`. It posts the start and the result to Slack when the `SLACK_BOT_TOKEN` secret and the `SLACK_CICD_CHANNEL` variable are set. Tests do not run there: the `pre-push` hook runs `pnpm verify` before the code leaves your machine.

## Contributing

Contributions are welcome. [CONTRIBUTING.md](CONTRIBUTING.md) explains how to set up, run the gate and open a pull request. Everyone taking part is expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Please report vulnerabilities privately, as described in [SECURITY.md](SECURITY.md). Do not open a public issue for them.

## Principles

[PRINCIPLES.md](PRINCIPLES.md) lists the principles this repository follows, why, and which tool enforces each one.

## License

[MIT](LICENSE)
