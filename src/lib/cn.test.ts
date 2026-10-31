import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("lets the later of conflicting Tailwind classes win", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("drops falsy values", () => {
    expect(cn("a", Math.random() > 2 && "b", undefined, null, "c")).toBe("a c");
  });

  it("accepts object and array syntax", () => {
    expect(cn(["a", { b: true, c: false }])).toBe("a b");
  });
});

describe("cn with the Volo plugin utilities", () => {
  it.each([
    ["p-v-md", "p-4"],
    ["p-4", "p-v-md"],
    ["px-v-lg", "px-2"],
    ["py-v-lg", "py-2"],
    ["m-v-md", "m-2"],
    ["gap-v-md", "gap-2"],
    ["rounded-v-md", "rounded-lg"],
    ["shadow-v-md", "shadow-lg"],
  ])("lets the later of %s and %s win", (first, second) => {
    expect(cn(first, second)).toBe(second);
  });

  it("keeps plugin utilities of different properties", () => {
    expect(cn("p-v-md", "gap-v-sm", "rounded-v-md", "shadow-v-md")).toBe(
      "p-v-md gap-v-sm rounded-v-md shadow-v-md",
    );
  });

  it("still merges the colour utilities of the plugin", () => {
    expect(cn("bg-v-primary", "bg-v-secondary")).toBe("bg-v-secondary");
    expect(cn("text-v-primary", "text-sm")).toBe("text-v-primary text-sm");
  });
});
