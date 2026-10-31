# VSkeleton

Grey placeholder block, line or circle shown in place of content while it loads.

It is `aria-hidden`; announce the loading state elsewhere, for example with VLoadingSpinner or `aria-busy`.

## Examples

### VSkeleton

```tsx
<VSkeleton variant="circular" size={48} />
<VSkeleton variant="text" lines={3} />
```

## Props

### VSkeletonProps

VSkeleton props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VSkeletonVariant` | `'text'` | no | Shape of the placeholder. |
| `size` | `number` | `40` | no | Diameter in px of the `circular` variant; it sets both width and height unless they are given. |
| `borderRadius` | `string \| number` | — | no | Corner radius as a CSS length or px number; overrides the variant's radius. |
| `animation` | `VSkeletonAnimation` | `'pulse'` | no | Loading animation. |
| `width` | `string \| number` | — | no | Width as a CSS length or px number; defaults to `100%` (the diameter for `circular`). |
| `height` | `string \| number` | — | no | Height as a CSS length or px number; defaults to `1em` for `text`, the diameter for `circular`, 120px otherwise. |
| `lines` | `number` | `1` | no | Number of lines of the `text` variant; the last line is 75% wide. |
| `spacing` | `number` | `8` | no | Gap in px between lines of the `text` variant. |

## Types

### VSkeletonVariant

VSkeleton shape: a text line, a circle or a block.

```ts
type VSkeletonVariant = "text" | "circular" | "rectangular";
```

### VSkeletonAnimation

VSkeleton animation: `false` turns it off.

```ts
type VSkeletonAnimation = "pulse" | "wave" | false;
```
