"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { cn } from "../../../lib";
import type { VOption, VSize } from "../../../lib";
import { useComponentOverride } from "../../../hooks";
import { useControllable } from "../../../hooks";
import { useLocaleText } from "../../../hooks";
import { VFormField } from "../v-form-field";
import type { VAutocompleteProps } from "./v-autocomplete.types";

// ─────────────────────────────────────────
// Size styles
// ─────────────────────────────────────────

const inputSizeStyles: Record<VSize, string> = {
  xs: "h-[var(--v-size-xs-height)] pl-[calc(var(--v-size-xs-padding-x)+var(--v-size-xs-icon-size)+var(--v-size-xs-gap))] pr-[var(--v-size-xs-padding-x)] text-[length:var(--v-size-xs-font-size)] rounded-[var(--v-size-xs-radius)]",
  sm: "h-[var(--v-size-sm-height)] pl-[calc(var(--v-size-sm-padding-x)+var(--v-size-sm-icon-size)+var(--v-size-sm-gap))] pr-[var(--v-size-sm-padding-x)] text-[length:var(--v-size-sm-font-size)] rounded-[var(--v-size-sm-radius)]",
  md: "h-[var(--v-size-md-height)] pl-[calc(var(--v-size-md-padding-x)+var(--v-size-md-icon-size)+var(--v-size-md-gap))] pr-[var(--v-size-md-padding-x)] text-[length:var(--v-size-md-font-size)] rounded-[var(--v-size-md-radius)]",
  lg: "h-[var(--v-size-lg-height)] pl-[calc(var(--v-size-lg-padding-x)+var(--v-size-lg-icon-size)+var(--v-size-lg-gap))] pr-[var(--v-size-lg-padding-x)] text-[length:var(--v-size-lg-font-size)] rounded-[var(--v-size-lg-radius)]",
  xl: "h-[var(--v-size-xl-height)] pl-[calc(var(--v-size-xl-padding-x)+var(--v-size-xl-icon-size)+var(--v-size-xl-gap))] pr-[var(--v-size-xl-padding-x)] text-[length:var(--v-size-xl-font-size)] rounded-[var(--v-size-xl-radius)]",
};

const iconSizeStyles: Record<VSize, string> = {
  xs: "left-[var(--v-size-xs-padding-x)] h-[var(--v-size-xs-icon-size)] w-[var(--v-size-xs-icon-size)]",
  sm: "left-[var(--v-size-sm-padding-x)] h-[var(--v-size-sm-icon-size)] w-[var(--v-size-sm-icon-size)]",
  md: "left-[var(--v-size-md-padding-x)] h-[var(--v-size-md-icon-size)] w-[var(--v-size-md-icon-size)]",
  lg: "left-[var(--v-size-lg-padding-x)] h-[var(--v-size-lg-icon-size)] w-[var(--v-size-lg-icon-size)]",
  xl: "left-[var(--v-size-xl-padding-x)] h-[var(--v-size-xl-icon-size)] w-[var(--v-size-xl-icon-size)]",
};

// ─────────────────────────────────────────
// Default filter
// ─────────────────────────────────────────

function defaultFilter(query: string, option: VOption): boolean {
  return option.label.toLowerCase().includes(query.toLowerCase());
}

// ─────────────────────────────────────────
// Icons
// ─────────────────────────────────────────

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─────────────────────────────────────────
// VAutocomplete
// ─────────────────────────────────────────

/**
 * Text input with suggestions filtered as you type.
 *
 * @example
 * <VAutocomplete
 *   items={[{ value: 'apple', label: 'Apple' }, { value: 'banana', label: 'Banana' }]}
 *   placeholder="Search fruit..."
 *   value={fruit}
 *   onValueChange={setFruit}
 * />
 */
