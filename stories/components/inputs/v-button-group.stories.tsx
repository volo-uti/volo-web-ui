import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VButtonGroup, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VButtonGroup> = {
  title: "Components/Inputs/VButtonGroup",
  component: VButtonGroup,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    variant: "outlined",
    size: "md",
    orientation: "horizontal",
    spacing: 0,
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
      title="VButtonGroup"
      description="Groups multiple buttons together as a single visual unit."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="filled" labels={['variant="filled"']}>
          <VButtonGroup variant="filled">
            <VButton>One</VButton>
            <VButton>Two</VButton>
            <VButton>Three</VButton>
          </VButtonGroup>
        </StorybookSubsection>
        <StorybookSubsection title="outlined" labels={['variant="outlined"']}>
          <VButtonGroup variant="outlined">
            <VButton>One</VButton>
            <VButton>Two</VButton>
            <VButton>Three</VButton>
          </VButtonGroup>
        </StorybookSubsection>
        <StorybookSubsection title="text" labels={['variant="text"']}>
          <VButtonGroup variant="text">
            <VButton>One</VButton>
            <VButton>Two</VButton>
            <VButton>Three</VButton>
          </VButtonGroup>
        </StorybookSubsection>
        <StorybookSubsection title="ghost" labels={['variant="ghost"']}>
          <VButtonGroup variant="ghost">
            <VButton>One</VButton>
            <VButton>Two</VButton>
            <VButton>Three</VButton>
          </VButtonGroup>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Sizes">
        <StorybookSubsection title="sm" labels={['size="sm"']}>
          <VButtonGroup variant="outlined" size="sm">
            <VButton>Small</VButton>
            <VButton>Small</VButton>
            <VButton>Small</VButton>
          </VButtonGroup>
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['size="md"']}>
          <VButtonGroup variant="outlined" size="md">
            <VButton>Medium</VButton>
            <VButton>Medium</VButton>
            <VButton>Medium</VButton>
          </VButtonGroup>
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['size="lg"']}>
          <VButtonGroup variant="outlined" size="lg">
            <VButton>Large</VButton>
            <VButton>Large</VButton>
            <VButton>Large</VButton>
          </VButtonGroup>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Orientation">
        <StorybookSubsection title="horizontal" labels={['orientation="horizontal"']}>
          <VButtonGroup variant="outlined" orientation="horizontal">
            <VButton>Left</VButton>
            <VButton>Center</VButton>
            <VButton>Right</VButton>
          </VButtonGroup>
        </StorybookSubsection>
        <StorybookSubsection title="vertical" labels={['orientation="vertical"']}>
          <VButtonGroup variant="outlined" orientation="vertical">
            <VButton>Top</VButton>
            <VButton>Middle</VButton>
            <VButton>Bottom</VButton>
          </VButtonGroup>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="default" labels={["default"]}>
          <VButtonGroup variant="outlined">
            <VButton>One</VButton>
            <VButton>Two</VButton>
            <VButton>Three</VButton>
          </VButtonGroup>
        </StorybookSubsection>
        <StorybookSubsection title="mixed disabled" labels={["individual disabled"]}>
          <VButtonGroup variant="outlined">
            <VButton>Enabled</VButton>
            <VButton disabled>Disabled</VButton>
            <VButton>Enabled</VButton>
          </VButtonGroup>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Related actions that belong together: text alignment, view modes, pagination",
          },
          {
            category: "Variant",
            guideline: "Use outlined for most cases. Filled for primary action groups",
          },
          {
            category: "Button count",
            guideline: "Keep to 2-5 buttons. For more options, use a dropdown or segmented control",
          },
          {
            category: "Orientation",
            guideline: "Horizontal by default. Vertical for sidebar toolbars or stacked actions",
          },
          {
            category: "Disabled items",
            guideline: "Disable individual buttons when their action is not available",
          },
          {
            category: "Selection",
            guideline: "Combine with state management to highlight the active button",
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
      title="VButtonGroup Samples"
      description="Copy-paste code examples for common button group patterns."
    >
      <StorybookCodeBlock
        title="Basic button group"
        code={`<VButtonGroup variant="outlined">
  <VButton>Left</VButton>
  <VButton>Center</VButton>
  <VButton>Right</VButton>
</VButtonGroup>`}
        preview={
          <VButtonGroup variant="outlined">
            <VButton>Left</VButton>
            <VButton>Center</VButton>
            <VButton>Right</VButton>
          </VButtonGroup>
        }
      />
      <StorybookCodeBlock
        title="Filled group"
        code={`<VButtonGroup variant="filled">
  <VButton>Save</VButton>
  <VButton>Preview</VButton>
  <VButton>Cancel</VButton>
</VButtonGroup>`}
        preview={
          <VButtonGroup variant="filled">
            <VButton>Save</VButton>
            <VButton>Preview</VButton>
            <VButton>Cancel</VButton>
          </VButtonGroup>
        }
      />
      <StorybookCodeBlock
        title="Vertical orientation"
        code={`<VButtonGroup variant="outlined" orientation="vertical">
  <VButton>Top</VButton>
  <VButton>Middle</VButton>
  <VButton>Bottom</VButton>
</VButtonGroup>`}
        preview={
          <VButtonGroup variant="outlined" orientation="vertical">
            <VButton>Top</VButton>
            <VButton>Middle</VButton>
            <VButton>Bottom</VButton>
          </VButtonGroup>
        }
      />
      <StorybookCodeBlock
        title="With disabled button"
        code={`<VButtonGroup variant="outlined">
  <VButton>Enabled</VButton>
  <VButton disabled>Disabled</VButton>
  <VButton>Enabled</VButton>
</VButtonGroup>`}
        preview={
          <VButtonGroup variant="outlined">
            <VButton>Enabled</VButton>
            <VButton disabled>Disabled</VButton>
            <VButton>Enabled</VButton>
          </VButtonGroup>
        }
      />
      <StorybookCodeBlock
        title="Segmented control"
        code={`const [active, setActive] = useState('week')

<VButtonGroup variant="outlined" size="sm">
  <VButton
    variant={active === 'day' ? 'filled' : 'outlined'}
    onClick={() => setActive('day')}
  >
    Day
  </VButton>
  <VButton
    variant={active === 'week' ? 'filled' : 'outlined'}
    onClick={() => setActive('week')}
  >
    Week
  </VButton>
  <VButton
    variant={active === 'month' ? 'filled' : 'outlined'}
    onClick={() => setActive('month')}
  >
    Month
  </VButton>
</VButtonGroup>`}
        preview={
          <VButtonGroup variant="outlined" size="sm">
            <VButton variant="outlined">Day</VButton>
            <VButton variant="filled">Week</VButton>
            <VButton variant="outlined">Month</VButton>
          </VButtonGroup>
        }
      />
      <StorybookCodeBlock
        title="Action bar"
        code={`<VButtonGroup spacing={8}>
  <VButton variant="filled">Save</VButton>
  <VButton variant="outlined">Cancel</VButton>
  <VButton variant="text" color="destructive">Delete</VButton>
</VButtonGroup>`}
        preview={
          <VButtonGroup spacing={8}>
            <VButton variant="filled">Save</VButton>
            <VButton variant="outlined">Cancel</VButton>
            <VButton variant="text" color="destructive">
              Delete
            </VButton>
          </VButtonGroup>
        }
      />
    </StorybookPageLayout>
  ),
};
