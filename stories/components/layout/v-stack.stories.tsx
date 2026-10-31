import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VStack, VButton, VTextField } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const DemoItem = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "16px",
      backgroundColor: "var(--v-muted)",
      borderRadius: "var(--v-radius-md)",
    }}
  >
    {children}
  </div>
);

const meta: Meta<typeof VStack> = {
  title: "Components/Layout/VStack",
  component: VStack,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    direction: "vertical",
    spacing: 12,
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
      title="VStack"
      description="Arranges children in a vertical or horizontal stack with configurable spacing."
    >
      <StorybookSection title="Direction">
        <StorybookSubsection title="vertical" labels={['direction="vertical"']}>
          <VStack direction="vertical" spacing="8px">
            <DemoItem>Item 1</DemoItem>
            <DemoItem>Item 2</DemoItem>
            <DemoItem>Item 3</DemoItem>
          </VStack>
        </StorybookSubsection>
        <StorybookSubsection title="horizontal" labels={['direction="horizontal"']}>
          <VStack direction="horizontal" spacing="8px">
            <DemoItem>Item 1</DemoItem>
            <DemoItem>Item 2</DemoItem>
            <DemoItem>Item 3</DemoItem>
          </VStack>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Alignment">
        <StorybookSubsection title="align" labels={['align="center"']}>
          <VStack direction="horizontal" spacing="8px" align="center">
            <div
              style={{
                padding: "8px",
                backgroundColor: "var(--v-muted)",
                borderRadius: "var(--v-radius-md)",
              }}
            >
              Short
            </div>
            <div
              style={{
                padding: "24px",
                backgroundColor: "var(--v-muted)",
                borderRadius: "var(--v-radius-md)",
              }}
            >
              Tall
            </div>
            <div
              style={{
                padding: "12px",
                backgroundColor: "var(--v-muted)",
                borderRadius: "var(--v-radius-md)",
              }}
            >
              Mid
            </div>
          </VStack>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Nested">
        <StorybookSubsection title="nested stacks" labels={["VStack nested"]}>
          <VStack direction="vertical" spacing="12px">
            <VStack direction="horizontal" spacing="8px">
              <DemoItem>A</DemoItem>
              <DemoItem>B</DemoItem>
            </VStack>
            <VStack direction="horizontal" spacing="8px">
              <DemoItem>C</DemoItem>
              <DemoItem>D</DemoItem>
            </VStack>
          </VStack>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Arrange items in a line with consistent spacing: form fields, button groups, card lists",
          },
          {
            category: "Direction",
            guideline: "Use column for vertical stacking, row for horizontal. Default is column",
          },
          {
            category: "Gap",
            guideline:
              "Use token-based spacing values. 4px for tight, 8-12px for default, 24px+ for sections",
          },
          {
            category: "vs Grid",
            guideline: "Stack for single-axis layout. Use Grid for two-dimensional layouts",
          },
          {
            category: "spacing",
            guideline:
              "Set spacing between children via spacing: a VSize token, pixels or a CSS length",
          },
          {
            category: "justify",
            guideline: "Set main axis distribution with justify",
          },
          {
            category: "align",
            guideline: "Set cross axis alignment with align",
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
    <StorybookPageLayout title="VStack Samples" description="Copy-paste code examples.">
      <StorybookCodeBlock
        title="Vertical"
        code={`<VStack direction="vertical" spacing="8px">
  <DemoItem>Item 1</DemoItem>
  <DemoItem>Item 2</DemoItem>
  <DemoItem>Item 3</DemoItem>
</VStack>`}
        preview={
          <VStack direction="vertical" spacing="8px">
            <DemoItem>Item 1</DemoItem>
            <DemoItem>Item 2</DemoItem>
            <DemoItem>Item 3</DemoItem>
          </VStack>
        }
      />
      <StorybookCodeBlock
        title="Horizontal"
        code={`<VStack direction="horizontal" spacing="8px">
  <DemoItem>A</DemoItem>
  <DemoItem>B</DemoItem>
  <DemoItem>C</DemoItem>
</VStack>`}
        preview={
          <VStack direction="horizontal" spacing="8px">
            <DemoItem>A</DemoItem>
            <DemoItem>B</DemoItem>
            <DemoItem>C</DemoItem>
          </VStack>
        }
      />
      <StorybookCodeBlock
        title="Alignment"
        code={`<VStack direction="vertical" spacing="8px" align="center">
  <span>Center</span>
  <span>Aligned</span>
</VStack>`}
        preview={
          <div style={{ height: "80px" }}>
            <VStack direction="vertical" spacing="8px" align="center">
              <span>Center</span>
              <span>Aligned</span>
            </VStack>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Form layout"
        code={`<VStack direction="vertical" spacing="16px">
  <VTextField label="Name" placeholder="Enter your name" />
  <VTextField label="Email" placeholder="Enter your email" />
  <VTextField label="Password" type="password" placeholder="Create password" />
  <VButton>Sign Up</VButton>
</VStack>`}
        preview={
          <div style={{ maxWidth: "320px" }}>
            <VStack direction="vertical" spacing="16px">
              <VTextField label="Name" placeholder="Enter your name" />
              <VTextField label="Email" placeholder="Enter your email" />
              <VTextField label="Password" type="password" placeholder="Create password" />
              <VButton>Sign Up</VButton>
            </VStack>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Button row"
        code={`<VStack direction="horizontal" spacing="8px" justify="end">
  <VButton variant="outlined">Cancel</VButton>
  <VButton variant="outlined">Save Draft</VButton>
  <VButton>Publish</VButton>
</VStack>`}
        preview={
          <VStack direction="horizontal" spacing="8px" justify="end">
            <VButton variant="outlined">Cancel</VButton>
            <VButton variant="outlined">Save Draft</VButton>
            <VButton>Publish</VButton>
          </VStack>
        }
      />
    </StorybookPageLayout>
  ),
};