const VAutocomplete = forwardRef<HTMLInputElement, VAutocompleteProps>((props, ref) => {
  const override = useComponentOverride("VAutocomplete");

  const {
    // 2. Visual
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    // 3. Content
    label,
    value: valueProp,
    defaultValue = "",
    placeholder,
    items,
    emptyText: emptyTextProp,
    emptyRenderer,
    allowCustomValue = false,
    // 5. Header/Meta
    required = false,
    requiredMark,
    tooltip,
    more,
    // 6. Footer/Messages
    helper,
    error = false,
    errorText,
    success = false,
    successText,
    extra,
    // 7. Layout
    fullWidth = false,
    // 8. State
    disabled = false,
    readOnly = false,
    loading = false,
    // 9. Callbacks
    onValueChange,
    onInputChange,
    filterFn = defaultFilter,
    // 10. Advanced
    id: idProp,
    className,
    onKeyDown: onKeyDownProp,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    ...restProps
  } = props;

  const localeText = useLocaleText();
  const autoId = useId();
  const inputId = idProp ?? autoId;
  const listboxId = `${inputId}-listbox`;

  const [selectedValue, setSelectedValue] = useControllable({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

  const labelOf = (value: string) =>
    items.find((o) => o.value === value)?.label ?? (allowCustomValue ? value : "");

  const [query, setQuery] = useState(() => labelOf(valueProp ?? defaultValue));

  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const internalInputRef = useRef<HTMLInputElement | null>(null);

  const filteredOptions = useMemo(
    () => items.filter((o) => !o.disabled && filterFn(query, o)),
    [items, query, filterFn],
  );

  const closeList = () => {
    setOpen(false);
    setHighlightedIndex(-1);
  };

  // While the list is closed the text follows the selected value: a form reset, a new `value`
  // or `items` that arrive late are all reflected, and unfinished typing is reverted on close.
  const selectedLabel = labelOf(selectedValue);
  useEffect(() => {
    if (!open) setQuery(selectedLabel);
  }, [open, selectedLabel]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        closeList();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const setInputRefs = useCallback(
    (el: HTMLInputElement | null) => {
      internalInputRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
      }
    },
    [ref],
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (!readOnly) setOpen(true);
    setHighlightedIndex(-1);
    // Emptying the text clears the selection
    if (val === "" && selectedValue !== "") setSelectedValue("");
    onInputChange?.(val);
  };

  const handleSelect = (option: VOption) => {
    setSelectedValue(option.value);
    setQuery(option.label);
    closeList();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDownProp?.(e);
    if (e.defaultPrevented) return;
    // The Enter that confirms an IME composition must not commit the half-composed text
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (readOnly) break;
        setOpen(true);
        setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
        break;
      case "Enter": {
        if (readOnly) break;
        // A closed list leaves Enter to the surrounding form
        if (!open) break;
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        } else if (allowCustomValue && query.trim() !== "") {
          const typed = query.trim().toLowerCase();
          const exact = items.find((o) => !o.disabled && o.label.toLowerCase() === typed);
          if (exact) {
            handleSelect(exact);
          } else {
            setSelectedValue(query);
            closeList();
          }
        }
        break;
      }
      case "Escape": {
        closeList();
        break;
      }
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    onFocusProp?.(e);
    if (e.defaultPrevented) return;
    if (!readOnly) setOpen(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    onBlurProp?.(e);
    // Moving focus out of the field closes the list; moving within it keeps it open
    const next = e.relatedTarget as Node | null;
    if (next && wrapperRef.current?.contains(next)) return;
    closeList();
  };

  // Determine message for aria-describedby
  const hasMessage = (error && errorText) || (success && successText) || helper;
  const messageId = hasMessage ? `${inputId}-message` : undefined;

  return (
    <VFormField
      label={label}
      required={required}
      requiredMark={requiredMark}
      tooltip={tooltip}
      more={more}
      helper={helper}
      error={error}
      errorText={errorText}
      success={success}
      successText={successText}
      extra={extra}
      size={size}
      htmlFor={inputId}
      className={cn("relative", fullWidth && "w-full", override?.styles?.root, className)}
    >
      <div ref={wrapperRef} className="relative">
        <SearchIcon
          className={cn(
            "absolute top-1/2 -translate-y-1/2 pointer-events-none text-[var(--v-muted-foreground)]",
            iconSizeStyles[size],
          )}
        />
        <input
          ref={setInputRefs}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-activedescendant={
            open && filteredOptions[highlightedIndex]
              ? `${inputId}-option-${highlightedIndex}`
              : undefined
          }
          aria-invalid={error || undefined}
          aria-describedby={messageId}
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-busy={loading || undefined}
          autoComplete="off"
          className={cn(
            "w-full border bg-transparent outline-none transition-colors",
            "border-(--v-input)",
            "focus:border-(--v-ring) focus:ring-1 focus:ring-(--v-ring)",
            "placeholder:text-(--v-muted-foreground)",
            error && "border-(--v-error) focus:border-(--v-error) focus:ring-(--v-error)",
            disabled && "opacity-50 pointer-events-none",
            inputSizeStyles[size],
            override?.styles?.input,
          )}
          {...restProps}
        />

        {loading && (
          <Spinner className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[var(--v-muted-foreground)]" />
        )}

        {/* Dropdown */}
        {open && (
          <div
            id={listboxId}
            role="listbox"
            className={cn(
              "absolute top-full z-[var(--v-z-dropdown)] mt-[var(--v-spacing-xs)] w-full overflow-hidden",
              "rounded-[var(--v-radius-md)] border border-[var(--v-border)]",
              "bg-[var(--v-popover)] text-[var(--v-popover-foreground)]",
              "shadow-[var(--v-shadow-lg)]",
              override?.styles?.content,
            )}
          >
            <div className="max-h-60 overflow-y-auto p-[var(--v-spacing-xs)]">
              {filteredOptions.length === 0 ? (
                <div className="px-[var(--v-spacing-md)] py-[var(--v-size-sm-padding-y)] text-center text-[length:var(--v-size-sm-font-size)] text-[var(--v-muted-foreground)]">
                  {emptyRenderer
                    ? emptyRenderer(query)
                    : (emptyTextProp ??
                      (typeof localeText.autocompleteNoResults === "function"
                        ? localeText.autocompleteNoResults(query)
                        : localeText.autocompleteNoResults))}
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = option.value === selectedValue;
                  const isHighlighted = index === highlightedIndex;

                  return (
                    <div
                      key={option.value}
                      id={`${inputId}-option-${index}`}
                      role="option"
                      aria-selected={isSelected}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelect(option)}
                      className={cn(
                        "relative flex cursor-pointer select-none items-center rounded-[var(--v-radius-sm)] px-[var(--v-spacing-md)] py-[var(--v-size-sm-padding-y)]",
                        "text-[length:var(--v-size-sm-font-size)]",
                        "outline-none transition-colors",
                        "hover:bg-[var(--v-accent)] hover:text-[var(--v-accent-foreground)]",
                        isHighlighted && "bg-[var(--v-accent)]",
                        isSelected && "bg-[var(--v-accent)]",
                        override?.styles?.item,
                      )}
                    >
                      <span className="flex-1 truncate">{option.label}</span>
                      {isSelected && (
                        <CheckIcon className="ml-[var(--v-spacing-md)] h-[var(--v-size-sm-icon-size)] w-[var(--v-size-sm-icon-size)] shrink-0" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </VFormField>
  );
});

VAutocomplete.displayName = "VAutocomplete";

export { VAutocomplete };
