import { forwardRef, type ElementType, type KeyboardEvent, type Ref } from "react";
import { cn } from "../../../lib";
import type { VListTileProps } from "./v-list-tile.types";

/**
 * Row with leading, title, subtitle and trailing slots; pressable with `onClick`.
 *
 * @example
 * <VListTile
 *   title="Inbox"
 *   subtitle="3 unread"
 *   leading={<VAvatar fallback="I" size="sm" />}
 *   selected={folder === 'inbox'}
 *   onClick={() => setFolder('inbox')}
 * />
 */
const VListTile = forwardRef<HTMLDivElement, VListTileProps & { as?: ElementType }>(
  (props, ref) => {
    const {
      children,
      title,
      subtitle,
      leading,
      trailing,
      tileColor,
      selectedTileColor,
      dense = false,
      threeLine = false,
      disabled = false,
      selected = false,
      as: Component = "div",
      className,
      style,
      onClick,
      onKeyDown,
      ...restProps
    } = props;

    const isInteractive = onClick !== undefined || Component !== "div";
    // Native links and buttons already take focus and Enter/Space; other elements need help
    const isNativeControl = (["a", "button"] as ElementType[]).includes(Component);
    const needsKeyboardSupport = isInteractive && !isNativeControl;

    return (
      <Component
        ref={ref as Ref<never>}
        role={isInteractive ? "button" : undefined}
        aria-disabled={disabled || undefined}
        aria-current={selected ? "true" : undefined}
        tabIndex={needsKeyboardSupport ? (disabled ? -1 : 0) : undefined}
        data-v-dense={dense || undefined}
        data-v-selected={selected || undefined}
        className={cn(
          "v-list-tile",
          "flex items-center gap-[var(--v-spacing-lg)]",
          dense
            ? "py-[var(--v-spacing-xs)] px-[var(--v-spacing-lg)]"
            : "py-[var(--v-spacing-sm)] px-[var(--v-spacing-lg)]",
          isInteractive &&
            "cursor-pointer hover:bg-[var(--v-accent)] active:bg-[var(--v-accent)]/80 transition-all duration-150",
          "focus-visible:ring-2 focus-visible:ring-[var(--v-ring)]",
          selected && "bg-[var(--v-accent)]",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        style={{
          ...(selected
            ? { backgroundColor: selectedTileColor ?? tileColor }
            : { backgroundColor: tileColor }),
          ...style,
        }}
        onClick={disabled ? undefined : onClick}
        {...restProps}
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
          onKeyDown?.(e);
          if (
            needsKeyboardSupport &&
            !disabled &&
            !e.defaultPrevented &&
            e.target === e.currentTarget &&
            (e.key === "Enter" || e.key === " ")
          ) {
            e.preventDefault();
            e.currentTarget.click();
          }
        }}
      >
        {leading && <div className="shrink-0 flex items-center">{leading}</div>}
        <div
          className={cn("flex flex-col flex-1 min-w-0", threeLine && "gap-[var(--v-spacing-xxs)]")}
        >
          <div className="text-[length:var(--v-size-md-font-size)] text-[var(--v-foreground)] truncate">
            {title}
          </div>
          {subtitle && (
            <div
              className={cn(
                "text-[length:var(--v-size-sm-font-size)] text-[var(--v-muted-foreground)]",
                threeLine ? "line-clamp-2" : "truncate",
              )}
            >
              {subtitle}
            </div>
          )}
          {children}
        </div>
        {trailing && <div className="shrink-0 flex items-center">{trailing}</div>}
      </Component>
    );
  },
);

VListTile.displayName = "VListTile";

export { VListTile };
