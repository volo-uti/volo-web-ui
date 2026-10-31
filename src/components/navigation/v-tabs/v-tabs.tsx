"use client";

import { createContext, forwardRef, useContext, useEffect, useId, useRef, useState } from "react";
import { cn, createSafeContext } from "../../../lib";
import type { VOrientation } from "../../../lib";
import { useControllable } from "../../../hooks/use-controllable";
import { useComponentOverride } from "../../../hooks/use-component-override";
import type {
  VTabsContentProps,
  VTabsListProps,
  VTabsProps,
  VTabsTriggerProps,
  VTabsVariant,
} from "./v-tabs.types";

// ─────────────────────────────────────────
// Context
// ─────────────────────────────────────────

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  orientation: VOrientation;
  baseId: string;
  /** Value of the trigger that takes the tab stop when no enabled trigger is active. */
  fallbackValue: string | null;
  setFallbackValue: (value: string | null) => void;
}

/** Makes a tab value safe inside an id and inside the space-separated `aria-labelledby` list. */
const idPart = (value: string) => encodeURIComponent(value);

const [TabsProvider, useTabs] = createSafeContext<TabsContextValue>("VTabs");

// Variant context — set by VTabsList, consumed by VTabsTrigger
const TabsVariantContext = createContext<VTabsVariant>("default");

// ─────────────────────────────────────────
// Root
// ─────────────────────────────────────────

/**
 * Tabs that switch between panels; arrow keys move between tabs.
 *
 * @example
 * <VTabs defaultValue="tab1">
 *   <VTabsList>
 *     <VTabsTrigger value="tab1">Tab 1</VTabsTrigger>
 *     <VTabsTrigger value="tab2">Tab 2</VTabsTrigger>
 *   </VTabsList>
 *   <VTabsContent value="tab1">Content 1</VTabsContent>
 *   <VTabsContent value="tab2">Content 2</VTabsContent>
 * </VTabs>
 */
function VTabs({
  children,
  defaultValue = "",
  orientation = "horizontal",
  isScrollable = false,
  value,
  onValueChange,
  className,
  ...rest
}: VTabsProps) {
  const override = useComponentOverride("VTabs");
  const baseId = useId();
  const [fallbackValue, setFallbackValue] = useState<string | null>(null);
  const [currentValue, setCurrentValue] = useControllable({
    value,
    defaultValue,
    onChange: onValueChange,
  });

  return (
    <TabsProvider
      value={{
        value: currentValue,
        onValueChange: setCurrentValue,
        orientation,
        baseId,
        fallbackValue,
        setFallbackValue,
      }}
    >
      <div
        className={cn(
          "v-tabs",
          orientation === "vertical" && "flex",
          isScrollable && "overflow-x-auto",
          override?.styles?.root,
          className,
        )}
        data-v-orientation={orientation}
        data-v-scrollable={isScrollable || undefined}
        {...rest}
      >
        {children}
      </div>
    </TabsProvider>
  );
}

VTabs.displayName = "VTabs";

// ─────────────────────────────────────────
// List
// ─────────────────────────────────────────

const listVariantStyles: Record<VTabsVariant, string> = {
  default: "bg-[var(--v-muted)] rounded-[var(--v-radius-md)] p-1",
  pills: "gap-1",
  underline: "border-b border-[var(--v-border)]",
  overline: "border-b border-[var(--v-border)]",
};

/** Tablist container that holds the VTabsTrigger buttons. */
const VTabsList = forwardRef<HTMLDivElement, VTabsListProps>((props, ref) => {
  const { variant = "default", children, className, ...rest } = props;
  const { orientation, setFallbackValue } = useTabs();
  const override = useComponentOverride("VTabs");
  const listRef = useRef<HTMLDivElement | null>(null);

  // WCAG 2.1.1: the tablist needs one tab stop. When no enabled trigger is active (no value yet,
  // a value that matches nothing, or a disabled active tab), the first enabled trigger takes it.
  useEffect(() => {
    const tabs = listRef.current?.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])');
    const hasActive =
      !!tabs && Array.from(tabs).some((t) => t.getAttribute("aria-selected") === "true");
    setFallbackValue(hasActive ? null : (tabs?.[0]?.dataset.vTabValue ?? null));
  });

  return (
    <TabsVariantContext.Provider value={variant}>
      <div
        ref={(node) => {
          listRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          "inline-flex items-center",
          listVariantStyles[variant],
          orientation === "horizontal" ? "flex-row" : "flex-col",
          override?.styles?.list,
          className,
        )}
        data-v-variant={variant}
        {...rest}
      >
        {children}
      </div>
    </TabsVariantContext.Provider>
  );
});
VTabsList.displayName = "VTabsList";

// ─────────────────────────────────────────
// Trigger
// ─────────────────────────────────────────

