import { createContext, useContext, type Context, type Provider } from "react";

type SafeContextReturn<T> = [Provider<T>, () => T, Context<T>];

/**
 * Creates a context whose hook throws outside its Provider.
 *
 * @param contextName - Name used in the error message.
 * @param defaultValue - Value outside a Provider; omit it to make the Provider required.
 * @returns Tuple of `[Provider, hook, Context]`.
 *
 * @example
 * const [CartProvider, useCart] = createSafeContext<CartValue>('Cart')
 * const cart = useCart() // throws if not inside CartProvider
 */
export function createSafeContext<T>(contextName: string, defaultValue?: T): SafeContextReturn<T> {
  const Context = createContext<T>(defaultValue as T);
  Context.displayName = `${contextName}Context`;

  function useSafeContext(): T {
    const ctx = useContext(Context);

    if (ctx === undefined) {
      throw new Error(
        `use${contextName} must be used within a ${contextName}Provider.\n` +
          `Wrap your component tree with <${contextName}Provider>.`,
      );
    }

    return ctx;
  }

  return [Context.Provider, useSafeContext, Context];
}
