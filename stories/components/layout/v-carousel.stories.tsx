import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VCarousel } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const Slide = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "48px",
      textAlign: "center",
      backgroundColor: "var(--v-muted)",
      borderRadius: "var(--v-radius-md)",
    }}
  >
    {children}
  </div>
);

const meta: Meta<typeof VCarousel> = {
  title: "Components/Layout/VCarousel",
  component: VCarousel,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    showIndicator: true,
    viewportFraction: 0.8,
    pageSpacing: 8,
    padEnds: true,
    loop: false,
    autoPlay: false,
  },
};
export default meta;

// ─── Primary (hidden from sidebar, powers Docs controls) ───
export const Default: Story = { tags: ["!dev"] };
type Story = StoryObj<typeof meta>;

// ─── Showcase ───
export const Showcase: Story = {
  tags: ["!autodocs"],
  render: () => (
    <StorybookPageLayout
      title="VCarousel"
      description="A slideshow component for cycling through content panels."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="default" labels={['VCarousel(variant="default")']}>
          <VCarousel aria-label="default carousel">
            <div>
              <Slide>Slide 1</Slide>
            </div>
            <div>
              <Slide>Slide 2</Slide>
            </div>
            <div>
              <Slide>Slide 3</Slide>
            </div>
          </VCarousel>
        </StorybookSubsection>
        <StorybookSubsection title="fullWidth" labels={['VCarousel(variant="fullWidth")']}>
          <VCarousel aria-label="fullWidth carousel" variant="fullWidth">
            <div>
              <Slide>Full 1</Slide>
            </div>
            <div>
              <Slide>Full 2</Slide>
            </div>
            <div>
              <Slide>Full 3</Slide>
            </div>
          </VCarousel>
        </StorybookSubsection>
        <StorybookSubsection title="card" labels={['VCarousel(variant="card")']}>
          <VCarousel aria-label="card carousel" variant="card">
            <div>
              <Slide>Card 1</Slide>
            </div>
            <div>
              <Slide>Card 2</Slide>
            </div>
            <div>
              <Slide>Card 3</Slide>
            </div>
          </VCarousel>
        </StorybookSubsection>
        <StorybookSubsection title="hero" labels={['VCarousel(variant="hero")']}>
          <VCarousel aria-label="hero carousel" variant="hero">
            <div>
              <Slide>Hero 1</Slide>
            </div>
            <div>
              <Slide>Hero 2</Slide>
            </div>
            <div>
              <Slide>Hero 3</Slide>
            </div>
          </VCarousel>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Indicator Position">
        <StorybookSubsection title="bottom" labels={['indicatorPosition="bottom"']}>
          <VCarousel aria-label="bottom carousel" indicatorPosition="bottom">
            <div>
              <Slide>Bottom 1</Slide>
            </div>
            <div>
              <Slide>Bottom 2</Slide>
            </div>
            <div>
              <Slide>Bottom 3</Slide>
            </div>
          </VCarousel>
        </StorybookSubsection>
        <StorybookSubsection title="belowCarousel" labels={['indicatorPosition="belowCarousel"']}>
          <VCarousel aria-label="belowCarousel carousel" indicatorPosition="belowCarousel">
            <div>
              <Slide>Below 1</Slide>
            </div>
            <div>
              <Slide>Below 2</Slide>
            </div>
            <div>
              <Slide>Below 3</Slide>
            </div>
          </VCarousel>
        </StorybookSubsection>
        <StorybookSubsection title="overlay" labels={['indicatorPosition="overlay"']}>
          <VCarousel aria-label="overlay carousel" indicatorPosition="overlay">
            <div>
              <Slide>Overlay 1</Slide>
            </div>
            <div>
              <Slide>Overlay 2</Slide>
            </div>
            <div>
              <Slide>Overlay 3</Slide>
            </div>
          </VCarousel>
        </StorybookSubsection>
        <StorybookSubsection title="none" labels={['indicatorPosition="none"']}>
          <VCarousel aria-label="none carousel" indicatorPosition="none">
            <div>
              <Slide>None 1</Slide>
            </div>
            <div>
              <Slide>None 2</Slide>
            </div>
            <div>
              <Slide>None 3</Slide>
            </div>
          </VCarousel>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Hero banners, image galleries, testimonials, onboarding flows",
          },
          {
            category: "Auto play",
            guideline: "Use sparingly. Allow users to pause. Avoid for text-heavy content",
          },
          {
            category: "Loop",
            guideline: "Enable loop for infinite browsing. Disable when order matters",
          },
          {
            category: "Accessibility",
            guideline:
              "Ensure keyboard navigation works. Provide alternative navigation (dots/arrows)",
          },
          {
            category: "height",
            guideline: "Set an appropriate height for the content; avoid too large or too small",
          },
        ]}
      />
    </StorybookPageLayout>
  ),
};

