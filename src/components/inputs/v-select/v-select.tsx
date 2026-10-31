"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { cn, createSafeContext } from "../../../lib";
import type { VSize } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useControllable } from "../../../hooks/use-controllable";
import { useLocaleText } from "../../../hooks";
import { VFormField } from "../v-form-field";
import type {
  VSelectContextValue,
  VSelectProps,
  VSelectTriggerProps,
  VSelectContentProps,
  VSelectItemProps,
  VSelectGroupProps,
  VSelectLabelProps,
} from "./v-select.types";

// ─────────────────────────────────────────
// Context
// ─────────────────────────────────────────

const [SelectProvider, useSelectContext] = createSafeContext<VSelectContextValue>("Select");

// ─────────────────────────────────────────
// Size styles
// ─────────────────────────────────────────

const triggerSizeStyles: Record<VSize, string> = {
  xs: "h-[var(--v-size-xs-height)] px-[var(--v-size-xs-padding-x)] text-[length:var(--v-size-xs-font-size)] gap-[var(--v-size-xs-gap)] rounded-[var(--v-size-xs-radius)]",
  sm: "h-[var(--v-size-sm-height)] px-[var(--v-size-sm-padding-x)] text-[length:var(--v-size-sm-font-size)] gap-[var(--v-size-sm-gap)] rounded-[var(--v-size-sm-radius)]",
  md: "h-[var(--v-size-md-height)] px-[var(--v-size-md-padding-x)] text-[length:var(--v-size-md-font-size)] gap-[var(--v-size-md-gap)] rounded-[var(--v-size-md-radius)]",
  lg: "h-[var(--v-size-lg-height)] px-[var(--v-size-lg-padding-x)] text-[length:var(--v-size-lg-font-size)] gap-[var(--v-size-lg-gap)] rounded-[var(--v-size-lg-radius)]",
  xl: "h-[var(--v-size-xl-height)] px-[var(--v-size-xl-padding-x)] text-[length:var(--v-size-xl-font-size)] gap-[var(--v-size-xl-gap)] rounded-[var(--v-size-xl-radius)]",
};

// ─────────────────────────────────────────
// Chevron icon
// ─────────────────────────────────────────

function ChevronDownIcon({ className }: { className?: string }) {
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
      <polyline points="6 9 12 15 18 9" />
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
// VSelect (root)
// ─────────────────────────────────────────

/**
 * Dropdown select, single or multiple.
 *
 * @example
 * <VSelect value={fruit} onValueChange={setFruit}>
 *   <VSelectTrigger>Choose fruit</VSelectTrigger>
 *   <VSelectContent>
 *     <VSelectItem value="apple">Apple</VSelectItem>
 *     <VSelectItem value="banana">Banana</VSelectItem>
 *   </VSelectContent>
 * </VSelect>
 */
function VSelect(props: VSelectProps) {
  const override = useComponentOverride("VSelect");

  const {
    // 2. Visual
    size = (override?.defaultProps?.size as VSize | undefined) ?? "md",
    // 3. Content
    children,
    label,
    placeholder,
    value: valueProp,
    defaultValue,
    multiple = false,
    maxSelection,
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
    // 10. Advanced
    className,
  } = props;

  const resolvedDefault = defaultValue ?? (multiple ? [] : "");

  const [currentValue, setValue] = useControllable({
    value: valueProp,
    defaultValue: resolvedDefault,
    onChange: onValueChange,
  });

  const [open, setOpen] = useState(false);

  const triggerId = useId();
  const contentId = useId();

  const hasMessage = (error && errorText) || (success && successText) || helper;
  const describedBy = hasMessage ? `${triggerId}-message` : undefined;

  return (
    <SelectProvider
      value={{
        value: currentValue,
        onValueChange: setValue,
        open,
        setOpen,
        multiple,
        size,
        disabled,
        triggerId,
        contentId,
        readOnly,
        loading,
        error,
        maxSelection,
        placeholder,
        describedBy,
        required,
        hasLabel: Boolean(label),
      }}
    >
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
        htmlFor={triggerId}
        className={cn(fullWidth ? "flex w-full" : "inline-flex", override?.styles?.root, className)}
      >
        <div className={cn("relative", fullWidth ? "w-full" : "inline-block")}>{children}</div>
      </VFormField>
    </SelectProvider>
  );
}

VSelect.displayName = "VSelect";

// ─────────────────────────────────────────
// VSelectTrigger
// ─────────────────────────────────────────

/**
 * Button of a VSelect that shows the current choice and opens the list.
 */
const VSelectTrigger = forwardRef<HTMLButtonElement, VSelectTriggerProps>((props, ref) => {
  const ctx = useSelectContext();
  const override = useComponentOverride("VSelect");
  const localeText = useLocaleText();

  const { children, className, onClick, onKeyDown, ...restProps } = props;

  const locked = ctx.disabled || ctx.readOnly;

  const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (!locked) {
      ctx.setOpen(!ctx.open);
    }
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "Escape") {
      ctx.setOpen(false);
    }
    // WCAG 2.1.1: Open dropdown with Arrow Down
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!ctx.open && !locked) {
        ctx.setOpen(true);
      }
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!locked) {
        ctx.setOpen(!ctx.open);
      }
    }
  };

  // A combobox takes no name from its content, so without a field label or an explicit name
  // the shown value (or placeholder) names the trigger.
  const valueId = `${ctx.triggerId}-value`;
  const unnamed =
    !ctx.hasLabel &&
    restProps["aria-label"] === undefined &&
    restProps["aria-labelledby"] === undefined;

  return (
    <button
      ref={ref}
      id={ctx.triggerId}
      type="button"
      role="combobox"
      aria-expanded={ctx.open}
      aria-haspopup="listbox"
      aria-controls={ctx.contentId}
      aria-labelledby={unnamed ? valueId : undefined}
      aria-invalid={ctx.error || undefined}
      aria-describedby={ctx.describedBy}
      aria-busy={ctx.loading || undefined}
      aria-readonly={ctx.readOnly || undefined}
      aria-required={ctx.required || undefined}
      disabled={ctx.disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "inline-flex w-full items-center justify-between border bg-transparent transition-colors",
        ctx.error ? "border-[var(--v-error)]" : "border-[var(--v-input)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)] focus-visible:ring-offset-2",
        ctx.disabled && "opacity-50 pointer-events-none",
        triggerSizeStyles[ctx.size],
        override?.styles?.trigger,
        className,
      )}
      {...restProps}
    >
      <span id={valueId} className="truncate">
        {children || (
          <span className="text-[var(--v-muted-foreground)]">
            {ctx.placeholder ?? localeText.selectPlaceholder}
          </span>
        )}
      </span>
      {ctx.loading && <Spinner className="ml-auto shrink-0" />}
      <ChevronDownIcon
        className={cn(
          "shrink-0 opacity-50 transition-transform",
          !ctx.loading && "ml-auto",
          ctx.open && "rotate-180",
        )}
      />
    </button>
  );
});

