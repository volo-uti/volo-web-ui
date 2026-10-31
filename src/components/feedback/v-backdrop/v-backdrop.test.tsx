import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, userEvent, axeTest } from "../../../test-utils";
import { VBackdrop } from "./v-backdrop";

describe("VBackdrop", () => {
  it("does not render when open=false", () => {
    const { container } = renderWithTheme(<VBackdrop open={false} />);
    expect(container.querySelector(".v-backdrop")).not.toBeInTheDocument();
  });

  it("renders when open=true", () => {
    const { container } = renderWithTheme(<VBackdrop open={true} />);
    expect(container.querySelector(".v-backdrop")).toBeInTheDocument();
  });

  it("calls onClick", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    const { container } = renderWithTheme(<VBackdrop open={true} onClick={onClick} />);
    const backdrop = container.querySelector(".v-backdrop")!;
    await user.click(backdrop);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('sets aria-hidden="true"', () => {
    const { container } = renderWithTheme(<VBackdrop open={true} />);
    const backdrop = container.querySelector(".v-backdrop");
    expect(backdrop).toHaveAttribute("aria-hidden", "true");
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VBackdrop open={true} className="custom-backdrop" />);
    const backdrop = container.querySelector(".v-backdrop");
    expect(backdrop?.className).toContain("custom-backdrop");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VBackdrop ref={ref} open={true} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VBackdrop open={true} />);
    await axeTest(container);
  });
  it("applies color and opacity to style", () => {
    const { container } = renderWithTheme(<VBackdrop open color="#123456" opacity={0.7} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.opacity).toBe("0.7");
    expect(el.style.backgroundColor).not.toBe("");
  });
});
