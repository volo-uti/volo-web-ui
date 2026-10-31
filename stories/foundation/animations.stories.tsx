import { VButton, VTable } from "@volo-uti/volo-web-ui";
import React, { useState, useEffect, useCallback, useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookUsageGuidelines,
  StorybookTokenName,
} from "../_components";

const meta: Meta = {
  title: "Foundation/Animation",
};
export default meta;
type Story = StoryObj<typeof meta>;

// --- Token data (CSS variable references only) ---

const durationTokens = [
  {
    var: "--v-duration-instant",
    label: "instant",
    description: "Instant toggle",
    usage: "Toggle, checkbox",
  },
  {
    var: "--v-duration-micro",
    label: "micro",
    description: "Micro-interaction (ripple, checkbox, switch)",
    usage: "Ripple, switch",
  },
  {
    var: "--v-duration-fast",
    label: "fast",
    description: "Hover, focus feedback",
    usage: "Hover, focus",
  },
  {
    var: "--v-duration-normal",
    label: "normal",
    description: "Modal, dropdown, page section",
    usage: "Modal, dropdown",
  },
  {
    var: "--v-duration-slow",
    label: "slow",
    description: "Page transition, complex animation",
    usage: "Page transition",
  },
  {
    var: "--v-duration-slower",
    label: "slower",
    description: "Multi-step sequence, elaborate entrance",
    usage: "Elaborate entrance",
  },
  {
    var: "--v-duration-very-slow",
    label: "verySlow",
    description: "Extended animation, skeleton loading",
    usage: "Loading state",
  },
  {
    var: "--v-duration-extra-slow",
    label: "extraSlow",
    description: "Full-page transition, onboarding flow",
    usage: "Skeleton, progress",
  },
  {
    var: "--v-duration-snackbar",
    label: "snackbar",
    description: "Snackbar display",
    usage: "Snackbar auto-dismiss",
  },
  {
    var: "--v-duration-toast",
    label: "toast",
    description: "Toast display",
    usage: "Toast auto-dismiss",
  },
];

const easingTokens = [
  {
    var: "--v-easing-linear",
    label: "linear",
    description: "No acceleration (color, opacity, progress bar)",
    usage: "Color, opacity, progress",
  },
  {
    var: "--v-easing-ease-in",
    label: "ease-in",
    description: "Accelerate (exit, move off-screen)",
    usage: "Move off-screen",
  },
  {
    var: "--v-easing-ease-out",
    label: "ease-out",
    description: "Decelerate (enter, move on-screen)",
    usage: "Move on-screen",
  },
  {
    var: "--v-easing-ease-in-out",
    label: "ease-in-out",
    description: "Symmetric transition (default animation)",
    usage: "Default animation",
  },
  {
    var: "--v-easing-emphasized",
    label: "emphasized",
    description: "Dramatic deceleration (hero entrance, emphasis)",
    usage: "Hero entrance",
  },
  {
    var: "--v-ease-bouncy",
    label: "bouncy",
    description: "Spring overshoot (elastic out)",
    usage: "Button tap, card entrance",
  },
];

const microInteractions = [
  { action: "Button hover", duration: "fast", curve: "ease-out", effect: "Scale 1.02" },
  { action: "Button press", duration: "fast", curve: "ease-out", effect: "Scale 0.98" },
  { action: "Modal open", duration: "normal", curve: "ease-in-out", effect: "Scale + Fade" },
  { action: "Toast appear", duration: "normal", curve: "ease-out", effect: "Slide up + Fade" },
  { action: "Success feedback", duration: "normal", curve: "emphasized", effect: "Scale" },
  { action: "Loading pulse", duration: "slow", curve: "ease-in-out", effect: "Opacity" },
];

// --- Replay button ---

function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <VButton variant="icon" size="sm" onClick={onClick} aria-label="Replay animations">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 4v4h4" />
        <path d="M3.51 10a5.5 5.5 0 1 0 1.12-5.36L1 8" />
      </svg>
    </VButton>
  );
}

// --- Section header with replay ---

