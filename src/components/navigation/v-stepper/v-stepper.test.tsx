import { createRef } from "react";
import { VoloProvider } from "../../../provider";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, axeTest, userEvent } from "../../../test-utils";
import { VStepper } from "./v-stepper";

const steps = [{ label: "Account" }, { label: "Profile" }, { label: "Review" }];

describe("VStepper", () => {
  it('renders with role="list"', () => {
    renderWithTheme(<VStepper steps={steps} value={0} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("shows all step labels", () => {
    renderWithTheme(<VStepper steps={steps} value={0} />);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });

  it('sets aria-current="step" on the step at value', () => {
    renderWithTheme(<VStepper steps={steps} value={1} />);
    const items = screen.getAllByRole("listitem");
    expect(items[1]).toHaveAttribute("aria-current", "step");
  });

  it("shows a check icon on completed steps", () => {
    const { container } = renderWithTheme(<VStepper steps={steps} value={2} />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });

  it("applies orientation", () => {
    const { container } = renderWithTheme(
      <VStepper steps={steps} value={0} orientation="vertical" />,
    );
    expect(container.querySelector('[data-v-orientation="vertical"]')).toBeInTheDocument();
  });

  it("shows the step description", () => {
    const stepsWithDesc = [{ label: "Step 1", description: "Description 1" }, { label: "Step 2" }];
    renderWithTheme(<VStepper steps={stepsWithDesc} value={0} />);
    expect(screen.getByText("Description 1")).toBeInTheDocument();
  });

  it("shows the error state", () => {
    const stepsWithError = [{ label: "Step 1" }, { label: "Step 2", error: true }];
    const { container } = renderWithTheme(<VStepper steps={stepsWithError} value={1} />);
    // The error step has an X icon
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });

  it("shows an optional step", () => {
    const stepsWithOptional = [{ label: "Step 1" }, { label: "Step 2", optional: true }];
    renderWithTheme(<VStepper steps={stepsWithOptional} value={0} />);
    expect(screen.getByText("(Optional)")).toBeInTheDocument();
  });

  it("renders steps as buttons only when onValueChange is set", () => {
    const { unmount } = renderWithTheme(<VStepper steps={steps} value={0} />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
    unmount();
    renderWithTheme(<VStepper steps={steps} value={0} onValueChange={() => {}} />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("calls onValueChange with the pressed step index", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VStepper steps={steps} value={0} onValueChange={onValueChange} />);
    await user.click(screen.getByText("Profile"));
    expect(onValueChange).toHaveBeenCalledWith(1);
    screen.getByRole("button", { name: /Review/ }).focus();
    await user.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenCalledWith(2);
  });

  it("starts from defaultValue and changes on press in uncontrolled mode", async () => {
    const user = userEvent.setup();
    renderWithTheme(<VStepper steps={steps} defaultValue={1} onValueChange={() => {}} />);
    const items = screen.getAllByRole("listitem");
    expect(items[1]).toHaveAttribute("aria-current", "step");
    await user.click(screen.getByText("Review"));
    expect(screen.getAllByRole("listitem")[2]).toHaveAttribute("aria-current", "step");
  });

  it("does not call the callback when a disabled step is pressed", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VStepper
        steps={[{ label: "A" }, { label: "B", disabled: true }]}
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByText("B"));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(
      <VStepper steps={steps} value={0} className="my-stepper" />,
    );
    expect(container.firstElementChild?.className).toContain("my-stepper");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VStepper ref={ref} steps={steps} value={0} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VStepper steps={steps} value={1} />);
    await axeTest(container);
  });
});

const custom = { stepperOptional: "(opt.)" };

describe("VStepper locale text", () => {
  it("takes the optional marker from the locale text", () => {
    renderWithTheme(
      <VoloProvider locale="fr" localeText={custom}>
        <VStepper steps={[{ label: "One" }, { label: "Two", optional: true }]} value={0} />
      </VoloProvider>,
    );
    expect(screen.getByText(custom.stepperOptional)).toBeInTheDocument();
    expect(screen.queryByText("(Optional)")).not.toBeInTheDocument();
  });
});
