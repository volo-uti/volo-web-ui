import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VSheet } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VSheet> = {
  title: "Components/Surfaces/VSheet",
  component: VSheet,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    variant: "filled",
    children: "Sheet content",
  },
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
      title="VSheet"
      description="A generic surface container with minimal styling, more lightweight than VCard."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="filled" labels={['VSheet(variant="filled")']}>
          <VSheet variant="filled" className="p-6 w-64">
            <p className="text-sm">Filled sheet with background color.</p>
          </VSheet>
        </StorybookSubsection>
        <StorybookSubsection title="outlined" labels={['VSheet(variant="outlined")']}>
          <VSheet variant="outlined" className="p-6 w-64">
            <p className="text-sm">Outlined sheet with border.</p>
          </VSheet>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="All Variants Comparison">
        <StorybookSubsection title="side by side" labels={["filled", "outlined"]}>
          {(["filled", "outlined"] as const).map((v) => (
            <VSheet key={v} variant={v} className="p-6 w-56">
              <h3 className="text-base font-semibold mb-1 capitalize">{v}</h3>
              <p className="text-sm text-[var(--v-muted-foreground)]">variant=&quot;{v}&quot;</p>
            </VSheet>
          ))}
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Lightweight background container for layout sections",
          },
          {
            category: "Filled",
            guideline: "Use for subtle background grouping without strong borders",
          },
          {
            category: "Outlined",
            guideline: "Use for visually distinct sections with border separation",
          },
          {
            category: "vs VCard",
            guideline: "Prefer VSheet for layout wrappers; VCard for content cards",
          },
          {
            category: "Polymorphic",
            guideline: 'Use as="section" or as="aside" for semantic HTML',
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
      title="VSheet Samples"
      description="Copy-paste code examples for common sheet patterns."
    >
      <StorybookCodeBlock
        title="Basic usage"
        code={`<VSheet variant="filled" className="p-6">
  <p>Sheet content</p>
</VSheet>`}
        preview={
          <VSheet variant="filled" className="p-6">
            <p className="text-sm">Sheet content</p>
          </VSheet>
        }
      />
      <StorybookCodeBlock
        title="Outlined sheet"
        code={`<VSheet variant="outlined" className="p-6">
  <h3>Outlined Sheet</h3>
  <p>Sheet with border styling.</p>
</VSheet>`}
        preview={
          <VSheet variant="outlined" className="p-6">
            <h3 className="text-lg font-semibold mb-2">Outlined Sheet</h3>
            <p className="text-sm text-[var(--v-muted-foreground)]">Sheet with border styling.</p>
          </VSheet>
        }
      />
      <StorybookCodeBlock
        title="Nested sheets"
        code={`<VSheet variant="outlined" className="p-6">
  <VSheet variant="filled" className="p-4">
    Inner sheet
  </VSheet>
</VSheet>`}
        preview={
          <VSheet variant="outlined" className="p-6">
            <h3 className="text-sm font-semibold mb-3">Outer Sheet</h3>
            <VSheet variant="filled" className="p-4">
              <p className="text-sm text-[var(--v-muted-foreground)]">Inner sheet</p>
            </VSheet>
          </VSheet>
        }
      />
      <StorybookCodeBlock
        title="Polymorphic sheet"
        code={`<VSheet as="aside" aria-label="Side note" variant="outlined" className="p-6">
  <p>Renders as aside element.</p>
</VSheet>`}
        preview={
          <VSheet as="aside" aria-label="Side note" variant="outlined" className="p-6">
            <p className="text-sm text-[var(--v-muted-foreground)]">Renders as aside element.</p>
          </VSheet>
        }
      />
      <StorybookCodeBlock
        title="Page container"
        code={`<VSheet as="main" variant="filled" className="p-8 max-w-3xl mx-auto">
  <h1 className="text-2xl font-bold mb-4">Page Title</h1>
  <p>Main content area wrapped in a VSheet for consistent background styling.</p>
</VSheet>`}
        preview={
          <VSheet as="main" variant="filled" className="p-8">
            <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--v-foreground)" }}>
              Page Title
            </h1>
            <p className="text-sm text-[var(--v-muted-foreground)]">
              Main content area wrapped in a VSheet for consistent background styling.
            </p>
          </VSheet>
        }
      />
      <StorybookCodeBlock
        title="Sidebar panel"
        code={`<div className="flex gap-4">
  <VSheet as="aside" aria-label="Sidebar" variant="outlined" className="w-48 p-4">
    <h3 className="font-semibold mb-3">Navigation</h3>
    <ul className="space-y-2 text-sm">
      <li>Dashboard</li>
      <li>Settings</li>
      <li>Profile</li>
    </ul>
  </VSheet>
  <VSheet variant="filled" className="flex-1 p-4">
    <p>Main content area</p>
  </VSheet>
</div>`}
        preview={
          <div className="flex gap-4 w-full">
            <VSheet as="aside" aria-label="Sidebar" variant="outlined" className="w-48 p-4">
              <h3 className="font-semibold mb-3 text-sm" style={{ color: "var(--v-foreground)" }}>
                Navigation
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "var(--v-muted-foreground)" }}>
                <li>Dashboard</li>
                <li>Settings</li>
                <li>Profile</li>
              </ul>
            </VSheet>
            <VSheet variant="filled" className="flex-1 p-4">
              <p className="text-sm text-[var(--v-muted-foreground)]">Main content area</p>
            </VSheet>
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
