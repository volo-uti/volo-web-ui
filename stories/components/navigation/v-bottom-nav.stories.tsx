import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VBottomNav } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const defaultItems = [
  { value: "0", label: "Home", icon: "\u{1F3E0}" },
  { value: "1", label: "Search", icon: "\u{1F50D}" },
  { value: "2", label: "Profile", icon: "\u{1F464}" },
];

const meta: Meta<typeof VBottomNav> = {
  title: "Components/Navigation/VBottomNav",
  component: VBottomNav,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    variant: "default",
    items: defaultItems,
    value: "0",
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
      title="VBottomNav"
      description="Bottom navigation bar for switching between primary destinations."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="default" labels={['VBottomNav(variant="default")']}>
          <div className="w-full max-w-sm">
            <VBottomNav items={defaultItems} value="0" showLabels />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="labeled" labels={['VBottomNav(variant="labeled")']}>
          <div className="w-full max-w-sm">
            <VBottomNav items={defaultItems} value="0" variant="labeled" showLabels />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="shifting" labels={['VBottomNav(variant="shifting")']}>
          <div className="w-full max-w-sm">
            <VBottomNav items={defaultItems} value="0" variant="shifting" showLabels />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="With Badge">
        <StorybookSubsection title="badge" labels={["VBottomNav(items with badge)"]}>
          <div className="w-full max-w-sm">
            <VBottomNav
              items={[
                { value: "0", label: "Home", icon: "\u{1F3E0}" },
                { value: "1", label: "Search", icon: "\u{1F50D}", badge: 3 },
                { value: "2", label: "Profile", icon: "\u{1F464}", badge: 1 },
              ]}
              value="0"
              showLabels
            />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Switch between 3-5 primary destinations on mobile screens",
          },
          {
            category: "Labels",
            guideline: "Show labels for clarity; hide for compact icon-only navigation",
          },
          { category: "Selection", guideline: "Always highlight the currently active destination" },
          {
            category: "Accessibility",
            guideline: "Provide descriptive labels for screen readers even when hidden",
          },
          {
            category: "Badge",
            guideline: "Use badges to indicate new notifications or updates",
          },
        ]}
      />
    </StorybookPageLayout>
  ),
};

// ─── Sample ───
const fiveItems = [
  { value: "0", label: "Home", icon: "\u{1F3E0}" },
  { value: "1", label: "Search", icon: "\u{1F50D}" },
  { value: "2", label: "Favorites", icon: "\u{2764}\u{FE0F}" },
  { value: "3", label: "Notifications", icon: "\u{1F514}" },
  { value: "4", label: "Profile", icon: "\u{1F464}" },
];

export const Sample: Story = {
  tags: ["!autodocs"],
  render: () => (
    <StorybookPageLayout title="VBottomNav Samples" description="Copy-paste code examples.">
      <StorybookCodeBlock
        title="Basic usage"
        code={`<VBottomNav
  items={[
    { value: '0', label: 'Home', icon: '\u{1F3E0}' },
    { value: '1', label: 'Search', icon: '\u{1F50D}' },
    { value: '2', label: 'Profile', icon: '\u{1F464}' },
  ]}
  value="0"
  showLabels
/>`}
        preview={
          <div className="w-full max-w-sm">
            <VBottomNav items={defaultItems} value="0" showLabels />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Labeled style"
        code={`<VBottomNav
  items={[...]}
  value="1"
  showLabels
/>`}
        preview={
          <div className="w-full max-w-sm">
            <VBottomNav items={fiveItems} value="1" showLabels />
          </div>
        }
      />
      <StorybookCodeBlock
        title="With badges"
        code={`<VBottomNav
  items={[
    { value: '0', label: 'Home', icon: '🏠' },
    { value: '1', label: 'Chat', icon: '💬', badge: 5 },
    { value: '2', label: 'Alerts', icon: '🔔', badge: 12 },
    { value: '3', label: 'Profile', icon: '👤' },
  ]}
  value="0"
  showLabels
/>`}
        preview={
          <div className="w-full max-w-sm">
            <VBottomNav
              items={[
                { value: "0", label: "Home", icon: "🏠" },
                { value: "1", label: "Chat", icon: "💬", badge: 5 },
                { value: "2", label: "Alerts", icon: "🔔", badge: 12 },
                { value: "3", label: "Profile", icon: "👤" },
              ]}
              value="0"
              showLabels
            />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Shifting style"
        code={`<VBottomNav
  variant="shifting"
  items={[
    { value: '0', label: 'Home', icon: '🏠' },
    { value: '1', label: 'Search', icon: '🔍' },
    { value: '2', label: 'Favorites', icon: '❤️' },
    { value: '3', label: 'Profile', icon: '👤' },
  ]}
  value="0"
  showLabels
/>`}
        preview={
          <div className="w-full max-w-sm">
            <VBottomNav
              variant="shifting"
              items={[
                { value: "0", label: "Home", icon: "🏠" },
                { value: "1", label: "Search", icon: "🔍" },
                { value: "2", label: "Favorites", icon: "❤️" },
                { value: "3", label: "Profile", icon: "👤" },
              ]}
              value="0"
              showLabels
            />
          </div>
        }
      />
      <StorybookCodeBlock
        title="App navigation"
        code={`<VBottomNav
  items={[
    { value: '0', label: 'Home', icon: '🏠' },
    { value: '1', label: 'Search', icon: '🔍' },
    { value: '2', label: 'Notifications', icon: '🔔', badge: 3 },
    { value: '3', label: 'Profile', icon: '👤' },
  ]}
  value="0"
  showLabels
  onValueChange={(value) => navigate(value)}
/>`}
        preview={
          <div className="w-full max-w-sm">
            <VBottomNav
              items={[
                { value: "0", label: "Home", icon: "🏠" },
                { value: "1", label: "Search", icon: "🔍" },
                { value: "2", label: "Notifications", icon: "🔔", badge: 3 },
                { value: "3", label: "Profile", icon: "👤" },
              ]}
              value="0"
              showLabels
              onValueChange={() => undefined}
            />
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
