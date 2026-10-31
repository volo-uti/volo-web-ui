import React, { useRef, useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StorybookPageLayout, StorybookSection, StorybookUsageGuidelines } from "../_components";

const meta: Meta = {
  title: "Foundation/Color",
};
export default meta;
type Story = StoryObj<typeof meta>;

// ─── Color groups (10 sections) ───

const colorGroups = [
  {
    title: "Primary",
    items: [
      { name: "primary", var: "--v-primary" },
      { name: "primaryForeground", var: "--v-primary-foreground" },
    ],
  },
  {
    title: "Secondary",
    items: [
      { name: "secondary", var: "--v-secondary" },
      { name: "secondaryForeground", var: "--v-secondary-foreground" },
    ],
  },
  {
    title: "Tertiary",
    items: [
      { name: "tertiary", var: "--v-tertiary" },
      { name: "tertiaryForeground", var: "--v-tertiary-foreground" },
    ],
  },
  {
    title: "Accent",
    items: [
      { name: "accent", var: "--v-accent" },
      { name: "accentForeground", var: "--v-accent-foreground" },
    ],
  },
  {
    title: "Background & Foreground",
    items: [
      { name: "background", var: "--v-background" },
      { name: "foreground", var: "--v-foreground" },
    ],
  },
  {
    title: "Muted",
    items: [
      { name: "muted", var: "--v-muted" },
      { name: "mutedForeground", var: "--v-muted-foreground" },
    ],
  },
  {
    title: "Surface Colors",
    items: [
      { name: "card", var: "--v-card" },
      { name: "cardForeground", var: "--v-card-foreground" },
      { name: "popover", var: "--v-popover" },
      { name: "popoverForeground", var: "--v-popover-foreground" },
    ],
  },
  {
    title: "Status Colors",
    items: [
      { name: "success", var: "--v-success" },
      { name: "successForeground", var: "--v-success-foreground" },
      { name: "warning", var: "--v-warning" },
      { name: "warningForeground", var: "--v-warning-foreground" },
      { name: "error", var: "--v-error" },
      { name: "errorForeground", var: "--v-error-foreground" },
      { name: "info", var: "--v-info" },
      { name: "infoForeground", var: "--v-info-foreground" },
    ],
  },
  {
    title: "Destructive",
    items: [
      { name: "destructive", var: "--v-destructive" },
      { name: "destructiveForeground", var: "--v-destructive-foreground" },
    ],
  },
  {
    title: "UI Colors",
    items: [
      { name: "border", var: "--v-border" },
      { name: "input", var: "--v-input" },
      { name: "ring", var: "--v-ring" },
    ],
  },
  {
    title: "State Colors",
    items: [
      { name: "disabled", var: "--v-disabled" },
      { name: "disabledForeground", var: "--v-disabled-foreground" },
      { name: "scrim", var: "--v-scrim" },
    ],
  },
];

// ─── CSS color → hex  ───

function cssColorToHex(raw: string): string {
  // 1) Try direct rgb/rgba parsing (fast path)
  const match = raw.match(/^rgba?\(\s*([\d.]+),?\s*([\d.]+),?\s*([\d.]+)/);
  if (match) {
    const r = Math.round(Number(match[1]));
    const g = Math.round(Number(match[2]));
    const b = Math.round(Number(match[3]));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  }
  // 2) Fallback: Canvas API for oklch/lab/lch/etc
  try {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = raw;
    ctx.fillRect(0, 0, 1, 1);
    const [r = 0, g = 0, b = 0] = ctx.getImageData(0, 0, 1, 1).data;
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  } catch {
    return raw;
  }
}

// ─── ColorSwatch  ───

function ColorSwatch({ name, cssVar }: { name: string; cssVar: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hex, setHex] = useState("");

  useEffect(() => {
    if (ref.current) {
      const computed = getComputedStyle(ref.current).backgroundColor;
      setHex(cssColorToHex(computed));
    }
  }, []);

  return (
    <div className="w-[100px] flex flex-col items-center">
      <div
        ref={ref}
        className="w-20 h-20 rounded-xl border border-[var(--v-border)]"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <p className="mt-2 text-xs font-medium text-[var(--v-foreground)] text-center leading-tight">
        {name}
      </p>
      <p className="text-[10px] font-mono text-[var(--v-muted-foreground)] text-center">{hex}</p>
    </div>
  );
}

// ─── Story ───

export const Default: Story = {
  name: "overview",
  render: () => (
    <StorybookPageLayout
      title="Semantic Colors"
      description="A semantic color system categorized by purpose."
    >
      {colorGroups.map((group) => (
        <StorybookSection key={group.title} title={group.title}>
          <div className="flex flex-wrap gap-4">
            {group.items.map((item) => (
              <ColorSwatch key={item.var} name={item.name} cssVar={item.var} />
            ))}
          </div>
        </StorybookSection>
      ))}

      <StorybookUsageGuidelines
        subtitle="Guidelines for choosing appropriate colors."
        headers={["Color", "When to use", "Examples"]}
        rows={[
          {
            category: "primary",
            guideline: "Primary actions, brand emphasis",
            examples: "CTA button, active tab, selected item",
          },
          {
            category: "secondary",
            guideline: "Secondary actions, alternative choices",
            examples: "Cancel button, secondary navigation",
          },
          {
            category: "muted",
            guideline: "Inactive areas, background emphasis",
            examples: "Disabled state background, subtle divider",
          },
          {
            category: "accent",
            guideline: "Highlight, hover state",
            examples: "Hover highlight, keyboard focus background",
          },
          {
            category: "destructive",
            guideline: "Delete, dangerous actions",
            examples: "Delete button, error alert",
          },
          {
            category: "success/warning/error",
            guideline: "Status feedback display",
            examples: "Form validation, toast notification",
          },
          {
            category: "info",
            guideline: "Informational alerts, notices",
            examples: "Info banner, help tooltip, guidance message",
          },
        ]}
      />
    </StorybookPageLayout>
  ),
};
