"use client";

import { forwardRef, useState } from "react";
import { cn } from "../../../lib";
import { devWarning } from "../../../utils/dev-warning";
import type { VSize } from "../../../lib";
import type { VAvatarProps, VAvatarShape } from "./v-avatar.types";

const sizeStyles: Record<VSize, string> = {
  xs: "h-6 w-6 text-[length:var(--v-size-xs-font-size)]",
  sm: "h-[var(--v-size-sm-height)] w-[var(--v-size-sm-height)] text-[length:var(--v-size-sm-font-size)]",
  md: "h-[var(--v-size-md-height)] w-[var(--v-size-md-height)] text-[length:var(--v-size-md-font-size)]",
  lg: "h-[var(--v-size-lg-height)] w-[var(--v-size-lg-height)] text-[length:var(--v-size-lg-font-size)]",
  xl: "h-[var(--v-size-xl-height)] w-[var(--v-size-xl-height)] text-[length:var(--v-size-xl-font-size)]",
};

const shapeStyles: Record<VAvatarShape, string> = {
  circle: "rounded-full",
  square: "rounded-none",
  rounded: "rounded-[var(--v-radius-md)]",
};

/**
 * User avatar with image, initials or icon fallback; focusable when it has `onClick`.
 *
 * @example
 * <VAvatar src="/photo.jpg" alt="Jane Doe" />
 * <VAvatar fallback="JD" size="lg" aria-label="Jane Doe" />
 * <VAvatar src="/photo.jpg" alt="Jane Doe" onClick={() => openProfile()} />
 */
const VAvatar = forwardRef<HTMLDivElement, VAvatarProps>((props, ref) => {
  const {
    shape = "circle",
    size = "md",
    backgroundColor,
    foregroundColor,
    src,
    alt = "",
    "aria-label": ariaLabel,
    fallback,
    placeholder,
    errorFallback,
    onClick,
    className,
    onKeyDown,
    ...rest
  } = props;

  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // A new src gets a fresh chance: forget the previous image's error and loaded state
  const [prevSrc, setPrevSrc] = useState(src);
  if (src !== prevSrc) {
    setPrevSrc(src);
    setImgError(false);
    setImgLoaded(false);
  }

  if (src && !alt && !ariaLabel) {
    devWarning("VAvatar", "image src provided without alt or aria-label for accessibility");
  }

  const effectiveLabel = ariaLabel || alt || (typeof fallback === "string" ? fallback : undefined);

  const classes = cn(
    "v-avatar",
    "relative inline-flex items-center justify-center overflow-hidden",
    "font-[var(--v-font-weight-semibold)]",
    "select-none shrink-0",
    !backgroundColor && "bg-[var(--v-muted)]",
    !foregroundColor && "text-[var(--v-muted-foreground)]",
    sizeStyles[size],
    shapeStyles[shape],
    onClick && "cursor-pointer active:scale-95 transition-transform",
    className,
  );

  const renderFallbackContent = () => {
    if (errorFallback) return errorFallback;
    if (fallback) {
      return (
        <span className="flex items-center justify-center leading-none" aria-hidden="true">
          {fallback}
        </span>
      );
    }
    // Default person icon fallback
    return (
      <svg className="h-[60%] w-[60%]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    );
  };

  return (
    <div
      ref={ref}
      // An image role needs a name; an avatar with no name is decorative, so it gets no role
      role={onClick ? "button" : effectiveLabel ? "img" : undefined}
      aria-label={effectiveLabel}
      className={classes}
      data-v-size={size}
      data-v-shape={shape}
      style={{
        backgroundColor: backgroundColor || undefined,
        color: foregroundColor || undefined,
      }}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
      onClick={onClick}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (onClick && e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          e.currentTarget.click();
        }
      }}
    >
      {src && !imgError ? (
        <>
          {!imgLoaded && placeholder}
          <img
            src={src}
            alt={alt}
            className={cn("h-full w-full object-cover", !imgLoaded && "sr-only")}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        </>
      ) : (
        renderFallbackContent()
      )}
    </div>
  );
});

VAvatar.displayName = "VAvatar";

export { VAvatar };
