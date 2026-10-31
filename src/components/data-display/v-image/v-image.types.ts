import type { CSSProperties, ImgHTMLAttributes, ReactNode } from "react";

/**
 * VImage props — native `<img>` props (`srcSet`, `sizes`, `loading`, `crossOrigin`, `onLoad`, …)
 * go to the image; `className` and `style` go to the wrapper.
 */
export interface VImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "placeholder" | "width" | "height" | "src"
> {
  /** Image source URL. */
  src: string;
  /**
   * CSS object-fit of the image.
   * @default 'cover'
   */
  fit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  /** Border radius of the wrapper — CSS value, or a number in px. */
  borderRadius?: string | number;
  /** Content shown while the image loads. */
  placeholder?: ReactNode;
  /** Content shown when the image fails to load; a default "!" tile otherwise. */
  errorFallback?: ReactNode;
  /** Wrapper width — CSS value, or a number in px. */
  width?: number | string;
  /** Wrapper height — CSS value, or a number in px. */
  height?: number | string;
  /**
   * Fade-in animation duration in ms.
   * @default 300
   */
  fadeInDuration?: number;
  /** Styles of the wrapper element. */
  style?: CSSProperties;
}
