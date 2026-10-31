import { createRef, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VSettingTile } from "./v-setting-tile";

describe("VSettingTile", () => {
  it("renders the simple variant", () => {
    renderWithTheme(<VSettingTile title="Version" subtitle="1.0.0" />);
    expect(screen.getByText("Version")).toBeInTheDocument();
    expect(screen.getByText("1.0.0")).toBeInTheDocument();
  });

  it("navigation variant: shows the arrow and handles clicks", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VSettingTile title="Language" variant="navigation" onClick={onClick} />);
    await user.click(screen.getByText("Language"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("switch variant: toggles", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VSettingTile
        title="Dark Mode"
        variant="switch"
        checked={false}
        onCheckedChange={onCheckedChange}
      />,
    );
    await user.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("checkbox variant: checks", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VSettingTile
        title="Notifications"
        variant="checkbox"
        checked={false}
        onCheckedChange={onCheckedChange}
      />,
    );
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("is disabled", () => {
    const { container } = renderWithTheme(
      <VSettingTile title="Disabled" variant="navigation" disabled />,
    );
    const tile = container.querySelector(".v-setting-tile");
    expect(tile).toHaveAttribute("aria-disabled", "true");
  });

  it("renders the leading icon", () => {
    renderWithTheme(<VSettingTile title="T" leading={<span data-testid="icon">I</span>} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VSettingTile ref={ref} title="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VSettingTile title="T" className="custom" />);
    const tile = container.querySelector(".v-setting-tile");
    expect(tile?.className).toContain("custom");
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VSettingTile title="Off" variant="navigation" disabled onClick={onClick} />);
    await user.click(screen.getByText("Off"), { pointerEventsCheck: 0 });
    expect(onClick).not.toHaveBeenCalled();
  });

  it("calls onClick on Enter", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VSettingTile title="Key" variant="navigation" onClick={onClick} />);
    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("shows the selected state", () => {
    const { container } = renderWithTheme(<VSettingTile title="S" selected />);
    expect(container.querySelector(".v-setting-tile")).toHaveAttribute("data-v-selected", "true");
  });

  it("calls onCheckedChange once per checkbox click", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    renderWithTheme(
      <VSettingTile title="Notify" variant="checkbox" onCheckedChange={onCheckedChange} />,
    );
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("toggles a controlled checkbox tile exactly once per click", async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [on, setOn] = useState(false);
      return (
        <VSettingTile title="Notify" variant="checkbox" checked={on} onCheckedChange={setOn} />
      );
    }
    renderWithTheme(<Controlled />);
    await user.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("still toggles the checkbox when the row is clicked", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    renderWithTheme(
      <VSettingTile title="Notify" variant="checkbox" onCheckedChange={onCheckedChange} />,
    );
    await user.click(screen.getByText("Notify"));
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
  });

  it("does not put aria-checked on the row (role=button)", () => {
    renderWithTheme(<VSettingTile title="Dark" variant="switch" defaultChecked />);
    const row = document.querySelector(".v-setting-tile")!;
    expect(row).not.toHaveAttribute("aria-checked");
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it.each(["switch", "checkbox"] as const)(
    "%s variant: the row is not a button, so the control is not nested in one",
    (variant) => {
      renderWithTheme(<VSettingTile title="Alerts" variant={variant} />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      const row = document.querySelector(".v-setting-tile")!;
      expect(row).not.toHaveAttribute("role");
      expect(row).not.toHaveAttribute("tabindex");
    },
  );

  it.each([
    ["switch", "switch"],
    ["checkbox", "checkbox"],
  ] as const)(
    "%s variant: the control is named by the title and described by the subtitle",
    (variant, role) => {
      renderWithTheme(<VSettingTile title="Alerts" subtitle="Push messages" variant={variant} />);
      const control = screen.getByRole(role, { name: "Alerts" });
      expect(control).toHaveAccessibleDescription("Push messages");
    },
  );

  it.each(["switch", "checkbox"] as const)(
    "%s variant: has no accessibility violations",
    async (variant) => {
      const { container } = renderWithTheme(
        <VSettingTile title="Alerts" subtitle="Push messages" variant={variant} />,
      );
      await axeTest(container);
    },
  );

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VSettingTile title="Setting" subtitle="Desc" />);
    await axeTest(container);
  });
});
