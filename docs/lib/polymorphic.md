# lib/polymorphic

## Props

### PolymorphicComponentProps

Props of a component that renders as another element through `as`.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `as` | `E` | — | no | — |

## Types

### PolymorphicComponentPropsWithRef

Props with `as` and `ref`.

```ts
type PolymorphicComponentPropsWithRef<
  E extends ElementType = "div",
  P = object,
> = PolymorphicComponentProps<E, P> & {
  ref?: ComponentPropsWithRef<E>["ref"];
};
```

### PolymorphicRef

Ref of the `as` element.

```ts
type PolymorphicRef<E extends ElementType> = ComponentPropsWithRef<E>["ref"];
```

### PolymorphicForwardRefComponent

forwardRef polymorphic component type.

```ts
type PolymorphicForwardRefComponent<E extends ElementType, P = object> = <
  T extends ElementType = E,
>(
  props: PolymorphicComponentPropsWithRef<T, P>,
) => ReactElement | null;
```
