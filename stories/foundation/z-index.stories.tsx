import { VTable } from "@volo-uti/volo-web-ui";
import React, { useRef, useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookUsageGuidelines,
  StorybookCssVar,
  StorybookTokenName,
} from "../_components";

const meta: Meta = {
  title: "Foundation/Z-Index",
};
export default meta;
type Story = StoryObj<typeof meta>;

// --- Token data (CSS variable references only; colors are decorative) ---

const zIndexTokens = [
  {
    var: "--v-z-dropdown",
    label: "dropdown",
    color: "#3b82f6",
    usage: "Dropdown menus, select panels",
  },
  { var: "--v-z-sticky", label: "sticky", color: "#8b5cf6", usage: "Sticky headers, sidebars" },
  {
    var: "--v-z-fixed",
    label: "fixed",
    color: "#ec4899",
    usage: "Fixed elements (FAB, scroll-to-top)",
  },
  {
    var: "--v-z-modal-backdrop",
    label: "modal-backdrop",
    color: "#6366f1",
    usage: "Modal overlay background",
  },
  { var: "--v-z-modal", label: "modal", color: "#14b8a6", usage: "Modal dialogs, sheets" },
  { var: "--v-z-popover", label: "popover", color: "#f97316", usage: "Popover, context menu" },
  { var: "--v-z-tooltip", label: "tooltip", color: "#eab308", usage: "Tooltip overlays" },
  { var: "--v-z-toast", label: "toast", color: "#ef4444", usage: "Toast notifications (topmost)" },
];

// --- LayerSwatch (reads z-index value from CSS variable) ---

function LayerSwatch({
  label,
  cssVar,
  color,
  index,
}: {
  label: string;
  cssVar: string;
  color: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (ref.current) {
      setValue(getComputedStyle(ref.current).getPropertyValue(cssVar).trim());
    }
  }, [cssVar]);

  return (
    <div
      ref={ref}
      className="relative flex items-center gap-4 px-4 py-3 rounded-lg border border-[var(--v-border)]"
      style={{
        backgroundColor: `${color}10`,
        borderLeft: `4px solid ${color}`,
      }}
    >
      <span className="text-xs font-mono font-bold text-[var(--v-foreground)] w-[130px] shrink-0">
        {label}
      </span>
      <span className="text-xs font-mono text-[var(--v-muted-foreground)] w-[60px] shrink-0">
        {value}
      </span>
      <div className="flex-1">
        <div
          className="h-3 rounded-full"
          style={{
            width: `${Math.min(100, (index + 1) * 12)}%`,
            backgroundColor: color,
            opacity: 0.6,
          }}
        />
      </div>
    </div>
  );
}

// --- StackPreview ---

function StackPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [zVals, setZVals] = useState({
    dropdown: "",
    modalBackdrop: "",
    modal: "",
    tooltip: "",
    toast: "",
  });

  useEffect(() => {
    if (ref.current) {
      const style = getComputedStyle(ref.current);
      setZVals({
        dropdown: style.getPropertyValue("--v-z-dropdown").trim(),
        modalBackdrop: style.getPropertyValue("--v-z-modal-backdrop").trim(),
        modal: style.getPropertyValue("--v-z-modal").trim(),
        tooltip: style.getPropertyValue("--v-z-tooltip").trim(),
        toast: style.getPropertyValue("--v-z-toast").trim(),
      });
    }
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full h-[300px] bg-[var(--v-muted)] rounded-lg border border-[var(--v-border)] overflow-hidden"
    >
      {/* Base content */}
      <div className="absolute inset-4 bg-[var(--v-card)] rounded-md border border-[var(--v-border)] flex items-center justify-center">
        <span className="text-sm text-[var(--v-muted-foreground)]">Page content</span>
      </div>

      {/* Dropdown */}
      <div
        className="absolute top-12 left-8 w-[120px] bg-[var(--v-card)] rounded-md shadow-md border border-[var(--v-border)] p-2"
        style={{ zIndex: 1 }}
      >
        <p className="text-xs font-mono font-bold text-[var(--v-foreground)]">dropdown</p>
        <p className="text-[10px] font-mono text-[var(--v-muted-foreground)]">
          z: {zVals.dropdown}
        </p>
      </div>

      {/* Modal backdrop */}
      <div
        className="absolute inset-0 bg-black/20 flex items-center justify-center"
        style={{
          zIndex: 2,
          top: "60px",
          bottom: "60px",
          left: "40px",
          right: "40px",
          borderRadius: "8px",
        }}
      >
        <span className="text-xs font-mono text-white/70">
          modal-backdrop ({zVals.modalBackdrop})
        </span>
      </div>

      {/* Modal */}
      <div
        className="absolute bg-[var(--v-card)] rounded-lg shadow-lg border border-[var(--v-border)] p-4"
        style={{ zIndex: 3, top: "80px", left: "60px", right: "60px", bottom: "80px" }}
      >
        <p className="text-xs font-mono font-bold text-[var(--v-foreground)]">
          modal ({zVals.modal})
        </p>
      </div>

      {/* Tooltip */}
      <div
        className="absolute top-4 right-8 bg-[var(--v-foreground)] text-[var(--v-background)] rounded-md px-2 py-1"
        style={{ zIndex: 4 }}
      >
        <p className="text-[10px] font-mono">tooltip ({zVals.tooltip})</p>
      </div>

      {/* Toast */}
      <div
        className="absolute bottom-4 right-4 bg-[var(--v-foreground)] text-[var(--v-background)] rounded-md px-3 py-2 shadow-lg"
        style={{ zIndex: 5 }}
      >
        <p className="text-xs font-mono font-bold text-[#ef4444]">toast ({zVals.toast})</p>
      </div>
    </div>
  );
}

