import type { ElementType, ReactNode } from "react";
import type { PolymorphicComponentPropsWithRef, VColor, VSize } from "../../../lib";

/** Look of a VButton. */
export type VButtonVariant = "filled" | "outlined" | "text" | "ghost" | "icon" | "link";

/** Corner style of a VButton. */
export type VButtonCorner = "square" | "rounded" | "pill" | "circle";

/** Horizontal alignment of the content of a VButton. */
export type VButtonAlign = "left" | "center" | "right";

/** Where the spinner appears while a VButton is loading. */
export type VButtonLoadingPosition = "center" | "start" | "end";

/** Own props of VButton (before the polymorphic merge). */
export interface VButtonOwnProps {
  // ── 1. Identity ──
  /**
   * Visual variant.
   *
   * @default 'filled'
   */
  variant?: VButtonVariant;
  // ── 2. Visual ──
  /**
   * Component size; maps to the `--v-size-{size}-*` CSS variables.
   *
   * @default 'md'
   */
  size?: VSize;
  /**
   * Semantic colour.
   *
   * @default 'primary'
   */
  color?: VColor;
  /**
   * Corner style.
   *
   * @default 'rounded'
   */
  corner?: VButtonCorner;
  // ── 3. Content ──
  /** Label of the button. */
  children?: ReactNode;
  // ── 4. Decorations ──
  /** Content placed before the label (icon, avatar). */
  leading?: ReactNode;
  /** Content placed after the label (icon, badge). */
  trailing?: ReactNode;
  /** Gap in px between `leading` and the label; defaults to the size's gap token. */
  leadingGap?: number;
  /** Gap in px between the label and `trailing`; defaults to the size's gap token. */
  trailingGap?: number;
  /** Replaces the default spinner shown while `loading`. */
  loadingIndicator?: ReactNode;
  // ── 5. Header/Meta ──
  /** Hover hint, set as the native `title` attribute. */
  tooltip?: string;
  // ── 7. Layout ──
  /**
   * Stretches the button to the full width of its container.
   *
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Horizontal alignment of the content.
   *
   * @default 'center'
   */
  align?: VButtonAlign;
  // ── 8. State ──
  /**
   * Disables the button.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows a spinner and blocks interaction.
   *
   * @default false
   */
  loading?: boolean;
  /**
   * Where the spinner appears while `loading`.
   *
   * @default 'center'
   */
  loadingPosition?: VButtonLoadingPosition;
  // ── 9. Callbacks ──
  /** Called when the pointer stays pressed for 500 ms. */
  onLongPress?: () => void;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}

/**
 * Polymorphic VButton props; `as` changes the rendered element.
 *
 * @example
 * <VButton as="a" href="/path" />
 */
export type VButtonProps<E extends ElementType = "button"> = PolymorphicComponentPropsWithRef<
  E,
  VButtonOwnProps
>;