VSelectTrigger.displayName = "VSelectTrigger";

// ─────────────────────────────────────────
// VSelectContent
// ─────────────────────────────────────────

/**
 * Dropdown panel of a VSelect that holds its items; rendered only while open.
 */
const VSelectContent = forwardRef<HTMLDivElement, VSelectContentProps>((props, ref) => {
  const ctx = useSelectContext();
  const override = useComponentOverride("VSelect");
  const contentRef = useRef<HTMLDivElement | null>(null);

  const { children, className, ...restProps } = props;
  const { open, triggerId, setOpen } = ctx;

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (contentRef.current && !contentRef.current.contains(target)) {
        // Also check if click is on trigger
        const trigger = document.getElementById(triggerId);
        if (trigger && !trigger.contains(target)) {
          setOpen(false);
        }
      }
    };

    const isInside = (target: EventTarget | null) => {
      const node = target as Node | null;
      if (!node) return false;
      return !!(
        contentRef.current?.contains(node) || document.getElementById(triggerId)?.contains(node)
      );
    };

    // Runs in the capture phase so that the Escape that closes the list stops there and does
    // not also close a dialog around it. Keys pressed outside the select are left alone.
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInside(e.target)) return;

      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
        // Restore focus to trigger
        document.getElementById(triggerId)?.focus();
        return;
      }

      // WCAG 2.1.1: Navigate options with Arrow Up/Down
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const el = contentRef.current;
        if (!el) return;
        const items = Array.from(
          el.querySelectorAll<HTMLElement>('[role="option"]:not([aria-disabled="true"])'),
        );
        if (items.length === 0) return;

        const currentIndex = items.indexOf(document.activeElement as HTMLElement);
        let nextIndex: number;
        if (e.key === "ArrowDown") {
          nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        }
        items[nextIndex]?.focus();
      }

      if (e.key === "Home") {
        e.preventDefault();
        const el = contentRef.current;
        if (!el) return;
        const items = el.querySelectorAll<HTMLElement>(
          '[role="option"]:not([aria-disabled="true"])',
        );
        items[0]?.focus();
      }

      if (e.key === "End") {
        e.preventDefault();
        const el = contentRef.current;
        if (!el) return;
        const items = el.querySelectorAll<HTMLElement>(
          '[role="option"]:not([aria-disabled="true"])',
        );
        items[items.length - 1]?.focus();
      }
    };

    // Moving focus out of the select (Tab) closes the list
    const handleFocusIn = (e: FocusEvent) => {
      if (!isInside(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [open, triggerId, setOpen]);

  // Focus first option when opened
  useEffect(() => {
    if (!ctx.open) return;
    requestAnimationFrame(() => {
      const el = contentRef.current;
      if (!el) return;
      // Focus selected item if exists, otherwise focus first item
      const selectedItem = el.querySelector<HTMLElement>('[role="option"][aria-selected="true"]');
      const firstItem = el.querySelector<HTMLElement>(
        '[role="option"]:not([aria-disabled="true"])',
      );
      (selectedItem || firstItem)?.focus();
    });
  }, [ctx.open]);

  const setRefs = useCallback(
    (el: HTMLDivElement | null) => {
      contentRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }
    },
    [ref],
  );

  if (!ctx.open) return null;

  return (
    <div
      ref={setRefs}
      id={ctx.contentId}
      role="listbox"
      aria-multiselectable={ctx.multiple || undefined}
      className={cn(
        "absolute z-[var(--v-z-dropdown)] mt-1 w-full overflow-hidden",
        "rounded-[var(--v-radius-md)] border border-[var(--v-border)]",
        "bg-[var(--v-popover)] text-[var(--v-popover-foreground)]",
        "shadow-[var(--v-shadow-lg)]",
        "animate-in fade-in-0 zoom-in-95",
        override?.styles?.content,
        className,
      )}
      {...restProps}
    >
      <div className="max-h-60 overflow-y-auto p-1">{children}</div>
    </div>
  );
});

