import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VCheckbox, VCheckboxGroup, VForm, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VCheckbox> = {
  title: "Components/Inputs/VCheckbox",
  component: VCheckbox,
  tags: ["autodocs"],
  args: {
    variant: "default",
    size: "md",
    label: "Checkbox",
    disabled: false,
    checked: false,
    defaultChecked: false,
    indeterminate: false,
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
      title="VCheckbox"
      description="Toggle a single boolean value on or off, or manage multiple selections as a group."
    >
      <StorybookSection title="Sizes">
        <StorybookSubsection title="sm" labels={['size="sm"']}>
          <VCheckbox size="sm" label="Small" />
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['size="md"']}>
          <VCheckbox size="md" label="Medium" />
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['size="lg"']}>
          <VCheckbox size="lg" label="Large" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="unchecked" labels={["checked={false}"]}>
          <VCheckbox label="Unchecked" />
        </StorybookSubsection>
        <StorybookSubsection title="checked" labels={["defaultChecked"]}>
          <VCheckbox defaultChecked label="Checked" />
        </StorybookSubsection>
        <StorybookSubsection title="indeterminate" labels={["indeterminate"]}>
          <VCheckbox indeterminate label="Indeterminate" />
        </StorybookSubsection>
        <StorybookSubsection title="disabled" labels={["disabled"]}>
          <VCheckbox disabled label="Disabled" />
        </StorybookSubsection>
        <StorybookSubsection title="disabled checked" labels={["disabled", "defaultChecked"]}>
          <VCheckbox disabled defaultChecked label="Disabled Checked" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Card Variant">
        <StorybookSubsection title="card unchecked" labels={['variant="card"']}>
          <VCheckbox variant="card" label="Card Checkbox" sublabel="Card-style variant" />
        </StorybookSubsection>
        <StorybookSubsection title="card checked" labels={['variant="card"', "defaultChecked"]}>
          <VCheckbox
            variant="card"
            defaultChecked
            label="Card Checked"
            sublabel="Active card with border highlight"
          />
        </StorybookSubsection>
        <StorybookSubsection title="card disabled" labels={['variant="card"', "disabled"]}>
          <VCheckbox variant="card" defaultChecked disabled label="Card Disabled" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Without Label">
        <StorybookSubsection title="no label" labels={["VCheckbox()"]}>
          <VCheckbox aria-label="Accept" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="VCheckboxGroup">
        <StorybookSubsection title="vertical" labels={["VCheckboxGroup", 'orientation="vertical"']}>
          <VCheckboxGroup
            options={[
              { value: "email", label: "Email" },
              { value: "sms", label: "SMS" },
              { value: "push", label: "Push Notification" },
            ]}
            defaultValue={["email"]}
          />
        </StorybookSubsection>
        <StorybookSubsection
          title="horizontal"
          labels={["VCheckboxGroup", 'orientation="horizontal"']}
        >
          <VCheckboxGroup
            orientation="horizontal"
            options={[
              { value: "email", label: "Email" },
              { value: "sms", label: "SMS" },
              { value: "push", label: "Push Notification" },
            ]}
            defaultValue={["email"]}
          />
        </StorybookSubsection>
        <StorybookSubsection
          title="with disabled item"
          labels={["VCheckboxGroup", "disabled item"]}
        >
          <VCheckboxGroup
            options={[
              { value: "standard", label: "Standard" },
              { value: "express", label: "Express" },
              { value: "overnight", label: "Overnight", disabled: true },
            ]}
            defaultValue={["standard"]}
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Binary choices: agree/disagree, enable/disable, select items in a list",
          },
          {
            category: "Label",
            guideline: "Always provide a label or aria-label for accessibility",
          },
          {
            category: "Indeterminate",
            guideline:
              "Use for parent checkbox when some children are checked (select all pattern)",
          },
          {
            category: "vs Switch",
            guideline: "Use checkbox for forms requiring submit. Use switch for instant toggles",
          },
          {
            category: "Group",
            guideline: "For multi-select, use VCheckboxGroup. For single toggles, use VCheckbox",
          },
          {
            category: "Disabled",
            guideline: "When the option is not available. Explain via tooltip or helper text",
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
      title="VCheckbox Samples"
      description="Copy-paste code examples for common checkbox patterns."
    >
      <StorybookCodeBlock
        title="Basic checkbox"
        code={`<VCheckbox label="I agree to the terms" />`}
        preview={<VCheckbox label="I agree to the terms" />}
      />
      <StorybookCodeBlock
        title="Controlled checkbox"
        code={`const [checked, setChecked] = useState(false)

<VCheckbox
  checked={checked}
  onCheckedChange={setChecked}
  label="Enable notifications"
/>`}
        preview={<VCheckbox label="Enable notifications" />}
      />
      <StorybookCodeBlock
        title="Indeterminate state"
        code={`<VCheckbox indeterminate label="Select all" />`}
        preview={<VCheckbox indeterminate label="Select all" />}
      />
      <StorybookCodeBlock
        title="Disabled"
        code={`<VCheckbox disabled defaultChecked label="Cannot change" />`}
        preview={<VCheckbox disabled defaultChecked label="Cannot change" />}
      />
      <StorybookCodeBlock
        title="Preferences Form"
        code={`<VForm onSubmit={(e) => e.preventDefault()}>
  <VCheckbox label="Email notifications" />
  <VCheckbox label="SMS notifications" />
  <VCheckbox label="Push notifications" />
  <VButton type="submit">Save Preferences</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VCheckbox label="Email notifications" defaultChecked />
            <VCheckbox label="SMS notifications" />
            <VCheckbox label="Push notifications" defaultChecked />
            <VButton>Save Preferences</VButton>
          </VForm>
        }
      />
      <StorybookCodeBlock
        title="VCheckboxGroup (multi-select)"
        code={`<VCheckboxGroup
  options={[
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push Notification' },
  ]}
  defaultValue={['email']}
  onValueChange={(values) => console.log(values)}
/>`}
        preview={
          <VCheckboxGroup
            options={[
              { value: "email", label: "Email" },
              { value: "sms", label: "SMS" },
              { value: "push", label: "Push Notification" },
            ]}
            defaultValue={["email"]}
          />
        }
      />
      <StorybookCodeBlock
        title="VCheckboxGroup horizontal"
        code={`<VCheckboxGroup
  options={[
    { value: 'dark', label: 'Dark' },
    { value: 'compact', label: 'Compact' },
    { value: 'animations', label: 'Animations' },
  ]}
  defaultValue={['dark']}
  orientation="horizontal"
/>`}
        preview={
          <VCheckboxGroup
            options={[
              { value: "dark", label: "Dark" },
              { value: "compact", label: "Compact" },
              { value: "animations", label: "Animations" },
            ]}
            defaultValue={["dark"]}
            orientation="horizontal"
          />
        }
      />
    </StorybookPageLayout>
  ),
};
