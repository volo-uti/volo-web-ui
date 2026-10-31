import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VAlert, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VAlert> = {
  title: "Components/Feedback/VAlert",
  component: VAlert,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    variant: "standard",
    severity: "info",
    title: "Alert Title",
    children: "This is an alert message.",
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
      title="VAlert"
      description="Displays contextual feedback messages with severity-based styling."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="standard" labels={['VAlert variant="standard"']}>
          <VAlert variant="standard" severity="info" title="Standard">
            This is a standard style alert.
          </VAlert>
        </StorybookSubsection>
        <StorybookSubsection title="filled" labels={['VAlert variant="filled"']}>
          <VAlert variant="filled" severity="info" title="Filled">
            This is a filled style alert.
          </VAlert>
        </StorybookSubsection>
        <StorybookSubsection title="outlined" labels={['VAlert variant="outlined"']}>
          <VAlert variant="outlined" severity="info" title="Outlined">
            This is an outlined style alert.
          </VAlert>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Severity">
        <StorybookSubsection title="success" labels={['VAlert severity="success"']}>
          <VAlert severity="success" title="Success">
            The operation completed successfully.
          </VAlert>
        </StorybookSubsection>
        <StorybookSubsection title="info" labels={['VAlert severity="info"']}>
          <VAlert severity="info" title="Info">
            Here is some helpful information.
          </VAlert>
        </StorybookSubsection>
        <StorybookSubsection title="warning" labels={['VAlert severity="warning"']}>
          <VAlert severity="warning" title="Warning">
            Please review before proceeding.
          </VAlert>
        </StorybookSubsection>
        <StorybookSubsection title="error" labels={['VAlert severity="error"']}>
          <VAlert severity="error" title="Error">
            An error occurred. Please try again.
          </VAlert>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Filled + Severity">
        <StorybookSubsection title="all filled" labels={['VAlert variant="filled"']}>
          <VAlert severity="success" variant="filled" title="Success">
            Success message
          </VAlert>
          <VAlert severity="info" variant="filled" title="Info">
            Info message
          </VAlert>
          <VAlert severity="warning" variant="filled" title="Warning">
            Warning message
          </VAlert>
          <VAlert severity="error" variant="filled" title="Error">
            Error message
          </VAlert>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Outlined + Severity">
        <StorybookSubsection title="all outlined" labels={['VAlert variant="outlined"']}>
          <VAlert severity="success" variant="outlined" title="Success">
            Success message
          </VAlert>
          <VAlert severity="info" variant="outlined" title="Info">
            Info message
          </VAlert>
          <VAlert severity="warning" variant="outlined" title="Warning">
            Warning message
          </VAlert>
          <VAlert severity="error" variant="outlined" title="Error">
            Error message
          </VAlert>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Close Button">
        <StorybookSubsection title="closable" labels={["VAlert onClose={...}"]}>
          <VAlert severity="success" title="Closable" onClose={() => {}}>
            This alert has a close button.
          </VAlert>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Icon Control">
        <StorybookSubsection title="icon hidden" labels={["VAlert icon={false}"]}>
          <VAlert severity="info" title="No Icon" icon={false}>
            This alert has no icon.
          </VAlert>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Title / Content Combinations">
        <StorybookSubsection title="title + content" labels={["VAlert title + children"]}>
          <VAlert severity="info" title="Alert with Title">
            Body content is displayed alongside the title.
          </VAlert>
        </StorybookSubsection>
        <StorybookSubsection title="content only" labels={["VAlert children only"]}>
          <VAlert severity="info">Only body content without a title.</VAlert>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Show important feedback messages, such as success confirmations, warnings, or errors.",
          },
          {
            category: "When not to use",
            guideline: "For brief, auto-dismissing notifications. Use VToast instead.",
          },
          {
            category: "Severity",
            guideline:
              "Choose the severity that matches the message context: success, info, warning, or error.",
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
    <StorybookPageLayout title="VAlert Samples" description="Copy-paste code examples for VAlert.">
      <StorybookCodeBlock
        title="Basic success alert"
        code={`<VAlert severity="success" title="Saved">
  Your changes have been saved successfully.
</VAlert>`}
        preview={
          <VAlert severity="success" title="Saved">
            Your changes have been saved successfully.
          </VAlert>
        }
      />
      <StorybookCodeBlock
        title="Error alert with close"
        code={`<VAlert severity="error" title="Upload Failed" onClose={() => setShow(false)}>
  File size exceeds 10MB limit.
</VAlert>`}
        preview={
          <VAlert severity="error" title="Upload Failed" onClose={() => {}}>
            File size exceeds 10MB limit.
          </VAlert>
        }
      />
      <StorybookCodeBlock
        title="Filled warning alert"
        code={`<VAlert severity="warning" variant="filled" title="Caution">
  This action cannot be undone.
</VAlert>`}
        preview={
          <VAlert severity="warning" variant="filled" title="Caution">
            This action cannot be undone.
          </VAlert>
        }
      />
      <StorybookCodeBlock
        title="Outlined info alert"
        code={`<VAlert severity="info" variant="outlined">
  System maintenance is scheduled for tonight.
</VAlert>`}
        preview={
          <VAlert severity="info" variant="outlined">
            System maintenance is scheduled for tonight.
          </VAlert>
        }
      />
      <StorybookCodeBlock
        title="Alert with action button"
        code={`<VAlert severity="info" title="Update Available" action={<VButton>Update</VButton>}>
  A new version has been released.
</VAlert>`}
        preview={
          <VAlert
            severity="info"
            title="Update Available"
            action={
              <VButton variant="filled" size="sm">
                Update
              </VButton>
            }
          >
            A new version has been released.
          </VAlert>
        }
      />
      <StorybookCodeBlock
        title="Form validation alert"
        code={`<VAlert severity="error" variant="outlined" title="Please fix the following errors">
  <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
    <li>Email address is required</li>
    <li>Password must be at least 8 characters</li>
    <li>Please agree to the terms of service</li>
  </ul>
</VAlert>`}
        preview={
          <VAlert severity="error" variant="outlined" title="Please fix the following errors">
            <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li>Email address is required</li>
              <li>Password must be at least 8 characters</li>
              <li>Please agree to the terms of service</li>
            </ul>
          </VAlert>
        }
      />
    </StorybookPageLayout>
  ),
};
