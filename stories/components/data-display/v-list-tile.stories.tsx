import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VListTile } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VListTile> = {
  title: "Components/Data Display/VListTile",
  component: VListTile,
  tags: ["autodocs"],
  args: {
    title: "List Item",
    subtitle: "Description text",
    disabled: false,
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
      title="VListTile"
      description="A list item component with title, subtitle, and optional leading/trailing content."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="default" labels={['VListTile title="..." subtitle="..."']}>
          <VListTile title="List item" subtitle="Supporting description text" />
        </StorybookSubsection>
        <StorybookSubsection title="dense" labels={["VListTile dense"]}>
          <VListTile title="Dense spacing" subtitle="Compact padding" dense />
        </StorybookSubsection>
        <StorybookSubsection title="threeLine" labels={["VListTile threeLine"]}>
          <VListTile
            title="Three Line Item"
            subtitle="This is a longer description that spans multiple lines for detailed information."
            threeLine
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Leading & Trailing">
        <StorybookSubsection title="with leading icon" labels={["VListTile leading={<Icon />}"]}>
          <VListTile
            title="Inbox"
            subtitle="5 new messages"
            leading={<span style={{ fontSize: "20px" }}>&#9993;</span>}
          />
        </StorybookSubsection>
        <StorybookSubsection
          title="with leading avatar"
          labels={["VListTile leading={<Avatar />}"]}
        >
          <VListTile
            title="John Doe"
            subtitle="john@example.com"
            leading={
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "var(--v-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--v-primary-foreground)",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                JD
              </div>
            }
          />
        </StorybookSubsection>
        <StorybookSubsection
          title="with trailing badge"
          labels={["VListTile trailing={<Badge />}"]}
        >
          <VListTile
            title="Notifications"
            subtitle="Push notifications enabled"
            trailing={
              <span
                style={{
                  fontSize: "12px",
                  backgroundColor: "var(--v-primary)",
                  color: "var(--v-primary-foreground)",
                  borderRadius: "9999px",
                  padding: "2px 8px",
                }}
              >
                3
              </span>
            }
          />
        </StorybookSubsection>
        <StorybookSubsection
          title="with leading and trailing"
          labels={["VListTile leading={...} trailing={...}"]}
        >
          <VListTile
            title="Settings"
            subtitle="Configure app preferences"
            leading={<span style={{ fontSize: "20px" }}>&#9881;</span>}
            trailing={
              <span style={{ fontSize: "14px", color: "var(--v-muted-foreground)" }}>&#8250;</span>
            }
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="selected" labels={["VListTile selected"]}>
          <VListTile title="Selected item" subtitle="This item is selected" selected />
        </StorybookSubsection>
        <StorybookSubsection title="disabled" labels={["VListTile disabled"]}>
          <VListTile title="Disabled item" subtitle="This item is disabled" disabled />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Display items in a vertical list such as settings, contacts, menus, or navigation.",
          },
          {
            category: "When not to use",
            guideline: "For tabular data with multiple columns. Use VTable instead.",
          },
          {
            category: "Leading/Trailing",
            guideline:
              "Use leading for icons/avatars and trailing for actions, badges, or navigation chevrons.",
          },
          {
            category: "Tap Area",
            guideline: "The entire tile is tappable for better usability",
          },
          {
            category: "Dense",
            guideline: "Use for compact lists where space is limited",
          },
          {
            category: "Three Line",
            guideline: "Enable threeLine for items with longer descriptions",
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
      title="VListTile Samples"
      description="Copy-paste code examples for VListTile."
    >
      <StorybookCodeBlock
        title="Basic usage"
        code={`<VListTile
  title="Title"
  subtitle="Subtitle"
  onClick={() => {}}
/>`}
        preview={<VListTile title="Title" subtitle="Subtitle" onClick={() => {}} />}
      />
      <StorybookCodeBlock
        title="With leading"
        code={`<VListTile
  leading={<span>&#9993;</span>}
  title="John Doe"
  subtitle="john@example.com"
  onClick={() => {}}
/>`}
        preview={
          <VListTile
            leading={<span style={{ fontSize: "20px" }}>&#9993;</span>}
            title="John Doe"
            subtitle="john@example.com"
            onClick={() => {}}
          />
        }
      />
      <StorybookCodeBlock
        title="Dense version"
        code={`<VListTile
  title="Compact Item"
  dense
  onClick={() => {}}
/>`}
        preview={<VListTile title="Compact Item" dense onClick={() => {}} />}
      />
      <StorybookCodeBlock
        title="Three line"
        code={`<VListTile
  title="Long Content"
  subtitle="This is a longer description that spans multiple lines."
  threeLine
  onClick={() => {}}
/>`}
        preview={
          <VListTile
            title="Long Content"
            subtitle="This is a longer description that spans multiple lines for detailed information."
            threeLine
            onClick={() => {}}
          />
        }
      />
      <StorybookCodeBlock
        title="With trailing"
        code={`<VListTile
  title="With Trailing"
  trailing={<span>&#8250;</span>}
  onClick={() => {}}
/>`}
        preview={
          <VListTile
            title="With Trailing"
            trailing={
              <span style={{ fontSize: "14px", color: "var(--v-muted-foreground)" }}>&#8250;</span>
            }
            onClick={() => {}}
          />
        }
      />
      <StorybookCodeBlock
        title="Settings list"
        code={`<div>
  <VListTile
    leading={<span>&#128100;</span>}
    title="Account"
    subtitle="Manage your account info"
    trailing={<span>&#8250;</span>}
    onClick={() => {}}
  />
  <VListTile
    leading={<span>&#128276;</span>}
    title="Notifications"
    subtitle="Push, email, and SMS"
    trailing={<span>&#8250;</span>}
    onClick={() => {}}
  />
  <VListTile
    leading={<span>&#128274;</span>}
    title="Privacy"
    subtitle="Password and security"
    trailing={<span>&#8250;</span>}
    onClick={() => {}}
  />
</div>`}
        preview={
          <div style={{ width: "100%" }}>
            <VListTile
              leading={<span style={{ fontSize: "20px" }}>&#128100;</span>}
              title="Account"
              subtitle="Manage your account info"
              trailing={
                <span style={{ fontSize: "18px", color: "var(--v-muted-foreground)" }}>
                  &#8250;
                </span>
              }
              onClick={() => {}}
            />
            <VListTile
              leading={<span style={{ fontSize: "20px" }}>&#128276;</span>}
              title="Notifications"
              subtitle="Push, email, and SMS"
              trailing={
                <span style={{ fontSize: "18px", color: "var(--v-muted-foreground)" }}>
                  &#8250;
                </span>
              }
              onClick={() => {}}
            />
            <VListTile
              leading={<span style={{ fontSize: "20px" }}>&#128274;</span>}
              title="Privacy"
              subtitle="Password and security"
              trailing={
                <span style={{ fontSize: "18px", color: "var(--v-muted-foreground)" }}>
                  &#8250;
                </span>
              }
              onClick={() => {}}
            />
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
