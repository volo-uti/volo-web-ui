import React from "react";

export interface StorybookPlaygroundProps {
  children: React.ReactNode;
  info?: string[];
}

export function StorybookPlayground({ children, info }: StorybookPlaygroundProps) {
  return (
    <div className="rounded-lg border border-[var(--v-border)] overflow-hidden">
      <div className="px-4 py-2.5 bg-[var(--v-muted)]/50 border-b border-[var(--v-border)]">
        <span className="text-sm font-semibold text-[var(--v-foreground)]">Playground</span>
      </div>
      <div className="p-8 flex items-center justify-center min-h-[200px]">{children}</div>
      {info && info.length > 0 && (
        <div className="px-4 py-3 border-t border-[var(--v-border)] bg-[var(--v-muted)]/30 flex flex-wrap gap-2">
          {info.map((item) => (
            <span
              key={item}
              className="inline-flex text-[11px] font-mono bg-[var(--v-primary)]/10 text-[var(--v-primary)] px-2 py-0.5 rounded"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
