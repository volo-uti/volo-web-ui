import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VBox } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VBox> = {
  title: "Components/Layout/VBox",
  component: VBox,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    variant: "default",
    padding: "16px",
    width: 200,
    height: 100,
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
      title="VBox"
      description="A container component for layout composition with configurable dimensions."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="default" labels={['VBox(variant="default")']}>
          <VBox variant="default" padding="16px" style={{ backgroundColor: "var(--v-muted)" }}>
            Default
          </VBox>
        </StorybookSubsection>
        <StorybookSubsection title="card" labels={['VBox(variant="card")']}>
          <VBox variant="card" padding="16px">
            Card
          </VBox>
        </StorybookSubsection>
        <StorybookSubsection title="outlined" labels={['VBox(variant="outlined")']}>
          <VBox variant="outlined" padding="16px">
            Outlined
          </VBox>
        </StorybookSubsection>
        <StorybookSubsection title="elevated" labels={['VBox(variant="elevated")']}>
          <VBox variant="elevated" padding="16px">
            Elevated
          </VBox>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="With Constraints">
        <StorybookSubsection title="width, height" labels={["width={200}", "height={100}"]}>
          <VBox
            width={200}
            height={100}
            padding="16px"
            style={{ backgroundColor: "var(--v-muted)" }}
          >
            200 x 100
          </VBox>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Generic container for layout composition. Wrap content with consistent spacing and borders",
          },
          {
            category: "Dimensions",
            guideline: "Use width/height for fixed sizing. Prefer CSS units (px, %, rem)",
          },
          {
            category: "Bordered",
            guideline: "Use bordered for visual separation of content areas",
          },
          {
            category: "vs Stack",
            guideline: "Box is a single container. Use Stack for arranging multiple children",
          },
          {
            category: "default",
            guideline: "When only padding/alignment is needed without background or border",
          },
          {
            category: "card",
            guideline: "A container with a card-style background",
          },
          {
            category: "outlined",
            guideline: "A container with only a border",
          },
          {
            category: "elevated",
            guideline: "A floating style with shadow",
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
    <StorybookPageLayout title="VBox Samples" description="Copy-paste code examples.">
      <StorybookCodeBlock
        title="Basic usage"
        code={`<VBox padding="16px">
  Content
</VBox>`}
        preview={<VBox padding="16px">Content</VBox>}
      />
      <StorybookCodeBlock
        title="Bordered box"
        code={`<VBox padding="16px" bordered>
  Bordered Content
</VBox>`}
        preview={
          <VBox padding="16px" bordered>
            Bordered Content
          </VBox>
        }
      />
      <StorybookCodeBlock
        title="Fixed size"
        code={`<VBox width="200px" height="100px" bordered rounded padding="16px">
  200 x 100
</VBox>`}
        preview={
          <VBox width="200px" height="100px" bordered rounded padding="16px">
            200 x 100
          </VBox>
        }
      />
      <StorybookCodeBlock
        title="Card wrapper"
        code={`<VBox variant="card" padding="24px" rounded="lg">
  <h3 style={{ margin: 0, marginBottom: '8px' }}>Welcome Back</h3>
  <p style={{ margin: 0, color: 'var(--v-muted-foreground)', fontSize: '14px' }}>
    You have 3 new notifications and 5 pending tasks.
  </p>
</VBox>`}
        preview={
          <VBox variant="card" padding="24px">
            <h3 style={{ margin: 0, marginBottom: "8px", fontSize: "16px" }}>Welcome Back</h3>
            <p style={{ margin: 0, color: "var(--v-muted-foreground)", fontSize: "14px" }}>
              You have 3 new notifications and 5 pending tasks.
            </p>
          </VBox>
        }
      />
      <StorybookCodeBlock
        title="Centered content"
        code={`<VBox
  width="300px"
  height="200px"
  bordered
  rounded
  padding="16px"
>
  <div style={{ textAlign: 'center' }}>
    <p style={{ fontSize: '32px', margin: 0 }}>📭</p>
    <p style={{ margin: '8px 0 0', fontSize: '14px' }}>No messages yet</p>
  </div>
</VBox>`}
        preview={
          <VBox width="300px" height="200px" bordered rounded padding="16px">
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "32px", margin: 0 }}>📭</p>
              <p
                style={{ margin: "8px 0 0", fontSize: "14px", color: "var(--v-muted-foreground)" }}
              >
                No messages yet
              </p>
            </div>
          </VBox>
        }
      />
    </StorybookPageLayout>
  ),
};
