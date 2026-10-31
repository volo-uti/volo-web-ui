import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VTextArea } from "./v-text-area";

describe("VTextArea", () => {
  it("renders a textarea", () => {
    renderWithTheme(<VTextArea label="Description" />);
    const textarea = screen.getByLabelText("Description");
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("associates the label with the textarea", () => {
    renderWithTheme(<VTextArea label="Notes" />);
    expect(screen.getByLabelText("Notes")).toBeInTheDocument();
  });

  it("applies the rows prop", () => {
    renderWithTheme(<VTextArea label="Text" rows={5} />);
    const textarea = screen.getByLabelText("Text");
    expect(textarea).toHaveAttribute("rows", "5");
  });

  it("works in uncontrolled mode", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VTextArea label="Text" defaultValue="" />);
    const textarea = screen.getByLabelText("Text");
    await user.type(textarea, "hello");
    expect(textarea).toHaveValue("hello");
  });

  it("works in controlled mode", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VTextArea label="Text" value="" onValueChange={onValueChange} />);
    await user.type(screen.getByLabelText("Text"), "a");
    expect(onValueChange).toHaveBeenCalledWith("a");
  });

  it("passes the native onChange event through", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VTextArea label="Text" onChange={onChange} />);
    await user.type(screen.getByLabelText("Text"), "a");
    expect(onChange.mock.calls[0][0].target).toBe(screen.getByLabelText("Text"));
  });

  it("shows the counter by default when maxLength is set", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VTextArea label="Text" maxLength={10} />);
    expect(screen.getByText("0/10")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Text"), "abc");
    expect(screen.getByText("3/10")).toBeInTheDocument();
  });

  it("hides the counter when showCounter={false}", () => {
    renderWithTheme(<VTextArea label="Text" maxLength={10} showCounter={false} />);
    expect(screen.queryByText("0/10")).not.toBeInTheDocument();
  });

  it("sets aria-invalid in the error state", () => {
    renderWithTheme(<VTextArea label="Text" error errorText="Too short" />);
    expect(screen.getByLabelText("Text")).toHaveAttribute("aria-invalid", "true");
  });

  it("applies the disabled state", () => {
    renderWithTheme(<VTextArea label="Text" disabled />);
    expect(screen.getByLabelText("Text")).toBeDisabled();
  });

  it("applies the placeholder", () => {
    renderWithTheme(<VTextArea label="Text" placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLTextAreaElement>();
    renderWithTheme(<VTextArea ref={ref} label="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("passes maxLength as a native attribute and blocks extra input", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VTextArea label="Q" maxLength={3} />);
    const el = screen.getByLabelText("Q");
    expect(el).toHaveAttribute("maxlength", "3");
    await user.type(el, "abcde");
    expect(el).toHaveValue("abc");
  });

  it("forwards required to the textarea", () => {
    renderWithTheme(<VTextArea label="Bio" required />);
    expect(screen.getByLabelText(/^Bio/)).toBeRequired();
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VTextArea label="Accessible" />);
    await axeTest(container);
  });
});
