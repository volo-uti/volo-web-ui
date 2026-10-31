import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VTextArea, VTextField, VForm, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VTextArea> = {
  title: "Components/Inputs/VTextArea",
  component: VTextArea,
  tags: ["autodocs"],
  args: {
    placeholder: "Enter text...",
    size: "md",
    rows: 4,
    resize: "vertical",
    autoResize: false,
    required: false,
    fullWidth: false,
    disabled: false,
    error: false,
    success: false,
  },
  parameters: { controls: { sort: "none" } },
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
      title="VTextArea"
      description="Multi-line text input for longer content such as descriptions, comments, and messages."
    >
      <StorybookSection title="Sizes">
        <StorybookSubsection title="sm" labels={['size="sm"']}>
          <VTextArea size="sm" placeholder="Small textarea" rows={3} />
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['size="md"']}>
          <VTextArea size="md" placeholder="Medium textarea" rows={3} />
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['size="lg"']}>
          <VTextArea size="lg" placeholder="Large textarea" rows={3} />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Label & Helper Text">
        <StorybookSubsection title="label" labels={['label="..."']}>
          <VTextArea label="Description" placeholder="Enter a description" rows={3} />
        </StorybookSubsection>
        <StorybookSubsection title="helper text" labels={['helper="..."']}>
          <VTextArea
            label="Bio"
            placeholder="Tell us about yourself"
            helper="Max 500 characters"
            rows={3}
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="default" labels={["default"]}>
          <VTextArea placeholder="Default state" rows={3} />
        </StorybookSubsection>
        <StorybookSubsection title="disabled" labels={["disabled"]}>
          <VTextArea disabled placeholder="Disabled" rows={3} />
        </StorybookSubsection>
        <StorybookSubsection title="error" labels={["error", 'errorText="..."']}>
          <VTextArea
            label="Comment"
            error
            errorText="This field is required"
            placeholder="Error state"
            rows={3}
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Resize">
        <StorybookSubsection title="none" labels={['resize="none"']}>
          <VTextArea resize="none" placeholder="Cannot resize" rows={3} />
        </StorybookSubsection>
        <StorybookSubsection title="vertical" labels={['resize="vertical"']}>
          <VTextArea resize="vertical" placeholder="Vertical resize only" rows={3} />
        </StorybookSubsection>
        <StorybookSubsection title="both" labels={['resize="both"']}>
          <VTextArea resize="both" placeholder="Resize both directions" rows={3} />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Auto Resize">
        <StorybookSubsection title="auto resize" labels={["autoResize"]}>
          <VTextArea autoResize placeholder="Grows as you type..." rows={2} />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Rows">
        <StorybookSubsection title="rows=2" labels={["rows={2}"]}>
          <VTextArea placeholder="2 rows" rows={2} />
        </StorybookSubsection>
        <StorybookSubsection title="rows=6" labels={["rows={6}"]}>
          <VTextArea placeholder="6 rows" rows={6} />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Full Width">
        <StorybookSubsection title="full width" labels={["fullWidth"]}>
          <VTextArea fullWidth placeholder="Full width textarea" rows={3} />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Multi-line content: descriptions, comments, messages, notes",
          },
          {
            category: "Rows",
            guideline:
              "Set initial rows to match expected content length (3-5 for short, 8+ for long)",
          },
          {
            category: "Auto resize",
            guideline: "Enable for inputs where content length varies (e.g., chat messages)",
          },
          {
            category: "Validation",
            guideline: "Show character count or limit via helper. Show errorText on submit",
          },
          {
            category: "Resize",
            guideline: "Default to vertical. Use none for fixed-height areas (e.g., code editors)",
          },
          {
            category: "Disabled",
            guideline: "When content is read-only or not editable in current context",
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
      title="VTextArea Samples"
      description="Copy-paste code examples for common textarea patterns."
    >
      <StorybookCodeBlock
        title="Basic textarea"
        code={`<VTextArea label="Description" placeholder="Enter description" rows={4} />`}
        preview={<VTextArea label="Description" placeholder="Enter description" rows={4} />}
      />
      <StorybookCodeBlock
        title="With helper text"
        code={`<VTextArea
  label="Bio"
  placeholder="Tell us about yourself"
  helper="Max 500 characters"
  rows={4}
/>`}
        preview={
          <VTextArea
            label="Bio"
            placeholder="Tell us about yourself"
            helper="Max 500 characters"
            rows={4}
          />
        }
      />
      <StorybookCodeBlock
        title="Auto-resizing"
        code={`<VTextArea autoResize placeholder="Type to expand..." rows={2} />`}
        preview={<VTextArea autoResize placeholder="Type to expand..." rows={2} />}
      />
      <StorybookCodeBlock
        title="Error state"
        code={`<VTextArea
  label="Comment"
  error
  errorText="Comment cannot be empty"
  rows={3}
/>`}
        preview={<VTextArea label="Comment" error errorText="Comment cannot be empty" rows={3} />}
      />
      <StorybookCodeBlock
        title="Non-resizable full width"
        code={`<VTextArea resize="none" fullWidth rows={4} placeholder="Fixed size" />`}
        preview={<VTextArea resize="none" fullWidth rows={4} placeholder="Fixed size" />}
      />
      <StorybookCodeBlock
        title="Feedback Form"
        code={`<VForm onSubmit={handleFeedback}>
  <VTextField label="Subject" placeholder="Enter subject" />
  <VTextArea label="Message" placeholder="Your feedback..." rows={4} />
  <VButton type="submit">Submit</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VTextField label="Subject" placeholder="Enter subject" />
            <VTextArea label="Message" placeholder="Your feedback..." rows={4} />
            <VButton>Submit</VButton>
          </VForm>
        }
      />
    </StorybookPageLayout>
  ),
};
