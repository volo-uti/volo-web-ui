import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VLabel, VTextField } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VLabel> = {
  title: "Components/Data Display/VLabel",
  component: VLabel,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    size: "md",
    children: "Label Text",
    required: false,
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
      title="VLabel"
      description="Label element for form inputs, providing accessible text identification."
    >
      <StorybookSection title="Sizes">
        <StorybookSubsection title="sm" labels={['size="sm"']}>
          <VLabel size="sm">Small Label</VLabel>
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['size="md"']}>
          <VLabel size="md">Medium Label</VLabel>
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['size="lg"']}>
          <VLabel size="lg">Large Label</VLabel>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Required">
        <StorybookSubsection title="optional" labels={["required={false}"]}>
          <VLabel>Optional Label</VLabel>
        </StorybookSubsection>
        <StorybookSubsection title="required" labels={["required"]}>
          <VLabel required>Required Label</VLabel>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Every form input needs a label for accessibility. Use VLabel or VFormField",
          },
          {
            category: "Required",
            guideline: "Add required prop to show an asterisk indicator for mandatory fields",
          },
          {
            category: "vs VFormField",
            guideline:
              "Use VLabel for standalone labels. Use VFormField for label + helper + error",
          },
          {
            category: "Content",
            guideline: 'Keep labels short and descriptive. Use sentence case ("Email address")',
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
      title="VLabel Samples"
      description="Copy-paste code examples for common label patterns."
    >
      <StorybookCodeBlock
        title="Basic label"
        code={`<VLabel>Name</VLabel>`}
        preview={<VLabel>Name</VLabel>}
      />
      <StorybookCodeBlock
        title="Required indicator"
        code={`<VLabel required>Email</VLabel>`}
        preview={<VLabel required>Email</VLabel>}
      />
      <StorybookCodeBlock
        title="With htmlFor"
        code={`<VLabel htmlFor="email-input">Email Address</VLabel>
<VTextField id="email-input" type="email" />`}
        preview={
          <div className="space-y-1">
            <VLabel htmlFor="email-input-sample">Email Address</VLabel>
            <VTextField id="email-input-sample" placeholder="user@example.com" />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Size comparison"
        code={`<div className="space-y-2">
  <VLabel size="sm">Small</VLabel>
  <VLabel size="md">Medium</VLabel>
  <VLabel size="lg">Large</VLabel>
</div>`}
        preview={
          <div className="space-y-2">
            <VLabel size="sm">Small</VLabel>
            <VLabel size="md">Medium</VLabel>
            <VLabel size="lg">Large</VLabel>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Form field label"
        code={`<div className="space-y-1">
  <VLabel htmlFor="username" required>Username</VLabel>
  <VTextField id="username" placeholder="Enter username" />
</div>`}
        preview={
          <div className="space-y-1">
            <VLabel htmlFor="username-sample" required>
              Username
            </VLabel>
            <VTextField id="username-sample" placeholder="Enter username" />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Label with badge"
        code={`<VLabel>
  Notifications{' '}
  <span style={{
    background: 'var(--v-primary)',
    color: 'white',
    borderRadius: 10,
    padding: '1px 7px',
    fontSize: 11,
    marginLeft: 4,
  }}>
    3
  </span>
</VLabel>

<VLabel>
  Feature{' '}
  <span style={{
    background: 'var(--v-success)',
    color: 'white',
    borderRadius: 4,
    padding: '1px 6px',
    fontSize: 10,
    marginLeft: 4,
  }}>
    New
  </span>
</VLabel>`}
        preview={
          <div className="space-y-2">
            <VLabel>
              Notifications{" "}
              <span
                style={{
                  background: "var(--v-primary)",
                  color: "white",
                  borderRadius: 10,
                  padding: "1px 7px",
                  fontSize: 11,
                  marginLeft: 4,
                }}
              >
                3
              </span>
            </VLabel>
            <br />
            <VLabel>
              Feature{" "}
              <span
                style={{
                  background: "var(--v-success)",
                  color: "white",
                  borderRadius: 4,
                  padding: "1px 6px",
                  fontSize: 10,
                  marginLeft: 4,
                }}
              >
                New
              </span>
            </VLabel>
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
