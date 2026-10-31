import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  VAlertDialog,
  VAlertDialogTrigger,
  VAlertDialogContent,
  VAlertDialogTitle,
  VAlertDialogDescription,
  VAlertDialogAction,
  VAlertDialogCancel,
  VTextField,
} from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const DangerTrigger = ({ children }: { children: React.ReactNode }) => (
  <VAlertDialogTrigger className="px-4 py-2 text-sm cursor-pointer">{children}</VAlertDialogTrigger>
);

const OutlinedTrigger = ({ children }: { children: React.ReactNode }) => (
  <VAlertDialogTrigger className="px-4 py-2 text-sm cursor-pointer">{children}</VAlertDialogTrigger>
);

const meta: Meta<typeof VAlertDialog> = {
  title: "Components/Feedback/VAlertDialog",
  component: VAlertDialog,
  tags: ["autodocs"],
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
      title="VAlertDialog"
      description="A modal dialog for critical actions requiring explicit user confirmation. Escape never closes it; a backdrop click closes it only with `barrierDismissible`."
    >
      <StorybookSection title="Basic Structure">
        <StorybookSubsection title="delete confirmation" labels={["VAlertDialog compound pattern"]}>
          <VAlertDialog destructive>
            <DangerTrigger>Delete Account</DangerTrigger>
            <VAlertDialogContent>
              <VAlertDialogTitle>Are you absolutely sure?</VAlertDialogTitle>
              <VAlertDialogDescription>
                This action cannot be undone. Your account and all associated data will be
                permanently deleted.
              </VAlertDialogDescription>
              <div className="flex items-center justify-end gap-3 mt-6">
                <VAlertDialogCancel>Cancel</VAlertDialogCancel>
                <VAlertDialogAction>Delete</VAlertDialogAction>
              </div>
            </VAlertDialogContent>
          </VAlertDialog>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Use Cases">
        <StorybookSubsection title="discard changes" labels={["VAlertDialog discard changes"]}>
          <VAlertDialog>
            <OutlinedTrigger>Discard Changes</OutlinedTrigger>
            <VAlertDialogContent>
              <VAlertDialogTitle>You have unsaved changes</VAlertDialogTitle>
              <VAlertDialogDescription>
                If you leave now, all changes will be lost. Do you want to continue?
              </VAlertDialogDescription>
              <div className="flex items-center justify-end gap-3 mt-6">
                <VAlertDialogCancel>Keep Editing</VAlertDialogCancel>
                <VAlertDialogAction>Discard</VAlertDialogAction>
              </div>
            </VAlertDialogContent>
          </VAlertDialog>
        </StorybookSubsection>
        <StorybookSubsection title="delete item" labels={["VAlertDialog delete item"]}>
          <VAlertDialog destructive>
            <DangerTrigger>Delete Item</DangerTrigger>
            <VAlertDialogContent>
              <VAlertDialogTitle>Delete this item?</VAlertDialogTitle>
              <VAlertDialogDescription>
                This item will be permanently deleted. This action cannot be undone.
              </VAlertDialogDescription>
              <div className="flex items-center justify-end gap-3 mt-6">
                <VAlertDialogCancel>Cancel</VAlertDialogCancel>
                <VAlertDialogAction>Delete</VAlertDialogAction>
              </div>
            </VAlertDialogContent>
          </VAlertDialog>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "For destructive or irreversible actions that require explicit user confirmation before proceeding.",
          },
          {
            category: "When not to use",
            guideline: "For general content display or non-destructive forms. Use VDialog instead.",
          },
          {
            category: "Accessibility",
            guideline:
              "Cannot be dismissed by Escape or backdrop click. Users must explicitly choose an action.",
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
      title="VAlertDialog Samples"
      description="Copy-paste code examples for VAlertDialog."
    >
      <StorybookCodeBlock
        title="Delete confirmation"
        code={`<VAlertDialog>
  <VAlertDialogTrigger>Delete</VAlertDialogTrigger>
  <VAlertDialogContent>
    <VAlertDialogTitle>Are you sure?</VAlertDialogTitle>
    <VAlertDialogDescription>This action cannot be undone.</VAlertDialogDescription>
    <div className="flex justify-end gap-3 mt-6">
      <VAlertDialogCancel>Cancel</VAlertDialogCancel>
      <VAlertDialogAction>Delete</VAlertDialogAction>
    </div>
  </VAlertDialogContent>
</VAlertDialog>`}
        preview={
          <VAlertDialog>
            <DangerTrigger>Delete</DangerTrigger>
            <VAlertDialogContent>
              <VAlertDialogTitle>Are you sure?</VAlertDialogTitle>
              <VAlertDialogDescription>This action cannot be undone.</VAlertDialogDescription>
              <div className="flex items-center justify-end gap-3 mt-6">
                <VAlertDialogCancel>Cancel</VAlertDialogCancel>
                <VAlertDialogAction>Delete</VAlertDialogAction>
              </div>
            </VAlertDialogContent>
          </VAlertDialog>
        }
      />
      <StorybookCodeBlock
        title="Logout confirmation"
        code={`<VAlertDialog>
  <VAlertDialogTrigger>Log Out</VAlertDialogTrigger>
  <VAlertDialogContent>
    <VAlertDialogTitle>Log Out</VAlertDialogTitle>
    <VAlertDialogDescription>Are you sure you want to log out?</VAlertDialogDescription>
    <div className="flex justify-end gap-3 mt-6">
      <VAlertDialogCancel>Cancel</VAlertDialogCancel>
      <VAlertDialogAction>Log Out</VAlertDialogAction>
    </div>
  </VAlertDialogContent>
</VAlertDialog>`}
        preview={
          <VAlertDialog>
            <OutlinedTrigger>Log Out</OutlinedTrigger>
            <VAlertDialogContent>
              <VAlertDialogTitle>Log Out</VAlertDialogTitle>
              <VAlertDialogDescription>Are you sure you want to log out?</VAlertDialogDescription>
              <div className="flex items-center justify-end gap-3 mt-6">
                <VAlertDialogCancel>Cancel</VAlertDialogCancel>
                <VAlertDialogAction>Log Out</VAlertDialogAction>
              </div>
            </VAlertDialogContent>
          </VAlertDialog>
        }
      />
      <StorybookCodeBlock
        title="Payment confirmation"
        code={`<VAlertDialog>
  <VAlertDialogTrigger>Pay Now</VAlertDialogTrigger>
  <VAlertDialogContent>
    <VAlertDialogTitle>Confirm Payment</VAlertDialogTitle>
    <VAlertDialogDescription>You will be charged $29.99. Continue?</VAlertDialogDescription>
    <div className="flex justify-end gap-3 mt-6">
      <VAlertDialogCancel>Cancel</VAlertDialogCancel>
      <VAlertDialogAction>Pay</VAlertDialogAction>
    </div>
  </VAlertDialogContent>
</VAlertDialog>`}
        preview={
          <VAlertDialog>
            <VAlertDialogTrigger className="px-4 py-2 text-sm cursor-pointer">
              Pay Now
            </VAlertDialogTrigger>
            <VAlertDialogContent>
              <VAlertDialogTitle>Confirm Payment</VAlertDialogTitle>
              <VAlertDialogDescription>
                You will be charged $29.99. Do you want to continue?
              </VAlertDialogDescription>
              <div className="flex items-center justify-end gap-3 mt-6">
                <VAlertDialogCancel>Cancel</VAlertDialogCancel>
                <VAlertDialogAction>Pay</VAlertDialogAction>
              </div>
            </VAlertDialogContent>
          </VAlertDialog>
        }
      />
      <StorybookCodeBlock
        title="Unsaved changes warning"
        code={`<VAlertDialog>
  <VAlertDialogTrigger>Leave Page</VAlertDialogTrigger>
  <VAlertDialogContent>
    <VAlertDialogTitle>Unsaved Changes</VAlertDialogTitle>
    <VAlertDialogDescription>
      You have unsaved changes. If you leave this page, your changes will be lost.
    </VAlertDialogDescription>
    <div className="flex justify-end gap-3 mt-6">
      <VAlertDialogCancel>Stay</VAlertDialogCancel>
      <VAlertDialogAction>Leave</VAlertDialogAction>
    </div>
  </VAlertDialogContent>
</VAlertDialog>`}
        preview={
          <VAlertDialog>
            <OutlinedTrigger>Leave Page</OutlinedTrigger>
            <VAlertDialogContent>
              <VAlertDialogTitle>Unsaved Changes</VAlertDialogTitle>
              <VAlertDialogDescription>
                You have unsaved changes. If you leave this page, your changes will be lost.
              </VAlertDialogDescription>
              <div className="flex items-center justify-end gap-3 mt-6">
                <VAlertDialogCancel>Stay</VAlertDialogCancel>
                <VAlertDialogAction>Leave</VAlertDialogAction>
              </div>
            </VAlertDialogContent>
          </VAlertDialog>
        }
      />
      <StorybookCodeBlock
        title="Destructive with input"
        code={`<VAlertDialog>
  <VAlertDialogTrigger>Delete Project</VAlertDialogTrigger>
  <VAlertDialogContent>
    <VAlertDialogTitle>Delete "my-project"?</VAlertDialogTitle>
    <VAlertDialogDescription>
      This will permanently delete the project and all its data.
      Type the project name to confirm.
    </VAlertDialogDescription>
    <VTextField placeholder='Type "my-project" to confirm' fullWidth />
    <div className="flex justify-end gap-3 mt-6">
      <VAlertDialogCancel>Cancel</VAlertDialogCancel>
      <VAlertDialogAction>Delete Forever</VAlertDialogAction>
    </div>
  </VAlertDialogContent>
</VAlertDialog>`}
        preview={
          <VAlertDialog>
            <DangerTrigger>Delete Project</DangerTrigger>
            <VAlertDialogContent>
              <VAlertDialogTitle>Delete &quot;my-project&quot;?</VAlertDialogTitle>
              <VAlertDialogDescription>
                This will permanently delete the project and all its data. Type the project name to
                confirm.
              </VAlertDialogDescription>
              <VTextField placeholder='Type "my-project" to confirm' fullWidth />
              <div className="flex items-center justify-end gap-3 mt-6">
                <VAlertDialogCancel>Cancel</VAlertDialogCancel>
                <VAlertDialogAction>Delete Forever</VAlertDialogAction>
              </div>
            </VAlertDialogContent>
          </VAlertDialog>
        }
      />
    </StorybookPageLayout>
  ),
};
