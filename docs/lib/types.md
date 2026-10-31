# lib/types

## Types

### VSize

Component sizes.
Maps to --v-size-{size}-* CSS Variables.

```ts
type VSize = "xs" | "sm" | "md" | "lg" | "xl";
```

### VColor

Semantic colours.
Maps to --v-color-{color} CSS Variables.

```ts
type VColor = "primary" | "secondary" | "tertiary" | "destructive";
```

### VVariant

Visual variants.

```ts
type VVariant = "filled" | "outlined" | "text" | "ghost";
```

### VOption

Option of Select-like components.

```ts
type VOption<T = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};
```

### VOrientation

Layout orientation.

```ts
type VOrientation = "horizontal" | "vertical";
```

### VSide

Four sides.

```ts
type VSide = "top" | "right" | "bottom" | "left";
```

### VAlign

Start, center or end alignment.

```ts
type VAlign = "start" | "center" | "end";
```
