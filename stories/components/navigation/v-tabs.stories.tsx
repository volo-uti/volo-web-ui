import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VTabs, VTabsList, VTabsTrigger, VTabsContent } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VTabs> = {
  title: "Components/Navigation/VTabs",
  component: VTabs,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    defaultValue: "tab1",
    orientation: "horizontal",
    isScrollable: false,
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
      title="VTabs"
      description="Tab navigation compound component for switching between content panels."
    >
      <StorybookSection title="Variant">
        {(["default", "pills", "underline", "overline"] as const).map((variant) => (
          <StorybookSubsection
            key={variant}
            title={variant}
            labels={[`VTabsList(variant="${variant}")`]}
          >
            <VTabs defaultValue="tab1" className="w-full">
              <VTabsList variant={variant}>
                <VTabsTrigger value="tab1">Account</VTabsTrigger>
                <VTabsTrigger value="tab2">Password</VTabsTrigger>
                <VTabsTrigger value="tab3">Settings</VTabsTrigger>
              </VTabsList>
              <VTabsContent value="tab1">
                <p className="p-4 text-sm">Account settings content.</p>
              </VTabsContent>
            </VTabs>
          </StorybookSubsection>
        ))}
      </StorybookSection>
      <StorybookSection title="Orientation">
        <StorybookSubsection title="horizontal" labels={['VTabs(orientation="horizontal")']}>
          <VTabs defaultValue="tab1" orientation="horizontal" className="w-full">
            <VTabsList>
              <VTabsTrigger value="tab1">Account</VTabsTrigger>
              <VTabsTrigger value="tab2">Password</VTabsTrigger>
              <VTabsTrigger value="tab3">Settings</VTabsTrigger>
            </VTabsList>
            <VTabsContent value="tab1">
              <p className="p-4 text-sm">Account settings content.</p>
            </VTabsContent>
            <VTabsContent value="tab2">
              <p className="p-4 text-sm">Password change content.</p>
            </VTabsContent>
            <VTabsContent value="tab3">
              <p className="p-4 text-sm">General settings content.</p>
            </VTabsContent>
          </VTabs>
        </StorybookSubsection>
        <StorybookSubsection title="vertical" labels={['VTabs(orientation="vertical")']}>
          <VTabs defaultValue="tab1" orientation="vertical" className="w-full">
            <VTabsList>
              <VTabsTrigger value="tab1">Account</VTabsTrigger>
              <VTabsTrigger value="tab2">Password</VTabsTrigger>
              <VTabsTrigger value="tab3">Settings</VTabsTrigger>
            </VTabsList>
            <VTabsContent value="tab1">
              <p className="p-4 text-sm">Account settings content.</p>
            </VTabsContent>
            <VTabsContent value="tab2">
              <p className="p-4 text-sm">Password change content.</p>
            </VTabsContent>
            <VTabsContent value="tab3">
              <p className="p-4 text-sm">General settings content.</p>
            </VTabsContent>
          </VTabs>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Disabled Tab">
        <StorybookSubsection title="disabled trigger" labels={["VTabsTrigger(disabled)"]}>
          <VTabs defaultValue="tab1" className="w-full">
            <VTabsList>
              <VTabsTrigger value="tab1">Active</VTabsTrigger>
              <VTabsTrigger value="tab2">Normal</VTabsTrigger>
              <VTabsTrigger value="tab3" disabled>
                Disabled
              </VTabsTrigger>
            </VTabsList>
            <VTabsContent value="tab1">
              <p className="p-4 text-sm">Active tab content.</p>
            </VTabsContent>
            <VTabsContent value="tab2">
              <p className="p-4 text-sm">Normal tab content.</p>
            </VTabsContent>
            <VTabsContent value="tab3">
              <p className="p-4 text-sm">Disabled tab content.</p>
            </VTabsContent>
          </VTabs>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Switch between related content panels without page navigation",
          },
          { category: "Horizontal", guideline: "Default layout for top-level tab navigation" },
          { category: "Vertical", guideline: "Use for sidebar-style navigation in settings pages" },
          { category: "Disabled", guideline: "Disable tabs that are temporarily unavailable" },
          { category: "Accessibility", guideline: "Supports arrow key navigation between tabs" },
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
      title="VTabs Samples"
      description="Copy-paste code examples for common tab patterns."
    >
      <StorybookCodeBlock
        title="Basic tabs"
        code={`<VTabs defaultValue="tab1">
  <VTabsList>
    <VTabsTrigger value="tab1">Tab 1</VTabsTrigger>
    <VTabsTrigger value="tab2">Tab 2</VTabsTrigger>
  </VTabsList>
  <VTabsContent value="tab1">Content 1</VTabsContent>
  <VTabsContent value="tab2">Content 2</VTabsContent>
</VTabs>`}
        preview={
          <VTabs defaultValue="tab1">
            <VTabsList>
              <VTabsTrigger value="tab1">Tab 1</VTabsTrigger>
              <VTabsTrigger value="tab2">Tab 2</VTabsTrigger>
            </VTabsList>
            <VTabsContent value="tab1">
              <p className="p-4 text-sm">Content 1</p>
            </VTabsContent>
            <VTabsContent value="tab2">
              <p className="p-4 text-sm">Content 2</p>
            </VTabsContent>
          </VTabs>
        }
      />
      <StorybookCodeBlock
        title="Vertical tabs"
        code={`<VTabs defaultValue="tab1" orientation="vertical">
  <VTabsList>
    <VTabsTrigger value="tab1">General</VTabsTrigger>
    <VTabsTrigger value="tab2">Security</VTabsTrigger>
    <VTabsTrigger value="tab3">Notifications</VTabsTrigger>
  </VTabsList>
  <VTabsContent value="tab1">General settings</VTabsContent>
  <VTabsContent value="tab2">Security settings</VTabsContent>
  <VTabsContent value="tab3">Notification settings</VTabsContent>
</VTabs>`}
        preview={
          <VTabs defaultValue="tab1" orientation="vertical">
            <VTabsList>
              <VTabsTrigger value="tab1">General</VTabsTrigger>
              <VTabsTrigger value="tab2">Security</VTabsTrigger>
              <VTabsTrigger value="tab3">Notifications</VTabsTrigger>
            </VTabsList>
            <VTabsContent value="tab1">
              <p className="p-4 text-sm">General settings content</p>
            </VTabsContent>
            <VTabsContent value="tab2">
              <p className="p-4 text-sm">Security settings content</p>
            </VTabsContent>
            <VTabsContent value="tab3">
              <p className="p-4 text-sm">Notification settings content</p>
            </VTabsContent>
          </VTabs>
        }
      />
      <StorybookCodeBlock
        title="Settings page pattern"
        code={`<VTabs defaultValue="profile">
  <VTabsList>
    <VTabsTrigger value="profile">Profile</VTabsTrigger>
    <VTabsTrigger value="account">Account</VTabsTrigger>
    <VTabsTrigger value="notifications">Notifications</VTabsTrigger>
  </VTabsList>
  <VTabsContent value="profile">Profile settings</VTabsContent>
  <VTabsContent value="account">Account settings</VTabsContent>
  <VTabsContent value="notifications">Notification preferences</VTabsContent>
</VTabs>`}
        preview={
          <VTabs defaultValue="profile">
            <VTabsList>
              <VTabsTrigger value="profile">Profile</VTabsTrigger>
              <VTabsTrigger value="account">Account</VTabsTrigger>
              <VTabsTrigger value="notifications">Notifications</VTabsTrigger>
            </VTabsList>
            <VTabsContent value="profile">
              <div className="p-4 text-sm space-y-2">
                <h3 className="font-medium">Profile Settings</h3>
                <p className="text-[var(--v-muted-foreground)]">
                  Manage your name, photo, and personal info.
                </p>
              </div>
            </VTabsContent>
            <VTabsContent value="account">
              <div className="p-4 text-sm space-y-2">
                <h3 className="font-medium">Account Settings</h3>
                <p className="text-[var(--v-muted-foreground)]">
                  Manage email, password, and account details.
                </p>
              </div>
            </VTabsContent>
            <VTabsContent value="notifications">
              <div className="p-4 text-sm space-y-2">
                <h3 className="font-medium">Notification Settings</h3>
                <p className="text-[var(--v-muted-foreground)]">
                  Configure email and push notification preferences.
                </p>
              </div>
            </VTabsContent>
          </VTabs>
        }
      />
      <StorybookCodeBlock
        title="With icons"
        code={`<VTabs defaultValue="home">
  <VTabsList>
    <VTabsTrigger value="home">🏠 Home</VTabsTrigger>
    <VTabsTrigger value="search">🔍 Search</VTabsTrigger>
    <VTabsTrigger value="settings">⚙️ Settings</VTabsTrigger>
  </VTabsList>
  <VTabsContent value="home">Home content</VTabsContent>
  <VTabsContent value="search">Search content</VTabsContent>
  <VTabsContent value="settings">Settings content</VTabsContent>
</VTabs>`}
        preview={
          <VTabs defaultValue="home">
            <VTabsList>
              <VTabsTrigger value="home">🏠 Home</VTabsTrigger>
              <VTabsTrigger value="search">🔍 Search</VTabsTrigger>
              <VTabsTrigger value="settings">⚙️ Settings</VTabsTrigger>
            </VTabsList>
            <VTabsContent value="home">
              <p className="p-4 text-sm">Welcome to the home tab.</p>
            </VTabsContent>
            <VTabsContent value="search">
              <p className="p-4 text-sm">Search for anything here.</p>
            </VTabsContent>
            <VTabsContent value="settings">
              <p className="p-4 text-sm">Configure your preferences.</p>
            </VTabsContent>
          </VTabs>
        }
      />
      <StorybookCodeBlock
        title="Scrollable tabs"
        code={`<VTabs defaultValue="tab1" isScrollable>
  <VTabsList>
    <VTabsTrigger value="tab1">Overview</VTabsTrigger>
    <VTabsTrigger value="tab2">Analytics</VTabsTrigger>
    <VTabsTrigger value="tab3">Reports</VTabsTrigger>
    <VTabsTrigger value="tab4">Customers</VTabsTrigger>
    <VTabsTrigger value="tab5">Products</VTabsTrigger>
    <VTabsTrigger value="tab6">Orders</VTabsTrigger>
    <VTabsTrigger value="tab7">Inventory</VTabsTrigger>
    <VTabsTrigger value="tab8">Shipping</VTabsTrigger>
  </VTabsList>
  <VTabsContent value="tab1">Overview content</VTabsContent>
  ...
</VTabs>`}
        preview={
          <div style={{ maxWidth: "400px" }}>
            <VTabs defaultValue="tab1" isScrollable>
              <VTabsList>
                <VTabsTrigger value="tab1">Overview</VTabsTrigger>
                <VTabsTrigger value="tab2">Analytics</VTabsTrigger>
                <VTabsTrigger value="tab3">Reports</VTabsTrigger>
                <VTabsTrigger value="tab4">Customers</VTabsTrigger>
                <VTabsTrigger value="tab5">Products</VTabsTrigger>
                <VTabsTrigger value="tab6">Orders</VTabsTrigger>
                <VTabsTrigger value="tab7">Inventory</VTabsTrigger>
                <VTabsTrigger value="tab8">Shipping</VTabsTrigger>
              </VTabsList>
              <VTabsContent value="tab1">
                <p className="p-4 text-sm">Overview dashboard content.</p>
              </VTabsContent>
              <VTabsContent value="tab2">
                <p className="p-4 text-sm">Analytics charts and data.</p>
              </VTabsContent>
              <VTabsContent value="tab3">
                <p className="p-4 text-sm">Generated reports.</p>
              </VTabsContent>
              <VTabsContent value="tab4">
                <p className="p-4 text-sm">Customer management.</p>
              </VTabsContent>
              <VTabsContent value="tab5">
                <p className="p-4 text-sm">Product catalog.</p>
              </VTabsContent>
              <VTabsContent value="tab6">
                <p className="p-4 text-sm">Order history.</p>
              </VTabsContent>
              <VTabsContent value="tab7">
                <p className="p-4 text-sm">Inventory tracking.</p>
              </VTabsContent>
              <VTabsContent value="tab8">
                <p className="p-4 text-sm">Shipping & logistics.</p>
              </VTabsContent>
            </VTabs>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Tabs with disabled state"
        code={`<VTabs defaultValue="info">
  <VTabsList>
    <VTabsTrigger value="info">Info</VTabsTrigger>
    <VTabsTrigger value="settings">Settings</VTabsTrigger>
    <VTabsTrigger value="history" disabled>History</VTabsTrigger>
  </VTabsList>
  <VTabsContent value="info">Information content</VTabsContent>
  <VTabsContent value="settings">Settings content</VTabsContent>
  <VTabsContent value="history">History content</VTabsContent>
</VTabs>`}
        preview={
          <VTabs defaultValue="info">
            <VTabsList>
              <VTabsTrigger value="info">Info</VTabsTrigger>
              <VTabsTrigger value="settings">Settings</VTabsTrigger>
              <VTabsTrigger value="history" disabled>
                History
              </VTabsTrigger>
            </VTabsList>
            <VTabsContent value="info">
              <p className="p-4 text-sm">Information content</p>
            </VTabsContent>
            <VTabsContent value="settings">
              <p className="p-4 text-sm">Settings content</p>
            </VTabsContent>
            <VTabsContent value="history">
              <p className="p-4 text-sm">History content</p>
            </VTabsContent>
          </VTabs>
        }
      />
    </StorybookPageLayout>
  ),
};
