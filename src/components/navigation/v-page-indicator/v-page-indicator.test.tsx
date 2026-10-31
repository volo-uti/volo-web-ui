import { createRef } from "react";
import { VoloProvider } from "../../../provider";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VPageIndicator } from "./v-page-indicator";

describe("VPageIndicator", () => {
  it("renders by default", () => {
    renderWithTheme(
      <VPageIndicator total={5} value={0}>
        indicator
      </VPageIndicator>,
    );
    expect(screen.getByText("indicator")).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(
      <VPageIndicator total={5} value={0} className="custom">
        indicator
      </VPageIndicator>,
    );
    expect(container.firstChild).toHaveClass("v-page-indicator", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <VPageIndicator ref={ref} total={5} value={0}>
        indicator
      </VPageIndicator>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("calls onValueChange with the index when a dot is pressed", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VPageIndicator total={3} value={0} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("button", { name: "Page 3" }));
    expect(onValueChange).toHaveBeenCalledWith(2);
  });

  it("starts from defaultValue and changes on press in uncontrolled mode", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VPageIndicator variant="number" total={4} defaultValue={1} onValueChange={() => {}} />,
    );
    expect(screen.getByText("2")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VPageIndicator total={3} value={1} />);
    await axeTest(container);
  });
});

const custom = {
  paginationPrevious: "Back",
  paginationNext: "Forward",
  pageIndicatorLabel: (page: number, total: number) => `Step ${page} of ${total}`,
  pageIndicatorPage: (page: number) => `Go to ${page}`,
};

describe("VPageIndicator locale text", () => {
  it("takes every label from the locale text", () => {
    renderWithTheme(
      <VoloProvider locale="fr" localeText={custom}>
        <VPageIndicator variant="number" total={5} value={1} onValueChange={vi.fn()} />
        <VPageIndicator variant="dots" total={3} value={0} />
      </VoloProvider>,
    );
    expect(screen.getByRole("button", { name: custom.paginationPrevious })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: custom.paginationNext })).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: custom.pageIndicatorLabel(2, 5) }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: custom.pageIndicatorPage(3) })).toBeInTheDocument();
  });
});