const triggerActiveStyles: Record<VTabsVariant, string> = {
  default: "bg-[var(--v-card)] text-[var(--v-foreground)] shadow-sm",
  pills: "bg-[var(--v-primary)] text-[var(--v-primary-foreground)] rounded-full",
  underline: "border-b-2 border-[var(--v-primary)] text-[var(--v-foreground)]",
  overline: "border-t-4 border-[var(--v-primary)] text-[var(--v-foreground)]",
};

const triggerInactiveStyles: Record<VTabsVariant, string> = {
  default:
    "text-[var(--v-muted-foreground)] hover:bg-[var(--v-muted)]/50 hover:text-[var(--v-foreground)]",
  pills:
    "text-[var(--v-muted-foreground)] hover:bg-[var(--v-muted)]/50 hover:text-[var(--v-foreground)] rounded-full",
  underline:
    "text-[var(--v-muted-foreground)] hover:bg-[var(--v-muted)]/50 hover:text-[var(--v-foreground)] border-b-2 border-transparent",
  overline:
    "text-[var(--v-muted-foreground)] hover:bg-[var(--v-muted)]/50 hover:text-[var(--v-foreground)] border-t-4 border-transparent",
};

/** Tab button that activates its panel. */
const VTabsTrigger = forwardRef<HTMLButtonElement, VTabsTriggerProps>((props, ref) => {
  const {
    children,
    value: triggerValue,
    icon,
    disabled = false,
    onClick,
    onKeyDown,
    className,
    ...rest
  } = props;
  const { value, onValueChange, orientation, baseId, fallbackValue } = useTabs();
  const variant = useContext(TabsVariantContext);
  const override = useComponentOverride("VTabs");
  const isActive = value === triggerValue;
  const tabId = `${baseId}-tab-${idPart(triggerValue)}`;
  const panelId = `${baseId}-panel-${idPart(triggerValue)}`;

  // WCAG 2.1.1: Arrow key navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const isHorizontal = orientation === "horizontal";
    const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";
    const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";

    if (e.key !== prevKey && e.key !== nextKey && e.key !== "Home" && e.key !== "End") return;

    e.preventDefault();
    const tablist = e.currentTarget.closest('[role="tablist"]');
    if (!tablist) return;

    const tabs = Array.from(
      tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    );
    const currentIndex = tabs.indexOf(e.currentTarget);

    let nextIndex: number;
    if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = tabs.length - 1;
    } else if (e.key === nextKey) {
      nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    } else {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    }

    tabs[nextIndex]?.focus();
    tabs[nextIndex]?.click();
  };

  return (
    <button
      ref={ref}
      id={tabId}
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={panelId}
      aria-disabled={disabled || undefined}
      tabIndex={isActive || fallbackValue === triggerValue ? 0 : -1}
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e);
        if (!disabled && !e.defaultPrevented) onValueChange(triggerValue);
      }}
      onKeyDown={handleKeyDown}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap",
        "px-[var(--v-spacing-md)] py-[var(--v-spacing-xs)]",
        "text-[length:var(--v-size-md-font-size)]",
        "font-[var(--v-font-weight-medium)]",
        variant === "underline" || variant === "overline" ? "" : "rounded-[var(--v-radius-sm)]",
        "transition-all duration-[var(--v-duration-fast)] cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)]",
        isActive ? triggerActiveStyles[variant] : triggerInactiveStyles[variant],
        disabled && "opacity-50 pointer-events-none",
        override?.styles?.trigger,
        className,
      )}
      data-v-state={isActive ? "active" : "inactive"}
      data-v-tab-value={triggerValue}
      {...rest}
    >
      {icon && <span className="mr-[var(--v-spacing-sm)] shrink-0">{icon}</span>}
      {children}
    </button>
  );
});
VTabsTrigger.displayName = "VTabsTrigger";

// ─────────────────────────────────────────
// Content
// ─────────────────────────────────────────

/** Tab panel that shows its children while its value is the active tab. */
const VTabsContent = forwardRef<HTMLDivElement, VTabsContentProps>((props, ref) => {
  const { children, value: panelValue, className, ...rest } = props;
  const { value, baseId } = useTabs();
  const override = useComponentOverride("VTabs");
  const panelId = `${baseId}-panel-${idPart(panelValue)}`;
  const tabId = `${baseId}-tab-${idPart(panelValue)}`;

  if (value !== panelValue) return null;

  return (
    <div
      ref={ref}
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={0}
      className={cn(
        "mt-2",
        "animate-[v-tabs-content-enter_var(--v-duration-fast)_ease-out]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)]",
        override?.styles?.content,
        className,
      )}
      data-v-state="active"
      {...rest}
    >
      {children}
    </div>
  );
});
VTabsContent.displayName = "VTabsContent";

export { VTabs, VTabsList, VTabsTrigger, VTabsContent };
