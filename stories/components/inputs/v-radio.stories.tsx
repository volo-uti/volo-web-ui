import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VRadioGroup, VRadio, VForm, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VRadioGroup> = {
  title: "Components/Inputs/VRadio",
  component: VRadioGroup,
  tags: ["autodocs"],
  args: {
    size: "md",
    orientation: "vertical",
    defaultValue: "option1",
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
      title="VRadioGroup"
      description="Select a single option from a mutually exclusive set."
    >
      <StorybookSection title="Sizes">
        <StorybookSubsection title="sm" labels={['size="sm"']}>
          <VRadioGroup size="sm" defaultValue="a">
            <VRadio value="a" label="Small A" />
            <VRadio value="b" label="Small B" />
          </VRadioGroup>
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['size="md"']}>
          <VRadioGroup size="md" defaultValue="a">
            <VRadio value="a" label="Medium A" />
            <VRadio value="b" label="Medium B" />
          </VRadioGroup>
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['size="lg"']}>
          <VRadioGroup size="lg" defaultValue="a">
            <VRadio value="a" label="Large A" />
            <VRadio value="b" label="Large B" />
          </VRadioGroup>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Orientation">
        <StorybookSubsection title="vertical" labels={['orientation="vertical"']}>
          <VRadioGroup orientation="vertical" defaultValue="a">
            <VRadio value="a" label="Vertical A" />
            <VRadio value="b" label="Vertical B" />
            <VRadio value="c" label="Vertical C" />
          </VRadioGroup>
        </StorybookSubsection>
        <StorybookSubsection title="horizontal" labels={['orientation="horizontal"']}>
          <VRadioGroup orientation="horizontal" defaultValue="a">
            <VRadio value="a" label="Horizontal A" />
            <VRadio value="b" label="Horizontal B" />
            <VRadio value="c" label="Horizontal C" />
          </VRadioGroup>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="default" labels={["default"]}>
          <VRadioGroup defaultValue="a">
            <VRadio value="a" label="Option A" />
            <VRadio value="b" label="Option B" />
          </VRadioGroup>
        </StorybookSubsection>
        <StorybookSubsection title="disabled group" labels={["disabled"]}>
          <VRadioGroup disabled defaultValue="a">
            <VRadio value="a" label="Disabled A" />
            <VRadio value="b" label="Disabled B" />
          </VRadioGroup>
        </StorybookSubsection>
        <StorybookSubsection title="disabled item" labels={["VRadio disabled"]}>
          <VRadioGroup defaultValue="a">
            <VRadio value="a" label="Enabled" />
            <VRadio value="b" label="Disabled Item" disabled />
          </VRadioGroup>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Group Mode (VRadio.group)">
        <StorybookSubsection title="vertical" labels={["VRadioGroup", 'orientation="vertical"']}>
          <VRadioGroup orientation="vertical" defaultValue="email">
            <VRadio value="email" label="Email" />
            <VRadio value="sms" label="SMS" />
            <VRadio value="push" label="Push Notification" />
          </VRadioGroup>
        </StorybookSubsection>
        <StorybookSubsection
          title="horizontal"
          labels={["VRadioGroup", 'orientation="horizontal"']}
        >
          <VRadioGroup orientation="horizontal" defaultValue="email">
            <VRadio value="email" label="Email" />
            <VRadio value="sms" label="SMS" />
            <VRadio value="push" label="Push Notification" />
          </VRadioGroup>
        </StorybookSubsection>
        <StorybookSubsection title="with disabled item" labels={["VRadioGroup", "VRadio disabled"]}>
          <VRadioGroup defaultValue="standard">
            <VRadio value="standard" label="Standard" />
            <VRadio value="express" label="Express" />
            <VRadio value="overnight" label="Overnight" disabled />
          </VRadioGroup>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Mutually exclusive choices: payment method, shipping speed, plan selection",
          },
          {
            category: "vs Select",
            guideline:
              "Use radio for 2-5 options visible at once. Use select for 6+ or limited space",
          },
          {
            category: "Default",
            guideline: "Pre-select the most common option. Avoid empty state if possible",
          },
          {
            category: "Label",
            guideline: "Each radio must have a clear, concise label. Group needs a title/heading",
          },
          {
            category: "Orientation",
            guideline: "Vertical for readability. Horizontal only for 2-3 short options",
          },
          {
            category: "Disabled",
            guideline: "Disable individual items for unavailable options (e.g., out of stock)",
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
      title="VRadioGroup Samples"
      description="Copy-paste code examples for common radio group patterns."
    >
      <StorybookCodeBlock
        title="Basic radio group"
        code={`<VRadioGroup defaultValue="email">
  <VRadio value="email" label="Email" />
  <VRadio value="sms" label="SMS" />
  <VRadio value="push" label="Push Notification" />
</VRadioGroup>`}
        preview={
          <VRadioGroup defaultValue="email">
            <VRadio value="email" label="Email" />
            <VRadio value="sms" label="SMS" />
            <VRadio value="push" label="Push Notification" />
          </VRadioGroup>
        }
      />
      <StorybookCodeBlock
        title="Horizontal layout"
        code={`<VRadioGroup orientation="horizontal" defaultValue="left">
  <VRadio value="left" label="Left" />
  <VRadio value="center" label="Center" />
  <VRadio value="right" label="Right" />
</VRadioGroup>`}
        preview={
          <VRadioGroup orientation="horizontal" defaultValue="left">
            <VRadio value="left" label="Left" />
            <VRadio value="center" label="Center" />
            <VRadio value="right" label="Right" />
          </VRadioGroup>
        }
      />
      <StorybookCodeBlock
        title="Controlled"
        code={`const [value, setValue] = useState('monthly')

<VRadioGroup value={value} onValueChange={setValue}>
  <VRadio value="monthly" label="Monthly" />
  <VRadio value="yearly" label="Yearly" />
</VRadioGroup>`}
        preview={
          <VRadioGroup defaultValue="monthly">
            <VRadio value="monthly" label="Monthly" />
            <VRadio value="yearly" label="Yearly" />
          </VRadioGroup>
        }
      />
      <StorybookCodeBlock
        title="With disabled option"
        code={`<VRadioGroup defaultValue="standard">
  <VRadio value="standard" label="Standard" />
  <VRadio value="express" label="Express" />
  <VRadio value="overnight" label="Overnight" disabled />
</VRadioGroup>`}
        preview={
          <VRadioGroup defaultValue="standard">
            <VRadio value="standard" label="Standard" />
            <VRadio value="express" label="Express" />
            <VRadio value="overnight" label="Overnight" disabled />
          </VRadioGroup>
        }
      />
      <StorybookCodeBlock
        title="VRadio.group (simplified)"
        code={`<VRadioGroup defaultValue="a">
  <VRadio value="a" label="Option A" />
  <VRadio value="b" label="Option B" />
  <VRadio value="c" label="Option C" />
</VRadioGroup>`}
        preview={
          <VRadioGroup defaultValue="a">
            <VRadio value="a" label="Option A" />
            <VRadio value="b" label="Option B" />
            <VRadio value="c" label="Option C" />
          </VRadioGroup>
        }
      />
      <StorybookCodeBlock
        title="VRadio.group horizontal"
        code={`<VRadioGroup orientation="horizontal" defaultValue="a">
  <VRadio value="a" label="A" />
  <VRadio value="b" label="B" />
  <VRadio value="c" label="C" />
</VRadioGroup>`}
        preview={
          <VRadioGroup orientation="horizontal" defaultValue="a">
            <VRadio value="a" label="A" />
            <VRadio value="b" label="B" />
            <VRadio value="c" label="C" />
          </VRadioGroup>
        }
      />
      <StorybookCodeBlock
        title="Payment Method Form"
        code={`<VForm onSubmit={(e) => e.preventDefault()}>
  <VRadioGroup defaultValue="card">
    <VRadio value="card" label="Credit Card" />
    <VRadio value="bank" label="Bank Transfer" />
    <VRadio value="paypal" label="PayPal" />
  </VRadioGroup>
  <VButton type="submit">Continue</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VRadioGroup defaultValue="card">
              <VRadio value="card" label="Credit Card" />
              <VRadio value="bank" label="Bank Transfer" />
              <VRadio value="paypal" label="PayPal" />
            </VRadioGroup>
            <VButton>Continue</VButton>
          </VForm>
        }
      />
    </StorybookPageLayout>
  ),
};
