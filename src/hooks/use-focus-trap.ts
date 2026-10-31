"use client";

import { useCallback, useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  "summary",
  "iframe",
  "audio[controls]",
  "video[controls]",
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([disabled]):not([tabindex^="-"])',
].join(", ");

/**
 * True when the element can take focus: not `hidden`, `inert`, `display: none` or `visibility: hidden`.
 *
 * Uses `getComputedStyle` rather than `offsetParent`, which jsdom never sets.
 */
function isFocusable(el: HTMLElement): boolean {
  if (el.hidden || el.closest("[inert], [hidden]")) return false;
  const style = getComputedStyle(el);
  if (style.display === "none" || style.visibility === "hidden") return false;
  // An ancestor with display: none hides the element without changing its own style.
  for (let node = el.parentElement; node; node = node.parentElement) {
    if (getComputedStyle(node).display === "none") return false;
  }
  return true;
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    isFocusable,
  );
}

/**
 * Traps focus inside a container while open and restores it on close.
 *
 * Focus lands on the first visible focusable element, or on the container itself when it has
 * none. Tab wraps at both ends and pulls stray focus back in. On close or unmount focus returns
 * to the element focused before opening, unless the user already moved it to another control.
 *
 * @param containerRef - Ref of the element that traps focus.
 * @param isOpen - Whether the trap is active; focus is restored when it turns false.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null)
 * useFocusTrap(ref, open)
 * return open ? <div ref={ref} role="dialog">...</div> : null
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  isOpen: boolean,
): void {
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const openRenderedRef = useRef(false);

  // Read the previous focus while rendering, before React commits an `autoFocus` element
  // inside the container; an effect would already see the focus inside it.
  if (!isOpen) {
    openRenderedRef.current = false;
  } else if (!openRenderedRef.current) {
    openRenderedRef.current = true;
    previouslyFocusedRef.current =
      typeof document === "undefined" ? null : (document.activeElement as HTMLElement | null);
  }

  // While open: focus into the container. On close or unmount: restore the previous focus.
  useEffect(() => {
    if (!isOpen) return;

    let container = containerRef.current;
    let ownsTabindex = false;

    // A short delay lets the DOM render before focusing
    const focusTimer = requestAnimationFrame(() => {
      container = containerRef.current ?? container;
      if (!container) return;
      const first = getFocusableElements(container)[0];
      if (first) {
        first.focus();
        return;
      }
      // Nothing to focus: make the container itself the focus target so Tab cannot leak out
      if (!container.hasAttribute("tabindex")) {
        container.setAttribute("tabindex", "-1");
        ownsTabindex = true;
      }
      container.focus();
    });

    return () => {
      cancelAnimationFrame(focusTimer);
      if (ownsTabindex) container?.removeAttribute("tabindex");
      openRenderedRef.current = false;

      const el = previouslyFocusedRef.current;
      previouslyFocusedRef.current = null;
      if (!el || typeof el.focus !== "function") return;
      // requestAnimationFrame runs it after the DOM update
      requestAnimationFrame(() => {
        // Respect a control the user moved to meanwhile (for example an outside press)
        const active = document.activeElement;
        const focusIsFree =
          !active ||
          active === document.body ||
          active === document.documentElement ||
          !!container?.contains(active);
        if (focusIsFree) el.focus();
      });
    };
  }, [isOpen, containerRef]);

  // Tab key trap handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || e.key !== "Tab") return;

      const container = containerRef.current;
      if (!container) return;

      const focusableElements = getFocusableElements(container);
      const active = document.activeElement;

      if (focusableElements.length === 0) {
        // Nothing to move to: keep focus on the container
        e.preventDefault();
        if (container.hasAttribute("tabindex")) container.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Focus is outside the container (body after a click on plain text, the trigger behind
      // the backdrop): pull it back in
      if (!active || !container.contains(active)) {
        e.preventDefault();
        (e.shiftKey ? lastElement : firstElement)?.focus();
        return;
      }

      if (e.shiftKey) {
        // Shift+Tab: wrap from the first element (or the container) to the last
        if ((active === firstElement || active === container) && lastElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: wrap from the last element to the first
        if (active === lastElement && firstElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },
    [isOpen, containerRef],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);
}
