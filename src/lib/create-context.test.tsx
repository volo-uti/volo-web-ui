import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createSafeContext } from "./create-context";

describe("createSafeContext", () => {
  it("returns the value inside a Provider", () => {
    const [Provider, useValue] = createSafeContext<string>("Demo");
    function Show() {
      return <span>{useValue()}</span>;
    }
    render(
      <Provider value="hello">
        <Show />
      </Provider>,
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("throws outside a Provider when there is no default", () => {
    const [, useValue] = createSafeContext<string>("Demo");
    function Show() {
      return <span>{useValue()}</span>;
    }
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Show />)).toThrow("useDemo must be used within a DemoProvider");
    spy.mockRestore();
  });

  it("returns the default outside a Provider when one is set", () => {
    const [, useValue] = createSafeContext<string>("Demo", "fallback");
    function Show() {
      return <span>{useValue()}</span>;
    }
    render(<Show />);
    expect(screen.getByText("fallback")).toBeInTheDocument();
  });

  it("sets the Context displayName from the name", () => {
    const [, , Context] = createSafeContext<string>("Demo");
    expect(Context.displayName).toBe("DemoContext");
  });
});
