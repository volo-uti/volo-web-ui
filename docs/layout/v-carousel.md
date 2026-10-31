# VCarousel

Swipeable slideshow with keyboard, arrows, auto-play and page dots.

The slide area is a `region`; name it with `aria-label` or `aria-labelledby` when a page
shows more than one carousel.

## Examples

### VCarousel

```tsx
<VCarousel height={200} showArrows onValueChange={setPage}>
  <VCard>Slide 1</VCard>
  <VCard>Slide 2</VCard>
  <VCard>Slide 3</VCard>
</VCarousel>
```

## Props

### VCarouselProps

VCarousel props.

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `VCarouselVariant` | `"default"` | no | Preset for viewport fraction, spacing, auto-play, loop and indicator. |
| `showIndicator` | `boolean` | `true` | no | Whether to show the page indicator. |
| `indicatorPosition` | `VCarouselIndicatorPosition` | `"bottom"` | no | Where the indicator sits; defaults to the variant preset. |
| `children` | `ReactNode` | — | no | Slides; each child is one page. |
| `height` | `number \| string` | `200` | no | Carousel height. Accepts pixels as a number or any CSS length. |
| `aspectRatio` | `number` | `undefined` | no | Width:height ratio used when `height` is not set. |
| `viewportFraction` | `number` | `0.8` | no | Share of the width one slide takes, from 0 to 1; defaults to the variant preset. |
| `padEnds` | `boolean` | `true` | no | Whether the first and last slide can be centred; defaults to the variant preset. |
| `pageSpacing` | `number` | `8` | no | Space between slides in pixels; defaults to the variant preset. |
| `loop` | `boolean` | `false` | no | Whether navigation wraps around at the ends; defaults to the variant preset. |
| `autoPlay` | `boolean` | `false` | no | Whether slides advance on their own; defaults to the variant preset. |
| `autoPlayInterval` | `number` | `3` | no | Seconds between automatic advances; defaults to the variant preset. |
| `value` | `number` | `undefined` | no | Current page index when controlled. |
| `defaultValue` | `number` | `0` | no | Initial page index when uncontrolled. |
| `onValueChange` | `(value: number) => void` | — | no | Called with the new page index when the page changes. |
| `showArrows` | `boolean` | `false` | no | Whether to show previous and next arrow buttons. |
| `indicatorBuilder` | `(total: number, current: number) => ReactNode` | — | no | Replaces the dot indicator; receives the slide count and the current index. |

## Types

### VCarouselVariant

Preset of a VCarousel: default, fullWidth, card or hero.

```ts
type VCarouselVariant = "default" | "fullWidth" | "card" | "hero";
```

### VCarouselIndicatorPosition

Where the VCarousel indicator is drawn.

```ts
type VCarouselIndicatorPosition = "bottom" | "belowCarousel" | "overlay" | "none";
```
