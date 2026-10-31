"use client";

import { forwardRef, useCallback, useEffect, useId, useMemo, useRef, type ReactNode } from "react";
import { cn, createSafeContext } from "../../../lib";
import { devWarning } from "../../../utils/dev-warning";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useControllable } from "../../../hooks/use-controllable";
import { useRovingFocus } from "../../../hooks/use-roving-focus";
import type {
  VAccordionContentProps,
  VAccordionItemProps,
  VAccordionProps,
  VAccordionTriggerProps,
  VAccordionType,
  VAccordionVariant,
} from "./v-accordion.types";

// ─────────────────────────────────────────
// Accordion root context
// ─────────────────────────────────────────

interface AccordionContextValue {
  type: VAccordionType;
  variant: VAccordionVariant;
  expandedItems: string[];
  toggle: (value: string) => void;
}

const [AccordionProvider, useAccordionContext] =
  createSafeContext<AccordionContextValue>("Accordion");

// ─────────────────────────────────────────
// Accordion item context
// ─────────────────────────────────────────

interface AccordionItemContextValue {
  value: string;
  isExpanded: boolean;
  disabled: boolean;
  triggerId: string;
  contentId: string;
}

const [AccordionItemProvider, useAccordionItemContext] =
  createSafeContext<AccordionItemContextValue>("AccordionItem");

// ─────────────────────────────────────────
// Helper
// ─────────────────────────────────────────

function normalizeValue(val: string | string[] | undefined): string[] {
  if (val === undefined) return [];
  return Array.isArray(val) ? val : [val];
}

// ─────────────────────────────────────────
// VAccordion (root)
// ─────────────────────────────────────────

/**
 * Collapsible content sections; arrow keys move between triggers.
 *
 * Compose it from VAccordionItem, VAccordionTrigger and VAccordionContent.
 * The expanded items are controlled with `value` or uncontrolled with `defaultValue`.
 *
 * @example
 * <VAccordion type="single" defaultValue="item-1" onValueChange={(open) => save(open)}>
 *   <VAccordionItem value="item-1">
 *     <VAccordionTrigger>Section 1</VAccordionTrigger>
 *     <VAccordionContent>Content 1</VAccordionContent>
 *   </VAccordionItem>
 * </VAccordion>
 */
const VAccordion = forwardRef<HTMLDivElement, VAccordionProps>((props, ref) => {
  const override = useComponentOverride("VAccordion");
  const {
    // 1. Identity
    type = (override?.defaultProps?.type as VAccordionType | undefined) ?? "single",
    variant = (override?.defaultProps?.variant as VAccordionVariant | undefined) ?? "default",
    // 3. Content
    children,
    defaultValue,
    // 6. State
    value: controlledValue,
    // 7. Callbacks
    onValueChange,
    onKeyDown,
    // 8. Advanced
    className,
    ...rest
  } = props;

  if (type === "single" && Array.isArray(defaultValue) && defaultValue.length > 1) {
    devWarning("VAccordion", "single type accordion should not have multiple defaultValue items");
  }

  const normalizedDefault = normalizeValue(defaultValue);

  const [expandedItems, setExpandedItems] = useControllable<string[]>({
    value: controlledValue !== undefined ? normalizeValue(controlledValue) : undefined,
    defaultValue: normalizedDefault,
    onChange: onValueChange,
  });

  const toggle = useCallback(
    (itemValue: string) => {
      if (type === "single") {
        const next = expandedItems.includes(itemValue) ? [] : [itemValue];
        setExpandedItems(next);
      } else {
        const next = expandedItems.includes(itemValue)
          ? expandedItems.filter((v) => v !== itemValue)
          : [...expandedItems, itemValue];
        setExpandedItems(next);
      }
    },
    [type, expandedItems, setExpandedItems],
  );

  const contextValue = useMemo<AccordionContextValue>(
    () => ({ type, variant, expandedItems, toggle }),
    [type, variant, expandedItems, toggle],
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const { handleKeyDown, initRoving } = useRovingFocus(containerRef, {
    selector: ".v-accordion-trigger:not([disabled])",
    orientation: "vertical",
    loop: true,
  });

  useEffect(() => {
    initRoving();
  }, [initRoving]);

  // Merge forwarded ref and internal containerRef
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref],
  );

  const variantRootStyles: Record<VAccordionVariant, string> = {
    default: "divide-y divide-[var(--v-border)] border-y border-[var(--v-border)]",
    separated: "space-y-[var(--v-spacing-sm)]",
    bordered:
      "divide-y divide-[var(--v-border)] border border-[var(--v-border)] rounded-[var(--v-radius-md)]",
  };

  const classes = cn("v-accordion", variantRootStyles[variant], override?.styles?.root, className);

  return (
    <AccordionProvider value={contextValue}>
      <div
        ref={mergedRef}
        className={classes}
        data-v-type={type}
        data-v-variant={variant}
        {...rest}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.defaultPrevented) return;
          // Arrow, Home and End keys that bubble up from the panel content (inputs, textareas)
          // belong to that content; only the triggers take part in roving focus.
          const target = e.target as Element;
          if (!target.closest(".v-accordion-trigger")) return;
          handleKeyDown(e);
        }}
      >
        {children}
      </div>
    </AccordionProvider>
  );
});

