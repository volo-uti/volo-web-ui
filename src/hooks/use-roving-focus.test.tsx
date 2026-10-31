import { describe, expect, it, vi } from "vitest";
import { useEffect, useRef } from "react";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRovingFocus } from "./use-roving-focus";
import type React from "react";

function createContainer(count: number): {
  container: HTMLDivElement;
  items: HTMLButtonElement[];
} {
  const container = document.createElement("div");
  const items: HTMLButtonElement[] = [];
  for (let i = 0; i < count; i++) {
    const btn = document.createElement("button");
    btn.textContent = `Item ${i}`;
    btn.setAttribute("data-roving-item", "");
    container.appendChild(btn);
    items.push(btn);
  }
  document.body.appendChild(container);
  return { container, items };
}

function fireKey(key: string): React.KeyboardEvent {
  const prevented = vi.fn();
  return {
    key,
    preventDefault: prevented,
    stopPropagation: vi.fn(),
    nativeEvent: new KeyboardEvent("keydown", { key }),
  } as unknown as React.KeyboardEvent;
}

describe("useRovingFocus", () => {
  it("moves focus to the next item with ArrowRight", () => {
    const { container, items } = createContainer(3);
    const ref = { current: container };

    const { result } = renderHook(() => useRovingFocus(ref));
    result.current.initRoving();

    // Initial state: the first item has tabindex="0"
    expect(items[0].getAttribute("tabindex")).toBe("0");
    expect(items[1].getAttribute("tabindex")).toBe("-1");

    const focusSpy = vi.spyOn(items[1], "focus");
    result.current.handleKeyDown(fireKey("ArrowRight"));

    expect(focusSpy).toHaveBeenCalled();
    expect(items[1].getAttribute("tabindex")).toBe("0");
    expect(items[0].getAttribute("tabindex")).toBe("-1");

    document.body.removeChild(container);
  });

  it("moves focus to the next item with ArrowDown (vertical)", () => {
    const { container, items } = createContainer(3);
    const ref = { current: container };

    const { result } = renderHook(() => useRovingFocus(ref, { orientation: "vertical" }));
    result.current.initRoving();

    const focusSpy = vi.spyOn(items[1], "focus");
    result.current.handleKeyDown(fireKey("ArrowDown"));

    expect(focusSpy).toHaveBeenCalled();

    document.body.removeChild(container);
  });

  it("wraps from the last item to the first on ArrowRight (loop)", () => {
    const { container, items } = createContainer(3);
    const ref = { current: container };

    const { result } = renderHook(() => useRovingFocus(ref, { loop: true }));
    result.current.initRoving();

    // Move to the last item
    result.current.focusItem(2);

    const focusSpy = vi.spyOn(items[0], "focus");
    result.current.handleKeyDown(fireKey("ArrowRight"));

    expect(focusSpy).toHaveBeenCalled();

    document.body.removeChild(container);
  });

  it("wraps from the first item to the last on ArrowLeft (loop)", () => {
    const { container, items } = createContainer(3);
    const ref = { current: container };

    const { result } = renderHook(() => useRovingFocus(ref, { loop: true }));
    result.current.initRoving();

    const focusSpy = vi.spyOn(items[2], "focus");
    result.current.handleKeyDown(fireKey("ArrowLeft"));

    expect(focusSpy).toHaveBeenCalled();

    document.body.removeChild(container);
  });

  it("does not move at the edge when loop=false", () => {
    const { container, items } = createContainer(3);
    const ref = { current: container };

    const { result } = renderHook(() => useRovingFocus(ref, { loop: false }));
    result.current.initRoving();

    // Already on the first item, so ArrowLeft does not move
    const focusSpy = vi.spyOn(items[0], "focus");
    result.current.handleKeyDown(fireKey("ArrowLeft"));

    // focusItem must not be called (nextIndex === currentIndex)
    expect(focusSpy).not.toHaveBeenCalled();

    document.body.removeChild(container);
  });

  it("focuses the first item with the Home key", () => {
    const { container, items } = createContainer(3);
    const ref = { current: container };

    const { result } = renderHook(() => useRovingFocus(ref));
    result.current.initRoving();
    result.current.focusItem(2);

    const focusSpy = vi.spyOn(items[0], "focus");
    result.current.handleKeyDown(fireKey("Home"));

    expect(focusSpy).toHaveBeenCalled();

    document.body.removeChild(container);
  });

  it("focuses the last item with the End key", () => {
    const { container, items } = createContainer(3);
    const ref = { current: container };

    const { result } = renderHook(() => useRovingFocus(ref));
    result.current.initRoving();

    const focusSpy = vi.spyOn(items[2], "focus");
    result.current.handleKeyDown(fireKey("End"));

    expect(focusSpy).toHaveBeenCalled();

    document.body.removeChild(container);
  });

  it("calls the onActiveChange callback", () => {
    const onActiveChange = vi.fn();
    const { container } = createContainer(3);
    const ref = { current: container };

    const { result } = renderHook(() => useRovingFocus(ref, { onActiveChange }));
    result.current.initRoving();
    result.current.handleKeyDown(fireKey("ArrowRight"));

    expect(onActiveChange).toHaveBeenCalledWith(1);

    document.body.removeChild(container);
  });

  it("skips disabled items", () => {
    const { container, items } = createContainer(3);
    items[1].setAttribute("disabled", "");
    const ref = { current: container };

    const { result } = renderHook(() => useRovingFocus(ref));
    result.current.initRoving();

    // Disabled items are filtered out of getItems(),
    // so ArrowRight moves from item 0 to item 2
    const focusSpy = vi.spyOn(items[2], "focus");
    result.current.handleKeyDown(fireKey("ArrowRight"));

    expect(focusSpy).toHaveBeenCalled();

    document.body.removeChild(container);
  });
});

