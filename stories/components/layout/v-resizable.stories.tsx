import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VResizable, VResizablePanel, VResizableHandle } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const Pane = ({
  children,
  color = "var(--v-muted)",
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <div
    style={{
      padding: "24px",
      backgroundColor: color,
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);

const Frame = ({ height, children }: { height: number; children: React.ReactNode }) => (
  <div
    style={{
      height,
      border: "1px solid var(--v-border)",
      borderRadius: "var(--v-radius-md)",
    }}
  >
    {children}
  </div>
);

const meta: Meta<typeof VResizable> = {
  title: "Components/Layout/VResizable",
  component: VResizable,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    direction: "horizontal",
  },
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
      title="VResizable"
      description="Panels split by draggable handles; arrow keys resize the focused handle."
    >
      <StorybookSection title="Directions">
        <StorybookSubsection title="horizontal" labels={['direction="horizontal"']}>
          <Frame height={200}>
            <VResizable direction="horizontal">
              <VResizablePanel defaultSize={0.4}>
                <Pane>Left</Pane>
              </VResizablePanel>
              <VResizableHandle />
              <VResizablePanel defaultSize={0.6}>
                <Pane>Right</Pane>
              </VResizablePanel>
            </VResizable>
          </Frame>
        </StorybookSubsection>
        <StorybookSubsection title="vertical" labels={['direction="vertical"']}>
          <Frame height={300}>
            <VResizable direction="vertical">
              <VResizablePanel defaultSize={0.5}>
                <Pane>Top</Pane>
              </VResizablePanel>
              <VResizableHandle />
              <VResizablePanel defaultSize={0.5}>
                <Pane>Bottom</Pane>
              </VResizablePanel>
            </VResizable>
          </Frame>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Layouts">
        <StorybookSubsection title="three panels" labels={["3 panels, 2 handles"]}>
          <Frame height={200}>
            <VResizable direction="horizontal">
              <VResizablePanel defaultSize={0.25}>
                <Pane>Left</Pane>
              </VResizablePanel>
              <VResizableHandle />
              <VResizablePanel defaultSize={0.5}>
                <Pane>Center</Pane>
              </VResizablePanel>
              <VResizableHandle />
              <VResizablePanel defaultSize={0.25}>
                <Pane>Right</Pane>
              </VResizablePanel>
            </VResizable>
          </Frame>
        </StorybookSubsection>
        <StorybookSubsection title="nested" labels={["group inside a panel"]}>
          <Frame height={300}>
            <VResizable direction="horizontal">
              <VResizablePanel defaultSize={0.3}>
                <Pane>Sidebar</Pane>
              </VResizablePanel>
              <VResizableHandle />
              <VResizablePanel defaultSize={0.7}>
                <VResizable direction="vertical">
                  <VResizablePanel defaultSize={0.6}>
                    <Pane color="var(--v-card)">Editor</Pane>
                  </VResizablePanel>
                  <VResizableHandle />
                  <VResizablePanel defaultSize={0.4}>
                    <Pane>Terminal</Pane>
                  </VResizablePanel>
                </VResizable>
              </VResizablePanel>
            </VResizable>
          </Frame>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "IDE-like layouts, split views, adjustable sidebars, comparison panels",
          },
          {
            category: "Direction",
            guideline: "Horizontal for side-by-side. Vertical for top/bottom split",
          },
          {
            category: "Constraints",
            guideline: "Set minSize on a panel to keep it from shrinking too small",
          },
          {
            category: "Keyboard",
            guideline:
              "Focus a handle and use the arrow keys; double-click collapses a collapsible panel",
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
    <StorybookPageLayout title="VResizable Samples" description="Copy-paste code examples.">
      <StorybookCodeBlock
        title="Basic horizontal split"
        code={`<VResizable direction="horizontal">
  <VResizablePanel defaultSize={0.3}>Sidebar</VResizablePanel>
  <VResizableHandle />
  <VResizablePanel defaultSize={0.7}>Content</VResizablePanel>
</VResizable>`}
        preview={
          <Frame height={200}>
            <VResizable direction="horizontal">
              <VResizablePanel defaultSize={0.3}>
                <Pane>Sidebar</Pane>
              </VResizablePanel>
              <VResizableHandle />
              <VResizablePanel defaultSize={0.7}>
                <Pane color="var(--v-card)">Content</Pane>
              </VResizablePanel>
            </VResizable>
          </Frame>
        }
      />
      <StorybookCodeBlock
        title="Vertical split"
        code={`<VResizable direction="vertical">
  <VResizablePanel defaultSize={0.6}>Editor</VResizablePanel>
  <VResizableHandle />
  <VResizablePanel defaultSize={0.4}>Terminal</VResizablePanel>
</VResizable>`}
        preview={
          <Frame height={250}>
            <VResizable direction="vertical">
              <VResizablePanel defaultSize={0.6}>
                <Pane color="var(--v-card)">Editor</Pane>
              </VResizablePanel>
              <VResizableHandle />
              <VResizablePanel defaultSize={0.4}>
                <Pane>Terminal</Pane>
              </VResizablePanel>
            </VResizable>
          </Frame>
        }
      />
      <StorybookCodeBlock
        title="Size constraints"
        code={`<VResizable direction="horizontal">
  <VResizablePanel defaultSize={0.3} minSize={0.2} maxSize={0.5}>Between 20% and 50%</VResizablePanel>
  <VResizableHandle />
  <VResizablePanel defaultSize={0.7}>Rest</VResizablePanel>
</VResizable>`}
        preview={
          <Frame height={200}>
            <VResizable direction="horizontal">
              <VResizablePanel defaultSize={0.3} minSize={0.2} maxSize={0.5}>
                <Pane>Between 20% and 50%</Pane>
              </VResizablePanel>
              <VResizableHandle />
              <VResizablePanel defaultSize={0.7}>
                <Pane color="var(--v-card)">Rest</Pane>
              </VResizablePanel>
            </VResizable>
          </Frame>
        }
      />
      <StorybookCodeBlock
        title="Collapsible panel"
        code={`<VResizable direction="horizontal" onValueChange={(sizes) => console.log(sizes)}>
  <VResizablePanel defaultSize={0.3} collapsible collapsedSize={0}>Sidebar</VResizablePanel>
  <VResizableHandle />
  <VResizablePanel defaultSize={0.7}>Content</VResizablePanel>
</VResizable>`}
        preview={
          <Frame height={200}>
            <VResizable direction="horizontal">
              <VResizablePanel defaultSize={0.3} collapsible collapsedSize={0}>
                <Pane>Double-click the handle</Pane>
              </VResizablePanel>
              <VResizableHandle />
              <VResizablePanel defaultSize={0.7}>
                <Pane color="var(--v-card)">Content</Pane>
              </VResizablePanel>
            </VResizable>
          </Frame>
        }
      />
      <StorybookCodeBlock
        title="Handle without grip"
        code={`<VResizableHandle withHandle={false} />`}
        preview={
          <Frame height={120}>
            <VResizable direction="horizontal">
              <VResizablePanel defaultSize={0.5}>
                <Pane>A</Pane>
              </VResizablePanel>
              <VResizableHandle withHandle={false} />
              <VResizablePanel defaultSize={0.5}>
                <Pane color="var(--v-card)">B</Pane>
              </VResizablePanel>
            </VResizable>
          </Frame>
        }
      />
    </StorybookPageLayout>
  ),
};
