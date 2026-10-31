// ESLint helpers for products that use @volo-uti/volo-web-ui.
//
// Raw elements that have a @volo-uti/volo-web-ui replacement. A new component that replaces
// a raw element adds one line here. A key is a tag name, or a full esquery selector
// (starts with `JSXOpeningElement`) for an element that is only replaced with some attribute.
// A `type` attribute whose value matches: a string (`type="radio"`) or a plain literal in braces (`type={"radio"}`).
const typeMatches = (pattern) =>
  `:matches(JSXAttribute[name.name='type'][value.value=${pattern}], JSXAttribute[name.name='type'][value.expression.value=${pattern}])`;

const inputOfType = (type) =>
  `JSXOpeningElement[name.name='input']:has(${typeMatches(`'${type}'`)})`;

// A plain `input` is a text field, unless a typed replacement exists (checkbox, radio, range) or
// the type has no replacement at all (file, hidden, submit, reset, button, image, color).
const plainInput = `JSXOpeningElement[name.name='input']:not(:has(${typeMatches("/^(checkbox|radio|range|file|hidden|submit|reset|button|image|color)$/")}))`;

export const rawElementReplacements = {
  [plainInput]:
    "Use VTextField from @volo-uti/volo-web-ui (see the @volo-uti/volo-web-ui index in AGENTS.md).",
  img: "Use VImage from @volo-uti/volo-web-ui (see the @volo-uti/volo-web-ui index in AGENTS.md).",
  hr: "Use VDivider from @volo-uti/volo-web-ui (see the @volo-uti/volo-web-ui index in AGENTS.md).",
  textarea:
    "Use VTextArea from @volo-uti/volo-web-ui (see the @volo-uti/volo-web-ui index in AGENTS.md).",
  form: "Use VForm from @volo-uti/volo-web-ui (see the @volo-uti/volo-web-ui index in AGENTS.md).",
  button:
    "Use VButton from @volo-uti/volo-web-ui (see the @volo-uti/volo-web-ui index in AGENTS.md).",
  a: "Use VLink from @volo-uti/volo-web-ui (see the @volo-uti/volo-web-ui index in AGENTS.md).",
  label:
    "Use VLabel from @volo-uti/volo-web-ui (see the @volo-uti/volo-web-ui index in AGENTS.md).",
  select:
    "Use VSelect from @volo-uti/volo-web-ui (see the @volo-uti/volo-web-ui index in AGENTS.md).",
  dialog:
    "Use VDialog from @volo-uti/volo-web-ui (see the @volo-uti/volo-web-ui index in AGENTS.md).",
  table:
    "Use VTable from @volo-uti/volo-web-ui (see the @volo-uti/volo-web-ui index in AGENTS.md).",
  progress:
    "Use VProgress from @volo-uti/volo-web-ui (see the @volo-uti/volo-web-ui index in AGENTS.md).",
  details:
    "Use VAccordion from @volo-uti/volo-web-ui (see the @volo-uti/volo-web-ui index in AGENTS.md).",
  [inputOfType("checkbox")]:
    "Use VCheckbox from @volo-uti/volo-web-ui (see the @volo-uti/volo-web-ui index in AGENTS.md).",
  [inputOfType("radio")]:
    "Use VRadio in a VRadioGroup from @volo-uti/volo-web-ui (see the @volo-uti/volo-web-ui index in AGENTS.md).",
  [inputOfType("range")]:
    "Use VSlider from @volo-uti/volo-web-ui (see the @volo-uti/volo-web-ui index in AGENTS.md).",
};

/**
 * Flat-config object that blocks raw elements and names the replacement in the message.
 *
 * Flat-config rule options do not merge: a later `no-restricted-syntax` entry replaces this
 * one. Pass the product's own raw-element messages as `extra` (they win over the defaults)
 * and keep any other `no-restricted-syntax` selectors in the same call site.
 *
 * @param {Record<string, string>} [extra] Raw tag (or full JSX selector) to message; add to or override the defaults.
 * @returns {import('eslint').Linter.Config} Flat-config object; add `files` when merging.
 *
 * @example
 * import { restrictRawElements } from '@volo-uti/volo-web-ui/eslint'
 * export default [{ files: ['src/**\/*.tsx'], ...restrictRawElements({ img: 'Use VImage.' }) }]
 */
export function restrictRawElements(extra = {}) {
  const map = { ...rawElementReplacements, ...extra };
  return {
    rules: {
      "no-restricted-syntax": [
        "error",
        ...Object.entries(map).map(([tag, message]) => ({
          selector: tag.startsWith("JSXOpeningElement")
            ? tag
            : `JSXOpeningElement[name.name='${tag}']`,
          message,
        })),
      ],
    },
  };
}
