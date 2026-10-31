import { VButton, VScrollArea } from "@volo-uti/volo-web-ui";
import React, { useState, useCallback } from "react";

export interface StorybookCodeBlockProps {
  title: string;
  code: string;
  preview?: React.ReactNode;
}

export function StorybookCodeBlock({ title, code, preview }: StorybookCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className="rounded-lg border border-[var(--v-border)]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--v-muted)]/50 border-b border-[var(--v-border)]">
        <h2 className="m-0 text-sm font-semibold text-[var(--v-foreground)]">{title}</h2>
        <VButton variant="ghost" size="sm" onClick={handleCopy}>
          {copied ? (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </VButton>
      </div>
      {preview && <div className="p-6 border-b border-[var(--v-border)]">{preview}</div>}
      <VScrollArea direction="horizontal" className="bg-[var(--v-foreground)] px-4 py-4">
        <pre className="text-[13px] leading-relaxed font-mono text-[var(--v-background)]">
          <code>{code}</code>
        </pre>
      </VScrollArea>
    </div>
  );
}
