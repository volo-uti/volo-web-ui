import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VAvatarGroup, VAvatar, VBadge } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VAvatarGroup> = {
  title: "Components/Data Display/VAvatar/VAvatarGroup",
  component: VAvatarGroup,
  tags: ["autodocs"],
  args: {
    size: "md",
    max: 3,
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
      title="VAvatarGroup"
      description="Displays multiple avatars overlapping with a surplus indicator when exceeding the max count."
    >
      <StorybookSection title="Max Count">
        <StorybookSubsection title="max=3" labels={["VAvatarGroup max={3}"]}>
          <VAvatarGroup max={3}>
            <VAvatar fallback="A" />
            <VAvatar fallback="B" />
            <VAvatar fallback="C" />
            <VAvatar fallback="D" />
            <VAvatar fallback="E" />
          </VAvatarGroup>
        </StorybookSubsection>
        <StorybookSubsection title="max=5" labels={["VAvatarGroup max={5}"]}>
          <VAvatarGroup max={5}>
            <VAvatar fallback="A" />
            <VAvatar fallback="B" />
            <VAvatar fallback="C" />
            <VAvatar fallback="D" />
            <VAvatar fallback="E" />
          </VAvatarGroup>
        </StorybookSubsection>
        <StorybookSubsection title="no max" labels={["VAvatarGroup (no max)"]}>
          <VAvatarGroup>
            <VAvatar fallback="A" />
            <VAvatar fallback="B" />
            <VAvatar fallback="C" />
          </VAvatarGroup>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Sizes">
        <StorybookSubsection title="sm" labels={['size="sm"']}>
          <VAvatarGroup max={3} size="sm">
            <VAvatar fallback="A" />
            <VAvatar fallback="B" />
            <VAvatar fallback="C" />
            <VAvatar fallback="D" />
          </VAvatarGroup>
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['size="md"']}>
          <VAvatarGroup max={3} size="md">
            <VAvatar fallback="A" />
            <VAvatar fallback="B" />
            <VAvatar fallback="C" />
            <VAvatar fallback="D" />
          </VAvatarGroup>
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['size="lg"']}>
          <VAvatarGroup max={3} size="lg">
            <VAvatar fallback="A" />
            <VAvatar fallback="B" />
            <VAvatar fallback="C" />
            <VAvatar fallback="D" />
          </VAvatarGroup>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Display a group of users or participants (e.g., collaborators, attendees).",
          },
          {
            category: "Max count",
            guideline: 'Set max to limit visible avatars. Surplus is shown as "+N".',
          },
          {
            category: "Accessibility",
            guideline: 'The group has role="group" with an aria-label indicating total count.',
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
      title="VAvatarGroup Samples"
      description="Copy-paste code examples for VAvatarGroup."
    >
      <StorybookCodeBlock
        title="Basic avatar group"
        code={`<VAvatarGroup max={3}>
  <VAvatar fallback="A" />
  <VAvatar fallback="B" />
  <VAvatar fallback="C" />
  <VAvatar fallback="D" />
</VAvatarGroup>`}
        preview={
          <VAvatarGroup max={3}>
            <VAvatar fallback="A" />
            <VAvatar fallback="B" />
            <VAvatar fallback="C" />
            <VAvatar fallback="D" />
          </VAvatarGroup>
        }
      />
      <StorybookCodeBlock
        title="Large size"
        code={`<VAvatarGroup max={3} size="lg">
  <VAvatar fallback="A" />
  <VAvatar fallback="B" />
  <VAvatar fallback="C" />
  <VAvatar fallback="D" />
</VAvatarGroup>`}
        preview={
          <VAvatarGroup max={3} size="lg">
            <VAvatar fallback="A" />
            <VAvatar fallback="B" />
            <VAvatar fallback="C" />
            <VAvatar fallback="D" />
          </VAvatarGroup>
        }
      />
      <StorybookCodeBlock
        title="With images"
        code={`<VAvatarGroup max={3}>
  <VAvatar src="/user1.jpg" alt="User 1" />
  <VAvatar src="/user2.jpg" alt="User 2" />
  <VAvatar src="/user3.jpg" alt="User 3" />
  <VAvatar fallback="+2" />
</VAvatarGroup>`}
        preview={
          <VAvatarGroup max={3}>
            <VAvatar src="https://i.pravatar.cc/80?img=1" alt="User 1" />
            <VAvatar src="https://i.pravatar.cc/80?img=2" alt="User 2" />
            <VAvatar src="https://i.pravatar.cc/80?img=3" alt="User 3" />
            <VAvatar src="https://i.pravatar.cc/80?img=4" alt="User 4" />
            <VAvatar src="https://i.pravatar.cc/80?img=5" alt="User 5" />
          </VAvatarGroup>
        }
      />
      <StorybookCodeBlock
        title="No max (show all)"
        code={`<VAvatarGroup>
  <VAvatar fallback="A" />
  <VAvatar fallback="B" />
  <VAvatar fallback="C" />
</VAvatarGroup>`}
        preview={
          <VAvatarGroup>
            <VAvatar fallback="A" />
            <VAvatar fallback="B" />
            <VAvatar fallback="C" />
          </VAvatarGroup>
        }
      />
      <StorybookCodeBlock
        title="Project team members"
        code={`<div className="flex items-center gap-3">
  <VAvatarGroup max={4}>
    <VAvatar src="/user1.jpg" alt="Alice" />
    <VAvatar src="/user2.jpg" alt="Bob" />
    <VAvatar src="/user3.jpg" alt="Carol" />
    <VAvatar src="/user4.jpg" alt="Dan" />
    <VAvatar src="/user5.jpg" alt="Eve" />
    <VAvatar src="/user6.jpg" alt="Frank" />
    <VAvatar src="/user7.jpg" alt="Grace" />
  </VAvatarGroup>
  <span style={{ fontSize: '0.875rem', color: 'var(--v-muted-foreground)' }}>
    7 members
  </span>
</div>`}
        preview={
          <div className="flex items-center gap-3">
            <VAvatarGroup max={4}>
              <VAvatar src="https://i.pravatar.cc/80?img=11" alt="Alice" />
              <VAvatar src="https://i.pravatar.cc/80?img=12" alt="Bob" />
              <VAvatar src="https://i.pravatar.cc/80?img=13" alt="Carol" />
              <VAvatar src="https://i.pravatar.cc/80?img=14" alt="Dan" />
              <VAvatar src="https://i.pravatar.cc/80?img=15" alt="Eve" />
              <VAvatar src="https://i.pravatar.cc/80?img=16" alt="Frank" />
              <VAvatar src="https://i.pravatar.cc/80?img=17" alt="Grace" />
            </VAvatarGroup>
            <span style={{ fontSize: "0.875rem", color: "var(--v-muted-foreground)" }}>
              7 members
            </span>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Online users"
        code={`<div className="flex items-center gap-3">
  {['Alice', 'Bob', 'Carol'].map((name) => (
    <VBadge key={name} variant="success">
      <VAvatar fallback={name[0]} />
    </VBadge>
  ))}
</div>`}
        preview={
          <div className="flex items-center gap-3">
            <VBadge variant="success">
              <VAvatar src="https://i.pravatar.cc/80?img=20" alt="Alice" />
            </VBadge>
            <VBadge variant="success">
              <VAvatar src="https://i.pravatar.cc/80?img=21" alt="Bob" />
            </VBadge>
            <VBadge variant="success">
              <VAvatar src="https://i.pravatar.cc/80?img=22" alt="Carol" />
            </VBadge>
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
