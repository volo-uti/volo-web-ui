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
  title: "Foundation/Typography",
};
export default meta;
type Story = StoryObj<typeof meta>;

// --- Token data (CSS variable references only, no hardcoded values) ---

interface TypeItem {
  name: string;
  sizeVar: string;
  weightVar: string;
  lhVar: string;
  lsVar: string;
}

const typeScale: { category: string; items: TypeItem[] }[] = [
  {
    category: "Display",
    items: [
      {
        name: "display-lg",
        sizeVar: "--v-font-size-display-lg",
        weightVar: "--v-font-weight-display-lg",
        lhVar: "--v-line-height-display-lg",
        lsVar: "--v-letter-spacing-display-lg",
      },
      {
        name: "display-md",
        sizeVar: "--v-font-size-display-md",
        weightVar: "--v-font-weight-display-md",
        lhVar: "--v-line-height-display-md",
        lsVar: "--v-letter-spacing-display-md",
      },
      {
        name: "display-sm",
        sizeVar: "--v-font-size-display-sm",
        weightVar: "--v-font-weight-display-sm",
        lhVar: "--v-line-height-display-sm",
        lsVar: "--v-letter-spacing-display-sm",
      },
    ],
  },
  {
    category: "Headings",
    items: [
      {
        name: "h1",
        sizeVar: "--v-font-size-h1",
        weightVar: "--v-font-weight-h1",
        lhVar: "--v-line-height-h1",
        lsVar: "--v-letter-spacing-h1",
      },
      {
        name: "h2",
        sizeVar: "--v-font-size-h2",
        weightVar: "--v-font-weight-h2",
        lhVar: "--v-line-height-h2",
        lsVar: "--v-letter-spacing-h2",
      },
      {
        name: "h3",
        sizeVar: "--v-font-size-h3",
        weightVar: "--v-font-weight-h3",
        lhVar: "--v-line-height-h3",
        lsVar: "--v-letter-spacing-h3",
      },
      {
        name: "h4",
        sizeVar: "--v-font-size-h4",
        weightVar: "--v-font-weight-h4",
        lhVar: "--v-line-height-h4",
        lsVar: "--v-letter-spacing-h4",
      },
      {
        name: "h5",
        sizeVar: "--v-font-size-h5",
        weightVar: "--v-font-weight-h5",
        lhVar: "--v-line-height-h5",
        lsVar: "--v-letter-spacing-h5",
      },
      {
        name: "h6",
        sizeVar: "--v-font-size-h6",
        weightVar: "--v-font-weight-h6",
        lhVar: "--v-line-height-h6",
        lsVar: "--v-letter-spacing-h6",
      },
    ],
  },
  {
    category: "Body",
    items: [
      {
        name: "body-lg",
        sizeVar: "--v-font-size-body-lg",
        weightVar: "--v-font-weight-body-lg",
        lhVar: "--v-line-height-body-lg",
        lsVar: "--v-letter-spacing-body-lg",
      },
      {
        name: "body-md",
        sizeVar: "--v-font-size-body-md",
        weightVar: "--v-font-weight-body-md",
        lhVar: "--v-line-height-body-md",
        lsVar: "--v-letter-spacing-body-md",
      },
      {
        name: "body-sm",
        sizeVar: "--v-font-size-body-sm",
        weightVar: "--v-font-weight-body-sm",
        lhVar: "--v-line-height-body-sm",
        lsVar: "--v-letter-spacing-body-sm",
      },
    ],
  },
  {
    category: "Utility",
    items: [
      {
        name: "overline",
        sizeVar: "--v-font-size-overline",
        weightVar: "--v-font-weight-overline",
        lhVar: "--v-line-height-overline",
        lsVar: "--v-letter-spacing-overline",
      },
      {
        name: "caption",
        sizeVar: "--v-font-size-caption",
        weightVar: "--v-font-weight-caption",
        lhVar: "--v-line-height-caption",
        lsVar: "--v-letter-spacing-caption",
      },
      {
        name: "small",
        sizeVar: "--v-font-size-small",
        weightVar: "--v-font-weight-small",
        lhVar: "--v-line-height-small",
        lsVar: "--v-letter-spacing-small",
      },
    ],
  },
];

// 2. Font Families
const fontFamilies = [
  {
    var: "--v-font-sans",
    label: "sans",
    fontName: "Pretendard Variable",
    description: "UI text, headings, body copy",
  },
  {
    var: "--v-font-mono",
    label: "mono",
    fontName: "JetBrains Mono",
    description: "Code, technical content, token names",
  },
];

// --- Styles story ---

