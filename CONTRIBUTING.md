# Contributing

Thank you for helping improve this repository. It publishes `@volo-uti/volo-web-ui` (React components, hooks, theme, providers) and keeps its Storybook catalog.

By taking part you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md). The ideas behind the choices made here are in [PRINCIPLES.md](PRINCIPLES.md).

## Setup

1. Install the Node version in `.nvmrc` (for example with `nvm use`). This is only for working on the repository; the published package declares no `engines`, and consumers can run older Node versions.
2. Install the pnpm version named by `packageManager` in `package.json`. pnpm picks it up automatically.
3. Install dependencies:

   ```bash
   pnpm install
   ```

Tool and dependency versions live in the manifests (`.nvmrc`, `package.json`, `pnpm-workspace.yaml`) and nowhere else, so always read them there.

## The gate

One command decides whether a change is ready. Run it before every pull request:

```bash
pnpm check
```

It runs formatting, lint (warnings count as failures), typecheck, the design-token, CSS-variable, index and docs checks, tests, the build and a check of the built output. A change is done when `pnpm check` passes. The `pre-push` hook runs it for you, and on `main` and `develop` it runs `pnpm verify`, which runs the same gate in a clean Docker container. On Windows, work inside WSL2.

Other commands you will use:

```bash
pnpm index        # regenerate the agent index and docs/
pnpm tokens       # regenerate tokens.generated.css from the DTCG sources
pnpm storybook    # open the component catalog at http://localhost:6006
```

## Project structure

| Path        | What it holds                                                                  |
| ----------- | ------------------------------------------------------------------------------ |
| `src/`      | `@volo-uti/volo-web-ui`: components, hooks, theme and providers                |
| `docs/`     | Generated docs of the public API, shipped in the package                       |
| `stories/`  | A catalog for people to browse the components; it is not shipped               |
| `scripts/`  | Repository checks and generators used by `pnpm check` and `pnpm index`         |
| `AGENTS.md` | The rules that agents and humans follow, plus a generated index of what exists |

## Conventions that matter

`AGENTS.md` holds the full rules; the points below are the ones a contributor most often needs.

- Look for an existing component before writing a new one. The generated index at the bottom of `AGENTS.md` lists everything exported.
- Files and folders are `v-` plus kebab-case, components are `V` plus PascalCase, and CSS variables use the `--v-` prefix.
- Every export has a JSDoc comment. Its first sentence (at most 90 characters) becomes the index line and the generated docs. `check:index` and `check:docs` fail without it.
- Do not edit generated files by hand: the blocks between `BEGIN`/`END` markers in `AGENTS.md`, `docs/`, and `*.generated.css`. Run `pnpm index` or the `tokens` script instead. Token sources are the `*.tokens.json` files (DTCG format) under `src/theme/tokens`.
- Use only CSS variables that are defined. `check:css-vars` enforces it.
- Do not add external UI libraries. Components are built from React and Tailwind CSS, and class names are merged with `cn()`.
- Put text in `localeText` through `useLocaleText` instead of hard-coding strings in components.
- Write tests next to the source as `*.test.tsx` using vitest, Testing Library and jest-axe.
- Stories do not hand-write `argTypes`; the catalog reads them from types and JSDoc.
- A component that replaces a native element belongs in `rawElementReplacements` in `eslint.mjs`, so lint can point people to it.
- Code style is set by Prettier and ESLint. `pnpm fmt` fixes formatting. The `.editorconfig` file covers the rest.

Skills for common tasks (adding a component, updating dependencies) are in `.agents/skills/`.

## Pull requests

1. Fork the repository and create a branch from the default branch.
2. Make one focused change.
3. Run `pnpm check` and make sure it passes with zero warnings.
4. Commit with [Conventional Commits](https://www.conventionalcommits.org/) in English, for example `feat(ui): add VSplitButton` or `fix(ui): keep focus inside VDialog`.
5. Open a pull request and fill in the template. Explain what changed and why.

Documentation, code comments and commit messages are written in English.

## Reporting bugs and requesting features

Use the issue forms: choose **Bug report** or **Feature request** under the Issues tab. Include the version, what you expected, what happened, and the smallest example that shows it.

Do not report security problems in public issues. Follow [SECURITY.md](SECURITY.md) instead.