function SectionWithReplay({
  title,
  description,
  onReplay,
  children,
}: {
  title: string;
  description: string;
  onReplay: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-[var(--v-foreground)]">{title}</h2>
          <ReplayButton onClick={onReplay} />
        </div>
        <p className="mt-2 text-sm text-[var(--v-muted-foreground)]">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

// --- DurationDemo (reads value from CSS variable) ---

function DurationDemo({
  label,
  cssVar,
  description,
  usage,
}: {
  label: string;
  cssVar: string;
  description: string;
  usage: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (ref.current) {
      setValue(getComputedStyle(ref.current).getPropertyValue(cssVar).trim());
    }
    const timer = requestAnimationFrame(() => setPlaying(true));
    return () => cancelAnimationFrame(timer);
  }, [cssVar]);

  return (
    <div ref={ref} className="w-[180px]">
      <div className="h-[100px] bg-[var(--v-muted)] rounded-lg border border-[var(--v-border)] relative overflow-hidden">
        <div className="absolute left-4 right-4 top-[42px] h-4 bg-[color-mix(in_srgb,var(--v-border)_30%,transparent)] rounded-full" />
        <div
          className="absolute left-4 top-[42px] h-4 bg-[var(--v-primary)] rounded-full"
          style={{
            width: playing ? "calc(100% - 32px)" : "16px",
            transitionProperty: "width",
            transitionDuration: label === "instant" ? "100ms" : `var(${cssVar})`,
            transitionTimingFunction: "linear",
          }}
        />
      </div>
      <p className="mt-3 text-sm font-bold font-mono text-[var(--v-foreground)]">{label}</p>
      <p className="text-xs font-mono text-[var(--v-muted-foreground)]">{value}</p>
      <p className="text-xs text-[var(--v-muted-foreground)]">{description}</p>
      <div className="mt-2 inline-block px-2 py-1 bg-[var(--v-accent)] rounded text-xs text-[var(--v-accent-foreground)]">
        {usage}
      </div>
    </div>
  );
}

// --- CurveDemo (reads value from CSS variable) ---

function CurveDemo({
  label,
  cssVar,
  description,
  usage,
}: {
  label: string;
  cssVar: string;
  description: string;
  usage: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (ref.current) {
      setValue(getComputedStyle(ref.current).getPropertyValue(cssVar).trim());
    }
    const timer = requestAnimationFrame(() => setPlaying(true));
    return () => cancelAnimationFrame(timer);
  }, [cssVar]);

  return (
    <div ref={ref} className="w-[180px]">
      <div className="h-[100px] bg-[var(--v-muted)] rounded-lg border border-[var(--v-border)] relative overflow-hidden">
        <div
          className="absolute w-4 h-4 bg-[var(--v-primary)] rounded-full"
          style={{
            left: playing ? "calc(100% - 32px)" : "16px",
            bottom: playing ? "calc(100% - 32px)" : "16px",
            transitionProperty: "left, bottom",
            transitionDuration: "1.5s",
            transitionTimingFunction: `var(${cssVar})`,
          }}
        />
      </div>
      <p className="mt-3 text-sm font-bold font-mono text-[var(--v-foreground)]">{label}</p>
      <p className="text-xs font-mono text-[var(--v-muted-foreground)]">{value}</p>
      <p className="text-xs text-[var(--v-muted-foreground)]">{description}</p>
      <div className="mt-2 inline-block px-2 py-1 bg-[var(--v-accent)] rounded text-xs text-[var(--v-accent-foreground)]">
        {usage}
      </div>
    </div>
  );
}

// --- Tokens page ---

