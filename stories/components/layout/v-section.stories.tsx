import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VSection, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VSection> = {
  title: "Components/Layout/VSection",
  component: VSection,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    title: "Section Title",
    description: "A brief description of this section.",
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
      title="VSection"
      description="A content section with optional title, description, and collapsible behavior."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="default" labels={['VSection(variant="default")']}>
          <VSection title="Account">
            <p style={{ color: "var(--v-foreground)" }}>
              Manage your account settings and preferences.
            </p>
          </VSection>
        </StorybookSubsection>
        <StorybookSubsection title="card" labels={['VSection(variant="card")']}>
          <VSection title="Notifications" variant="card">
            <p style={{ color: "var(--v-foreground)" }}>
              Email, push, and in-app notification settings.
            </p>
          </VSection>
        </StorybookSubsection>
        <StorybookSubsection title="inset" labels={['VSection(variant="inset")']}>
          <VSection title="Privacy" variant="inset">
            <p style={{ color: "var(--v-foreground)" }}>Data sharing and privacy settings.</p>
          </VSection>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Header & Footer">
        <StorybookSubsection title="header (string)" labels={['title="string"']}>
          <VSection title="Simple Header">
            <p style={{ color: "var(--v-foreground)" }}>Content with string header.</p>
          </VSection>
        </StorybookSubsection>
        <StorybookSubsection
          title="header (VSectionHeader)"
          labels={["title={<VSectionHeader />}"]}
        >
          <VSection
            title={
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span>Custom Header</span>
                <VButton variant="text" size="sm">
                  Action
                </VButton>
              </div>
            }
          >
            <p style={{ color: "var(--v-foreground)" }}>Content with custom header widget.</p>
          </VSection>
        </StorybookSubsection>
        <StorybookSubsection title="footer (string)" labels={['footer="string"']}>
          <VSection title="With Footer" footer="Section footer text">
            <p style={{ color: "var(--v-foreground)" }}>Content with string footer.</p>
          </VSection>
        </StorybookSubsection>
        <StorybookSubsection
          title="footer (VSectionFooter)"
          labels={["footer={<VSectionFooter />}"]}
        >
          <VSection
            title="Custom Footer"
            footer={
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <VButton variant="text" size="sm">
                  Cancel
                </VButton>
                <VButton variant="text" size="sm">
                  Save
                </VButton>
              </div>
            }
          >
            <p style={{ color: "var(--v-foreground)" }}>Content with custom footer widget.</p>
          </VSection>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="With Divider">
        <StorybookSubsection title="divider: false" labels={["divider={false}"]}>
          <VSection title="No Divider" divider={false}>
            <p style={{ color: "var(--v-foreground)" }}>First item</p>
            <p style={{ color: "var(--v-foreground)" }}>Second item</p>
          </VSection>
        </StorybookSubsection>
        <StorybookSubsection title="divider: true" labels={["divider"]}>
          <VSection title="With Divider" divider>
            <p style={{ color: "var(--v-foreground)" }}>First item</p>
            <p style={{ color: "var(--v-foreground)" }}>Second item</p>
          </VSection>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Group related content: settings pages, form sections, dashboard areas",
          },
          {
            category: "Collapsible",
            guideline:
              "Use for secondary content that can be hidden. Default collapsed for advanced options",
          },
          {
            category: "Description",
            guideline: "Add description for context. Keep it to one sentence",
          },
          {
            category: "Nesting",
            guideline: "Avoid deep nesting. Use 1-2 levels maximum for clarity",
          },
          {
            category: "variant",
            guideline: "Choose a style that matches the screen design (card, inset)",
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
    <StorybookPageLayout title="VSection Samples" description="Copy-paste code examples.">
      <StorybookCodeBlock
        title="Basic usage"
        code={`<VSection title="Announcements">
  <p>Service maintenance notice</p>
  <p>New feature introduction</p>
</VSection>`}
        preview={
          <VSection title="Announcements">
            <p style={{ color: "var(--v-foreground)" }}>Service maintenance notice</p>
            <p style={{ color: "var(--v-foreground)" }}>New feature introduction</p>
          </VSection>
        }
      />
      <StorybookCodeBlock
        title="With description"
        code={`<VSection title="Account" description="Manage your account settings.">
  <p>Profile, Security, Notifications</p>
</VSection>`}
        preview={
          <VSection title="Account" description="Manage your account settings.">
            <p style={{ color: "var(--v-foreground)" }}>Profile, Security, Notifications</p>
          </VSection>
        }
      />
      <StorybookCodeBlock
        title="Collapsible section"
        code={`<VSection title="Advanced Settings" collapsible>
  <p>Debug mode, API keys, and logging settings.</p>
</VSection>`}
        preview={
          <VSection title="Advanced Settings" collapsible>
            <p style={{ color: "var(--v-foreground)" }}>
              Debug mode, API keys, and logging settings.
            </p>
          </VSection>
        }
      />
      <StorybookCodeBlock
        title="Default collapsed"
        code={`<VSection title="Developer Options" collapsible defaultOpen={false}>
  <p>Hidden by default, click to expand.</p>
</VSection>`}
        preview={
          <VSection title="Developer Options" collapsible defaultOpen={false}>
            <p style={{ color: "var(--v-foreground)" }}>Hidden by default, click to expand.</p>
          </VSection>
        }
      />
      <StorybookCodeBlock
        title="Card variant"
        code={`<VSection title="Card Section" variant="card">
  <p>Content inside a card-style section.</p>
</VSection>`}
        preview={
          <VSection title="Card Section" variant="card">
            <p style={{ color: "var(--v-foreground)" }}>Content inside a card-style section.</p>
          </VSection>
        }
      />
      <StorybookCodeBlock
        title="Inset variant"
        code={`<VSection title="Inset Section" variant="inset">
  <p>Content inside an inset-style section.</p>
</VSection>`}
        preview={
          <VSection title="Inset Section" variant="inset">
            <p style={{ color: "var(--v-foreground)" }}>Content inside an inset-style section.</p>
          </VSection>
        }
      />
      <StorybookCodeBlock
        title="With footer"
        code={`<VSection title="Settings" footer="Last updated: today">
  <p>Section content with a footer.</p>
</VSection>`}
        preview={
          <VSection title="Settings" footer="Last updated: today">
            <p style={{ color: "var(--v-foreground)" }}>Section content with a footer.</p>
          </VSection>
        }
      />
      <StorybookCodeBlock
        title="Custom header"
        code={`<VSection title={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <span>Custom</span><VButton>Edit</VButton>
</div>}>
  <p>Content with custom header.</p>
</VSection>`}
        preview={
          <VSection
            title={
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span>Custom</span>
                <VButton variant="text" size="sm">
                  Edit
                </VButton>
              </div>
            }
          >
            <p style={{ color: "var(--v-foreground)" }}>Content with custom header.</p>
          </VSection>
        }
      />
      <StorybookCodeBlock
        title="With divider"
        code={`<VSection title="Items" divider>
  <p>First item</p>
  <p>Second item</p>
  <p>Third item</p>
</VSection>`}
        preview={
          <VSection title="Items" divider>
            <p style={{ color: "var(--v-foreground)" }}>First item</p>
            <p style={{ color: "var(--v-foreground)" }}>Second item</p>
            <p style={{ color: "var(--v-foreground)" }}>Third item</p>
          </VSection>
        }
      />
    </StorybookPageLayout>
  ),
};
