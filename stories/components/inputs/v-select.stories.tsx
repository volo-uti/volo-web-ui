import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  VSelect,
  VSelectTrigger,
  VSelectContent,
  VSelectItem,
  VSelectGroup,
  VSelectLabel,
  VForm,
  VTextField,
  VButton,
} from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VSelect> = {
  title: "Components/Inputs/VSelect",
  component: VSelect,
  tags: ["autodocs"],
  args: {
    size: "md",
    placeholder: "Select an option",
    multiple: false,
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
      title="VSelect"
      description="Dropdown menu for selecting one or multiple options from a list."
    >
      <StorybookSection title="Sizes">
        <StorybookSubsection title="sm" labels={['size="sm"']}>
          <VSelect size="sm" placeholder="Small">
            <VSelectTrigger />
            <VSelectContent>
              <VSelectItem value="a">Option A</VSelectItem>
              <VSelectItem value="b">Option B</VSelectItem>
            </VSelectContent>
          </VSelect>
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['size="md"']}>
          <VSelect size="md" placeholder="Medium">
            <VSelectTrigger />
            <VSelectContent>
              <VSelectItem value="a">Option A</VSelectItem>
              <VSelectItem value="b">Option B</VSelectItem>
            </VSelectContent>
          </VSelect>
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['size="lg"']}>
          <VSelect size="lg" placeholder="Large">
            <VSelectTrigger />
            <VSelectContent>
              <VSelectItem value="a">Option A</VSelectItem>
              <VSelectItem value="b">Option B</VSelectItem>
            </VSelectContent>
          </VSelect>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Selection Mode">
        <StorybookSubsection title="single" labels={["multiple={false}"]}>
          <VSelect placeholder="Pick one">
            <VSelectTrigger />
            <VSelectContent>
              <VSelectItem value="react">React</VSelectItem>
              <VSelectItem value="vue">Vue</VSelectItem>
              <VSelectItem value="svelte">Svelte</VSelectItem>
            </VSelectContent>
          </VSelect>
        </StorybookSubsection>
        <StorybookSubsection title="multiple" labels={["multiple"]}>
          <VSelect multiple placeholder="Pick many">
            <VSelectTrigger />
            <VSelectContent>
              <VSelectItem value="react">React</VSelectItem>
              <VSelectItem value="vue">Vue</VSelectItem>
              <VSelectItem value="svelte">Svelte</VSelectItem>
            </VSelectContent>
          </VSelect>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Field">
        <StorybookSubsection title="label + helper" labels={["label", "required", "helper"]}>
          <VSelect label="Framework" required helper="Pick the one you use most">
            <VSelectTrigger />
            <VSelectContent>
              <VSelectItem value="react">React</VSelectItem>
              <VSelectItem value="vue">Vue</VSelectItem>
            </VSelectContent>
          </VSelect>
        </StorybookSubsection>
        <StorybookSubsection title="error" labels={["error", "errorText"]}>
          <VSelect label="Framework" error errorText="Please choose one">
            <VSelectTrigger />
            <VSelectContent>
              <VSelectItem value="react">React</VSelectItem>
            </VSelectContent>
          </VSelect>
        </StorybookSubsection>
        <StorybookSubsection title="loading" labels={["loading"]}>
          <VSelect loading>
            <VSelectTrigger />
            <VSelectContent>
              <VSelectItem value="react">React</VSelectItem>
            </VSelectContent>
          </VSelect>
        </StorybookSubsection>
        <StorybookSubsection title="max selection" labels={["multiple", "maxSelection={2}"]}>
          <VSelect multiple maxSelection={2}>
            <VSelectTrigger />
            <VSelectContent>
              <VSelectItem value="react">React</VSelectItem>
              <VSelectItem value="vue">Vue</VSelectItem>
              <VSelectItem value="svelte">Svelte</VSelectItem>
            </VSelectContent>
          </VSelect>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="default" labels={["default"]}>
          <VSelect placeholder="Select...">
            <VSelectTrigger />
            <VSelectContent>
              <VSelectItem value="a">Option A</VSelectItem>
              <VSelectItem value="b">Option B</VSelectItem>
            </VSelectContent>
          </VSelect>
        </StorybookSubsection>
        <StorybookSubsection title="disabled" labels={["disabled"]}>
          <VSelect disabled placeholder="Disabled">
            <VSelectTrigger />
            <VSelectContent>
              <VSelectItem value="a">Option A</VSelectItem>
            </VSelectContent>
          </VSelect>
        </StorybookSubsection>
        <StorybookSubsection title="disabled item" labels={["VSelectItem disabled"]}>
          <VSelect placeholder="Has disabled item">
            <VSelectTrigger />
            <VSelectContent>
              <VSelectItem value="a">Available</VSelectItem>
              <VSelectItem value="b" disabled>
                Unavailable
              </VSelectItem>
            </VSelectContent>
          </VSelect>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Pre-selected Value">
        <StorybookSubsection title="default value" labels={['defaultValue="..."']}>
          <VSelect defaultValue="vue" placeholder="Select framework">
            <VSelectTrigger />
            <VSelectContent>
              <VSelectItem value="react">React</VSelectItem>
              <VSelectItem value="vue">Vue</VSelectItem>
              <VSelectItem value="svelte">Svelte</VSelectItem>
            </VSelectContent>
          </VSelect>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Selecting from 5+ options, or when space is limited for radio buttons",
          },
          {
            category: "vs Radio",
            guideline: "Use select for 5+ options. Use radio for 2-4 visible options",
          },
          {
            category: "Placeholder",
            guideline: 'Use descriptive placeholder like "Select a country" instead of "Select..."',
          },
          {
            category: "Groups",
            guideline: "Group related options with VSelectGroup and VSelectLabel for long lists",
          },
          {
            category: "Multiple",
            guideline: "Enable for multi-select scenarios (tags, filters). Show selected count",
          },
          {
            category: "Disabled items",
            guideline: "Disable unavailable options rather than hiding them",
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
      title="VSelect Samples"
      description="Copy-paste code examples for common select patterns."
    >
      <StorybookCodeBlock
        title="Basic select"
        code={`<VSelect placeholder="Select a fruit">
  <VSelectTrigger />
  <VSelectContent>
    <VSelectItem value="apple">Apple</VSelectItem>
    <VSelectItem value="banana">Banana</VSelectItem>
    <VSelectItem value="cherry">Cherry</VSelectItem>
  </VSelectContent>
</VSelect>`}
        preview={
          <VSelect placeholder="Select a fruit">
            <VSelectTrigger />
            <VSelectContent>
              <VSelectItem value="apple">Apple</VSelectItem>
              <VSelectItem value="banana">Banana</VSelectItem>
              <VSelectItem value="cherry">Cherry</VSelectItem>
            </VSelectContent>
          </VSelect>
        }
      />
      <StorybookCodeBlock
        title="Multi-select"
        code={`<VSelect multiple placeholder="Select frameworks">
  <VSelectTrigger />
  <VSelectContent>
    <VSelectItem value="react">React</VSelectItem>
    <VSelectItem value="vue">Vue</VSelectItem>
    <VSelectItem value="angular">Angular</VSelectItem>
  </VSelectContent>
</VSelect>`}
        preview={
          <VSelect multiple placeholder="Select frameworks">
            <VSelectTrigger />
            <VSelectContent>
              <VSelectItem value="react">React</VSelectItem>
              <VSelectItem value="vue">Vue</VSelectItem>
              <VSelectItem value="angular">Angular</VSelectItem>
            </VSelectContent>
          </VSelect>
        }
      />
      <StorybookCodeBlock
        title="Grouped options"
        code={`<VSelect placeholder="Choose a role">
  <VSelectTrigger />
  <VSelectContent>
    <VSelectGroup>
      <VSelectLabel>Engineering</VSelectLabel>
      <VSelectItem value="frontend">Frontend</VSelectItem>
      <VSelectItem value="backend">Backend</VSelectItem>
    </VSelectGroup>
    <VSelectGroup>
      <VSelectLabel>Design</VSelectLabel>
      <VSelectItem value="ui">UI Designer</VSelectItem>
      <VSelectItem value="ux">UX Researcher</VSelectItem>
    </VSelectGroup>
  </VSelectContent>
</VSelect>`}
        preview={
          <VSelect placeholder="Choose a role">
            <VSelectTrigger />
            <VSelectContent>
              <VSelectGroup>
                <VSelectLabel>Engineering</VSelectLabel>
                <VSelectItem value="frontend">Frontend</VSelectItem>
                <VSelectItem value="backend">Backend</VSelectItem>
              </VSelectGroup>
              <VSelectGroup>
                <VSelectLabel>Design</VSelectLabel>
                <VSelectItem value="ui">UI Designer</VSelectItem>
                <VSelectItem value="ux">UX Researcher</VSelectItem>
              </VSelectGroup>
            </VSelectContent>
          </VSelect>
        }
      />
      <StorybookCodeBlock
        title="Controlled select"
        code={`const [value, setValue] = useState('')

<VSelect value={value} onValueChange={setValue} placeholder="Select...">
  <VSelectTrigger />
  <VSelectContent>
    <VSelectItem value="draft">Draft</VSelectItem>
    <VSelectItem value="published">Published</VSelectItem>
    <VSelectItem value="archived">Archived</VSelectItem>
  </VSelectContent>
</VSelect>`}
        preview={
          <VSelect placeholder="Select status">
            <VSelectTrigger />
            <VSelectContent>
              <VSelectItem value="draft">Draft</VSelectItem>
              <VSelectItem value="published">Published</VSelectItem>
              <VSelectItem value="archived">Archived</VSelectItem>
            </VSelectContent>
          </VSelect>
        }
      />
      <StorybookCodeBlock
        title="Registration Form"
        code={`<VForm onSubmit={handleRegister}>
  <VTextField label="Name" placeholder="Enter your name" />
  <VSelect placeholder="Select country">
    <VSelectTrigger />
    <VSelectContent>
      <VSelectItem value="us">United States</VSelectItem>
      <VSelectItem value="kr">South Korea</VSelectItem>
      <VSelectItem value="jp">Japan</VSelectItem>
      <VSelectItem value="de">Germany</VSelectItem>
    </VSelectContent>
  </VSelect>
  <VButton type="submit">Register</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VTextField label="Name" placeholder="Enter your name" />
            <VSelect placeholder="Select country">
              <VSelectTrigger />
              <VSelectContent>
                <VSelectItem value="us">United States</VSelectItem>
                <VSelectItem value="kr">South Korea</VSelectItem>
                <VSelectItem value="jp">Japan</VSelectItem>
                <VSelectItem value="de">Germany</VSelectItem>
              </VSelectContent>
            </VSelect>
            <VButton>Register</VButton>
          </VForm>
        }
      />
      <StorybookCodeBlock
        title="Country selector"
        code={`<VSelect
  label="Country"
  placeholder="Select your country"
  onValueChange={(value) => console.log(value)}
>
  <VSelectTrigger />
  <VSelectContent>
    <VSelectGroup>
      <VSelectLabel>Asia</VSelectLabel>
      <VSelectItem value="kr">South Korea</VSelectItem>
      <VSelectItem value="jp">Japan</VSelectItem>
      <VSelectItem value="cn">China</VSelectItem>
    </VSelectGroup>
    <VSelectGroup>
      <VSelectLabel>Americas</VSelectLabel>
      <VSelectItem value="us">United States</VSelectItem>
      <VSelectItem value="ca">Canada</VSelectItem>
      <VSelectItem value="br">Brazil</VSelectItem>
    </VSelectGroup>
    <VSelectGroup>
      <VSelectLabel>Europe</VSelectLabel>
      <VSelectItem value="de">Germany</VSelectItem>
      <VSelectItem value="fr">France</VSelectItem>
      <VSelectItem value="gb">United Kingdom</VSelectItem>
    </VSelectGroup>
  </VSelectContent>
</VSelect>`}
        preview={
          <div style={{ width: 280 }}>
            <VSelect label="Country" placeholder="Select your country">
              <VSelectTrigger />
              <VSelectContent>
                <VSelectGroup>
                  <VSelectLabel>Asia</VSelectLabel>
                  <VSelectItem value="kr">South Korea</VSelectItem>
                  <VSelectItem value="jp">Japan</VSelectItem>
                  <VSelectItem value="cn">China</VSelectItem>
                </VSelectGroup>
                <VSelectGroup>
                  <VSelectLabel>Americas</VSelectLabel>
                  <VSelectItem value="us">United States</VSelectItem>
                  <VSelectItem value="ca">Canada</VSelectItem>
                  <VSelectItem value="br">Brazil</VSelectItem>
                </VSelectGroup>
                <VSelectGroup>
                  <VSelectLabel>Europe</VSelectLabel>
                  <VSelectItem value="de">Germany</VSelectItem>
                  <VSelectItem value="fr">France</VSelectItem>
                  <VSelectItem value="gb">United Kingdom</VSelectItem>
                </VSelectGroup>
              </VSelectContent>
            </VSelect>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Filter dropdown"
        code={`const [status, setStatus] = useState('all')

<VSelect
  size="sm"
  placeholder="Filter by status"
  value={status}
  onValueChange={setStatus}
>
  <VSelectTrigger />
  <VSelectContent>
    <VSelectItem value="all">All Items</VSelectItem>
    <VSelectItem value="active">Active</VSelectItem>
    <VSelectItem value="pending">Pending</VSelectItem>
    <VSelectItem value="archived">Archived</VSelectItem>
  </VSelectContent>
</VSelect>`}
        preview={
          <div style={{ width: 200 }}>
            <VSelect size="sm" placeholder="Filter by status">
              <VSelectTrigger />
              <VSelectContent>
                <VSelectItem value="all">All Items</VSelectItem>
                <VSelectItem value="active">Active</VSelectItem>
                <VSelectItem value="pending">Pending</VSelectItem>
                <VSelectItem value="archived">Archived</VSelectItem>
              </VSelectContent>
            </VSelect>
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
