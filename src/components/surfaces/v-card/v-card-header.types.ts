import type { HTMLAttributes, ReactNode } from "react";

/** VCardHeader props. */
export interface VCardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Title shown in the semibold first line. */
  title?: ReactNode;
  /** Muted line below the title. */
  description?: ReactNode;
  /** Content pinned to the right, such as an icon button. */
  action?: ReactNode;
}
