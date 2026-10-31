import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VAvatar, VAvatarGroup } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VAvatar> = {
  title: "Components/Data Display/VAvatar",
  component: VAvatar,
  tags: ["autodocs"],
  args: {
    shape: "circle",
    size: "md",
    fallback: "KM",
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
      title="VAvatar"
      description="Displays user profile images or initials as an avatar."
    >
      <StorybookSection title="Sizes">
        <StorybookSubsection title="sm" labels={['VAvatar size="sm"']}>
          <VAvatar size="sm" fallback="SM" />
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['VAvatar size="md"']}>
          <VAvatar size="md" fallback="MD" />
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['VAvatar size="lg"']}>
          <VAvatar size="lg" fallback="LG" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Shapes">
        <StorybookSubsection title="circle" labels={['VAvatar shape="circle"']}>
          <VAvatar shape="circle" fallback="AB" />
          <VAvatar shape="circle" fallback="CD" size="lg" />
        </StorybookSubsection>
        <StorybookSubsection title="square" labels={['VAvatar shape="square"']}>
          <VAvatar shape="square" fallback="AB" />
          <VAvatar shape="square" fallback="CD" size="lg" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Content Types">
        <StorybookSubsection title="image" labels={['VAvatar src="..."']}>
          <VAvatar src="https://i.pravatar.cc/80?img=1" alt="User 1" />
          <VAvatar src="https://i.pravatar.cc/80?img=2" alt="User 2" size="lg" />
        </StorybookSubsection>
        <StorybookSubsection title="initials fallback" labels={['VAvatar fallback="JD"']}>
          <VAvatar fallback="JD" />
          <VAvatar fallback="KM" size="lg" />
        </StorybookSubsection>
        <StorybookSubsection title="icon fallback" labels={["VAvatar fallback={<Icon />}"]}>
          <VAvatar fallback={<span>&#128100;</span>} aria-label="Person" />
          <VAvatar fallback={<span>&#9733;</span>} size="lg" aria-label="Favorite" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Size + Shape Combinations">
        <StorybookSubsection title="all combinations" labels={["size x shape"]}>
          <VAvatar size="sm" shape="circle" fallback="SC" />
          <VAvatar size="md" shape="circle" fallback="MC" />
          <VAvatar size="lg" shape="circle" fallback="LC" />
          <VAvatar size="sm" shape="square" fallback="SS" />
          <VAvatar size="md" shape="square" fallback="MS" />
          <VAvatar size="lg" shape="square" fallback="LS" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Display user profile images, initials, or placeholder icons in lists, cards, or headers.",
          },
          {
            category: "When not to use",
            guideline:
              "For decorative images or logos unrelated to a user identity. Use VImage instead.",
          },
          {
            category: "Accessibility",
            guideline:
              "Always provide an alt prop when using src. Fallback initials are announced by screen readers.",
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
      title="VAvatar Samples"
      description="Copy-paste code examples for VAvatar."
    >
      <StorybookCodeBlock
        title="Basic image avatar"
        code={`<VAvatar src="/avatar.jpg" alt="User" />`}
        preview={<VAvatar src="https://i.pravatar.cc/80?img=3" alt="User" />}
      />
      <StorybookCodeBlock
        title="Initials fallback"
        code={`<VAvatar fallback="JD" size="lg" />`}
        preview={<VAvatar fallback="JD" size="lg" />}
      />
      <StorybookCodeBlock
        title="Square avatar"
        code={`<VAvatar fallback="AB" shape="square" />`}
        preview={<VAvatar fallback="AB" shape="square" />}
      />
      <StorybookCodeBlock
        title="Avatar group"
        code={`<div className="flex -space-x-2">
  <VAvatar src="/user1.jpg" alt="User 1" />
  <VAvatar src="/user2.jpg" alt="User 2" />
  <VAvatar fallback="+3" />
</div>`}
        preview={
          <div className="flex -space-x-2">
            <VAvatar src="https://i.pravatar.cc/80?img=4" alt="User 1" />
            <VAvatar src="https://i.pravatar.cc/80?img=5" alt="User 2" />
            <VAvatar src="https://i.pravatar.cc/80?img=6" alt="User 3" />
            <VAvatar fallback="+3" />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Sizes list"
        code={`<VAvatar size="sm" fallback="S" />
<VAvatar size="md" fallback="M" />
<VAvatar size="lg" fallback="L" />`}
        preview={
          <div className="flex items-center gap-3">
            <VAvatar size="sm" fallback="S" />
            <VAvatar size="md" fallback="M" />
            <VAvatar size="lg" fallback="L" />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Profile header"
        code={`<div className="flex items-center gap-3">
  <VAvatar src="/avatar.jpg" alt="Jane Doe" size="lg" />
  <div>
    <p style={{ fontWeight: 600, margin: 0 }}>Jane Doe</p>
    <p style={{ fontSize: '0.875rem', color: 'var(--v-muted-foreground)', margin: 0 }}>
      Product Designer
    </p>
  </div>
</div>`}
        preview={
          <div className="flex items-center gap-3">
            <VAvatar src="https://i.pravatar.cc/80?img=10" alt="Jane Doe" size="lg" />
            <div>
              <p style={{ fontWeight: 600, margin: 0, color: "var(--v-foreground)" }}>Jane Doe</p>
              <p style={{ fontSize: "0.875rem", color: "var(--v-muted-foreground)", margin: 0 }}>
                Product Designer
              </p>
            </div>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Avatar stack"
        code={`<VAvatarGroup max={3}>
  <VAvatar fallback="A" size="sm" />
  <VAvatar fallback="B" size="sm" />
  <VAvatar fallback="C" size="sm" />
  <VAvatar fallback="D" size="sm" />
  <VAvatar fallback="E" size="sm" />
</VAvatarGroup>`}
        preview={
          <VAvatarGroup max={3}>
            <VAvatar fallback="A" size="sm" />
            <VAvatar fallback="B" size="sm" />
            <VAvatar fallback="C" size="sm" />
            <VAvatar fallback="D" size="sm" />
            <VAvatar fallback="E" size="sm" />
          </VAvatarGroup>
        }
      />
    </StorybookPageLayout>
  ),
};
