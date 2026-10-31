import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VStepper, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const basicSteps = [{ label: "Account" }, { label: "Profile" }, { label: "Review" }];

const detailedSteps = [
  { label: "Account", description: "Create your account credentials" },
  { label: "Profile", description: "Fill in your personal information" },
  { label: "Preferences", description: "Set your notification preferences" },
  { label: "Review", description: "Review and confirm your details" },
];

const meta: Meta<typeof VStepper> = {
  title: "Components/Navigation/VStepper",
  component: VStepper,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    steps: basicSteps,
    orientation: "horizontal",
    alternativeLabel: false,
    value: 1,
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
      title="VStepper"
      description="Multi-step progress indicator for wizard-like workflows."
    >
      <StorybookSection title="Orientation">
        <StorybookSubsection title="horizontal" labels={['VStepper(orientation="horizontal")']}>
          <div className="w-full">
            <VStepper value={1} steps={basicSteps} orientation="horizontal" />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="vertical" labels={['VStepper(orientation="vertical")']}>
          <VStepper value={1} steps={detailedSteps} orientation="vertical" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Alternative Label">
        <StorybookSubsection title="labels below icons" labels={["VStepper(alternativeLabel)"]}>
          <div className="w-full">
            <VStepper value={1} steps={basicSteps} orientation="horizontal" alternativeLabel />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Active Step">
        <StorybookSubsection title="step 0 (start)" labels={["VStepper(value={0})"]}>
          <div className="w-full">
            <VStepper value={0} steps={basicSteps} />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="step 1 (middle)" labels={["VStepper(value={1})"]}>
          <div className="w-full">
            <VStepper value={1} steps={basicSteps} />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="step 2 (last)" labels={["VStepper(value={2})"]}>
          <div className="w-full">
            <VStepper value={2} steps={basicSteps} />
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="all completed" labels={["VStepper(value={3})"]}>
          <div className="w-full">
            <VStepper value={3} steps={basicSteps} />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Error State">
        <StorybookSubsection title="step with error" labels={["VStep(error)"]}>
          <div className="w-full">
            <VStepper
              value={1}
              steps={[{ label: "Account" }, { label: "Profile", error: true }, { label: "Review" }]}
            />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Optional Steps">
        <StorybookSubsection title="optional markers" labels={["VStep(optional)"]}>
          <div className="w-full">
            <VStepper
              value={1}
              steps={[
                { label: "Account" },
                { label: "Profile", optional: true },
                { label: "Preferences", optional: true },
                { label: "Review" },
              ]}
            />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="With Descriptions">
        <StorybookSubsection title="descriptive steps" labels={["VStep(description)"]}>
          <div className="w-full">
            <VStepper value={2} steps={detailedSteps} />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Multi-step forms, onboarding wizards, checkout flows",
          },
          { category: "Horizontal", guideline: "Default layout for standard multi-step processes" },
          { category: "Vertical", guideline: "Use for detailed steps with longer descriptions" },
          {
            category: "Error state",
            guideline: "Highlight steps that require user attention or correction",
          },
          { category: "Optional steps", guideline: "Mark steps the user can skip during the flow" },
        ]}
      />
    </StorybookPageLayout>
  ),
};

// ─── Sample ───
function CheckoutStepper() {
  const [step, setStep] = useState(0);
  const checkoutSteps = [
    { label: "Cart", description: "Review your items" },
    { label: "Shipping", description: "Delivery address" },
    { label: "Payment", description: "Payment method" },
    { label: "Confirm", description: "Place your order" },
  ];
  return (
    <div className="space-y-4 w-full">
      <VStepper value={step} steps={checkoutSteps} onValueChange={setStep} />
      <div className="p-4 border border-[var(--v-border)] rounded text-sm">
        {step === 0 && <p>Cart: 3 items — $149.97</p>}
        {step === 1 && <p>Enter your shipping address</p>}
        {step === 2 && <p>Add payment method</p>}
        {step >= 3 && <p>Order placed successfully!</p>}
      </div>
      <div className="flex gap-2">
        <VButton
          variant="outlined"
          size="sm"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
        >
          Back
        </VButton>
        <VButton size="sm" disabled={step === 3} onClick={() => setStep(step + 1)}>
          {step < 3 ? "Continue" : "Done"}
        </VButton>
      </div>
    </div>
  );
}

