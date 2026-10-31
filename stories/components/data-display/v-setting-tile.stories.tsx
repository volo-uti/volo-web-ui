import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VSettingTile } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VSettingTile> = {
  title: "Components/Data Display/VSettingTile",
  component: VSettingTile,
  tags: ["autodocs"],
  args: {
    variant: "simple",
    title: "Setting title",
    subtitle: "A brief subtitle of this setting.",
    disabled: false,
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
      title="VSettingTile"
      description="A settings list item with title, subtitle, and interactive control."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="simple" labels={['VSettingTile variant="simple"']}>
          <VSettingTile title="Profile" subtitle="View your profile information" />
        </StorybookSubsection>
        <StorybookSubsection title="navigation" labels={['VSettingTile variant="navigation"']}>
          <VSettingTile
            title="Language"
            subtitle="Choose your preferred language"
            variant="navigation"
            value="English"
            onClick={() => {}}
          />
        </StorybookSubsection>
        <StorybookSubsection title="switch" labels={['VSettingTile variant="switch"']}>
          <VSettingTile title="Dark mode" subtitle="Enable dark color theme" variant="switch" />
        </StorybookSubsection>
        <StorybookSubsection title="checkbox" labels={['VSettingTile variant="checkbox"']}>
          <VSettingTile
            title="Marketing consent"
            subtitle="Receive promotions and event information"
            variant="checkbox"
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="With Content">
        <StorybookSubsection title="leading icon" labels={["VSettingTile leading={<Icon />}"]}>
          <VSettingTile
            title="Notifications"
            subtitle="Manage notification preferences"
            variant="navigation"
            leading={<span style={{ fontSize: "20px" }}>&#128276;</span>}
            onClick={() => {}}
          />
        </StorybookSubsection>
        <StorybookSubsection title="subtitle" labels={['VSettingTile subtitle="..."']}>
          <VSettingTile
            title="Storage"
            subtitle="12.5 GB of 15 GB used"
            variant="navigation"
            onClick={() => {}}
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Settings pages, preference panels, or configuration lists with interactive controls.",
          },
          {
            category: "When not to use",
            guideline:
              "For informational lists without interactive controls. Use VListTile instead.",
          },
          {
            category: "Variant",
            guideline:
              "Use toggle for on/off settings, navigation for drill-down pages, select for choosing from options.",
          },
          {
            category: "Consistency",
            guideline: "Maintain consistent styling across all settings items",
          },
          {
            category: "Simple",
            guideline: "Use for display-only settings without interactive controls",
          },
          {
            category: "Checkbox",
            guideline: "Use when the setting has a binary yes/no value requiring form save",
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
      title="VSettingTile Samples"
      description="Copy-paste code examples for VSettingTile."
    >
      <StorybookCodeBlock
        title="Simple"
        code={`<VSettingTile
  title="Profile"
  subtitle="Edit name, photo, and more"
  leading={<span>&#128100;</span>}
  onClick={() => {}}
/>`}
        preview={
          <VSettingTile
            title="Profile"
            subtitle="Edit name, photo, and more"
            leading={<span style={{ fontSize: "20px" }}>&#128100;</span>}
            onClick={() => {}}
          />
        }
      />
      <StorybookCodeBlock
        title="Navigation"
        code={`<VSettingTile
  title="Language"
  subtitle="Choose your preferred language"
  variant="navigation"
  value="English"
  onClick={() => {}}
/>`}
        preview={
          <VSettingTile
            title="Language"
            subtitle="Choose your preferred language"
            variant="navigation"
            value="English"
            onClick={() => {}}
          />
        }
      />
      <StorybookCodeBlock
        title="Switch"
        code={`<VSettingTile
  title="Dark Mode"
  subtitle="Use the dark theme"
  variant="switch"
/>`}
        preview={<VSettingTile title="Dark Mode" subtitle="Use the dark theme" variant="switch" />}
      />
      <StorybookCodeBlock
        title="Checkbox"
        code={`<VSettingTile
  title="Marketing Consent"
  subtitle="Receive promotions and event information"
  variant="checkbox"
/>`}
        preview={
          <VSettingTile
            title="Marketing Consent"
            subtitle="Receive promotions and event information"
            variant="checkbox"
          />
        }
      />
      <StorybookCodeBlock
        title="Account settings page"
        code={`<div>
  <VSettingTile
    title="Profile"
    subtitle="Name, avatar, and bio"
    variant="navigation"
    leading={<span>&#128100;</span>}
    onClick={() => {}}
  />
  <VSettingTile
    title="Language"
    subtitle="Interface language"
    variant="navigation"
    value="English"
    leading={<span>&#127760;</span>}
    onClick={() => {}}
  />
  <VSettingTile
    title="Dark Mode"
    subtitle="Toggle dark theme"
    variant="switch"
    leading={<span>&#127769;</span>}
  />
  <VSettingTile
    title="Newsletter"
    subtitle="Weekly product updates"
    variant="checkbox"
    leading={<span>&#9993;</span>}
  />
</div>`}
        preview={
          <div style={{ width: "100%" }}>
            <VSettingTile
              title="Profile"
              subtitle="Name, avatar, and bio"
              variant="navigation"
              leading={<span style={{ fontSize: "20px" }}>&#128100;</span>}
              onClick={() => {}}
            />
            <VSettingTile
              title="Language"
              subtitle="Interface language"
              variant="navigation"
              value="English"
              leading={<span style={{ fontSize: "20px" }}>&#127760;</span>}
              onClick={() => {}}
            />
            <VSettingTile
              title="Dark Mode"
              subtitle="Toggle dark theme"
              variant="switch"
              leading={<span style={{ fontSize: "20px" }}>&#127769;</span>}
            />
            <VSettingTile
              title="Newsletter"
              subtitle="Weekly product updates"
              variant="checkbox"
              leading={<span style={{ fontSize: "20px" }}>&#9993;</span>}
            />
          </div>
        }
      />
      <StorybookCodeBlock
        title="With badge"
        code={`<VSettingTile
  title={
    <span className="flex items-center gap-2">
      Experimental Features
      <VBadge content="Beta" color="warning" />
    </span>
  }
  subtitle="Try out new features before they are released"
  variant="switch"
/>`}
        preview={
          <VSettingTile
            title={
              <span className="flex items-center gap-2">
                Experimental Features
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    padding: "1px 6px",
                    borderRadius: "9999px",
                    backgroundColor: "var(--v-warning)",
                    color: "var(--v-warning-foreground)",
                  }}
                >
                  Beta
                </span>
              </span>
            }
            subtitle="Try out new features before they are released"
            variant="switch"
          />
        }
      />
    </StorybookPageLayout>
  ),
};
