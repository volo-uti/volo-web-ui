import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VFormField, VTextField } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VFormField> = {
  title: "Components/Inputs/VFormField",
  component: VFormField,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    label: "Username",
    helper: "Choose a unique username",
    size: "md",
    required: false,
    error: false,
    success: false,
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
      title="VFormField"
      description="Wrapper component providing label, helper text, and error message for form inputs."
    >
      <StorybookSection title="Label & Helper Text">
        <StorybookSubsection title="label only" labels={['label="..."']}>
          <VFormField label="Name">
            <VTextField placeholder="Enter your name" />
          </VFormField>
        </StorybookSubsection>
        <StorybookSubsection title="with helper text" labels={['helper="..."']}>
          <VFormField label="Email" helper="We will never share your email">
            <VTextField placeholder="user@example.com" />
          </VFormField>
        </StorybookSubsection>
        <StorybookSubsection title="required" labels={["required"]}>
          <VFormField label="Password" required>
            <VTextField type="password" placeholder="Enter password" />
          </VFormField>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="default" labels={["default"]}>
          <VFormField label="Name" helper="Enter your full name">
            <VTextField placeholder="Name" />
          </VFormField>
        </StorybookSubsection>
        <StorybookSubsection title="error" labels={["error", 'errorText="..."']}>
          <VFormField label="Email" error errorText="Invalid email format">
            <VTextField placeholder="Email" error />
          </VFormField>
        </StorybookSubsection>
        <StorybookSubsection title="success" labels={["success", 'successText="..."']}>
          <VFormField label="Username" success successText="Username is available">
            <VTextField placeholder="Username" />
          </VFormField>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Wrap any form input to add label, helper text, and validation messaging",
          },
          {
            category: "Label",
            guideline:
              "Always provide a label. Use htmlFor to connect label to input for accessibility",
          },
          {
            category: "Required",
            guideline:
              "Mark mandatory fields with required. Show indicator consistently across the form",
          },
          {
            category: "Error",
            guideline:
              "Display errorText below input on validation failure. Replace helper when error is true",
          },
          {
            category: "Helper text",
            guideline:
              'Use for format guidance, constraints, or instructions (e.g., "Max 50 characters")',
          },
          {
            category: "Consistency",
            guideline: "Use the same size for VFormField and its child input component",
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
      title="VFormField Samples"
      description="Copy-paste code examples for common form field patterns."
    >
      <StorybookCodeBlock
        title="Basic Usage"
        code={`<VFormField label="Name">
  <VTextField placeholder="Enter your name" />
</VFormField>`}
        preview={
          <VFormField label="Name">
            <VTextField placeholder="Enter your name" />
          </VFormField>
        }
      />
      <StorybookCodeBlock
        title="Error State"
        code={`<VFormField htmlFor="password" label="Password" error errorText="Must be at least 8 characters">
  <VTextField id="password" type="password" error />
</VFormField>`}
        preview={
          <VFormField
            htmlFor="password-error"
            label="Password"
            error
            errorText="Must be at least 8 characters"
          >
            <VTextField id="password-error" type="password" error />
          </VFormField>
        }
      />
      <StorybookCodeBlock
        title="Required field"
        code={`<VFormField label="Email" required>
  <VTextField placeholder="user@example.com" />
</VFormField>`}
        preview={
          <VFormField label="Email" required>
            <VTextField placeholder="user@example.com" />
          </VFormField>
        }
      />
      <StorybookCodeBlock
        title="Required with helper text"
        code={`<VFormField label="Email" required helper="We will never share your email">
  <VTextField placeholder="user@example.com" />
</VFormField>`}
        preview={
          <VFormField label="Email" required helper="We will never share your email">
            <VTextField placeholder="user@example.com" />
          </VFormField>
        }
      />
      <StorybookCodeBlock
        title="Size comparison"
        code={`<div className="space-y-4">
  <VFormField label="Small" size="sm">
    <VTextField size="sm" placeholder="Small input" />
  </VFormField>
  <VFormField label="Medium" size="md">
    <VTextField size="md" placeholder="Medium input" />
  </VFormField>
  <VFormField label="Large" size="lg">
    <VTextField size="lg" placeholder="Large input" />
  </VFormField>
</div>`}
        preview={
          <div className="space-y-4">
            <VFormField label="Small" size="sm">
              <VTextField size="sm" placeholder="Small input" />
            </VFormField>
            <VFormField label="Large" size="lg">
              <VTextField size="lg" placeholder="Large input" />
            </VFormField>
          </div>
        }
      />
      <StorybookCodeBlock
        title="With character counter"
        code={`const [bio, setBio] = useState('')

<VFormField
  label="Bio"
  helper="Tell us about yourself"
  maxLength={200}
  currentLength={bio.length}
>
  <VTextField
    placeholder="Write a short bio..."
    value={bio}
    onValueChange={setBio}
    maxLength={200}
  />
</VFormField>`}
        preview={
          <VFormField
            label="Bio"
            helper="Tell us about yourself"
            maxLength={200}
            currentLength={42}
          >
            <VTextField placeholder="Write a short bio..." />
          </VFormField>
        }
      />
    </StorybookPageLayout>
  ),
};
