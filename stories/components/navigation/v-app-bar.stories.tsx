import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VAppBar, VTextField, VIconButton, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VAppBar> = {
  title: "Components/Navigation/VAppBar",
  component: VAppBar,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    variant: "default",
    title: "Page Title",
    sticky: false,
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
      title="VAppBar"
      description="Top app bar for title, navigation, and actions."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="default" labels={['VAppBar(variant="default")']}>
          <div className="w-full">
            <VAppBar role="group" title="Default App Bar" variant="default" />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="transparent" labels={['VAppBar(variant="transparent")']}>
          <div className="w-full">
            <VAppBar role="group" title="Transparent App Bar" variant="transparent" />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="elevated" labels={['VAppBar(variant="elevated")']}>
          <div className="w-full">
            <VAppBar role="group" title="Elevated App Bar" variant="elevated" />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="centered" labels={['VAppBar(variant="centered")']}>
          <div className="w-full">
            <VAppBar role="group" title="Centered App Bar" variant="centered" />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="With Leading">
        <StorybookSubsection title="leading" labels={["VAppBar(leading)"]}>
          <div className="w-full">
            <VAppBar
              role="group"
              title="App Bar with Leading"
              leading={
                <VButton variant="text" size="sm">
                  Back
                </VButton>
              }
            />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Provide consistent top-level navigation with title and actions",
          },
          { category: "Default", guideline: "Standard app bar with solid background" },
          { category: "Transparent", guideline: "Use for hero sections or overlay content" },
          { category: "Elevated", guideline: "Use when visual separation from content is needed" },
          { category: "Sticky", guideline: "Keep the app bar visible while scrolling (web only)" },
        ]}
      />
    </StorybookPageLayout>
  ),
};

// ─── Sample ───
export const Sample: Story = {
  tags: ["!autodocs"],
  render: () => (
    <StorybookPageLayout title="VAppBar Samples" description="Copy-paste code examples.">
      <StorybookCodeBlock
        title="Basic usage"
        code={`<VAppBar title="Page Title" />`}
        preview={<VAppBar role="group" title="Page Title" />}
      />
      <StorybookCodeBlock
        title="With actions"
        code={`<VAppBar
  title="My App"
  actions={
    <>
      <VButton>Search</VButton>
      <VButton>Menu</VButton>
    </>
  }
/>`}
        preview={
          <VAppBar
            role="group"
            title="My App"
            actions={
              <>
                <VButton variant="text" size="sm">
                  Search
                </VButton>
                <VButton variant="text" size="sm">
                  Menu
                </VButton>
              </>
            }
          />
        }
      />
      <StorybookCodeBlock
        title="Centered title"
        code={`<VAppBar title="Centered" variant="centered" />`}
        preview={<VAppBar role="group" title="Centered" variant="centered" />}
      />
      <StorybookCodeBlock
        title="Search app bar"
        code={`<VAppBar
  title="My App"
  actions={
    <VTextField
      placeholder="Search..."
      size="sm"
      style={{ width: '200px' }}
    />
  }
/>`}
        preview={
          <VAppBar
            role="group"
            title="My App"
            actions={<VTextField placeholder="Search..." size="sm" style={{ width: "200px" }} />}
          />
        }
      />
      <StorybookCodeBlock
        title="Back navigation"
        code={`<VAppBar
  title="Product Detail"
  leading={
    <VIconButton
      variant="default"
      size="sm"
      aria-label="Back"
      onClick={() => navigate(-1)}
    >
      ←
    </VIconButton>
  }
  actions={
    <VIconButton variant="default" size="sm" aria-label="Share" onClick={() => share()}>
      ↗
    </VIconButton>
  }
/>`}
        preview={
          <VAppBar
            role="group"
            title="Product Detail"
            leading={
              <VIconButton variant="default" size="sm" aria-label="Icon button">
                ←
              </VIconButton>
            }
            actions={
              <VIconButton variant="default" size="sm" aria-label="Icon button">
                ↗
              </VIconButton>
            }
          />
        }
      />
    </StorybookPageLayout>
  ),
};
