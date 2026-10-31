import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VChip, VChipGroup } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VChip> = {
  title: "Components/Data Display/VChip",
  component: VChip,
  tags: ["autodocs"],
  args: {
    variant: "filled",
    size: "md",
    label: "Chip",
    disabled: false,
    selected: false,
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
      title="VChip"
      description="Compact element for displaying tags, categories, or selections."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="filled" labels={['VChip variant="filled"']}>
          <VChip label="Chip" variant="filled" />
        </StorybookSubsection>
        <StorybookSubsection title="outlined" labels={['VChip variant="outlined"']}>
          <VChip label="Chip" variant="outlined" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Sizes">
        <StorybookSubsection title="xs" labels={['VChip size="xs"']}>
          <VChip label="Extra Small" size="xs" />
        </StorybookSubsection>
        <StorybookSubsection title="sm" labels={['VChip size="sm"']}>
          <VChip label="Small" size="sm" />
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['VChip size="md"']}>
          <VChip label="Medium" size="md" />
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['VChip size="lg"']}>
          <VChip label="Large" size="lg" />
        </StorybookSubsection>
        <StorybookSubsection title="xl" labels={['VChip size="xl"']}>
          <VChip label="Extra Large" size="xl" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Deletable">
        <StorybookSubsection title="with delete button" labels={["VChip onDelete={...}"]}>
          <VChip label="Removable" onDelete={() => {}} />
          <VChip label="Removable" onDelete={() => {}} />
          <VChip label="Removable" onDelete={() => {}} variant="outlined" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Start Icon">
        <StorybookSubsection title="with icon" labels={["VChip leading={...}"]}>
          <VChip label="React" leading={<span>&#9881;</span>} />
          <VChip label="Starred" leading={<span>&#9733;</span>} />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="default" labels={["VChip disabled={false}"]}>
          <VChip label="Enabled" />
        </StorybookSubsection>
        <StorybookSubsection title="disabled" labels={["VChip disabled"]}>
          <VChip label="Disabled" disabled />
          <VChip label="Disabled" disabled variant="outlined" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Display tags, filter selections, or categorization labels in a compact form.",
          },
          {
            category: "When not to use",
            guideline:
              "For count indicators or status dots attached to elements. Use VBadge instead.",
          },
          {
            category: "Deletable",
            guideline:
              "Provide onDelete to render a delete button, allowing users to remove the chip.",
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
    <StorybookPageLayout title="VChip Samples" description="Copy-paste code examples for VChip.">
      <StorybookCodeBlock
        title="Basic tag"
        code={`<VChip label="React" />`}
        preview={<VChip label="React" />}
      />
      <StorybookCodeBlock
        title="Deletable tag"
        code={`<VChip label="TypeScript" onDelete={() => removeTag('ts')} />`}
        preview={<VChip label="TypeScript" onDelete={() => {}} />}
      />
      <StorybookCodeBlock
        title="Tag with icon"
        code={`<VChip label="Starred" leading={<StarIcon />} />`}
        preview={<VChip label="Starred" leading={<span>&#9733;</span>} />}
      />
      <StorybookCodeBlock
        title="Tag group"
        code={`<div className="flex flex-wrap gap-2">
  <VChip label="React" />
  <VChip label="Vue" />
  <VChip label="Angular" />
  <VChip label="Svelte" />
</div>`}
        preview={
          <div className="flex flex-wrap gap-2">
            <VChip label="React" />
            <VChip label="Vue" />
            <VChip label="Angular" />
            <VChip label="Svelte" />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Outlined status chips"
        code={`<VChip label="Active" variant="outlined" />
<VChip label="Inactive" variant="outlined" />`}
        preview={
          <div className="flex gap-2">
            <VChip label="Active" variant="outlined" />
            <VChip label="Inactive" variant="outlined" />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Filter chips"
        code={`<VChipGroup
  aria-label="Product categories"
  items={[
    { value: 'all', label: 'All' },
    { value: 'shirts', label: 'Shirts' },
    { value: 'pants', label: 'Pants' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' },
  ]}
  value={['all']}
  onValueChange={(value) => setFilters(value)}
/>`}
        preview={
          <VChipGroup
            aria-label="Product categories"
            items={[
              { value: "all", label: "All" },
              { value: "shirts", label: "Shirts" },
              { value: "pants", label: "Pants" },
              { value: "shoes", label: "Shoes" },
              { value: "accessories", label: "Accessories" },
            ]}
          />
        }
      />
    </StorybookPageLayout>
  ),
};