// --- Story ---

export const Default: Story = {
  name: "overview",
  render: () => (
    <StorybookPageLayout
      title="Z-Index"
      description="A layering system that ensures proper stacking order for overlapping UI elements."
    >
      <StorybookSection
        title="Layer Stack"
        description="Visual hierarchy of z-index values. Higher values appear above lower values."
      >
        <div className="flex flex-col gap-2">
          {zIndexTokens.map((t, i) => (
            <LayerSwatch key={t.var} label={t.label} cssVar={t.var} color={t.color} index={i} />
          ))}
        </div>
      </StorybookSection>

      <StorybookSection
        title="Stacking Preview"
        description="How z-index layers interact in a real UI scenario."
      >
        <StackPreview />
      </StorybookSection>

      <StorybookSection title="Z-Index Table">
        <div className="overflow-hidden rounded-lg border border-[var(--v-border)]">
          <VTable
            rowKey="var"
            data={zIndexTokens}
            columns={[
              {
                key: "label",
                title: "Token",
                width: 140,
                render: (v) => <StorybookTokenName>{String(v)}</StorybookTokenName>,
              },
              {
                key: "var",
                title: "Value",
                width: 80,
                render: (v) => <StorybookCssVar name={String(v)} />,
              },
              {
                key: "usage",
                title: "Usage",
                render: (v) => (
                  <span className="text-[var(--v-muted-foreground)]">{String(v)}</span>
                ),
              },
            ]}
          />
        </div>
      </StorybookSection>

      <StorybookUsageGuidelines
        subtitle="Guidelines for z-index usage."
        headers={["Layer", "When to use", "Examples"]}
        rows={[
          {
            category: "dropdown",
            guideline: "Inline overlays",
            examples: "Select menu, combobox panel, autocomplete",
          },
          {
            category: "sticky",
            guideline: "Scroll-persistent elements",
            examples: "Sticky header, floating toolbar, sidebar",
          },
          {
            category: "fixed",
            guideline: "Fixed position elements",
            examples: "FAB, scroll-to-top button, fixed CTA",
          },
          {
            category: "modal-backdrop",
            guideline: "Modal background overlay",
            examples: "Dim overlay, scrim behind dialogs",
          },
          {
            category: "modal",
            guideline: "Full-screen overlays",
            examples: "Dialog, bottom sheet, confirmation modal",
          },
          {
            category: "popover",
            guideline: "Contextual overlays",
            examples: "Context menu, popover, date picker",
          },
          {
            category: "tooltip",
            guideline: "Informational overlays",
            examples: "Tooltip, help bubble",
          },
          {
            category: "toast",
            guideline: "Notification overlays",
            examples: "Toast notification, snackbar",
          },
        ]}
      />
    </StorybookPageLayout>
  ),
};
