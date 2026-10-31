import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VSlider } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VSlider> = {
  title: "Components/Inputs/VSlider",
  component: VSlider,
  tags: ["autodocs"],
  args: {
    "aria-label": "Volume",
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    size: "md",
    disabled: false,
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
      title="VSlider"
      description="Slider input for selecting a numeric value within a range."
    >
      <StorybookSection title="Basic">
        <StorybookSubsection title="slider" labels={["single value"]}>
          <div style={{ width: 240 }}>
            <VSlider aria-label="Volume" defaultValue={50} />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Divisions">
        <StorybookSubsection title="stepped" labels={["divisions={10}"]}>
          <div style={{ width: 240 }}>
            <VSlider aria-label="Volume" divisions={10} defaultValue={50} />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="continuous" labels={["continuous"]}>
          <div style={{ width: 240 }}>
            <VSlider aria-label="Volume" defaultValue={50} />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Label">
        <StorybookSubsection title="value label" labels={["showLabel"]}>
          <div style={{ width: 240, paddingTop: 24 }}>
            <VSlider aria-label="Volume" showLabel defaultValue={50} />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="default" labels={["default"]}>
          <div style={{ width: 240 }}>
            <VSlider aria-label="Volume" defaultValue={50} />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="disabled" labels={["disabled"]}>
          <div style={{ width: 240 }}>
            <VSlider aria-label="Volume" disabled defaultValue={50} />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Adjusting continuous values: volume, brightness, price range, opacity",
          },
          {
            category: "Min / max",
            guideline: "Set meaningful min/max. Consider using step to snap to useful increments",
          },
          {
            category: "vs Number input",
            guideline: "Use slider for approximate values. Use number input for precise entry",
          },
          {
            category: "Feedback",
            guideline:
              "Show current value label. Consider pairing with a number input for precision",
          },
          {
            category: "Step",
            guideline: "Use step for discrete values (e.g., step={5} for 0/5/10/15/...)",
          },
          {
            category: "Disabled",
            guideline: "When the value is locked or determined by another control",
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
      title="VSlider Samples"
      description="Copy-paste code examples for common slider patterns."
    >
      <StorybookCodeBlock
        title="Basic Usage"
        code={`<VSlider aria-label="Volume" defaultValue={50} />`}
        preview={
          <div style={{ width: 240 }}>
            <VSlider aria-label="Volume" defaultValue={50} />
          </div>
        }
      />
      <StorybookCodeBlock
        title="With Divisions"
        code={`<VSlider aria-label="Volume" divisions={10} defaultValue={50} />`}
        preview={
          <div style={{ width: 240 }}>
            <VSlider aria-label="Volume" divisions={10} defaultValue={50} />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Configuration Form (VForm)"
        code={`<VForm onSubmit={(e) => e.preventDefault()}>
  <VSlider aria-label="Brightness" defaultValue={75} max={100} />
</VForm>`}
        preview={
          <div style={{ width: 240 }}>
            <VSlider aria-label="Brightness" defaultValue={75} />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Volume control"
        code={`const [volume, setVolume] = useState(50)

<div className="flex items-center gap-3">
  <span>{volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}</span>
  <VSlider
    aria-label="Volume"
    value={volume}
    onValueChange={setVolume}
    min={0}
    max={100}
    step={1}
  />
  <span style={{ minWidth: 32, textAlign: 'right' }}>{volume}%</span>
</div>`}
        preview={
          <div className="flex items-center gap-3" style={{ width: 300 }}>
            <span>{"\u{1F50A}"}</span>
            <VSlider aria-label="Volume" defaultValue={50} min={0} max={100} />
            <span style={{ minWidth: 32, textAlign: "right", fontSize: 13 }}>50%</span>
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
