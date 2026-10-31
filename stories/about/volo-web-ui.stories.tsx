import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StorybookPageLayout, StorybookSection, StorybookCodeBlock } from "../_components";

const categories = [
  {
    name: "Inputs",
    icon: "✏️",
    components: [
      "VButton",
      "VButtonGroup",
      "VToggleButton",
      "VIconButton",
      "VFab",
      "VLink",
      "VLabel",
      "VTextField",
      "VTextArea",
      "VAutocomplete",
      "VCheckbox",
      "VCheckboxGroup",
      "VRadio",
      "VSwitch",
      "VSelect",
      "VSlider",
      "VForm",
      "VFormField",
      "VFormBody",
      "VFormHeader",
      "VFormFooter",
    ],
  },
  {
    name: "Data Display",
    icon: "📊",
    components: [
      "VImage",
      "VAvatar",
      "VAvatarGroup",
      "VBadge",
      "VChip",
      "VChipGroup",
      "VListTile",
      "VCheckListTile",
      "VSwitchListTile",
      "VSettingTile",
      "VTable",
      "VTooltip",
      "VHoverCard",
      "VDivider",
    ],
  },
  {
    name: "Feedback",
    icon: "💬",
    components: [
      "VAlert",
      "VAlertDialog",
      "VBackdrop",
      "VDialog",
      "VLoadingSpinner",
      "VProgress",
      "VSkeleton",
      "VSnackbar",
      "VToaster",
    ],
  },
  {
    name: "Surfaces",
    icon: "🎴",
    components: ["VAccordion", "VCard", "VPopover", "VSheet"],
  },
  {
    name: "Navigation",
    icon: "🧭",
    components: [
      "VAppBar",
      "VBottomNav",
      "VDrawer",
      "VTabs",
      "VBreadcrumb",
      "VPagination",
      "VPageIndicator",
      "VStepper",
      "VMenu",
      "VCommand",
    ],
  },
  {
    name: "Layout",
    icon: "📐",
    components: ["VBox", "VStack", "VGrid", "VSection", "VScrollArea", "VCarousel", "VResizable"],
  },
];

/** Number of components across all categories. */
const total = categories.reduce((sum, c) => sum + c.components.length, 0);

const meta: Meta = {
  title: "About/volo-web-ui",
};
export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// Overview
// =============================================================================

export const Overview: Story = {
  name: "overview",
  render: () => (
    <StorybookPageLayout title="Volo Web UI" description="A modern React UI component library">
      {/* Hero Section */}
      <div
        style={{
          padding: "32px",
          borderRadius: "16px",
          background:
            "linear-gradient(135deg, var(--v-primary), color-mix(in srgb, var(--v-primary) 80%, transparent))",
        }}
      >
        {/* displayLarge: 57px / 700 / ls -0.25px / lh 1.12 */}
        <h2
          style={{
            margin: 0,
            fontSize: "57px",
            fontWeight: 700,
            letterSpacing: "-0.25px",
            lineHeight: 1.12,
            color: "var(--v-primary-foreground)",
          }}
        >
          Volo Web UI
        </h2>
        {/* titleMedium: 16px / 600 / ls 0.15px / lh 1.5 */}
        <p
          style={{
            margin: 0,
            marginTop: "8px",
            fontSize: "16px",
            fontWeight: 600,
            letterSpacing: "0.15px",
            lineHeight: 1.5,
            color: "color-mix(in srgb, var(--v-primary-foreground) 90%, transparent)",
          }}
        >
          Modern &bull; Accessible &bull; Customizable
        </p>
        <div style={{ marginTop: "24px", display: "flex", gap: "24px" }}>
          <StatBadge label={String(total)} description="Components" />
          <StatBadge label={String(categories.length)} description="Categories" />
          <StatBadge label="100%" description="React/TS" />
        </div>
      </div>

      {/* Explicit 32px spacer */}
      <div style={{ height: "32px" }} />

      {/* Key Features */}
      <StorybookSection title="Key Features">
        <FeatureGrid />
      </StorybookSection>

      {/* Design Principles */}
      <StorybookSection title="Design Principles">
        <PrincipleList />
      </StorybookSection>
    </StorybookPageLayout>
  ),
};

/** Statistic badge. */
function StatBadge({ label, description }: { label: string; description: string }) {
  return (
    <div>
      {/* headlineMedium + bold: 28px / 700 / lh 1.29 */}
      <p
        style={{
          margin: 0,
          fontSize: "28px",
          fontWeight: 700,
          lineHeight: 1.29,
          color: "var(--v-primary-foreground)",
        }}
      >
        {label}
      </p>
      {/* labelSmall: 11px / 500 / ls 0.5px / lh 1.45, color 80% alpha */}
      <p
        style={{
          margin: 0,
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.5px",
          lineHeight: 1.45,
          color: "color-mix(in srgb, var(--v-primary-foreground) 80%, transparent)",
        }}
      >
        {description}
      </p>
    </div>
  );
}

/**
 * Grid of feature cards.
 * Two columns with 16px spacing.
 */