function TokensPage() {
  const [durationKey, setDurationKey] = useState(0);
  const [curveKey, setCurveKey] = useState(0);

  const replayDuration = useCallback(() => setDurationKey((k) => k + 1), []);
  const replayCurve = useCallback(() => setCurveKey((k) => k + 1), []);

  return (
    <StorybookPageLayout
      title="Animation"
      description="Motion brings life to the UI. Use consistent durations and easing curves to create natural interactions."
    >
      <SectionWithReplay
        title="Duration"
        description="Animation durations. Choose the appropriate duration based on interaction complexity."
        onReplay={replayDuration}
      >
        <div className="flex flex-wrap gap-6">
          {durationTokens.map((t) => (
            <DurationDemo
              key={`${t.var}-${durationKey}`}
              label={t.label}
              cssVar={t.var}
              description={t.description}
              usage={t.usage}
            />
          ))}
        </div>
      </SectionWithReplay>

      <SectionWithReplay
        title="Easing Curves"
        description="Easing curves define the acceleration/deceleration of animations. Use appropriate curves to create natural motion."
        onReplay={replayCurve}
      >
        <div className="flex flex-wrap gap-6">
          {easingTokens.map((t) => (
            <CurveDemo
              key={`${t.var}-${curveKey}`}
              label={t.label}
              cssVar={t.var}
              description={t.description}
              usage={t.usage}
            />
          ))}
        </div>
      </SectionWithReplay>

      <StorybookSection
        title="Transitions"
        description="Pre-composed transition tokens combining duration, delay, and timing function."
      >
        <div className="overflow-hidden rounded-lg border border-[var(--v-border)]">
          <VTable
            rowKey="name"
            data={transitionTokens}
            columns={[
              {
                key: "name",
                title: "Name",
                width: 100,
                render: (v) => <StorybookTokenName>{String(v)}</StorybookTokenName>,
              },
              {
                key: "duration",
                title: "Duration",
                width: 100,
                render: (v) => (
                  <span className="text-xs font-mono text-[var(--v-muted-foreground)]">
                    {String(v)}
                  </span>
                ),
              },
              {
                key: "delay",
                title: "Delay",
                width: 80,
                render: (v) => (
                  <span className="text-xs font-mono text-[var(--v-muted-foreground)]">
                    {String(v)}
                  </span>
                ),
              },
              {
                key: "timing",
                title: "Timing",
                render: (v) => (
                  <span className="text-xs font-mono text-[var(--v-muted-foreground)]">
                    {String(v)}
                  </span>
                ),
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

      <StorybookSection
        title="Micro Interactions"
        description="Recommended animation settings per component."
      >
        <div className="overflow-hidden rounded-lg border border-[var(--v-border)]">
          <VTable
            rowKey="action"
            data={microInteractions}
            columns={[
              {
                key: "action",
                title: "Action",
                render: (v) => <span className="text-[var(--v-foreground)]">{String(v)}</span>,
              },
              {
                key: "duration",
                title: "Duration",
                width: 100,
                render: (v) => (
                  <span className="text-xs font-mono text-[var(--v-muted-foreground)]">
                    {String(v)}
                  </span>
                ),
              },
              {
                key: "curve",
                title: "Curve",
                width: 100,
                render: (v) => (
                  <span className="text-xs font-mono text-[var(--v-muted-foreground)]">
                    {String(v)}
                  </span>
                ),
              },
              {
                key: "effect",
                title: "Effect",
                render: (v) => (
                  <span className="text-[var(--v-muted-foreground)]">{String(v)}</span>
                ),
              },
            ]}
          />
        </div>
      </StorybookSection>

      <StorybookUsageGuidelines
        subtitle="Guidelines to consider when applying animations."
        headers={["Duration", "When to use", "Examples"]}
        rows={[
          {
            category: "instant (0ms)",
            guideline: "Instant feedback",
            examples: "Checkbox toggle, radio select, color change",
          },
          {
            category: "micro (75ms)",
            guideline: "Micro-interactions",
            examples: "Ripple effect, switch toggle, checkbox check",
          },
          {
            category: "fast (150ms)",
            guideline: "Quick micro interactions",
            examples: "Button hover, focus ring, tooltip appear",
          },
          {
            category: "normal (300ms)",
            guideline: "Standard UI transitions",
            examples: "Modal open/close, accordion expand, page transition",
          },
          {
            category: "slow (500ms)",
            guideline: "Complex sequence animations",
            examples: "Skeleton loading, onboarding",
          },
          {
            category: "slower (700ms)",
            guideline: "Multi-step sequences",
            examples: "Elaborate entrance, staggered animations",
          },
          {
            category: "verySlow (1000ms)",
            guideline: "Extended loading animations",
            examples: "Loading state, fade-in sequences",
          },
          {
            category: "extraSlow (1500ms)",
            guideline: "Full-page transitions",
            examples: "Skeleton loading, progress indicators",
          },
          {
            category: "snackbar (4000ms)",
            guideline: "Snackbar auto-dismiss duration",
            examples: "Snackbar display time before auto-dismiss",
          },
          {
            category: "toast (5000ms)",
            guideline: "Toast auto-dismiss duration",
            examples: "Toast display time before auto-dismiss",
          },
        ]}
      />
    </StorybookPageLayout>
  );
}

const transitionTokens = [
  {
    name: "micro",
    duration: "75ms",
    delay: "0ms",
    timing: "ease-out",
    usage: "Micro-interaction (ripple, toggle, checkbox)",
  },
  {
    name: "fast",
    duration: "150ms",
    delay: "0ms",
    timing: "ease-out",
    usage: "Quick feedback (hover, focus)",
  },
  {
    name: "normal",
    duration: "300ms",
    delay: "0ms",
    timing: "ease-in-out",
    usage: "Standard transition (modal, dropdown)",
  },
  {
    name: "slow",
    duration: "500ms",
    delay: "0ms",
    timing: "ease-in-out",
    usage: "Complex or attention-grabbing",
  },
  {
    name: "emphasized",
    duration: "300ms",
    delay: "0ms",
    timing: "emphasized",
    usage: "Dramatic entrance with emphasized deceleration",
  },
];

export const Tokens: Story = {
  name: "overview",
  render: () => <TokensPage />,
};
