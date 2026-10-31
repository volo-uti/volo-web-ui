import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  VBreadcrumb,
  VBreadcrumbItem,
  VMenu,
  VMenuTrigger,
  VMenuContent,
  VMenuItem,
} from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VBreadcrumb> = {
  title: "Components/Navigation/VBreadcrumb",
  component: VBreadcrumb,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    separator: "/",
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
      title="VBreadcrumb"
      description="Hierarchical page navigation showing the current location within a site."
    >
      <StorybookSection title="Separator">
        <StorybookSubsection title="slash (default)" labels={['VBreadcrumb(separator="/")']}>
          <VBreadcrumb aria-label="Slash separator">
            <VBreadcrumbItem href="#">Home</VBreadcrumbItem>
            <VBreadcrumbItem href="#">Products</VBreadcrumbItem>
            <VBreadcrumbItem active>Detail</VBreadcrumbItem>
          </VBreadcrumb>
        </StorybookSubsection>
        <StorybookSubsection title="chevron" labels={['VBreadcrumb(separator=">")']}>
          <VBreadcrumb aria-label="Chevron separator" separator=">">
            <VBreadcrumbItem href="#">Home</VBreadcrumbItem>
            <VBreadcrumbItem href="#">Products</VBreadcrumbItem>
            <VBreadcrumbItem active>Detail</VBreadcrumbItem>
          </VBreadcrumb>
        </StorybookSubsection>
        <StorybookSubsection title="dash" labels={['VBreadcrumb(separator="-")']}>
          <VBreadcrumb aria-label="Dash separator" separator="-">
            <VBreadcrumbItem href="#">Home</VBreadcrumbItem>
            <VBreadcrumbItem href="#">Products</VBreadcrumbItem>
            <VBreadcrumbItem active>Detail</VBreadcrumbItem>
          </VBreadcrumb>
        </StorybookSubsection>
        <StorybookSubsection title="custom separator" labels={['VBreadcrumb(separator="~")']}>
          <VBreadcrumb aria-label="Custom separator" separator="~">
            <VBreadcrumbItem href="#">Home</VBreadcrumbItem>
            <VBreadcrumbItem href="#">Products</VBreadcrumbItem>
            <VBreadcrumbItem active>Detail</VBreadcrumbItem>
          </VBreadcrumb>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Active / Link States">
        <StorybookSubsection
          title="link and active items"
          labels={["VBreadcrumbItem(href)", "VBreadcrumbItem(active)"]}
        >
          <VBreadcrumb aria-label="Link and active items">
            <VBreadcrumbItem href="#">Home</VBreadcrumbItem>
            <VBreadcrumbItem href="#">Category</VBreadcrumbItem>
            <VBreadcrumbItem active>Current Page</VBreadcrumbItem>
          </VBreadcrumb>
        </StorybookSubsection>
        <StorybookSubsection title="single item" labels={["VBreadcrumbItem(active)"]}>
          <VBreadcrumb aria-label="Single item">
            <VBreadcrumbItem active>Home</VBreadcrumbItem>
          </VBreadcrumb>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Show page hierarchy in multi-level navigation structures",
          },
          {
            category: "Separator",
            guideline: 'Use "/" (default) or ">" for standard breadcrumb patterns',
          },
          {
            category: "Active item",
            guideline: "The last item should be active and non-clickable",
          },
          {
            category: "Accessibility",
            guideline: "Rendered in a nav element with aria-label='breadcrumb'",
          },
          {
            category: "Custom separator",
            guideline: "Any string or character can be used as a custom separator",
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
    <StorybookPageLayout title="VBreadcrumb Samples" description="Copy-paste code examples.">
      <StorybookCodeBlock
        title="Basic breadcrumbs"
        code={`<VBreadcrumb>
  <VBreadcrumbItem href="#">Home</VBreadcrumbItem>
  <VBreadcrumbItem href="#">Products</VBreadcrumbItem>
  <VBreadcrumbItem active>Detail</VBreadcrumbItem>
</VBreadcrumb>`}
        preview={
          <VBreadcrumb aria-label="Basic breadcrumbs">
            <VBreadcrumbItem href="#">Home</VBreadcrumbItem>
            <VBreadcrumbItem href="#">Products</VBreadcrumbItem>
            <VBreadcrumbItem active>Detail</VBreadcrumbItem>
          </VBreadcrumb>
        }
      />
      <StorybookCodeBlock
        title="Chevron separator"
        code={`<VBreadcrumb separator=">">
  <VBreadcrumbItem href="#">Home</VBreadcrumbItem>
  <VBreadcrumbItem href="#">Docs</VBreadcrumbItem>
  <VBreadcrumbItem active>Getting Started</VBreadcrumbItem>
</VBreadcrumb>`}
        preview={
          <VBreadcrumb aria-label="Chevron separator example" separator=">">
            <VBreadcrumbItem href="#">Home</VBreadcrumbItem>
            <VBreadcrumbItem href="#">Docs</VBreadcrumbItem>
            <VBreadcrumbItem active>Getting Started</VBreadcrumbItem>
          </VBreadcrumb>
        }
      />
      <StorybookCodeBlock
        title="Deep hierarchy"
        code={`<VBreadcrumb>
  <VBreadcrumbItem href="#">Home</VBreadcrumbItem>
  <VBreadcrumbItem href="#">Shop</VBreadcrumbItem>
  <VBreadcrumbItem href="#">Electronics</VBreadcrumbItem>
  <VBreadcrumbItem href="#">Phones</VBreadcrumbItem>
  <VBreadcrumbItem active>iPhone 15</VBreadcrumbItem>
</VBreadcrumb>`}
        preview={
          <VBreadcrumb aria-label="Deep hierarchy">
            <VBreadcrumbItem href="#">Home</VBreadcrumbItem>
            <VBreadcrumbItem href="#">Shop</VBreadcrumbItem>
            <VBreadcrumbItem href="#">Electronics</VBreadcrumbItem>
            <VBreadcrumbItem href="#">Phones</VBreadcrumbItem>
            <VBreadcrumbItem active>iPhone 15</VBreadcrumbItem>
          </VBreadcrumb>
        }
      />
      <StorybookCodeBlock
        title="Dashboard navigation"
        code={`<VBreadcrumb separator=">">
  <VBreadcrumbItem href="#">Dashboard</VBreadcrumbItem>
  <VBreadcrumbItem href="#">Settings</VBreadcrumbItem>
  <VBreadcrumbItem active>Profile</VBreadcrumbItem>
</VBreadcrumb>`}
        preview={
          <VBreadcrumb aria-label="Dashboard navigation" separator=">">
            <VBreadcrumbItem href="#">Dashboard</VBreadcrumbItem>
            <VBreadcrumbItem href="#">Settings</VBreadcrumbItem>
            <VBreadcrumbItem active>Profile</VBreadcrumbItem>
          </VBreadcrumb>
        }
      />
      <StorybookCodeBlock
        title="With dropdown"
        code={`<VBreadcrumb>
  <VBreadcrumbItem href="#">Home</VBreadcrumbItem>
  <VBreadcrumbItem>
    <VMenu>
      <VMenuTrigger>...</VMenuTrigger>
      <VMenuContent>
        <VMenuItem>Electronics</VMenuItem>
        <VMenuItem>Computers</VMenuItem>
        <VMenuItem>Laptops</VMenuItem>
      </VMenuContent>
    </VMenu>
  </VBreadcrumbItem>
  <VBreadcrumbItem href="#">MacBook Pro</VBreadcrumbItem>
  <VBreadcrumbItem active>16-inch</VBreadcrumbItem>
</VBreadcrumb>`}
        preview={
          <VBreadcrumb aria-label="With dropdown">
            <VBreadcrumbItem href="#">Home</VBreadcrumbItem>
            <VBreadcrumbItem>
              <VMenu>
                <VMenuTrigger className="text-sm cursor-pointer text-[var(--v-muted-foreground)] hover:text-[var(--v-foreground)]">
                  ...
                </VMenuTrigger>
                <VMenuContent>
                  <VMenuItem>Electronics</VMenuItem>
                  <VMenuItem>Computers</VMenuItem>
                  <VMenuItem>Laptops</VMenuItem>
                </VMenuContent>
              </VMenu>
            </VBreadcrumbItem>
            <VBreadcrumbItem href="#">MacBook Pro</VBreadcrumbItem>
            <VBreadcrumbItem active>16-inch</VBreadcrumbItem>
          </VBreadcrumb>
        }
      />
    </StorybookPageLayout>
  ),
};
