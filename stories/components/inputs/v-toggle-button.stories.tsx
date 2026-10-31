import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VToggleButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VToggleButton> = {
  title: "Components/Inputs/VToggleButton",
  component: VToggleButton,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    variant: "ghost",
    size: "md",
    children: "Bold",
    defaultPressed: false,
    disabled: false,
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
      title="VToggleButton"
      description="A toggle button that visually indicates selection state."
    >
      <StorybookSection title="Types">
        <StorybookSubsection title="ghost" labels={['variant="ghost"']}>
          <VToggleButton variant="ghost">Ghost</VToggleButton>
          <VToggleButton variant="ghost" defaultPressed>
            Pressed
          </VToggleButton>
        </StorybookSubsection>
        <StorybookSubsection title="filled" labels={['variant="filled"']}>
          <VToggleButton variant="filled">Filled</VToggleButton>
          <VToggleButton variant="filled" defaultPressed>
            Pressed
          </VToggleButton>
        </StorybookSubsection>
        <StorybookSubsection title="outlined" labels={['variant="outlined"']}>
          <VToggleButton variant="outlined">Outlined</VToggleButton>
          <VToggleButton variant="outlined" defaultPressed>
            Pressed
          </VToggleButton>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Sizes">
        <StorybookSubsection title="xs" labels={['size="xs"']}>
          <VToggleButton size="xs">Extra Small</VToggleButton>
        </StorybookSubsection>
        <StorybookSubsection title="sm" labels={['size="sm"']}>
          <VToggleButton size="sm">Small</VToggleButton>
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['size="md"']}>
          <VToggleButton size="md">Medium</VToggleButton>
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['size="lg"']}>
          <VToggleButton size="lg">Large</VToggleButton>
        </StorybookSubsection>
        <StorybookSubsection title="xl" labels={['size="xl"']}>
          <VToggleButton size="xl">Extra Large</VToggleButton>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="unpressed" labels={["default"]}>
          <VToggleButton>Default</VToggleButton>
        </StorybookSubsection>
        <StorybookSubsection title="pressed" labels={["defaultPressed"]}>
          <VToggleButton defaultPressed>Pressed</VToggleButton>
        </StorybookSubsection>
        <StorybookSubsection title="disabled" labels={["disabled"]}>
          <VToggleButton disabled>Disabled</VToggleButton>
        </StorybookSubsection>
        <StorybookSubsection title="disabled + pressed" labels={["disabled", "defaultPressed"]}>
          <VToggleButton disabled defaultPressed>
            Disabled Pressed
          </VToggleButton>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "For toggling visual state on/off (e.g., text formatting, view modes)",
          },
          {
            category: "vs Checkbox",
            guideline: "Use toggle button for toolbar-like actions, checkbox for form data",
          },
          {
            category: "Icons",
            guideline: "Prefer icon-only toggle buttons for compact toolbars",
          },
          {
            category: "Disabled",
            guideline: "Show disabled state when the option is temporarily unavailable",
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
      title="VToggleButton Samples"
      description="Copy-paste code examples for common toggle button patterns."
    >
      <StorybookCodeBlock
        title="Basic toggle"
        code={`<VToggleButton>Toggle</VToggleButton>`}
        preview={<VToggleButton>Toggle</VToggleButton>}
      />
      <StorybookCodeBlock
        title="Outlined toggle"
        code={`<VToggleButton variant="outlined">Outlined</VToggleButton>`}
        preview={<VToggleButton variant="outlined">Outlined</VToggleButton>}
      />
      <StorybookCodeBlock
        title="Toggle button group (single)"
        code={`<div className="flex gap-1">
  <VToggleButton defaultPressed>Grid</VToggleButton>
  <VToggleButton>List</VToggleButton>
  <VToggleButton>Table</VToggleButton>
</div>`}
        preview={
          <div className="flex gap-1">
            <VToggleButton defaultPressed>Grid</VToggleButton>
            <VToggleButton>List</VToggleButton>
            <VToggleButton>Table</VToggleButton>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Toggle button group (multiple)"
        code={`<div className="flex gap-1">
  <VToggleButton defaultPressed>B</VToggleButton>
  <VToggleButton>I</VToggleButton>
  <VToggleButton>U</VToggleButton>
</div>`}
        preview={
          <div className="flex gap-1">
            <VToggleButton defaultPressed>B</VToggleButton>
            <VToggleButton>I</VToggleButton>
            <VToggleButton>U</VToggleButton>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Controlled toggle"
        code={`const [pressed, setPressed] = useState(false)

<VToggleButton
  pressed={pressed}
  onPressedChange={setPressed}
>
  {pressed ? 'On' : 'Off'}
</VToggleButton>`}
        preview={<VToggleButton>Off</VToggleButton>}
      />
      <StorybookCodeBlock
        title="View mode selector"
        code={`const [view, setView] = useState<'grid' | 'list'>('grid')

<div className="flex gap-1">
  <VToggleButton
    variant="outlined"
    pressed={view === 'grid'}
    onPressedChange={() => setView('grid')}
  >
    &#9638; Grid
  </VToggleButton>
  <VToggleButton
    variant="outlined"
    pressed={view === 'list'}
    onPressedChange={() => setView('list')}
  >
    &#9776; List
  </VToggleButton>
</div>`}
        preview={
          <div className="flex gap-1">
            <VToggleButton variant="outlined" defaultPressed>
              &#9638; Grid
            </VToggleButton>
            <VToggleButton variant="outlined">&#9776; List</VToggleButton>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Text formatting toolbar"
        code={`const [formats, setFormats] = useState<Set<string>>(new Set())

const toggle = (format: string) => {
  setFormats(prev => {
    const next = new Set(prev)
    next.has(format) ? next.delete(format) : next.add(format)
    return next
  })
}

<div className="flex gap-1 p-2 border rounded">
  <VToggleButton
    variant="ghost"
    size="sm"
    pressed={formats.has('bold')}
    onPressedChange={() => toggle('bold')}
  >
    <strong>B</strong>
  </VToggleButton>
  <VToggleButton
    variant="ghost"
    size="sm"
    pressed={formats.has('italic')}
    onPressedChange={() => toggle('italic')}
  >
    <em>I</em>
  </VToggleButton>
  <VToggleButton
    variant="ghost"
    size="sm"
    pressed={formats.has('underline')}
    onPressedChange={() => toggle('underline')}
  >
    <u>U</u>
  </VToggleButton>
</div>`}
        preview={
          <div
            className="flex gap-1"
            style={{ padding: 8, border: "1px solid var(--v-border)", borderRadius: 6 }}
          >
            <VToggleButton variant="ghost" size="sm" defaultPressed>
              <strong>B</strong>
            </VToggleButton>
            <VToggleButton variant="ghost" size="sm">
              <em>I</em>
            </VToggleButton>
            <VToggleButton variant="ghost" size="sm">
              <u>U</u>
            </VToggleButton>
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
