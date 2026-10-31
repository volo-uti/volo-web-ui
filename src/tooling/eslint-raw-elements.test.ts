import { describe, expect, it } from "vitest";
import { Linter } from "eslint";
import { restrictRawElements } from "../../eslint.mjs";

function messages(code: string, extra?: Record<string, string>): string[] {
  const linter = new Linter();
  const results = linter.verify(
    code,
    [
      {
        files: ["**/*.jsx"],
        languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
        ...restrictRawElements(extra),
      },
    ],
    { filename: "sample.jsx" },
  );
  return results.map((r) => r.message);
}

describe("restrictRawElements", () => {
  it("names VTextField for a plain input", () => {
    expect(messages("const a = <input />;")).toEqual([expect.stringContaining("VTextField")]);
    expect(messages('const a = <input type="text" />;')).toEqual([
      expect.stringContaining("VTextField"),
    ]);
  });

  it.each(["file", "hidden", "submit", "reset", "button", "image", "color"])(
    "does not demand VTextField for input type=%s",
    (type) => {
      expect(messages(`const a = <input type="${type}" />;`)).toEqual([]);
      expect(messages(`const a = <input type={"${type}"} />;`)).toEqual([]);
    },
  );

  it("names the typed replacement for checkbox, radio and range", () => {
    expect(messages('const a = <input type="checkbox" />;')).toEqual([
      expect.stringContaining("VCheckbox"),
    ]);
    expect(messages('const a = <input type="radio" />;')).toEqual([
      expect.stringContaining("VRadio"),
    ]);
    expect(messages('const a = <input type="range" />;')).toEqual([
      expect.stringContaining("VSlider"),
    ]);
  });

  it("recognises a type written as a literal in braces", () => {
    expect(messages('const a = <input type={"checkbox"} />;')).toEqual([
      expect.stringContaining("VCheckbox"),
    ]);
  });

  it("still flags the other raw elements", () => {
    expect(messages("const a = <button />;")).toEqual([expect.stringContaining("VButton")]);
    expect(messages("const a = <a />;")).toEqual([expect.stringContaining("VLink")]);
    expect(messages("const a = <img />;")).toEqual([expect.stringContaining("VImage")]);
  });

  it("lets the caller add or override messages", () => {
    expect(messages("const a = <img />;", { img: "Use Pic." })).toEqual(["Use Pic."]);
  });
});
