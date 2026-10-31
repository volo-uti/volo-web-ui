import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VBadge, VAvatar, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const MailIcon = () => (
  <div
    className="w-10 h-10 flex items-center justify-center rounded"
    style={{ backgroundColor: "var(--v-muted)", color: "var(--v-muted-foreground)" }}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7L12 13L2 7" />
    </svg>
  </div>
);

const meta: Meta<typeof VBadge> = {
  title: "Components/Data Display/VBadge",
  component: VBadge,
  tags: ["autodocs"],
  args: {
    variant: "primary",
    size: "md",
    content: "5",
    invisible: false,
    max: 99,
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
      title="VBadge"
      description="Displays a small indicator attached to a child element, such as a count or status dot."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="standard" labels={["VBadge"]}>
          <VBadge content={5}>
            <MailIcon />
          </VBadge>
          <VBadge content="NEW">
            <MailIcon />
          </VBadge>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Colors">
        <StorybookSubsection title="primary" labels={['VBadge variant="primary"']}>
          <VBadge content={3} variant="primary">
            <MailIcon />
          </VBadge>
        </StorybookSubsection>
        <StorybookSubsection title="secondary" labels={['VBadge variant="secondary"']}>
          <VBadge content={3} variant="secondary">
            <MailIcon />
          </VBadge>
        </StorybookSubsection>
        <StorybookSubsection title="destructive" labels={['VBadge variant="destructive"']}>
          <VBadge content={3} variant="destructive">
            <MailIcon />
          </VBadge>
        </StorybookSubsection>
        <StorybookSubsection title="success" labels={['VBadge variant="success"']}>
          <VBadge content={3} variant="success">
            <MailIcon />
          </VBadge>
        </StorybookSubsection>
        <StorybookSubsection title="warning" labels={['VBadge variant="warning"']}>
          <VBadge content={3} variant="warning">
            <MailIcon />
          </VBadge>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Max Value">
        <StorybookSubsection title="within max" labels={["VBadge max={99}"]}>
          <VBadge content={50} max={99}>
            <MailIcon />
          </VBadge>
        </StorybookSubsection>
        <StorybookSubsection title="exceeds max" labels={["VBadge content={100} max={99}"]}>
          <VBadge content={100} max={99}>
            <MailIcon />
          </VBadge>
          <VBadge content={15} max={9}>
            <MailIcon />
          </VBadge>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="visible" labels={["VBadge invisible={false}"]}>
          <VBadge content={5}>
            <MailIcon />
          </VBadge>
        </StorybookSubsection>
        <StorybookSubsection title="invisible" labels={["VBadge invisible"]}>
          <VBadge content={5} invisible>
            <MailIcon />
          </VBadge>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Show unread counts, notification indicators, or status dots on icons and avatars.",
          },
          {
            category: "When not to use",
            guideline: "For labeling or categorization. Use VChip instead.",
          },
          {
            category: "Max value",
            guideline:
              'Set the max prop to cap the displayed number and show "{max}+" for overflow.',
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
    <StorybookPageLayout title="VBadge Samples" description="Copy-paste code examples for VBadge.">
      <StorybookCodeBlock
        title="Notification badge"
        code={`<VBadge content={5} variant="destructive">
  <MailIcon />
</VBadge>`}
        preview={
          <VBadge content={5} variant="destructive">
            <MailIcon />
          </VBadge>
        }
      />
      <StorybookCodeBlock
        title="Online status indicator (dot)"
        code={`<VBadge variant="success">
  <VAvatar fallback="JD" />
</VBadge>`}
        preview={
          <VBadge variant="success">
            <VAvatar fallback="JD" />
          </VBadge>
        }
      />
      <StorybookCodeBlock
        title="Max overflow display"
        code={`<VBadge content={120} max={99} variant="destructive">
  <MailIcon />
</VBadge>`}
        preview={
          <VBadge content={120} max={99} variant="destructive">
            <MailIcon />
          </VBadge>
        }
      />
      <StorybookCodeBlock
        title="Text badge"
        code={`<VBadge content="NEW" variant="success">
  <MailIcon />
</VBadge>`}
        preview={
          <VBadge content="NEW" variant="success">
            <MailIcon />
          </VBadge>
        }
      />
      <StorybookCodeBlock
        title="Cart item count"
        code={`<VBadge content={3} variant="destructive">
  <VButton aria-label="Cart">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  </VButton>
</VBadge>`}
        preview={
          <VBadge content={3} variant="destructive">
            <VButton variant="outlined" size="sm" aria-label="Cart">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
            </VButton>
          </VBadge>
        }
      />
      <StorybookCodeBlock
        title="Tab with badge"
        code={`<div className="flex gap-6">
  <span>Home</span>
  <VBadge content={3} variant="destructive">
    <span>Messages</span>
  </VBadge>
  <span>Settings</span>
</div>`}
        preview={
          <div
            className="flex gap-6 items-center"
            style={{ color: "var(--v-foreground)", fontSize: "0.875rem", fontWeight: 500 }}
          >
            <span style={{ padding: "4px 0", borderBottom: "2px solid transparent" }}>Home</span>
            <VBadge content={3} variant="destructive">
              <span style={{ padding: "4px 0", borderBottom: "2px solid var(--v-primary)" }}>
                Messages
              </span>
            </VBadge>
            <span style={{ padding: "4px 0", borderBottom: "2px solid transparent" }}>
              Settings
            </span>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Status indicators"
        code={`<div className="flex gap-3">
  <VBadge content="Active" variant="success"><span /></VBadge>
  <VBadge content="Pending" variant="warning"><span /></VBadge>
  <VBadge content="Offline" variant="destructive"><span /></VBadge>
</div>`}
        preview={
          <div className="flex gap-3">
            <VBadge content="Active" variant="success">
              <span />
            </VBadge>
            <VBadge content="Pending" variant="warning">
              <span />
            </VBadge>
            <VBadge content="Offline" variant="destructive">
              <span />
            </VBadge>
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
