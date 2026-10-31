import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ReactElement,
} from "react";

/**
 * Extracts ref type for a given element type.
 */
type PropsOf<E extends ElementType> = ComponentPropsWithoutRef<E>;

/**
 * Polymorphic `as` prop type.
 */
type AsProp<E extends ElementType> = {
  as?: E;
};

/**
 * Omit conflicting keys from original props when `as` overrides them.
 */
type PropsToOmit<E extends ElementType, P> = keyof (AsProp<E> & P);

/**
 * Props of a component that renders as another element through `as`.
 *
 * @template E - The element type (defaults to 'div')
 * @template P - Additional component-specific props
 *
 * @example
 * type VButtonProps = PolymorphicComponentProps<'button', { loading?: boolean }>
 *
 * // Usage:
 * <VButton as="a" href="/path" loading />
 * <VButton as={Link} to="/path" />
 */
export type PolymorphicComponentProps<E extends ElementType = "div", P = object> = P &
  AsProp<E> &
  Omit<PropsOf<E>, PropsToOmit<E, P>>;

/**
 * Props with `as` and `ref`.
 */
export type PolymorphicComponentPropsWithRef<
  E extends ElementType = "div",
  P = object,
> = PolymorphicComponentProps<E, P> & {
  ref?: ComponentPropsWithRef<E>["ref"];
};

/**
 * Ref of the `as` element.
 */
export type PolymorphicRef<E extends ElementType> = ComponentPropsWithRef<E>["ref"];

/**
 * forwardRef polymorphic component type.
 */
export type PolymorphicForwardRefComponent<E extends ElementType, P = object> = <
  T extends ElementType = E,
>(
  props: PolymorphicComponentPropsWithRef<T, P>,
) => ReactElement | null;
