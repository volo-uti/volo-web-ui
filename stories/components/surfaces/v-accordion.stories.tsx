import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  VAccordion,
  VAccordionItem,
  VAccordionTrigger,
  VAccordionContent,
  VButton,
  VCheckbox,
  VTextField,
} from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VAccordion> = {
  title: "Components/Surfaces/VAccordion",
  component: VAccordion,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    type: "single",
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
      title="VAccordion"
      description="Collapsible content sections built with compound components."
    >
      <StorybookSection title="Type">
        <StorybookSubsection title="single" labels={['VAccordion(type="single")']}>
          <div className="w-full max-w-md">
            <VAccordion type="single" defaultValue="item-1">
              <VAccordionItem value="item-1">
                <VAccordionTrigger>Section 1</VAccordionTrigger>
                <VAccordionContent>Only one section can be open at a time.</VAccordionContent>
              </VAccordionItem>
              <VAccordionItem value="item-2">
                <VAccordionTrigger>Section 2</VAccordionTrigger>
                <VAccordionContent>Opening this section closes the other.</VAccordionContent>
              </VAccordionItem>
              <VAccordionItem value="item-3">
                <VAccordionTrigger>Section 3</VAccordionTrigger>
                <VAccordionContent>
                  Single mode allows one expanded item at a time.
                </VAccordionContent>
              </VAccordionItem>
            </VAccordion>
          </div>
        </StorybookSubsection>
        <StorybookSubsection title="multiple" labels={['VAccordion(type="multiple")']}>
          <div className="w-full max-w-md">
            <VAccordion type="multiple" defaultValue={["item-1", "item-2"]}>
              <VAccordionItem value="item-1">
                <VAccordionTrigger>Panel 1</VAccordionTrigger>
                <VAccordionContent>Multiple sections can be open simultaneously.</VAccordionContent>
              </VAccordionItem>
              <VAccordionItem value="item-2">
                <VAccordionTrigger>Panel 2</VAccordionTrigger>
                <VAccordionContent>This section is also open by default.</VAccordionContent>
              </VAccordionItem>
              <VAccordionItem value="item-3">
                <VAccordionTrigger>Panel 3</VAccordionTrigger>
                <VAccordionContent>Click to expand this section as well.</VAccordionContent>
              </VAccordionItem>
            </VAccordion>
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Disabled">
        <StorybookSubsection title="disabled item" labels={["VAccordionItem(disabled)"]}>
          <div className="w-full max-w-md">
            <VAccordion type="single">
              <VAccordionItem value="item-1">
                <VAccordionTrigger>Enabled item</VAccordionTrigger>
                <VAccordionContent>This item works normally.</VAccordionContent>
              </VAccordionItem>
              <VAccordionItem value="item-2" disabled>
                <VAccordionTrigger>Disabled item</VAccordionTrigger>
                <VAccordionContent>This content is not accessible.</VAccordionContent>
              </VAccordionItem>
              <VAccordionItem value="item-3">
                <VAccordionTrigger>Another enabled item</VAccordionTrigger>
                <VAccordionContent>This item also works normally.</VAccordionContent>
              </VAccordionItem>
            </VAccordion>
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Default Value">
        <StorybookSubsection title="pre-expanded" labels={['VAccordion(defaultValue="item-2")']}>
          <div className="w-full max-w-md">
            <VAccordion type="single" defaultValue="item-2">
              <VAccordionItem value="item-1">
                <VAccordionTrigger>First item</VAccordionTrigger>
                <VAccordionContent>This item is closed by default.</VAccordionContent>
              </VAccordionItem>
              <VAccordionItem value="item-2">
                <VAccordionTrigger>Second item (default open)</VAccordionTrigger>
                <VAccordionContent>This item is expanded by default.</VAccordionContent>
              </VAccordionItem>
            </VAccordion>
          </div>
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Show/hide sections of content like FAQs, settings panels",
          },
          {
            category: "Single mode",
            guideline: "Use when only one section should be visible at a time",
          },
          {
            category: "Multiple mode",
            guideline: "Use when users may need to compare content across sections",
          },
          { category: "Disabled", guideline: "Disable items that are temporarily unavailable" },
          {
            category: "Default value",
            guideline: "Pre-expand the most relevant section for the user",
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
      title="VAccordion Samples"
      description="Copy-paste code examples for common accordion patterns."
    >
      <StorybookCodeBlock
        title="Basic accordion"
        code={`<VAccordion type="single" defaultValue="item-1">
  <VAccordionItem value="item-1">
    <VAccordionTrigger>Section 1</VAccordionTrigger>
    <VAccordionContent>Content 1</VAccordionContent>
  </VAccordionItem>
  <VAccordionItem value="item-2">
    <VAccordionTrigger>Section 2</VAccordionTrigger>
    <VAccordionContent>Content 2</VAccordionContent>
  </VAccordionItem>
</VAccordion>`}
        preview={
          <div className="w-full max-w-md">
            <VAccordion type="single" defaultValue="item-1">
              <VAccordionItem value="item-1">
                <VAccordionTrigger>Section 1</VAccordionTrigger>
                <VAccordionContent>Content 1</VAccordionContent>
              </VAccordionItem>
              <VAccordionItem value="item-2">
                <VAccordionTrigger>Section 2</VAccordionTrigger>
                <VAccordionContent>Content 2</VAccordionContent>
              </VAccordionItem>
            </VAccordion>
          </div>
        }
      />
      <StorybookCodeBlock
        title="FAQ pattern"
        code={`<VAccordion type="single">
  <VAccordionItem value="q1">
    <VAccordionTrigger>What is Volo Web UI?</VAccordionTrigger>
    <VAccordionContent>A modern design system for React.</VAccordionContent>
  </VAccordionItem>
  <VAccordionItem value="q2">
    <VAccordionTrigger>How do I install it?</VAccordionTrigger>
    <VAccordionContent>npm install @volo-uti/volo-web-ui</VAccordionContent>
  </VAccordionItem>
</VAccordion>`}
        preview={
          <div className="w-full max-w-md">
            <VAccordion type="single">
              <VAccordionItem value="q1">
                <VAccordionTrigger>What is Volo Web UI?</VAccordionTrigger>
                <VAccordionContent>A modern design system for React.</VAccordionContent>
              </VAccordionItem>
              <VAccordionItem value="q2">
                <VAccordionTrigger>How do I install it?</VAccordionTrigger>
                <VAccordionContent>npm install @volo-uti/volo-web-ui</VAccordionContent>
              </VAccordionItem>
            </VAccordion>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Multiple mode"
        code={`<VAccordion type="multiple" defaultValue={['faq-1', 'faq-2']}>
  <VAccordionItem value="faq-1">
    <VAccordionTrigger>FAQ 1</VAccordionTrigger>
    <VAccordionContent>Answer 1</VAccordionContent>
  </VAccordionItem>
  <VAccordionItem value="faq-2">
    <VAccordionTrigger>FAQ 2</VAccordionTrigger>
    <VAccordionContent>Answer 2</VAccordionContent>
  </VAccordionItem>
</VAccordion>`}
        preview={
          <div className="w-full max-w-md">
            <VAccordion type="multiple" defaultValue={["faq-1", "faq-2"]}>
              <VAccordionItem value="faq-1">
                <VAccordionTrigger>FAQ 1</VAccordionTrigger>
                <VAccordionContent>Answer 1</VAccordionContent>
              </VAccordionItem>
              <VAccordionItem value="faq-2">
                <VAccordionTrigger>FAQ 2</VAccordionTrigger>
                <VAccordionContent>Answer 2</VAccordionContent>
              </VAccordionItem>
            </VAccordion>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Settings accordion"
        code={`<VAccordion type="multiple">
  <VAccordionItem value="general">
    <VAccordionTrigger>General</VAccordionTrigger>
    <VAccordionContent>
      <div className="space-y-3">
        <label className="flex items-center justify-between">
          <span>Dark mode</span>
          <input type="checkbox" />
        </label>
        <label className="flex items-center justify-between">
          <span>Notifications</span>
          <input type="checkbox" defaultChecked />
        </label>
      </div>
    </VAccordionContent>
  </VAccordionItem>
  <VAccordionItem value="privacy">
    <VAccordionTrigger>Privacy</VAccordionTrigger>
    <VAccordionContent>
      <div className="space-y-3">
        <label className="flex items-center justify-between">
          <span>Public profile</span>
          <input type="checkbox" defaultChecked />
        </label>
      </div>
    </VAccordionContent>
  </VAccordionItem>
</VAccordion>`}
        preview={
          <div className="w-full max-w-md">
            <VAccordion type="multiple" defaultValue={["general"]}>
              <VAccordionItem value="general">
                <VAccordionTrigger>General</VAccordionTrigger>
                <VAccordionContent>
                  <div className="space-y-3">
                    <VCheckbox label="Dark mode" />
                    <VCheckbox label="Notifications" defaultChecked />
                  </div>
                </VAccordionContent>
              </VAccordionItem>
              <VAccordionItem value="privacy">
                <VAccordionTrigger>Privacy</VAccordionTrigger>
                <VAccordionContent>
                  <div className="space-y-3">
                    <VCheckbox label="Public profile" defaultChecked />
                  </div>
                </VAccordionContent>
              </VAccordionItem>
            </VAccordion>
          </div>
        }
      />
      <StorybookCodeBlock
        title="Nested content"
        code={`<VAccordion type="single">
  <VAccordionItem value="team">
    <VAccordionTrigger>Team Members</VAccordionTrigger>
    <VAccordionContent>
      <ul className="space-y-2 text-sm">
        <li className="flex items-center justify-between py-1">
          <span>Alice</span><span className="text-muted-foreground">Admin</span>
        </li>
        <li className="flex items-center justify-between py-1">
          <span>Bob</span><span className="text-muted-foreground">Editor</span>
        </li>
        <li className="flex items-center justify-between py-1">
          <span>Charlie</span><span className="text-muted-foreground">Viewer</span>
        </li>
      </ul>
    </VAccordionContent>
  </VAccordionItem>
  <VAccordionItem value="invite">
    <VAccordionTrigger>Invite Member</VAccordionTrigger>
    <VAccordionContent>
      <div className="flex gap-2">
        <VTextField placeholder="Email address" fullWidth />
        <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded">Send</button>
      </div>
    </VAccordionContent>
  </VAccordionItem>
</VAccordion>`}
        preview={
          <div className="w-full max-w-md">
            <VAccordion type="single" defaultValue="team">
              <VAccordionItem value="team">
                <VAccordionTrigger>Team Members</VAccordionTrigger>
                <VAccordionContent>
                  <ul className="space-y-2 text-sm">
                    <li
                      className="flex items-center justify-between py-1"
                      style={{ borderBottom: "1px solid var(--v-border)" }}
                    >
                      <span>Alice</span>
                      <span style={{ color: "var(--v-muted-foreground)" }}>Admin</span>
                    </li>
                    <li
                      className="flex items-center justify-between py-1"
                      style={{ borderBottom: "1px solid var(--v-border)" }}
                    >
                      <span>Bob</span>
                      <span style={{ color: "var(--v-muted-foreground)" }}>Editor</span>
                    </li>
                    <li className="flex items-center justify-between py-1">
                      <span>Charlie</span>
                      <span style={{ color: "var(--v-muted-foreground)" }}>Viewer</span>
                    </li>
                  </ul>
                </VAccordionContent>
              </VAccordionItem>
              <VAccordionItem value="invite">
                <VAccordionTrigger>Invite Member</VAccordionTrigger>
                <VAccordionContent>
                  <div className="flex gap-2">
                    <VTextField placeholder="Email address" fullWidth />
                    <VButton size="sm">Send</VButton>
                  </div>
                </VAccordionContent>
              </VAccordionItem>
            </VAccordion>
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
