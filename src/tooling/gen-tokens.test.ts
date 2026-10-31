import { describe, expect, it } from "vitest";
import { hexToRgba, shadowToCSS, validateTokenOutput } from "../../scripts/lib/tokens.mjs";

describe("shadowToCSS", () => {
  const shadow = { offsetX: "0px", offsetY: "1px", blur: "2px", spread: "0px" };

  it("converts 8-digit hex with alpha", () => {
    expect(shadowToCSS({ ...shadow, color: "#00000040" })).toBe(
      "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
    );
  });

  it("expands 3- and 4-digit hex instead of producing NaN", () => {
    expect(hexToRgba("#fff")).toBe("rgba(255, 255, 255, 1)");
    expect(hexToRgba("#f008")).toBe("rgba(255, 0, 0, 0.53)");
  });

  it("rejects a colour that is not hex", () => {
    expect(() => hexToRgba("red")).toThrow(/Invalid shadow colour/);
    expect(() => hexToRgba("#12345")).toThrow(/Invalid shadow colour/);
  });
});

describe("validateTokenOutput", () => {
  it("accepts sound output", () => {
    expect(validateTokenOutput(["  --v-a: 1px;", "  /* c */"], ["  --v-a: 2px;"])).toEqual([]);
  });

  it("reports undefined, NaN and object values", () => {
    const problems = validateTokenOutput(
      ["  --v-a: undefined;", "  --v-b: rgba(1, NaN, 3, 1);", "  --v-c: [object Object];"],
      [],
    );
    expect(problems).toHaveLength(3);
  });

  it("reports an alias that was not resolved", () => {
    expect(validateTokenOutput(["  --v-a: {color.palette.blue};"], [])).toHaveLength(1);
  });

  it("reports a dark variable without a light counterpart", () => {
    const problems = validateTokenOutput(["  --v-a: 1px;"], ["  --v-a: 2px;", "  --v-typo: 3px;"]);
    expect(problems).toEqual([expect.stringContaining("--v-typo")]);
  });
});
