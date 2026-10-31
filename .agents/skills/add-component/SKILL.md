---
name: add-component
description: "Adds a React component to @volo-uti/volo-web-ui: look it up in the index first, then follow the steps for files, exports, story, raw-element rule, index and gate. Use when building a new UI component."
---

# Add a component

Replace `<category>` and `v-x`. The rules are in `AGENTS.md`.

1. Look in the index in `AGENTS.md` first. If nothing fits, say what you looked for, then add one.
2. Create `index.ts`, `v-x.tsx`, `v-x.types.ts` and `v-x.test.tsx` in `src/components/<category>/v-x/`. Give every export a JSDoc first sentence (at most 90 characters).
3. Add the export to the category `index.ts` and to `src/index.ts`.
4. Write the story in `stories/components/<category>/v-x.stories.tsx`. Do not hand-write `argTypes`.
5. If the component replaces a raw element (`<button>` and so on), add a line to `rawElementReplacements` in `eslint.mjs`.
6. Run `pnpm index` to regenerate the index and `docs/`.
7. Make `pnpm check` pass.
