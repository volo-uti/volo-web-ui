import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VCheckListTile } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VCheckListTile> = {
  title: "Components/Data Display/VCheckListTile",
  component: VCheckListTile,
  tags: ["autodocs"],
  args: {
    variant: "default",
    title: "Check list item",
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
      title="VCheckListTile"
      description="A list tile with an integrated checkbox for selection."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="trailing" labels={["VCheckListTile"]}>
          <VCheckListTile title="Trailing checkbox" subtitle="Checkbox on the right" />
        </StorybookSubsection>
        <StorybookSubsection title="leading" labels={['VCheckListTile variant="leading"']}>
          <VCheckListTile
            title="Leading checkbox"
            subtitle="Checkbox on the left"
            variant="leading"
          />
        </StorybookSubsection>
        <StorybookSubsection title="card" labels={['VCheckListTile variant="card"']}>
          <VCheckListTile title="Card checkbox" subtitle="Card style with border" variant="card" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="checked" labels={["VCheckListTile checked"]}>
          <VCheckListTile title="Checked item" checked />
        </StorybookSubsection>
        <StorybookSubsection title="unchecked" labels={["VCheckListTile checked={false}"]}>
          <VCheckListTile title="Unchecked item" checked={false} />
        </StorybookSubsection>
        <StorybookSubsection title="selected" labels={["VCheckListTile selected"]}>
          <VCheckListTile
            title="Selected item"
            subtitle="Highlighted background"
            selected
            checked
          />
        </StorybookSubsection>
        <StorybookSubsection title="disabled" labels={["VCheckListTile disabled"]}>
          <VCheckListTile title="Disabled item" disabled checked />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="With Trailing">
        <StorybookSubsection title="trailing icon" labels={["VCheckListTile trailing={<Icon />}"]}>
          <VCheckListTile
            title="Notifications"
            subtitle="Receive push notifications"
            trailing={<span style={{ fontSize: "20px" }}>&#128276;</span>}
          />
        </StorybookSubsection>
        <StorybookSubsection
          title="leading checkbox with trailing icon"
          labels={['VCheckListTile variant="leading" trailing={<Icon />}']}
        >
          <VCheckListTile
            title="Email alerts"
            subtitle="Get important email updates"
            variant="leading"
            trailing={<span style={{ fontSize: "20px" }}>&#9993;</span>}
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Multi-select lists like task lists, permission toggles, or filter selections.",
          },
          {
            category: "When not to use",
            guideline: "For on/off toggles. Use VSwitchListTile instead.",
          },
          {
            category: "Variant",
            guideline:
              "Use leading for primary action lists, trailing when the label is the primary focus.",
          },
          {
            category: "Trailing",
            guideline: "Place checkbox after content for natural left-to-right reading",
          },
          {
            category: "Leading",
            guideline: "Place checkbox before content when selection is the primary action",
          },
          {
            category: "Extra content",
            guideline: "Add a trailing icon for additional context or quick actions",
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
      title="VCheckListTile Samples"
      description="Copy-paste code examples for VCheckListTile."
    >
      <StorybookCodeBlock
        title="Basic usage"
        code={`<VCheckListTile
  title="Receive notifications"
  subtitle="Get the latest news"
  checked={enabled}
  onCheckedChange={setEnabled}
/>`}
        preview={<VCheckListTile title="Receive notifications" subtitle="Get the latest news" />}
      />
      <StorybookCodeBlock
        title="Leading checkbox"
        code={`<VCheckListTile
  title="Email notifications"
  subtitle="Receive important updates via email"
  variant="leading"
/>`}
        preview={
          <VCheckListTile
            title="Email notifications"
            subtitle="Receive important updates via email"
            variant="leading"
          />
        }
      />
      <StorybookCodeBlock
        title="Card style"
        code={`<VCheckListTile
  title="Premium Plan"
  subtitle="Unlimited access to all features"
  variant="card"
/>`}
        preview={
          <VCheckListTile
            title="Premium Plan"
            subtitle="Unlimited access to all features"
            variant="card"
          />
        }
      />
      <StorybookCodeBlock
        title="Todo list"
        code={`<div>
  <VCheckListTile
    title="Design mockups"
    subtitle="Create wireframes for the new landing page"
    defaultChecked
    variant="leading"
  />
  <VCheckListTile
    title="Write API docs"
    subtitle="Document the REST endpoints"
    variant="leading"
  />
  <VCheckListTile
    title="Fix login bug"
    subtitle="Users can't log in with SSO"
    variant="leading"
  />
</div>`}
        preview={
          <div style={{ width: "100%" }}>
            <VCheckListTile
              title="Design mockups"
              subtitle="Create wireframes for the new landing page"
              defaultChecked
              variant="leading"
            />
            <VCheckListTile
              title="Write API docs"
              subtitle="Document the REST endpoints"
              variant="leading"
            />
            <VCheckListTile
              title="Fix login bug"
              subtitle="Users can't log in with SSO"
              variant="leading"
            />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Permission selector"
        code={`<div>
  <p style={{ fontWeight: 600, marginBottom: 8 }}>File Access</p>
  <VCheckListTile title="Read" subtitle="View files and folders" defaultChecked />
  <VCheckListTile title="Write" subtitle="Create and edit files" defaultChecked />
  <VCheckListTile title="Delete" subtitle="Remove files permanently" />
  <p style={{ fontWeight: 600, margin: '16px 0 8px' }}>Admin</p>
  <VCheckListTile title="Manage users" subtitle="Add or remove team members" />
  <VCheckListTile title="Billing" subtitle="View and manage billing info" />
</div>`}
        preview={
          <div style={{ width: "100%" }}>
            <p
              style={{
                fontWeight: 600,
                marginBottom: 8,
                fontSize: "0.875rem",
                color: "var(--v-foreground)",
              }}
            >
              File Access
            </p>
            <VCheckListTile title="Read" subtitle="View files and folders" defaultChecked />
            <VCheckListTile title="Write" subtitle="Create and edit files" defaultChecked />
            <VCheckListTile title="Delete" subtitle="Remove files permanently" />
            <p
              style={{
                fontWeight: 600,
                margin: "16px 0 8px",
                fontSize: "0.875rem",
                color: "var(--v-foreground)",
              }}
            >
              Admin
            </p>
            <VCheckListTile title="Manage users" subtitle="Add or remove team members" />
            <VCheckListTile title="Billing" subtitle="View and manage billing info" />
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
