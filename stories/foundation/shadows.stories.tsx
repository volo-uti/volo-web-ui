import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StorybookPageLayout, StorybookSection, StorybookUsageGuidelines } from "../_components";

const meta: Meta = {
  title: "Foundation/Shadow",
};
export default meta;
type Story = StoryObj<typeof meta>;

// ─── Token data (SSoT: xs ~ xl + glow) ───

const shadowTokens = [
  {
    var: "--v-shadow-xs",
    label: "xs",
    description: "Subtle depth (input, divider)\nblur: 2px, offset: 0,1",
  },
  { var: "--v-shadow-sm", label: "sm", description: "Card, small popup\nblur: 4px, offset: 0,2" },
  {
    var: "--v-shadow-md",
    label: "md",
    description: "Dropdown, hover card\nblur: 8px, offset: 0,4",
  },
  { var: "--v-shadow-lg", label: "lg", description: "Modal, dialog\nblur: 16px, offset: 0,8" },
  {
    var: "--v-shadow-xl",
    label: "xl",
    description: "Floating element, FAB\nblur: 24px, offset: 0,12",
  },
  {
    var: "--v-shadow-glow",
    label: "glow",
    description: "Emphasis glow effect\nblur: 20px, offset: 0,0",
  },
];

// ─── ShadowSwatch ───

function ShadowSwatch({
  label,
  cssVar,
  description,
}: {
  label: string;
  cssVar: string;
  description: string;
}) {
  return (
    <div className="w-[160px] flex flex-col items-center">
      <div
        className="w-[120px] h-[120px] bg-[var(--v-card)] rounded-[var(--v-radius-card)]"
        style={{ boxShadow: `var(${cssVar})` }}
      />
      <p className="mt-4 text-sm font-bold text-[var(--v-foreground)]">{label}</p>
      <p className="mt-1 text-xs text-[var(--v-muted-foreground)] text-center whitespace-pre-line">
        {description}
      </p>
    </div>
  );
}

// ─── ShadowBox for comparison ───

function ShadowBox({ label, cssVar }: { label: string; cssVar?: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-20 h-20 bg-[var(--v-card)] rounded-xl"
        style={{
          boxShadow: cssVar ? `var(${cssVar})` : "none",
          border: !cssVar ? "1px solid var(--v-border)" : undefined,
        }}
      />
      <p className="mt-2 text-xs text-[var(--v-foreground)]">{label}</p>
    </div>
  );
}

// ─── Story ───

export const Default: Story = {
  name: "overview",
  render: () => (
    <StorybookPageLayout
      title="Shadow"
      description="A consistent shadow style system with 6 elevation levels."
    >
      <StorybookSection title="Shadow Styles">
        <div className="flex flex-wrap gap-12">
          {shadowTokens.map((t) => (
            <ShadowSwatch key={t.var} label={t.label} cssVar={t.var} description={t.description} />
          ))}
        </div>
      </StorybookSection>

      <StorybookSection title="Comparison">
        <div className="flex items-end gap-10">
          <ShadowBox label="xs" cssVar="--v-shadow-xs" />
          <ShadowBox label="sm" cssVar="--v-shadow-sm" />
          <ShadowBox label="md" cssVar="--v-shadow-md" />
          <ShadowBox label="lg" cssVar="--v-shadow-lg" />
          <ShadowBox label="xl" cssVar="--v-shadow-xl" />
          <ShadowBox label="glow" cssVar="--v-shadow-glow" />
        </div>
      </StorybookSection>

      <StorybookUsageGuidelines
        subtitle="Guidelines for choosing appropriate shadows."
        headers={["Shadow", "When to use", "Examples"]}
        rows={[
          {
            category: "xs (blur 2px)",
            guideline: "Subtle depth cue",
            examples: "Input field, divider, subtle card",
          },
          {
            category: "sm (blur 4px)",
            guideline: "Default card elevation",
            examples: "Content card, small popup, dropdown panel",
          },
          {
            category: "md (blur 8px)",
            guideline: "Hover state, interactive cards",
            examples: "Dropdown, hover card, context menu",
          },
          {
            category: "lg (blur 16px)",
            guideline: "Modal, dialog overlays",
            examples: "Modal dialog, bottom sheet, drawer",
          },
          {
            category: "xl (blur 24px)",
            guideline: "Floating elements",
            examples: "FAB, floating toolbar, dragged item",
          },
          {
            category: "glow (blur 20px)",
            guideline: "Emphasis, focus indicator",
            examples: "Brand highlight area, focus ring",
          },
        ]}
      />
    </StorybookPageLayout>
  ),
};
