import React, { type ReactNode } from "react";
import { VTable, type VTableColumn } from "@volo-uti/volo-web-ui";
import { StorybookSection } from "./storybook-section";

export interface UsageGuidelineRow {
  category: string;
  name?: string;
  guideline: string;
  examples?: string;
}

export interface StorybookUsageGuidelinesProps {
  title?: string;
  subtitle?: string;
  headers?: string[];
  rows: UsageGuidelineRow[];
}

export function StorybookUsageGuidelines({
  title,
  subtitle,
  headers,
  rows,
}: StorybookUsageGuidelinesProps) {
  const hasName = rows.some((r) => r.name !== undefined);
  const hasExamples = rows.some((r) => r.examples !== undefined);

  const mono = (v: ReactNode) => (
    <span className="text-xs font-bold font-mono text-[var(--v-foreground)]">{v}</span>
  );
  const columns: VTableColumn<UsageGuidelineRow>[] = [
    { key: "category", title: "Category", width: 140, render: (v: unknown) => mono(v as string) },
    ...(hasName ? [{ key: "name", title: "Name", render: (v: unknown) => mono(v as string) }] : []),
    { key: "guideline", title: "When to use" },
    ...(hasExamples
      ? [
          {
            key: "examples",
            title: "Examples",
            render: (v: unknown) => (
              <span className="text-[var(--v-muted-foreground)]">{v as string}</span>
            ),
          },
        ]
      : []),
  ].map((c, i) => ({ ...c, title: headers?.[i] ?? c.title }));

  return (
    <StorybookSection title={title ?? "Usage Guidelines"} description={subtitle}>
      <div className="overflow-hidden rounded-lg border border-[var(--v-border)]">
        <VTable columns={columns} data={rows} rowKey="category" />
      </div>
    </StorybookSection>
  );
}
