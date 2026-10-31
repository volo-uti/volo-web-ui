import React from "react";
import { VTable } from "@volo-uti/volo-web-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookUsageGuidelines,
  StorybookTokenName,
} from "../_components";

const meta: Meta = {
  title: "Foundation/Gradient",
};
export default meta;
type Story = StoryObj<typeof meta>;

// --- Token data ---
// Lightning CSS strips gradient direction from CSS custom properties,
// so we define the full CSS gradient value here.

const gradientTokens = [
  {
    name: "brand",
    cssVar: "--v-gradient-brand",
    // top-left to bottom-right
    cssValue: "linear-gradient(to bottom right, #6366F1 0%, #0EA5E9 100%)",
    description: "Primary brand gradient (Indigo to Cyan)",
    usage: "Hero sections, brand emphasis",
  },
  {
    name: "surface",
    cssVar: "--v-gradient-surface",
    // top to bottom
    cssValue: "linear-gradient(to bottom, #fafafa 0%, #f4f4f5 100%)",
    description: "Subtle surface gradient",
    usage: "Background depth, card surfaces",
  },
];

// --- GradientSwatch ---

function GradientSwatch({
  name,
  cssValue,
  description,
  usage,
}: {
  name: string;
  cssValue: string;
  description: string;
  usage: string;
}) {
  return (
    <div className="w-[280px]">
      <div className="h-[140px] rounded-[var(--v-radius-card)]" style={{ background: cssValue }} />
      <p className="mt-3 text-sm font-bold text-[var(--v-foreground)]">{name}</p>
      <p className="text-xs text-[var(--v-muted-foreground)]">{description}</p>
      <p className="mt-1 text-[10px] font-mono text-[var(--v-muted-foreground)]">{cssValue}</p>
      <span className="mt-2 inline-block px-2 py-1 bg-[var(--v-accent)] rounded text-xs text-[var(--v-accent-foreground)]">
        {usage}
      </span>
    </div>
  );
}

// --- Story ---

export const Default: Story = {
  name: "overview",
  render: () => (
    <StorybookPageLayout
      title="Gradient"
      description="Gradient tokens for brand identity and subtle surface depth."
    >
      <StorybookSection title="Gradient Styles">
        <div className="flex flex-wrap gap-10">
          {gradientTokens.map((t) => (
            <GradientSwatch
              key={t.name}
              name={t.name}
              cssValue={t.cssValue}
              description={t.description}
              usage={t.usage}
            />
          ))}
        </div>
      </StorybookSection>

      <StorybookSection title="Application Examples">
        <div className="grid grid-cols-2 gap-6">
          <div
            className="rounded-[var(--v-radius-card)] overflow-hidden"
            style={{ background: gradientTokens[0]?.cssValue }}
          >
            <div className="p-8 text-white">
              <p className="text-2xl font-bold">Brand Gradient</p>
              <p className="mt-2 text-sm opacity-80">
                Used for hero sections and brand emphasis areas.
              </p>
            </div>
          </div>
          <div
            className="rounded-[var(--v-radius-card)] overflow-hidden border border-[var(--v-border)]"
            style={{ background: gradientTokens[1]?.cssValue }}
          >
            <div className="p-8">
              <p className="text-2xl font-bold text-[var(--v-foreground)]">Surface Gradient</p>
              <p className="mt-2 text-sm text-[var(--v-muted-foreground)]">
                Used for subtle background depth.
              </p>
            </div>
          </div>
        </div>
      </StorybookSection>

      <StorybookSection title="Gradient Table">
        <div className="overflow-hidden rounded-lg border border-[var(--v-border)]">
          <VTable
            rowKey="name"
            data={gradientTokens}
            columns={[
              {
                key: "name",
                title: "Token",
                width: 100,
                render: (v) => <StorybookTokenName>{String(v)}</StorybookTokenName>,
              },
              {
                key: "preview",
                title: "Preview",
                width: 100,
                render: (_v, t) => (
                  <div className="w-16 h-8 rounded" style={{ background: t.cssValue }} />
                ),
              },
              {
                key: "cssValue",
                title: "Value",
                render: (v) => (
                  <span className="text-xs font-mono text-[var(--v-muted-foreground)]">
                    {String(v)}
                  </span>
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
        subtitle="Guidelines for gradient usage."
        headers={["Gradient", "When to use", "Examples"]}
        rows={[
          {
            category: "brand",
            guideline: "Brand emphasis, CTAs",
            examples: "Hero section, brand banner, CTA background",
          },
          {
            category: "surface",
            guideline: "Subtle depth, backgrounds",
            examples: "Page background, card surface",
          },
        ]}
      />
    </StorybookPageLayout>
  ),
};
