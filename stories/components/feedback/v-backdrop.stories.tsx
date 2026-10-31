import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VBackdrop, VLoadingSpinner, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const BackdropDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <VButton onClick={() => setOpen(true)}>Show Backdrop</VButton>
      <VBackdrop open={open} onClick={() => setOpen(false)} />
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <p className="text-lg font-medium pointer-events-auto" style={{ color: "#ffffff" }}>
            Click the backdrop to close
          </p>
        </div>
      )}
    </>
  );
};

const LoadingOverlayDemo = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <VButton onClick={() => setLoading(true)}>Load Data</VButton>
      <VBackdrop open={loading} onClick={() => setLoading(false)} />
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <VLoadingSpinner size={48} color="#ffffff" />
        </div>
      )}
    </>
  );
};

const ClickToDismissDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <VButton onClick={() => setOpen(true)}>Show Content</VButton>
      <VBackdrop open={open} onClick={() => setOpen(false)} />
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <p className="text-lg font-medium pointer-events-auto" style={{ color: "#ffffff" }}>
            Click the backdrop to dismiss
          </p>
        </div>
      )}
    </>
  );
};

const meta: Meta<typeof VBackdrop> = {
  title: "Components/Feedback/VBackdrop",
  component: VBackdrop,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    open: false,
    opacity: 0.5,
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
      title="VBackdrop"
      description="A full-screen overlay displayed behind modals, drawers, or side panels."
    >
      <StorybookSection title="Basic Behavior">
        <StorybookSubsection title="open/close" labels={["VBackdrop open: boolean"]}>
          <BackdropDemo />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="closed" labels={["VBackdrop open={false}"]}>
          <div
            className="relative w-48 h-32 overflow-hidden"
            style={{ border: "1px solid var(--v-border)", borderRadius: "var(--v-radius-md)" }}
          >
            <p className="p-4 text-sm" style={{ color: "var(--v-muted-foreground)" }}>
              Backdrop: closed
            </p>
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="open" labels={["VBackdrop open={true}"]}>
          <div
            className="relative w-48 h-32 overflow-hidden"
            style={{ border: "1px solid var(--v-border)", borderRadius: "var(--v-radius-md)" }}
          >
            <p className="p-4 text-sm" style={{ color: "var(--v-muted-foreground)" }}>
              Backdrop: open
            </p>
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              aria-hidden="true"
            />
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Behind modals, drawers, or any overlay component that requires focus from the user.",
          },
          {
            category: "When not to use",
            guideline: "As a standalone component without an associated overlay content.",
          },
          {
            category: "Interaction",
            guideline:
              "Provide an onClick handler to allow dismissal by clicking the backdrop area.",
          },
        ]}
      />
    </StorybookPageLayout>
  ),
};

// ─── Sample ───
export const Sample: Story = {
  tags: ["!autodocs"],
  render: () => {
    const [basicOpen, setBasicOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    return (
      <StorybookPageLayout
        title="VBackdrop Samples"
        description="Copy-paste code examples for VBackdrop."
      >
        <StorybookCodeBlock
          title="Basic backdrop"
          code={`const [open, setOpen] = useState(false)

<VButton onClick={() => setOpen(true)}>Show</VButton>
<VBackdrop open={open} onClick={() => setOpen(false)} />`}
          preview={
            <>
              <VButton onClick={() => setBasicOpen(true)}>Show Backdrop</VButton>
              <VBackdrop open={basicOpen} onClick={() => setBasicOpen(false)} />
            </>
          }
        />
        <StorybookCodeBlock
          title="Backdrop behind modal"
          code={`<VBackdrop open={isOpen} onClick={() => setIsOpen(false)} />
{isOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded shadow">Modal content</div>
  </div>
)}`}
          preview={
            <>
              <VButton onClick={() => setModalOpen(true)}>Modal + Backdrop</VButton>
              <VBackdrop open={modalOpen} onClick={() => setModalOpen(false)} />
              {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                  <div
                    className="pointer-events-auto p-6 shadow-lg"
                    style={{
                      backgroundColor: "var(--v-card)",
                      color: "var(--v-card-foreground)",
                      borderRadius: "var(--v-radius-lg)",
                    }}
                  >
                    <p className="text-sm mb-4">Modal content goes here.</p>
                    <VButton variant="outlined" size="sm" onClick={() => setModalOpen(false)}>
                      Close
                    </VButton>
                  </div>
                </div>
              )}
            </>
          }
        />
        <StorybookCodeBlock
          title="Custom style"
          code={`<VBackdrop
  open={open}
  onClick={() => setOpen(false)}
  className="bg-black/70"
/>`}
          preview={
            <p className="text-sm" style={{ color: "var(--v-muted-foreground)" }}>
              Use the className prop to customize backdrop opacity and color.
            </p>
          }
        />
        <StorybookCodeBlock
          title="Loading overlay"
          code={`const [loading, setLoading] = useState(false)

<VButton onClick={() => setLoading(true)}>Load Data</VButton>
<VBackdrop open={loading} onClick={() => setLoading(false)} />
{loading && (
  <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
    <VLoadingSpinner size={48} color="#ffffff" />
  </div>
)}`}
          preview={<LoadingOverlayDemo />}
        />
        <StorybookCodeBlock
          title="Click to dismiss"
          code={`const [open, setOpen] = useState(false)

<VButton onClick={() => setOpen(true)}>Show</VButton>
<VBackdrop open={open} onClick={() => setOpen(false)} />
{open && (
  <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
    <p className="text-white text-lg pointer-events-auto">
      Click the backdrop to dismiss
    </p>
  </div>
)}`}
          preview={<ClickToDismissDemo />}
        />
      </StorybookPageLayout>
    );
  },
};
