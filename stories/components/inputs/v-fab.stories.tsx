import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VFab } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const PlusIcon = () => <span style={{ fontSize: "20px" }}>+</span>;
const EditIcon = () => <span style={{ fontSize: "16px" }}>&#9998;</span>;

const meta: Meta<typeof VFab> = {
  title: "Components/Inputs/VFab",
  component: VFab,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    variant: "filled",
    size: "md",
    color: "primary",
    tooltip: "New item",
    icon: "+",
    // 'static' keeps the docs preview in the page; the real default is 'bottom-right'.
    position: "static",
    disabled: false,
  },
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
      title="VFab"
      description="A floating action button for primary screen actions."
    >
      <StorybookSection title="Sizes">
        <StorybookSubsection title="sm" labels={['size="sm"']}>
          <VFab icon={<PlusIcon />} tooltip="Add" size="sm" position="static" />
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['size="md"']}>
          <VFab icon={<PlusIcon />} tooltip="Add" size="md" position="static" />
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['size="lg"']}>
          <VFab icon={<PlusIcon />} tooltip="Add" size="lg" position="static" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Variants">
        <StorybookSubsection title="filled" labels={['variant="filled"']}>
          <VFab icon={<PlusIcon />} tooltip="Add" variant="filled" position="static" />
        </StorybookSubsection>
        <StorybookSubsection title="tonal" labels={['variant="tonal"']}>
          <VFab icon={<PlusIcon />} tooltip="Add" variant="tonal" position="static" />
        </StorybookSubsection>
        <StorybookSubsection title="outlined" labels={['variant="outlined"']}>
          <VFab icon={<PlusIcon />} tooltip="Add" variant="outlined" position="static" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Extended">
        <StorybookSubsection title="with label" labels={['label="Create"']}>
          <VFab icon={<PlusIcon />} label="Create" position="static" />
        </StorybookSubsection>
        <StorybookSubsection title="edit action" labels={['label="Edit"']}>
          <VFab icon={<EditIcon />} label="Edit" position="static" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="disabled" labels={["disabled"]}>
          <VFab icon={<PlusIcon />} tooltip="Add" disabled position="static" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "One primary action per screen: create, compose, add new item",
          },
          {
            category: "Placement",
            guideline: "Bottom-right is standard. Use position prop for fixed positioning",
          },
          {
            category: "Extended",
            guideline: "Add label for clarity when the icon alone is ambiguous",
          },
          {
            category: "Limit",
            guideline: "Only one FAB per screen. Use a menu if multiple actions are needed",
          },
          {
            category: "Scroll",
            guideline: "Consider hiding or shrinking on scroll (content visibility)",
          },
          {
            category: "Size",
            guideline: "Small is suitable for secondary screens, large for primary screens",
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
      title="VFab Samples"
      description='Copy-paste code examples for common floating action button patterns. Previews use position="static"; in an app the default is a fixed bottom-right corner.'
    >
      <StorybookCodeBlock
        title="Icon-only"
        code={`<VFab icon={<PlusIcon />} tooltip="New item" onClick={create} />`}
        preview={<VFab icon={<PlusIcon />} tooltip="New item" position="static" />}
      />
      <StorybookCodeBlock
        title="Extended with label"
        code={`<VFab icon={<PlusIcon />} label="New item" onClick={create} />`}
        preview={<VFab icon={<PlusIcon />} label="New item" position="static" />}
      />
      <StorybookCodeBlock
        title="Bottom-left, tonal"
        code={`<VFab variant="tonal" position="bottom-left" icon={<EditIcon />} tooltip="Edit" />`}
        preview={<VFab variant="tonal" icon={<EditIcon />} tooltip="Edit" position="static" />}
      />
      <StorybookCodeBlock
        title="Custom colours"
        code={`<VFab icon={<PlusIcon />} tooltip="Add" backgroundColor="#7c3aed" foregroundColor="white" />`}
        preview={
          <VFab
            icon={<PlusIcon />}
            tooltip="Add"
            backgroundColor="#7c3aed"
            foregroundColor="white"
            position="static"
          />
        }
      />
    </StorybookPageLayout>
  ),
};
