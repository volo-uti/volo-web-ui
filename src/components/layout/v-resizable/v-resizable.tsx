"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import type { VOrientation } from "../../../lib";
import { cn, createSafeContext } from "../../../lib";
import type {
  VResizableHandleProps,
  VResizablePanelGroupProps,
  VResizablePanelProps,
} from "./v-resizable.types";

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────

/** Floating-point comparison tolerance */
const SIZE_EPSILON = 0.0001;

/** Keyboard resize step in pixels */
const KEYBOARD_STEP = 10;

/** Handle thickness in pixels */
const HANDLE_SIZE = 4;

// ─────────────────────────────────────────
// Context
// ─────────────────────────────────────────

interface PanelConfig {
  minSize: number;
  maxSize: number;
  collapsible: boolean;
  collapsedSize: number;
}

interface PanelCallbacks {
  onCollapse?: () => void;
  onExpand?: () => void;
  onSizeChange?: (size: number) => void;
}

interface ResizableContextValue {
  direction: VOrientation;
  sizes: number[];
  registerCallbacks: (index: number, callbacks: PanelCallbacks) => void;
  onDragStart: (handleIndex: number) => void;
  onDragUpdate: (handleIndex: number, delta: number) => void;
  onDragEnd: () => void;
  onCollapse: (handleIndex: number) => void;
}

const [ResizableProvider, useResizable] =
  createSafeContext<ResizableContextValue>("VResizablePanelGroup");

// ─────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────

function normalizeSizes(sizes: number[]): number[] {
  const total = sizes.reduce((sum, s) => sum + s, 0);
  if (total > 0 && Math.abs(total - 1) > SIZE_EPSILON) {
    return sizes.map((s) => s / total);
  }
  return sizes;
}

// ─────────────────────────────────────────
// VResizablePanelGroup
// ─────────────────────────────────────────

/**
 * Split panels with draggable handles.
 *
 * @example
 * <VResizablePanelGroup direction="horizontal">
 *   <VResizablePanel defaultSize={0.3}>
 *     <Sidebar />
 *   </VResizablePanel>
 *   <VResizableHandle />
 *   <VResizablePanel defaultSize={0.7}>
 *     <MainContent />
 *   </VResizablePanel>
 * </VResizablePanelGroup>
 */
