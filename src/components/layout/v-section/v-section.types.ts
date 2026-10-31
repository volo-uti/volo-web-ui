import type { HTMLAttributes, ReactNode } from "react";
import type { VSize } from "../../../lib";

/** Look of a VSection: plain, card or inset. */
export type VSectionVariant = "default" | "card" | "inset";

/** VSection props. */
export interface VSectionProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Visual variant.
   * @default "default"
   */
  variant?: VSectionVariant;
  /**
   * Heading; a string renders as an `<h3>`.
   * @default undefined
   */
  title?: ReactNode;
  /**
   * Text shown below the title.
   * @default undefined
   */
  description?: ReactNode;
  /**
   * Content shown below the children.
   * @default undefined
   */
  footer?: ReactNode;
  /**
   * Whether to draw dividers between children.
   * @default false
   */
  divider?: boolean;
  /**
   * Vertical spacing between the header, content and footer.
   * @default "md"
   */
  spacing?: Extract<VSize, "sm" | "md" | "lg">;
  /**
   * Makes the header a button that shows or hides the content.
   * @default false
   */
  collapsible?: boolean;
  /**
   * Open state when `collapsible` and controlled.
   * @default undefined
   */
  open?: boolean;
  /**
   * Initial open state when `collapsible` and uncontrolled.
   * @default true
   */
  defaultOpen?: boolean;
  /** Called with the next open state when the header is toggled. */
  onOpenChange?: (open: boolean) => void;
}
