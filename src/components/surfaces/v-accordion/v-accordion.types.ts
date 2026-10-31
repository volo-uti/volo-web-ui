import type { ButtonHTMLAttributes, HTMLAttributes } from "react";

/** VAccordion expansion mode: one item open at a time, or any number. */
export type VAccordionType = "single" | "multiple";

/** VAccordion visual variant: dividers only, separated cards, or one bordered box. */
export type VAccordionVariant = "default" | "separated" | "bordered";

/** VAccordion root props. */
export interface VAccordionProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> {
  /**
   * `"single"` keeps one item open, `"multiple"` allows many.
   *
   * @default 'single'
   */
  type?: VAccordionType;
  /**
   * Visual style.
   *
   * @default 'default'
   */
  variant?: VAccordionVariant;
  /** Controlled `value` of the expanded item(s); pair it with `onValueChange`. */
  value?: string | string[];
  /** `value` of the item(s) expanded initially when uncontrolled. */
  defaultValue?: string | string[];
  /** Called with the `value`s of all expanded items after the user toggles one. */
  onValueChange?: (value: string[]) => void;
}

/** VAccordionItem props. */
export interface VAccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Unique key of this item, matched against the root's `value`. */
  value: string;
  /**
   * Blocks the trigger and dims the item.
   *
   * @default false
   */
  disabled?: boolean;
}

/** VAccordionTrigger props; the native `<button>` attributes are accepted, except `disabled`, which is set on the item. */
export type VAccordionTriggerProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled">;

/** VAccordionContent props. */
export type VAccordionContentProps = HTMLAttributes<HTMLDivElement>;
