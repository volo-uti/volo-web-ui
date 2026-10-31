import {
  Children,
  Fragment,
  isValidElement,
  type CSSProperties,
  type MutableRefObject,
  type ReactElement,
  type ReactNode,
  type Ref,
  type SyntheticEvent,
} from "react";

// Shared plumbing for the `asChild` prop of the popover, hover card and menu triggers.
// It is internal to the library and not part of the public API.

/** The props of a trigger child that the `asChild` triggers read or set. */
export interface AsChildElementProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  /** React 19 passes `ref` as a regular prop. */
  ref?: Ref<HTMLElement>;
  [key: string]: unknown;
}

/** An event handler as it sits in a child's props. */
type Handler<E extends SyntheticEvent> = ((event: E) => void) | undefined;

/**
 * Returns the single element child of an `asChild` trigger.
 *
 * Throws a descriptive error when `children` is not exactly one React element, because a text,
 * a fragment or several elements have no single node to receive the trigger props.
 */
export function getAsChildElement(
  children: ReactNode,
  componentName: string,
): ReactElement<AsChildElementProps> {
  let only: unknown;
  try {
    only = Children.only(children);
  } catch {
    only = null;
  }
  if (!isValidElement<AsChildElementProps>(only) || only.type === Fragment) {
    throw new Error(
      `${componentName}: with \`asChild\`, children must be exactly one React element ` +
        "(for example a VButton or a link), not text, a fragment or several elements.",
    );
  }
  return only;
}

/** Sets a function or object ref. */
function assignRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === "function") ref(node);
  else if (ref) (ref as MutableRefObject<T | null>).current = node;
}

/** Returns one ref callback that fills every given ref, skipping the missing ones. */
export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): (node: T | null) => void {
  return (node) => {
    for (const ref of refs) assignRef(ref, node);
  };
}

/**
 * Runs the handlers in order and stops as soon as one of them called `preventDefault`.
 *
 * Put the child's own handler first and the trigger's internal logic last: the internal logic is
 * then skipped when the child opted out.
 */
export function composeHandlers<E extends SyntheticEvent>(
  ...handlers: Array<Handler<E>>
): (event: E) => void {
  return (event) => {
    for (const handler of handlers) {
      handler?.(event);
      if (event.defaultPrevented) return;
    }
  };
}
