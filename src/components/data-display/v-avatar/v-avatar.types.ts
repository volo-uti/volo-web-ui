import type { HTMLAttributes, ReactNode } from "react";
import type { VSize } from "../../../lib";

/** VAvatar shape variant */
export type VAvatarShape = "circle" | "rounded" | "square";

/** VAvatar props — native `<div>` props are accepted too. */
export interface VAvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, "placeholder"> {
  /**
   * Shape of the avatar.
   * @default 'circle'
   */
  shape?: VAvatarShape;
  /**
   * Size variant — xs(24) sm(32) md(40) lg(48) xl(64).
   * @default 'md'
   */
  size?: VSize;
  /** Background colour override — any CSS color. */
  backgroundColor?: string;
  /** Foreground (text) colour override — any CSS color. */
  foregroundColor?: string;
  /** Fallback content shown without an image — initials string or icon. */
  fallback?: ReactNode;
  /** Content shown while the image loads. */
  placeholder?: ReactNode;
  /** Content shown when the image fails to load; replaces `fallback` then. */
  errorFallback?: ReactNode;
  /** Image source URL. */
  src?: string;
  /** Alt text for the image; an image without `alt` or `aria-label` logs a dev warning. */
  alt?: string;
}
