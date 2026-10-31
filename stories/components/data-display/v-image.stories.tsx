import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VImage } from "@volo-uti/volo-web-ui";
import {
  StorybookPageLayout,
  StorybookSection,
  StorybookSubsection,
  StorybookUsageGuidelines,
  StorybookCodeBlock,
} from "../../_components";

const SAMPLE_IMAGE = "https://picsum.photos/seed/volo/400/300";
const BROKEN_IMAGE = "https://invalid.example.com/broken.jpg";

const meta: Meta<typeof VImage> = {
  title: "Components/Data Display/VImage",
  component: VImage,
  tags: ["autodocs"],
  args: {
    fit: "cover",
    src: SAMPLE_IMAGE,
    alt: "Sample image",
    width: 200,
    height: 200,
    fadeInDuration: 300,
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
      title="VImage"
      description="Displays images with placeholder support and error fallback."
    >
      <StorybookSection title="Basic">
        <StorybookSubsection
          title="network image"
          labels={['VImage src="..." width="200px" height="150px"']}
        >
          <VImage src={SAMPLE_IMAGE} alt="Network image" width="200px" height="150px" fit="cover" />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookSection title="States">
        <StorybookSubsection title="loading" labels={["VImage placeholder={...}"]}>
          <VImage
            src="https://picsum.photos/seed/volo-loading/400/300"
            alt="Loading"
            width="200px"
            height="150px"
            placeholder={
              <div
                style={{
                  width: "200px",
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "var(--v-muted)",
                  borderRadius: "8px",
                }}
              >
                Loading...
              </div>
            }
          />
        </StorybookSubsection>
        <StorybookSubsection title="error" labels={['VImage src="invalid" errorFallback="..."']}>
          <VImage
            src={BROKEN_IMAGE}
            alt="Broken"
            width="200px"
            height="150px"
            errorFallback="Image not available"
          />
        </StorybookSubsection>
      </StorybookSection>

      <StorybookUsageGuidelines
        rows={[
          {
            category: "When to use",
            guideline:
              "Display user-uploaded images, product photos, or media content with consistent sizing and error handling.",
          },
          {
            category: "When not to use",
            guideline:
              "For decorative icons or SVG graphics. Use inline SVG or icon components instead.",
          },
          {
            category: "Accessibility",
            guideline:
              'Always provide meaningful alt text. Use empty alt="" only for purely decorative images.',
          },
          {
            category: "Fit",
            guideline: "Use object-fit to control how images fill their container",
          },
          {
            category: "Size",
            guideline: "Always specify width and height to prevent layout shift",
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
    <StorybookPageLayout title="VImage Samples" description="Copy-paste code examples for VImage.">
      <StorybookCodeBlock
        title="Basic usage"
        code={`<VImage
  src="https://example.com/image.jpg"
  alt="Sample"
  width="200px"
  height="200px"
  borderRadius={8}
/>`}
        preview={
          <VImage src={SAMPLE_IMAGE} alt="Sample" width="150px" height="150px" borderRadius={8} />
        }
      />
      <StorybookCodeBlock
        title="With placeholder"
        code={`<VImage
  src="https://example.com/image.jpg"
  alt="With placeholder"
  width="200px"
  height="200px"
  placeholder={<div>Loading...</div>}
/>`}
        preview={
          <VImage
            src="https://picsum.photos/seed/volo2/400/300"
            alt="With placeholder"
            width="150px"
            height="150px"
            borderRadius={8}
            placeholder={
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "var(--v-muted)",
                  borderRadius: "8px",
                }}
              >
                Loading...
              </div>
            }
          />
        }
      />
      <StorybookCodeBlock
        title="Error handling"
        code={`<VImage
  src="https://invalid-url.com/broken.jpg"
  alt="Error"
  width="200px"
  height="200px"
  errorFallback="Image not available"
/>`}
        preview={
          <VImage
            src={BROKEN_IMAGE}
            alt="Error"
            width="150px"
            height="150px"
            borderRadius={8}
            errorFallback="Image not available"
          />
        }
      />
      <StorybookCodeBlock
        title="Gallery grid"
        code={`<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
  <VImage src="/photo1.jpg" alt="Photo 1" width="100%" height="120px" borderRadius={8} />
  <VImage src="/photo2.jpg" alt="Photo 2" width="100%" height="120px" borderRadius={8} />
  <VImage src="/photo3.jpg" alt="Photo 3" width="100%" height="120px" borderRadius={8} />
  <VImage src="/photo4.jpg" alt="Photo 4" width="100%" height="120px" borderRadius={8} />
  <VImage src="/photo5.jpg" alt="Photo 5" width="100%" height="120px" borderRadius={8} />
  <VImage src="/photo6.jpg" alt="Photo 6" width="100%" height="120px" borderRadius={8} />
</div>`}
        preview={
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
              width: "100%",
            }}
          >
            <VImage
              src="https://picsum.photos/seed/g1/200/150"
              alt="Photo 1"
              width="100%"
              height="120px"
              borderRadius={8}
            />
            <VImage
              src="https://picsum.photos/seed/g2/200/150"
              alt="Photo 2"
              width="100%"
              height="120px"
              borderRadius={8}
            />
            <VImage
              src="https://picsum.photos/seed/g3/200/150"
              alt="Photo 3"
              width="100%"
              height="120px"
              borderRadius={8}
            />
            <VImage
              src="https://picsum.photos/seed/g4/200/150"
              alt="Photo 4"
              width="100%"
              height="120px"
              borderRadius={8}
            />
            <VImage
              src="https://picsum.photos/seed/g5/200/150"
              alt="Photo 5"
              width="100%"
              height="120px"
              borderRadius={8}
            />
            <VImage
              src="https://picsum.photos/seed/g6/200/150"
              alt="Photo 6"
              width="100%"
              height="120px"
              borderRadius={8}
            />
          </div>
        }
      />
      <StorybookCodeBlock
        title="Aspect ratio hero"
        code={`<div className="flex gap-4">
  <div>
    <p style={{ fontSize: '0.75rem', marginBottom: 4 }}>cover</p>
    <VImage src="/hero.jpg" alt="Cover" width="200px" height="120px" fit="cover" borderRadius={8} />
  </div>
  <div>
    <p style={{ fontSize: '0.75rem', marginBottom: 4 }}>contain</p>
    <VImage src="/hero.jpg" alt="Contain" width="200px" height="120px" fit="contain" borderRadius={8} />
  </div>
</div>`}
        preview={
          <div className="flex gap-4">
            <div>
              <p
                style={{ fontSize: "0.75rem", marginBottom: 4, color: "var(--v-muted-foreground)" }}
              >
                cover
              </p>
              <VImage
                src="https://picsum.photos/seed/hero/600/200"
                alt="Cover"
                width="200px"
                height="120px"
                fit="cover"
                borderRadius={8}
              />
            </div>
            <div>
              <p
                style={{ fontSize: "0.75rem", marginBottom: 4, color: "var(--v-muted-foreground)" }}
              >
                contain
              </p>
              <VImage
                src="https://picsum.photos/seed/hero/600/200"
                alt="Contain"
                width="200px"
                height="120px"
                fit="contain"
                borderRadius={8}
              />
            </div>
          </div>
        }
      />
    </StorybookPageLayout>
  ),
};
