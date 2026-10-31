import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSnackbarQueue } from "./use-snackbar-queue";

describe("useSnackbarQueue", () => {
  it("starts with current set to null", () => {
    const { result } = renderHook(() => useSnackbarQueue());
    expect(result.current.current).toBeNull();
  });

  it("shows a snackbar immediately when added with show()", () => {
    const { result } = renderHook(() => useSnackbarQueue());

    act(() => {
      result.current.show({ content: "Hello" });
    });

    expect(result.current.current).not.toBeNull();
    expect(result.current.current?.content).toBe("Hello");
  });

  it("generates a key when show() gets none", () => {
    const { result } = renderHook(() => useSnackbarQueue());

    act(() => {
      result.current.show({ content: "Auto key" });
    });

    expect(result.current.current?.key).toMatch(/^snackbar-\d+$/);
  });

  it("uses the key given to show()", () => {
    const { result } = renderHook(() => useSnackbarQueue());

    act(() => {
      result.current.show({ content: "Custom key", key: "my-key" });
    });

    expect(result.current.current?.key).toBe("my-key");
  });

  it("queues a show() call while one is already showing", () => {
    const { result } = renderHook(() => useSnackbarQueue());

    act(() => {
      result.current.show({ content: "First" });
    });

    act(() => {
      result.current.show({ content: "Second" });
    });

    // The first one is still current
    expect(result.current.current?.content).toBe("First");
  });

  it("shows the next snackbar after dismiss() removes the current one", () => {
    const { result } = renderHook(() => useSnackbarQueue());

    act(() => {
      result.current.show({ content: "First" });
    });

    act(() => {
      result.current.show({ content: "Second" });
    });

    act(() => {
      result.current.dismiss();
    });

    expect(result.current.current?.content).toBe("Second");
  });

  it("sets current to null when dismiss() is called with an empty queue", () => {
    const { result } = renderHook(() => useSnackbarQueue());

    act(() => {
      result.current.show({ content: "Only one" });
    });

    act(() => {
      result.current.dismiss();
    });

    expect(result.current.current).toBeNull();
  });

  it("removes the queue and the current snackbar with clear()", () => {
    const { result } = renderHook(() => useSnackbarQueue());

    act(() => {
      result.current.show({ content: "First" });
    });

    act(() => {
      result.current.show({ content: "Second" });
    });

    act(() => {
      result.current.show({ content: "Third" });
    });

    act(() => {
      result.current.clear();
    });

    expect(result.current.current).toBeNull();
  });

  it("keeps the variant", () => {
    const { result } = renderHook(() => useSnackbarQueue());

    act(() => {
      result.current.show({ content: "Error!", variant: "error" });
    });

    expect(result.current.current?.variant).toBe("error");
  });

  it("handles several snackbars in sequence", () => {
    const { result } = renderHook(() => useSnackbarQueue());

    // show() captures current in a closure, so each call gets its own act()
    act(() => {
      result.current.show({ content: "A" });
    });
    act(() => {
      result.current.show({ content: "B" });
    });
    act(() => {
      result.current.show({ content: "C" });
    });

    expect(result.current.current?.content).toBe("A");

    act(() => result.current.dismiss());
    expect(result.current.current?.content).toBe("B");

    act(() => result.current.dismiss());
    expect(result.current.current?.content).toBe("C");

    act(() => result.current.dismiss());
    expect(result.current.current).toBeNull();
  });
});

describe("useSnackbarQueue in one tick", () => {
  it("shows the first of two snackbars added in the same handler and queues the second", () => {
    const { result } = renderHook(() => useSnackbarQueue());

    act(() => {
      result.current.show({ content: "A" });
      result.current.show({ content: "B" });
    });

    expect(result.current.current?.content).toBe("A");

    act(() => result.current.dismiss());
    expect(result.current.current?.content).toBe("B");

    act(() => result.current.dismiss());
    expect(result.current.current).toBeNull();
  });

  it("shows a snackbar added right after dismiss in the same handler", () => {
    const { result } = renderHook(() => useSnackbarQueue());
    act(() => result.current.show({ content: "A" }));

    act(() => {
      result.current.dismiss();
      result.current.show({ content: "X" });
    });

    expect(result.current.current?.content).toBe("X");
  });

  it("keeps the identity of show across renders", () => {
    const { result } = renderHook(() => useSnackbarQueue());
    const first = result.current.show;

    act(() => first({ content: "A" }));
    act(() => result.current.dismiss());

    expect(result.current.show).toBe(first);
  });

  it("starts fresh after clear", () => {
    const { result } = renderHook(() => useSnackbarQueue());
    act(() => {
      result.current.show({ content: "A" });
      result.current.show({ content: "B" });
    });

    act(() => result.current.clear());
    act(() => result.current.show({ content: "C" }));

    expect(result.current.current?.content).toBe("C");
  });
});
