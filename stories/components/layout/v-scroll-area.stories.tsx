import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VScrollArea } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const LongContent = () => (
  <>
    {Array.from({ length: 20 }, (_, i) => (
      <p key={i} style={{ margin: "8px 0", color: "var(--v-foreground)" }}>
        Line {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    ))}
  </>
);

const WideContent = () => (
  <div style={{ width: "1200px", whiteSpace: "nowrap" }}>
    {Array.from({ length: 5 }, (_, i) => (
      <p key={i} style={{ margin: "8px 0", color: "var(--v-foreground)" }}>
        Row {i + 1}: This is a very long line of text that extends beyond the container width to
        demonstrate horizontal scrolling behavior.
      </p>
    ))}
  </div>
);

const meta: Meta<typeof VScrollArea> = {
  title: "Components/Layout/VScrollArea",
  component: VScrollArea,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    scrollbarThickness: 6,
    scrollbarRadius: 3,
    direction: "vertical",
    maxHeight: "200px",
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
      title="VScrollArea"
      description="Custom scrollable container with styled scrollbar."
    >
      <StorybookSection title="Directions">
        <StorybookSubsection title="vertical" labels={['direction="vertical"']}>
          <VScrollArea direction="vertical" maxHeight="150px">
            <LongContent />
          </VScrollArea>
        </StorybookSubsection>
        <StorybookSubsection title="horizontal" labels={['direction="horizontal"']}>
          <VScrollArea direction="horizontal" style={{ maxWidth: "400px" }}>
            <WideContent />
          </VScrollArea>
        </StorybookSubsection>
        <StorybookSubsection title="both" labels={['direction="both"']}>
          <VScrollArea direction="both" maxHeight="150px" style={{ maxWidth: "400px" }}>
            <WideContent />
            <LongContent />
          </VScrollArea>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Options">
        <StorybookSubsection title="always visible" labels={['scrollbar="always"']}>
          <VScrollArea maxHeight="150px" scrollbar="always">
            <LongContent />
          </VScrollArea>
        </StorybookSubsection>
        <StorybookSubsection title="with track" labels={["trackColor"]}>
          <VScrollArea maxHeight="150px" trackColor="var(--v-muted)" scrollbar="always">
            <LongContent />
          </VScrollArea>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Constrained content areas: sidebars, dropdowns, chat panels, code blocks",
          },
          {
            category: "Scrollbar",
            guideline:
              'Use "auto" for most cases. "hover" for cleaner UI. "always" for discoverability',
          },
          {
            category: "Max height",
            guideline:
              "Always set maxHeight to constrain the scroll area. Without it, content will expand",
          },
          {
            category: "Accessibility",
            guideline: "Ensure scrollable area is keyboard-navigable with proper focus management",
          },
          {
            category: "Controller",
            guideline: "Pass a controller for programmatic scrolling",
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
    <StorybookPageLayout title="VScrollArea Samples" description="Copy-paste code examples.">
      <StorybookCodeBlock
        title="Basic vertical scroll"
        code={`<VScrollArea maxHeight="150px">
  {Array.from({ length: 20 }, (_, i) => (
    <p key={i}>Line {i + 1}: Lorem ipsum dolor sit amet.</p>
  ))}
</VScrollArea>`}
        preview={
          <VScrollArea maxHeight="150px">
            <LongContent />
          </VScrollArea>
        }
      />
      <StorybookCodeBlock
        title="Horizontal scroll"
        code={`<VScrollArea direction="horizontal" style={{ maxWidth: '400px' }}>
  <div style={{ width: '1200px' }}>
    Wide content here...
  </div>
</VScrollArea>`}
        preview={
          <VScrollArea direction="horizontal" style={{ maxWidth: "400px" }}>
            <WideContent />
          </VScrollArea>
        }
      />
      <StorybookCodeBlock
        title="Always visible scrollbar"
        code={`<VScrollArea maxHeight="150px" scrollbar="always">
  <LongContent />
</VScrollArea>`}
        preview={
          <VScrollArea maxHeight="150px" scrollbar="always">
            <LongContent />
          </VScrollArea>
        }
      />
      <StorybookCodeBlock
        title="Custom Style"
        code={`<VScrollArea
  maxHeight="150px"
  thumbColor="var(--v-primary)"
  scrollbarThickness={8}
  scrollbarRadius={4}
>
  <LongContent />
</VScrollArea>`}
        preview={
          <VScrollArea
            maxHeight="150px"
            thumbColor="var(--v-primary)"
            scrollbarThickness={8}
            scrollbarRadius={4}
          >
            <LongContent />
          </VScrollArea>
        }
      />
      <StorybookCodeBlock
        title="With Controller"
        code={`const ref = useRef<HTMLDivElement>(null)

<VScrollArea ref={ref} maxHeight="150px">
  <LongContent />
</VScrollArea>
<VButton onClick={() => ref.current?.scrollTo({ top: 0 })}>
  Scroll to Top
</VButton>`}
        preview={
          <VScrollArea maxHeight="150px">
            <LongContent />
          </VScrollArea>
        }
      />
    </StorybookPageLayout>
  ),
};
