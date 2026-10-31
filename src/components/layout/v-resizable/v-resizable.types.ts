import type { HTMLAttributes, ReactNode } from "react";
import type { VOrientation } from "../../../lib";

/** VResizablePanelGroup props. */
export interface VResizablePanelGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Panels and the handles between them. */
  children?: ReactNode;
  /**
   * Axis the panels are laid out along.
   * @default "horizontal"
   */
  direction?: VOrientation;
  /** Called with the panel sizes (fractions 0-1) after a drag or keyboard resize. */
  onValueChange?: (sizes: number[]) => void;
}

/** VResizablePanel props. */
export interface VResizablePanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Panel content. */
  children?: ReactNode;
  /** Initial size as a fraction of the group, 0 to 1. */
  defaultSize: number;
  /**
   * Smallest size as a fraction, 0 to 1.
   * @default 0
   */
  minSize?: number;
  /**
   * Largest size as a fraction, 0 to 1.
   * @default 1
   */
  maxSize?: number;
  /**
   * Whether double-clicking the handle after this panel collapses it.
   * @default false
   */
  collapsible?: boolean;
  /**
   * Size as a fraction when collapsed.
   * @default 0
   */
  collapsedSize?: number;
  /** Called when the panel collapses. */
  onCollapse?: () => void;
  /** Called when the panel expands again. */
  onExpand?: () => void;
  /** Called with the new size (fraction 0-1) when a resize changes this panel. */
  onSizeChange?: (size: number) => void;
}

/** VResizableHandle props. */
export interface VResizableHandleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to show the grip on the handle.
   * @default true
   */
  withHandle?: boolean;
  /**
   * Disables dragging, keyboard resizing and collapsing.
   * @default false
   */
  disabled?: boolean;
}
