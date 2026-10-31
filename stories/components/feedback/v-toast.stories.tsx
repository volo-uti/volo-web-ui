import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VToaster, toast, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const ToastButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <VButton variant="outlined" size="sm" onClick={onClick}>
    {label}
  </VButton>
);

const meta: Meta<typeof VToaster> = {
  title: "Components/Feedback/VToast",
  component: VToaster,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    position: "bottom-right",
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <VToaster position="bottom-right" />
      </div>
    ),
  ],
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
      title="VToast"
      description="Displays brief notification messages to the user. Triggered via the toast() function."
    >
      <StorybookSection title="Variants">
        <StorybookSubsection title="default" labels={["toast.default()"]}>
          <ToastButton
            label="Default"
            onClick={() => toast.default("This is a default toast message.")}
          />
        </StorybookSubsection>
        <StorybookSubsection title="success" labels={["toast.success()"]}>
          <ToastButton
            label="Success"
            onClick={() => toast.success("Operation completed successfully!")}
          />
        </StorybookSubsection>
        <StorybookSubsection title="info" labels={["toast.info()"]}>
          <ToastButton
            label="Info"
            onClick={() => toast.info("Here is some useful information.")}
          />
        </StorybookSubsection>
        <StorybookSubsection title="warning" labels={["toast.warning()"]}>
          <ToastButton
            label="Warning"
            onClick={() => toast.warning("Please review this before continuing.")}
          />
        </StorybookSubsection>
        <StorybookSubsection title="error" labels={["toast.error()"]}>
          <ToastButton label="Error" onClick={() => toast.error("An error has occurred!")} />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Duration">
        <StorybookSubsection title="short (2s)" labels={["toast duration: 2000"]}>
          <ToastButton
            label="2 seconds"
            onClick={() => toast.info("Disappears in 2 seconds", { duration: 2000 })}
          />
        </StorybookSubsection>
        <StorybookSubsection title="default (5s)" labels={["toast duration: 5000"]}>
          <ToastButton
            label="5 seconds (default)"
            onClick={() => toast.info("Disappears in 5 seconds")}
          />
        </StorybookSubsection>
        <StorybookSubsection title="persistent" labels={["toast duration: 0"]}>
          <ToastButton
            label="Manual dismiss"
            onClick={() => toast.info("Dismiss manually by clicking close", { duration: 0 })}
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Show brief, non-blocking feedback like save confirmations, error notifications, or status updates.",
          },
          {
            category: "When not to use",
            guideline:
              "For persistent important messages that require user acknowledgment. Use VAlert or VAlertDialog instead.",
          },
          {
            category: "Setup",
            guideline:
              "Place <VToaster /> once in your app root. Use toast.success(), toast.error(), etc. to trigger.",
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
    <StorybookPageLayout title="VToast Samples" description="Copy-paste code examples for VToast.">
      <StorybookCodeBlock
        title="Basic success toast"
        code={`import { toast } from '@volo-uti/volo-web-ui'

toast.success('Saved successfully!')`}
        preview={
          <VButton onClick={() => toast.success("Saved successfully!")}>Show Success Toast</VButton>
        }
      />
      <StorybookCodeBlock
        title="Error toast"
        code={`toast.error('Network error occurred. Please try again.')`}
        preview={
          <VButton
            color="destructive"
            onClick={() => toast.error("Network error occurred. Please try again.")}
          >
            Show Error Toast
          </VButton>
        }
      />
      <StorybookCodeBlock
        title="Custom duration"
        code={`toast.info('Disappears shortly', { duration: 2000 })`}
        preview={
          <ToastButton
            label="2 Second Toast"
            onClick={() => toast.info("Disappears shortly", { duration: 2000 })}
          />
        }
      />
      <StorybookCodeBlock
        title="Persistent toast (manual dismiss)"
        code={`toast.warning('Dismiss manually', { duration: 0 })`}
        preview={
          <ToastButton
            label="Persistent Toast"
            onClick={() => toast.warning("Dismiss manually", { duration: 0 })}
          />
        }
      />
      <StorybookCodeBlock
        title="Toaster setup (app root)"
        code={`// app/layout.tsx
import { VToaster } from '@volo-uti/volo-web-ui'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <VToaster position="bottom-right" />
      </body>
    </html>
  )
}`}
        preview={
          <p className="text-sm" style={{ color: "var(--v-muted-foreground)" }}>
            Place VToaster once in your app root.
          </p>
        }
      />
      <StorybookCodeBlock
        title="All types at once"
        code={`toast.default('Default message')
toast.success('Success message')
toast.info('Info message')
toast.warning('Warning message')
toast.error('Error message')`}
        preview={
          <div className="flex flex-wrap gap-2">
            <ToastButton label="Default" onClick={() => toast.default("Default message")} />
            <ToastButton label="Success" onClick={() => toast.success("Success message")} />
            <ToastButton label="Info" onClick={() => toast.info("Info message")} />
            <ToastButton label="Warning" onClick={() => toast.warning("Warning message")} />
            <ToastButton label="Error" onClick={() => toast.error("Error message")} />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Toast with action"
        code={`toast.success('Item deleted', {
  action: { label: 'Undo', onClick: () => restoreItem() },
})`}
        preview={
          <ToastButton
            label="Delete with Undo"
            onClick={() =>
              toast.success("Item deleted", { action: { label: "Undo", onClick: () => {} } })
            }
          />
        }
      />
    </StorybookPageLayout>
  ),
};
