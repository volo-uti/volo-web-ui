import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  VMenu,
  VMenuTrigger,
  VMenuContent,
  VMenuItem,
  VMenuSeparator,
  VMenuGroup,
  VMenuLabel,
  VAvatar,
  VButton,
} from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VMenu> = {
  title: "Components/Navigation/VMenu",
  component: VMenu,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    closeOnSelect: true,
    children: (
      <>
        <VMenuTrigger>Open Menu</VMenuTrigger>
        <VMenuContent>
          <VMenuItem>Edit</VMenuItem>
          <VMenuItem>Duplicate</VMenuItem>
          <VMenuSeparator />
          <VMenuItem destructive>Delete</VMenuItem>
        </VMenuContent>
      </>
    ),
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
      title="VMenu"
      description="Dropdown menu with keyboard navigation, grouping, and separators."
    >
      <StorybookSection title="Align">
        <StorybookSubsection
          title="content alignment"
          labels={[
            'VMenuContent(align="start")',
            'VMenuContent(align="center")',
            'VMenuContent(align="end")',
          ]}
        >
          {(["start", "center", "end"] as const).map((a) => (
            <VMenu key={a}>
              <VMenuTrigger className="px-4 py-2 rounded border border-[var(--v-border)] text-sm cursor-pointer">
                {a}
              </VMenuTrigger>
              <VMenuContent align={a}>
                <VMenuItem>Item 1</VMenuItem>
                <VMenuItem>Item 2</VMenuItem>
                <VMenuItem>Item 3</VMenuItem>
              </VMenuContent>
            </VMenu>
          ))}
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Menu Items">
        <StorybookSubsection title="basic items" labels={["VMenuItem()"]}>
          <VMenu>
            <VMenuTrigger className="px-4 py-2 rounded border border-[var(--v-border)] text-sm cursor-pointer">
              Open Menu
            </VMenuTrigger>
            <VMenuContent>
              <VMenuItem>Edit</VMenuItem>
              <VMenuItem>Duplicate</VMenuItem>
              <VMenuSeparator />
              <VMenuItem>Archive</VMenuItem>
              <VMenuItem>Delete</VMenuItem>
            </VMenuContent>
          </VMenu>
        </StorybookSubsection>
        <StorybookSubsection title="disabled item" labels={["VMenuItem(disabled)"]}>
          <VMenu>
            <VMenuTrigger className="px-4 py-2 rounded border border-[var(--v-border)] text-sm cursor-pointer">
              States
            </VMenuTrigger>
            <VMenuContent>
              <VMenuItem>Normal</VMenuItem>
              <VMenuItem disabled>Disabled</VMenuItem>
              <VMenuSeparator />
              <VMenuItem>Another Item</VMenuItem>
            </VMenuContent>
          </VMenu>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Groups & Labels">
        <StorybookSubsection title="grouped menu" labels={["VMenuGroup()", "VMenuLabel()"]}>
          <VMenu>
            <VMenuTrigger className="px-4 py-2 rounded border border-[var(--v-border)] text-sm cursor-pointer">
              Grouped Menu
            </VMenuTrigger>
            <VMenuContent>
              <VMenuGroup>
                <VMenuLabel>Account</VMenuLabel>
                <VMenuItem>Profile</VMenuItem>
                <VMenuItem>Settings</VMenuItem>
                <VMenuItem>Billing</VMenuItem>
              </VMenuGroup>
              <VMenuSeparator />
              <VMenuGroup>
                <VMenuLabel>Team</VMenuLabel>
                <VMenuItem>Members</VMenuItem>
                <VMenuItem>Invite</VMenuItem>
              </VMenuGroup>
              <VMenuSeparator />
              <VMenuItem>Log Out</VMenuItem>
            </VMenuContent>
          </VMenu>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Separator">
        <StorybookSubsection title="with separators" labels={["VMenuSeparator()"]}>
          <VMenu>
            <VMenuTrigger className="px-4 py-2 rounded border border-[var(--v-border)] text-sm cursor-pointer">
              With Separator
            </VMenuTrigger>
            <VMenuContent>
              <VMenuItem>New File</VMenuItem>
              <VMenuItem>Open File</VMenuItem>
              <VMenuSeparator />
              <VMenuItem>Save</VMenuItem>
              <VMenuItem>Save As...</VMenuItem>
              <VMenuSeparator />
              <VMenuItem>Exit</VMenuItem>
            </VMenuContent>
          </VMenu>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Action menus, context menus, dropdown navigation",
          },
          {
            category: "Groups",
            guideline: "Organize related items with VMenuGroup and VMenuLabel",
          },
          { category: "Separator", guideline: "Use VMenuSeparator to divide sections visually" },
          { category: "Disabled", guideline: "Disable items that are temporarily unavailable" },
          {
            category: "Accessibility",
            guideline: "Full keyboard navigation with arrow keys, Enter, Escape",
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
      title="VMenu Samples"
      description="Copy-paste code examples for common menu patterns."
    >
      <StorybookCodeBlock
        title="Basic menu"
        code={`<VMenu>
  <VMenuTrigger>Open Menu</VMenuTrigger>
  <VMenuContent>
    <VMenuItem onClick={() => {}}>Edit</VMenuItem>
    <VMenuItem onClick={() => {}}>Delete</VMenuItem>
  </VMenuContent>
</VMenu>`}
        preview={
          <VMenu>
            <VMenuTrigger className="px-4 py-2 rounded border border-[var(--v-border)] text-sm cursor-pointer">
              Open Menu
            </VMenuTrigger>
            <VMenuContent>
              <VMenuItem>Edit</VMenuItem>
              <VMenuItem>Delete</VMenuItem>
            </VMenuContent>
          </VMenu>
        }
      />
      <StorybookCodeBlock
        title="Menu with separators"
        code={`<VMenu>
  <VMenuTrigger>Actions</VMenuTrigger>
  <VMenuContent>
    <VMenuItem>New File</VMenuItem>
    <VMenuItem>Open File</VMenuItem>
    <VMenuSeparator />
    <VMenuItem>Save</VMenuItem>
    <VMenuItem>Save As...</VMenuItem>
  </VMenuContent>
</VMenu>`}
        preview={
          <VMenu>
            <VMenuTrigger className="px-4 py-2 rounded border border-[var(--v-border)] text-sm cursor-pointer">
              Actions
            </VMenuTrigger>
            <VMenuContent>
              <VMenuItem>New File</VMenuItem>
              <VMenuItem>Open File</VMenuItem>
              <VMenuSeparator />
              <VMenuItem>Save</VMenuItem>
              <VMenuItem>Save As...</VMenuItem>
            </VMenuContent>
          </VMenu>
        }
      />
      <StorybookCodeBlock
        title="Grouped menu"
        code={`<VMenu>
  <VMenuTrigger>Settings</VMenuTrigger>
  <VMenuContent>
    <VMenuGroup>
      <VMenuLabel>Account</VMenuLabel>
      <VMenuItem>Profile</VMenuItem>
      <VMenuItem>Settings</VMenuItem>
    </VMenuGroup>
    <VMenuSeparator />
    <VMenuGroup>
      <VMenuLabel>Team</VMenuLabel>
      <VMenuItem>Members</VMenuItem>
      <VMenuItem>Invite</VMenuItem>
    </VMenuGroup>
    <VMenuSeparator />
    <VMenuItem>Log Out</VMenuItem>
  </VMenuContent>
</VMenu>`}
        preview={
          <VMenu>
            <VMenuTrigger className="px-4 py-2 rounded border border-[var(--v-border)] text-sm cursor-pointer">
              Settings
            </VMenuTrigger>
            <VMenuContent>
              <VMenuGroup>
                <VMenuLabel>Account</VMenuLabel>
                <VMenuItem>Profile</VMenuItem>
                <VMenuItem>Settings</VMenuItem>
              </VMenuGroup>
              <VMenuSeparator />
              <VMenuGroup>
                <VMenuLabel>Team</VMenuLabel>
                <VMenuItem>Members</VMenuItem>
                <VMenuItem>Invite</VMenuItem>
              </VMenuGroup>
              <VMenuSeparator />
              <VMenuItem>Log Out</VMenuItem>
            </VMenuContent>
          </VMenu>
        }
      />
      <StorybookCodeBlock
        title="Item callbacks"
        code={`<VMenu closeOnSelect={false}>
  <VMenuTrigger>Edit</VMenuTrigger>
  <VMenuContent>
    <VMenuItem onClick={() => cut()}>Cut</VMenuItem>
    <VMenuItem onClick={() => copy()}>Copy</VMenuItem>
    <VMenuItem onClick={() => paste()} disabled>Paste</VMenuItem>
    <VMenuSeparator />
    <VMenuItem onClick={() => remove()} destructive>Delete</VMenuItem>
  </VMenuContent>
</VMenu>`}
        preview={
          <VMenu closeOnSelect={false}>
            <VMenuTrigger className="px-4 py-2 rounded border border-[var(--v-border)] text-sm cursor-pointer">
              Edit
            </VMenuTrigger>
            <VMenuContent>
              <VMenuItem onClick={() => {}}>Cut</VMenuItem>
              <VMenuItem onClick={() => {}}>Copy</VMenuItem>
              <VMenuItem disabled>Paste</VMenuItem>
              <VMenuSeparator />
              <VMenuItem destructive onClick={() => {}}>
                Delete
              </VMenuItem>
            </VMenuContent>
          </VMenu>
        }
      />
      <StorybookCodeBlock
        title="User dropdown"
        code={`<VMenu>
  <VMenuTrigger>
    <VAvatar fallback="JD" aria-label="Jane Doe" size="sm" />
    Jane Doe
  </VMenuTrigger>
  <VMenuContent align="end">
    <VMenuGroup>
      <VMenuLabel>jane@example.com</VMenuLabel>
      <VMenuItem onClick={() => {}}>Profile</VMenuItem>
      <VMenuItem onClick={() => {}}>Settings</VMenuItem>
      <VMenuItem onClick={() => {}}>Billing</VMenuItem>
    </VMenuGroup>
    <VMenuSeparator />
    <VMenuItem onClick={() => {}}>Log Out</VMenuItem>
  </VMenuContent>
</VMenu>`}
        preview={
          <VMenu>
            <VMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded border border-[var(--v-border)] text-sm cursor-pointer">
              <VAvatar size="sm" />
              <span>Jane Doe</span>
            </VMenuTrigger>
            <VMenuContent align="end">
              <VMenuGroup>
                <VMenuLabel>jane@example.com</VMenuLabel>
                <VMenuItem onClick={() => {}}>Profile</VMenuItem>
                <VMenuItem onClick={() => {}}>Settings</VMenuItem>
                <VMenuItem onClick={() => {}}>Billing</VMenuItem>
              </VMenuGroup>
              <VMenuSeparator />
              <VMenuItem onClick={() => {}}>Log Out</VMenuItem>
            </VMenuContent>
          </VMenu>
        }
      />
      <StorybookCodeBlock
        title="Your own button as the trigger"
        code={`<VMenu>
  <VMenuTrigger asChild>
    <VButton variant="outlined">Actions</VButton>
  </VMenuTrigger>
  <VMenuContent>
    <VMenuItem>Edit</VMenuItem>
    <VMenuItem>Delete</VMenuItem>
  </VMenuContent>
</VMenu>`}
        preview={
          <VMenu>
            <VMenuTrigger asChild>
              <VButton variant="outlined">Actions</VButton>
            </VMenuTrigger>
            <VMenuContent>
              <VMenuItem>Edit</VMenuItem>
              <VMenuItem>Delete</VMenuItem>
            </VMenuContent>
          </VMenu>
        }
      />
    </StorybookPageLayout>
  ),
};
