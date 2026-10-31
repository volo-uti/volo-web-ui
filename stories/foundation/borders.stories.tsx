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
  title: "Foundation/Border",
};
export default meta;
type Story = StoryObj<typeof meta>;

// --- Token data (CSS variable references only) ---

const borderTokens = [
  {
    name: "default",
    widthVar: "--v-border-default-width",
    styleVar: "--v-border-default-style",
    description: "Default border",
  },
  {
    name: "strong",
    widthVar: "--v-border-strong-width",
    styleVar: "--v-border-strong-style",
    description: "Emphasized border (focus ring, active state)",
  },
  {
    name: "subtle",
    widthVar: "--v-border-subtle-width",
    styleVar: "--v-border-subtle-style",
    description: "Subtle divider or separator",
  },
];

const colorMap: Record<string, string> = {
  default: "var(--v-border)",
  strong: "var(--v-foreground)",
  subtle: "var(--v-muted)",
};

// --- BorderSwatch (renders via var()) ---

function BorderSwatch({
  name,
  widthVar,
  styleVar,
  description,
}: {
  name: string;
  widthVar: string;
  styleVar: string;
  description: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vals, setVals] = useState({ width: "", style: "" });

  useEffect(() => {
    if (ref.current) {
      const computed = getComputedStyle(ref.current);
      setVals({
        width: computed.getPropertyValue(widthVar).trim(),
        style: computed.getPropertyValue(styleVar).trim(),
      });
    }
  }, [widthVar, styleVar]);

  return (
    <div className="w-[200px] flex flex-col items-center">
      <div
        ref={ref}
        className="w-[160px] h-[100px] bg-[var(--v-card)] rounded-[var(--v-radius-md)]"
        style={{
          border: `var(${widthVar}) var(${styleVar}) ${colorMap[name] || "var(--v-border)"}`,
        }}
      />
      <p className="mt-3 text-sm font-bold text-[var(--v-foreground)]">{name}</p>
      <p className="text-xs font-mono text-[var(--v-muted-foreground)]">
        {vals.width} {vals.style}
      </p>
      <p className="mt-1 text-xs text-[var(--v-muted-foreground)] text-center">{description}</p>
    </div>
  );
}

// --- Story ---

export const Default: Story = {
  name: "overview",
  render: () => (
    <StorybookPageLayout
      title="Border"
      description="A consistent border style system for containers, inputs, and dividers."
    >
      <StorybookSection title="Border Styles">
        <div className="flex flex-wrap gap-10">
          {borderTokens.map((t) => (
            <BorderSwatch
              key={t.name}
              name={t.name}
              widthVar={t.widthVar}
              styleVar={t.styleVar}
              description={t.description}
            />
          ))}
        </div>
      </StorybookSection>

      <StorybookSection title="Comparison">
        <div className="flex items-end gap-10">
          {borderTokens.map((t) => (
            <div key={t.name} className="flex flex-col items-center">
              <div
                className="w-20 h-20 bg-[var(--v-card)] rounded-lg"
                style={{ border: `var(${t.widthVar}) var(${t.styleVar}) ${colorMap[t.name]}` }}
              />
              <p className="mt-2 text-xs text-[var(--v-foreground)]">{t.name}</p>
            </div>
          ))}
        </div>
      </StorybookSection>

      <StorybookSection title="Border Table">
        <div className="overflow-hidden rounded-lg border border-[var(--v-border)]">
          <VTable
            rowKey="name"
            data={borderTokens}
            columns={[
              {
                key: "name",
                title: "Token",
                width: 100,
                render: (v) => <StorybookTokenName>{String(v)}</StorybookTokenName>,
              },
              {
                key: "widthVar",
                title: "Width",
                width: 80,
                render: (v) => <StorybookCssVar name={String(v)} />,
              },
              {
                key: "styleVar",
                title: "Style",
                width: 80,
                render: (v) => <StorybookCssVar name={String(v)} />,
              },
              {
                key: "description",
                title: "Description",
                render: (v) => (
                  <span className="text-[var(--v-muted-foreground)]">{String(v)}</span>
                ),
              },
            ]}
          />
        </div>
      </StorybookSection>

      <StorybookUsageGuidelines
        subtitle="Guidelines for choosing appropriate borders."
        headers={["Component", "Recommended", "Examples"]}
        rows={[
          {
            category: "Card / Container",
            guideline: "default (1px)",
            examples: "Content card, section wrapper, data table",
          },
          {
            category: "Input field",
            guideline: "default (1px)",
            examples: "Text input, select, textarea",
          },
          {
            category: "Focus ring",
            guideline: "strong (1px)",
            examples: "Keyboard focus outline, active input ring",
          },
          {
            category: "Divider",
            guideline: "subtle (1px)",
            examples: "Section separator, menu divider",
          },
          {
            category: "Table",
            guideline: "subtle (1px)",
            examples: "Table cell border, grid line",
          },
        ]}
      />
    </StorybookPageLayout>
  ),
};
