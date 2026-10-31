import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VCommand, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VCommand> = {
  title: "Components/Navigation/VCommand",
  component: VCommand,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    placeholder: "Type a command...",
    open: true,
    loading: false,
    groups: [
      { heading: "Pages", items: [{ label: "Home" }, { label: "Settings" }] },
      { heading: "Actions", items: [{ label: "Create new..." }, { label: "Search" }] },
    ],
  },
};
export default meta;

// ─── Primary (hidden from sidebar, powers Docs controls) ───
export const Default: Story = { tags: ["!dev"] };
type Story = StoryObj<typeof meta>;

// ─── Showcase ───
function CommandShowcaseDemo({
  placeholder,
  groups,
  hints,
}: {
  placeholder?: string;
  groups?: boolean;
  hints?: boolean;
}) {
  const flat = [{ heading: "Pages", items: [{ label: "Home" }, { label: "Settings" }] }];
  const grouped = [
    {
      heading: "Pages",
      items: [
        { label: "Home", leading: "⌂", trailing: hints ? "G H" : undefined },
        { label: "Settings", leading: "⚙", trailing: hints ? "G S" : undefined },
        { label: "Profile" },
      ],
    },
    { heading: "Actions", items: [{ label: "Create new..." }, { label: "Search" }] },
  ];
  return (
    <VCommand
      placeholder={placeholder ?? "Type a command or search..."}
      groups={groups ? grouped : flat}
    />
  );
}

export const Showcase: Story = {
  tags: ["!autodocs"],
  render: () => (
    <StorybookPageLayout
      title="VCommand"
      description="Command palette for quick search and navigation actions."
    >
      <StorybookSection title="Content">
        <StorybookSubsection title="flat list" labels={["VCommand(groups)"]}>
          <CommandShowcaseDemo />
        </StorybookSubsection>
        <StorybookSubsection title="with groups" labels={["VCommand(groups=[...])"]}>
          <CommandShowcaseDemo groups />
        </StorybookSubsection>
        <StorybookSubsection
          title="leading and trailing"
          labels={["VCommandItem(leading, trailing)"]}
        >
          <CommandShowcaseDemo groups hints />
        </StorybookSubsection>
        <StorybookSubsection title="custom placeholder" labels={["VCommand(placeholder)"]}>
          <CommandShowcaseDemo placeholder="Search anything..." />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="empty" labels={["VCommand(emptyContent)"]}>
          <VCommand emptyContent="Nothing matches" />
        </StorybookSubsection>
        <StorybookSubsection title="loading" labels={["VCommand(loading)"]}>
          <VCommand loading />
        </StorybookSubsection>
        <StorybookSubsection title="disabled item" labels={["VCommandItem(disabled)"]}>
          <VCommand
            groups={[{ heading: "Actions", items: [{ label: "Delete", disabled: true }] }]}
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Provide quick access to navigation and actions via keyboard shortcut",
          },
          {
            category: "Trigger",
            guideline: "Typically opened with Cmd+K or Ctrl+K keyboard shortcut",
          },
          {
            category: "Groups",
            guideline: "Organize commands into logical groups for easier discovery",
          },
          {
            category: "Accessibility",
            guideline: "Supports keyboard navigation and screen reader announcements",
          },
          {
            category: "Keyboard",
            guideline: "Navigate with arrow keys, select with Enter, close with Escape",
          },
          {
            category: "Filtering",
            guideline: "Searchable via value and keywords",
          },
        ]}
      />
    </StorybookPageLayout>
  ),
};

// ─── Sample ───
function CommandSampleInline() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <VButton onClick={() => setOpen(true)}>Open Command Palette</VButton>
      <VCommand open={open} onOpenChange={setOpen} placeholder="Type a command or search..." />
    </>
  );
}

function CommandSampleWithGroups() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <VButton onClick={() => setOpen(true)}>Open with Groups</VButton>
      <VCommand
        open={open}
        onOpenChange={setOpen}
        placeholder="Search..."
        groups={[
          {
            heading: "Pages",
            items: [{ label: "Home" }, { label: "Settings" }, { label: "Profile" }],
          },
          {
            heading: "Actions",
            items: [{ label: "Create new..." }, { label: "Search" }],
          },
        ]}
      />
    </>
  );
}

function CommandSampleKeyboard() {
  const [open, setOpen] = useState(false);
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);
  return (
    <>
      <VButton onClick={() => setOpen(true)}>Search... ⌘K</VButton>
      <VCommand
        open={open}
        onOpenChange={setOpen}
        placeholder="Type a command or search..."
        groups={[
          {
            heading: "Actions",
            items: [{ label: "New File" }, { label: "New Folder" }, { label: "Open Recent" }],
          },
        ]}
      />
    </>
  );
}

