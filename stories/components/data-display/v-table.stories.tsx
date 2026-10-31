import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VTable, VButton } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const sampleColumns = [
  { key: "name", title: "Name" },
  { key: "email", title: "Email" },
  { key: "role", title: "Role" },
];

const sampleData = [
  { name: "Alice", email: "alice@example.com", role: "Admin" },
  { name: "Bob", email: "bob@example.com", role: "Editor" },
  { name: "Carol", email: "carol@example.com", role: "Viewer" },
];

const meta: Meta<typeof VTable> = {
  title: "Components/Data Display/VTable",
  component: VTable,
  tags: ["autodocs"],
  args: {
    striped: false,
    bordered: true,
    hoverable: false,
    dense: false,
    columns: sampleColumns,
    data: sampleData,
    showHeader: true,
    stickyHeader: false,
  },
  parameters: { controls: { sort: "none" } },
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
      title="VTable"
      description="Displays tabular data with configurable columns, borders, and styling."
    >
      <StorybookSection title="Basic">
        <StorybookSubsection title="default table" labels={["VTable columns={...} data={...}"]}>
          <VTable columns={sampleColumns} data={sampleData} />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="Variants">
        <StorybookSubsection
          title="sortable"
          labels={["VTable onSortChange={...} sortable columns"]}
        >
          <VTable
            columns={[
              { key: "name", title: "Name", sortable: true },
              { key: "email", title: "Email", sortable: true },
              { key: "role", title: "Role", sortable: true },
            ]}
            data={sampleData}
            onSortChange={() => {}}
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Display structured data sets like user lists, product inventories, or analytics data.",
          },
          {
            category: "When not to use",
            guideline: "For simple key-value pairs. Use VListTile or a description list instead.",
          },
          {
            category: "Bordered + Striped",
            guideline:
              "Combine bordered and striped for dense data tables with many rows to improve readability.",
          },
          {
            category: "Sorting",
            guideline: "Enable column sorting for data exploration",
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
    <StorybookPageLayout title="VTable Samples" description="Copy-paste code examples for VTable.">
      <StorybookCodeBlock
        title="Basic usage"
        code={`<VTable
  columns={[
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
  ]}
  data={[
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Lee', email: 'jane@example.com' },
  ]}
/>`}
        preview={
          <VTable
            columns={[
              { key: "name", title: "Name" },
              { key: "email", title: "Email" },
            ]}
            data={[
              { name: "John Doe", email: "john@example.com" },
              { name: "Jane Lee", email: "jane@example.com" },
            ]}
          />
        }
      />
      <StorybookCodeBlock
        title="Striped rows"
        code={`<VTable
  columns={sampleColumns}
  data={sampleData}
  striped
/>`}
        preview={<VTable columns={sampleColumns} data={sampleData} striped />}
      />
      <StorybookCodeBlock
        title="Bordered + hoverable"
        code={`<VTable
  columns={sampleColumns}
  data={sampleData}
  bordered
  hoverable
/>`}
        preview={<VTable columns={sampleColumns} data={sampleData} bordered hoverable />}
      />
      <StorybookCodeBlock
        title="User management table"
        code={`<VTable
  columns={[
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Role' },
    { key: 'actions', title: <span className="sr-only">Actions</span>, render: () => <VButton variant="outlined" size="sm">Edit</VButton> },
  ]}
  data={[
    { name: 'Alice Park', email: 'alice@acme.com', role: 'Admin' },
    { name: 'Bob Kim', email: 'bob@acme.com', role: 'Editor' },
    { name: 'Carol Lee', email: 'carol@acme.com', role: 'Viewer' },
  ]}
  bordered
  hoverable
/>`}
        preview={
          <VTable
            columns={[
              { key: "name", title: "Name" },
              { key: "email", title: "Email" },
              { key: "role", title: "Role" },
              {
                key: "actions",
                title: <span className="sr-only">Actions</span>,
                render: () => (
                  <VButton variant="outlined" size="sm">
                    Edit
                  </VButton>
                ),
              },
            ]}
            data={[
              { name: "Alice Park", email: "alice@acme.com", role: "Admin" },
              { name: "Bob Kim", email: "bob@acme.com", role: "Editor" },
              { name: "Carol Lee", email: "carol@acme.com", role: "Viewer" },
            ]}
            bordered
            hoverable
          />
        }
      />
      <StorybookCodeBlock
        title="Sortable columns"
        code={`<VTable
  columns={[
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    { key: 'role', title: 'Role', sortable: true },
  ]}
  data={sampleData}
  onSortChange={(column, direction) => console.log(column, direction)}
/>`}
        preview={
          <VTable
            columns={[
              { key: "name", title: "Name", sortable: true },
              { key: "email", title: "Email", sortable: true },
              { key: "role", title: "Role", sortable: true },
            ]}
            data={sampleData}
            onSortChange={() => {}}
          />
        }
      />
      <StorybookCodeBlock
        title="Empty state"
        code={`<VTable
  columns={[
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Role' },
  ]}
  data={[]}
  emptyMessage="No users found. Try adjusting your filters."
  bordered
/>`}
        preview={
          <VTable
            columns={[
              { key: "name", title: "Name" },
              { key: "email", title: "Email" },
              { key: "role", title: "Role" },
            ]}
            data={[]}
            emptyMessage="No users found. Try adjusting your filters."
            bordered
          />
        }
      />
    </StorybookPageLayout>
  ),
};
