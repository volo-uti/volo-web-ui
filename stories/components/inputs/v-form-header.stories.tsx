import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VFormHeader } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VFormHeader> = {
  title: "Components/Inputs/VFormHeader",
  component: VFormHeader,
  tags: ["autodocs"],
  args: { label: "Email", required: true, size: "md" },
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
      title="VFormHeader"
      description="Label row above a form field: label, required mark, tooltip and extra info."
    >
      <StorybookSection title="Basics">
        <StorybookSubsection title="label" labels={['label="..."']}>
          <VFormHeader label="Email" />
        </StorybookSubsection>
        <StorybookSubsection title="required" labels={["required"]}>
          <VFormHeader label="Email" required />
        </StorybookSubsection>
        <StorybookSubsection title="required mark" labels={['requiredMark="(required)"']}>
          <VFormHeader label="Email" required requiredMark="(required)" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Extras">
        <StorybookSubsection title="tooltip" labels={["tooltip={...}"]}>
          <VFormHeader label="Password" tooltip={<span aria-label="help">(?)</span>} />
        </StorybookSubsection>
        <StorybookSubsection title="more" labels={['more="..."']}>
          <VFormHeader label="Bio" more="Optional" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Sizes">
        {(["sm", "md", "lg"] as const).map((size) => (
          <StorybookSubsection key={size} title={size} labels={[`size="${size}"`]}>
            <VFormHeader label="Label" size={size} />
          </StorybookSubsection>
        ))}
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Build a custom field layout; VFormField already includes it",
          },
          {
            category: "Label",
            guideline: "Pass `htmlFor` with the control id so clicking the label focuses it",
          },
          {
            category: "Empty",
            guideline: "Renders nothing when label, tooltip and more are all empty",
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
      title="VFormHeader Samples"
      description="Copy-paste code examples for common form header patterns."
    >
      <StorybookCodeBlock
        title="Label with extra info"
        code={`<VFormHeader label="Email" required htmlFor="email" more="We never share it" />`}
        preview={<VFormHeader label="Email" required htmlFor="email" more="We never share it" />}
      />
    </StorybookPageLayout>
  ),
};
