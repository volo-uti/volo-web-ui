import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VSkeleton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VSkeleton> = {
  title: "Components/Feedback/VSkeleton",
  component: VSkeleton,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    variant: "rectangular",
    animation: "pulse",
    width: 200,
    height: 80,
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
      title="VSkeleton"
      description="Placeholder component displayed while content is loading."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="text" labels={['VSkeleton variant="text"']}>
          <div className="w-full flex flex-col gap-2">
            <VSkeleton variant="text" width="200px" />
            <VSkeleton variant="text" width="150px" />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="circular" labels={['VSkeleton variant="circular"']}>
          <VSkeleton variant="circular" width={40} height={40} />
          <VSkeleton variant="circular" width={56} height={56} />
        </StorybookSubsection>
        <StorybookSubsection title="rectangular" labels={['VSkeleton variant="rectangular"']}>
          <div className="w-full">
            <VSkeleton variant="rectangular" width="100%" height={120} />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Animations">
        <StorybookSubsection title="pulse (default)" labels={['VSkeleton animation="pulse"']}>
          <div className="w-full">
            <VSkeleton variant="rectangular" width="100%" height={80} animation="pulse" />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="wave" labels={['VSkeleton animation="wave"']}>
          <div className="w-full">
            <VSkeleton variant="rectangular" width="100%" height={80} animation="wave" />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="none" labels={["VSkeleton animation={false}"]}>
          <div className="w-full">
            <VSkeleton variant="rectangular" width="100%" height={80} animation={false} />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Custom Dimensions">
        <StorybookSubsection title="circular sizes" labels={["VSkeleton width/height"]}>
          <VSkeleton variant="circular" width={32} height={32} />
          <VSkeleton variant="circular" width={48} height={48} />
          <VSkeleton variant="circular" width={64} height={64} />
        </StorybookSubsection>
        <StorybookSubsection title="text widths" labels={["VSkeleton width"]}>
          <div className="w-full flex flex-col gap-2">
            <VSkeleton variant="text" />
            <VSkeleton variant="text" width="90%" />
            <VSkeleton variant="text" width="75%" />
            <VSkeleton variant="text" width="60%" />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Display placeholder shapes while content is being fetched or computed.",
          },
          {
            category: "When not to use",
            guideline: "For determinate progress indicators. Use VProgress instead.",
          },
          {
            category: "Layout",
            guideline:
              "Match skeleton dimensions to the final content to minimize layout shift on load.",
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
      title="VSkeleton Samples"
      description="Copy-paste code examples for VSkeleton."
    >
      <StorybookCodeBlock
        title="Text loading"
        code={`<VSkeleton variant="text" width="200px" />
<VSkeleton variant="text" width="150px" />`}
        preview={
          <div className="flex flex-col gap-2">
            <VSkeleton variant="text" width="200px" />
            <VSkeleton variant="text" width="150px" />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Card placeholder"
        code={`<div className="flex items-start gap-4 p-4 border rounded">
  <VSkeleton variant="circular" width={48} height={48} />
  <div className="flex-1 flex flex-col gap-2">
    <VSkeleton variant="text" width="80%" />
    <VSkeleton variant="text" width="60%" />
    <VSkeleton variant="rectangular" width="100%" height={80} />
  </div>
</div>`}
        preview={
          <div
            className="flex items-start gap-4 p-4"
            style={{ border: "1px solid var(--v-border)", borderRadius: "var(--v-radius-md)" }}
          >
            <VSkeleton variant="circular" width={48} height={48} />
            <div className="flex-1 flex flex-col gap-2">
              <VSkeleton variant="text" width="80%" />
              <VSkeleton variant="text" width="60%" />
              <VSkeleton variant="rectangular" width="100%" height={80} />
            </div>
          </div>
        }
      />
      <StorybookCodeBlock
        title="List item loading"
        code={`{[1, 2, 3].map((i) => (
  <div key={i} className="flex items-center gap-3 py-3">
    <VSkeleton variant="circular" width={40} height={40} />
    <div className="flex-1">
      <VSkeleton variant="text" width="60%" />
      <VSkeleton variant="text" width="40%" />
    </div>
  </div>
))}`}
        preview={
          <div style={{ borderTop: "1px solid var(--v-border)" }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-3"
                style={{ borderBottom: "1px solid var(--v-border)" }}
              >
                <VSkeleton variant="circular" width={40} height={40} />
                <div className="flex-1 flex flex-col gap-1">
                  <VSkeleton variant="text" width="60%" />
                  <VSkeleton variant="text" width="40%" />
                </div>
              </div>
            ))}
          </div>
        }
      />
      <StorybookCodeBlock
        title="Image area loading"
        code={`<VSkeleton variant="rectangular" width="100%" height={200} />`}
        preview={<VSkeleton variant="rectangular" width="100%" height={200} />}
      />
      <StorybookCodeBlock
        title="Wave animation"
        code={`<VSkeleton variant="rectangular" width="100%" height={100} animation="wave" />`}
        preview={<VSkeleton variant="rectangular" width="100%" height={100} animation="wave" />}
      />
      <StorybookCodeBlock
        title="Profile page skeleton"
        code={`<div className="flex flex-col items-center gap-4 p-6">
  <VSkeleton variant="circular" width={80} height={80} />
  <VSkeleton variant="text" width="40%" />
  <VSkeleton variant="text" width="60%" />
  <VSkeleton variant="rectangular" width="100%" height={120} />
</div>`}
        preview={
          <div
            className="flex flex-col items-center gap-4 p-6"
            style={{ border: "1px solid var(--v-border)", borderRadius: "var(--v-radius-md)" }}
          >
            <VSkeleton variant="circular" width={80} height={80} />
            <VSkeleton variant="text" width="40%" />
            <VSkeleton variant="text" width="60%" />
            <div className="w-full">
              <VSkeleton variant="rectangular" width="100%" height={120} />
            </div>
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