VAccordion.displayName = "VAccordion";

// ─────────────────────────────────────────
// VAccordionItem
// ─────────────────────────────────────────

/**
 * One accordion section identified by `value`; holds a VAccordionTrigger and a VAccordionContent.
 *
 * @example
 * <VAccordionItem value="faq-1" disabled>...</VAccordionItem>
 */
const VAccordionItem = forwardRef<HTMLDivElement, VAccordionItemProps>((props, ref) => {
  const {
    // 3. Content
    children,
    value,
    // 6. State
    disabled = false,
    // 8. Advanced
    className,
    ...rest
  } = props;
  const { expandedItems, variant } = useAccordionContext();
  const isExpanded = expandedItems.includes(value);
  const autoId = useId();
  const triggerId = `${autoId}-trigger`;
  const contentId = `${autoId}-content`;

  const itemContext = useMemo<AccordionItemContextValue>(
    () => ({ value, isExpanded, disabled, triggerId, contentId }),
    [value, isExpanded, disabled, triggerId, contentId],
  );

  const classes = cn(
    "v-accordion-item",
    variant === "separated" && "border border-[var(--v-border)] rounded-[var(--v-radius-md)]",
    disabled && "opacity-50 pointer-events-none",
    className,
  );

  return (
    <AccordionItemProvider value={itemContext}>
      <div
        ref={ref}
        className={classes}
        data-v-state={isExpanded ? "open" : "closed"}
        data-v-disabled={disabled || undefined}
        {...rest}
      >
        {children}
      </div>
    </AccordionItemProvider>
  );
});

VAccordionItem.displayName = "VAccordionItem";

// ─────────────────────────────────────────
// VAccordionTrigger
// ─────────────────────────────────────────

/**
 * Button that toggles its item and shows a chevron that rotates while expanded.
 *
 * @example
 * <VAccordionTrigger>What is included?</VAccordionTrigger>
 */
const VAccordionTrigger = forwardRef<HTMLButtonElement, VAccordionTriggerProps>((props, ref) => {
  const {
    // 3. Content
    children,
    // 7. Callbacks
    onClick,
    // 8. Advanced
    className,
    ...rest
  } = props;
  const { toggle } = useAccordionContext();
  const { value, isExpanded, disabled, triggerId, contentId } = useAccordionItemContext();

  const classes = cn(
    "v-accordion-trigger",
    "flex",
    "w-full",
    "items-center",
    "justify-between",
    "py-[var(--v-spacing-lg)]",
    "px-[var(--v-spacing-sm)]",
    "text-left",
    "font-[var(--v-font-weight-medium)]",
    "text-[var(--v-foreground)]",
    "transition-all",
    `duration-[var(--v-duration-fast)]`,
    "hover:bg-[var(--v-muted)]",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[var(--v-ring)]",
    "cursor-pointer",
    className,
  );

  return (
    <button
      ref={ref}
      id={triggerId}
      type="button"
      className={classes}
      aria-expanded={isExpanded}
      aria-controls={contentId}
      {...rest}
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e);
        if (!disabled) toggle(value);
      }}
    >
      {children}
      <ChevronIcon expanded={isExpanded} />
    </button>
  );
});

VAccordionTrigger.displayName = "VAccordionTrigger";

// ─────────────────────────────────────────
// VAccordionContent
// ─────────────────────────────────────────

/**
 * Body of an accordion item (`role="region"`) that animates open and closed with the item.
 *
 * @example
 * <VAccordionContent>Everything in the Pro plan.</VAccordionContent>
 */
const VAccordionContent = forwardRef<HTMLDivElement, VAccordionContentProps>((props, ref) => {
  const {
    // 3. Content
    children,
    // 8. Advanced
    className,
    ...rest
  } = props;
  const { isExpanded, triggerId, contentId } = useAccordionItemContext();

  const wrapperClasses = cn(
    "v-accordion-content-wrapper",
    "grid",
    "transition-[grid-template-rows]",
    `duration-[var(--v-duration-normal)]`,
    `ease-[var(--v-easing-ease-in-out)]`,
    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
  );

  const innerClasses = cn("v-accordion-content", "overflow-hidden");

  const contentClasses = cn(
    "px-[var(--v-spacing-sm)]",
    "pb-[var(--v-spacing-lg)]",
    "text-[var(--v-muted-foreground)]",
    className,
  );

  return (
    <div
      id={contentId}
      className={wrapperClasses}
      role="region"
      aria-labelledby={triggerId}
      aria-hidden={!isExpanded}
      inert={!isExpanded}
    >
      <div className={innerClasses}>
        <div ref={ref} className={contentClasses} {...rest}>
          {children}
        </div>
      </div>
    </div>
  );
});

VAccordionContent.displayName = "VAccordionContent";

// ─────────────────────────────────────────
// Chevron icon
// ─────────────────────────────────────────

function ChevronIcon({ expanded }: { expanded: boolean }): ReactNode {
  return (
    <svg
      className={cn(
        "size-4",
        "shrink-0",
        "text-[var(--v-muted-foreground)]",
        "transition-transform",
        `duration-[var(--v-duration-normal)]`,
        `ease-[var(--v-easing-ease-in-out)]`,
        expanded && "rotate-180",
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export { VAccordion, VAccordionItem, VAccordionTrigger, VAccordionContent };