VSelectContent.displayName = "VSelectContent";

// ─────────────────────────────────────────
// VSelectItem
// ─────────────────────────────────────────

/**
 * Selectable item of a VSelect that reports its `value` when picked.
 */
const VSelectItem = forwardRef<HTMLDivElement, VSelectItemProps>((props, ref) => {
  const ctx = useSelectContext();
  const override = useComponentOverride("VSelect");

  const { value, disabled = false, children, className, onClick, onKeyDown, ...restProps } = props;

  const isSelected = ctx.multiple
    ? Array.isArray(ctx.value) && ctx.value.includes(value)
    : ctx.value === value;

  const selectedCount = Array.isArray(ctx.value) ? ctx.value.length : 0;
  const limitReached =
    ctx.multiple &&
    !isSelected &&
    ctx.maxSelection !== undefined &&
    selectedCount >= ctx.maxSelection;
  const isDisabled = disabled || limitReached;

  const handleSelect = () => {
    if (isDisabled || ctx.readOnly) return;

    if (ctx.multiple) {
      const arr = Array.isArray(ctx.value) ? ctx.value : [];
      const next = isSelected ? arr.filter((v) => v !== value) : [...arr, value];
      ctx.onValueChange(next);
    } else {
      ctx.onValueChange(value);
      ctx.setOpen(false);
      // The item unmounts with the list; hand focus back to the trigger
      document.getElementById(ctx.triggerId)?.focus();
    }
  };

  const handleClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    handleSelect();
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect();
    }
  };

  return (
    <div
      ref={ref}
      role="option"
      aria-selected={isSelected}
      aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-[var(--v-radius-sm)] px-2 py-1.5",
        "text-[length:var(--v-size-sm-font-size)]",
        "outline-none transition-colors",
        "hover:bg-[var(--v-accent)] hover:text-[var(--v-accent-foreground)]",
        "focus-visible:bg-[var(--v-accent)] focus-visible:ring-2 focus-visible:ring-[var(--v-ring)] focus-visible:ring-inset",
        isSelected && "bg-[var(--v-accent)]",
        isDisabled && "opacity-50 pointer-events-none",
        override?.styles?.item,
        className,
      )}
      {...restProps}
    >
      <span className="flex-1 truncate">{children}</span>
      {isSelected && (
        <CheckIcon className="ml-2 h-[var(--v-size-sm-icon-size)] w-[var(--v-size-sm-icon-size)] shrink-0" />
      )}
    </div>
  );
});

VSelectItem.displayName = "VSelectItem";

// ─────────────────────────────────────────
// VSelectGroup
// ─────────────────────────────────────────

/**
 * Groups related VSelectItem entries under an optional VSelectLabel.
 */
const VSelectGroup = forwardRef<HTMLDivElement, VSelectGroupProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  return (
    <div ref={ref} role="group" className={cn("py-1", className)} {...restProps}>
      {children}
    </div>
  );
});

VSelectGroup.displayName = "VSelectGroup";

// ─────────────────────────────────────────
// VSelectLabel
// ─────────────────────────────────────────

/**
 * Heading of a VSelectGroup.
 */
const VSelectLabel = forwardRef<HTMLDivElement, VSelectLabelProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  return (
    <div
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-[length:var(--v-size-sm-font-size)] font-[var(--v-font-weight-semibold)] text-[var(--v-muted-foreground)]",
        className,
      )}
      {...restProps}
    >
      {children}
    </div>
  );
});

VSelectLabel.displayName = "VSelectLabel";

export { VSelect, VSelectTrigger, VSelectContent, VSelectItem, VSelectGroup, VSelectLabel };