function CommandSampleRecent() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <VButton onClick={() => setOpen(true)}>Open Recent</VButton>
      <VCommand
        open={open}
        onOpenChange={setOpen}
        placeholder="Search recent items..."
        groups={[
          {
            heading: "Recent",
            items: [
              { label: "Dashboard" },
              { label: "User Settings" },
              { label: "API Documentation" },
              { label: "Billing Overview" },
            ],
          },
          {
            heading: "Favorites",
            items: [{ label: "Team Members" }, { label: "Project Roadmap" }],
          },
        ]}
      />
    </>
  );
}

function CommandSampleFiltered() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <VButton onClick={() => setOpen(true)}>Filtered Search</VButton>
      <VCommand
        open={open}
        onOpenChange={setOpen}
        placeholder="Filter by category..."
        groups={[
          {
            heading: "Users",
            items: [{ label: "John Doe" }, { label: "Jane Smith" }, { label: "Bob Wilson" }],
          },
          {
            heading: "Projects",
            items: [{ label: "Web Redesign" }, { label: "Mobile App" }, { label: "API Migration" }],
          },
          {
            heading: "Documents",
            items: [{ label: "Q4 Report.pdf" }, { label: "Design Specs.fig" }],
          },
        ]}
      />
    </>
  );
}

export const Sample: Story = {
  tags: ["!autodocs"],
  render: () => (
    <StorybookPageLayout title="VCommand Samples" description="Copy-paste code examples.">
      <StorybookCodeBlock
        title="Basic command palette"
        code={`const [open, setOpen] = useState(false)

<VButton onClick={() => setOpen(true)}>
  Open Command Palette
</VButton>
<VCommand
  open={open}
  onOpenChange={setOpen}
  placeholder="Type a command or search..."
/>`}
        preview={<CommandSampleInline />}
      />
      <StorybookCodeBlock
        title="With groups"
        code={`<VCommand
  open={open}
  onOpenChange={setOpen}
  placeholder="Search..."
  groups={[
    {
      heading: 'Pages',
      items: [
        { label: 'Home' },
        { label: 'Settings' },
        { label: 'Profile' },
      ],
    },
    {
      heading: 'Actions',
      items: [
        { label: 'Create new...' },
        { label: 'Search' },
      ],
    },
  ]}
/>`}
        preview={<CommandSampleWithGroups />}
      />
      <StorybookCodeBlock
        title="Keyboard shortcut"
        code={`const [open, setOpen] = useState(false)

useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setOpen(true)
    }
  }
  document.addEventListener('keydown', handler)
  return () => document.removeEventListener('keydown', handler)
}, [])

<VButton onClick={() => setOpen(true)}>Search... ⌘K</VButton>
<VCommand
  open={open}
  onOpenChange={setOpen}
  placeholder="Type a command or search..."
  groups={[
    { heading: 'Actions', items: [{ label: 'New File' }, { label: 'Open Recent' }] },
  ]}
/>`}
        preview={<CommandSampleKeyboard />}
      />
      <StorybookCodeBlock
        title="Recent items"
        code={`<VCommand
  open={open}
  onOpenChange={setOpen}
  placeholder="Search recent items..."
  groups={[
    {
      heading: 'Recent',
      items: [
        { label: 'Dashboard' },
        { label: 'User Settings' },
        { label: 'API Documentation' },
      ],
    },
    {
      heading: 'Favorites',
      items: [
        { label: 'Team Members' },
        { label: 'Project Roadmap' },
      ],
    },
  ]}
/>`}
        preview={<CommandSampleRecent />}
      />
      <StorybookCodeBlock
        title="Filtered search"
        code={`<VCommand
  open={open}
  onOpenChange={setOpen}
  placeholder="Filter by category..."
  groups={[
    {
      heading: 'Users',
      items: [{ label: 'John Doe' }, { label: 'Jane Smith' }],
    },
    {
      heading: 'Projects',
      items: [{ label: 'Web Redesign' }, { label: 'Mobile App' }],
    },
    {
      heading: 'Documents',
      items: [{ label: 'Q4 Report.pdf' }, { label: 'Design Specs.fig' }],
    },
  ]}
/>`}
        preview={<CommandSampleFiltered />}
      />
    </StorybookPageLayout>
  ),
};
