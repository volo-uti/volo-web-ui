import { useCallback, useRef, useState, type ReactNode } from "react";
import type { VSnackbarVariant } from "../components/feedback/v-snackbar";

/** One snackbar waiting in a `useSnackbarQueue` queue; spread it onto VSnackbar. */
export interface SnackbarQueueItem {
  /** Unique key; generated when omitted. */
  key?: string;
  /** Colour and icon of the snackbar. */
  variant?: VSnackbarVariant;
  /** The message. */
  content: ReactNode;
  /** Action button shown after the message. */
  action?: { label: string; onClick: () => void };
  /**
   * Milliseconds before the snackbar is dismissed.
   *
   * @default 5000
   */
  duration?: number;
}

/**
 * Queues snackbars and exposes the current one.
 *
 * `show` enqueues; `dismiss` moves on to the next; `clear` empties the queue.
 *
 * @example
 * const { current, show, dismiss, clear } = useSnackbarQueue()
 *
 * show({ content: 'First' })
 * show({ content: 'Second' }) // queued, shown after first
 *
 * // Pass current to VSnackbar
 * {current && <VSnackbar visible {...current} onClose={dismiss} />}
 */
export function useSnackbarQueue() {
  const [current, setCurrent] = useState<SnackbarQueueItem | null>(null);
  // Live copy of `current`: `show` and `dismiss` can run several times before a re-render
  const currentRef = useRef<SnackbarQueueItem | null>(null);
  const queueRef = useRef<SnackbarQueueItem[]>([]);
  const keyCounterRef = useRef(0);

  const present = useCallback((item: SnackbarQueueItem | null) => {
    currentRef.current = item;
    setCurrent(item);
  }, []);

  const showNext = useCallback(() => {
    present(queueRef.current.shift() ?? null);
  }, [present]);

  const show = useCallback(
    (item: SnackbarQueueItem) => {
      const withKey = {
        ...item,
        key: item.key ?? `snackbar-${++keyCounterRef.current}`,
      };
      if (currentRef.current === null) {
        present(withKey);
      } else {
        queueRef.current.push(withKey);
      }
    },
    [present],
  );

  const dismiss = useCallback(() => {
    showNext();
  }, [showNext]);

  const clear = useCallback(() => {
    queueRef.current = [];
    present(null);
  }, [present]);

  return {
    /** Currently displayed snackbar (null if none) */
    current,
    /** Enqueue a snackbar — shows immediately if none active, otherwise queued */
    show,
    /** Dismiss the current snackbar — triggers next in queue */
    dismiss,
    /** Clear all queued snackbars and dismiss current */
    clear,
  };
}