const VResizablePanelGroup = forwardRef<HTMLDivElement, VResizablePanelGroupProps>((props, ref) => {
  const {
    // 3. Content
    children,
    // 5. Layout
    direction = "horizontal",
    // 7. Callbacks
    onValueChange,
    // 8. Advanced
    className,
    ...rest
  } = props;

  const [sizes, setSizes] = useState<number[]>([]);
  // The latest sizes, readable synchronously; callbacks fire from handlers, never from updaters.
  const sizesRef = useRef<number[]>([]);
  const panelConfigsRef = useRef<PanelConfig[]>([]);
  const configKeyRef = useRef<string | null>(null);
  // Sizes captured before a panel collapsed, so expanding restores the whole layout.
  const collapseSnapshotsRef = useRef<Map<number, number[]>>(new Map());
  const callbacksRef = useRef<PanelCallbacks[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const commitSizes = useCallback((next: number[]) => {
    sizesRef.current = next;
    setSizes(next);
  }, []);

  const registerCallbacks = useCallback((index: number, callbacks: PanelCallbacks) => {
    if (index >= 0) callbacksRef.current[index] = callbacks;
  }, []);

  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  // Read the panel configs from the DOM; reset the sizes only when the panel set or its config changes.
  useEffect(() => {
    // Collect defaultSize from VResizablePanel children via DOM data attributes
    const container = containerRef.current;
    if (!container) return;

    const panelEls = container.querySelectorAll<HTMLElement>(":scope > [data-v-panel]");
    const newSizes: number[] = [];
    const configs: PanelConfig[] = [];
    const keyParts: string[] = [];

    panelEls.forEach((el) => {
      const defaultSize = parseFloat(el.dataset.vPanelDefaultSize ?? "0");
      const minSize = parseFloat(el.dataset.vPanelMinSize ?? "0");
      const maxSize = parseFloat(el.dataset.vPanelMaxSize ?? "1");
      const collapsible = el.dataset.vPanelCollapsible === "true";
      const collapsedSize = parseFloat(el.dataset.vPanelCollapsedSize ?? "0");

      newSizes.push(defaultSize);
      configs.push({ minSize, maxSize, collapsible, collapsedSize });
      keyParts.push([defaultSize, minSize, maxSize, collapsible, collapsedSize].join(":"));
    });

    const key = keyParts.join("|");
    if (newSizes.length === 0 || key === configKeyRef.current) return;

    configKeyRef.current = key;
    panelConfigsRef.current = configs;
    collapseSnapshotsRef.current.clear();
    commitSizes(normalizeSizes(newSizes));
  });

  const getContainerSize = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 0;
    return direction === "horizontal" ? el.offsetWidth : el.offsetHeight;
  }, [direction]);

  const onDragStart = useCallback((_handleIndex: number) => {
    // Could track dragging state if needed for styling
  }, []);

  const onDragUpdate = useCallback(
    (handleIndex: number, delta: number) => {
      const configs = panelConfigsRef.current;
      if (handleIndex < 0 || handleIndex >= configs.length - 1) return;

      const totalSize = getContainerSize();
      if (totalSize <= 0) return;

      // Subtract handle sizes from total
      const handleCount = configs.length - 1;
      const availableSize = totalSize - handleCount * HANDLE_SIZE;
      if (availableSize <= 0) return;

      const deltaRatio = delta / availableSize;

      const prev = sizesRef.current;
      const leftIndex = handleIndex;
      const rightIndex = handleIndex + 1;
      const leftConfig = configs[leftIndex];
      const rightConfig = configs[rightIndex];
      const prevLeft = prev[leftIndex];
      const prevRight = prev[rightIndex];

      if (!leftConfig || !rightConfig || prevLeft === undefined || prevRight === undefined) {
        return;
      }

      // Clamp the shared delta so neither side leaves its [minSize, maxSize] range.
      // A side that already violates its range is never forced to move.
      const lowest = Math.min(
        Math.max(leftConfig.minSize - prevLeft, prevRight - rightConfig.maxSize),
        0,
      );
      const highest = Math.max(
        Math.min(leftConfig.maxSize - prevLeft, prevRight - rightConfig.minSize),
        0,
      );
      const applied = Math.min(Math.max(deltaRatio, lowest), highest);

      // Only update if there's actual change
      if (Math.abs(applied) <= SIZE_EPSILON) return;

      const newLeft = prevLeft + applied;
      const newRight = prevRight - applied;
      const next = [...prev];
      next[leftIndex] = newLeft;
      next[rightIndex] = newRight;

      commitSizes(normalizeSizes(next));

      // Notify panel resize callbacks
      callbacksRef.current[leftIndex]?.onSizeChange?.(newLeft);
      callbacksRef.current[rightIndex]?.onSizeChange?.(newRight);
    },
    [getContainerSize, commitSizes],
  );

  const onDragEnd = useCallback(() => {
    onValueChange?.(sizesRef.current);
  }, [onValueChange]);

  const onCollapse = useCallback(
    (handleIndex: number) => {
      const configs = panelConfigsRef.current;

      // Try collapsing the panel before this handle (left/top panel)
      const panelIndex = handleIndex;
      if (panelIndex < 0 || panelIndex >= configs.length) return;

      const config = configs[panelIndex];
      if (!config || !config.collapsible) return;

      const prev = sizesRef.current;
      const prevSize = prev[panelIndex];
      if (prevSize === undefined) return;

      const isCollapsed = prevSize <= config.collapsedSize + 0.001;
      const snapshots = collapseSnapshotsRef.current;

      if (isCollapsed) {
        // Expand: restore the layout from before the collapse when it is known
        const snapshot = snapshots.get(panelIndex);
        snapshots.delete(panelIndex);
        if (snapshot && snapshot.length === prev.length) {
          commitSizes(snapshot);
        } else {
          const next = [...prev];
          next[panelIndex] = 0.2;
          commitSizes(normalizeSizes(next));
        }
        callbacksRef.current[panelIndex]?.onExpand?.();
      } else {
        // Collapse
        snapshots.set(panelIndex, [...prev]);
        const next = [...prev];
        next[panelIndex] = config.collapsedSize;
        commitSizes(normalizeSizes(next));
        callbacksRef.current[panelIndex]?.onCollapse?.();
      }
    },
    [commitSizes],
  );

  const contextValue: ResizableContextValue = {
    direction,
    sizes,
    registerCallbacks,
    onDragStart,
    onDragUpdate,
    onDragEnd,
    onCollapse,
  };

  return (
    <ResizableProvider value={contextValue}>
      <div
        {...rest}
        ref={mergedRef}
        className={cn(
          "v-resizable-panel-group",
          "flex",
          direction === "horizontal" ? "flex-row" : "flex-col",
          "h-full w-full",
          className,
        )}
        data-v-direction={direction}
      >
        {children}
      </div>
    </ResizableProvider>
  );
});

