import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { VColor, VSize } from "../../../lib";

/** Look of a VFab. */
export type VFabVariant = "filled" | "tonal" | "outlined";

/** Sizes a VFab comes in: 40, 56 and 96 px. */
export type VFabSize = Extract<VSize, "sm" | "md" | "lg">;

/** Where a VFab sits on the screen; `static` leaves it in the normal flow. */
export type VFabPosition = "bottom-right" | "bottom-left" | "bottom-center" | "static";

/** Own props of VFab. */
export interface VFabOwnProps {
  // ── 1. Identity ──
  /**
   * Visual variant.
   *
   * @default 'filled'
   */
  variant?: VFabVariant;
  // ── 2. Visual ──
  /**
   * Component size.
   *
   * @default 'md'
   */
  size?: VFabSize;
  /**
   * Semantic colour.
   *
   * @default 'primary'
   */
  color?: VColor;
  /** Background colour; any CSS color. Overrides `color`. */
  backgroundColor?: string;
  /** Icon and label colour; any CSS color. Overrides `color`. */
  foregroundColor?: string;
  // ── 3. Content ──
  /** Text next to the icon; setting it makes the FAB extended. */
  label?: ReactNode;
  // ── 4. Decorations ──
  /** The icon. */
  icon?: ReactNode;
  // ── 5. Header/Meta ──
  /** Hover hint, set as the native `title`; also the accessible name of an icon-only FAB. */
  tooltip?: string;
  // ── 7. Layout ──
  /**
   * Fixed placement on the screen.
   *
   * @default 'bottom-right'
   */
  position?: VFabPosition;
  // ── 8. State ──
  /**
   * Disables the button.
   *
   * @default false
   */
  disabled?: boolean;
  // ── 10. Advanced ──
  /** Additional class names (Tailwind). */
  className?: string;
}

/**
 * Props of VFab: own props and the native button props.
 *
 * @example
 * <VFab icon={<PlusIcon />} tooltip="New note" onClick={create} />
 */
export type VFabProps = VFabOwnProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof VFabOwnProps | "children">;
