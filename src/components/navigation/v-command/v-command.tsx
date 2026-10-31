"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "../../../lib";
import { useControllable } from "../../../hooks/use-controllable";
import { useLocaleText } from "../../../hooks/use-locale";
import type { VCommandProps, VCommandItem } from "./v-command.types";

/**
 * Highlight matching query text in a label string.
 */
function highlightText(text: string, query: string): ReactNode {
  if (!query) return text;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const startIndex = lowerText.indexOf(lowerQuery);

  if (startIndex === -1) return text;

  const endIndex = startIndex + query.length;
  return (
    <>
      {startIndex > 0 && text.substring(0, startIndex)}
      <span className="font-bold text-[var(--v-primary)]">
        {text.substring(startIndex, endIndex)}
      </span>
      {endIndex < text.length && text.substring(endIndex)}
    </>
  );
}

/**
 * Searchable command palette with arrow-key selection.
 *
 * @example
 * <VCommand
 *   groups={[{ heading: 'File', items: [{ label: 'New file', onClick: createFile }] }]}
 *   onOpenChange={setOpen}
 * />
 */
const VCommand = forwardRef<HTMLDivElement, VCommandProps>((props, ref) => {
  const {
    // 3. Content
    children,
    groups = [],
    placeholder: placeholderProp,
    emptyContent,
    // 6. State
    open: openProp,
    defaultOpen = true,
    loading = false,
    // 7. Callbacks
    onOpenChange,
    onKeyDown,
    filter: customFilter,
    // 8. Advanced
    className,
    ...rest
  } = props;

  const [open, setOpen] = useControllable({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const localeText = useLocaleText();
  const placeholder = placeholderProp ?? localeText.commandPlaceholder;
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // A closed palette starts fresh the next time it opens
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (!open) {
      setQuery("");
      setHighlightedIndex(0);
    }
  }

  // Filter items
  const filteredGroups = useMemo(() => {
    if (!query) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          if (customFilter) return customFilter(item, query);
          const q = query.toLowerCase();
          if (item.label.toLowerCase().includes(q)) return true;
          if (item.value?.toLowerCase().includes(q)) return true;
          if (item.keywords?.some((k) => k.toLowerCase().includes(q))) return true;
          return false;
        }),
      }))
      .filter((g) => g.items.length > 0);
  }, [groups, query, customFilter]);

  const filteredItems = useMemo(() => filteredGroups.flatMap((g) => g.items), [filteredGroups]);

  // The highlight always points at a real, enabled item, even after the list shrinks
  const activeIndex = useMemo(() => {
    const clamped = Math.min(highlightedIndex, filteredItems.length - 1);
    if (clamped >= 0 && !filteredItems[clamped]?.disabled) return clamped;
    const firstEnabled = filteredItems.findIndex((item) => !item.disabled);
    return firstEnabled === -1 ? Math.max(clamped, 0) : firstEnabled;
  }, [filteredItems, highlightedIndex]);

  // Keep the highlighted item inside the scrolling results
  useEffect(() => {
    if (!open) return;
    const el = resultsRef.current?.querySelector<HTMLElement>('[data-v-highlighted="true"]');
    el?.scrollIntoView?.({ block: "nearest" });
  }, [open, activeIndex]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleSelect = useCallback(
    (item: VCommandItem) => {
      item.onClick?.();
      setOpen(false);
    },
    [setOpen],
  );

  /** Index of the next enabled item from `from` in `direction`, wrapping around. */
  const stepFrom = useCallback(
    (from: number, direction: 1 | -1) => {
      const count = filteredItems.length;
      for (let step = 1; step <= count; step++) {
        const index = (from + direction * step + count) % count;
        if (!filteredItems[index]?.disabled) return index;
      }
      return from;
    },
    [filteredItems],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // A key pressed to compose text (IME) must not select or move the highlight
      if (e.nativeEvent.isComposing || e.keyCode === 229) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex(stepFrom(activeIndex, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex(stepFrom(activeIndex, -1));
      } else if (e.key === "Home") {
        e.preventDefault();
        setHighlightedIndex(stepFrom(-1, 1));
      } else if (e.key === "End") {
        e.preventDefault();
        setHighlightedIndex(stepFrom(filteredItems.length, -1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filteredItems[activeIndex];
        if (item && !item.disabled) handleSelect(item);
      } else if (e.key === "Escape") {
        if (query) {
          setQuery("");
          setHighlightedIndex(0);
        } else {
          setOpen(false);
        }
      }
    },
    [filteredItems, activeIndex, stepFrom, handleSelect, query, setOpen],
  );

  if (!open) return null;

  const classes = cn(
    "v-command",
    "flex flex-col",
    "bg-[var(--v-popover)] text-[var(--v-popover-foreground)]",
    "border border-[var(--v-border)]",
    "rounded-[var(--v-radius-lg)]",
    "shadow-[var(--v-shadow-lg)]",
    "overflow-hidden",
    className,
  );

  let itemIdx = 0;

  return (
    <div
      ref={ref}
      className={classes}
      {...rest}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (!e.defaultPrevented) handleKeyDown(e);
      }}
    >
      {/* Search input */}
      <div className="flex items-center gap-[var(--v-spacing-sm)] p-[var(--v-spacing-md)] border-b border-[var(--v-border)]">
        <svg
          className="size-4 text-[var(--v-muted-foreground)] shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <circle cx={11} cy={11} r={8} />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent outline-none text-[var(--v-foreground)] placeholder:text-[var(--v-muted-foreground)]"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlightedIndex(0);
          }}
        />
        {loading && (
          <svg
            className="size-4 text-[var(--v-muted-foreground)] animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        )}
      </div>

      {/* Results */}
      <div ref={resultsRef} className="max-h-80 overflow-y-auto py-[var(--v-spacing-xs)]">
        {filteredGroups.length === 0 ? (
          <div className="p-[var(--v-spacing-lg)] text-center text-[var(--v-muted-foreground)]">
            {emptyContent ?? localeText.commandNoResults}
          </div>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.heading}>
              <div className="px-[var(--v-spacing-md)] py-[var(--v-spacing-xs)] text-xs text-[var(--v-muted-foreground)]">
                {group.heading}
              </div>
              {group.items.map((item) => {
                const currentIdx = itemIdx++;
                const isHighlighted = currentIdx === activeIndex;
                return (
                  <button
                    key={item.value ?? item.label}
                    type="button"
                    className={cn(
                      "flex items-center w-full gap-[var(--v-spacing-sm)]",
                      "px-[var(--v-spacing-md)] py-[var(--v-spacing-md)]",
                      "text-left cursor-pointer",
                      isHighlighted && "bg-[var(--v-accent)]",
                      item.disabled && "opacity-50 pointer-events-none",
                    )}
                    data-v-highlighted={isHighlighted || undefined}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setHighlightedIndex(currentIdx)}
                    disabled={item.disabled}
                  >
                    {item.leading && <span className="shrink-0">{item.leading}</span>}
                    <span className="flex-1 truncate">
                      {query ? highlightText(item.label, query) : item.label}
                    </span>
                    {item.trailing && (
                      <kbd className="shrink-0 px-[var(--v-spacing-sm)] py-[var(--v-spacing-xxs)] text-xs bg-[var(--v-muted)] border border-[var(--v-border)] rounded-[var(--v-radius-sm)] text-[var(--v-muted-foreground)]">
                        {item.trailing}
                      </kbd>
                    )}
                  </button>
                );
              })}
            </div>
          ))
        )}
      </div>

      {children}
    </div>
  );
});

VCommand.displayName = "VCommand";
export { VCommand };
