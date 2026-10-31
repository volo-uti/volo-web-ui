import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  VDialog,
  VDialogTrigger,
  VDialogContent,
  VDialogHeader,
  VDialogFooter,
  VDialogTitle,
  VDialogDescription,
  VDialogClose,
  VButton,
  VLabel,
  VTextField,
} from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const TriggerButton = ({ children }: { children: React.ReactNode }) => (
  <VDialogTrigger className="px-4 py-2 text-sm cursor-pointer">{children}</VDialogTrigger>
);

const meta: Meta<typeof VDialog> = {
  title: "Components/Feedback/VDialog",
  component: VDialog,
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
      title="VDialog"
      description="A modal dialog with backdrop, focus trap, and keyboard support using a compound component pattern."
    >
      <StorybookSection title="Basic Structure">
        <StorybookSubsection title="default dialog" labels={["VDialog compound pattern"]}>
          <VDialog>
            <TriggerButton>Open Basic Dialog</TriggerButton>
            <VDialogContent>
              <VDialogHeader>
                <VDialogTitle>Dialog Title</VDialogTitle>
                <VDialogDescription>
                  A description explaining the purpose of this dialog.
                </VDialogDescription>
              </VDialogHeader>
              <div className="p-6">
                <p className="text-sm">Body content is displayed here.</p>
              </div>
              <VDialogFooter>
                <VDialogClose>Close</VDialogClose>
              </VDialogFooter>
            </VDialogContent>
          </VDialog>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Dialog Types">
        <StorybookSubsection title="simple dialog" labels={["VDialog simple"]}>
          <VDialog>
            <TriggerButton>Simple Dialog</TriggerButton>
            <VDialogContent>
              <VDialogHeader>
                <VDialogTitle>Notice</VDialogTitle>
                <VDialogDescription>The operation has been completed.</VDialogDescription>
              </VDialogHeader>
              <VDialogFooter>
                <VDialogClose>OK</VDialogClose>
              </VDialogFooter>
            </VDialogContent>
          </VDialog>
        </StorybookSubsection>
        <StorybookSubsection title="form dialog" labels={["VDialog form content"]}>
          <VDialog>
            <TriggerButton>Edit Profile</TriggerButton>
            <VDialogContent>
              <VDialogHeader>
                <VDialogTitle>Edit Profile</VDialogTitle>
                <VDialogDescription>Enter your changes and save.</VDialogDescription>
              </VDialogHeader>
              <div className="p-6 space-y-4">
                <div>
                  <VLabel className="block text-sm font-medium mb-1">Name</VLabel>
                  <VTextField placeholder="Enter name" fullWidth />
                </div>
                <div>
                  <VLabel
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--v-foreground)" }}
                  >
                    Email
                  </VLabel>
                  <VTextField type="email" placeholder="Enter email" fullWidth />
                </div>
              </div>
              <VDialogFooter>
                <VDialogClose>Cancel</VDialogClose>
                <VButton>Save</VButton>
              </VDialogFooter>
            </VDialogContent>
          </VDialog>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Present focused content requiring user attention, such as forms, confirmations, or detailed views.",
          },
          {
            category: "When not to use",
            guideline:
              "For destructive confirmations where the user must explicitly act. Use VAlertDialog instead.",
          },
          {
            category: "Accessibility",
            guideline:
              "Focus is trapped inside the dialog. Pressing Escape or clicking the backdrop closes it.",
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
      title="VDialog Samples"
      description="Copy-paste code examples for VDialog."
    >
      <StorybookCodeBlock
        title="Basic dialog"
        code={`<VDialog>
  <VDialogTrigger>Open</VDialogTrigger>
  <VDialogContent>
    <VDialogHeader>
      <VDialogTitle>Title</VDialogTitle>
      <VDialogDescription>Description text</VDialogDescription>
    </VDialogHeader>
    <VDialogFooter>
      <VDialogClose>Close</VDialogClose>
    </VDialogFooter>
  </VDialogContent>
</VDialog>`}
        preview={
          <VDialog>
            <TriggerButton>Open</TriggerButton>
            <VDialogContent>
              <VDialogHeader>
                <VDialogTitle>Title</VDialogTitle>
                <VDialogDescription>Description text</VDialogDescription>
              </VDialogHeader>
              <VDialogFooter>
                <VDialogClose>Close</VDialogClose>
              </VDialogFooter>
            </VDialogContent>
          </VDialog>
        }
      />
      <StorybookCodeBlock
        title="Confirmation dialog"
        code={`<VDialog>
  <VDialogTrigger>Delete</VDialogTrigger>
  <VDialogContent>
    <VDialogHeader>
      <VDialogTitle>Delete Item</VDialogTitle>
      <VDialogDescription>Are you sure you want to delete this item?</VDialogDescription>
    </VDialogHeader>
    <VDialogFooter>
      <VDialogClose>Cancel</VDialogClose>
      <VButton onClick={handleDelete}>Delete</VButton>
    </VDialogFooter>
  </VDialogContent>
</VDialog>`}
        preview={
          <VDialog>
            <VDialogTrigger className="px-4 py-2 text-sm cursor-pointer">Delete</VDialogTrigger>
            <VDialogContent>
              <VDialogHeader>
                <VDialogTitle>Delete Item</VDialogTitle>
                <VDialogDescription>Are you sure you want to delete this item?</VDialogDescription>
              </VDialogHeader>
              <VDialogFooter>
                <VDialogClose>Cancel</VDialogClose>
                <VButton variant="outlined" size="sm">
                  Delete
                </VButton>
              </VDialogFooter>
            </VDialogContent>
          </VDialog>
        }
      />
      <StorybookCodeBlock
        title="Form dialog"
        code={`<VDialog>
  <VDialogTrigger>Add New Item</VDialogTrigger>
  <VDialogContent>
    <VDialogHeader>
      <VDialogTitle>New Item</VDialogTitle>
      <VDialogDescription>Enter the new item details.</VDialogDescription>
    </VDialogHeader>
    <form className="p-6">
      <VTextField placeholder="Item name" fullWidth />
    </form>
    <VDialogFooter>
      <VDialogClose>Cancel</VDialogClose>
      <VButton type="submit">Add</VButton>
    </VDialogFooter>
  </VDialogContent>
</VDialog>`}
        preview={
          <VDialog>
            <TriggerButton>Add New Item</TriggerButton>
            <VDialogContent>
              <VDialogHeader>
                <VDialogTitle>New Item</VDialogTitle>
                <VDialogDescription>Enter the new item details.</VDialogDescription>
              </VDialogHeader>
              <div className="p-6">
                <VTextField placeholder="Item name" fullWidth />
              </div>
              <VDialogFooter>
                <VDialogClose>Cancel</VDialogClose>
                <VButton variant="outlined" size="sm">
                  Add
                </VButton>
              </VDialogFooter>
            </VDialogContent>
          </VDialog>
        }
      />
      <StorybookCodeBlock
        title="Image preview dialog"
        code={`<VDialog>
  <VDialogTrigger>
    <VImage src="/photo.jpg" alt="Thumbnail" className="w-24 h-24 object-cover rounded cursor-pointer" />
  </VDialogTrigger>
  <VDialogContent>
    <VDialogHeader>
      <VDialogTitle>Image Preview</VDialogTitle>
    </VDialogHeader>
    <div className="p-6 flex justify-center">
      <VImage src="/photo.jpg" alt="Full size" className="max-w-full max-h-[60vh] rounded" />
    </div>
    <VDialogFooter>
      <VDialogClose>Close</VDialogClose>
    </VDialogFooter>
  </VDialogContent>
</VDialog>`}
        preview={
          <VDialog>
            <VDialogTrigger>
              <div
                className="w-24 h-24 flex items-center justify-center cursor-pointer text-xs"
                style={{
                  backgroundColor: "var(--v-muted)",
                  borderRadius: "var(--v-radius-md)",
                  color: "var(--v-muted-foreground)",
                }}
              >
                Click image
              </div>
            </VDialogTrigger>
            <VDialogContent>
              <VDialogHeader>
                <VDialogTitle>Image Preview</VDialogTitle>
              </VDialogHeader>
              <div className="p-6 flex justify-center">
                <div
                  className="w-full h-48 flex items-center justify-center text-sm"
                  style={{
                    backgroundColor: "var(--v-muted)",
                    borderRadius: "var(--v-radius-md)",
                    color: "var(--v-muted-foreground)",
                  }}
                >
                  Full-size image area
                </div>
              </div>
              <VDialogFooter>
                <VDialogClose>Close</VDialogClose>
              </VDialogFooter>
            </VDialogContent>
          </VDialog>
        }
      />
      <StorybookCodeBlock
        title="Multi-step dialog"
        code={`<VDialog>
  <VDialogTrigger>Start Setup</VDialogTrigger>
  <VDialogContent>
    <VDialogHeader>
      <VDialogTitle>Setup Wizard — Step 1 of 3</VDialogTitle>
      <VDialogDescription>Configure your workspace settings.</VDialogDescription>
    </VDialogHeader>
    <div className="p-6">
      <VTextField placeholder="Workspace name" fullWidth />
    </div>
    <VDialogFooter>
      <VDialogClose>Cancel</VDialogClose>
      <VButton>Next</VButton>
    </VDialogFooter>
  </VDialogContent>
</VDialog>`}
        preview={
          <VDialog>
            <TriggerButton>Start Setup</TriggerButton>
            <VDialogContent>
              <VDialogHeader>
                <VDialogTitle>Setup Wizard &mdash; Step 1 of 3</VDialogTitle>
                <VDialogDescription>Configure your workspace settings.</VDialogDescription>
              </VDialogHeader>
              <div className="p-6 space-y-4">
                <div>
                  <VLabel
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--v-foreground)" }}
                  >
                    Workspace Name
                  </VLabel>
                  <VTextField placeholder="My Workspace" fullWidth />
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-1 flex-1 rounded"
                    style={{ backgroundColor: "var(--v-primary)" }}
                  />
                  <div
                    className="h-1 flex-1 rounded"
                    style={{ backgroundColor: "var(--v-muted)" }}
                  />
                  <div
                    className="h-1 flex-1 rounded"
                    style={{ backgroundColor: "var(--v-muted)" }}
                  />
                </div>
              </div>
              <VDialogFooter>
                <VDialogClose>Cancel</VDialogClose>
                <VButton>Next</VButton>
              </VDialogFooter>
            </VDialogContent>
          </VDialog>
        }
      />
    </StorybookPageLayout>
  ),
};
