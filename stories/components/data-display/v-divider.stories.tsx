import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VDivider } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VDivider> = {
  title: "Components/Data Display/VDivider",
  component: VDivider,
  tags: ["autodocs"],
  args: {
    variant: "solid",
    bold: false,
    thickness: 1,
    orientation: "horizontal",
    indent: 0,
    endIndent: 0,
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
    <StorybookPageLayout title="VDivider" description="Visually separates content sections.">
      <StorybookSection title="Variants">
        <StorybookSubsection title="normal" labels={["VDivider"]}>
          <div style={{ width: "100%" }}>
            <VDivider />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="bold" labels={["VDivider bold"]}>
          <div style={{ width: "100%" }}>
            <VDivider bold />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="dashed" labels={['VDivider variant="dashed"']}>
          <div style={{ width: "100%" }}>
            <VDivider variant="dashed" />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="label" labels={['VDivider children="OR"']}>
          <div style={{ width: "100%" }}>
            <VDivider label="OR" />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Direction">
        <StorybookSubsection title="horizontal" labels={['VDivider orientation="horizontal"']}>
          <div style={{ width: "100%" }}>
            <p className="text-sm" style={{ color: "var(--v-foreground)" }}>
              Section above
            </p>
            <VDivider orientation="horizontal" />
            <p className="text-sm" style={{ color: "var(--v-foreground)" }}>
              Section below
            </p>
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="vertical" labels={['VDivider orientation="vertical"']}>
          <div className="flex items-center gap-4" style={{ height: "40px" }}>
            <span className="text-sm" style={{ color: "var(--v-foreground)" }}>
              Left
            </span>
            <VDivider orientation="vertical" />
            <span className="text-sm" style={{ color: "var(--v-foreground)" }}>
              Right
            </span>
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Indent">
        <StorybookSubsection title="no indent" labels={["VDivider"]}>
          <div style={{ width: "100%" }}>
            <VDivider />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="start indent" labels={["VDivider indent={56}"]}>
          <div style={{ width: "100%" }}>
            <VDivider indent={56} />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="both indents" labels={["VDivider indent={56} endIndent={56}"]}>
          <div style={{ width: "100%" }}>
            <VDivider indent={56} endIndent={56} />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Visually separate content sections with lines",
          },
          {
            category: "Horizontal",
            guideline: "Default for separating stacked content sections",
          },
          {
            category: "Vertical",
            guideline: "Separate inline items like toolbar buttons",
          },
          {
            category: "Label",
            guideline: "Add a label to provide context for the divided sections",
          },
          {
            category: "Dashed",
            guideline: "Use for less prominent visual separation",
          },
          {
            category: "Bold",
            guideline: "Use for major section boundaries",
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
      title="VDivider Samples"
      description="Copy-paste code examples for VDivider."
    >
      <StorybookCodeBlock
        title="Basic divider"
        code={`<VDivider />`}
        preview={
          <div style={{ width: "100%" }}>
            <VDivider />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Bold divider"
        code={`<VDivider bold />`}
        preview={
          <div style={{ width: "100%" }}>
            <VDivider bold />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Dashed divider"
        code={`<VDivider variant="dashed" />`}
        preview={
          <div style={{ width: "100%" }}>
            <VDivider variant="dashed" />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Label divider"
        code={`<VDivider label="OR" />`}
        preview={
          <div style={{ width: "100%" }}>
            <VDivider label="OR" />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Indented divider (list item pattern)"
        code={`<VDivider indent={56} />`}
        preview={
          <div style={{ width: "100%" }}>
            <VDivider indent={56} />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Section separator"
        code={`<div>
  <h3>Section A</h3>
  <p>Content of section A.</p>
</div>
<VDivider bold />
<div style={{ marginTop: 16 }}>
  <h3>Section B</h3>
  <p>Content of section B.</p>
</div>`}
        preview={
          <div style={{ width: "100%" }}>
            <div>
              <h3
                style={{
                  margin: "0 0 4px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--v-foreground)",
                }}
              >
                Section A
              </h3>
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: "0.8125rem",
                  color: "var(--v-muted-foreground)",
                }}
              >
                Content of section A goes here.
              </p>
            </div>
            <VDivider bold />
            <div style={{ marginTop: 12 }}>
              <h3
                style={{
                  margin: "0 0 4px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--v-foreground)",
                }}
              >
                Section B
              </h3>
              <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--v-muted-foreground)" }}>
                Content of section B goes here.
              </p>
            </div>
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
