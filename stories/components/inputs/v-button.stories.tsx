import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VButton, VForm } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VButton> = {
  title: "Components/Inputs/VButton",
  component: VButton,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    variant: "filled",
    size: "md",
    color: "primary",
    corner: "rounded",
    children: "Button",
    fullWidth: false,
    align: "center",
    disabled: false,
    loading: false,
    loadingPosition: "center",
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
      title="VButton"
      description="Triggers user actions such as form submissions, dialogs, and navigation."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="filled" labels={['variant="filled"']}>
          <VButton variant="filled">Filled</VButton>
          <VButton variant="filled" color="secondary">
            Secondary
          </VButton>
          <VButton variant="filled" color="destructive">
            Destructive
          </VButton>
        </StorybookSubsection>
        <StorybookSubsection title="outlined" labels={['variant="outlined"']}>
          <VButton variant="outlined">Outlined</VButton>
          <VButton variant="outlined" color="secondary">
            Secondary
          </VButton>
          <VButton variant="outlined" color="destructive">
            Destructive
          </VButton>
        </StorybookSubsection>
        <StorybookSubsection title="text" labels={['variant="text"']}>
          <VButton variant="text">Text</VButton>
          <VButton variant="text" color="secondary">
            Secondary
          </VButton>
          <VButton variant="text" color="destructive">
            Destructive
          </VButton>
        </StorybookSubsection>
        <StorybookSubsection title="ghost" labels={['variant="ghost"']}>
          <VButton variant="ghost">Ghost</VButton>
          <VButton variant="ghost" color="secondary">
            Secondary
          </VButton>
          <VButton variant="ghost" color="destructive">
            Destructive
          </VButton>
        </StorybookSubsection>
        <StorybookSubsection title="link" labels={['variant="link"']}>
          <VButton variant="link">Link</VButton>
          <VButton variant="link" color="secondary">
            Secondary
          </VButton>
          <VButton variant="link" color="destructive">
            Destructive
          </VButton>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Sizes">
        <StorybookSubsection title="xs" labels={['size="xs"']}>
          <VButton size="xs">Extra Small</VButton>
        </StorybookSubsection>
        <StorybookSubsection title="sm" labels={['size="sm"']}>
          <VButton size="sm">Small</VButton>
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['size="md"']}>
          <VButton size="md">Medium</VButton>
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['size="lg"']}>
          <VButton size="lg">Large</VButton>
        </StorybookSubsection>
        <StorybookSubsection title="xl" labels={['size="xl"']}>
          <VButton size="xl">Extra Large</VButton>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Colors">
        <StorybookSubsection title="primary" labels={['color="primary"']}>
          <VButton color="primary">Primary</VButton>
        </StorybookSubsection>
        <StorybookSubsection title="secondary" labels={['color="secondary"']}>
          <VButton color="secondary">Secondary</VButton>
        </StorybookSubsection>
        <StorybookSubsection title="tertiary" labels={['color="tertiary"']}>
          <VButton color="tertiary">Tertiary</VButton>
        </StorybookSubsection>
        <StorybookSubsection title="destructive" labels={['color="destructive"']}>
          <VButton color="destructive">Destructive</VButton>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="default" labels={["disabled={false}"]}>
          <VButton>Enabled</VButton>
        </StorybookSubsection>
        <StorybookSubsection title="disabled" labels={["disabled"]}>
          <VButton disabled>Disabled</VButton>
        </StorybookSubsection>
        <StorybookSubsection title="loading" labels={["loading"]}>
          <VButton loading>Loading</VButton>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Full Width">
        <StorybookSubsection title="default" labels={["fullWidth={false}"]}>
          <VButton>Default Width</VButton>
        </StorybookSubsection>
        <StorybookSubsection title="full width" labels={["fullWidth"]}>
          <VButton fullWidth>Full Width</VButton>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="With Icons">
        <StorybookSubsection title="leading" labels={["leading={<Icon />}"]}>
          <VButton leading={<span>+</span>}>Add Item</VButton>
        </StorybookSubsection>
        <StorybookSubsection title="trailing" labels={["trailing={<Icon />}"]}>
          <VButton trailing={<span>&rarr;</span>}>Next</VButton>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Corners">
        <StorybookSubsection title="square" labels={['corner="square"']}>
          <VButton corner="square">Square</VButton>
        </StorybookSubsection>
        <StorybookSubsection title="rounded" labels={['corner="rounded"']}>
          <VButton corner="rounded">Rounded</VButton>
        </StorybookSubsection>
        <StorybookSubsection title="pill" labels={['corner="pill"']}>
          <VButton corner="pill">Pill</VButton>
        </StorybookSubsection>
        <StorybookSubsection title="circle" labels={['corner="circle"']}>
          <VButton corner="circle">*</VButton>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Align">
        <StorybookSubsection title="left" labels={['align="left"']}>
          <VButton fullWidth align="left">
            Left Align
          </VButton>
        </StorybookSubsection>
        <StorybookSubsection title="center" labels={['align="center"']}>
          <VButton fullWidth align="center">
            Center Align
          </VButton>
        </StorybookSubsection>
        <StorybookSubsection title="right" labels={['align="right"']}>
          <VButton fullWidth align="right">
            Right Align
          </VButton>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Loading Position">
        <StorybookSubsection title="center" labels={['loadingPosition="center"']}>
          <VButton loading loadingPosition="center">
            Center
          </VButton>
        </StorybookSubsection>
        <StorybookSubsection title="start" labels={['loadingPosition="start"']}>
          <VButton loading loadingPosition="start">
            Start
          </VButton>
        </StorybookSubsection>
        <StorybookSubsection title="end" labels={['loadingPosition="end"']}>
          <VButton loading loadingPosition="end">
            End
          </VButton>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "For user interactions such as form submission, action triggers, and navigation",
          },
          {
            category: "Primary",
            guideline: "Use for one main CTA per screen (save, submit, confirm)",
          },
          { category: "Secondary", guideline: "Use for secondary actions (cancel, go back)" },
          {
            category: "Destructive",
            guideline: "Use only for irreversible actions such as delete or remove",
          },
          {
            category: "Loading",
            guideline: "Provide feedback during async operations and prevent duplicate clicks",
          },
          {
            category: "Disabled",
            guideline:
              "Use when conditions are not met; provide explanation for why it is disabled",
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
      title="VButton Samples"
      description="Copy-paste code examples for common button patterns."
    >
      <StorybookCodeBlock
        title="Basic usage"
        code={`<VButton onClick={handleSave}>Save</VButton>`}
        preview={<VButton>Save</VButton>}
      />
      <StorybookCodeBlock
        title="Outlined button"
        code={`<VButton variant="outlined">Cancel</VButton>`}
        preview={<VButton variant="outlined">Cancel</VButton>}
      />
      <StorybookCodeBlock
        title="Button with icon"
        code={`<VButton leading={<PlusIcon />}>Add Item</VButton>
<VButton trailing={<ArrowRightIcon />}>Next Step</VButton>`}
        preview={
          <div className="flex gap-3">
            <VButton leading={<span>+</span>}>Add Item</VButton>
            <VButton trailing={<span>&rarr;</span>}>Next Step</VButton>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Loading state"
        code={`<VButton loading loadingPosition="center">Saving...</VButton>
<VButton loading loadingPosition="start">Uploading</VButton>
<VButton loading loadingPosition="end">Processing</VButton>`}
        preview={
          <div className="flex gap-3">
            <VButton loading loadingPosition="center">
              Saving...
            </VButton>
            <VButton loading loadingPosition="start">
              Uploading
            </VButton>
            <VButton loading loadingPosition="end">
              Processing
            </VButton>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Destructive action"
        code={`<VButton color="destructive">Delete</VButton>`}
        preview={<VButton color="destructive">Delete</VButton>}
      />
      <StorybookCodeBlock
        title="Full width"
        code={`<VButton fullWidth>Sign In</VButton>
<VButton fullWidth variant="outlined">Create Account</VButton>`}
        preview={
          <div className="space-y-2" style={{ width: 320 }}>
            <VButton fullWidth>Sign In</VButton>
            <VButton fullWidth variant="outlined">
              Create Account
            </VButton>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Submit form button"
        code={`<VForm onSubmit={handleSubmit}>
  {/* form fields */}
  <VButton type="submit">Save Changes</VButton>
</VForm>`}
        preview={
          <VForm className="flex gap-3 items-center">
            <VButton type="submit">Save Changes</VButton>
            <VButton type="reset" variant="outlined">
              Discard
            </VButton>
          </VForm>
        }
      />
      <StorybookCodeBlock
        title="Icon-only toolbar"
        code={`<div className="flex gap-1">
  <VButton variant="ghost" corner="circle" aria-label="Edit">
    <span>&#9998;</span>
  </VButton>
  <VButton variant="ghost" corner="circle" aria-label="Copy">
    <span>&#128203;</span>
  </VButton>
  <VButton variant="ghost" corner="circle" color="destructive" aria-label="Delete">
    <span>&times;</span>
  </VButton>
</div>`}
        preview={
          <div className="flex gap-1">
            <VButton variant="ghost" corner="circle" aria-label="Edit">
              <span>&#9998;</span>
            </VButton>
            <VButton variant="ghost" corner="circle" aria-label="Copy">
              <span>&#128203;</span>
            </VButton>
            <VButton variant="ghost" corner="circle" color="destructive" aria-label="Delete">
              <span>&times;</span>
            </VButton>
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
