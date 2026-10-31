"use client";

import React, { Children, forwardRef, Fragment } from "react";
import { cn } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import { useLocaleText } from "../../../hooks/use-locale";
import type { VBreadcrumbItemProps, VBreadcrumbProps } from "./v-breadcrumb.types";

/**
 * Trail of links showing where the page sits in the hierarchy.
 *
 * @example
 * <VBreadcrumb>
 *   <VBreadcrumbItem href="/">Home</VBreadcrumbItem>
 *   <VBreadcrumbItem href="/products">Products</VBreadcrumbItem>
 *   <VBreadcrumbItem active>Detail</VBreadcrumbItem>
 * </VBreadcrumb>
 */
const VBreadcrumb = forwardRef<HTMLElement, VBreadcrumbProps>((props, ref) => {
  const override = useComponentOverride("VBreadcrumb");
  const { children, separator = "/", maxItems, className, ...rest } = props;

  const localeText = useLocaleText();
  const allItems = Children.toArray(children);

  // maxItems: first item + "..." ellipsis + last (maxItems - 1) items
  let items: React.ReactNode[];
  let collapsedEllipsis = false;
  if (maxItems && maxItems > 1 && allItems.length > maxItems) {
    items = [allItems[0], ...allItems.slice(-(maxItems - 1))];
    collapsedEllipsis = true;
  } else {
    items = allItems;
  }

  return (
    <nav
      ref={ref}
      aria-label={localeText.breadcrumbLabel}
      className={cn("v-breadcrumb", override?.styles?.root, className)}
      {...rest}
    >
      <ol
        className={cn(
          "flex items-center gap-[var(--v-spacing-xs)] text-[length:var(--v-size-md-font-size)]",
          override?.styles?.list,
        )}
      >
        {items.map((child, index) => (
          <Fragment key={index}>
            {index > 0 && (
              <li
                aria-hidden="true"
                className={cn(
                  "text-[var(--v-muted-foreground)] select-none",
                  override?.styles?.separator,
                )}
              >
                {separator}
              </li>
            )}
            {collapsedEllipsis && index === 1 && (
              <>
                <li aria-hidden="true" className="text-[var(--v-muted-foreground)] select-none">
                  ...
                </li>
                <li
                  aria-hidden="true"
                  className={cn(
                    "text-[var(--v-muted-foreground)] select-none",
                    override?.styles?.separator,
                  )}
                >
                  {separator}
                </li>
              </>
            )}
            <li>{child}</li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
});

VBreadcrumb.displayName = "VBreadcrumb";

export { VBreadcrumb, VBreadcrumbItem };
export type { VBreadcrumbProps, VBreadcrumbItemProps };

/**
 * One step of a VBreadcrumb: a link, a button or the current page.
 *
 * @example
 * <VBreadcrumbItem href="/products" icon="📦">Products</VBreadcrumbItem>
 */
const VBreadcrumbItem = forwardRef<HTMLElement, VBreadcrumbItemProps>((props, ref) => {
  const { children, icon, href, active = false, onClick, className, ...rest } = props;
  const override = useComponentOverride("VBreadcrumb");

  const classes = cn(
    "inline-flex items-center gap-[var(--v-spacing-xs)]",
    "transition-all duration-150",
    active
      ? "text-[var(--v-foreground)] font-[var(--v-font-weight-medium)]"
      : "text-[var(--v-muted-foreground)] hover:text-[var(--v-foreground)]",
    (href || onClick) && !active && "cursor-pointer",
    "focus-visible:ring-2 focus-visible:ring-[var(--v-ring)] focus-visible:outline-none rounded-sm",
    override?.styles?.item,
    className,
  );

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (href && !active) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {content}
      </a>
    );
  }

  if (onClick && !active) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {content}
      </button>
    );
  }

  return (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      aria-current={active ? "page" : undefined}
      className={classes}
      {...rest}
    >
      {content}
    </span>
  );
});

VBreadcrumbItem.displayName = "VBreadcrumbItem";
