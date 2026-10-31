import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VTextField, VForm, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VTextField> = {
  title: "Components/Inputs/VTextField",
  component: VTextField,
  tags: ["autodocs"],
  args: {
    size: "md",
    variant: "outlined",
    placeholder: "Enter text...",
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
      title="VTextField"
      description="Single-line text input for forms and data entry."
    >
      <StorybookSection title="Types">
        <StorybookSubsection title="text" labels={['type="text"']}>
          <VTextField type="text" placeholder="Enter your name" />
        </StorybookSubsection>
        <StorybookSubsection title="email" labels={['type="email"']}>
          <VTextField type="email" placeholder="user@example.com" />
        </StorybookSubsection>
        <StorybookSubsection title="password" labels={['type="password"']}>
          <VTextField type="password" placeholder="Password" />
        </StorybookSubsection>
        <StorybookSubsection title="number" labels={['type="number"']}>
          <VTextField type="number" placeholder="0" />
        </StorybookSubsection>
        <StorybookSubsection title="search" labels={['type="search"']}>
          <VTextField type="search" placeholder="Search..." />
        </StorybookSubsection>
        <StorybookSubsection title="phone" labels={['type="tel"']}>
          <VTextField type="tel" placeholder="010-1234-5678" />
        </StorybookSubsection>
        <StorybookSubsection title="url" labels={['type="url"']}>
          <VTextField type="url" placeholder="https://example.com" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Variants">
        <StorybookSubsection title="outlined" labels={['variant="outlined"']}>
          <VTextField variant="outlined" placeholder="Outlined" />
        </StorybookSubsection>
        <StorybookSubsection title="filled" labels={['variant="filled"']}>
          <VTextField variant="filled" placeholder="Filled" />
        </StorybookSubsection>
        <StorybookSubsection title="underline" labels={['variant="underline"']}>
          <VTextField variant="underline" placeholder="Underline" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Sizes">
        <StorybookSubsection title="sm" labels={['size="sm"']}>
          <VTextField size="sm" placeholder="Small" />
        </StorybookSubsection>
        <StorybookSubsection title="md" labels={['size="md"']}>
          <VTextField size="md" placeholder="Medium" />
        </StorybookSubsection>
        <StorybookSubsection title="lg" labels={['size="lg"']}>
          <VTextField size="lg" placeholder="Large" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Label & Helper Text">
        <StorybookSubsection title="label" labels={['label="..."']}>
          <VTextField label="Username" placeholder="Enter username" />
        </StorybookSubsection>
        <StorybookSubsection title="helper text" labels={['helper="..."']}>
          <VTextField
            label="Email"
            placeholder="user@example.com"
            helper="We will never share your email"
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="default" labels={["default"]}>
          <VTextField placeholder="Default state" />
        </StorybookSubsection>
        <StorybookSubsection title="disabled" labels={["disabled"]}>
          <VTextField disabled placeholder="Disabled" />
        </StorybookSubsection>
        <StorybookSubsection title="error" labels={["error", 'errorText="..."']}>
          <VTextField
            label="Name"
            error
            errorText="This field is required"
            placeholder="Error state"
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Adornments">
        <StorybookSubsection title="start adornment" labels={["leading={...}"]}>
          <VTextField
            leading={<span style={{ color: "var(--v-muted-foreground)" }}>$</span>}
            placeholder="0.00"
          />
        </StorybookSubsection>
        <StorybookSubsection title="end adornment" labels={["trailing={...}"]}>
          <VTextField
            trailing={<span style={{ color: "var(--v-muted-foreground)" }}>kg</span>}
            placeholder="Weight"
          />
        </StorybookSubsection>
        <StorybookSubsection title="both" labels={["leading", "trailing"]}>
          <VTextField
            leading={<span style={{ color: "var(--v-muted-foreground)" }}>@</span>}
            trailing={<span style={{ color: "var(--v-muted-foreground)" }}>.com</span>}
            placeholder="username"
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Full Width">
        <StorybookSubsection title="full width" labels={["fullWidth"]}>
          <VTextField fullWidth placeholder="Full width input" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Short single-line input: names, emails, passwords, search queries",
          },
          {
            category: "Label",
            guideline: "Always provide a label for accessibility. Use placeholder as hint only",
          },
          {
            category: "Validation",
            guideline: "Show error state with errorText on blur or submit, not on every keystroke",
          },
          {
            category: "Helper text",
            guideline: 'Use for format hints or constraints (e.g., "Max 50 characters")',
          },
          {
            category: "Disabled",
            guideline: "When input is not applicable in current context. Explain why if possible",
          },
          {
            category: "Adornments",
            guideline: "Use for units ($, kg) or icons. Keep them concise",
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
      title="VTextField Samples"
      description="Copy-paste code examples for common text field patterns."
    >
      <StorybookCodeBlock
        title="Basic input"
        code={`<VTextField label="Name" placeholder="Enter your name" />`}
        preview={<VTextField label="Name" placeholder="Enter your name" />}
      />
      <StorybookCodeBlock
        title="Email with helper text"
        code={`<VTextField
  type="email"
  label="Email"
  placeholder="user@example.com"
  helper="We will never share your email"
/>`}
        preview={
          <VTextField
            type="email"
            label="Email"
            placeholder="user@example.com"
            helper="We will never share your email"
          />
        }
      />
      <StorybookCodeBlock
        title="Password field"
        code={`<VTextField type="password" label="Password" placeholder="Enter password" />`}
        preview={<VTextField type="password" label="Password" placeholder="Enter password" />}
      />
      <StorybookCodeBlock
        title="Error state"
        code={`<VTextField
  label="Username"
  error
  errorText="Username is already taken"
  defaultValue="john_doe"
/>`}
        preview={
          <VTextField
            label="Username"
            error
            errorText="Username is already taken"
            defaultValue="john_doe"
          />
        }
      />
      <StorybookCodeBlock
        title="With adornment"
        code={`<VTextField
  leading={<span>$</span>}
  placeholder="0.00"
  type="number"
/>`}
        preview={
          <VTextField
            leading={<span style={{ color: "var(--v-muted-foreground)" }}>$</span>}
            placeholder="0.00"
            type="number"
          />
        }
      />
      <StorybookCodeBlock
        title="Full width"
        code={`<VTextField fullWidth placeholder="Full width input" />`}
        preview={<VTextField fullWidth placeholder="Full width input" />}
      />
      <StorybookCodeBlock
        title="Login Form"
        code={`<VForm onSubmit={handleLogin}>
  <VTextField type="email" label="Email" placeholder="Enter email" />
  <VTextField type="password" label="Password" placeholder="Enter password" />
  <VButton type="submit" fullWidth>Sign In</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VTextField type="email" label="Email" placeholder="Enter email" />
            <VTextField type="password" label="Password" placeholder="Enter password" />
            <VButton fullWidth>Sign In</VButton>
          </VForm>
        }
      />
      <StorybookCodeBlock
        title="Search with clear button"
        code={`<VTextField
  type="search"
  placeholder="Search..."
  clearable
  fullWidth
  onValueChange={(value) => performSearch(value)}
/>`}
        preview={
          <div style={{ width: 300 }}>
            <VTextField type="search" placeholder="Search..." clearable fullWidth />
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
