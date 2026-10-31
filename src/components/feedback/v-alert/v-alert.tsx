"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "../../../lib";
import { useLocaleText } from "../../../hooks/use-locale";
import type { VAlertProps, VAlertSeverity, VAlertVariant } from "./v-alert.types";

// ─────────────────────────────────────────
// Default severity icons
// ─────────────────────────────────────────

function SuccessIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 10l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="7" r="0.75" fill="currentColor" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 3L1.5 17h17L10 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.5 7.5l5 5M12.5 7.5l-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const defaultIcons: Record<VAlertSeverity, ReactNode> = {
  default: <InfoIcon />,
  success: <SuccessIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
};

// ─────────────────────────────────────────
// Variant × severity colour classes
// ─────────────────────────────────────────

// Tailwind finds classes by scanning the source for whole class names, so every class below is
// written out in full. Do not build these strings from parts (for example with a template literal).
const variantStyles: Record<VAlertVariant, Record<VAlertSeverity, string>> = {
  filled: {
    default: "bg-[var(--v-muted)] text-[var(--v-muted-foreground)]",
    success: "bg-[var(--v-success)] text-[var(--v-success-foreground)]",
    info: "bg-[var(--v-info)] text-[var(--v-info-foreground)]",
    warning: "bg-[var(--v-warning)] text-[var(--v-warning-foreground)]",
    error: "bg-[var(--v-error)] text-[var(--v-error-foreground)]",
  },
  outlined: {
    default: "border border-[var(--v-muted-foreground)] text-[var(--v-foreground)] bg-transparent",
    success: "border border-[var(--v-success)] text-[var(--v-foreground)] bg-transparent",
    info: "border border-[var(--v-info)] text-[var(--v-foreground)] bg-transparent",
    warning: "border border-[var(--v-warning)] text-[var(--v-foreground)] bg-transparent",
    error: "border border-[var(--v-error)] text-[var(--v-foreground)] bg-transparent",
  },
  standard: {
    default: "bg-[var(--v-muted)]/10 text-[var(--v-foreground)]",
    success: "bg-[var(--v-success)]/10 text-[var(--v-foreground)]",
    info: "bg-[var(--v-info)]/10 text-[var(--v-foreground)]",
    warning: "bg-[var(--v-warning)]/10 text-[var(--v-foreground)]",
    error: "bg-[var(--v-error)]/10 text-[var(--v-foreground)]",
  },
};

// The text of the outlined and standard variants uses the foreground colour, which keeps the
// contrast above 4.5:1 on every tint; the severity colour stays on the border and on the icon.
const iconColorStyles: Record<Exclude<VAlertVariant, "filled">, Record<VAlertSeverity, string>> = {
  outlined: {
    default: "text-[var(--v-muted-foreground)]",
    success: "text-[var(--v-success)]",
    info: "text-[var(--v-info)]",
    warning: "text-[var(--v-warning)]",
    error: "text-[var(--v-error)]",
  },
  standard: {
    default: "text-[var(--v-muted-foreground)]",
    success: "text-[var(--v-success)]",
    info: "text-[var(--v-info)]",
    warning: "text-[var(--v-warning)]",
    error: "text-[var(--v-error)]",
  },
};

/**
 * Inline message box with a severity icon, optional title, action and close button.
 *
 * Announced to assistive technology as `role="alert"`.
 *
 * @example
 * <VAlert severity="success" title="Saved">
 *   Your changes have been saved.
 * </VAlert>
 */
const VAlert = forwardRef<HTMLDivElement, VAlertProps>((props, ref) => {
  const localeText = useLocaleText();
  const {
    // 1. Identity
    variant = "standard",
    severity = "default",
    // 3. Content
    children,
    title,
    // 4. Decorations
    icon,
    action,
    // 9. Callbacks
    onClose,
    className,
    ...rest
  } = props;

  const resolvedIcon = icon === false ? null : (icon ?? defaultIcons[severity]);

  const classes = cn(
    "v-alert",
    "relative flex items-start gap-3",
    "p-[var(--v-spacing-lg)]",
    "rounded-[var(--v-radius-md)]",
    "text-[length:var(--v-size-md-font-size)]",
    variantStyles[variant][severity],
    className,
  );

  return (
    <div
      ref={ref}
      role="alert"
      className={classes}
      data-v-severity={severity}
      data-v-variant={variant}
      {...rest}
    >
      {resolvedIcon && (
        <span
          className={cn(
            "shrink-0 mt-0.5",
            variant !== "filled" && iconColorStyles[variant][severity],
          )}
        >
          {resolvedIcon}
        </span>
      )}
      <div className="flex-1 min-w-0">
        {title && <div className="font-[var(--v-font-weight-semibold)] mb-1">{title}</div>}
        {children && <div>{children}</div>}
      </div>
      {action && <div className="shrink-0 self-center">{action}</div>}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "shrink-0 p-1 min-h-6 min-w-6 inline-flex items-center justify-center rounded-[var(--v-radius-sm)]",
            "hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--v-ring)]",
            "cursor-pointer",
          )}
          aria-label={localeText.alertClose}
        >
          <CloseIcon className="h-[var(--v-size-md-icon-size)] w-[var(--v-size-md-icon-size)]" />
        </button>
      )}
    </div>
  );
});

VAlert.displayName = "VAlert";

export { VAlert };
