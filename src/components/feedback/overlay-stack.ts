"use client";

import { useEffect, useRef, useState } from "react";

// Shared bookkeeping for overlays (dialog, drawer, menu) that can be open at the same time.
// It is internal to the library and not part of the public API.

// ─────────────────────────────────────────
// Body scroll lock
// ─────────────────────────────────────────

let scrollLockCount = 0;
let savedOverflow = "";

/**
 * Locks the page scroll while `active`; overlapping locks are counted.
 *
 * The original `overflow` is saved when the first lock starts and restored when the last one
 * ends, so closing overlays in any order never leaves the page locked.
 */
export function useBodyScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    if (scrollLockCount === 0) {
      savedOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    scrollLockCount += 1;
    return () => {
      scrollLockCount -= 1;
      if (scrollLockCount === 0) document.body.style.overflow = savedOverflow;
    };
  }, [active]);
}

// ─────────────────────────────────────────
// Escape stack
// ─────────────────────────────────────────

const escapeStack: object[] = [];
const handledEvents = new WeakSet<Event>();

/**
 * Calls `onEscape` when Escape is pressed and this overlay is the topmost open one.
 *
 * Overlays are ordered by the time they became active, so one key press closes one layer.
 */
export function useEscapeDismiss(active: boolean, onEscape: () => void): void {
  const callbackRef = useRef(onEscape);
  useEffect(() => {
    callbackRef.current = onEscape;
  });

  useEffect(() => {
    if (!active) return;
    const token = {};
    escapeStack.push(token);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || handledEvents.has(e)) return;
      if (escapeStack[escapeStack.length - 1] !== token) return;
      handledEvents.add(e);
      callbackRef.current();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      const index = escapeStack.indexOf(token);
      if (index !== -1) escapeStack.splice(index, 1);
    };
  }, [active]);
}

// ─────────────────────────────────────────
// Portal container + inert background
// ─────────────────────────────────────────

/** Attribute that keeps an element interactive while a modal overlay is open. */
export const INERT_IGNORE_ATTRIBUTE = "data-v-inert-ignore";

const inertStack: HTMLElement[] = [];
const managedInert = new Set<Element>();

/**
 * Makes everything outside the topmost open overlay inert.
 *
 * It walks from the overlay's container up to `document.body` and marks each sibling on the
 * way. Elements marked `data-v-inert-ignore` and elements that were already `inert` before are
 * skipped, and only the ones set here are cleared again, so the result depends on the current
 * stack and never on the order in which overlays opened or closed.
 */
function syncInert(): void {
  for (const el of managedInert) el.removeAttribute("inert");
  managedInert.clear();

  const top = inertStack[inertStack.length - 1];
  if (!top) return;

  const targets: Element[] = [];
  let node: Element = top;
  while (node !== document.body) {
    const parent = node.parentElement;
    // Detached or mounted outside the body: there is no page to make inert
    if (!parent) return;
    for (const sibling of Array.from(parent.children)) {
      if (sibling === node) continue;
      if (sibling.hasAttribute(INERT_IGNORE_ATTRIBUTE) || sibling.hasAttribute("inert")) continue;
      targets.push(sibling);
    }
    node = parent;
  }

  for (const el of targets) {
    el.setAttribute("inert", "");
    managedInert.add(el);
  }
}

/**
 * Gives a modal overlay its own mount element and makes the rest of the page inert.
 *
 * Returns the element to portal into, or `null` while the overlay is closed, on the server and
 * during the first client render, so server and client markup match. The element is appended to
 * `portalContainer` (default `document.body`) and removed on close. While it exists, every other
 * child of the body is `inert` except elements marked `data-v-inert-ignore`. With overlays
 * stacked, only the topmost one is interactive; siblings that were `inert` before stay so.
 *
 * @param open - Whether the overlay is open.
 * @param portalContainer - Element to append the mount element to; `null` or omitted means the body.
 */
export function useModalLayer(
  open: boolean,
  portalContainer?: HTMLElement | null,
): HTMLElement | null {
  const [layer, setLayer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const host = portalContainer ?? document.body;
    const node = document.createElement("div");
    node.setAttribute("data-v-overlay-portal", "");
    host.appendChild(node);
    setLayer(node);
    return () => {
      setLayer(null);
      node.remove();
    };
  }, [open, portalContainer]);

  // Follow `open` directly so the page is restored in the commit that closes the overlay
  const active = open ? layer : null;

  useEffect(() => {
    if (!active) return;
    inertStack.push(active);
    syncInert();
    return () => {
      const index = inertStack.indexOf(active);
      if (index !== -1) inertStack.splice(index, 1);
      syncInert();
    };
  }, [active]);

  return active;
}
