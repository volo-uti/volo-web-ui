import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VTextField } from "./v-text-field";

describe("VTextField", () => {
  it("renders by default", () => {
    renderWithTheme(<VTextField label="Name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("associates the label with the input", () => {
    renderWithTheme(<VTextField label="Email" />);
    const input = screen.getByLabelText("Email");
    expect(input.tagName).toBe("INPUT");
  });

  it("applies the placeholder", () => {
    renderWithTheme(<VTextField label="Search" placeholder="Type here..." />);
    expect(screen.getByPlaceholderText("Type here...")).toBeInTheDocument();
  });

  it("passes only the value to onValueChange in controlled mode", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VTextField label="Name" value="" name="n" onValueChange={onValueChange} />);
    await user.type(screen.getByLabelText("Name"), "a");
    expect(onValueChange).toHaveBeenCalledWith("a");
    expect(onValueChange.mock.calls[0]).toHaveLength(1);
  });

  it("passes the native onChange event through", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VTextField label="Name" onChange={onChange} />);
    await user.type(screen.getByLabelText("Name"), "a");
    expect(onChange.mock.calls[0][0].target).toBe(screen.getByLabelText("Name"));
  });

  it('calls onValueChange("") from the clearable clear button', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VTextField label="Q" defaultValue="abc" clearable onValueChange={onValueChange} />,
    );
    await user.click(screen.getByRole("button"));
    expect(onValueChange).toHaveBeenCalledWith("");
    expect(screen.getByLabelText("Q")).toHaveValue("");
  });

  it("blocks input and hides the clear button when disabled", () => {
    renderWithTheme(<VTextField label="Q" defaultValue="abc" clearable disabled />);
    expect(screen.getByLabelText("Q")).toBeDisabled();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows the maxLength counter", () => {
    renderWithTheme(<VTextField label="Q" defaultValue="abc" maxLength={10} />);
    expect(screen.getByText("3/10")).toBeInTheDocument();
  });

  it("works in uncontrolled mode", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VTextField label="Name" defaultValue="" />);
    const input = screen.getByLabelText("Name");
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("sets aria-invalid in the error state", () => {
    renderWithTheme(<VTextField label="Email" error errorText="Invalid" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("shows errorText", () => {
    renderWithTheme(<VTextField label="Email" error errorText="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("shows the helper", () => {
    renderWithTheme(<VTextField label="Name" helper="Enter full name" />);
    expect(screen.getByText("Enter full name")).toBeInTheDocument();
  });

  it("applies the disabled state", () => {
    renderWithTheme(<VTextField label="Disabled" disabled />);
    expect(screen.getByLabelText("Disabled")).toBeDisabled();
  });

  it("renders leading", () => {
    renderWithTheme(<VTextField label="Price" leading={<span data-testid="prefix">$</span>} />);
    expect(screen.getByTestId("prefix")).toBeInTheDocument();
  });

  it("renders trailing", () => {
    renderWithTheme(<VTextField label="Search" trailing={<span data-testid="suffix">X</span>} />);
    expect(screen.getByTestId("suffix")).toBeInTheDocument();
  });

  it("applies the size prop", () => {
    const { container } = renderWithTheme(<VTextField label="Size" size="lg" />);
    expect(container.querySelector('[data-v-size="lg"]')).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLInputElement>();
    renderWithTheme(<VTextField ref={ref} label="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("passes maxLength as a native attribute and blocks extra input", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VTextField label="Q" maxLength={3} />);
    const el = screen.getByLabelText("Q");
    expect(el).toHaveAttribute("maxlength", "3");
    await user.type(el, "abcde");
    expect(el).toHaveValue("abc");
  });

  it("forwards required to the input", () => {
    renderWithTheme(<VTextField label="Name" required />);
    expect(screen.getByLabelText(/^Name/)).toBeRequired();
  });

  it("returns focus to the input after the clear button is pressed", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VTextField label="Q" clearable defaultValue="abc" />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByLabelText("Q")).toHaveValue("");
    expect(screen.getByLabelText("Q")).toHaveFocus();
  });

  it("reaches the clear button with the keyboard", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VTextField label="Q" clearable defaultValue="abc" />);
    screen.getByLabelText("Q").focus();
    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByLabelText("Q")).toHaveValue("");
    expect(screen.getByLabelText("Q")).toHaveFocus();
  });

  it("keeps forwarding the ref after the clear button is added", () => {
    const ref = createRef<HTMLInputElement>();
    renderWithTheme(<VTextField ref={ref} label="Q" clearable defaultValue="abc" />);
    expect(ref.current).toBe(screen.getByLabelText("Q"));
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VTextField label="Accessible" />);
    await axeTest(container);
  });
});
