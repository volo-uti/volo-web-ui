import { useRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, renderHook, screen } from "@testing-library/react";
import { useFocusTrap } from "./use-focus-trap";

/**
 * In jsdom requestAnimationFrame does not run synchronously,
 * so it has to be flushed by hand.
 */
function flushRAF() {
  vi.advanceTimersByTime(16); // ~1 frame
}

describe("useFocusTrap", () => {
  it("focuses the first focusable element in the container when opened", () => {
    vi.useFakeTimers();

    const container = document.createElement("div");
    const button = document.createElement("button");
    button.textContent = "First";
    container.appendChild(button);
    document.body.appendChild(container);

    const ref = { current: container };
    const focusSpy = vi.spyOn(button, "focus");

    renderHook(({ isOpen }) => useFocusTrap(ref, isOpen), { initialProps: { isOpen: true } });

    flushRAF();

    expect(focusSpy).toHaveBeenCalled();

    document.body.removeChild(container);
    vi.useRealTimers();
  });

  it("restores focus to the previous element when closed", () => {
    vi.useFakeTimers();

    // Trigger button (where focus was before the modal opened)
    const trigger = document.createElement("button");
    trigger.textContent = "Trigger";
    document.body.appendChild(trigger);
    trigger.focus();

    const container = document.createElement("div");
    const innerBtn = document.createElement("button");
    innerBtn.textContent = "Inner";
    container.appendChild(innerBtn);
    document.body.appendChild(container);

    const ref = { current: container };
    const triggerFocusSpy = vi.spyOn(trigger, "focus");

    const { rerender } = renderHook(({ isOpen }) => useFocusTrap(ref, isOpen), {
      initialProps: { isOpen: true },
    });

    flushRAF();

    // Close the modal
    rerender({ isOpen: false });
    flushRAF();

    expect(triggerFocusSpy).toHaveBeenCalled();

    document.body.removeChild(container);
    document.body.removeChild(trigger);
    vi.useRealTimers();
  });

  it("cycles focus with the Tab key (last to first)", () => {
    vi.useFakeTimers();

    const container = document.createElement("div");
    const btn1 = document.createElement("button");
    btn1.textContent = "First";
    const btn2 = document.createElement("button");
    btn2.textContent = "Last";
    container.appendChild(btn1);
    container.appendChild(btn2);
    document.body.appendChild(container);

    const ref = { current: container };

    renderHook(({ isOpen }) => useFocusTrap(ref, isOpen), { initialProps: { isOpen: true } });

    flushRAF();

    // Focus the last element
    btn2.focus();
    const focusSpy = vi.spyOn(btn1, "focus");

    // Tab key event (wraps from the last to the first)
    const tabEvent = new KeyboardEvent("keydown", {
      key: "Tab",
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(tabEvent);

    expect(focusSpy).toHaveBeenCalled();
    expect(tabEvent.defaultPrevented).toBe(true);

    document.body.removeChild(container);
    vi.useRealTimers();
  });

  it("cycles backwards with Shift+Tab (first to last)", () => {
    vi.useFakeTimers();

    const container = document.createElement("div");
    const btn1 = document.createElement("button");
    btn1.textContent = "First";
    const btn2 = document.createElement("button");
    btn2.textContent = "Last";
    container.appendChild(btn1);
    container.appendChild(btn2);
    document.body.appendChild(container);

    const ref = { current: container };

    renderHook(({ isOpen }) => useFocusTrap(ref, isOpen), { initialProps: { isOpen: true } });

    flushRAF();

    // Focus the first element
    btn1.focus();
    const focusSpy = vi.spyOn(btn2, "focus");

    // Shift+Tab event
    const shiftTabEvent = new KeyboardEvent("keydown", {
      key: "Tab",
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(shiftTabEvent);

    expect(focusSpy).toHaveBeenCalled();
    expect(shiftTabEvent.defaultPrevented).toBe(true);

    document.body.removeChild(container);
    vi.useRealTimers();
  });

  describe("invisible elements", () => {
    function setup(hidden: (c: HTMLElement) => HTMLElement) {
      const container = document.createElement("div");
      const first = document.createElement("button");
      const last = document.createElement("button");
      container.append(first, hidden(container), last);
      document.body.appendChild(container);
      return { container, first, last };
    }

    it("skips a first element with display:none and focuses the next one initially", () => {
      vi.useFakeTimers();
      const { container, first, last } = setup(() => document.createElement("button"));
      first.style.display = "none";
      const hiddenFirst = vi.spyOn(first, "focus");
      const lastFocus = vi.spyOn(container.children[1] as HTMLElement, "focus");
      renderHook(() => useFocusTrap({ current: container }, true));
      flushRAF();
      expect(hiddenFirst).not.toHaveBeenCalled();
      expect(lastFocus).toHaveBeenCalled();
      expect(last).toBeDefined();
      document.body.removeChild(container);
      vi.useRealTimers();
    });

    it("wraps on Tab from the element before a hidden last element", () => {
      vi.useFakeTimers();
      const { container, first, last } = setup(() => document.createElement("button"));
      last.hidden = true;
      const middle = container.children[1] as HTMLElement;
      renderHook(() => useFocusTrap({ current: container }, true));
      flushRAF();
      middle.focus();
      const focusSpy = vi.spyOn(first, "focus");
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true }));
      expect(focusSpy).toHaveBeenCalled();
      document.body.removeChild(container);
      vi.useRealTimers();
    });

    it("ignores inert elements and elements with a display:none ancestor", () => {
      vi.useFakeTimers();
      const { container, first, last } = setup(() => {
        const wrap = document.createElement("div");
        wrap.style.display = "none";
        wrap.appendChild(document.createElement("button"));
        return wrap;
      });
      first.setAttribute("inert", "");
      renderHook(() => useFocusTrap({ current: container }, true));
      flushRAF();
      expect(document.activeElement).toBe(last);
      document.body.removeChild(container);
      vi.useRealTimers();
    });
  });
});

describe("useFocusTrap in a component tree", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  function Panel({ open, autoFocus = false }: { open: boolean; autoFocus?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    useFocusTrap(ref, open);
    return open ? (
      <div ref={ref} role="dialog">
        <input aria-label="inner" autoFocus={autoFocus} />
      </div>
    ) : null;
  }

  function MountedPanel() {
    const ref = useRef<HTMLDivElement>(null);
    useFocusTrap(ref, true);
    return (
      <div ref={ref} role="dialog">
        <button type="button">inner</button>
      </div>
    );
  }

  function setupTrigger() {
    const trigger = document.createElement("button");
    trigger.textContent = "Trigger";
    document.body.appendChild(trigger);
    trigger.focus();
    return trigger;
  }

  it("restores focus to the trigger when the content has an autoFocus element", () => {
    vi.useFakeTimers();
    const trigger = setupTrigger();
    const { rerender } = render(<Panel open={false} autoFocus />);

    rerender(<Panel open autoFocus />);
    flushRAF();
    expect(screen.getByLabelText("inner")).toHaveFocus();

    rerender(<Panel open={false} autoFocus />);
    flushRAF();

    expect(trigger).toHaveFocus();
    trigger.remove();
  });

  it("restores focus when the host unmounts while open", () => {
    vi.useFakeTimers();
    const trigger = setupTrigger();
    const { rerender } = render(<div />);

    rerender(<MountedPanel />);
    flushRAF();
    expect(screen.getByRole("button", { name: "inner" })).toHaveFocus();

    rerender(<div />);
    flushRAF();

    expect(trigger).toHaveFocus();
    trigger.remove();
  });

  it("does not pull focus back after the user moved to another control", () => {
    vi.useFakeTimers();
    const trigger = setupTrigger();
    const other = document.createElement("input");
    document.body.appendChild(other);
    const { rerender } = render(<Panel open />);
    flushRAF();

    // An outside press closes the panel and focuses the other control in the same step
    other.focus();
    rerender(<Panel open={false} />);
    flushRAF();

    expect(other).toHaveFocus();
    trigger.remove();
    other.remove();
  });

  it("restores focus when it fell to the body on close", () => {
    vi.useFakeTimers();
    const trigger = setupTrigger();
    const { rerender } = render(<Panel open />);
    flushRAF();

    rerender(<Panel open={false} />);
    flushRAF();

    expect(trigger).toHaveFocus();
    trigger.remove();
  });
});

describe("useFocusTrap without focusable content", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  function textOnly() {
    const container = document.createElement("div");
    container.textContent = "Just text";
    document.body.appendChild(container);
    return container;
  }

  it("focuses the container itself when it has nothing focusable", () => {
    vi.useFakeTimers();
    const container = textOnly();
    renderHook(() => useFocusTrap({ current: container }, true));
    flushRAF();

    expect(container).toHaveFocus();
    container.remove();
  });

  it("removes the tabindex it added when the trap closes", () => {
    vi.useFakeTimers();
    const container = textOnly();
    const { rerender } = renderHook(({ open }) => useFocusTrap({ current: container }, open), {
      initialProps: { open: true },
    });
    flushRAF();
    expect(container).toHaveAttribute("tabindex", "-1");

    rerender({ open: false });

    expect(container).not.toHaveAttribute("tabindex");
    container.remove();
  });

  it("keeps Tab from leaving the container", () => {
    vi.useFakeTimers();
    const container = textOnly();
    renderHook(() => useFocusTrap({ current: container }, true));
    flushRAF();

    const tab = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true });
    document.dispatchEvent(tab);

    expect(tab.defaultPrevented).toBe(true);
    expect(container).toHaveFocus();
    container.remove();
  });
});

describe("useFocusTrap with focus outside the container", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("pulls Tab back to the first element when focus is on the body", () => {
    vi.useFakeTimers();
    const container = document.createElement("div");
    const first = document.createElement("button");
    const last = document.createElement("button");
    container.append(first, last);
    document.body.appendChild(container);
    renderHook(() => useFocusTrap({ current: container }, true));
    flushRAF();

    (document.activeElement as HTMLElement).blur();
    const tab = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true });
    document.dispatchEvent(tab);

    expect(tab.defaultPrevented).toBe(true);
    expect(first).toHaveFocus();

    (document.activeElement as HTMLElement).blur();
    const back = new KeyboardEvent("keydown", {
      key: "Tab",
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(back);

    expect(last).toHaveFocus();
    container.remove();
  });

  it("does not treat a disabled element with a tabindex as focusable", () => {
    vi.useFakeTimers();
    const container = document.createElement("div");
    container.innerHTML =
      '<button disabled tabindex="0">off</button><div contenteditable="true" id="edit">edit</div>';
    document.body.appendChild(container);
    renderHook(() => useFocusTrap({ current: container }, true));
    flushRAF();

    expect(container.querySelector("#edit")).toHaveFocus();
    container.remove();
  });
});