function Intervalueper() {
  const [step, setStep] = useState(0);
  const steps = [{ label: "Account Info" }, { label: "Profile Setup" }, { label: "Confirmation" }];
  return (
    <div className="space-y-6 w-full">
      <VStepper value={step} steps={steps} onValueChange={setStep} />
      <div className="flex gap-2">
        <VButton
          variant="outlined"
          size="sm"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
        >
          Previous
        </VButton>
        <VButton size="sm" disabled={step >= steps.length - 1} onClick={() => setStep(step + 1)}>
          {step < steps.length - 1 ? "Next" : "Finish"}
        </VButton>
      </div>
      <p className="text-sm text-[var(--v-muted-foreground)]">
        {step >= steps.length
          ? "All steps completed."
          : `Current step: ${step + 1} / ${steps.length}`}
      </p>
    </div>
  );
}

export const Sample: Story = {
  tags: ["!autodocs"],
  render: () => (
    <StorybookPageLayout
      title="VStepper Samples"
      description="Copy-paste code examples for common stepper patterns."
    >
      <StorybookCodeBlock
        title="Basic stepper"
        code={`<VStepper
  value={1}
  steps={[
    { label: 'Account' },
    { label: 'Profile' },
    { label: 'Review' },
  ]}
/>`}
        preview={<VStepper value={1} steps={basicSteps} />}
      />
      <StorybookCodeBlock
        title="Stepper with descriptions"
        code={`<VStepper
  value={2}
  steps={[
    { label: 'Account', description: 'Create your account' },
    { label: 'Profile', description: 'Fill in your info' },
    { label: 'Preferences', description: 'Set preferences' },
    { label: 'Review', description: 'Review details' },
  ]}
/>`}
        preview={<VStepper value={2} steps={detailedSteps} />}
      />
      <StorybookCodeBlock
        title="Vertical stepper"
        code={`<VStepper
  value={1}
  orientation="vertical"
  steps={[
    { label: 'Step 1', description: 'Description 1' },
    { label: 'Step 2', description: 'Description 2' },
    { label: 'Step 3', description: 'Description 3' },
  ]}
/>`}
        preview={
          <VStepper
            value={1}
            orientation="vertical"
            steps={[
              { label: "Step 1", description: "Description 1" },
              { label: "Step 2", description: "Description 2" },
              { label: "Step 3", description: "Description 3" },
            ]}
          />
        }
      />
      <StorybookCodeBlock
        title="Interactive stepper"
        code={`const [step, setStep] = useState(0)
const steps = [
  { label: 'Account Info' },
  { label: 'Profile Setup' },
  { label: 'Confirmation' },
]

<VStepper value={step} steps={steps} onValueChange={setStep} />
<VButton onClick={() => setStep(step - 1)}>Previous</VButton>
<VButton onClick={() => setStep(step + 1)}>Next</VButton>`}
        preview={<Intervalueper />}
      />
      <StorybookCodeBlock
        title="Error and optional steps"
        code={`<VStepper
  value={2}
  steps={[
    { label: 'Account' },
    { label: 'Profile', error: true },
    { label: 'Preferences', optional: true },
    { label: 'Review' },
  ]}
/>`}
        preview={
          <VStepper
            value={2}
            steps={[
              { label: "Account" },
              { label: "Profile", error: true },
              { label: "Preferences", optional: true },
              { label: "Review" },
            ]}
          />
        }
      />
      <StorybookCodeBlock
        title="Disabled step"
        code={`<VStepper
  defaultValue={0}
  onValueChange={setStep}
  steps={[{ label: 'Account' }, { label: 'Billing', disabled: true }, { label: 'Review' }]}
/>`}
        preview={
          <VStepper
            defaultValue={0}
            onValueChange={() => {}}
            steps={[
              { label: "Account" },
              { label: "Billing", disabled: true },
              { label: "Review" },
            ]}
          />
        }
      />
      <StorybookCodeBlock
        title="Checkout flow"
        code={`const [step, setStep] = useState(0)
const checkoutSteps = [
  { label: 'Cart', description: 'Review your items' },
  { label: 'Shipping', description: 'Delivery address' },
  { label: 'Payment', description: 'Payment method' },
  { label: 'Confirm', description: 'Place your order' },
]

<VStepper value={step} steps={checkoutSteps} onValueChange={setStep} />
<VSheet>
  {step === 0 && 'Cart: 3 items — $149.97'}
  {step === 1 && 'Enter your shipping address'}
  {step === 2 && 'Add payment method'}
  {step >= 3 && 'Order placed successfully!'}
</VSheet>
<VButton onClick={() => setStep(step + 1)}>
  {step < 3 ? 'Continue' : 'Done'}
</VButton>`}
        preview={<CheckoutStepper />}
      />
    </StorybookPageLayout>
  ),
};
