import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VFormBody } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const SearchIcon = () => (
  <span style={{ fontSize: "14px", color: "var(--v-foreground)" }}>&#128269;</span>
);

const Control = ({ placeholder = "Type here..." }: { placeholder?: string }) => (
  // eslint-disable-next-line no-restricted-syntax -- VFormBody wraps any raw control; the story needs one
  <input
    aria-label={placeholder}
    placeholder={placeholder}
    className="min-w-0 flex-1 bg-transparent outline-none"
  />
);

const meta: Meta<typeof VFormBody> = {
  title: "Components/Inputs/VFormBody",
  component: VFormBody,
  tags: ["autodocs"],
  args: { variant: "outlined", size: "md", color: "primary", corner: "rounded" },
  render: (args) => (
    <VFormBody {...args}>
      <Control />
    </VFormBody>
  ),
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
      title="VFormBody"
      description="Bordered surface that holds a form control, with leading and trailing elements."
    >
      <StorybookSection title="Variants">
        {(["outlined", "filled", "underline"] as const).map((variant) => (
          <StorybookSubsection key={variant} title={variant} labels={[`variant="${variant}"`]}>
            <VFormBody variant={variant}>
              <Control />
            </VFormBody>
          </StorybookSubsection>
        ))}
      </StorybookSection>

      <StorybookSection title="Sizes">
        {(["sm", "md", "lg"] as const).map((size) => (
          <StorybookSubsection key={size} title={size} labels={[`size="${size}"`]}>
            <VFormBody size={size}>
              <Control />
            </VFormBody>
          </StorybookSubsection>
        ))}
      </StorybookSection>

      <StorybookSection title="Corners">
        {(["square", "rounded", "pill"] as const).map((corner) => (
          <StorybookSubsection key={corner} title={corner} labels={[`corner="${corner}"`]}>
            <VFormBody corner={corner}>
              <Control />
            </VFormBody>
          </StorybookSubsection>
        ))}
      </StorybookSection>

      <StorybookSection title="Focus colors">
        {(["primary", "secondary", "destructive"] as const).map((color) => (
          <StorybookSubsection key={color} title={color} labels={[`color="${color}"`, "focused"]}>
            <VFormBody color={color} focused>
              <Control />
            </VFormBody>
          </StorybookSubsection>
        ))}
      </StorybookSection>

      <StorybookSection title="Adornments">
        <StorybookSubsection title="leading" labels={["leading={...}"]}>
          <VFormBody leading={<SearchIcon />}>
            <Control placeholder="Search" />
          </VFormBody>
        </StorybookSubsection>
        <StorybookSubsection title="trailing" labels={["trailing={...}"]}>
          <VFormBody trailing={<span>kg</span>}>
            <Control placeholder="Weight" />
          </VFormBody>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="error" labels={["error"]}>
          <VFormBody error>
            <Control />
          </VFormBody>
        </StorybookSubsection>
        <StorybookSubsection title="success" labels={["success"]}>
          <VFormBody success>
            <Control />
          </VFormBody>
        </StorybookSubsection>
        <StorybookSubsection title="disabled" labels={["disabled"]}>
          <VFormBody disabled>
            <Control />
          </VFormBody>
        </StorybookSubsection>
        <StorybookSubsection title="read only" labels={["readOnly"]}>
          <VFormBody readOnly>
            <Control />
          </VFormBody>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Build a custom field around a control that VTextField does not cover",
          },
          {
            category: "Control",
            guideline: "Give the inner control `flex-1 min-w-0 bg-transparent outline-none`",
          },
          {
            category: "Focus",
            guideline: "The ring follows focus inside; use `focused` only to force it",
          },
          {
            category: "Error",
            guideline: "Pair `error` with a message in VFormField or VFormFooter",
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
      title="VFormBody Samples"
      description="Copy-paste code examples for common form body patterns."
    >
      <StorybookCodeBlock
        title="Search body"
        code={`<VFormBody leading={<SearchIcon />} corner="pill">
  <input className="min-w-0 flex-1 bg-transparent outline-none" placeholder="Search" />
</VFormBody>`}
        preview={
          <VFormBody leading={<SearchIcon />} corner="pill">
            <Control placeholder="Search" />
          </VFormBody>
        }
      />
      <StorybookCodeBlock
        title="Inside a VFormField"
        code={`<VFormField label="Amount" error errorText="Too high">
  <VFormBody error trailing="USD">
    <input className="min-w-0 flex-1 bg-transparent outline-none" />
  </VFormBody>
</VFormField>`}
        preview={
          <VFormBody error trailing="USD">
            <Control placeholder="Amount" />
          </VFormBody>
        }
      />
    </StorybookPageLayout>
  ),
};
