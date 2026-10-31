import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VLoadingSpinner, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VLoadingSpinner> = {
  title: "Components/Feedback/VLoadingSpinner",
  component: VLoadingSpinner,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    size: 24,
    color: "var(--v-primary)",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// ─── Primary (hidden from sidebar, powers Docs controls) ───
export const Default: Story = { tags: ["!dev"] };

// ─── Showcase ───
export const Showcase: Story = {
  tags: ["!autodocs"],
  render: () => (
    <StorybookPageLayout
      title="VLoadingSpinner"
      description="Arc-based loading animation with customizable size and color."
    >
      <StorybookSection title="Sizes">
        <StorybookSubsection title="small" labels={['VLoadingSpinner size="xs"']}>
          <VLoadingSpinner size="xs" />
        </StorybookSubsection>
        <StorybookSubsection title="medium" labels={['VLoadingSpinner size="md"']}>
          <VLoadingSpinner size="md" />
        </StorybookSubsection>
        <StorybookSubsection title="large" labels={['VLoadingSpinner size="lg"']}>
          <VLoadingSpinner size="lg" />
        </StorybookSubsection>
        <StorybookSubsection title="extra large" labels={['VLoadingSpinner size="xl"']}>
          <VLoadingSpinner size="xl" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Colors">
        <StorybookSubsection title="primary" labels={['VLoadingSpinner color="var(--v-primary)"']}>
          <VLoadingSpinner size={32} color="var(--v-primary)" />
        </StorybookSubsection>
        <StorybookSubsection title="success" labels={['VLoadingSpinner color="var(--v-success)"']}>
          <VLoadingSpinner size={32} color="var(--v-success)" />
        </StorybookSubsection>
        <StorybookSubsection
          title="error"
          labels={['VLoadingSpinner color="var(--v-destructive)"']}
        >
          <VLoadingSpinner size={32} color="var(--v-destructive)" />
        </StorybookSubsection>
        <StorybookSubsection
          title="foreground"
          labels={['VLoadingSpinner color="var(--v-foreground)"']}
        >
          <VLoadingSpinner size={32} color="var(--v-foreground)" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Custom Stroke">
        <StorybookSubsection title="thin" labels={["VLoadingSpinner strokeWidth={1}"]}>
          <VLoadingSpinner size={32} strokeWidth={1} />
        </StorybookSubsection>
        <StorybookSubsection title="thick" labels={["VLoadingSpinner strokeWidth={4}"]}>
          <VLoadingSpinner size={32} strokeWidth={4} />
        </StorybookSubsection>
      </StorybookSection>
    </StorybookPageLayout>
  ),
};

// ─── Sample ───
export const Sample: Story = {
  tags: ["!autodocs"],
  render: () => (
    <StorybookPageLayout
      title="VLoadingSpinner Samples"
      description="Copy-paste code examples for loading spinners."
    >
      <StorybookCodeBlock
        title="Basic spinner"
        code={`<VLoadingSpinner />`}
        preview={<VLoadingSpinner />}
      />
      <StorybookCodeBlock
        title="Size step and px"
        code={`<VLoadingSpinner size="lg" />
<VLoadingSpinner size={18} />`}
        preview={
          <>
            <VLoadingSpinner size="lg" />
            <VLoadingSpinner size={18} />
          </>
        }
      />
      <StorybookCodeBlock
        title="Large colored spinner"
        code={`<VLoadingSpinner size={48} color="var(--v-primary)" />`}
        preview={<VLoadingSpinner size={48} color="var(--v-primary)" />}
      />
      <StorybookCodeBlock
        title="Custom stroke width"
        code={`<VLoadingSpinner size={32} strokeWidth={4} />`}
        preview={<VLoadingSpinner size={32} strokeWidth={4} />}
      />
      <StorybookCodeBlock
        title="Button loading state"
        code={`<button disabled className="inline-flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground opacity-70">
  <VLoadingSpinner size={16} color="currentColor" />
  Saving...
</button>`}
        preview={
          <VButton disabled>
            <VLoadingSpinner size={16} color="currentColor" />
            Saving...
          </VButton>
        }
      />
      <StorybookCodeBlock
        title="Page loading"
        code={`<div className="flex flex-col items-center justify-center h-64 gap-3">
  <VLoadingSpinner size={40} />
  <p className="text-sm text-muted-foreground">Loading...</p>
</div>`}
        preview={
          <div className="flex flex-col items-center justify-center gap-3" style={{ height: 160 }}>
            <VLoadingSpinner size={40} />
            <p className="text-sm" style={{ color: "var(--v-muted-foreground)" }}>
              Loading...
            </p>
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
