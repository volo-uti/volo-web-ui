import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VPagination } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const meta: Meta<typeof VPagination> = {
  title: "Components/Navigation/VPagination",
  component: VPagination,
  tags: ["autodocs"],
  parameters: { controls: { sort: "none" } },
  args: {
    variant: "default",
    size: "md",
    totalPages: 10,
    defaultValue: 1,
    siblingCount: 1,
    boundaryCount: 1,
    showFirstLast: true,
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// ─── Primary (hidden from sidebar, powers Docs controls) ───
export const Default: Story = { tags: ["!dev"] };

function ControlledPagination() {
  const [page, setPage] = useState(5);
  return <VPagination totalPages={20} value={page} onValueChange={setPage} />;
}

// ─── Showcase ───
export const Showcase: Story = {
  tags: ["!autodocs"],
  render: () => (
    <StorybookPageLayout
      title="VPagination"
      description="Page navigation component with ellipsis support for large datasets."
    >
      <StorybookSection title="Page Count">
        <StorybookSubsection title="few pages" labels={["VPagination(totalPages={5})"]}>
          <VPagination aria-label="few pages pagination" totalPages={5} defaultValue={1} />
        </StorybookSubsection>
        <StorybookSubsection title="many pages" labels={["VPagination(totalPages={20})"]}>
          <VPagination aria-label="many pages pagination" totalPages={20} defaultValue={5} />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Sibling Count">
        <StorybookSubsection title="siblingCount=0" labels={["VPagination(siblingCount={0})"]}>
          <VPagination
            aria-label="siblingCount=0 pagination"
            totalPages={20}
            defaultValue={10}
            siblingCount={0}
          />
        </StorybookSubsection>
        <StorybookSubsection
          title="siblingCount=1 (default)"
          labels={["VPagination(siblingCount={1})"]}
        >
          <VPagination
            aria-label="siblingCount=1 (default) pagination"
            totalPages={20}
            defaultValue={10}
            siblingCount={1}
          />
        </StorybookSubsection>
        <StorybookSubsection title="siblingCount=2" labels={["VPagination(siblingCount={2})"]}>
          <VPagination
            aria-label="siblingCount=2 pagination"
            totalPages={20}
            defaultValue={10}
            siblingCount={2}
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Boundary Count">
        <StorybookSubsection
          title="boundaryCount=1 (default)"
          labels={["VPagination(boundaryCount={1})"]}
        >
          <VPagination
            aria-label="boundaryCount=1 (default) pagination"
            totalPages={20}
            defaultValue={10}
            boundaryCount={1}
          />
        </StorybookSubsection>
        <StorybookSubsection title="boundaryCount=2" labels={["VPagination(boundaryCount={2})"]}>
          <VPagination
            aria-label="boundaryCount=2 pagination"
            totalPages={20}
            defaultValue={10}
            boundaryCount={2}
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="first page" labels={["VPagination(defaultValue={1})"]}>
          <VPagination aria-label="first page pagination" totalPages={10} defaultValue={1} />
        </StorybookSubsection>
        <StorybookSubsection title="last page" labels={["VPagination(defaultValue={10})"]}>
          <VPagination aria-label="last page pagination" totalPages={10} defaultValue={10} />
        </StorybookSubsection>
        <StorybookSubsection title="disabled" labels={["VPagination(disabled)"]}>
          <VPagination aria-label="disabled pagination" totalPages={10} defaultValue={5} disabled />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline: "Navigate through paginated data lists or search results",
          },
          {
            category: "Sibling count",
            guideline: "Controls how many pages are shown around the current page",
          },
          {
            category: "Boundary count",
            guideline: "Controls how many pages are shown at the start and end",
          },
          {
            category: "Disabled",
            guideline: "Use during loading or when pagination is temporarily unavailable",
          },
          {
            category: "Controlled",
            guideline: "Use value + onValueChange for server-side pagination",
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
      title="VPagination Samples"
      description="Copy-paste code examples for common pagination patterns."
    >
      <StorybookCodeBlock
        title="Basic pagination"
        code={`<VPagination totalPages={10} defaultValue={1} />`}
        preview={<VPagination aria-label="Basic pagination" totalPages={10} defaultValue={1} />}
      />
      <StorybookCodeBlock
        title="Controlled pagination"
        code={`const [page, setPage] = useState(1)

<VPagination
  totalPages={20}
  value={page}
  onValueChange={setPage}
/>`}
        preview={<ControlledPagination />}
      />
      <StorybookCodeBlock
        title="Custom sibling count"
        code={`<VPagination totalPages={20} defaultValue={10} siblingCount={2} />`}
        preview={
          <VPagination
            aria-label="Custom sibling count pagination"
            totalPages={20}
            defaultValue={10}
            siblingCount={2}
          />
        }
      />
      <StorybookCodeBlock
        title="Custom boundary count"
        code={`<VPagination totalPages={20} defaultValue={10} boundaryCount={2} />`}
        preview={
          <VPagination
            aria-label="Custom boundary count pagination"
            totalPages={20}
            defaultValue={10}
            boundaryCount={2}
          />
        }
      />
      <StorybookCodeBlock
        title="Disabled pagination"
        code={`<VPagination totalPages={10} defaultValue={5} disabled />`}
        preview={
          <VPagination
            aria-label="Disabled pagination example"
            totalPages={10}
            defaultValue={5}
            disabled
          />
        }
      />
    </StorybookPageLayout>
  ),
};
