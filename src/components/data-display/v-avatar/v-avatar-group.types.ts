import type { HTMLAttributes, ReactNode } from "react";
import type { VSize } from "../../../lib";

/** VAvatarGroup props — native `<div>` props are accepted too. */
export interface VAvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Avatar size, applied to every child VAvatar.
   * @default 'md'
   */
  size?: VSize;
  /** VAvatar children. */
  children: ReactNode;
  /** Maximum number of avatars to display; the rest collapse into a "+N" indicator. */
  max?: number;
  /** Renders the indicator for the avatars beyond `max`; receives the hidden count. */
  renderSurplus?: (count: number) => ReactNode;
}
