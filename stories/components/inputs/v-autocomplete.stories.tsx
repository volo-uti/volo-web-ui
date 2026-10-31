import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VAutocomplete, VTextField, VForm, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "grape", label: "Grape" },
  { value: "lemon", label: "Lemon" },
  { value: "mango", label: "Mango" },
  { value: "orange", label: "Orange" },
  { value: "peach", label: "Peach" },
  { value: "strawberry", label: "Strawberry" },
  { value: "watermelon", label: "Watermelon" },
];

const meta: Meta<typeof VAutocomplete> = {
  title: "Components/Inputs/VAutocomplete",
  component: VAutocomplete,
  tags: ["autodocs"],
  args: {
    size: "md",
    items: fruitOptions,
    placeholder: "Search fruits...",
    required: false,
    error: false,
    success: false,
    fullWidth: false,
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
      title="VAutocomplete"
      description="Text input with filtered dropdown suggestions for selecting from a list of options."
    >
      <StorybookSection title="Sizes">
        <StorybookSubsection title="sm" labels={['size="sm"']}>
          <VAutocomplete items={fruitOptions} size="sm" placeholder="Small" />
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['size="md"']}>
          <VAutocomplete items={fruitOptions} size="md" placeholder="Medium" />
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['size="lg"']}>
          <VAutocomplete items={fruitOptions} size="lg" placeholder="Large" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Label & Helper Text">
        <StorybookSubsection title="placeholder only" labels={["placeholder"]}>
          <VAutocomplete items={fruitOptions} placeholder="Search fruits" />
        </StorybookSubsection>
        <StorybookSubsection title="label" labels={['label="..."']}>
          <VAutocomplete items={fruitOptions} label="Fruit" placeholder="Search fruits..." />
        </StorybookSubsection>
        <StorybookSubsection title="helper text" labels={['helper="..."']}>
          <VAutocomplete
            items={fruitOptions}
            label="Fruit"
            placeholder="Search fruits..."
            helper="Type to filter options"
          />
        </StorybookSubsection>
        <StorybookSubsection title="empty text" labels={['emptyText="..."']}>
          <VAutocomplete
            items={fruitOptions}
            label="Fruit"
            placeholder="Search..."
            emptyText="No matching fruits found"
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="default" labels={["default"]}>
          <VAutocomplete items={fruitOptions} label="Fruit" placeholder="Search fruits..." />
        </StorybookSubsection>
        <StorybookSubsection title="disabled" labels={["disabled"]}>
          <VAutocomplete
            items={fruitOptions}
            label="Fruit"
            placeholder="Search fruits..."
            disabled
          />
        </StorybookSubsection>
        <StorybookSubsection title="error" labels={["error", 'errorText="..."']}>
          <VAutocomplete
            items={fruitOptions}
            label="Fruit"
            placeholder="Search fruits..."
            error
            errorText="Please select a valid option"
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Disabled Options">
        <StorybookSubsection title="some disabled" labels={["option.disabled"]}>
          <VAutocomplete
            items={[
              { value: "apple", label: "Apple" },
              { value: "banana", label: "Banana", disabled: true },
              { value: "cherry", label: "Cherry" },
              { value: "grape", label: "Grape", disabled: true },
              { value: "mango", label: "Mango" },
            ]}
            label="Fruit"
            placeholder="Some options disabled"
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Full Width">
        <StorybookSubsection title="full width" labels={["fullWidth"]}>
          <VAutocomplete items={fruitOptions} fullWidth placeholder="Full width autocomplete" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Large option lists (10+) where users benefit from type-to-filter search",
          },
          {
            category: "vs Select",
            guideline:
              "Use autocomplete when the list is long or users know what they want to search",
          },
          {
            category: "Options",
            guideline: "Provide VOption[] with value and label. Use disabled for unavailable items",
          },
          {
            category: "Empty state",
            guideline: 'Set emptyText for when no options match the query ("No results found")',
          },
          {
            category: "Custom filter",
            guideline: "Use filterFn for custom matching logic (e.g., fuzzy search, multi-field)",
          },
          {
            category: "Validation",
            guideline:
              "Show error when user submits without selecting or selects an invalid option",
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
      title="VAutocomplete Samples"
      description="Copy-paste code examples for common autocomplete patterns."
    >
      <StorybookCodeBlock
        title="Basic autocomplete"
        code={`const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

<VAutocomplete items={items} placeholder="Search fruits..." />`}
        preview={<VAutocomplete items={fruitOptions} placeholder="Search fruits..." />}
      />
      <StorybookCodeBlock
        title="With label and helper text"
        code={`<VAutocomplete
  items={items}
  label="Fruit"
  placeholder="Search..."
  helper="Type to filter options"
/>`}
        preview={
          <VAutocomplete
            items={fruitOptions}
            label="Fruit"
            placeholder="Search..."
            helper="Type to filter options"
          />
        }
      />
      <StorybookCodeBlock
        title="Error state"
        code={`<VAutocomplete
  items={items}
  label="Fruit"
  error
  errorText="Please select a valid option"
/>`}
        preview={
          <VAutocomplete
            items={fruitOptions}
            label="Fruit"
            error
            errorText="Please select a valid option"
          />
        }
      />
      <StorybookCodeBlock
        title="Custom empty text"
        code={`<VAutocomplete
  items={items}
  placeholder="Search..."
  emptyText="No matching items found"
/>`}
        preview={
          <VAutocomplete
            items={fruitOptions}
            placeholder="Search..."
            emptyText="No matching items found"
          />
        }
      />
      <StorybookCodeBlock
        title="Full width"
        code={`<VAutocomplete
  items={items}
  fullWidth
  placeholder="Full width search"
/>`}
        preview={<VAutocomplete items={fruitOptions} fullWidth placeholder="Full width search" />}
      />
      <StorybookCodeBlock
        title="With disabled options"
        code={`<VAutocomplete
  items={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana', disabled: true },
    { value: 'cherry', label: 'Cherry' },
  ]}
  placeholder="Some options disabled"
/>`}
        preview={
          <VAutocomplete
            items={[
              { value: "apple", label: "Apple" },
              { value: "banana", label: "Banana", disabled: true },
              { value: "cherry", label: "Cherry" },
            ]}
            placeholder="Some options disabled"
          />
        }
      />
      <StorybookCodeBlock
        title="Search Form"
        code={`<VForm onSubmit={handleSearch}>
  <VTextField label="Keyword" placeholder="Enter keyword" />
  <VAutocomplete
    items={[
      { value: 'flutter', label: 'Flutter' },
      { value: 'dart', label: 'Dart' },
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
    ]}
    label="Category"
    placeholder="Search category..."
  />
  <VButton type="submit">Search</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VTextField label="Keyword" placeholder="Enter keyword" />
            <VAutocomplete
              items={[
                { value: "flutter", label: "Flutter" },
                { value: "dart", label: "Dart" },
                { value: "react", label: "React" },
                { value: "vue", label: "Vue" },
              ]}
              label="Category"
              placeholder="Search category..."
            />
            <VButton>Search</VButton>
          </VForm>
        }
      />
    </StorybookPageLayout>
  ),
};