export const Styles: Story = {
  name: "overview",
  render: () => (
    <StorybookPageLayout
      title="Typography"
      description="CSS custom properties for font families, sizes, weights, line heights, and letter spacing. Semantic Roles provide cross-platform consistency."
    >
      {/* 1. Font Families */}
      <StorybookSection title="Font Families">
        {fontFamilies.map((f) => (
          <div key={f.var} className="rounded-lg border border-[var(--v-border)] p-5">
            <p
              className="text-3xl text-[var(--v-foreground)]"
              style={{ fontFamily: `var(${f.var})` }}
            >
              {f.label === "mono"
                ? "const x = 42; fn(x);"
                : "The quick brown fox jumps over the lazy dog"}
            </p>
            <p className="mt-2 text-xs text-[var(--v-muted-foreground)]">
              <span className="font-mono">{f.fontName}</span> &mdash; {f.description}
            </p>
          </div>
        ))}
      </StorybookSection>

      {/* 2. Type Scale (composite) */}
      <StorybookSection title="Type Scale">
        <div className="flex flex-col gap-6">
          {typeScale.map((group) => (
            <div key={group.category}>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--v-muted-foreground)]">
                {group.category}
              </p>
              <div className="overflow-hidden rounded-lg border border-[var(--v-border)]">
                <VTable
                  rowKey="name"
                  data={group.items}
                  columns={[
                    {
                      key: "name",
                      title: "Name",
                      width: 120,
                      render: (v) => <StorybookTokenName>{String(v)}</StorybookTokenName>,
                    },
                    {
                      key: "sizeVar",
                      title: "Size",
                      width: 70,
                      render: (v) => <StorybookCssVar name={String(v)} />,
                    },
                    {
                      key: "weightVar",
                      title: "Weight",
                      width: 70,
                      render: (v) => <StorybookCssVar name={String(v)} />,
                    },
                    {
                      key: "lhVar",
                      title: "LH",
                      width: 50,
                      render: (v) => <StorybookCssVar name={String(v)} />,
                    },
                    {
                      key: "lsVar",
                      title: "LS",
                      width: 60,
                      render: (v) => <StorybookCssVar name={String(v)} />,
                    },
                    {
                      key: "preview",
                      title: "Preview",
                      render: (_v, t) => (
                        <span
                          className="text-[var(--v-foreground)] block truncate"
                          style={{
                            fontSize: `var(${t.sizeVar})`,
                            fontWeight: `var(${t.weightVar})`,
                            lineHeight: `var(${t.lhVar})`,
                            letterSpacing: `var(${t.lsVar})`,
                          }}
                        >
                          The quick brown fox
                        </span>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          ))}
        </div>
      </StorybookSection>

      {/* 3. Usage Guidelines (Semantic Role based) */}
      <StorybookUsageGuidelines
        subtitle="Choose typography by Semantic Role for cross-platform consistency."
        headers={["Role", "Name", "When to use", "Examples"]}
        rows={[
          {
            category: "page-title",
            name: "h1",
            guideline: "Main page heading",
            examples: "Dashboard title, settings page title",
          },
          {
            category: "section-title",
            name: "h2",
            guideline: "Section headings",
            examples: "Form group title, sidebar section",
          },
          {
            category: "subsection-title",
            name: "h3",
            guideline: "Subsection headings",
            examples: "Card group header, filter group",
          },
          {
            category: "card-title",
            name: "h4",
            guideline: "Card / dialog titles",
            examples: "Card heading, dialog title, panel title",
          },
          {
            category: "subtitle",
            name: "h5",
            guideline: "List item titles",
            examples: "List item heading, tab label, nav item",
          },
          {
            category: "compact-title",
            name: "h6",
            guideline: "Compact section titles",
            examples: "Sidebar item, breadcrumb, tag label",
          },
          {
            category: "body-primary",
            name: "body-lg",
            guideline: "Primary body text",
            examples: "Article paragraph, description block",
          },
          {
            category: "body-default",
            name: "body-md",
            guideline: "Default body text",
            examples: "List item text, form field value",
          },
          {
            category: "body-secondary",
            name: "body-sm",
            guideline: "Secondary text",
            examples: "Help text, timestamp, secondary info",
          },
          {
            category: "ui-label",
            name: "overline",
            guideline: "UI labels",
            examples: "Button text, form label, chip label",
          },
          {
            category: "ui-caption",
            name: "caption",
            guideline: "Captions, helper text",
            examples: "Image caption, input helper, badge text",
          },
          {
            category: "ui-small",
            name: "small",
            guideline: "Smallest text",
            examples: "Footnote, legal text, version number",
          },
          {
            category: "hero-display",
            name: "display-lg",
            guideline: "Hero / marketing",
            examples: "Landing hero, splash screen, promo banner",
          },
          {
            category: "hero-secondary",
            name: "display-md",
            guideline: "Secondary hero",
            examples: "Feature highlight, stat number",
          },
          {
            category: "hero-tertiary",
            name: "display-sm",
            guideline: "Tertiary hero",
            examples: "Onboarding title, modal hero",
          },
        ]}
      />
    </StorybookPageLayout>
  ),
};
