"use client";

import { forwardRef } from "react";
import { cn } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import type { VFormProps } from "./v-form.types";

/**
 * Vertical form layout that stops the browser's default submit navigation.
 *
 * `onSubmit` runs after `preventDefault()`, so handle the submit in JavaScript.
 * Compose it with VFormField, VTextField and VButton.
 *
 * @example
 * <VForm onSubmit={() => save(values)}>
 *   <VTextField label="Name" value={values.name} onValueChange={setName} />
 *   <VButton type="submit">Save</VButton>
 * </VForm>
 */
const VForm = forwardRef<HTMLFormElement, VFormProps>((props, ref) => {
  const override = useComponentOverride("VForm");

  const { children, spacing, onSubmit, className, style, ...restProps } = props;

  const handleSubmit = (e: Parameters<NonNullable<VFormProps["onSubmit"]>>[0]) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-[var(--v-spacing-lg)]", override?.styles?.root, className)}
      style={spacing == null ? style : { gap: spacing, ...style }}
      {...restProps}
    >
      {children}
    </form>
  );
});

VForm.displayName = "VForm";

export { VForm };
