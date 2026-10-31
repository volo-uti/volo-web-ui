import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VIconButton, VTooltip } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VIconButton> = {
  title: "Components/Inputs/VIconButton",
  component: VIconButton,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    variant: "default",
    size: "md",
    color: "primary",
    children: "\u2605",
    disabled: false,
    loading: false,
    "aria-label": "Icon button",
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
      title="VIconButton"
      description="A button component that displays only an icon."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="standard" labels={['variant="default"']}>
          <VIconButton aria-label="Standard">{"\u2605"}</VIconButton>
        </StorybookSubsection>
        <StorybookSubsection title="filled" labels={['variant="filled"']}>
          <VIconButton variant="filled" aria-label="Filled">
            {"\u2605"}
          </VIconButton>
        </StorybookSubsection>
        <StorybookSubsection title="outlined" labels={['variant="outlined"']}>
          <VIconButton variant="outlined" aria-label="Outlined">
            {"\u2605"}
          </VIconButton>
        </StorybookSubsection>
        <StorybookSubsection title="filledTonal" labels={['variant="filledTonal"']}>
          <VIconButton variant="filledTonal" aria-label="Filled Tonal">
            {"\u2605"}
          </VIconButton>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Sizes">
        <StorybookSubsection title="xs" labels={['size="xs"']}>
          <VIconButton variant="filled" size="xs" aria-label="Extra Small">
            {"\u2605"}
          </VIconButton>
        </StorybookSubsection>
        <StorybookSubsection title="sm" labels={['size="sm"']}>
          <VIconButton variant="filled" size="sm" aria-label="Small">
            {"\u2605"}
          </VIconButton>
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['size="md"']}>
          <VIconButton variant="filled" size="md" aria-label="Medium">
            {"\u2605"}
          </VIconButton>
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['size="lg"']}>
          <VIconButton variant="filled" size="lg" aria-label="Large">
            {"\u2605"}
          </VIconButton>
        </StorybookSubsection>
        <StorybookSubsection title="xl" labels={['size="xl"']}>
          <VIconButton variant="filled" size="xl" aria-label="Extra Large">
            {"\u2605"}
          </VIconButton>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Colors">
        <StorybookSubsection title="primary" labels={['color="primary"']}>
          <VIconButton variant="filled" color="primary" aria-label="Primary">
            {"\u2605"}
          </VIconButton>
        </StorybookSubsection>
        <StorybookSubsection title="secondary" labels={['color="secondary"']}>
          <VIconButton variant="filled" color="secondary" aria-label="Secondary">
            {"\u2605"}
          </VIconButton>
        </StorybookSubsection>
        <StorybookSubsection title="tertiary" labels={['color="tertiary"']}>
          <VIconButton variant="filled" color="tertiary" aria-label="Tertiary">
            {"\u2605"}
          </VIconButton>
        </StorybookSubsection>
        <StorybookSubsection title="destructive" labels={['color="destructive"']}>
          <VIconButton variant="filled" color="destructive" aria-label="Destructive">
            {"\u2605"}
          </VIconButton>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="default" labels={["disabled={false}"]}>
          <VIconButton variant="filled" aria-label="Enabled">
            {"\u2605"}
          </VIconButton>
        </StorybookSubsection>
        <StorybookSubsection title="disabled" labels={["disabled"]}>
          <VIconButton variant="filled" disabled aria-label="Disabled">
            {"\u2605"}
          </VIconButton>
        </StorybookSubsection>
        <StorybookSubsection title="loading" labels={["loading"]}>
          <VIconButton variant="filled" loading aria-label="Loading">
            {"\u2605"}
          </VIconButton>
        </StorybookSubsection>
        <StorybookSubsection title="pressed" labels={["pressed"]}>
          <VIconButton variant="filled" pressed onPressedChange={() => {}} aria-label="Pressed">
            {"\u2605"}
          </VIconButton>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "When an icon-only button is needed (space saving, visual simplicity)",
          },
          {
            category: "Toolbar",
            guideline: "Suitable for toolbars, action bars, and navigation bars",
          },
          { category: "Accessibility", guideline: "Always provide aria-label for accessibility" },
          {
            category: "Toggle",
            guideline: "Use pressed / onPressedChange to implement toggle buttons (favorite, like)",
          },
          {
            category: "Size",
            guideline: "Recommend minimum 48x48dp touch target (mobile accessibility)",
          },
          {
            category: "Variant",
            guideline:
              "Filled for emphasis, outlined for secondary, standard for blending with background",
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
      title="VIconButton Samples"
      description="Copy-paste code examples for common icon button patterns."
    >
      <StorybookCodeBlock
        title="Basic Usage"
        code={`<VIconButton aria-label="Favorite" onClick={() => {}}>
  {'\u2605'}
</VIconButton>`}
        preview={<VIconButton aria-label="Favorite">{"\u2605"}</VIconButton>}
      />
      <StorybookCodeBlock
        title="Filled Button"
        code={`<VIconButton variant="filled" aria-label="Add" onClick={() => {}}>
  {'\u2605'}
</VIconButton>`}
        preview={
          <VIconButton variant="filled" aria-label="Add">
            {"\u2605"}
          </VIconButton>
        }
      />
      <StorybookCodeBlock
        title="Outlined Button"
        code={`<VIconButton variant="outlined" aria-label="Edit" onClick={() => {}}>
  {'\u2605'}
</VIconButton>`}
        preview={
          <VIconButton variant="outlined" aria-label="Edit">
            {"\u2605"}
          </VIconButton>
        }
      />
      <StorybookCodeBlock
        title="Toggle button (pressed state)"
        code={`<VIconButton variant="filledTonal" pressed={saved} onPressedChange={setSaved} aria-label="Bookmark">
  {'\u2605'}
</VIconButton>`}
        preview={
          <VIconButton
            variant="filledTonal"
            defaultPressed
            aria-label="Bookmark"
            onPressedChange={() => {}}
          >
            {"\u2605"}
          </VIconButton>
        }
      />
      <StorybookCodeBlock
        title="Toolbar actions"
        code={`<div className="flex gap-1" style={{ padding: 4, border: '1px solid var(--v-border)', borderRadius: 8 }}>
  <VIconButton aria-label="Copy" onClick={() => navigator.clipboard.writeText(text)}>
    &#128203;
  </VIconButton>
  <VIconButton aria-label="Paste" onClick={handlePaste}>
    &#128195;
  </VIconButton>
  <VIconButton color="destructive" aria-label="Delete" onClick={handleDelete}>
    &#10005;
  </VIconButton>
</div>`}
        preview={
          <div
            className="flex gap-1"
            style={{ padding: 4, border: "1px solid var(--v-border)", borderRadius: 8 }}
          >
            <VIconButton aria-label="Copy">{"\u{1F4CB}"}</VIconButton>
            <VIconButton aria-label="Paste">{"\u{1F4C3}"}</VIconButton>
            <VIconButton color="destructive" aria-label="Delete">
              {"\u2715"}
            </VIconButton>
          </div>
        }
      />
      <StorybookCodeBlock
        title="With tooltip"
        code={`<VTooltip message="Add to favorites">
  <VIconButton variant="outlined" aria-label="Favorite" onClick={() => {}}>
    {'\u2605'}
  </VIconButton>
</VTooltip>`}
        preview={
          <VTooltip message="Add to favorites">
            <VIconButton variant="outlined" aria-label="Favorite">
              {"\u2605"}
            </VIconButton>
          </VTooltip>
        }
      />
      <StorybookCodeBlock
        title="Loading icon button"
        code={`<VIconButton variant="filled" loading aria-label="Refreshing">
  {'\u21BB'}
</VIconButton>`}
        preview={
          <div className="flex gap-3 items-center">
            <VIconButton variant="filled" loading aria-label="Refreshing">
              {"\u21BB"}
            </VIconButton>
            <VIconButton variant="outlined" loading aria-label="Loading">
              {"\u2605"}
            </VIconButton>
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
