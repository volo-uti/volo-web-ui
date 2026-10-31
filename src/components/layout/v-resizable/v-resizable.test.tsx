import { StrictMode, createRef, useState } from "react";
import { fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VResizablePanelGroup, VResizablePanel, VResizableHandle } from "./v-resizable";

/** Helper: render a basic two-panel horizontal layout */
const renderBasic = (props: Record<string, unknown> = {}) =>
  renderWithTheme(
    <VResizablePanelGroup {...props}>
      <VResizablePanel defaultSize={0.3}>
        <div>Left</div>
      </VResizablePanel>
      <VResizableHandle />
      <VResizablePanel defaultSize={0.7}>
        <div>Right</div>
      </VResizablePanel>
    </VResizablePanelGroup>,
  );

describe("VResizablePanelGroup", () => {
  it("renders both panels and the handle", () => {
    renderBasic();
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it('defaults to direction="horizontal"', () => {
    const { container } = renderBasic();
    const group = container.querySelector(".v-resizable-panel-group");
    expect(group).toHaveAttribute("data-v-direction", "horizontal");
    expect(group).toHaveClass("flex-row");
  });

  it('applies direction="vertical"', () => {
    const { container } = renderBasic({ direction: "vertical" });
    const group = container.querySelector(".v-resizable-panel-group");
    expect(group).toHaveAttribute("data-v-direction", "vertical");
    expect(group).toHaveClass("flex-col");
  });

  it("merges className", () => {
    const { container } = renderBasic({ className: "custom-group" });
    const group = container.querySelector(".v-resizable-panel-group");
    expect(group).toHaveClass("v-resizable-panel-group", "custom-group");
  });
});

describe("VResizablePanel", () => {
  it("renders children", () => {
    renderBasic();
    expect(screen.getByText("Left")).toBeInTheDocument();
  });

  it("sets defaultSize as a data attribute", () => {
    const { container } = renderBasic();
    const panels = container.querySelectorAll(".v-resizable-panel");
    expect(panels[0]).toHaveAttribute("data-v-panel-default-size", "0.3");
    expect(panels[1]).toHaveAttribute("data-v-panel-default-size", "0.7");
  });

  it("sets minSize/maxSize as data attributes", () => {
    const { container } = renderWithTheme(
      <VResizablePanelGroup>
        <VResizablePanel defaultSize={0.3} minSize={0.1} maxSize={0.5}>
          <div>Panel</div>
        </VResizablePanel>
        <VResizableHandle />
        <VResizablePanel defaultSize={0.7}>
          <div>Other</div>
        </VResizablePanel>
      </VResizablePanelGroup>,
    );
    const panel = container.querySelector(".v-resizable-panel");
    expect(panel).toHaveAttribute("data-v-panel-min-size", "0.1");
    expect(panel).toHaveAttribute("data-v-panel-max-size", "0.5");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <VResizablePanelGroup>
        <VResizablePanel ref={ref} defaultSize={0.5}>
          <div>Panel</div>
        </VResizablePanel>
        <VResizableHandle />
        <VResizablePanel defaultSize={0.5}>
          <div>Other</div>
        </VResizablePanel>
      </VResizablePanelGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("merges className", () => {
    const { container } = renderWithTheme(
      <VResizablePanelGroup>
        <VResizablePanel defaultSize={0.5} className="custom-panel">
          <div>Panel</div>
        </VResizablePanel>
        <VResizableHandle />
        <VResizablePanel defaultSize={0.5}>
          <div>Other</div>
        </VResizablePanel>
      </VResizablePanelGroup>,
    );
    const panel = container.querySelector(".v-resizable-panel");
    expect(panel).toHaveClass("v-resizable-panel", "custom-panel");
  });

  it("applies overflow: hidden", () => {
    const { container } = renderBasic();
    const panel = container.querySelector(".v-resizable-panel");
    expect(panel).toHaveClass("overflow-hidden");
  });
});

describe("VResizableHandle", () => {
  it('has role="separator"', () => {
    renderBasic();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("sets aria-orientation opposite to direction (horizontal → vertical)", () => {
    renderBasic();
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("sets aria-orientation to horizontal for the vertical direction", () => {
    renderBasic({ direction: "vertical" });
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("renders the grip icon when withHandle=true (default)", () => {
    const { container } = renderBasic();
    const handle = container.querySelector(".v-resizable-handle");
    const grip = handle?.querySelector(".bg-\\[var\\(--v-border\\)\\]");
    expect(grip).toBeInTheDocument();
  });

  it("does not render the grip icon when withHandle=false", () => {
    const { container } = renderWithTheme(
      <VResizablePanelGroup>
        <VResizablePanel defaultSize={0.5}>
          <div>Left</div>
        </VResizablePanel>
        <VResizableHandle withHandle={false} />
        <VResizablePanel defaultSize={0.5}>
          <div>Right</div>
        </VResizablePanel>
      </VResizablePanelGroup>,
    );
    const handle = container.querySelector(".v-resizable-handle");
    expect(handle?.children).toHaveLength(0);
  });

  it("sets aria-disabled when disabled", () => {
    renderWithTheme(
      <VResizablePanelGroup>
        <VResizablePanel defaultSize={0.5}>
          <div>Left</div>
        </VResizablePanel>
        <VResizableHandle disabled />
        <VResizablePanel defaultSize={0.5}>
          <div>Right</div>
        </VResizablePanel>
      </VResizablePanelGroup>,
    );
    expect(screen.getByRole("separator")).toHaveAttribute("aria-disabled", "true");
  });

  it("sets tabIndex to -1 when disabled", () => {
    renderWithTheme(
      <VResizablePanelGroup>
        <VResizablePanel defaultSize={0.5}>
          <div>Left</div>
        </VResizablePanel>
        <VResizableHandle disabled />
        <VResizablePanel defaultSize={0.5}>
          <div>Right</div>
        </VResizablePanel>
      </VResizablePanelGroup>,
    );
    expect(screen.getByRole("separator")).toHaveAttribute("tabindex", "-1");
  });

  it("sets tabIndex to 0 when enabled", () => {
    renderBasic();
    expect(screen.getByRole("separator")).toHaveAttribute("tabindex", "0");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <VResizablePanelGroup>
        <VResizablePanel defaultSize={0.5}>
          <div>Left</div>
        </VResizablePanel>
        <VResizableHandle ref={ref} />
        <VResizablePanel defaultSize={0.5}>
          <div>Right</div>
        </VResizablePanel>
      </VResizablePanelGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("merges className", () => {
    const { container } = renderWithTheme(
      <VResizablePanelGroup>
        <VResizablePanel defaultSize={0.5}>
          <div>Left</div>
        </VResizablePanel>
        <VResizableHandle className="custom-handle" />
        <VResizablePanel defaultSize={0.5}>
          <div>Right</div>
        </VResizablePanel>
      </VResizablePanelGroup>,
    );
    const handle = container.querySelector(".v-resizable-handle");
    expect(handle).toHaveClass("v-resizable-handle", "custom-handle");
  });

  it("has the data-v-handle attribute", () => {
    const { container } = renderBasic();
    const handle = container.querySelector("[data-v-handle]");
    expect(handle).toBeInTheDocument();
  });

  it('defaults to data-v-state="idle"', () => {
    renderBasic();
    expect(screen.getByRole("separator")).toHaveAttribute("data-v-state", "idle");
  });

  it("sets data-v-direction", () => {
    renderBasic();
    expect(screen.getByRole("separator")).toHaveAttribute("data-v-direction", "horizontal");
  });

  it("applies the horizontal cursor class", () => {
    const { container } = renderBasic();
    const handle = container.querySelector(".v-resizable-handle");
    expect(handle).toHaveClass("cursor-col-resize");
  });

  it("applies the vertical cursor class", () => {
    const { container } = renderBasic({ direction: "vertical" });
    const handle = container.querySelector(".v-resizable-handle");
    expect(handle).toHaveClass("cursor-row-resize");
  });
});

describe("VResizablePanelGroup — 3-panel layout", () => {
  const renderThreePanels = () =>
    renderWithTheme(
      <VResizablePanelGroup>
        <VResizablePanel defaultSize={0.25}>
          <div>Panel 1</div>
        </VResizablePanel>
        <VResizableHandle />
        <VResizablePanel defaultSize={0.5}>
          <div>Panel 2</div>
        </VResizablePanel>
        <VResizableHandle />
        <VResizablePanel defaultSize={0.25}>
          <div>Panel 3</div>
        </VResizablePanel>
      </VResizablePanelGroup>,
    );

  it("renders 3 panels and 2 handles", () => {
    renderThreePanels();
    expect(screen.getByText("Panel 1")).toBeInTheDocument();
    expect(screen.getByText("Panel 2")).toBeInTheDocument();
    expect(screen.getByText("Panel 3")).toBeInTheDocument();
    expect(screen.getAllByRole("separator")).toHaveLength(2);
  });
});

describe("VResizablePanelGroup — collapsible panel", () => {
  it("sets the data attribute on a collapsible panel", () => {
    const { container } = renderWithTheme(
      <VResizablePanelGroup>
        <VResizablePanel defaultSize={0.3} collapsible collapsedSize={0.05}>
          <div>Sidebar</div>
        </VResizablePanel>
        <VResizableHandle />
        <VResizablePanel defaultSize={0.7}>
          <div>Main</div>
        </VResizablePanel>
      </VResizablePanelGroup>,
    );
    const panel = container.querySelector(".v-resizable-panel");
    expect(panel).toHaveAttribute("data-v-panel-collapsible", "true");
    expect(panel).toHaveAttribute("data-v-panel-collapsed-size", "0.05");
  });
});

describe("VResizable — callbacks and keyboard", () => {
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(1004);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderCallbacks = (
    group: Record<string, unknown> = {},
    panel: Record<string, unknown> = {},
    handle: Record<string, unknown> = {},
  ) =>
    renderWithTheme(
      <VResizablePanelGroup {...group}>
        <VResizablePanel defaultSize={0.3} {...panel}>
          <div>Left</div>
        </VResizablePanel>
        <VResizableHandle {...handle} />
        <VResizablePanel defaultSize={0.7}>
          <div>Right</div>
        </VResizablePanel>
      </VResizablePanelGroup>,
    );

  it("passes the new size to onValueChange on ArrowRight", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderCallbacks({ onValueChange });

    screen.getByRole("separator").focus();
    await user.keyboard("{ArrowRight}");

    expect(onValueChange).toHaveBeenCalledTimes(1);
    const [left, right] = onValueChange.mock.calls[0]![0] as number[];
    expect(left).toBeCloseTo(0.31, 2);
    expect(right).toBeCloseTo(0.69, 2);
  });

  it("shrinks the left panel on ArrowLeft", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderCallbacks({ onValueChange });

    screen.getByRole("separator").focus();
    await user.keyboard("{ArrowLeft}");

    expect((onValueChange.mock.calls[0]![0] as number[])[0]).toBeCloseTo(0.29, 2);
  });

  it("resizes with ArrowDown in the vertical direction", async () => {
    vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(1004);
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderCallbacks({ onValueChange, direction: "vertical" });

    screen.getByRole("separator").focus();
    await user.keyboard("{ArrowDown}");

    expect((onValueChange.mock.calls[0]![0] as number[])[0]).toBeCloseTo(0.31, 2);
  });

  it("calls the panel onSizeChange with the new size", async () => {
    const onSizeChange = vi.fn();
    const user = userEvent.setup();
    renderCallbacks({}, { onSizeChange });

    screen.getByRole("separator").focus();
    await user.keyboard("{ArrowRight}");

    expect(onSizeChange).toHaveBeenCalled();
    expect(onSizeChange.mock.calls[0]![0]).toBeCloseTo(0.31, 2);
  });

  it("does not resize a disabled handle with the keyboard", async () => {
    const onValueChange = vi.fn();
    const onSizeChange = vi.fn();
    renderCallbacks({ onValueChange }, { onSizeChange }, { disabled: true });

    const handle = screen.getByRole("separator");
    handle.focus();
    await userEvent.setup().keyboard("{ArrowRight}");
    await userEvent.setup().dblClick(handle);

    expect(onValueChange).not.toHaveBeenCalled();
    expect(onSizeChange).not.toHaveBeenCalled();
  });

  it("collapses and expands a collapsible panel on double click", async () => {
    const onCollapse = vi.fn();
    const onExpand = vi.fn();
    const user = userEvent.setup();
    renderCallbacks({}, { collapsible: true, onCollapse, onExpand });

    const handle = screen.getByRole("separator");
    await user.dblClick(handle);
    expect(onCollapse).toHaveBeenCalledTimes(1);
    expect(onExpand).not.toHaveBeenCalled();

    await user.dblClick(handle);
    expect(onExpand).toHaveBeenCalledTimes(1);
  });

  it("does not collapse on double click unless collapsible", async () => {
    const onCollapse = vi.fn();
    renderCallbacks({}, { onCollapse });
    await userEvent.setup().dblClick(screen.getByRole("separator"));
    expect(onCollapse).not.toHaveBeenCalled();
  });

  it("accepts ref and native props on the group", () => {
    const ref = createRef<HTMLDivElement>();
    renderCallbacks({ ref, "data-testid": "group", id: "g" });
    expect(ref.current).toBe(screen.getByTestId("group"));
    expect(ref.current).toHaveAttribute("id", "g");
  });

  it("has no accessibility violations", async () => {
    const { container } = renderCallbacks();
    await axeTest(container);
  });
});

describe("VResizable — regressions", () => {
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(1004);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const basis = (index: number) =>
    (document.querySelectorAll("[data-v-panel]")[index] as HTMLElement).style.flexBasis;

  const pair = (
    sizes: [number, number],
    options: {
      group?: Record<string, unknown>;
      left?: Record<string, unknown>;
      right?: Record<string, unknown>;
      handle?: Record<string, unknown>;
    } = {},
  ) => (
    <VResizablePanelGroup {...options.group}>
      <VResizablePanel defaultSize={sizes[0]} {...options.left}>
        <div>Left</div>
      </VResizablePanel>
      <VResizableHandle {...options.handle} />
      <VResizablePanel defaultSize={sizes[1]} {...options.right}>
        <div>Right</div>
      </VResizablePanel>
    </VResizablePanelGroup>
  );

  it("keeps the user's sizes when the parent re-renders", async () => {
    const user = userEvent.setup();
    function Parent() {
      const [count, setCount] = useState(0);
      return (
        <div>
          <button type="button" onClick={() => setCount(count + 1)}>
            bump {count}
          </button>
          {pair([0.3, 0.7])}
        </div>
      );
    }
    renderWithTheme(<Parent />);

    screen.getByRole("separator").focus();
    await user.keyboard("{ArrowRight}{ArrowRight}{ArrowRight}");
    const resized = basis(0);
    expect(resized).not.toBe("calc(30% - 2px * 0.5)");

    await user.click(screen.getByRole("button", { name: /bump/ }));
    expect(screen.getByRole("button", { name: "bump 1" })).toBeInTheDocument();
    expect(basis(0)).toBe(resized);
  });

  it("calls onValueChange once per key press under StrictMode, outside of render", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    function Parent() {
      const [layout, setLayout] = useState<number[]>([]);
      return (
        <div>
          <span>{layout.length} sizes</span>
          {pair([0.3, 0.7], {
            group: {
              onValueChange: (sizes: number[]) => {
                onValueChange(sizes);
                setLayout(sizes);
              },
            },
          })}
        </div>
      );
    }
    renderWithTheme(
      <StrictMode>
        <Parent />
      </StrictMode>,
    );

    screen.getByRole("separator").focus();
    await user.keyboard("{ArrowRight}");

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(screen.getByText("2 sizes")).toBeInTheDocument();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("calls onSizeChange once per resize under StrictMode", async () => {
    const onSizeChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<StrictMode>{pair([0.3, 0.7], { left: { onSizeChange } })}</StrictMode>);

    screen.getByRole("separator").focus();
    await user.keyboard("{ArrowRight}");

    expect(onSizeChange).toHaveBeenCalledTimes(1);
  });

  it("never pushes the shrinking panel below its minSize", async () => {
    const user = userEvent.setup();
    renderWithTheme(pair([0.7, 0.3], { right: { minSize: 0.3 } }));

    const handle = screen.getByRole("separator");
    handle.focus();
    await user.keyboard("{ArrowRight}{ArrowRight}");

    expect(Number(handle.getAttribute("aria-valuenow"))).toBe(70);
    expect(basis(1)).toContain("30%");
  });

  it("never pushes the growing panel above its maxSize", async () => {
    const user = userEvent.setup();
    renderWithTheme(pair([0.5, 0.5], { left: { maxSize: 0.5 } }));

    const handle = screen.getByRole("separator");
    handle.focus();
    await user.keyboard("{ArrowRight}{ArrowRight}");

    expect(Number(handle.getAttribute("aria-valuenow"))).toBe(50);
  });

  it("stops at the minSize limit instead of overshooting it", async () => {
    const user = userEvent.setup();
    renderWithTheme(pair([0.7, 0.3], { right: { minSize: 0.28 } }));

    const handle = screen.getByRole("separator");
    handle.focus();
    for (let i = 0; i < 10; i += 1) await user.keyboard("{ArrowRight}");

    expect(Number(handle.getAttribute("aria-valuenow"))).toBe(72);
  });

  it("restores the previous layout when a collapsed panel expands", async () => {
    const user = userEvent.setup();
    renderWithTheme(pair([0.3, 0.7], { left: { collapsible: true } }));

    const handle = screen.getByRole("separator");
    await user.dblClick(handle);
    expect(handle).toHaveAttribute("aria-valuenow", "0");
    expect(basis(1)).toContain("100%");

    await user.dblClick(handle);
    expect(handle).toHaveAttribute("aria-valuenow", "30");
    expect(basis(1)).toContain("70%");
  });

  it("ends a drag on pointercancel", () => {
    renderWithTheme(pair([0.3, 0.7]));
    const handle = screen.getByRole("separator");

    fireEvent.pointerDown(handle);
    expect(handle).toHaveAttribute("data-v-state", "dragging");
    expect(document.body.style.userSelect).toBe("none");

    fireEvent(document, new Event("pointercancel"));
    expect(handle).toHaveAttribute("data-v-state", "idle");
    expect(document.body.style.userSelect).toBe("");
  });

  it("disables touch panning on the handle", () => {
    renderWithTheme(pair([0.3, 0.7]));
    expect(screen.getByRole("separator")).toHaveClass("touch-none");
  });

  it("runs a user onKeyDown on the handle and still resizes", async () => {
    const onKeyDown = vi.fn();
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(pair([0.3, 0.7], { group: { onValueChange }, handle: { onKeyDown } }));

    screen.getByRole("separator").focus();
    await user.keyboard("{ArrowRight}");

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it("runs user pointer, double-click and mouse handlers on the handle", async () => {
    const onPointerDown = vi.fn();
    const onDoubleClick = vi.fn();
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();
    const onCollapse = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      pair([0.3, 0.7], {
        left: { collapsible: true, onCollapse },
        handle: { onPointerDown, onDoubleClick, onMouseEnter, onMouseLeave },
      }),
    );

    const handle = screen.getByRole("separator");
    await user.hover(handle);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(handle).toHaveAttribute("data-v-state", "hover");

    await user.dblClick(handle);
    expect(onPointerDown).toHaveBeenCalled();
    expect(onDoubleClick).toHaveBeenCalledTimes(1);
    expect(onCollapse).toHaveBeenCalledTimes(1);

    await user.unhover(handle);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });
});
