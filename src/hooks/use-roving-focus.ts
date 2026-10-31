"use client";

import { useCallback, useEffect, useRef } from "react";
import type { VOrientation } from "../lib";

/** Items that count as the chosen one when the tab stop is placed. */
const SELECTED_SELECTOR = '[aria-selected="true"], [aria-checked="true"], :checked';

/** Options of useRovingFocus. */
export interface UseRovingFocusOptions {
  /**
   * CSS selector of the items inside the container.
   *
   * @default '[data-roving-item]'
   */
  selector?: string;
  /**
   * Which arrow keys move focus.
   *
   * @default 'both'
   */
  orientation?: VOrientation | "both";
  /**
   * Wrap from the last item to the first and back.
   *
   * @default true
   */
  loop?: boolean;
  /** Called with the index of the item that just received focus. */
  onActiveChange?: (index: number) => void;
}

/**
 * Arrow-key focus movement between the items of a container (roving tabindex).
 *
 * Disabled items are skipped. Call `initRoving` after render and spread `handleKeyDown`
 * onto the container's `onKeyDown`. The current position comes from the focused item, so
 * clicks and Tab keep it in sync; the tab stop follows focus, the selected item
 * (`aria-selected`, `aria-checked` or `:checked`) and later changes to the items.
 *
 * @param containerRef - Ref of the element that holds the items.
 * @param options - Selector, orientation, looping and the active-change callback.
 * @returns `handleKeyDown`, `focusItem(index)`, `initRoving()` and `getItems()`.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null)
 * const { handleKeyDown, initRoving } = useRovingFocus(ref, { orientation: 'horizontal' })
 * useEffect(initRoving)
 * return <div ref={ref} onKeyDown={handleKeyDown}><button data-roving-item>A</button></div>
 */
export function useRovingFocus(
  containerRef: React.RefObject<HTMLElement | null>,
  options: UseRovingFocusOptions = {},
) {
  const {
    selector = "[data-roving-item]",
    orientation = "both",
    loop = true,
    onActiveChange,
  } = options;

  const activeIndexRef = useRef(0);

  const getItems = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];
    return Array.from(containerRef.current.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-disabled") !== "true",
    );
  }, [containerRef, selector]);

  /** Index of the item that holds focus, or -1 when focus is elsewhere. */
  const getFocusedIndex = useCallback((items: HTMLElement[]): number => {
    const active = document.activeElement;
    if (!active) return -1;
    return items.findIndex((item) => item === active || item.contains(active));
  }, []);

  const applyTabStop = useCallback((items: HTMLElement[], index: number) => {
    items.forEach((item, i) => {
      item.setAttribute("tabindex", i === index ? "0" : "-1");
    });
    activeIndexRef.current = index;
  }, []);

  const focusItem = useCallback(
    (index: number) => {
      const items = getItems();
      if (items.length === 0) return;
      const target = Math.min(Math.max(index, 0), items.length - 1);
      applyTabStop(items, target);
      items[target]?.focus();
      onActiveChange?.(target);
    },
    [getItems, applyTabStop, onActiveChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const items = getItems();
      if (items.length === 0) return;

      // The focused item is the truth; the stored index is only a fallback
      const focusedIndex = getFocusedIndex(items);
      const currentIndex =
        focusedIndex >= 0 ? focusedIndex : Math.min(activeIndexRef.current, items.length - 1);
      let nextIndex = currentIndex;

      const isHorizontal = orientation === "horizontal" || orientation === "both";
      const isVertical = orientation === "vertical" || orientation === "both";

      switch (e.key) {
        case "ArrowRight":
          if (isHorizontal) {
            e.preventDefault();
            nextIndex = loop
              ? (currentIndex + 1) % items.length
              : Math.min(currentIndex + 1, items.length - 1);
          }
          break;
        case "ArrowDown":
          if (isVertical) {
            e.preventDefault();
            nextIndex = loop
              ? (currentIndex + 1) % items.length
              : Math.min(currentIndex + 1, items.length - 1);
          }
          break;
        case "ArrowLeft":
          if (isHorizontal) {
            e.preventDefault();
            nextIndex = loop
              ? (currentIndex - 1 + items.length) % items.length
              : Math.max(currentIndex - 1, 0);
          }
          break;
        case "ArrowUp":
          if (isVertical) {
            e.preventDefault();
            nextIndex = loop
              ? (currentIndex - 1 + items.length) % items.length
              : Math.max(currentIndex - 1, 0);
          }
          break;
        case "Home":
          e.preventDefault();
          nextIndex = 0;
          break;
        case "End":
          e.preventDefault();
          nextIndex = items.length - 1;
          break;
        default:
          return;
      }

      if (nextIndex !== currentIndex) {
        focusItem(nextIndex);
      }
    },
    [getItems, getFocusedIndex, orientation, loop, focusItem],
  );

  const initRoving = useCallback(() => {
    const items = getItems();
    if (items.length === 0) return;
    // Tab stop: the focused item, else the selected one, else the last known position
    const focusedIndex = getFocusedIndex(items);
    const selectedIndex = items.findIndex((item) => item.matches(SELECTED_SELECTOR));
    const index =
      focusedIndex >= 0
        ? focusedIndex
        : selectedIndex >= 0
          ? selectedIndex
          : Math.min(activeIndexRef.current, items.length - 1);
    applyTabStop(items, index);
  }, [getItems, getFocusedIndex, applyTabStop]);

  // Keep the tab stop right when focus arrives by click or Tab, and when items come, go or
  // become disabled after the first render.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const handleFocusIn = (e: FocusEvent) => {
      const items = getItems();
      const target = e.target as Node | null;
      const index = items.findIndex(
        (item) => item === target || (!!target && item.contains(target)),
      );
      if (index >= 0) applyTabStop(items, index);
    };
    node.addEventListener("focusin", handleFocusIn);

    const observer =
      typeof MutationObserver === "undefined" ? null : new MutationObserver(() => initRoving());
    observer?.observe(node, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["disabled", "aria-disabled"],
    });

    return () => {
      node.removeEventListener("focusin", handleFocusIn);
      observer?.disconnect();
    };
  }, [containerRef, getItems, applyTabStop, initRoving]);

  return { handleKeyDown, focusItem, initRoving, getItems };
}
