import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VLink } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VLink> = {
  title: "Components/Inputs/VLink",
  component: VLink,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    color: "primary",
    children: "Link text",
    underline: "always",
    external: false,
    href: "#",
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
      title="VLink"
      description="Styled anchor element with polymorphic support for framework routers like Next.js Link."
    >
      <StorybookSection title="Underline">
        <StorybookSubsection title="always" labels={['VLink(underline="always")']}>
          <VLink href="#" underline="always">
            Always Underlined
          </VLink>
        </StorybookSubsection>
        <StorybookSubsection title="hover" labels={['VLink(underline="hover")']}>
          <VLink href="#" underline="hover">
            Underline on Hover
          </VLink>
        </StorybookSubsection>
        <StorybookSubsection title="none" labels={['VLink(underline="none")']}>
          <VLink href="#" underline="none">
            No Underline
          </VLink>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Color">
        <StorybookSubsection title="primary" labels={['VLink(color="primary")']}>
          <VLink href="#" color="primary">
            Primary Link
          </VLink>
        </StorybookSubsection>
        <StorybookSubsection title="secondary" labels={['VLink(color="secondary")']}>
          <VLink href="#" color="secondary">
            Secondary Link
          </VLink>
        </StorybookSubsection>
        <StorybookSubsection title="inherit" labels={['VLink(color="inherit")']}>
          <span style={{ color: "var(--v-success)" }}>
            <VLink href="#" color="inherit">
              Inherits parent color
            </VLink>
          </span>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Combinations">
        <StorybookSubsection
          title="secondary + always"
          labels={['color="secondary"', 'underline="always"']}
        >
          <VLink href="#" color="secondary" underline="always">
            Secondary Always
          </VLink>
        </StorybookSubsection>
        <StorybookSubsection
          title="primary + none"
          labels={['color="primary"', 'underline="none"']}
        >
          <VLink href="#" color="primary" underline="none">
            Primary None
          </VLink>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Inline navigation links, external references, or router integration",
          },
          {
            category: "Underline",
            guideline: "Use 'hover' for clean UI, 'always' for accessibility emphasis",
          },
          {
            category: "Color inherit",
            guideline: "Use color='inherit' when link should match parent text color",
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
    <StorybookPageLayout title="VLink Samples" description="Copy-paste code examples for VLink.">
      <StorybookCodeBlock
        title="Basic link"
        code={`<VLink href="/about">About</VLink>`}
        preview={<VLink href="#">About</VLink>}
      />
      <StorybookCodeBlock
        title="Inline links"
        code={`<p>
  See the <VLink href="/docs">documentation</VLink> for more info.
</p>`}
        preview={
          <p>
            See the <VLink href="#">documentation</VLink> for more info.
          </p>
        }
      />
      <StorybookCodeBlock
        title="Color variants"
        code={`<VLink href="#" color="primary">Primary</VLink>
<VLink href="#" color="secondary">Secondary</VLink>
<VLink href="#" color="inherit">Inherit</VLink>`}
        preview={
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}
          >
            <VLink href="#" color="primary">
              Primary
            </VLink>
            <VLink href="#" color="secondary">
              Secondary
            </VLink>
            <VLink href="#" color="inherit">
              Inherit
            </VLink>
          </div>
        }
      />
      <StorybookCodeBlock
        title="External link with icon"
        code={`<VLink href="https://docs.example.com" external underline="hover">
  API Documentation <span style={{ marginLeft: 4 }}>&nearr;</span>
</VLink>`}
        preview={
          <VLink href="#" external underline="hover">
            API Documentation <span style={{ marginLeft: 4 }}>&nearr;</span>
          </VLink>
        }
      />
      <StorybookCodeBlock
        title="Navigation breadcrumb links"
        code={`<nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <VLink href="/" color="secondary" underline="hover">Home</VLink>
  <span style={{ color: 'var(--v-muted-foreground)' }}>/</span>
  <VLink href="/products" color="secondary" underline="hover">Products</VLink>
  <span style={{ color: 'var(--v-muted-foreground)' }}>/</span>
  <span style={{ color: 'var(--v-foreground)' }}>Detail</span>
</nav>`}
        preview={
          <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <VLink href="#" color="secondary" underline="hover">
              Home
            </VLink>
            <span style={{ color: "var(--v-muted-foreground)" }}>/</span>
            <VLink href="#" color="secondary" underline="hover">
              Products
            </VLink>
            <span style={{ color: "var(--v-muted-foreground)" }}>/</span>
            <span style={{ color: "var(--v-foreground)" }}>Detail</span>
          </nav>
        }
      />
    </StorybookPageLayout>
  ),
};
