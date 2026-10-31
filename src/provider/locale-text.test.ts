import { describe, expect, it } from "vitest";
import { defaultLocaleText, type VoloLocaleText } from "./locale-text";

/** Every key of the VoloLocaleText interface */
const allKeys: (keyof VoloLocaleText)[] = [
  "noData",
  "noResults",
  "loading",
  "autocompleteNoResults",
  "tableNoData",
  "avatarGroupOverflow",
  "avatarGroupLabel",
  "chipRemove",
  "textFieldClear",
  "alertClose",
  "toastDismiss",
  "popoverClose",
  "paginationLabel",
  "paginationPrevious",
  "paginationNext",
  "paginationFirst",
  "paginationLast",
  "breadcrumbLabel",
  "stepperProgress",
  "stepperOptional",
  "pageIndicatorPage",
  "pageIndicatorLabel",
  "bottomNavLabel",
  "commandPlaceholder",
  "commandNoResults",
];

describe("locale-text", () => {
  describe("defaultLocaleText (English)", () => {
    it("defines every key", () => {
      for (const key of allKeys) {
        expect(defaultLocaleText[key]).toBeDefined();
      }
    });

    it("has no empty string values", () => {
      const stringKeys = allKeys.filter((k) => typeof defaultLocaleText[k] === "string");
      for (const key of stringKeys) {
        expect(defaultLocaleText[key]).not.toBe("");
      }
    });

    it("has working function values", () => {
      const autocomplete = defaultLocaleText.autocompleteNoResults;
      if (typeof autocomplete === "function") {
        expect(autocomplete("test")).toBe('No results for "test"');
        expect(autocomplete("")).toBe("No results found");
      }

      expect(defaultLocaleText.avatarGroupOverflow(3)).toBe("+3 more");
      expect(defaultLocaleText.avatarGroupLabel(5)).toBe("5 avatars");
      expect(defaultLocaleText.chipRemove("Tag")).toBe("Remove Tag");
      expect(defaultLocaleText.pageIndicatorPage(3)).toBe("Page 3");
      expect(defaultLocaleText.pageIndicatorLabel(2, 5)).toBe("Page 2 of 5");
    });
  });
});
