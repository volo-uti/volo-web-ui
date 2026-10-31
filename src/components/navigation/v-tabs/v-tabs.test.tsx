import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VTabs, VTabsList, VTabsTrigger, VTabsContent } from "./v-tabs";

describe("VTabs", () => {
  const renderTabs = (props = {}) =>
    renderWithTheme(
      <VTabs defaultValue="tab1" {...props}>
        <VTabsList>
          <VTabsTrigger value="tab1">Tab 1</VTabsTrigger>
          <VTabsTrigger value="tab2">Tab 2</VTabsTrigger>
          <VTabsTrigger value="tab3" disabled>
            Tab 3
          </VTabsTrigger>
        </VTabsList>
        <VTabsContent value="tab1">Content 1</VTabsContent>
        <VTabsContent value="tab2">Content 2</VTabsContent>
        <VTabsContent value="tab3">Content 3</VTabsContent>
      </VTabs>,
    );

  it("renders with tablist/tab/tabpanel roles", () => {
    renderTabs();
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getByRole("tabpanel")).toBeInTheDocument();
  });

  it("picks the active tab from defaultValue", () => {
    renderTabs();
    expect(screen.getByText("Tab 1")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Tab 2")).toHaveAttribute("aria-selected", "false");
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
  });

  it("changes the content when a tab is clicked", async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByText("Tab 2"));
    expect(screen.getByText("Tab 2")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Content 2")).toBeInTheDocument();
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  });

  it("calls onValueChange", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    renderTabs({ onValueChange });
    await user.click(screen.getByText("Tab 2"));
    expect(onValueChange).toHaveBeenCalledWith("tab2");
  });

  it("ignores clicks on a disabled tab", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderTabs({ onValueChange });
    const disabledTab = screen.getByText("Tab 3");
    expect(disabledTab).toBeDisabled();
    expect(disabledTab).toHaveAttribute("aria-disabled", "true");
    await user.click(disabledTab);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("sets data-v-state to active/inactive", () => {
    renderTabs();
    expect(screen.getByText("Tab 1")).toHaveAttribute("data-v-state", "active");
    expect(screen.getByText("Tab 2")).toHaveAttribute("data-v-state", "inactive");
  });

  it("applies orientation", () => {
    renderTabs({ orientation: "vertical" });
    expect(screen.getByRole("tablist")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("applies data-v-orientation", () => {
    const { container } = renderTabs({ orientation: "vertical" });
    expect(container.querySelector('[data-v-orientation="vertical"]')).toBeInTheDocument();
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderTabs();
    await axeTest(container);
  });

  it("moves between tabs with ArrowRight/ArrowLeft and skips disabled tabs", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderTabs({ onValueChange });
    screen.getByRole("tab", { name: "Tab 1" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
    expect(onValueChange).toHaveBeenLastCalledWith("tab2");
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
  });

  it("goes to the first and last tabs with Home/End", async () => {
    const user = userEvent.setup();
    renderTabs();
    screen.getByRole("tab", { name: "Tab 1" }).focus();
    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
    await user.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
  });

  it("moves with ArrowDown in vertical", async () => {
    const user = userEvent.setup();
    renderTabs({ orientation: "vertical" });
    screen.getByRole("tab", { name: "Tab 1" }).focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
  });

  it("is controlled by value and does not change on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderTabs({ value: "tab1", onValueChange });
    await user.click(screen.getByRole("tab", { name: "Tab 2" }));
    expect(onValueChange).toHaveBeenCalledWith("tab2");
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("forwards native props and onClick", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <VTabs defaultValue="a" data-testid="root">
        <VTabsList aria-label="sections">
          <VTabsTrigger value="a">A</VTabsTrigger>
          <VTabsTrigger value="b" onClick={onClick}>
            B
          </VTabsTrigger>
        </VTabsList>
      </VTabs>,
    );
    expect(screen.getByTestId("root")).toBeInTheDocument();
    expect(screen.getByRole("tablist", { name: "sections" })).toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "B" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("tab", { name: "B" })).toHaveAttribute("aria-selected", "true");
  });

  it("does not change tabs after preventDefault in the trigger onClick", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithTheme(
      <VTabs defaultValue="a" onValueChange={onValueChange}>
        <VTabsList>
          <VTabsTrigger value="a">A</VTabsTrigger>
          <VTabsTrigger value="b" onClick={(e) => e.preventDefault()}>
            B
          </VTabsTrigger>
        </VTabsList>
      </VTabs>,
    );
    await user.click(screen.getByRole("tab", { name: "B" }));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole("tab", { name: "A" })).toHaveAttribute("aria-selected", "true");
  });
});

describe("VTabs tab stop and ids", () => {
  it("makes the first enabled tab reachable when no value is set", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VTabs>
        <VTabsList>
          <VTabsTrigger value="a">A</VTabsTrigger>
          <VTabsTrigger value="b">B</VTabsTrigger>
        </VTabsList>
        <VTabsContent value="a">pa</VTabsContent>
      </VTabs>,
    );
    expect(screen.getByRole("tab", { name: "A" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("tab", { name: "B" })).toHaveAttribute("tabindex", "-1");
    await user.tab();
    expect(screen.getByRole("tab", { name: "A" })).toHaveFocus();
  });

  it("falls back to the first enabled tab when the value matches no tab", () => {
    renderWithTheme(
      <VTabs defaultValue="missing">
        <VTabsList>
          <VTabsTrigger value="a" disabled>
            A
          </VTabsTrigger>
          <VTabsTrigger value="b">B</VTabsTrigger>
        </VTabsList>
      </VTabs>,
    );
    expect(screen.getByRole("tab", { name: "B" })).toHaveAttribute("tabindex", "0");
  });

  it("keeps the active tab as the only tab stop when it is enabled", () => {
    renderWithTheme(
      <VTabs defaultValue="b">
        <VTabsList>
          <VTabsTrigger value="a">A</VTabsTrigger>
          <VTabsTrigger value="b">B</VTabsTrigger>
        </VTabsList>
      </VTabs>,
    );
    expect(screen.getByRole("tab", { name: "A" })).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("tab", { name: "B" })).toHaveAttribute("tabindex", "0");
  });

  it("gives a panel an accessible name when the tab value contains spaces", () => {
    renderWithTheme(
      <VTabs defaultValue="my tab">
        <VTabsList>
          <VTabsTrigger value="my tab">Settings</VTabsTrigger>
        </VTabsList>
        <VTabsContent value="my tab">panel</VTabsContent>
      </VTabs>,
    );
    expect(screen.getByRole("tabpanel", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Settings" }).id).not.toMatch(/\s/);
  });
});
