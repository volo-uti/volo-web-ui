import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VProgress } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VProgress> = {
  title: "Components/Feedback/VProgress",
  component: VProgress,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    "aria-label": "Upload progress",
    variant: "linear",
    size: "md",
    color: "primary",
    value: 60,
    indeterminate: false,
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
      title="VProgress"
      description="Indicates progress of an operation with linear or circular variants."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="linear" labels={['VProgress variant="linear"']}>
          <div className="w-full">
            <VProgress aria-label="Upload progress" value={60} variant="linear" />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="circular" labels={['VProgress variant="circular"']}>
          <VProgress aria-label="Upload progress" value={60} variant="circular" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Sizes (Linear)">
        <StorybookSubsection title="sm" labels={['VProgress size="sm"']}>
          <div className="w-full">
            <VProgress aria-label="Upload progress" value={60} size="sm" />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['VProgress size="md"']}>
          <div className="w-full">
            <VProgress aria-label="Upload progress" value={60} size="md" />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['VProgress size="lg"']}>
          <div className="w-full">
            <VProgress aria-label="Upload progress" value={60} size="lg" />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Sizes (Circular)">
        <StorybookSubsection title="sm / md / lg" labels={['VProgress variant="circular" size']}>
          <VProgress aria-label="Upload progress" value={60} variant="circular" size="sm" />
          <VProgress aria-label="Upload progress" value={60} variant="circular" size="md" />
          <VProgress aria-label="Upload progress" value={60} variant="circular" size="lg" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Colors">
        <StorybookSubsection title="primary" labels={['VProgress color="primary"']}>
          <div className="w-full">
            <VProgress aria-label="Upload progress" value={60} color="primary" />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="secondary" labels={['VProgress color="secondary"']}>
          <div className="w-full">
            <VProgress aria-label="Upload progress" value={60} color="secondary" />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="destructive" labels={['VProgress color="destructive"']}>
          <div className="w-full">
            <VProgress aria-label="Upload progress" value={60} color="destructive" />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="success" labels={['VProgress color="success"']}>
          <div className="w-full">
            <VProgress aria-label="Upload progress" value={60} color="success" />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="warning" labels={['VProgress color="warning"']}>
          <div className="w-full">
            <VProgress aria-label="Upload progress" value={60} color="warning" />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Determinate Values">
        <StorybookSubsection title="progress steps" labels={["VProgress value: 0-100"]}>
          <div className="w-full flex flex-col gap-3">
            <VProgress aria-label="Upload progress" value={0} />
            <VProgress aria-label="Upload progress" value={25} />
            <VProgress aria-label="Upload progress" value={50} />
            <VProgress aria-label="Upload progress" value={75} />
            <VProgress aria-label="Upload progress" value={100} />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Indeterminate">
        <StorybookSubsection title="linear" labels={["VProgress indeterminate"]}>
          <div className="w-full">
            <VProgress aria-label="Upload progress" indeterminate />
          </div>
        </StorybookSubsection>
        <StorybookSubsection
          title="circular"
          labels={['VProgress indeterminate variant="circular"']}
        >
          <VProgress aria-label="Upload progress" variant="circular" indeterminate />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Show progress for file uploads, form submissions, or any long-running operation.",
          },
          {
            category: "When not to use",
            guideline: "For skeleton loading placeholders. Use VSkeleton instead.",
          },
          {
            category: "Indeterminate",
            guideline: "Use indeterminate mode when the total duration or amount is unknown.",
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
    <StorybookPageLayout
      title="VProgress Samples"
      description="Copy-paste code examples for VProgress."
    >
      <StorybookCodeBlock
        title="Basic progress bar"
        code={`<VProgress aria-label="Upload progress" value={60} />`}
        preview={<VProgress aria-label="Upload progress" value={60} />}
      />
      <StorybookCodeBlock
        title="Loading spinner (circular)"
        code={`<VProgress aria-label="Upload progress" variant="circular" indeterminate />`}
        preview={<VProgress aria-label="Upload progress" variant="circular" indeterminate />}
      />
      <StorybookCodeBlock
        title="File upload progress"
        code={`<div className="space-y-1">
  <div className="flex justify-between text-sm">
    <span>Uploading...</span>
    <span>75%</span>
  </div>
  <VProgress aria-label="Upload progress" value={75} color="success" />
</div>`}
        preview={
          <div className="space-y-1">
            <div className="flex justify-between text-sm" style={{ color: "var(--v-foreground)" }}>
              <span>Uploading...</span>
              <span>75%</span>
            </div>
            <VProgress aria-label="Upload progress" value={75} color="success" />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Indeterminate loading bar"
        code={`<VProgress aria-label="Upload progress" indeterminate color="primary" />`}
        preview={<VProgress aria-label="Upload progress" indeterminate color="primary" />}
      />
      <StorybookCodeBlock
        title="Color comparison"
        code={`<VProgress aria-label="Upload progress" value={80} color="primary" />
<VProgress aria-label="Upload progress" value={60} color="warning" />
<VProgress aria-label="Upload progress" value={30} color="destructive" />`}
        preview={
          <div className="space-y-3">
            <VProgress aria-label="Upload progress" value={80} color="primary" />
            <VProgress aria-label="Upload progress" value={60} color="warning" />
            <VProgress aria-label="Upload progress" value={30} color="destructive" />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Circular size comparison"
        code={`<VProgress aria-label="Upload progress" variant="circular" value={75} size="sm" />
<VProgress aria-label="Upload progress" variant="circular" value={75} size="md" />
<VProgress aria-label="Upload progress" variant="circular" value={75} size="lg" />`}
        preview={
          <div className="flex items-center gap-4">
            <VProgress aria-label="Upload progress" variant="circular" value={75} size="sm" />
            <VProgress aria-label="Upload progress" variant="circular" value={75} size="md" />
            <VProgress aria-label="Upload progress" variant="circular" value={75} size="lg" />
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
