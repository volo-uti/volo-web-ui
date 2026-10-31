import { VTable } from "@volo-uti/volo-web-ui";
import React, { useRef, useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookUsageGuidelines,
  StorybookCssVar,
  StorybookTokenName,
} from "../_components";

const meta: Meta = {
  title: "Foundation/Radius",
};
export default meta;
type Story = StoryObj<typeof meta>;

// --- Token data (CSS variable references only) ---

const tokens = [
  { var: "--v-radius-none", label: "none", usage: "Square corners" },
  { var: "--v-radius-xs", label: "xs", usage: "Minimal rounding (tag, badge outline)" },
  { var: "--v-radius-sm", label: "sm", usage: "Badge, chip" },
  { var: "--v-radius-md", label: "md", usage: "Button, input" },
  { var: "--v-radius-lg", label: "lg", usage: "Modal" },
  { var: "--v-radius-card", label: "card", usage: "Card" },
  { var: "--v-radius-xl", label: "xl", usage: "Extra large (pill tabs, large containers)" },
  { var: "--v-radius-full", label: "full", usage: "Avatar, switch" },
];

// --- RadiusSwatch (reads value from CSS variable) ---

function RadiusSwatch({ label, cssVar }: { label: string; cssVar: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (ref.current) {
      setValue(getComputedStyle(ref.current).getPropertyValue(cssVar).trim());
    }
  }, [cssVar]);

  return (
    <div className="w-[120px] flex flex-col items-center">
      <div
        ref={ref}
        className="w-20 h-20 bg-[var(--v-primary)]"
        style={{ borderRadius: label === "full" ? "40px" : `var(${cssVar})` }}
      />
      <p className="mt-2 text-sm font-bold text-[var(--v-foreground)]">{label}</p>
      <p className="text-xs font-mono text-[var(--v-muted-foreground)]">{value}</p>
    </div>
  );
}

// --- Story ---

export const Default: Story = {
  name: "overview",
  render: () => (
    <StorybookPageLayout title="Radius" description="A consistent border radius system.">
      <StorybookSection title="Radius Scale">
        <div className="flex flex-wrap gap-6">
          {tokens.map((t) => (
            <RadiusSwatch key={t.var} label={t.label} cssVar={t.var} />
          ))}
        </div>
      </StorybookSection>

      <StorybookSection title="Radius Table">
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
                width: 100,
                render: (v, row) => (
                  <StorybookCssVar
                    name={String(v)}
                    display={row.label === "full" ? "full" : undefined}
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
        subtitle="Guidelines for choosing appropriate border radii."
        headers={["Component", "Recommended", "Examples"]}
        rows={[
          {
            category: "Button",
            guideline: "sm (4px) ~ md (8px)",
            examples: "Action button, form submit, toolbar button",
          },
          {
            category: "Input field",
            guideline: "md (8px)",
            examples: "Text input, select, textarea",
          },
          {
            category: "Card / Modal",
            guideline: "card (16px) ~ lg (12px)",
            examples: "Content card, dialog, popover",
          },
          {
            category: "Avatar / Chip",
            guideline: "full (9999px)",
            examples: "User avatar, status badge",
          },
          {
            category: "Toggle / Switch",
            guideline: "full (9999px)",
            examples: "Switch control, pill button",
          },
        ]}
      />
    </StorybookPageLayout>
  ),
};
