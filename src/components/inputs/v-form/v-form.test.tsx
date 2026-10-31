import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VForm } from "./v-form";

describe("VForm", () => {
  it("renders a form tag", () => {
    renderWithTheme(<VForm>Content</VForm>);
    expect(screen.getByText("Content").closest("form")).toBeInTheDocument();
  });

  it("renders children", () => {
    renderWithTheme(
      <VForm>
        <input data-testid="field" />
        <button type="submit">Submit</button>
      </VForm>,
    );
    expect(screen.getByTestId("field")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("calls onSubmit (preventDefault)", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VForm onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </VForm>,
    );
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    const event = onSubmit.mock.calls[0][0];
    expect(event.defaultPrevented).toBe(true);
  });

  it("applies spacing as gap without leaking it to DOM attributes", () => {
    renderWithTheme(<VForm spacing={8}>Form</VForm>);
    const form = screen.getByText("Form").closest("form")!;
    expect(form.style.gap).toBe("8px");
    expect(form).not.toHaveAttribute("spacing");
  });

  it("passes the native onChange event through", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VForm onChange={onChange}>
        <input aria-label="f" />
      </VForm>,
    );
    await user.type(screen.getByLabelText("f"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("merges className", () => {
    renderWithTheme(<VForm className="custom-form">Form</VForm>);
    expect(screen.getByText("Form").closest("form")?.className).toContain("custom-form");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLFormElement>();
    renderWithTheme(<VForm ref={ref}>Form</VForm>);
    expect(ref.current).toBeInstanceOf(HTMLFormElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(
      <VForm>
        <label htmlFor="name">Name</label>
        <input id="name" />
        <button type="submit">Submit</button>
      </VForm>,
    );
    await axeTest(container);
  });
});
