import { describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useControllable } from "./use-controllable";

describe("useControllable", () => {
  // ── Controlled mode ──────────────────────────────

  it("controlled: returns the given value", () => {
    const { result } = renderHook(() =>
      useControllable({ value: "hello", defaultValue: "default" }),
    );
    expect(result.current[0]).toBe("hello");
  });

  it("controlled: setValue only calls onChange and leaves internal state unchanged", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllable({ value: "controlled", defaultValue: "default", onChange }),
    );

    act(() => {
      result.current[1]("new-value");
    });

    expect(onChange).toHaveBeenCalledWith("new-value");
    // Controlled, so the value stays the same unless the external value changes
    expect(result.current[0]).toBe("controlled");
  });

  // ── Uncontrolled mode ────────────────────────────

  it("uncontrolled: returns defaultValue when value is undefined", () => {
    const { result } = renderHook(() => useControllable({ defaultValue: "fallback" }));
    expect(result.current[0]).toBe("fallback");
  });

  it("uncontrolled: setValue updates internal state", () => {
    const { result } = renderHook(() => useControllable({ defaultValue: "initial" }));

    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("updated");
  });

  it("uncontrolled: setValue also calls onChange", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllable({ defaultValue: "initial", onChange }));

    act(() => {
      result.current[1]("updated");
    });

    expect(onChange).toHaveBeenCalledWith("updated");
    expect(result.current[0]).toBe("updated");
  });

  // ── Mode switch warning ──────────────────────────

  it("warns when switching from uncontrolled to controlled", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { rerender } = renderHook(
      ({ value }: { value?: string }) => useControllable({ value, defaultValue: "default" }),
      { initialProps: { value: undefined as string | undefined } },
    );

    rerender({ value: "now-controlled" });

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("uncontrolled and controlled"));

    warnSpy.mockRestore();
  });
});

describe("useControllable edge cases", () => {
  it("stores a function value as is instead of calling it", () => {
    const fn = () => "called";
    const other = () => "other";
    const { result } = renderHook(() => useControllable<() => string>({ defaultValue: fn }));
    expect(result.current[0]).toBe(fn);

    act(() => result.current[1](other));
    expect(result.current[0]).toBe(other);
  });

  it("warns once per switch between controlled and uncontrolled, not on every render", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { rerender } = renderHook(
      ({ value }: { value: string | undefined }) => useControllable({ value, defaultValue: "d" }),
      { initialProps: { value: undefined as string | undefined } },
    );

    rerender({ value: "controlled" });
    rerender({ value: "controlled" });
    rerender({ value: "controlled" });

    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });
});
