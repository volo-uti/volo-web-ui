import type { HTMLAttributes, ReactNode } from "react";
import type { VColor, VSize } from "../../../lib";

/** Colours VFormBody draws its focus ring in. */
export type VFormBodyColor = Extract<VColor, "primary" | "secondary" | "destructive">;

/** Corner shape of VFormBody. */
export type VFormBodyCorner = "square" | "rounded" | "pill";

/** Surface style of VFormBody. */
export type VFormBodyVariant = "outlined" | "filled" | "underline";

/** VFormBody props. */
export interface VFormBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** Control placed inside the body, e.g. a native `<input>`. */
  children?: ReactNode;
  /**
   * Surface style.
   * @default 'outlined'
   */
  variant?: VFormBodyVariant;
  /**
   * Height, padding and font size.
   * @default 'md'
   */
  size?: VSize;
  /**
   * Colour of the focus ring.
   * @default 'primary'
   */
  color?: VFormBodyColor;
  /**
   * Corner shape.
   * @default 'rounded'
   */
  corner?: VFormBodyCorner;
  /** Element before the control, e.g. an icon or prefix. */
  leading?: ReactNode;
  /** Element after the control, e.g. an icon or suffix. */
  trailing?: ReactNode;
  /**
   * Stretches the body to the full width of its parent.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Dims the body and blocks pointer events.
   * @default false
   */
  disabled?: boolean;
  /**
   * Read-only look; the body gets a muted background.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Draws the focus ring even without focus inside.
   * @default false
   */
  focused?: boolean;
  /**
   * Error look; the border turns to the error colour.
   * @default false
   */
  error?: boolean;
  /**
   * Success look; the border turns to the success colour.
   * @default false
   */
  success?: boolean;
}
