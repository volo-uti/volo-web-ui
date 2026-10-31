"use client";

import { forwardRef } from "react";
import { cn } from "../../../lib";
import type { VOrientation } from "../../../lib";
import { useControllable } from "../../../hooks/use-controllable";
import { devWarning } from "../../../utils/dev-warning";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useLocaleText } from "../../../hooks/use-locale";
import type { VStepperProps } from "./v-stepper.types";

// ─────────────────────────────────────────
// Check icon for completed steps
// ─────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 8L7 11L12 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 5L11 11M11 5L5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Numbered step progress with labels, in a row or a column.
 *
 * @example
 * <VStepper
 *   value={1}
 *   onValueChange={setStep}
 *   steps={[
 *     { label: 'Account' },
 *     { label: 'Profile' },
 *     { label: 'Review' },
 *   ]}
 * />
 */
const VStepper = forwardRef<HTMLDivElement, VStepperProps>((props, ref) => {
  const override = useComponentOverride("VStepper");
  const localeText = useLocaleText();
  const {
    // 3. Content
    steps,
    // 5. Layout
    orientation = (override?.defaultProps?.orientation as VOrientation | undefined) ?? "horizontal",
    alternativeLabel = false,
    compact = false,
    // 6. State
    value,
    defaultValue = 0,
    // 7. Callbacks
    onValueChange,
    // 8. Advanced
    className,
    ...rest
  } = props;

  const [activeStep, setActiveStep] = useControllable({
    value,
    defaultValue,
    onChange: onValueChange,
  });
  const onStepClick = onValueChange ? setActiveStep : undefined;

  if (steps.length === 0) {
    devWarning("VStepper", "steps must not be empty");
  }
  if (activeStep < 0 || activeStep > steps.length - 1) {
    devWarning("VStepper", "value is out of range [0, steps.length - 1]");
  }

  const isHorizontal = orientation === "horizontal";

  return (
    <div
      ref={ref}
      className={cn(
        "v-stepper",
        "flex",
        isHorizontal ? "flex-row items-start" : "flex-col",
        override?.styles?.root,
        className,
      )}
      data-v-orientation={orientation}
      role="list"
      aria-label={localeText.stepperProgress}
      {...rest}
    >
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;
        const isError = step.error === true;
        const clickable = onStepClick && !step.disabled;

        return (
          <div
            key={index}
            className={cn(
              "flex",
              isHorizontal
                ? alternativeLabel
                  ? "flex-col items-center flex-1"
                  : "flex-row items-center flex-1"
                : "flex-row items-start",
            )}
            role="listitem"
            aria-current={isActive ? "step" : undefined}
          >
            {/* Step indicator + label */}
            <div
              className={cn(
                "flex shrink-0",
                isHorizontal && alternativeLabel
                  ? "flex-col items-center gap-2"
                  : "flex-row items-center gap-[var(--v-spacing-sm)]",
                clickable && "cursor-pointer",
                step.disabled && "opacity-50",
              )}
              onClick={clickable ? () => onStepClick(index) : undefined}
              onKeyDown={
                clickable
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onStepClick(index);
                      }
                    }
                  : undefined
              }
              tabIndex={clickable ? 0 : undefined}
              role={onStepClick ? "button" : undefined}
              aria-disabled={onStepClick && step.disabled ? true : undefined}
            >
              {/* Circle */}
              <div
                className={cn(
                  "flex items-center justify-center",
                  "h-[var(--v-size-sm-height)] w-[var(--v-size-sm-height)] rounded-full",
                  "text-[length:var(--v-size-sm-font-size)] font-[var(--v-font-weight-medium)]",
                  "shrink-0 transition-colors",
                  isError
                    ? "bg-[var(--v-error)] text-[var(--v-error-foreground)]"
                    : isCompleted
                      ? "bg-[var(--v-primary)] text-[var(--v-primary-foreground)]"
                      : isActive
                        ? "bg-[var(--v-primary)] text-[var(--v-primary-foreground)]"
                        : "border-2 border-[var(--v-border)] text-[var(--v-muted-foreground)]",
                  override?.styles?.stepIcon,
                )}
              >
                {isError ? (
                  <ErrorIcon />
                ) : isCompleted ? (
                  step.icon || <CheckIcon />
                ) : (
                  step.icon || index + 1
                )}
              </div>

              {/* Label & description — hidden in compact mode */}
              {!compact && (
                <div
                  className={cn(
                    alternativeLabel && isHorizontal ? "text-center" : "",
                    override?.styles?.stepLabel,
                  )}
                >
                  <div
                    className={cn(
                      "text-[length:var(--v-size-sm-font-size)]",
                      isActive || isCompleted
                        ? "font-[var(--v-font-weight-medium)] text-[var(--v-foreground)]"
                        : "text-[var(--v-muted-foreground)]",
                      isError && "text-[var(--v-error)]",
                    )}
                  >
                    {step.label}
                    {step.optional && (
                      <span className="text-[length:var(--v-size-xs-font-size)] text-[var(--v-muted-foreground)] ml-1">
                        {localeText.stepperOptional}
                      </span>
                    )}
                  </div>
                  {step.description && (
                    <div className="text-[length:var(--v-size-xs-font-size)] text-[var(--v-muted-foreground)] mt-0.5">
                      {step.description}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "transition-colors",
                  isHorizontal
                    ? cn(
                        "flex-1 h-px mx-[var(--v-spacing-sm)]",
                        alternativeLabel ? "mt-4" : "self-center",
                      )
                    : "w-px h-[var(--v-size-sm-height)] ml-4 my-1",
                  index < activeStep ? "bg-[var(--v-primary)]" : "bg-[var(--v-border)]",
                  override?.styles?.connector,
                )}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </div>
  );
});

VStepper.displayName = "VStepper";

export { VStepper };
