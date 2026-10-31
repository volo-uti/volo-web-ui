import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** True for the token part of the plugin's utilities, as in `p-v-md` or `rounded-v-lg`. */
const isVoloToken = (value: string) => value.startsWith("v-");

// Teach tailwind-merge the utilities of `@volo-uti/volo-web-ui/tailwind-plugin`, so `cn("p-v-md", "p-4")` keeps one.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      p: [{ p: [isVoloToken] }],
      px: [{ px: [isVoloToken] }],
      py: [{ py: [isVoloToken] }],
      m: [{ m: [isVoloToken] }],
      gap: [{ gap: [isVoloToken] }],
      rounded: [{ rounded: [isVoloToken] }],
      shadow: [{ shadow: [isVoloToken] }],
    },
  },
});

/**
 * Merges class names using clsx and tailwind-merge.
 * Resolves Tailwind CSS class conflicts intelligently.
 *
 * @example
 * cn('px-2 py-1', 'px-4') // → 'py-1 px-4'
 * cn('text-red-500', condition && 'text-blue-500') // → conditional merge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
