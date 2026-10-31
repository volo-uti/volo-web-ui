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
  title: "Foundation/Size",
};
export default meta;
type Story = StoryObj<typeof meta>;

// --- Token data (CSS variable mappings) ---

const sizeNames = ["xs", "sm", "md", "lg", "xl"] as const;
const properties = [
  "height",
  "paddingHorizontal",
  "paddingVertical",
  "fontSize",
  "iconSize",
  "gap",
  "borderRadius",
] as const;

// CSS variable name for a given property and size
function cssVar(property: (typeof properties)[number], size: (typeof sizeNames)[number]): string {
  const propMap: Record<string, string> = {
    height: "height",
    paddingHorizontal: "padding-x",
    paddingVertical: "padding-y",
    fontSize: "font-size",
    iconSize: "icon-size",
    gap: "gap",
    borderRadius: "radius",
  };
  return `--v-size-${size}-${propMap[property]}`;
}

// --- SizeBox ---

function SizeBox({
  label,
  heightVar,
  isDefault,
}: {
  label: string;
  heightVar: string;
  isDefault?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("");

  useEffect(() => {
    if (ref.current) {
      setHeight(getComputedStyle(ref.current).getPropertyValue(heightVar).trim());
    }
  }, [heightVar]);

  return (
    <div ref={ref} className="flex flex-col items-center" style={{ width: 100 }}>
      {/* Height visualization (no text inside) */}
      <div
        className="w-20"
        style={{
          height: `var(${heightVar})`,
          backgroundColor: isDefault ? "var(--v-primary)" : "var(--v-muted)",
          borderRadius: "var(--v-radius-md)",
          border: `1px solid ${isDefault ? "var(--v-primary)" : "var(--v-border)"}`,
        }}
      />
      {/* Name */}
      <span className="mt-2 text-sm font-bold text-[var(--v-foreground)]">
        {isDefault ? `${label} (default)` : label}
      </span>
      {/* Value */}
      <span className="text-xs font-mono text-[var(--v-muted-foreground)]">{height}</span>
    </div>
  );
}

// --- Story ---

export const Default: Story = {
  name: "overview",
  render: () => (
    <StorybookPageLayout
      title="Component Sizes"
      description="All components support five sizes: xs, sm, md, lg, xl. Build harmonious UIs with a consistent sizing system."
    >
      <StorybookSection
        title="Size Scale"
        description="Visual comparison of each size preset. md is the default size."
      >
        <div className="flex flex-wrap gap-10">
          <SizeBox label="xs" heightVar="--v-size-xs-height" />
          <SizeBox label="sm" heightVar="--v-size-sm-height" />
          <SizeBox label="md" heightVar="--v-size-md-height" isDefault />
          <SizeBox label="lg" heightVar="--v-size-lg-height" />
          <SizeBox label="xl" heightVar="--v-size-xl-height" />
        </div>
      </StorybookSection>

      <StorybookSection
        title="Size Tokens"
        description="Token values included in each size preset."
      >
        <div className="overflow-hidden rounded-lg border border-[var(--v-border)]">
          <VTable
            rowKey="property"
            data={properties.map((property) => ({ property }))}
            columns={[
              {
                key: "property",
                title: "Property",
                render: (v) => <StorybookTokenName>{String(v)}</StorybookTokenName>,
              },
              ...sizeNames.map((size) => ({
                key: size,
                title: size === "md" ? "md (default)" : size,
                alignment: "center" as const,
                render: (_v: unknown, row: { property: (typeof properties)[number] }) => (
                  <StorybookCssVar
                    name={cssVar(row.property, size)}
                    className="text-xs font-mono text-[var(--v-muted-foreground)]"
                  />
                ),
              })),
            ]}
          />
        </div>
      </StorybookSection>

      <StorybookUsageGuidelines
        subtitle="Guidelines for choosing appropriate sizes."
        headers={["Size", "When to use", "Examples"]}
        rows={[
          {
            category: "xs",
            guideline: "Compact UI, icon-only buttons, dense tables",
            examples: "Icon button, compact tag, inline action",
          },
          {
            category: "sm",
            guideline: "Dense UI, table interiors, secondary actions",
            examples: "Table row action, toolbar icon button, compact menu item",
          },
          {
            category: "md",
            guideline: "Default UI, form elements, standard buttons",
            examples: "Standard button, input field, dropdown trigger",
          },
          {
            category: "lg",
            guideline: "Touch devices, CTA, enhanced accessibility",
            examples: "Mobile CTA, primary form input, landing page button",
          },
          {
            category: "xl",
            guideline: "Hero sections, large touch targets",
            examples: "Hero CTA, prominent action, accessibility emphasis",
          },
        ]}
      />
    </StorybookPageLayout>
  ),
};
