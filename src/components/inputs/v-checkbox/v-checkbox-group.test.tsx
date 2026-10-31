import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VCheckboxGroup } from "./v-checkbox-group";

const options = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS", disabled: true },
  { value: "push", label: "Push" },
];

describe("VCheckboxGroup", () => {
  it("renders a checkbox for each option", () => {
    renderWithTheme(<VCheckboxGroup options={options} />);
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("calls onValueChange with the list of selected values", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VCheckboxGroup options={options} onValueChange={onValueChange} />);
    await user.click(screen.getByLabelText("Email"));
    expect(onValueChange).toHaveBeenLastCalledWith(["email"]);
    await user.click(screen.getByLabelText("Push"));
    expect(onValueChange).toHaveBeenLastCalledWith(["email", "push"]);
    await user.click(screen.getByLabelText("Email"));
    expect(onValueChange).toHaveBeenLastCalledWith(["push"]);
  });

  it("follows value in controlled mode", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VCheckboxGroup options={options} value={["push"]} onValueChange={onValueChange} />,
    );
    expect(screen.getByLabelText("Push")).toBeChecked();
    await user.click(screen.getByLabelText("Email"));
    expect(onValueChange).toHaveBeenCalledWith(["push", "email"]);
    expect(screen.getByLabelText("Email")).not.toBeChecked();
  });

  it("starts from defaultValue", () => {
    renderWithTheme(<VCheckboxGroup options={options} defaultValue={["email"]} />);
    expect(screen.getByLabelText("Email")).toBeChecked();
  });

  it("applies disabled per option", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VCheckboxGroup options={options} onValueChange={onValueChange} />);
    expect(screen.getByLabelText("SMS")).toBeDisabled();
    await user.click(screen.getByLabelText("SMS"));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("applies group disabled to all options", () => {
    renderWithTheme(<VCheckboxGroup options={options} disabled />);
    screen.getAllByRole("checkbox").forEach((c) => expect(c).toBeDisabled());
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VCheckboxGroup ref={ref} options={options} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VCheckboxGroup options={options} />);
    await axeTest(container);
  });
});