VResizablePanelGroup.displayName = "VResizablePanelGroup";

// ─────────────────────────────────────────
// VResizablePanel
// ─────────────────────────────────────────

/**
 * Panel inside a VResizablePanelGroup; its size follows the group.
 *
 * @example
 * <VResizablePanel defaultSize={0.3} minSize={0.15} maxSize={0.5}>
 *   <Sidebar />
 * </VResizablePanel>
 */
const VResizablePanel = forwardRef<HTMLDivElement, VResizablePanelProps>((props, ref) => {
  const {
    // 3. Content
    children,
    defaultSize,
    // 5. Layout
    minSize = 0,
    maxSize = 1,
    // 6. State
    collapsible = false,
    collapsedSize = 0,
    // 7. Callbacks
    onCollapse,
    onExpand,
    onSizeChange,
    // 8. Advanced
    className,
    style: styleProp,
    ...rest
  } = props;

  const { sizes, registerCallbacks } = useResizable();
  const indexRef = useRef(-1);

  // Determine panel index from sibling position
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const panels = parent.querySelectorAll<HTMLElement>(":scope > [data-v-panel]");
    panels.forEach((p, i) => {
      if (p === el) indexRef.current = i;
    });
  });

  useEffect(() => {
    registerCallbacks(indexRef.current, { onCollapse, onExpand, onSizeChange });
  });

  const panelIndex = indexRef.current;
  const resolvedSize =
    panelIndex >= 0 && panelIndex < sizes.length ? (sizes[panelIndex] ?? defaultSize) : defaultSize;

  // Calculate flex-basis as percentage
  const percentage = resolvedSize * 100;
  const flexStyle: React.CSSProperties = {
    ...styleProp,
    flexBasis: `calc(${percentage}% - ${HANDLE_SIZE}px * ${sizes.length > 1 ? (sizes.length - 1) / sizes.length : 0})`,
    flexGrow: 0,
    flexShrink: 0,
    overflow: "hidden",
  };

  // Merge refs
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      (panelRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  return (
    <div
      ref={mergedRef}
      className={cn("v-resizable-panel", "overflow-hidden", className)}
      style={flexStyle}
      data-v-panel
      data-v-panel-index={panelIndex >= 0 ? panelIndex : undefined}
      data-v-panel-default-size={defaultSize}
      data-v-panel-min-size={minSize}
      data-v-panel-max-size={maxSize}
      data-v-panel-collapsible={collapsible || undefined}
      data-v-panel-collapsed-size={collapsedSize}
      {...rest}
    >
      {children}
    </div>
  );
});

VResizablePanel.displayName = "VResizablePanel";

// ─────────────────────────────────────────
// VResizableHandle
// ─────────────────────────────────────────

/**
 * Draggable divider between panels; arrow keys resize by 10px, double-click collapses.
 *
 * @example
 * <VResizableHandle />
 * <VResizableHandle withHandle={false} />
 * <VResizableHandle disabled />
 */
