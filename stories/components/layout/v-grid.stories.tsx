import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VGrid, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "24px",
      backgroundColor: "var(--v-muted)",
      borderRadius: "var(--v-radius-md)",
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

const meta: Meta<typeof VGrid> = {
  title: "Components/Layout/VGrid",
  component: VGrid,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {},
};
export default meta;

// ─── Primary (hidden from sidebar, powers Docs controls) ───
export const Default: Story = { tags: ["!dev"] };
type Story = StoryObj<typeof meta>;

// ─── Showcase ───
export const Showcase: Story = {
  tags: ["!autodocs"],
  render: () => (
    <StorybookPageLayout
      title="VGrid"
      description="A responsive grid layout with configurable columns and spacing."
    >
      <StorybookSection title="Types">
        <StorybookSubsection title="2 columns" labels={["columns={2}"]}>
          <VGrid columns={2} gap="12px">
            {Array.from({ length: 4 }, (_, i) => (
              <GridItem key={i}>Item {i + 1}</GridItem>
            ))}
          </VGrid>
        </StorybookSubsection>
        <StorybookSubsection title="3 columns" labels={["columns={3}"]}>
          <VGrid columns={3} gap="12px">
            {Array.from({ length: 6 }, (_, i) => (
              <GridItem key={i}>Item {i + 1}</GridItem>
            ))}
          </VGrid>
        </StorybookSubsection>
        <StorybookSubsection title="extent" labels={["minChildWidth={120}"]}>
          <VGrid minChildWidth={120} gap="md">
            {Array.from({ length: 6 }, (_, i) => (
              <GridItem key={i}>Item {i + 1}</GridItem>
            ))}
          </VGrid>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Aspect Ratio">
        <StorybookSubsection title="aspectRatio" labels={["aspectRatio={1.5}"]}>
          <VGrid columns={3} gap="12px" aspectRatio={1.5}>
            {Array.from({ length: 6 }, (_, i) => (
              <GridItem key={i}>{i + 1}</GridItem>
            ))}
          </VGrid>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Two-dimensional layouts: card grids, photo galleries, dashboard widgets",
          },
          {
            category: "Columns",
            guideline: "Set columns to match content density. 2 for wide items, 3-4 for cards",
          },
          {
            category: "Gap",
            guideline: "Use uniform gap for consistency. Use rowGap/colGap for asymmetric spacing",
          },
          {
            category: "vs Stack",
            guideline: "Grid for 2D layouts. Use Stack for single-axis arrangements",
          },
          {
            category: "aspectRatio",
            guideline: "Adjust item ratio with (1:1, 16:9, etc.)",
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
    <StorybookPageLayout title="VGrid Samples" description="Copy-paste code examples.">
      <StorybookCodeBlock
        title="Fixed column count"
        code={`<VGrid columns={2} gap="12px">
  <GridItem>Item 1</GridItem>
  <GridItem>Item 2</GridItem>
  <GridItem>Item 3</GridItem>
  <GridItem>Item 4</GridItem>
</VGrid>`}
        preview={
          <VGrid columns={2} gap="12px">
            {Array.from({ length: 4 }, (_, i) => (
              <GridItem key={i}>Item {i + 1}</GridItem>
            ))}
          </VGrid>
        }
      />
      <StorybookCodeBlock
        title="Three columns"
        code={`<VGrid columns={3} gap="8px">
  {items.map((item, i) => (
    <GridItem key={i}>{i + 1}</GridItem>
  ))}
</VGrid>`}
        preview={
          <VGrid columns={3} gap="8px">
            {Array.from({ length: 6 }, (_, i) => (
              <GridItem key={i}>{i + 1}</GridItem>
            ))}
          </VGrid>
        }
      />
      <StorybookCodeBlock
        title="Responsive card grid"
        code={`<VGrid columns={3} gap="16px">
  {products.map(p => (
    <VCard key={p.name}>
      <VCardHeader>{p.name}</VCardHeader>
      <div className="p-4 text-sm">{p.desc}</div>
      <VCardFooter>
        <VButton size="sm">Buy</VButton>
      </VCardFooter>
    </VCard>
  ))}
</VGrid>`}
        preview={
          <VGrid columns={3} gap="16px">
            {[
              { name: "Headphones", desc: "Wireless noise-cancelling" },
              { name: "Keyboard", desc: "Mechanical, RGB backlit" },
              { name: "Monitor", desc: '27" 4K IPS display' },
              { name: "Mouse", desc: "Ergonomic wireless" },
              { name: "Webcam", desc: "1080p HD with mic" },
              { name: "Speakers", desc: "Bluetooth 5.0 stereo" },
            ].map((p) => (
              <div
                key={p.name}
                style={{
                  border: "1px solid var(--v-border)",
                  borderRadius: "var(--v-radius-md)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "12px",
                    fontWeight: 500,
                    fontSize: "14px",
                    borderBottom: "1px solid var(--v-border)",
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{ padding: "12px", fontSize: "13px", color: "var(--v-muted-foreground)" }}
                >
                  {p.desc}
                </div>
                <div style={{ padding: "12px", borderTop: "1px solid var(--v-border)" }}>
                  <VButton variant="outlined" size="sm">
                    Buy
                  </VButton>
                </div>
              </div>
            ))}
          </VGrid>
        }
      />
      <StorybookCodeBlock
        title="Photo gallery"
        code={`<VGrid columns={4} gap="8px">
  {photos.map((color, i) => (
    <div key={i} style={{ backgroundColor: color, borderRadius: '8px' }} />
  ))}
</VGrid>`}
        preview={
          <VGrid columns={4} gap="8px">
            {[
              "#e74c3c",
              "#3498db",
              "#2ecc71",
              "#f39c12",
              "#9b59b6",
              "#1abc9c",
              "#e67e22",
              "#34495e",
            ].map((color, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: color,
                  borderRadius: "8px",
                  width: "100%",
                  aspectRatio: "1",
                  opacity: 0.8,
                }}
              />
            ))}
          </VGrid>
        }
      />
      <StorybookCodeBlock
        title="Dashboard layout"
        code={`<VGrid columns={3} gap="16px">
  <div style={{ gridColumn: 'span 2' }}>
    {/* Wide chart widget */}
  </div>
  <div>{/* Stats widget */}</div>
  <div>{/* Table widget */}</div>
  <div>{/* Activity widget */}</div>
  <div>{/* Quick actions */}</div>
</VGrid>`}
        preview={
          <VGrid columns={3} gap="12px">
            <div
              style={{
                gridColumn: "span 2",
                padding: "24px",
                backgroundColor: "var(--v-muted)",
                borderRadius: "var(--v-radius-md)",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              Revenue Chart (2 cols)
            </div>
            <div
              style={{
                padding: "24px",
                backgroundColor: "var(--v-muted)",
                borderRadius: "var(--v-radius-md)",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              Stats
            </div>
            <div
              style={{
                padding: "24px",
                backgroundColor: "var(--v-muted)",
                borderRadius: "var(--v-radius-md)",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              Users Table
            </div>
            <div
              style={{
                padding: "24px",
                backgroundColor: "var(--v-muted)",
                borderRadius: "var(--v-radius-md)",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              Activity Feed
            </div>
            <div
              style={{
                padding: "24px",
                backgroundColor: "var(--v-muted)",
                borderRadius: "var(--v-radius-md)",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              Quick Actions
            </div>
          </VGrid>
        }
      />
    </StorybookPageLayout>
  ),
};
