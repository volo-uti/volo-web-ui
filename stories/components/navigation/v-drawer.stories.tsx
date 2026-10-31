import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  VDrawer,
  VDrawerTrigger,
  VDrawerContent,
  VDrawerHeader,
  VDrawerFooter,
  VDrawerClose,
  VButton,
  VCheckbox,
  VSlider,
  VLabel,
  VLink,
  VTextField,
} from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VDrawer> = {
  title: "Components/Navigation/VDrawer",
  component: VDrawer,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    side: "right",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// ─── Primary (hidden from sidebar, powers Docs controls) ───
export const Default: Story = {
  tags: ["!dev"],
  render: (args) => (
    <VDrawer {...args}>
      <VDrawerTrigger>Open drawer</VDrawerTrigger>
      <VDrawerContent aria-label="Example drawer">
        <VDrawerHeader>Drawer</VDrawerHeader>
        <VDrawerFooter>
          <VDrawerClose>Close</VDrawerClose>
        </VDrawerFooter>
      </VDrawerContent>
    </VDrawer>
  ),
};

// ─── Showcase ───
export const Showcase: Story = {
  tags: ["!autodocs"],
  render: () => (
    <StorybookPageLayout
      title="VDrawer"
      description="Slide-in panel from the edge of the screen for secondary content or navigation."
    >
      <StorybookSection title="Side">
        <StorybookSubsection
          title="directional drawers"
          labels={[
            'VDrawer(side="left")',
            'VDrawer(side="right")',
            'VDrawer(side="top")',
            'VDrawer(side="bottom")',
          ]}
        >
          {(["left", "right", "top", "bottom"] as const).map((s) => (
            <VDrawer key={s} side={s}>
              <VDrawerTrigger className="px-4 py-2 rounded border border-[var(--v-border)] text-sm cursor-pointer">
                {s}
              </VDrawerTrigger>
              <VDrawerContent>
                <VDrawerHeader>side=&quot;{s}&quot;</VDrawerHeader>
                <div className="flex-1 p-6">
                  <p className="text-sm text-[var(--v-muted-foreground)]">
                    Slides in from the {s} side.
                  </p>
                </div>
                <VDrawerFooter>
                  <VDrawerClose>Close</VDrawerClose>
                </VDrawerFooter>
              </VDrawerContent>
            </VDrawer>
          ))}
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Compound Components">
        <StorybookSubsection
          title="full structure"
          labels={["VDrawerHeader()", "VDrawerFooter()", "VDrawerClose()"]}
        >
          <VDrawer side="right">
            <VDrawerTrigger className="px-4 py-2 rounded border border-[var(--v-border)] text-sm cursor-pointer">
              Full Structure Drawer
            </VDrawerTrigger>
            <VDrawerContent>
              <VDrawerHeader>Drawer Title</VDrawerHeader>
              <div className="flex-1 p-6">
                <p className="text-sm text-[var(--v-muted-foreground)]">
                  Includes Header, Content area, and Footer with actions.
                </p>
              </div>
              <VDrawerFooter>
                <VDrawerClose>Cancel</VDrawerClose>
                <VButton size="md">Save</VButton>
              </VDrawerFooter>
            </VDrawerContent>
          </VDrawer>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Side panels for forms, navigation menus, detail views",
          },
          { category: "Side", guideline: "Right for detail panels, left for navigation menus" },
          { category: "Header", guideline: "Use VDrawerHeader for a clear title in the drawer" },
          { category: "Footer", guideline: "Use VDrawerFooter for action buttons (save, cancel)" },
          { category: "Accessibility", guideline: "Focus is trapped inside the drawer when open" },
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
      title="VDrawer Samples"
      description="Copy-paste code examples for common drawer patterns."
    >
      <StorybookCodeBlock
        title="Basic drawer"
        code={`<VDrawer side="right">
  <VDrawerTrigger>Open</VDrawerTrigger>
  <VDrawerContent>
    <VDrawerHeader>Title</VDrawerHeader>
    <div className="flex-1 p-6">Content</div>
    <VDrawerFooter>
      <VDrawerClose>Close</VDrawerClose>
    </VDrawerFooter>
  </VDrawerContent>
</VDrawer>`}
        preview={
          <VDrawer side="right">
            <VDrawerTrigger className="px-4 py-2 rounded border border-[var(--v-border)] text-sm cursor-pointer">
              Open
            </VDrawerTrigger>
            <VDrawerContent>
              <VDrawerHeader>Title</VDrawerHeader>
              <div className="flex-1 p-6">
                <p className="text-sm">Content</p>
              </div>
              <VDrawerFooter>
                <VDrawerClose>Close</VDrawerClose>
              </VDrawerFooter>
            </VDrawerContent>
          </VDrawer>
        }
      />
      <StorybookCodeBlock
        title="Left navigation drawer"
        code={`<VDrawer side="left">
  <VDrawerTrigger>Menu</VDrawerTrigger>
  <VDrawerContent>
    <VDrawerHeader>Navigation</VDrawerHeader>
    <nav className="flex-1 p-4">
      <ul className="space-y-1">
        <li><VLink href="#">Dashboard</VLink></li>
        <li><VLink href="#">Projects</VLink></li>
        <li><VLink href="#">Settings</VLink></li>
      </ul>
    </nav>
    <VDrawerFooter>
      <VDrawerClose>Close</VDrawerClose>
    </VDrawerFooter>
  </VDrawerContent>
</VDrawer>`}
        preview={
          <VDrawer side="left">
            <VDrawerTrigger className="px-4 py-2 rounded border border-[var(--v-border)] text-sm cursor-pointer">
              Menu
            </VDrawerTrigger>
            <VDrawerContent>
              <VDrawerHeader>Navigation</VDrawerHeader>
              <nav className="flex-1 p-4">
                <ul className="space-y-1">
                  {["Dashboard", "Projects", "Team", "Settings"].map((item) => (
                    <li key={item}>
                      <VLink
                        href="#"
                        className="block px-3 py-2 text-sm rounded hover:bg-[var(--v-muted)] transition-colors"
                      >
                        {item}
                      </VLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <VDrawerFooter>
                <VDrawerClose>Close</VDrawerClose>
              </VDrawerFooter>
            </VDrawerContent>
          </VDrawer>
        }
      />
      <StorybookCodeBlock
        title="Form drawer"
        code={`<VDrawer side="right">
  <VDrawerTrigger>Edit Profile</VDrawerTrigger>
  <VDrawerContent>
    <VDrawerHeader>Edit Profile</VDrawerHeader>
    <div className="flex-1 p-6 space-y-4">
      <VTextField placeholder="Name" fullWidth />
      <VTextField placeholder="Email" fullWidth />
    </div>
    <VDrawerFooter>
      <VDrawerClose>Cancel</VDrawerClose>
      <VButton>Save</VButton>
    </VDrawerFooter>
  </VDrawerContent>
</VDrawer>`}
        preview={
          <VDrawer side="right">
            <VDrawerTrigger className="px-4 py-2 rounded border border-[var(--v-border)] text-sm cursor-pointer">
              Edit Profile
            </VDrawerTrigger>
            <VDrawerContent>
              <VDrawerHeader>Edit Profile</VDrawerHeader>
              <div className="flex-1 p-6 space-y-4">
                <div className="space-y-1">
                  <VLabel className="text-sm text-[var(--v-muted-foreground)]">Name</VLabel>
                  <VTextField placeholder="Enter your name" fullWidth />
                </div>
                <div className="space-y-1">
                  <VLabel className="text-sm text-[var(--v-muted-foreground)]">Email</VLabel>
                  <VTextField placeholder="Enter your email" fullWidth />
                </div>
              </div>
              <VDrawerFooter>
                <VDrawerClose>Cancel</VDrawerClose>
                <VButton size="md">Save</VButton>
              </VDrawerFooter>
            </VDrawerContent>
          </VDrawer>
        }
      />
      <StorybookCodeBlock
        title="Mobile sidebar"
        code={`<VDrawer side="left">
  <VDrawerTrigger>
    <VButton style={{ fontSize: '20px' }}>☰</VButton>
  </VDrawerTrigger>
  <VDrawerContent>
    <VDrawerHeader>Menu</VDrawerHeader>
    <nav className="flex-1 p-4">
      <ul className="space-y-1">
        {['Home', 'Explore', 'Notifications', 'Messages', 'Profile'].map(item => (
          <li key={item}>
            <VLink href="#" onClick={() => navigate(item)}>{item}</VLink>
          </li>
        ))}
      </ul>
    </nav>
    <VDrawerFooter>
      <VDrawerClose>Close</VDrawerClose>
    </VDrawerFooter>
  </VDrawerContent>
</VDrawer>`}
        preview={
          <VDrawer side="left">
            <VDrawerTrigger className="p-2 rounded border border-[var(--v-border)] cursor-pointer text-xl">
              ☰
            </VDrawerTrigger>
            <VDrawerContent>
              <VDrawerHeader>Menu</VDrawerHeader>
              <nav className="flex-1 p-4">
                <ul className="space-y-1">
                  {["Home", "Explore", "Notifications", "Messages", "Profile"].map((item) => (
                    <li key={item}>
                      <VLink
                        href="#"
                        className="block px-3 py-2 text-sm rounded hover:bg-[var(--v-muted)] transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        {item}
                      </VLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <VDrawerFooter>
                <VDrawerClose>Close</VDrawerClose>
              </VDrawerFooter>
            </VDrawerContent>
          </VDrawer>
        }
      />
      <StorybookCodeBlock
        title="Filter drawer"
        code={`<VDrawer side="right">
  <VDrawerTrigger>Filters</VDrawerTrigger>
  <VDrawerContent>
    <VDrawerHeader>Filter Options</VDrawerHeader>
    <div className="flex-1 p-6 space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Category</h4>
        <VCheckbox label="Electronics" />
        <VCheckbox label="Clothing" />
        <VCheckbox label="Books" />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Price Range</h4>
        <VSlider min={0} max={500} defaultValue={50} />
      </div>
    </div>
    <VDrawerFooter>
      <VDrawerClose>Cancel</VDrawerClose>
      <VButton>Apply Filters</VButton>
    </VDrawerFooter>
  </VDrawerContent>
</VDrawer>`}
        preview={
          <VDrawer side="right">
            <VDrawerTrigger className="px-4 py-2 rounded border border-[var(--v-border)] text-sm cursor-pointer">
              Filters
            </VDrawerTrigger>
            <VDrawerContent>
              <VDrawerHeader>Filter Options</VDrawerHeader>
              <div className="flex-1 p-6 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Category</h4>
                  <VCheckbox label="Electronics" />
                  <VCheckbox label="Clothing" />
                  <VCheckbox label="Books" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Price Range</h4>
                  <VSlider min={0} max={500} defaultValue={50} />
                </div>
              </div>
              <VDrawerFooter>
                <VDrawerClose>Cancel</VDrawerClose>
                <VButton size="md">Apply Filters</VButton>
              </VDrawerFooter>
            </VDrawerContent>
          </VDrawer>
        }
      />
    </StorybookPageLayout>
  ),
};
