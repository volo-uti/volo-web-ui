"use client";

import { forwardRef, useState } from "react";
import { cn } from "../../../lib";
import type { VImageProps } from "./v-image.types";

/**
 * Image with loading placeholder, fade-in and error fallback; `ref` is the `<img>`.
 *
 * @example
 * <VImage src="/photo.jpg" alt="Photo" width={200} height={200} />
 * <VImage src="/photo.jpg" alt="Photo" borderRadius="var(--v-radius-md)" />
 */
const VImage = forwardRef<HTMLImageElement, VImageProps>((props, ref) => {
  const {
    width,
    height,
    borderRadius,
    src,
    alt = "",
    placeholder,
    errorFallback,
    fit = "cover",
    fadeInDuration = 300,
    className,
    style: styleProp,
    onLoad,
    onError,
    ...rest
  } = props;

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // A new src gets a fresh chance: forget the previous image's error and loaded state
  const [prevSrc, setPrevSrc] = useState(src);
  if (src !== prevSrc) {
    setPrevSrc(src);
    setError(false);
    setLoaded(false);
  }

  const resolveSize = (val: string | number | undefined) =>
    val === undefined ? undefined : typeof val === "number" ? `${val}px` : val;

  const containerStyle = {
    width: resolveSize(width),
    height: resolveSize(height),
    borderRadius: borderRadius !== undefined ? resolveSize(borderRadius) : undefined,
    overflow: borderRadius !== undefined ? ("hidden" as const) : undefined,
    ...styleProp,
  };

  return (
    <div className={cn("v-image", "relative inline-block", className)} style={containerStyle}>
      {!error ? (
        <>
          {!loaded && placeholder && (
            <div className="absolute inset-0 flex items-center justify-center">{placeholder}</div>
          )}
          <img
            ref={ref}
            {...rest}
            src={src}
            alt={alt}
            className="block"
            style={{
              width: "100%",
              height: "100%",
              objectFit: fit,
              opacity: loaded ? 1 : 0,
              transition: `opacity ${fadeInDuration}ms ease-in`,
            }}
            onLoad={(e) => {
              setLoaded(true);
              onLoad?.(e);
            }}
            onError={(e) => {
              setError(true);
              onError?.(e);
            }}
          />
        </>
      ) : (
        errorFallback || (
          <div
            className="flex items-center justify-center bg-[var(--v-muted)] text-[var(--v-muted-foreground)]"
            style={{ width: "100%", height: "100%" }}
          >
            <span className="text-[length:var(--v-size-lg-font-size)]">!</span>
          </div>
        )
      )}
    </div>
  );
});

VImage.displayName = "VImage";

export { VImage };
