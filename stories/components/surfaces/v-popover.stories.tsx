import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  VPopover,
  VPopoverTrigger,
  VPopoverContent,
  VPopoverClose,
  VButton,
  VLabel,
  VTextField,
} from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VPopover> = {
  title: "Components/Surfaces/VPopover",
  component: VPopover,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    position: "bottom",
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
      title="VPopover"
      description="Floating content panel attached to a trigger element."
    >
      <StorybookSection title="Placement">
        <StorybookSubsection
          title="directional position"
          labels={[
            'VPopover(position="top")',
            'VPopover(position="bottom")',
            'VPopover(position="left")',
            'VPopover(position="right")',
          ]}
        >
          <div className="flex flex-wrap items-center justify-center gap-6 py-16">
            {(["top", "bottom", "left", "right"] as const).map((p) => (
              <VPopover key={p} position={p}>
                <VPopoverTrigger asChild>
                  <VButton variant="outlined" size="sm">
                    {p}
                  </VButton>
                </VPopoverTrigger>
                <VPopoverContent>
                  <p className="text-sm">position=&quot;{p}&quot;</p>
                </VPopoverContent>
              </VPopover>
            ))}
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Align">
        <StorybookSubsection
          title="content alignment"
          labels={[
            'VPopoverContent(align="start")',
            'VPopoverContent(align="center")',
            'VPopoverContent(align="end")',
          ]}
        >
          <div className="flex flex-wrap items-center gap-6 py-8">
            {(["start", "center", "end"] as const).map((a) => (
              <VPopover key={a} position="bottom">
                <VPopoverTrigger asChild>
                  <VButton variant="outlined" size="sm">
                    {a}
                  </VButton>
                </VPopoverTrigger>
                <VPopoverContent align={a}>
                  <p className="text-sm">align=&quot;{a}&quot;</p>
                </VPopoverContent>
              </VPopover>
            ))}
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Close Button">
        <StorybookSubsection title="with VPopoverClose" labels={["VPopoverClose()"]}>
          <div className="py-8">
            <VPopover position="bottom">
              <VPopoverTrigger asChild>
                <VButton variant="outlined">Open Popover</VButton>
              </VPopoverTrigger>
              <VPopoverContent>
                <h4 className="text-sm font-semibold mb-2">Notification</h4>
                <p className="text-sm text-[var(--v-muted-foreground)] mb-3">
                  You have a new update available.
                </p>
                <VPopoverClose asChild>
                  <VButton size="sm">Dismiss</VButton>
                </VPopoverClose>
              </VPopoverContent>
            </VPopover>
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Side Offset">
        <StorybookSubsection title="custom offset" labels={["VPopoverContent(sideOffset={16})"]}>
          <div className="py-8">
            <VPopover position="bottom">
              <VPopoverTrigger asChild>
                <VButton variant="outlined">Offset 16px</VButton>
              </VPopoverTrigger>
              <VPopoverContent sideOffset={16}>
                <p className="text-sm">16px gap between trigger and content.</p>
              </VPopoverContent>
            </VPopover>
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Contextual information, mini forms, or tooltips on click",
          },
          { category: "Placement", guideline: "Choose position based on available screen space" },
          {
            category: "Close button",
            guideline: "Include VPopoverClose for explicit dismiss action",
          },
          {
            category: "Side offset",
            guideline: "Adjust spacing between trigger and content as needed",
          },
          { category: "Accessibility", guideline: "Focus is trapped inside the popover when open" },
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
      title="VPopover Samples"
      description="Copy-paste code examples for common popover patterns."
    >
      <StorybookCodeBlock
        title="Basic popover"
        code={`<VPopover position="bottom">
  <VPopoverTrigger asChild>
    <VButton variant="outlined">Open</VButton>
  </VPopoverTrigger>
  <VPopoverContent>
    <p>Popover content</p>
  </VPopoverContent>
</VPopover>`}
        preview={
          <div className="py-8">
            <VPopover position="bottom">
              <VPopoverTrigger asChild>
                <VButton variant="outlined">Open</VButton>
              </VPopoverTrigger>
              <VPopoverContent>
                <p className="text-sm">Popover content</p>
              </VPopoverContent>
            </VPopover>
          </div>
        }
      />
      <StorybookCodeBlock
        title="With close button"
        code={`<VPopover position="bottom">
  <VPopoverTrigger asChild>
    <VButton variant="outlined">Notifications</VButton>
  </VPopoverTrigger>
  <VPopoverContent>
    <h4>Notification</h4>
    <p>You have new messages.</p>
    <VPopoverClose asChild>
      <VButton size="sm">Got it</VButton>
    </VPopoverClose>
  </VPopoverContent>
</VPopover>`}
        preview={
          <div className="py-8">
            <VPopover position="bottom">
              <VPopoverTrigger asChild>
                <VButton variant="outlined">Notifications</VButton>
              </VPopoverTrigger>
              <VPopoverContent>
                <h4 className="text-sm font-semibold mb-2">Notification</h4>
                <p className="text-sm text-[var(--v-muted-foreground)] mb-3">
                  You have new messages.
                </p>
                <VPopoverClose asChild>
                  <VButton size="sm">Got it</VButton>
                </VPopoverClose>
              </VPopoverContent>
            </VPopover>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Form popover"
        code={`<VPopover position="bottom">
  <VPopoverTrigger asChild>
    <VButton variant="outlined">Settings</VButton>
  </VPopoverTrigger>
  <VPopoverContent className="w-64">
    <h4>Settings</h4>
    <label>Name</label>
    <VTextField placeholder="Enter your name" fullWidth />
    <VPopoverClose asChild>
      <VButton size="sm">Save</VButton>
    </VPopoverClose>
  </VPopoverContent>
</VPopover>`}
        preview={
          <div className="py-8">
            <VPopover position="bottom">
              <VPopoverTrigger asChild>
                <VButton variant="outlined">Settings</VButton>
              </VPopoverTrigger>
              <VPopoverContent className="w-64">
                <h4 className="text-sm font-semibold mb-3">Settings</h4>
                <div className="space-y-2 mb-3">
                  <VLabel className="text-xs text-[var(--v-muted-foreground)]">Name</VLabel>
                  <VTextField placeholder="Enter your name" fullWidth />
                </div>
                <VPopoverClose asChild>
                  <VButton size="sm">Save</VButton>
                </VPopoverClose>
              </VPopoverContent>
            </VPopover>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Color picker trigger"
        code={`<VPopover position="bottom">
  <VPopoverTrigger aria-label="Pick a color">
    <div className="w-8 h-8 rounded-full border cursor-pointer" style={{ backgroundColor: '#3b82f6' }} />
  </VPopoverTrigger>
  <VPopoverContent className="w-48">
    <h4 className="text-sm font-semibold mb-2">Pick a color</h4>
    <div className="grid grid-cols-5 gap-2">
      {['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899','#6b7280','#000000','#ffffff'].map(c => (
        <div key={c} className="w-6 h-6 rounded-full cursor-pointer border" style={{ backgroundColor: c }} />
      ))}
    </div>
  </VPopoverContent>
</VPopover>`}
        preview={
          <div className="py-8">
            <VPopover position="bottom">
              <VPopoverTrigger aria-label="Pick a color">
                <div
                  className="w-8 h-8 rounded-full cursor-pointer"
                  style={{ backgroundColor: "#3b82f6", border: "2px solid var(--v-border)" }}
                />
              </VPopoverTrigger>
              <VPopoverContent className="w-48">
                <h4 className="text-sm font-semibold mb-2">Pick a color</h4>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    "#ef4444",
                    "#f97316",
                    "#eab308",
                    "#22c55e",
                    "#3b82f6",
                    "#8b5cf6",
                    "#ec4899",
                    "#6b7280",
                    "#000000",
                    "#ffffff",
                  ].map((c) => (
                    <div
                      key={c}
                      className="w-6 h-6 rounded-full cursor-pointer"
                      style={{ backgroundColor: c, border: "1px solid var(--v-border)" }}
                    />
                  ))}
                </div>
              </VPopoverContent>
            </VPopover>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Info popover"
        code={`<VPopover position="bottom">
  <VPopoverTrigger aria-label="What is this?">
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border text-xs cursor-pointer">i</span>
  </VPopoverTrigger>
  <VPopoverContent className="w-64">
    <h4 className="text-sm font-semibold mb-1">What is this?</h4>
    <p className="text-sm text-muted-foreground">
      This setting controls the visibility of your profile to other users on the platform.
    </p>
  </VPopoverContent>
</VPopover>`}
        preview={
          <div className="py-8 flex items-center gap-2">
            <span className="text-sm" style={{ color: "var(--v-foreground)" }}>
              Profile visibility
            </span>
            <VPopover position="bottom">
              <VPopoverTrigger aria-label="What is this?">
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs cursor-pointer"
                  style={{
                    border: "1px solid var(--v-border)",
                    color: "var(--v-muted-foreground)",
                  }}
                >
                  i
                </span>
              </VPopoverTrigger>
              <VPopoverContent className="w-64">
                <h4 className="text-sm font-semibold mb-1">What is this?</h4>
                <p className="text-sm" style={{ color: "var(--v-muted-foreground)" }}>
                  This setting controls the visibility of your profile to other users on the
                  platform.
                </p>
              </VPopoverContent>
            </VPopover>
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
