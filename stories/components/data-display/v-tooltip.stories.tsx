import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VTooltip, VButton, VLabel } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const DemoButton = ({ children }: { children: React.ReactNode }) => (
  <VButton variant="outlined" size="sm">
    {children}
  </VButton>
);

const meta: Meta<typeof VTooltip> = {
  title: "Components/Data Display/VTooltip",
  component: VTooltip,
  tags: ["autodocs"],
  args: {
    message: "Tooltip text",
    position: "top",
    waitDuration: 500,
    showDuration: 1500,
  },
  parameters: { controls: { sort: "none" } },
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
      title="VTooltip"
      description="Displays informational text on hover or focus relative to its trigger element."
    >
      <StorybookSection title="Placement">
        <StorybookSubsection title="top" labels={['VTooltip position="top"']}>
          <VTooltip message="Top tooltip" position="top">
            <DemoButton>Top</DemoButton>
          </VTooltip>
        </StorybookSubsection>
        <StorybookSubsection title="bottom" labels={['VTooltip position="bottom"']}>
          <VTooltip message="Bottom tooltip" position="bottom">
            <DemoButton>Bottom</DemoButton>
          </VTooltip>
        </StorybookSubsection>
        <StorybookSubsection title="left" labels={['VTooltip position="left"']}>
          <VTooltip message="Left tooltip" position="left">
            <DemoButton>Left</DemoButton>
          </VTooltip>
        </StorybookSubsection>
        <StorybookSubsection title="right" labels={['VTooltip position="right"']}>
          <VTooltip message="Right tooltip" position="right">
            <DemoButton>Right</DemoButton>
          </VTooltip>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Delay">
        <StorybookSubsection title="instant (0ms)" labels={["VTooltip waitDuration={0}"]}>
          <VTooltip message="Shows instantly" waitDuration={0}>
            <DemoButton>No Delay</DemoButton>
          </VTooltip>
        </StorybookSubsection>
        <StorybookSubsection title="default (200ms)" labels={["VTooltip waitDuration={200}"]}>
          <VTooltip message="Shows after 200ms" waitDuration={200}>
            <DemoButton>Default Delay</DemoButton>
          </VTooltip>
        </StorybookSubsection>
        <StorybookSubsection title="slow (500ms)" labels={["VTooltip waitDuration={500}"]}>
          <VTooltip message="Shows after 500ms" waitDuration={500}>
            <DemoButton>Slow Delay</DemoButton>
          </VTooltip>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Content Types">
        <StorybookSubsection title="short text" labels={['VTooltip message="Save"']}>
          <VTooltip message="Save">
            <DemoButton>Hover me</DemoButton>
          </VTooltip>
        </StorybookSubsection>
        <StorybookSubsection title="long text" labels={['VTooltip message="..."']}>
          <VTooltip message="Clicking this button will save all your current changes to the server.">
            <DemoButton>Hover me</DemoButton>
          </VTooltip>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Provide brief supplementary information for icon-only buttons, truncated labels, or controls needing extra context.",
          },
          {
            category: "When not to use",
            guideline:
              "For critical information that must be visible at all times. Use inline text or VAlert instead.",
          },
          {
            category: "Accessibility",
            guideline:
              "Tooltips should supplement, not replace, visible labels. Always provide aria-label on icon-only triggers.",
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
      title="VTooltip Samples"
      description="Copy-paste code examples for VTooltip."
    >
      <StorybookCodeBlock
        title="Basic tooltip"
        code={`<VTooltip message="Save">
  <VButton>Save</VButton>
</VTooltip>`}
        preview={
          <VTooltip message="Save">
            <DemoButton>Save</DemoButton>
          </VTooltip>
        }
      />
      <StorybookCodeBlock
        title="Placement bottom"
        code={`<VTooltip message="Shows below" position="bottom">
  <VButton>Bottom tooltip</VButton>
</VTooltip>`}
        preview={
          <VTooltip message="Shows below" position="bottom">
            <DemoButton>Bottom tooltip</DemoButton>
          </VTooltip>
        }
      />
      <StorybookCodeBlock
        title="Icon button with tooltip"
        code={`<VTooltip message="Delete">
  <VButton aria-label="Delete">
    <TrashIcon />
  </VButton>
</VTooltip>`}
        preview={
          <VTooltip message="Delete">
            <VButton variant="outlined" size="sm" aria-label="Delete">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M2 4h12M5.33 4V2.67a1.33 1.33 0 011.34-1.34h2.66a1.33 1.33 0 011.34 1.34V4M12.67 4v9.33a1.33 1.33 0 01-1.34 1.34H4.67a1.33 1.33 0 01-1.34-1.34V4" />
              </svg>
            </VButton>
          </VTooltip>
        }
      />
      <StorybookCodeBlock
        title="No delay tooltip"
        code={`<VTooltip message="Instant tooltip" waitDuration={0}>
  <VButton>Instant</VButton>
</VTooltip>`}
        preview={
          <VTooltip message="Instant tooltip" waitDuration={0}>
            <DemoButton>Instant</DemoButton>
          </VTooltip>
        }
      />
      <StorybookCodeBlock
        title="Toolbar icon group"
        code={`<div className="flex gap-1">
  <VTooltip message="Bold"><VButton>B</VButton></VTooltip>
  <VTooltip message="Italic"><VButton>I</VButton></VTooltip>
  <VTooltip message="Underline"><VButton>U</VButton></VTooltip>
</div>`}
        preview={
          <div className="flex gap-1">
            <VTooltip message="Bold">
              <VButton variant="outlined" size="sm">
                B
              </VButton>
            </VTooltip>
            <VTooltip message="Italic">
              <VButton variant="outlined" size="sm">
                I
              </VButton>
            </VTooltip>
            <VTooltip message="Underline">
              <VButton variant="outlined" size="sm">
                U
              </VButton>
            </VTooltip>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Truncated text tooltip"
        code={`<VTooltip message="This is the full text that was too long to display in the available space">
  <p style={{
    maxWidth: 180,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }}>
    This is the full text that was too long to display in the available space
  </p>
</VTooltip>`}
        preview={
          <VTooltip message="This is the full text that was too long to display in the available space">
            <p
              style={{
                maxWidth: 180,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                margin: 0,
                fontSize: "0.875rem",
                color: "var(--v-foreground)",
                cursor: "default",
              }}
            >
              This is the full text that was too long to display in the available space
            </p>
          </VTooltip>
        }
      />
      <StorybookCodeBlock
        title="Form field tooltip"
        code={`<div className="flex items-center gap-1">
  <VLabel>Password</VLabel>
  <VTooltip message="Must be at least 8 characters with one number">
    <span style={{ cursor: 'help', color: 'var(--v-muted-foreground)' }}>ⓘ</span>
  </VTooltip>
</div>`}
        preview={
          <div className="flex items-center gap-1">
            <VLabel style={{ fontSize: "0.875rem", color: "var(--v-foreground)" }}>Password</VLabel>
            <VTooltip message="Must be at least 8 characters with one number">
              <span
                style={{ cursor: "help", color: "var(--v-muted-foreground)", fontSize: "0.875rem" }}
              >
                ⓘ
              </span>
            </VTooltip>
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