const VResizableHandle = forwardRef<HTMLDivElement, VResizableHandleProps>((props, ref) => {
  const {
    // 2. Visual
    withHandle = true,
    // 6. State
    disabled = false,
    // 7. Callbacks
    onPointerDown,
    onDoubleClick,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    // 8. Advanced
    className,
    ...rest
  } = props;

  const { direction, sizes, onDragStart, onDragUpdate, onDragEnd, onCollapse } = useResizable();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const handleRef = useRef<HTMLDivElement>(null);
  const handleIndexRef = useRef(-1);

  const isHorizontal = direction === "horizontal";

  // Determine handle index from sibling position
  useEffect(() => {
    const el = handleRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const handles = parent.querySelectorAll<HTMLElement>(":scope > [data-v-handle]");
    handles.forEach((h, i) => {
      if (h === el) handleIndexRef.current = i;
    });
  });

  // Pointer-based drag handling
  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      const delta = isHorizontal ? e.movementX : e.movementY;
      onDragUpdate(handleIndexRef.current, delta);
    };

    // pointercancel ends the drag too: touch scrolling can take the gesture over.
    const handlePointerUp = () => {
      setIsDragging(false);
      onDragEnd();
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", handlePointerUp);
    document.body.style.cursor = isHorizontal ? "col-resize" : "row-resize";
    document.body.style.userSelect = "none";

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", handlePointerUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, isHorizontal, onDragUpdate, onDragEnd]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerDown?.(e);
      if (disabled || e.defaultPrevented) return;
      e.preventDefault();
      setIsDragging(true);
      onDragStart(handleIndexRef.current);
    },
    [disabled, onDragStart, onPointerDown],
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onDoubleClick?.(e);
      if (disabled || e.defaultPrevented) return;
      onCollapse(handleIndexRef.current);
    },
    [disabled, onCollapse, onDoubleClick],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (disabled || e.defaultPrevented) return;

      if (isHorizontal) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          onDragUpdate(handleIndexRef.current, -KEYBOARD_STEP);
          onDragEnd();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          onDragUpdate(handleIndexRef.current, KEYBOARD_STEP);
          onDragEnd();
        }
      } else {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          onDragUpdate(handleIndexRef.current, -KEYBOARD_STEP);
          onDragEnd();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          onDragUpdate(handleIndexRef.current, KEYBOARD_STEP);
          onDragEnd();
        }
      }
    },
    [disabled, isHorizontal, onDragUpdate, onDragEnd, onKeyDown],
  );

  // Merge refs
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      (handleRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  const isActive = isHovered || isDragging;

  return (
    <div
      ref={mergedRef}
      role="separator"
      aria-orientation={isHorizontal ? "vertical" : "horizontal"}
      aria-valuenow={Math.round((sizes[handleIndexRef.current] ?? 0) * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        "v-resizable-handle",
        "relative flex shrink-0 items-center justify-center touch-none",
        isHorizontal ? "w-[4px]" : "h-[4px]",
        !disabled && (isHorizontal ? "cursor-col-resize" : "cursor-row-resize"),
        disabled && "cursor-default opacity-50",
        isActive && !disabled && "bg-[var(--v-muted)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-ring)]",
        "transition-colors duration-[var(--v-duration-fast)]",
        className,
      )}
      style={
        isHorizontal
          ? { width: HANDLE_SIZE, minWidth: HANDLE_SIZE }
          : { height: HANDLE_SIZE, minHeight: HANDLE_SIZE }
      }
      data-v-handle
      data-v-state={isDragging ? "dragging" : isHovered ? "hover" : "idle"}
      data-v-direction={direction}
      onPointerDown={handlePointerDown}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        if (!disabled) setIsHovered(true);
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        setIsHovered(false);
      }}
      {...rest}
    >
      {withHandle && (
        <div
          className={cn(
            "rounded-[var(--v-radius-xs)] bg-[var(--v-border)]",
            isHorizontal ? "h-4 w-[4px]" : "h-[4px] w-4",
          )}
        />
      )}
    </div>
  );
});

VResizableHandle.displayName = "VResizableHandle";

export { VResizablePanelGroup, VResizablePanel, VResizableHandle };
