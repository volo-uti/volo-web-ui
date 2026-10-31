import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VSwitch, VForm, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VSwitch> = {
  title: "Components/Inputs/VSwitch",
  component: VSwitch,
  tags: ["autodocs"],
  args: {
    variant: "default",
    size: "md",
    label: "Toggle",
    disabled: false,
    checked: false,
    defaultChecked: false,
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
      title="VSwitch"
      description="Toggle switch for instant on/off actions without form submission."
    >
      <StorybookSection title="Sizes">
        <StorybookSubsection title="sm" labels={['size="sm"']}>
          <VSwitch size="sm" label="Small" />
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['size="md"']}>
          <VSwitch size="md" label="Medium" />
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['size="lg"']}>
          <VSwitch size="lg" label="Large" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="off" labels={["checked={false}"]}>
          <VSwitch label="Off" />
        </StorybookSubsection>
        <StorybookSubsection title="on" labels={["defaultChecked"]}>
          <VSwitch defaultChecked label="On" />
        </StorybookSubsection>
        <StorybookSubsection title="disabled off" labels={["disabled"]}>
          <VSwitch disabled label="Disabled Off" />
        </StorybookSubsection>
        <StorybookSubsection title="disabled on" labels={["disabled", "defaultChecked"]}>
          <VSwitch disabled defaultChecked label="Disabled On" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Variants">
        <StorybookSubsection title="labeled" labels={['variant="labeled"']}>
          <VSwitch variant="labeled" label="Wi-Fi" />
        </StorybookSubsection>
        <StorybookSubsection title="active color" labels={["activeColor"]}>
          <VSwitch defaultChecked activeColor="#16a34a" label="Online" />
        </StorybookSubsection>
        <StorybookSubsection title="sublabel" labels={["sublabel"]}>
          <VSwitch label="Auto-sync" sublabel="Syncs every hour" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Without Label">
        <StorybookSubsection title="no label" labels={["VSwitch()"]}>
          <VSwitch aria-label="Notifications" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Settings that take effect immediately: dark mode, notifications, features",
          },
          {
            category: "vs Checkbox",
            guideline: "Switch for instant effect. Checkbox when changes require form submission",
          },
          {
            category: "Label",
            guideline: 'Always provide a label. Use positive phrasing ("Enable X" not "Disable X")',
          },
          {
            category: "Feedback",
            guideline: "If the action is async, show loading state or confirmation toast",
          },
          {
            category: "Disabled",
            guideline: "When the setting is locked by permission or plan. Show explanation",
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
      title="VSwitch Samples"
      description="Copy-paste code examples for common switch patterns."
    >
      <StorybookCodeBlock
        title="Basic toggle"
        code={`<VSwitch label="Enable notifications" />`}
        preview={<VSwitch label="Enable notifications" />}
      />
      <StorybookCodeBlock
        title="Controlled switch"
        code={`const [enabled, setEnabled] = useState(false)

<VSwitch
  checked={enabled}
  onCheckedChange={setEnabled}
  label="Dark mode"
/>`}
        preview={<VSwitch label="Dark mode" />}
      />
      <StorybookCodeBlock
        title="Default on"
        code={`<VSwitch defaultChecked label="Auto-save" />`}
        preview={<VSwitch defaultChecked label="Auto-save" />}
      />
      <StorybookCodeBlock
        title="Disabled"
        code={`<VSwitch disabled label="Premium feature" />`}
        preview={<VSwitch disabled label="Premium feature" />}
      />
      <StorybookCodeBlock
        title="Settings Form"
        code={`<VForm onSubmit={(e) => e.preventDefault()}>
  <VSwitch label="Dark mode" />
  <VSwitch label="Push notifications" defaultChecked />
  <VSwitch label="Auto-save" defaultChecked />
  <VButton type="submit">Save Settings</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VSwitch label="Dark mode" />
            <VSwitch label="Push notifications" defaultChecked />
            <VSwitch label="Auto-save" defaultChecked />
            <VButton>Save Settings</VButton>
          </VForm>
        }
      />
      <StorybookCodeBlock
        title="Dark mode toggle"
        code={`const [isDark, setIsDark] = useState(false)

<div className="flex items-center gap-3">
  <span>{isDark ? '🌙' : '☀️'}</span>
  <VSwitch
    checked={isDark}
    onCheckedChange={setIsDark}
    label={isDark ? 'Dark mode' : 'Light mode'}
  />
</div>`}
        preview={
          <div className="flex items-center gap-3">
            <span>{"\u2600\uFE0F"}</span>
            <VSwitch label="Light mode" />
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