describe("useRovingFocus with real focus", () => {
  function Group({
    count,
    disabled = [],
    checked,
    initOnce = false,
  }: {
    count: number;
    disabled?: number[];
    checked?: number;
    initOnce?: boolean;
  }) {
    const ref = useRef<HTMLDivElement>(null);
    const { handleKeyDown, initRoving } = useRovingFocus(ref, { orientation: "horizontal" });
    // With `initOnce` the caller never re-runs it; the hook has to follow the items itself
    useEffect(() => {
      if (!initOnce) initRoving();
    });
    useEffect(() => {
      if (initOnce) initRoving();
    }, [initOnce, initRoving]);
    return (
      <div ref={ref} onKeyDown={handleKeyDown}>
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            data-roving-item
            disabled={disabled.includes(i)}
            aria-checked={checked === undefined ? undefined : checked === i}
          >
            {`Item ${i}`}
          </button>
        ))}
      </div>
    );
  }

  const tabindexes = () =>
    screen.getAllByRole("button").map((button) => button.getAttribute("tabindex"));

  it("moves from the clicked item, not from the last keyboard position", async () => {
    const user = userEvent.setup();
    render(<Group count={4} />);

    await user.click(screen.getByRole("button", { name: "Item 2" }));
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("button", { name: "Item 3" })).toHaveFocus();
  });

  it("wraps from the last item after it received focus by click", async () => {
    const user = userEvent.setup();
    render(<Group count={3} />);

    await user.click(screen.getByRole("button", { name: "Item 2" }));
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("button", { name: "Item 0" })).toHaveFocus();
  });

  it("moves the tab stop to the item that received focus", async () => {
    const user = userEvent.setup();
    render(<Group count={3} />);
    expect(tabindexes()).toEqual(["0", "-1", "-1"]);

    await user.click(screen.getByRole("button", { name: "Item 1" }));

    expect(tabindexes()).toEqual(["-1", "0", "-1"]);
  });

  it("gives items added later a tabindex", () => {
    const { rerender } = render(<Group count={2} />);
    rerender(<Group count={4} />);

    expect(tabindexes()).toEqual(["0", "-1", "-1", "-1"]);
  });

  it("follows items added after mount even when the caller initialises once", async () => {
    const { rerender } = render(<Group count={2} initOnce />);
    rerender(<Group count={4} initOnce />);

    await waitFor(() => expect(tabindexes()).toEqual(["0", "-1", "-1", "-1"]));
  });

  it("keeps a tab stop when the item that held it becomes disabled", () => {
    const { rerender } = render(<Group count={3} />);
    rerender(<Group count={3} disabled={[0]} />);

    // The disabled item is skipped, so the first enabled item is the tab stop
    expect(screen.getByRole("button", { name: "Item 1" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("button", { name: "Item 2" })).toHaveAttribute("tabindex", "-1");
  });

  it("clamps the stored position when the items shrink", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Group count={3} />);
    screen.getByRole("button", { name: "Item 0" }).focus();
    await user.keyboard("{End}");
    expect(tabindexes()).toEqual(["-1", "-1", "0"]);

    rerender(<Group count={2} />);

    expect(tabindexes()).toEqual(["-1", "0"]);
  });

  it("puts the tab stop on the selected item", () => {
    render(<Group count={3} checked={2} />);

    expect(tabindexes()).toEqual(["-1", "-1", "0"]);
  });
});
