import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VCard, VAvatar, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VCard> = {
  title: "Components/Surfaces/VCard",
  component: VCard,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    variant: "elevated",
    children: "Card content",
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
      title="VCard"
      description="A container component for grouping related content with visual hierarchy."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="elevated" labels={['VCard(variant="elevated")']}>
          <VCard variant="elevated" className="w-64">
            <h3 className="text-lg font-semibold mb-2">Elevated</h3>
            <p className="text-sm text-[var(--v-muted-foreground)]">
              Card with shadow for visual depth.
            </p>
          </VCard>
        </StorybookSubsection>
        <StorybookSubsection title="outlined" labels={['VCard(variant="outlined")']}>
          <VCard variant="outlined" className="w-64">
            <h3 className="text-lg font-semibold mb-2">Outlined</h3>
            <p className="text-sm text-[var(--v-muted-foreground)]">
              Card with border for subtle grouping.
            </p>
          </VCard>
        </StorybookSubsection>
        <StorybookSubsection title="filled" labels={['VCard(variant="filled")']}>
          <VCard variant="filled" className="w-64">
            <h3 className="text-lg font-semibold mb-2">Filled</h3>
            <p className="text-sm text-[var(--v-muted-foreground)]">Card with background fill.</p>
          </VCard>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="All Variants Comparison">
        <StorybookSubsection title="side by side" labels={["elevated", "outlined", "filled"]}>
          {(["elevated", "outlined", "filled"] as const).map((v) => (
            <VCard key={v} variant={v} className="w-56">
              <h3 className="text-base font-semibold mb-1 capitalize">{v}</h3>
              <p className="text-sm text-[var(--v-muted-foreground)]">variant=&quot;{v}&quot;</p>
            </VCard>
          ))}
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Group related content into a single visual container",
          },
          {
            category: "Elevated",
            guideline: "Use for primary content areas that need visual prominence",
          },
          {
            category: "Outlined",
            guideline: "Use for secondary content grouping with subtle borders",
          },
          {
            category: "Filled",
            guideline: "Use for background-level grouping that blends into the page",
          },
          {
            category: "Polymorphic",
            guideline: 'Use as="section" or as="article" for semantic HTML',
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
      title="VCard Samples"
      description="Copy-paste code examples for common card patterns."
    >
      <StorybookCodeBlock
        title="Basic card"
        code={`<VCard variant="elevated">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</VCard>`}
        preview={
          <VCard variant="elevated">
            <h3 className="text-lg font-semibold mb-2">Card Title</h3>
            <p className="text-sm text-[var(--v-muted-foreground)]">Card content goes here.</p>
          </VCard>
        }
      />
      <StorybookCodeBlock
        title="Outlined card with actions"
        code={`<VCard variant="outlined">
  <h3>Outlined Card</h3>
  <p>Description text</p>
  <div className="flex gap-2 mt-4">
    <button>Action 1</button>
    <button>Action 2</button>
  </div>
</VCard>`}
        preview={
          <VCard variant="outlined">
            <h3 className="text-lg font-semibold mb-2">Outlined Card</h3>
            <p className="text-sm text-[var(--v-muted-foreground)] mb-4">Description text</p>
            <div className="flex gap-2">
              <VButton variant="text" size="sm">
                Action 1
              </VButton>
              <VButton variant="text" size="sm">
                Action 2
              </VButton>
            </div>
          </VCard>
        }
      />
      <StorybookCodeBlock
        title="Card grid"
        code={`<div className="grid grid-cols-3 gap-4">
  <VCard variant="elevated">Item 1</VCard>
  <VCard variant="elevated">Item 2</VCard>
  <VCard variant="elevated">Item 3</VCard>
</div>`}
        preview={
          <div className="grid grid-cols-3 gap-4">
            <VCard variant="elevated">
              <h3 className="font-semibold">Item 1</h3>
              <p className="text-sm text-[var(--v-muted-foreground)]">Description</p>
            </VCard>
            <VCard variant="elevated">
              <h3 className="font-semibold">Item 2</h3>
              <p className="text-sm text-[var(--v-muted-foreground)]">Description</p>
            </VCard>
            <VCard variant="elevated">
              <h3 className="font-semibold">Item 3</h3>
              <p className="text-sm text-[var(--v-muted-foreground)]">Description</p>
            </VCard>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Card with actions"
        code={`<VCard variant="elevated">
  <h3>Card Title</h3>
  <p>Card description text.</p>
  <div className="flex gap-2 mt-4">
    <button>Cancel</button>
    <button>Confirm</button>
  </div>
</VCard>`}
        preview={
          <VCard variant="elevated">
            <h3 className="text-lg font-semibold mb-2">Card Title</h3>
            <p className="text-sm text-[var(--v-muted-foreground)] mb-4">Card description text.</p>
            <div className="flex gap-2">
              <VButton variant="text" size="sm">
                Cancel
              </VButton>
              <VButton variant="text" size="sm">
                Confirm
              </VButton>
            </div>
          </VCard>
        }
      />
      <StorybookCodeBlock
        title="Product card"
        code={`<VCard variant="outlined" className="w-64 overflow-hidden">
  <div className="w-full h-40 bg-muted" />
  <div className="p-4">
    <h3 className="font-semibold">Wireless Headphones</h3>
    <p className="text-sm text-muted-foreground mt-1">$129.99</p>
    <button className="w-full mt-3 py-2 rounded bg-primary text-primary-foreground text-sm">
      Add to Cart
    </button>
  </div>
</VCard>`}
        preview={
          <VCard variant="outlined" className="w-64 overflow-hidden">
            <div
              className="w-full flex items-center justify-center text-sm"
              style={{
                height: 160,
                backgroundColor: "var(--v-muted)",
                color: "var(--v-muted-foreground)",
              }}
            >
              Product Image
            </div>
            <div className="p-4">
              <h3 className="font-semibold">Wireless Headphones</h3>
              <p className="text-sm text-[var(--v-muted-foreground)] mt-1">$129.99</p>
              <VButton>Add to Cart</VButton>
            </div>
          </VCard>
        }
      />
      <StorybookCodeBlock
        title="Profile card"
        code={`<VCard variant="elevated" className="p-6 flex flex-col items-center text-center w-64">
  <VAvatar size="lg" fallback="JD" aria-label="Jane Doe" />
  <h3 className="mt-3 font-semibold">Jane Doe</h3>
  <p className="text-sm text-muted-foreground mt-1">
    Product Designer at Acme Inc.
  </p>
</VCard>`}
        preview={
          <VCard variant="elevated" className="p-6 flex flex-col items-center text-center w-64">
            <VAvatar size="lg" />
            <h3 className="mt-3 font-semibold">Jane Doe</h3>
            <p className="text-sm text-[var(--v-muted-foreground)] mt-1">
              Product Designer at Acme Inc.
            </p>
          </VCard>
        }
      />
    </StorybookPageLayout>
  ),
};
