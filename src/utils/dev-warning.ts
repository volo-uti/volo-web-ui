const warned = new Set<string>();

/**
 * Logs a warning to the console in development only.
 *
 * - Suppressed in production builds via tree-shaking (process.env.NODE_ENV guard).
 * - Each unique (component + message) pair is logged at most once per session
 *   to avoid console noise from re-renders.
 *
 * @param component - Component name (e.g. 'VSlider')
 * @param message - Warning message (e.g. 'min must be less than max')
 *
 * @example
 * devWarning('VSlider', 'min must be less than max')
 */
export function devWarning(component: string, message: string): void {
  if (process.env.NODE_ENV !== "development") return;

  const key = `${component}:${message}`;
  if (warned.has(key)) return;
  warned.add(key);

  console.warn(`[Volo/${component}] ${message}`);
}
