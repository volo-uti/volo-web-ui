import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VPageIndicator } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VPageIndicator> = {
  title: "Components/Navigation/VPageIndicator",
  component: VPageIndicator,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    variant: "dots",
    size: "md",
    total: 5,
    separator: "slash",
    value: 0,
    expandActive: true,
  },
};
export default meta;

// ─── Primary (hidden from sidebar, powers Docs controls) ───
export const Default: Story = { tags: ["!dev"] };
type Story = StoryObj<typeof meta>;

function PressableIndicator({ variant = "dots" }: { variant?: "dots" | "number" | "line" }) {
  const [page, setPage] = useState(1);
  return <VPageIndicator variant={variant} total={5} value={page} onValueChange={setPage} />;
}

// ─── Showcase ───
export const Showcase: Story = {
  tags: ["!autodocs"],
  render: () => (
    <StorybookPageLayout
      title="VPageIndicator"
      description="Visual indicator showing current position in a paginated series."
    >
      <StorybookSection title="Styles">
        <StorybookSubsection title="dots" labels={['VPageIndicator(variant="dots")']}>
          <VPageIndicator variant="dots" total={5} value={2} />
        </StorybookSubsection>
        <StorybookSubsection title="number" labels={['VPageIndicator(variant="number")']}>
          <VPageIndicator variant="number" total={5} value={2} />
        </StorybookSubsection>
        <StorybookSubsection title="line" labels={['VPageIndicator(variant="line")']}>
          <VPageIndicator variant="line" total={5} value={2} />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Dots Customization">
        <StorybookSubsection title="default" labels={['VPageIndicator(variant="dots")']}>
          <VPageIndicator variant="dots" total={5} value={1} />
        </StorybookSubsection>
        <StorybookSubsection title="large" labels={['VPageIndicator(size="lg")']}>
          <VPageIndicator variant="dots" total={5} value={1} size="lg" />
        </StorybookSubsection>
        <StorybookSubsection title="expand" labels={["VPageIndicator(expandActive)"]}>
          <VPageIndicator variant="dots" total={5} value={1} expandActive />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Number Separators">
        <StorybookSubsection title="slash" labels={['VPageIndicator(separator="slash")']}>
          <VPageIndicator variant="number" total={5} value={2} separator="slash" />
        </StorybookSubsection>
        <StorybookSubsection title="of" labels={['VPageIndicator(separator="of")']}>
          <VPageIndicator variant="number" total={5} value={2} separator="of" />
        </StorybookSubsection>
        <StorybookSubsection title="dash" labels={['VPageIndicator(separator="dash")']}>
          <VPageIndicator variant="number" total={5} value={2} separator="dash" />
        </StorybookSubsection>
        <StorybookSubsection title="pipe" labels={['VPageIndicator(separator="pipe")']}>
          <VPageIndicator variant="number" total={5} value={2} separator="pipe" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Interactive">
        <StorybookSubsection title="pressable" labels={["VPageIndicator(onValueChange)"]}>
          <PressableIndicator />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Show progress in carousels, onboarding flows, or paginated content",
          },
          { category: "Dot", guideline: "Default style for carousels and image galleries" },
          { category: "Line", guideline: "Use for progress-like indicators in step flows" },
          { category: "Number", guideline: "Use when exact page position matters to the user" },
          { category: "Size", guideline: "Match indicator size to surrounding content density" },
        ]}
      />
    </StorybookPageLayout>
  ),
};

// ─── Sample ───
export const Sample: Story = {
  tags: ["!autodocs"],
  render: () => (
    <StorybookPageLayout title="VPageIndicator Samples" description="Copy-paste code examples.">
      <StorybookCodeBlock
        title="Dots (default)"
        code={`<VPageIndicator variant="dots" total={5} value={2} />`}
        preview={<VPageIndicator variant="dots" total={5} value={2} />}
      />
      <StorybookCodeBlock
        title="Line style"
        code={`<VPageIndicator variant="line" total={5} value={2} />`}
        preview={<VPageIndicator variant="line" total={5} value={2} />}
      />
      <StorybookCodeBlock
        title="Number style"
        code={`<VPageIndicator variant="number" total={10} value={4} />`}
        preview={<VPageIndicator variant="number" total={10} value={4} />}
      />
      <StorybookCodeBlock
        title="Size variants"
        code={`<VPageIndicator variant="dots" total={5} value={1} size="sm" />
<VPageIndicator variant="dots" total={5} value={1} size="md" />
<VPageIndicator variant="dots" total={5} value={1} size="lg" />`}
        preview={
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}
          >
            <VPageIndicator variant="dots" total={5} value={1} size="sm" />
            <VPageIndicator variant="dots" total={5} value={1} size="md" />
            <VPageIndicator variant="dots" total={5} value={1} size="lg" />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Pressable"
        code={`const [page, setPage] = useState(1)

<VPageIndicator total={5} value={page} onValueChange={setPage} />`}
        preview={<PressableIndicator />}
      />
    </StorybookPageLayout>
  ),
};
