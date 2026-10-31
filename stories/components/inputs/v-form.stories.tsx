import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  VForm,
  VFormField,
  VTextField,
  VTextArea,
  VButton,
  VCheckbox,
  VSelect,
  VSelectTrigger,
  VSelectContent,
  VSelectItem,
  VSwitch,
  VRadioGroup,
  VRadio,
  VSlider,
} from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VForm> = {
  title: "Components/Inputs/VForm",
  component: VForm,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {},
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
      title="VForm"
      description="Form container component that wraps form elements and handles submission."
    >
      <StorybookSection title="Form Patterns">
        <StorybookSubsection title="simple form" labels={["basic structure"]}>
          <VForm className="max-w-md" onSubmit={(e) => e.preventDefault()}>
            <VTextField label="Username" placeholder="Enter username" />
            <VButton>Submit</VButton>
          </VForm>
        </StorybookSubsection>
        <StorybookSubsection title="contact form" labels={["VFormField composition"]}>
          <VForm className="max-w-md" onSubmit={(e) => e.preventDefault()}>
            <VFormField label="Name" required>
              <VTextField placeholder="John Doe" />
            </VFormField>
            <VFormField label="Email" required>
              <VTextField type="email" placeholder="john@example.com" />
            </VFormField>
            <VFormField label="Message">
              <VTextArea placeholder="Enter your message..." rows={4} />
            </VFormField>
            <VCheckbox label="I agree to the privacy policy" />
            <VButton>Send Message</VButton>
          </VForm>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="default" labels={["default"]}>
          <VForm className="max-w-md" onSubmit={(e) => e.preventDefault()}>
            <VTextField label="Email" placeholder="Enter email" />
            <VButton>Submit</VButton>
          </VForm>
        </StorybookSubsection>
        <StorybookSubsection title="validation errors" labels={["error states"]}>
          <VForm className="max-w-md" onSubmit={(e) => e.preventDefault()}>
            <VTextField
              label="Email"
              placeholder="Enter email"
              error
              errorText="Invalid email format"
            />
            <VTextField
              label="Password"
              type="password"
              error
              errorText="Must be at least 8 characters"
            />
            <VButton>Submit</VButton>
          </VForm>
        </StorybookSubsection>
        <StorybookSubsection title="disabled" labels={["disabled fields"]}>
          <VForm className="max-w-md" onSubmit={(e) => e.preventDefault()}>
            <VTextField label="Email" placeholder="Email" disabled />
            <VButton disabled>Submit</VButton>
          </VForm>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Wrap related form inputs for data collection: login, registration, contact",
          },
          {
            category: "onSubmit",
            guideline: "Always call e.preventDefault() and handle submission programmatically",
          },
          {
            category: "Validation",
            guideline: "Validate on submit. Show inline errors per field. Disable submit if needed",
          },
          {
            category: "Layout",
            guideline: "Use VFormField for consistent spacing and label/error alignment",
          },
          {
            category: "Accessibility",
            guideline: "Use proper labels, required indicators, and error announcements",
          },
          {
            category: "Submit button",
            guideline:
              "Place submit button at the bottom. Use loading state during async submission",
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
      title="VForm Samples"
      description="Copy-paste code examples for common form patterns."
    >
      <StorybookCodeBlock
        title="Basic form"
        code={`<VForm onSubmit={(e) => {
  e.preventDefault()
  // handle form logic
}}>
  <VTextField label="Name" placeholder="Enter name" />
  <VButton type="submit">Submit</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VTextField label="Name" placeholder="Enter name" />
            <VButton>Submit</VButton>
          </VForm>
        }
      />
      <StorybookCodeBlock
        title="Login form"
        code={`<VForm onSubmit={handleLogin}>
  <VTextField label="Email" type="email" placeholder="email@example.com" />
  <VTextField label="Password" type="password" placeholder="Password" />
  <VButton type="submit" fullWidth>Sign In</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VTextField label="Email" type="email" placeholder="email@example.com" />
            <VTextField label="Password" type="password" placeholder="Password" />
            <VButton fullWidth>Sign In</VButton>
          </VForm>
        }
      />
      <StorybookCodeBlock
        title="Contact form"
        code={`<VForm onSubmit={handleContact}>
  <VFormField label="Name" required>
    <VTextField placeholder="John Doe" />
  </VFormField>
  <VFormField label="Email" required>
    <VTextField type="email" placeholder="john@example.com" />
  </VFormField>
  <VFormField label="Message">
    <VTextArea placeholder="Your message" rows={4} />
  </VFormField>
  <VCheckbox label="I agree to the privacy policy" />
  <VButton type="submit">Send</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VFormField label="Name" required>
              <VTextField placeholder="John Doe" />
            </VFormField>
            <VFormField label="Email" required>
              <VTextField type="email" placeholder="john@example.com" />
            </VFormField>
            <VFormField label="Message">
              <VTextArea placeholder="Your message" rows={4} />
            </VFormField>
            <VCheckbox label="I agree to the privacy policy" />
            <VButton>Send</VButton>
          </VForm>
        }
      />
      <StorybookCodeBlock
        title="Error state form"
        code={`<VForm>
  <VTextField
    label="Email"
    error
    errorText="Invalid email format"
  />
  <VButton type="submit">Submit</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VTextField label="Email" error errorText="Invalid email format" />
            <VButton>Submit</VButton>
          </VForm>
        }
      />
      <StorybookCodeBlock
        title="Registration Form"
        code={`<VForm onSubmit={handleRegister}>
  <VTextField label="Full Name" placeholder="Enter your name" />
  <VTextField label="Email" type="email" required placeholder="email@example.com" />
  <VSelect placeholder="Select country">
    <VSelectTrigger />
    <VSelectContent>
      <VSelectItem value="us">United States</VSelectItem>
      <VSelectItem value="kr">South Korea</VSelectItem>
      <VSelectItem value="jp">Japan</VSelectItem>
    </VSelectContent>
  </VSelect>
  <VCheckbox label="I agree to the Terms" />
  <VButton type="submit">Register</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VTextField label="Full Name" placeholder="Enter your name" />
            <VTextField label="Email" type="email" required placeholder="email@example.com" />
            <VSelect placeholder="Select country">
              <VSelectTrigger />
              <VSelectContent>
                <VSelectItem value="us">United States</VSelectItem>
                <VSelectItem value="kr">South Korea</VSelectItem>
                <VSelectItem value="jp">Japan</VSelectItem>
              </VSelectContent>
            </VSelect>
            <VCheckbox label="I agree to the Terms" />
            <VButton>Register</VButton>
          </VForm>
        }
      />
      <StorybookCodeBlock
        title="Settings Form"
        code={`<VForm onSubmit={handleSettings}>
  <VSwitch label="Dark Mode" />
  <VSwitch label="Notifications" defaultChecked />
  <VSlider aria-label="Volume" defaultValue={70} max={100} />
  <VButton type="submit">Save</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VSwitch label="Dark Mode" />
            <VSwitch label="Notifications" defaultChecked />
            <VSlider aria-label="Volume" defaultValue={70} max={100} />
            <VButton>Save</VButton>
          </VForm>
        }
      />
      <StorybookCodeBlock
        title="Survey Form"
        code={`<VForm onSubmit={handleSurvey}>
  <VRadioGroup defaultValue="good">
    <VRadio value="good" label="Good" />
    <VRadio value="average" label="Average" />
    <VRadio value="poor" label="Poor" />
  </VRadioGroup>
  <VCheckbox label="Design" />
  <VCheckbox label="Performance" />
  <VCheckbox label="Usability" />
  <VTextArea label="Additional Comments" placeholder="Your feedback..." rows={3} />
  <VButton type="submit">Submit Survey</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VRadioGroup defaultValue="good">
              <VRadio value="good" label="Good" />
              <VRadio value="average" label="Average" />
              <VRadio value="poor" label="Poor" />
            </VRadioGroup>
            <VCheckbox label="Design" />
            <VCheckbox label="Performance" />
            <VCheckbox label="Usability" />
            <VTextArea label="Additional Comments" placeholder="Your feedback..." rows={3} />
            <VButton>Submit Survey</VButton>
          </VForm>
        }
      />
      <StorybookCodeBlock
        title="Profile Form"
        code={`<VForm onSubmit={handleProfile}>
  <VTextField label="Display Name" placeholder="Enter display name" />
  <VTextArea label="Bio" placeholder="Tell us about yourself" rows={3} />
  <VSwitch label="Public Profile" />
  <VButton type="submit">Save Profile</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VTextField label="Display Name" placeholder="Enter display name" />
            <VTextArea label="Bio" placeholder="Tell us about yourself" rows={3} />
            <VSwitch label="Public Profile" />
            <VButton>Save Profile</VButton>
          </VForm>
        }
      />
      <StorybookCodeBlock
        title="Search Filter Form"
        code={`<VForm onSubmit={handleFilter}>
  <VTextField label="Keyword" placeholder="Search..." />
  <VSelect placeholder="Category">
    <VSelectTrigger />
    <VSelectContent>
      <VSelectItem value="all">All</VSelectItem>
      <VSelectItem value="tech">Technology</VSelectItem>
      <VSelectItem value="design">Design</VSelectItem>
    </VSelectContent>
  </VSelect>
  <VButton type="submit">Search</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VTextField label="Keyword" placeholder="Search..." />
            <VSelect placeholder="Category">
              <VSelectTrigger />
              <VSelectContent>
                <VSelectItem value="all">All</VSelectItem>
                <VSelectItem value="tech">Technology</VSelectItem>
                <VSelectItem value="design">Design</VSelectItem>
              </VSelectContent>
            </VSelect>
            <VButton>Search</VButton>
          </VForm>
        }
      />
      <StorybookCodeBlock
        title="Preferences Form"
        code={`<VForm onSubmit={handlePreferences}>
  <VRadioGroup defaultValue="light">
    <VRadio value="light" label="Light" />
    <VRadio value="dark" label="Dark" />
    <VRadio value="system" label="System" />
  </VRadioGroup>
  <VSlider aria-label="Font size" defaultValue={50} max={100} />
  <VCheckbox label="Enable notifications" />
  <VButton type="submit">Apply</VButton>
</VForm>`}
        preview={
          <VForm onSubmit={(e) => e.preventDefault()} className="max-w-md">
            <VRadioGroup defaultValue="light">
              <VRadio value="light" label="Light" />
              <VRadio value="dark" label="Dark" />
              <VRadio value="system" label="System" />
            </VRadioGroup>
            <VSlider aria-label="Font size" defaultValue={50} max={100} />
            <VCheckbox label="Enable notifications" />
            <VButton>Apply</VButton>
          </VForm>
        }
      />
    </StorybookPageLayout>
  ),
};
