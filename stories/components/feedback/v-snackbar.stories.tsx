import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  VSnackbar,
  VButton,
  type VSnackbarBehavior,
  type VSnackbarVariant,
} from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const SnackbarButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <VButton variant="outlined" size="sm" onClick={onClick}>
    {label}
  </VButton>
);

const SnackbarDemo = ({
  variant = "default",
  behavior = "fixed",
  content = "This is a snackbar message.",
}: {
  variant?: VSnackbarVariant;
  behavior?: VSnackbarBehavior;
  content?: string;
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <SnackbarButton label={`Show ${variant}`} onClick={() => setOpen(true)} />
      <VSnackbar
        visible={open}
        variant={variant}
        content={content}
        behavior={behavior}
        onClose={() => setOpen(false)}
        duration={3000}
      />
    </>
  );
};

const meta: Meta<typeof VSnackbar> = {
  title: "Components/Feedback/VSnackbar",
  component: VSnackbar,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    behavior: "fixed",
    variant: "default",
    content: "Action completed successfully.",
    duration: 5000,
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
      title="VSnackbar"
      description="A notification message component that briefly appears at the bottom."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="default" labels={["VSnackbar"]}>
          <SnackbarDemo content="Default snackbar message." />
        </StorybookSubsection>
        <StorybookSubsection title="success" labels={["VSnackbar"]}>
          <SnackbarDemo variant="success" content="Operation completed successfully!" />
        </StorybookSubsection>
        <StorybookSubsection title="error" labels={['VSnackbar variant="error"']}>
          <SnackbarDemo variant="error" content="An error has occurred." />
        </StorybookSubsection>
        <StorybookSubsection title="warning" labels={['VSnackbar variant="warning"']}>
          <SnackbarDemo variant="warning" content="Please review before continuing." />
        </StorybookSubsection>
        <StorybookSubsection title="info" labels={['VSnackbar variant="info"']}>
          <SnackbarDemo variant="info" content="Here is some useful information." />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Behavior">
        <StorybookSubsection title="fixed" labels={['VSnackbar behavior="fixed"']}>
          <SnackbarDemo behavior="fixed" content="Fixed at the bottom of the viewport." />
        </StorybookSubsection>
        <StorybookSubsection title="floating" labels={['VSnackbar behavior="floating"']}>
          <SnackbarDemo behavior="floating" content="Floating snackbar." />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Show brief, non-blocking feedback such as save confirmations or action results.",
          },
          {
            category: "When not to use",
            guideline:
              "For persistent messages requiring user acknowledgment. Use VAlert or VAlertDialog instead.",
          },
          {
            category: "Duration",
            guideline:
              "Keep duration between 3-5 seconds. Use longer durations for important messages.",
          },
          {
            category: "Position",
            guideline: "Display at the bottom of the screen to minimize content obstruction",
          },
          {
            category: "Timing",
            guideline: "Provide enough time for users to read and act",
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
      title="VSnackbar Samples"
      description="Copy-paste code examples for VSnackbar."
    >
      <StorybookCodeBlock
        title="Basic usage"
        code={`const [open, setOpen] = useState(false);

<VButton onClick={() => setOpen(true)}>Show</VButton>
<VSnackbar
  content="Default snackbar message"
  visible={open}
  onClose={() => setOpen(false)}
/>`}
        preview={<SnackbarDemo variant="default" content="Default snackbar message" />}
      />
      <StorybookCodeBlock
        title="Success snackbar"
        code={`<VSnackbar
  content="Saved successfully."
  variant="success"
  visible={open}
  onClose={() => setOpen(false)}
/>`}
        preview={<SnackbarDemo variant="success" content="Saved successfully." />}
      />
      <StorybookCodeBlock
        title="With action"
        code={`<VSnackbar
  content="Item deleted."
  visible={open}
  onClose={() => setOpen(false)}
  action={{ label: 'Undo', onClick: () => {} }}
/>`}
        preview={<SnackbarDemo variant="default" content="Item deleted." />}
      />
      <StorybookCodeBlock
        title="Undo action"
        code={`<VSnackbar
  content="Item moved to trash."
  variant="default"
  visible={open}
  onClose={() => setOpen(false)}
  action={{ label: 'Undo', onClick: handleUndo }}
  duration={5000}
/>`}
        preview={<SnackbarDemo variant="default" content="Item moved to trash." />}
      />
      <StorybookCodeBlock
        title="Error notification"
        code={`<VSnackbar
  content="Failed to save changes. Please try again."
  variant="error"
  visible={open}
  onClose={() => setOpen(false)}
  action={{ label: 'Retry', onClick: handleRetry }}
  duration={0}
/>`}
        preview={
          <SnackbarDemo variant="error" content="Failed to save changes. Please try again." />
        }
      />
    </StorybookPageLayout>
  ),
};
