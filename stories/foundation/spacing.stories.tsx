import { VTable } from "@volo-uti/volo-web-ui";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookUsageGuidelines,
  StorybookCssVar,
  StorybookTokenName,
} from "../_components";

const meta: Meta = {
  title: "Foundation/Spacing",
};
export default meta;
type Story = StoryObj<typeof meta>;

// --- Token data (CSS variable references only) ---

const tokens = [
  { var: "--v-spacing-xxs", label: "xxs", usage: "Fine adjustment within icons" },
  { var: "--v-spacing-xs", label: "xs", usage: "Extra small spacing" },
  { var: "--v-spacing-sm", label: "sm", usage: "Default spacing between elements" },
  { var: "--v-spacing-md", label: "md", usage: "Card inner spacing" },
  { var: "--v-spacing-lg", label: "lg", usage: "Default spacing between sections" },
  { var: "--v-spacing-xl", label: "xl", usage: "Spacing between large elements" },
  { var: "--v-spacing-xxl", label: "xxl", usage: "Page padding" },
  { var: "--v-spacing-xxxl", label: "xxxl", usage: "Section separator" },
  { var: "--v-spacing-4xl", label: "4xl", usage: "Large section gap, wide padding" },
  { var: "--v-spacing-5xl", label: "5xl", usage: "Page margin, hero padding" },
  { var: "--v-spacing-6xl", label: "6xl", usage: "Major section divider, landing page" },
];

// --- Story ---

export const Default: Story = {
  name: "overview",
  render: () => (
    <StorybookPageLayout
      title="Spacing"
      description="A consistent spacing system based on a 4px grid."
    >
      <StorybookSection title="Spacing Scale">
        <div className="overflow-hidden rounded-lg border border-[var(--v-border)]">
          <VTable
            rowKey="var"
            data={tokens}
            columns={[
              {
                key: "label",
                title: "Token",
                width: 80,
                render: (v) => <StorybookTokenName>{String(v)}</StorybookTokenName>,
              },
              {
                key: "var",
                title: "Value",
                width: 80,
                render: (v) => <StorybookCssVar name={String(v)} />,
              },
              {
                key: "bar",
                title: "Visual",
                render: (_v, row) => (
                  <div
                    className="h-6 bg-[var(--v-primary)] rounded-sm"
                    style={{ width: `var(${row.var})`, minWidth: "4px" }}
                  />
                ),
              },
              {
                key: "usage",
                title: "Usage",
                render: (v) => (
                  <span className="text-[var(--v-muted-foreground)]">{String(v)}</span>
                ),
              },
            ]}
          />
        </div>
      </StorybookSection>

      <StorybookUsageGuidelines
        subtitle="Guidelines for choosing appropriate spacing."
        headers={["Context", "Recommended", "Examples"]}
        rows={[
          {
            category: "Inline elements",
            guideline: "xxs ~ xs (2~4px)",
            examples: "Icon-label gap, badge padding",
          },
          {
            category: "Inside components",
            guideline: "sm ~ md (8~12px)",
            examples: "Button padding, input padding",
          },
          {
            category: "Between components",
            guideline: "md ~ lg (12~16px)",
            examples: "Form field gap, list item spacing",
          },
          {
            category: "Section separation",
            guideline: "xl ~ xxl (20~24px)",
            examples: "Content block margin, card group gap",
          },
          {
            category: "Page layout",
            guideline: "xxl ~ xxxl (24~32px)",
            examples: "Page margin, container padding",
          },
          {
            category: "Major layout",
            guideline: "4xl ~ 6xl (40~64px)",
            examples: "Hero padding, landing page sections",
          },
        ]}
      />
    </StorybookPageLayout>
  ),
};
