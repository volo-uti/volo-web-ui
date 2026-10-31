import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VHoverCard, VAvatar, VLink } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

// The default trigger of VHoverCard is already a button, so the demo trigger is plain text styled
// like one. A real button or link goes in with `asChild`, which renders no wrapper.
const DemoButton = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      display: "inline-block",
      padding: "4px 12px",
      border: "1px solid var(--v-border)",
      borderRadius: "var(--v-radius-md)",
      fontSize: "0.8125rem",
      color: "var(--v-foreground)",
      cursor: "pointer",
    }}
  >
    {children}
  </span>
);

const meta: Meta<typeof VHoverCard> = {
  title: "Components/Data Display/VHoverCard",
  component: VHoverCard,
  tags: ["autodocs"],
  args: {
    children: "Hover me",
    content: "Hover card content goes here.",
    position: "bottom",
    disabled: false,
    openDelay: 700,
    closeDelay: 300,
  },
  parameters: { controls: { sort: "none" } },
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
      title="VHoverCard"
      description="Displays rich content on hover for previewing information."
    >
      <StorybookSection title="Positions (Basic)">
        <StorybookSubsection title="top" labels={['VHoverCard position="top"']}>
          <VHoverCard position="top" content="Card appears above the trigger.">
            <DemoButton>Top</DemoButton>
          </VHoverCard>
        </StorybookSubsection>
        <StorybookSubsection title="bottom" labels={['VHoverCard position="bottom"']}>
          <VHoverCard position="bottom" content="Card appears below the trigger.">
            <DemoButton>Bottom</DemoButton>
          </VHoverCard>
        </StorybookSubsection>
        <StorybookSubsection title="left" labels={['VHoverCard position="left"']}>
          <VHoverCard position="left" content="Card appears to the left.">
            <DemoButton>Left</DemoButton>
          </VHoverCard>
        </StorybookSubsection>
        <StorybookSubsection title="right" labels={['VHoverCard position="right"']}>
          <VHoverCard position="right" content="Card appears to the right.">
            <DemoButton>Right</DemoButton>
          </VHoverCard>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Usage">
        <StorybookSubsection title="user mention" labels={["VHoverCard content={<UserCard />}"]}>
          <VHoverCard
            content={
              <div>
                <p style={{ fontWeight: 600, color: "var(--v-popover-foreground)" }}>John Doe</p>
                <p style={{ fontSize: "0.875rem", color: "var(--v-muted-foreground)" }}>@johndoe</p>
              </div>
            }
          >
            <span style={{ color: "var(--v-primary)", cursor: "pointer" }}>@johndoe</span>
          </VHoverCard>
        </StorybookSubsection>
        <StorybookSubsection title="info icon" labels={['VHoverCard content="..."']}>
          <VHoverCard content="This is a helpful description that provides additional context.">
            <span style={{ cursor: "pointer", fontSize: "16px" }}>&#9432;</span>
          </VHoverCard>
        </StorybookSubsection>
        <StorybookSubsection title="with link" labels={["VHoverCard content={<LinkPreview />}"]}>
          <VHoverCard
            asChild
            content={
              <div>
                <p style={{ fontWeight: 600, color: "var(--v-popover-foreground)" }}>
                  Documentation
                </p>
                <p style={{ fontSize: "0.875rem", color: "var(--v-muted-foreground)" }}>
                  Learn more about this feature
                </p>
              </div>
            }
          >
            <VLink href="#docs">Learn more</VLink>
          </VHoverCard>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Preview additional information about a link, user, or resource without navigating away.",
          },
          {
            category: "When not to use",
            guideline:
              "For brief label text. Use VTooltip instead. For interactive content, use VPopover.",
          },
          {
            category: "Accessibility",
            guideline:
              "Hover cards are not accessible on touch devices. Provide alternative navigation for critical content.",
          },
          {
            category: "Timing",
            guideline: "Adjust hover delay based on content complexity",
          },
          {
            category: "Mobile",
            guideline: "Consider tap-based alternatives for touch devices",
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
      title="VHoverCard Samples"
      description="Copy-paste code examples for VHoverCard."
    >
      <StorybookCodeBlock
        title="Basic usage"
        code={`<VHoverCard
  content={
    <div>
      <p style={{ fontWeight: 600 }}>John Doe</p>
      <p style={{ fontSize: '0.875rem', color: 'var(--v-muted-foreground)' }}>@johndoe</p>
    </div>
  }
>
  <span style={{ color: 'var(--v-primary)' }}>@johndoe</span>
</VHoverCard>`}
        preview={
          <VHoverCard
            content={
              <div>
                <p style={{ fontWeight: 600, color: "var(--v-popover-foreground)" }}>John Doe</p>
                <p style={{ fontSize: "0.875rem", color: "var(--v-muted-foreground)" }}>@johndoe</p>
              </div>
            }
          >
            <span style={{ color: "var(--v-primary)", cursor: "pointer" }}>@johndoe</span>
          </VHoverCard>
        }
      />
      <StorybookCodeBlock
        title="Position"
        code={`<VHoverCard position="right" content="Additional information">
  <span>Hover me</span>
</VHoverCard>`}
        preview={
          <VHoverCard position="right" content="Additional information">
            <DemoButton>Hover me</DemoButton>
          </VHoverCard>
        }
      />
      <StorybookCodeBlock
        title="Delay settings"
        code={`<VHoverCard openDelay={500} closeDelay={200} content="Quick preview">
  <span>Hover me</span>
</VHoverCard>`}
        preview={
          <VHoverCard openDelay={500} closeDelay={200} content="Quick preview content">
            <DemoButton>Hover me</DemoButton>
          </VHoverCard>
        }
      />
      <StorybookCodeBlock
        title="User profile preview"
        code={`<VHoverCard
  content={
    <div className="flex items-start gap-3" style={{ minWidth: 240 }}>
      <VAvatar src="/avatar.jpg" alt="Sarah Kim" />
      <div>
        <p style={{ fontWeight: 600, margin: 0 }}>Sarah Kim</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--v-muted-foreground)', margin: '2px 0 6px' }}>@sarahkim</p>
        <p style={{ fontSize: '0.8125rem', margin: 0 }}>
          Design lead at Acme. Passionate about accessible UI.
        </p>
      </div>
    </div>
  }
>
  <span style={{ color: 'var(--v-primary)' }}>@sarahkim</span>
</VHoverCard>`}
        preview={
          <VHoverCard
            content={
              <div className="flex items-start gap-3" style={{ minWidth: 240 }}>
                <VAvatar src="https://i.pravatar.cc/80?img=12" alt="Sarah Kim" />
                <div>
                  <p style={{ fontWeight: 600, margin: 0, color: "var(--v-popover-foreground)" }}>
                    Sarah Kim
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--v-muted-foreground)",
                      margin: "2px 0 6px",
                    }}
                  >
                    @sarahkim
                  </p>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      margin: 0,
                      color: "var(--v-popover-foreground)",
                    }}
                  >
                    Design lead at Acme. Passionate about accessible UI.
                  </p>
                </div>
              </div>
            }
          >
            <span style={{ color: "var(--v-primary)", cursor: "pointer" }}>@sarahkim</span>
          </VHoverCard>
        }
      />
      <StorybookCodeBlock
        title="Link preview"
        code={`<VHoverCard
  asChild
  content={
    <div style={{ maxWidth: 280 }}>
      <p style={{ fontWeight: 600, margin: '0 0 4px' }}>Getting Started with Volo Web UI</p>
      <p style={{ fontSize: '0.8125rem', color: 'var(--v-muted-foreground)', margin: '0 0 6px' }}>
        Learn how to install and configure Volo Web UI components in your project.
      </p>
      <span style={{ fontSize: '0.75rem', color: 'var(--v-muted-foreground)' }}>docs.volo.dev</span>
    </div>
  }
>
  <VLink href="#">docs.volo.dev/getting-started</VLink>
</VHoverCard>`}
        preview={
          <VHoverCard
            asChild
            content={
              <div style={{ maxWidth: 280 }}>
                <p
                  style={{
                    fontWeight: 600,
                    margin: "0 0 4px",
                    color: "var(--v-popover-foreground)",
                  }}
                >
                  Getting Started with Volo Web UI
                </p>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--v-muted-foreground)",
                    margin: "0 0 6px",
                  }}
                >
                  Learn how to install and configure Volo Web UI components in your project.
                </p>
                <span style={{ fontSize: "0.75rem", color: "var(--v-muted-foreground)" }}>
                  docs.volo.dev
                </span>
              </div>
            }
          >
            <VLink href="#getting-started">docs.volo.dev/getting-started</VLink>
          </VHoverCard>
        }
      />
    </StorybookPageLayout>
  ),
};
