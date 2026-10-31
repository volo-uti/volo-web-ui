import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import type { VColor, VSize } from "../../../lib";

/** Look of a VIconButton. */
export type VIconButtonVariant = "default" | "filled" | "outlined" | "filledTonal";

/** Own props of VIconButton, without the accessible name. */
export interface VIconButtonOwnProps {
  // ── 1. Identity ──
  /**
   * Visual variant.
   *
   * @default 'default'
   */
  variant?: VIconButtonVariant;
  // ── 2. Visual ──
  /**
   * Component size.
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
  // ── 3. Content ──
  /** The icon. */
  children: ReactNode;
  // ── 4. Decorations ──
  /** Icon shown instead of `children` while pressed; setting it makes the button a toggle. */
  pressedIcon?: ReactNode;
  // ── 5. Header/Meta ──
  /** Hover hint, set as the native `title` attribute. */
  tooltip?: string;
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
  /** Pressed state of a toggle button (controlled). */
  pressed?: boolean;
  /**
   * Initial pressed state of a toggle button (uncontrolled).
   *
   * @default false
   */
  defaultPressed?: boolean;
  // ── 9. Callbacks ──
  /** Called with the new pressed state when the user toggles the button. */
  onPressedChange?: (pressed: boolean) => void;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}

/** Accessible name of an icon-only button: `aria-label` or `aria-labelledby` is required. */
export type VIconButtonLabel =
  | { "aria-label": string; "aria-labelledby"?: string }
  | { "aria-label"?: string; "aria-labelledby": string };

/**
 * Props of VIconButton: own props, an accessible name, and the native button props.
 *
 * @example
 * <VIconButton aria-label="Close" onClick={close}><XIcon /></VIconButton>
 */
export type VIconButtonProps = VIconButtonOwnProps &
  VIconButtonLabel &
  Omit<
    ComponentPropsWithoutRef<"button">,
    keyof VIconButtonOwnProps | "aria-label" | "aria-labelledby"
  > & { as?: ElementType };
