import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VFormFooter } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VFormFooter> = {
  title: "Components/Inputs/VFormFooter",
  component: VFormFooter,
  tags: ["autodocs"],
  args: { helper: "At least 8 characters", maxLength: 20, currentLength: 5 },
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
      title="VFormFooter"
      description="Message row below a form field: error, success or helper text, counter and extra note."
    >
      <StorybookSection title="Messages">
        <StorybookSubsection title="helper" labels={['helper="..."']}>
          <VFormFooter helper="At least 8 characters" />
        </StorybookSubsection>
        <StorybookSubsection title="error" labels={["error", 'errorText="..."']}>
          <VFormFooter helper="At least 8 characters" error errorText="Too short" />
        </StorybookSubsection>
        <StorybookSubsection title="success" labels={["success", 'successText="..."']}>
          <VFormFooter helper="At least 8 characters" success successText="Looks good" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Counter & extra">
        <StorybookSubsection title="counter" labels={["maxLength", "currentLength"]}>
          <VFormFooter maxLength={20} currentLength={5} />
        </StorybookSubsection>
        <StorybookSubsection title="over the limit" labels={["currentLength > maxLength"]}>
          <VFormFooter maxLength={20} currentLength={25} />
        </StorybookSubsection>
        <StorybookSubsection title="extra" labels={['extra="..."']}>
          <VFormFooter helper="Hint" extra="Changes apply after you save" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Build a custom field layout; VFormField already includes it",
          },
          {
            category: "Priority",
            guideline: "Error text wins over success text, which wins over helper text",
          },
          {
            category: "Accessibility",
            guideline: "Pass `messageId` and point the control `aria-describedby` at it",
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
      title="VFormFooter Samples"
      description="Copy-paste code examples for common form footer patterns."
    >
      <StorybookCodeBlock
        title="Helper with counter"
        code={`<VFormFooter helper="Short and clear" maxLength={50} currentLength={text.length} />`}
        preview={<VFormFooter helper="Short and clear" maxLength={50} currentLength={12} />}
      />
    </StorybookPageLayout>
  ),
};
