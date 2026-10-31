import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VSwitchListTile } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VSwitchListTile> = {
  title: "Components/Data Display/VSwitchListTile",
  component: VSwitchListTile,
  tags: ["autodocs"],
  args: {
    variant: "default",
    title: "Switch list item",
    subtitle: "Description text",
    disabled: false,
    checked: false,
    selected: false,
    dense: false,
  },
  parameters: { controls: { sort: "none" } },
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
      title="VSwitchListTile"
      description="A list tile with an integrated switch for toggling options."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="trailing" labels={["VSwitchListTile"]}>
          <VSwitchListTile title="Trailing switch" subtitle="Switch on the right" />
        </StorybookSubsection>
        <StorybookSubsection title="leading" labels={['VSwitchListTile variant="leading"']}>
          <VSwitchListTile title="Leading switch" subtitle="Switch on the left" variant="leading" />
        </StorybookSubsection>
        <StorybookSubsection title="card" labels={['VSwitchListTile variant="card"']}>
          <VSwitchListTile title="Card switch" subtitle="Card style with border" variant="card" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="on" labels={["VSwitchListTile checked"]}>
          <VSwitchListTile title="Switch on" checked />
        </StorybookSubsection>
        <StorybookSubsection title="off" labels={["VSwitchListTile checked={false}"]}>
          <VSwitchListTile title="Switch off" checked={false} />
        </StorybookSubsection>
        <StorybookSubsection title="selected" labels={["VSwitchListTile selected"]}>
          <VSwitchListTile
            title="Selected item"
            subtitle="Highlighted background"
            selected
            checked
          />
        </StorybookSubsection>
        <StorybookSubsection title="disabled" labels={["VSwitchListTile disabled"]}>
          <VSwitchListTile title="Disabled" subtitle="Cannot toggle" disabled checked />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="With Trailing">
        <StorybookSubsection title="trailing icon" labels={["VSwitchListTile trailing={<Icon />}"]}>
          <VSwitchListTile
            title="Notifications"
            subtitle="Receive push notifications"
            trailing={<span style={{ fontSize: "20px" }}>&#128276;</span>}
          />
        </StorybookSubsection>
        <StorybookSubsection
          title="leading switch with trailing icon"
          labels={['VSwitchListTile variant="leading" trailing={<Icon />}']}
        >
          <VSwitchListTile
            title="Wi-Fi"
            subtitle="Connected to network"
            variant="leading"
            trailing={<span style={{ fontSize: "20px" }}>&#128246;</span>}
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Toggle settings, enable/disable features, or on/off preferences in a list format.",
          },
          {
            category: "When not to use",
            guideline:
              "For multi-select lists where multiple items can be checked. Use VCheckListTile instead.",
          },
          {
            category: "Variant",
            guideline:
              "Use trailing (default) for settings lists. Use leading when the switch is the primary visual element.",
          },
          {
            category: "Immediate",
            guideline: "Changes take effect immediately without form submission",
          },
          {
            category: "Binary",
            guideline: "Use for simple on/off toggles",
          },
          {
            category: "Card",
            guideline: "Use card variant for visually prominent settings",
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
      title="VSwitchListTile Samples"
      description="Copy-paste code examples for VSwitchListTile."
    >
      <StorybookCodeBlock
        title="Basic usage"
        code={`<VSwitchListTile
  title="Notifications"
  subtitle="Receive push notifications"
  checked={enabled}
  onCheckedChange={setEnabled}
/>`}
        preview={<VSwitchListTile title="Notifications" subtitle="Receive push notifications" />}
      />
      <StorybookCodeBlock
        title="Leading position"
        code={`<VSwitchListTile
  title="Wi-Fi"
  subtitle="Connected"
  variant="leading"
/>`}
        preview={<VSwitchListTile title="Wi-Fi" subtitle="Connected" variant="leading" />}
      />
      <StorybookCodeBlock
        title="Card style"
        code={`<VSwitchListTile
  title="Dark Mode"
  subtitle="Use dark theme"
  variant="card"
/>`}
        preview={<VSwitchListTile title="Dark Mode" subtitle="Use dark theme" variant="card" />}
      />
      <StorybookCodeBlock
        title="Notification settings"
        code={`<div>
  <VSwitchListTile
    title="Email notifications"
    subtitle="Receive order updates via email"
    trailing={<span>&#9993;</span>}
    defaultChecked
  />
  <VSwitchListTile
    title="Push notifications"
    subtitle="Get alerts on your device"
    trailing={<span>&#128276;</span>}
    defaultChecked
  />
  <VSwitchListTile
    title="SMS notifications"
    subtitle="Receive text messages for urgent updates"
    trailing={<span>&#128241;</span>}
  />
</div>`}
        preview={
          <div style={{ width: "100%" }}>
            <VSwitchListTile
              title="Email notifications"
              subtitle="Receive order updates via email"
              trailing={<span style={{ fontSize: "20px" }}>&#9993;</span>}
              defaultChecked
            />
            <VSwitchListTile
              title="Push notifications"
              subtitle="Get alerts on your device"
              trailing={<span style={{ fontSize: "20px" }}>&#128276;</span>}
              defaultChecked
            />
            <VSwitchListTile
              title="SMS notifications"
              subtitle="Receive text messages for urgent updates"
              trailing={<span style={{ fontSize: "20px" }}>&#128241;</span>}
            />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Privacy settings"
        code={`<div>
  <VSwitchListTile
    title="Public profile"
    subtitle="Let others find you by name or email"
    defaultChecked
  />
  <VSwitchListTile
    title="Show online status"
    subtitle="Display when you are active"
    defaultChecked
  />
  <VSwitchListTile
    title="Read receipts"
    subtitle="Let others see when you've read messages"
  />
  <VSwitchListTile
    title="Activity tracking"
    subtitle="Allow analytics on your usage patterns"
  />
</div>`}
        preview={
          <div style={{ width: "100%" }}>
            <VSwitchListTile
              title="Public profile"
              subtitle="Let others find you by name or email"
              defaultChecked
            />
            <VSwitchListTile
              title="Show online status"
              subtitle="Display when you are active"
              defaultChecked
            />
            <VSwitchListTile
              title="Read receipts"
              subtitle="Let others see when you've read messages"
            />
            <VSwitchListTile
              title="Activity tracking"
              subtitle="Allow analytics on your usage patterns"
            />
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
