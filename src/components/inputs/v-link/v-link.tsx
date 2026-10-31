import { forwardRef, type Ref } from "react";
import { cn } from "../../../lib";
import { useComponentOverride } from "../../../hooks/use-component-override";
import type { VLinkColor, VLinkProps, VLinkUnderline } from "./v-link.types";

const underlineStyles: Record<VLinkUnderline, string> = {
  always: "underline underline-offset-4",
  hover: "no-underline hover:underline underline-offset-4",
  none: "no-underline",
};

const colorStyles: Record<VLinkColor, string> = {
  primary: "text-[var(--v-primary)] hover:text-[var(--v-primary)]/80",
  secondary: "text-[var(--v-muted-foreground)] hover:text-[var(--v-foreground)]",
  inherit: "text-inherit",
};

/**
 * Styled anchor with underline and colour options; `as` swaps in a router Link.
 *
 * @example
 * <VLink href="/about">About</VLink>
 * <VLink href="https://example.com" external>External</VLink>
 * <VLink as={NextLink} href="/dashboard">Dashboard</VLink>
 */
const VLink = forwardRef<HTMLAnchorElement, VLinkProps>((props, ref) => {
  const override = useComponentOverride("VLink");
  const {
    // 2. Visual
    color = (override?.defaultProps?.color as VLinkColor | undefined) ?? "primary",
    underline = (override?.defaultProps?.underline as VLinkUnderline | undefined) ?? "hover",
    // 3. Content
    children,
    href,
    external = false,
    // 10. Advanced
    as: Component = "a",
    className,
    ...rest
  } = props;

  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  const classes = cn(
    "v-link",
    "inline-flex items-center gap-1",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)] rounded-sm",
    underlineStyles[underline],
    colorStyles[color],
    override?.styles?.root,
    className,
  );

  return (
    <Component ref={ref as Ref<never>} href={href} className={classes} {...externalProps} {...rest}>
      {children}
      {external && (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            d="M3.5 1.5H10.5V8.5M10 2L4.5 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Component>
  );
});

VLink.displayName = "VLink";

export { VLink };
