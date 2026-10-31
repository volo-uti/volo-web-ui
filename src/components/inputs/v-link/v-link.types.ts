import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/** Underline behaviour of a VLink. */
export type VLinkUnderline = "always" | "hover" | "none";

/** Colour of a VLink: the primary colour, a muted one, or the surrounding text colour. */
export type VLinkColor = "primary" | "secondary" | "inherit";

/** Own props of VLink. */
export interface VLinkOwnProps {
  // ── 2. Visual ──
  /**
   * Link colour.
   *
   * @default 'primary'
   */
  color?: VLinkColor;
  /**
   * Underline behaviour.
   *
   * @default 'hover'
   */
  underline?: VLinkUnderline;
  // ── 3. Content ──
  /** Link content. */
  children?: ReactNode;
  /** Link destination. */
  href?: string;
  /**
   * Opens in a new tab (`target="_blank"`, `rel="noopener noreferrer"`) and shows an arrow icon.
   *
   * @default false
   */
  external?: boolean;
  // ── 10. Advanced ──
  /** Element or router Link to render instead of `<a>`. */
  as?: ElementType;
  /** Additional class names (Tailwind). */
  className?: string;
}

/**
 * Props of VLink: own props and the native anchor props (`target`, `rel`, ...).
 *
 * @example
 * <VLink href="/about">About</VLink>
 */
export type VLinkProps = VLinkOwnProps & Omit<ComponentPropsWithoutRef<"a">, keyof VLinkOwnProps>;
