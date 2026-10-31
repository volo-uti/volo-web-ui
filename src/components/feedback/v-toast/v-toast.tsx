"use client";

import { forwardRef, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useLocaleText } from "../../../hooks/use-locale";
import type {
  VToastData,
  VToastOptions,
  VToastPosition,
  VToastType,
  VToasterProps,
} from "./v-toast.types";

// ─────────────────────────────────────────
// Toast store (imperative API)
// ─────────────────────────────────────────

let toastId = 0;
let toasts: VToastData[] = [];
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function addToast(type: VToastType, message: ReactNode, options?: VToastOptions): string {
  const id = `v-toast-${++toastId}`;
  const duration = options?.duration ?? 5000;
  const action = options?.action;
  toasts = [...toasts, { id, type, message, duration, action }];
  emitChange();
  return id;
}

function removeToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  emitChange();
}

function getSnapshot(): VToastData[] {
  return toasts;
}

function getServerSnapshot(): VToastData[] {
  return [];
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Imperative toast API: `success`, `info`, `warning`, `error`, `default`, `dismiss`.
 *
 * Needs one VToaster mounted. Each call returns the toast's ID.
 *
 * @example
 * toast.success('Saved!')
 * toast.error('Something went wrong')
 * toast.info('FYI', { duration: 3000 })
 */
export const toast = {
  success: (message: ReactNode, options?: VToastOptions) => addToast("success", message, options),
  info: (message: ReactNode, options?: VToastOptions) => addToast("info", message, options),
  warning: (message: ReactNode, options?: VToastOptions) => addToast("warning", message, options),
  error: (message: ReactNode, options?: VToastOptions) => addToast("error", message, options),
  default: (message: ReactNode, options?: VToastOptions) => addToast("default", message, options),
  dismiss: removeToast,
};

// ─────────────────────────────────────────
// Toast type styles
// ─────────────────────────────────────────

const typeStyles: Record<VToastType, string> = {
  success: "border-l-4 border-l-[var(--v-success)]",
  info: "border-l-4 border-l-[var(--v-info)]",
  warning: "border-l-4 border-l-[var(--v-warning)]",
  error: "border-l-4 border-l-[var(--v-error)]",
  default: "",
};

// ─────────────────────────────────────────
// Position styles
// ─────────────────────────────────────────

const positionStyles: Record<VToastPosition, string> = {
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
};

// ─────────────────────────────────────────
// Individual toast item
// ─────────────────────────────────────────

function ToastItem({ data }: { data: VToastData }) {
  const override = useComponentOverride("VToast");
  const localeText = useLocaleText();

  // Auto-dismiss; 0, a negative number, `Infinity` or NaN keep the toast until it is dismissed
  useEffect(() => {
    if (!Number.isFinite(data.duration) || data.duration <= 0) return;
    const timer = setTimeout(() => removeToast(data.id), data.duration);
    return () => clearTimeout(timer);
  }, [data.id, data.duration]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "v-toast",
        "flex items-center gap-[var(--v-spacing-sm)]",
        "min-w-[300px] max-w-md",
        "px-[var(--v-spacing-lg)] py-[var(--v-spacing-md)]",
        "bg-[var(--v-card)] text-[var(--v-card-foreground)]",
        "rounded-[var(--v-radius-md)]",
        "shadow-[var(--v-shadow-lg)]",
        "text-[length:var(--v-size-md-font-size)]",
        typeStyles[data.type],
        override?.styles?.root,
      )}
    >
      <span className={cn("flex-1", override?.styles?.message)}>{data.message}</span>
      {data.action && (
        <button
          type="button"
          onClick={() => {
            data.action?.onClick();
            removeToast(data.id);
          }}
          className={cn(
            "shrink-0 px-2 py-1 min-h-6 rounded-[var(--v-radius-sm)]",
            "text-[var(--v-primary)] font-[var(--v-font-weight-medium)]",
            "hover:bg-[var(--v-primary)]/10",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)]",
            "text-[length:var(--v-size-md-font-size)] cursor-pointer",
          )}
        >
          {data.action.label}
        </button>
      )}
      <button
        type="button"
        onClick={() => removeToast(data.id)}
        className={cn(
          "shrink-0 p-1 min-h-6 min-w-6 inline-flex items-center justify-center rounded-[var(--v-radius-sm)]",
          "text-[var(--v-muted-foreground)] hover:text-[var(--v-foreground)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)]",
          "cursor-pointer",
          override?.styles?.closeButton,
        )}
        aria-label={localeText.toastDismiss}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M3 3l8 8M11 3l-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────
// Toaster container
// ─────────────────────────────────────────

/**
 * Container that renders the active toasts; mount it once near the app root.
 *
 * Toasts are triggered with `toast.success('message')` and friends. The viewport renders in a
 * portal on `document.body` and stays usable and announced while a modal overlay is open.
 *
 * @example
 * // In your root layout:
 * <VToaster position="bottom-right" />
 *
 * // Anywhere in your app:
 * import { toast } from '@volo-uti/volo-web-ui'
 * toast.success('Changes saved!')
 */
const VToaster = forwardRef<HTMLDivElement, VToasterProps>((props, ref) => {
  const { position = "bottom-right", className, ...rest } = props;

  const currentToasts = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // The server snapshot is empty, so nothing is portaled before hydration finishes
  if (currentToasts.length === 0 || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={ref}
      // Keeps the viewport interactive while a modal overlay makes the page inert
      data-v-inert-ignore=""
      className={cn(
        "v-toaster",
        "fixed z-[var(--v-z-toast)]",
        "flex flex-col gap-[var(--v-spacing-sm)]",
        "pointer-events-none",
        positionStyles[position],
        className,
      )}
      {...rest}
    >
      {currentToasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem data={t} />
        </div>
      ))}
    </div>,
    document.body,
  );
});

VToaster.displayName = "VToaster";

export { VToaster };