// ─── Sample ───
export const Sample: Story = {
  tags: ["!autodocs"],
  render: () => (
    <StorybookPageLayout title="VCarousel Samples" description="Copy-paste code examples.">
      <StorybookCodeBlock
        title="Basic usage"
        code={`<VCarousel>
  <div><Slide>Slide 1</Slide></div>
  <div><Slide>Slide 2</Slide></div>
  <div><Slide>Slide 3</Slide></div>
</VCarousel>`}
        preview={
          <VCarousel aria-label="Basic usage carousel">
            <div>
              <Slide>Slide 1</Slide>
            </div>
            <div>
              <Slide>Slide 2</Slide>
            </div>
            <div>
              <Slide>Slide 3</Slide>
            </div>
          </VCarousel>
        }
      />
      <StorybookCodeBlock
        title="Auto Play"
        code={`<VCarousel autoPlay autoPlayInterval={3}>
  <div><Slide>Auto 1</Slide></div>
  <div><Slide>Auto 2</Slide></div>
  <div><Slide>Auto 3</Slide></div>
</VCarousel>`}
        preview={
          <VCarousel aria-label="Auto Play carousel" autoPlay autoPlayInterval={3}>
            <div>
              <Slide>Auto 1</Slide>
            </div>
            <div>
              <Slide>Auto 2</Slide>
            </div>
            <div>
              <Slide>Auto 3</Slide>
            </div>
          </VCarousel>
        }
      />
      <StorybookCodeBlock
        title="With Arrows"
        code={`<VCarousel showArrows loop>
  <div><Slide>Arrow 1</Slide></div>
  <div><Slide>Arrow 2</Slide></div>
  <div><Slide>Arrow 3</Slide></div>
</VCarousel>`}
        preview={
          <VCarousel aria-label="With Arrows carousel" showArrows loop>
            <div>
              <Slide>Arrow 1</Slide>
            </div>
            <div>
              <Slide>Arrow 2</Slide>
            </div>
            <div>
              <Slide>Arrow 3</Slide>
            </div>
          </VCarousel>
        }
      />
      <StorybookCodeBlock
        title="Number Indicator"
        code={`<VCarousel indicatorBuilder={(total, current) => (
  <span>{current + 1} / {total}</span>
)}>
  <div><Slide>Slide 1</Slide></div>
  <div><Slide>Slide 2</Slide></div>
  <div><Slide>Slide 3</Slide></div>
</VCarousel>`}
        preview={
          <VCarousel aria-label="Number Indicator carousel">
            <div>
              <Slide>Slide 1</Slide>
            </div>
            <div>
              <Slide>Slide 2</Slide>
            </div>
            <div>
              <Slide>Slide 3</Slide>
            </div>
          </VCarousel>
        }
      />
      <StorybookCodeBlock
        title="Line Indicator (Stories)"
        code={`<VCarousel indicatorPosition="overlay" variant="hero">
  <div><Slide>Story 1</Slide></div>
  <div><Slide>Story 2</Slide></div>
  <div><Slide>Story 3</Slide></div>
</VCarousel>`}
        preview={
          <VCarousel aria-label="Line Indicator (Stories) carousel" variant="hero">
            <div>
              <Slide>Story 1</Slide>
            </div>
            <div>
              <Slide>Story 2</Slide>
            </div>
            <div>
              <Slide>Story 3</Slide>
            </div>
          </VCarousel>
        }
      />
      <StorybookCodeBlock
        title="Custom Dots"
        code={`<VCarousel indicatorBuilder={(total, current) => (
  <div style={{ display: 'flex', gap: 4 }}>
    {Array.from({ length: total }, (_, i) => (
      <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === current ? 'blue' : 'gray' }} />
    ))}
  </div>
)}>
  <div><Slide>Slide 1</Slide></div>
  <div><Slide>Slide 2</Slide></div>
</VCarousel>`}
        preview={
          <VCarousel aria-label="Custom Dots carousel">
            <div>
              <Slide>Slide 1</Slide>
            </div>
            <div>
              <Slide>Slide 2</Slide>
            </div>
          </VCarousel>
        }
      />
    </StorybookPageLayout>
  ),
};