function FeatureGrid() {
  const features = [
    {
      icon: "🎨",
      title: "Theme System",
      desc: "Fully customizable colors, typography, spacing via ThemeProvider",
    },
    {
      icon: "📱",
      title: "Responsive",
      desc: "Mobile, tablet, desktop — all screen sizes supported",
    },
    {
      icon: "♿",
      title: "Accessible",
      desc: "Semantics, keyboard navigation, screen reader support",
    },
    { icon: "🌙", title: "Dark Mode", desc: "Automatic light/dark mode switching" },
    { icon: "🧩", title: "Composable", desc: "Compose components to build complex UIs" },
    {
      icon: "📖",
      title: "Well Documented",
      desc: "Comprehensive doc comments and code examples",
    },
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {features.map((f) => (
        <div
          key={f.title}
          style={{
            width: "calc((100% - 16px) / 2)",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid var(--v-border)",
            backgroundColor: "var(--v-card)",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "24px", lineHeight: 1, flexShrink: 0 }}>{f.icon}</span>
          <div>
            {/* titleSmall + bold: 14px / 700 / ls 0.1px / lh 1.43 */}
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.1px",
                lineHeight: 1.43,
                color: "var(--v-foreground)",
              }}
            >
              {f.title}
            </p>
            {/* bodySmall: 12px / 400 / ls 0.4px / lh 1.33 */}
            <p
              style={{
                margin: 0,
                marginTop: "4px",
                fontSize: "12px",
                fontWeight: 400,
                letterSpacing: "0.4px",
                lineHeight: 1.33,
                color: "var(--v-muted-foreground)",
              }}
            >
              {f.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Principle list (vertical, 16px spacing). */
function PrincipleList() {
  const items = [
    {
      number: "01",
      title: "Consistency",
      description: "All components follow the same design tokens and patterns.",
    },
    {
      number: "02",
      title: "Accessibility",
      description: "WCAG 2.2 compliant, accessible to all users.",
    },
    {
      number: "03",
      title: "Customization",
      description: "Easily customize the entire design system via theme provider.",
    },
    {
      number: "04",
      title: "Performance",
      description: "Optimized rendering and efficient rebuilds for smooth UX.",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {items.map((item) => (
        <PrincipleItem key={item.number} {...item} />
      ))}
    </div>
  );
}

/** One design principle row. */
function PrincipleItem({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "16px",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid var(--v-border)",
        backgroundColor: "var(--v-card)",
      }}
    >
      {/* Number badge: 48x48, borderRadius 8, primary 10% bg */}
      <div
        style={{
          width: "48px",
          height: "48px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          backgroundColor: "color-mix(in srgb, var(--v-primary) 10%, transparent)",
        }}
      >
        {/* Large bold text (20px / 700): the contrast on the tinted badge needs only 3:1 */}
        <span
          style={{
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "0.15px",
            lineHeight: 1.5,
            color: "var(--v-primary)",
          }}
        >
          {number}
        </span>
      </div>
      <div>
        {/* titleSmall + bold: 14px / 700 / ls 0.1px / lh 1.43 */}
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.1px",
            lineHeight: 1.43,
            color: "var(--v-foreground)",
          }}
        >
          {title}
        </p>
        {/* bodyMedium: 14px / 400 / ls 0.25px / lh 1.43 */}
        <p
          style={{
            margin: 0,
            marginTop: "4px",
            fontSize: "14px",
            fontWeight: 400,
            letterSpacing: "0.25px",
            lineHeight: 1.43,
            color: "var(--v-muted-foreground)",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// =============================================================================
// Installation
// =============================================================================

export const Installation: Story = {
  name: "installation",
  render: () => (
    <StorybookPageLayout
      title="Installation"
      description="How to add @volo-uti/volo-web-ui to your project"
    >
      <StorybookCodeBlock title="1. Install packages" code={`pnpm add @volo-uti/volo-web-ui`} />
      <StorybookCodeBlock
        title="2. Import CSS tokens"
        code={`/* app/globals.css */
@import "tailwindcss";
@import "@volo-uti/volo-web-ui/theme/tokens.css";`}
      />
      <StorybookCodeBlock
        title="3. Apply ThemeProvider"
        code={`// app/layout.tsx
import { ThemeProvider } from '@volo-uti/volo-web-ui'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`}
      />
      <StorybookCodeBlock
        title="4. Use components"
        code={`import { VButton, VCard, VTextField } from '@volo-uti/volo-web-ui'

export default function Page() {
  return (
    <VCard>
      <VTextField label="Name" placeholder="Enter name" />
      <VButton>Submit</VButton>
    </VCard>
  )
}`}
      />
    </StorybookPageLayout>
  ),
};

// =============================================================================
// Components
// =============================================================================

export const Components: Story = {
  name: "components",
  render: () => (
    <StorybookPageLayout
      title="Components"
      description={`${total} UI components across ${categories.length} categories.`}
    >
      {/* Summary Row */}
      <div
        style={{
          padding: "24px",
          borderRadius: "12px",
          backgroundColor: "var(--v-muted)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {categories.map((c) => (
            <div
              key={c.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "24px", lineHeight: 1 }}>{c.icon}</span>
              {/* headlineSmall + bold: 24px / 700 / lh 1.33 */}
              <span
                style={{
                  marginTop: "8px",
                  fontSize: "24px",
                  fontWeight: 700,
                  lineHeight: 1.33,
                  color: "var(--v-foreground)",
                }}
              >
                {c.components.length}
              </span>
              {/* labelSmall: 11px / 500 / ls 0.5px / lh 1.45 */}
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                  lineHeight: 1.45,
                  color: "var(--v-muted-foreground)",
                }}
              >
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Details */}
      {categories.map((category) => (
        <StorybookSection
          key={category.name}
          title={`${category.icon} ${category.name}`}
          description={`${category.components.length} components`}
        >
          {/* Component chips with 8px spacing */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {category.components.map((name) => (
              <span
                key={name}
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--v-border)",
                  backgroundColor: "var(--v-card)",
                  /* labelMedium: 12px / 500 / ls 0.5px / lh 1.33 + mono */
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                  lineHeight: 1.33,
                  fontFamily: 'var(--v-font-mono, "JetBrains Mono", monospace)',
                  color: "var(--v-foreground)",
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </StorybookSection>
      ))}
    </StorybookPageLayout>
  ),
};
