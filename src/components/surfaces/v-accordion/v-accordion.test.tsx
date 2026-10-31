import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VAccordion, VAccordionItem, VAccordionTrigger, VAccordionContent } from "./v-accordion";

describe("VAccordion", () => {
  const renderAccordion = (props = {}) =>
    renderWithTheme(
      <VAccordion {...props}>
        <VAccordionItem value="item-1">
          <VAccordionTrigger>Section 1</VAccordionTrigger>
          <VAccordionContent>Content 1</VAccordionContent>
        </VAccordionItem>
        <VAccordionItem value="item-2">
          <VAccordionTrigger>Section 2</VAccordionTrigger>
          <VAccordionContent>Content 2</VAccordionContent>
        </VAccordionItem>
      </VAccordion>,
    );

  it("renders the trigger", () => {
    renderAccordion();
    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Section 2")).toBeInTheDocument();
  });

  it("expands the content when the trigger is clicked", async () => {
    const user = userEvent.setup();
    renderAccordion();
    const trigger = screen.getByText("Section 1");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("single mode: opens only one item", async () => {
    const user = userEvent.setup();
    renderAccordion({ type: "single" });
    await user.click(screen.getByText("Section 1"));
    expect(screen.getByText("Section 1")).toHaveAttribute("aria-expanded", "true");
    await user.click(screen.getByText("Section 2"));
    expect(screen.getByText("Section 1")).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Section 2")).toHaveAttribute("aria-expanded", "true");
  });

  it("multiple mode: opens several items", async () => {
    const user = userEvent.setup();
    renderAccordion({ type: "multiple" });
    await user.click(screen.getByText("Section 1"));
    await user.click(screen.getByText("Section 2"));
    expect(screen.getByText("Section 1")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Section 2")).toHaveAttribute("aria-expanded", "true");
  });

  it("expands initially from defaultValue", () => {
    renderAccordion({ defaultValue: "item-1" });
    expect(screen.getByText("Section 1")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Section 2")).toHaveAttribute("aria-expanded", "false");
  });

  it("applies data-v-type", () => {
    const { container } = renderAccordion({ type: "multiple" });
    expect(container.querySelector('[data-v-type="multiple"]')).toBeInTheDocument();
  });

  it("switches data-v-state between open and closed", async () => {
    const user = userEvent.setup();
    const { container } = renderAccordion();
    const items = container.querySelectorAll(".v-accordion-item");
    expect(items[0]).toHaveAttribute("data-v-state", "closed");
    await user.click(screen.getByText("Section 1"));
    expect(items[0]).toHaveAttribute("data-v-state", "open");
  });

  it("disables the trigger of a disabled item", () => {
    renderWithTheme(
      <VAccordion>
        <VAccordionItem value="item-1" disabled>
          <VAccordionTrigger>Disabled</VAccordionTrigger>
          <VAccordionContent>Content</VAccordionContent>
        </VAccordionItem>
      </VAccordion>,
    );
    const trigger = screen.getByText("Disabled");
    expect(trigger).toBeDisabled();
  });

  it("calls onValueChange with an array of expanded item values", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderAccordion({ type: "multiple", onValueChange });
    await user.click(screen.getByText("Section 1"));
    expect(onValueChange).toHaveBeenLastCalledWith(["item-1"]);
    await user.click(screen.getByText("Section 2"));
    expect(onValueChange).toHaveBeenLastCalledWith(["item-1", "item-2"]);
    await user.click(screen.getByText("Section 1"));
    expect(onValueChange).toHaveBeenLastCalledWith(["item-2"]);
  });

  it("controlled mode: stays expanded until value changes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderAccordion({ value: "item-1", onValueChange });
    await user.click(screen.getByText("Section 2"));
    expect(onValueChange).toHaveBeenCalledWith(["item-2"]);
    expect(screen.getByText("Section 1")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Section 2")).toHaveAttribute("aria-expanded", "false");
  });

  it("moves focus between triggers with ArrowDown / ArrowUp", async () => {
    const user = userEvent.setup();
    renderAccordion();
    screen.getByText("Section 1").focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByText("Section 2")).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(screen.getByText("Section 1")).toHaveFocus();
  });

  it("expands an item on Enter", async () => {
    const user = userEvent.setup();
    renderAccordion();
    screen.getByText("Section 1").focus();
    await user.keyboard("{Enter}");
    expect(screen.getByText("Section 1")).toHaveAttribute("aria-expanded", "true");
  });

  it("does not expand a disabled item on click and does not call onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithTheme(
      <VAccordion onValueChange={onValueChange}>
        <VAccordionItem value="item-1" disabled>
          <VAccordionTrigger>Disabled</VAccordionTrigger>
          <VAccordionContent>Content</VAccordionContent>
        </VAccordionItem>
      </VAccordion>,
    );
    await user.click(screen.getByText("Disabled"));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByText("Disabled")).toHaveAttribute("aria-expanded", "false");
  });

  it("calls the trigger onClick and passes native attributes through", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <VAccordion data-testid="root">
        <VAccordionItem value="a">
          <VAccordionTrigger onClick={onClick}>T</VAccordionTrigger>
          <VAccordionContent>C</VAccordionContent>
        </VAccordionItem>
      </VAccordion>,
    );
    await user.click(screen.getByText("T"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("root")).toBeInTheDocument();
    expect(screen.getByText("T")).toHaveAttribute("aria-expanded", "true");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <VAccordion ref={ref}>
        <VAccordionItem value="item-1">
          <VAccordionTrigger>T</VAccordionTrigger>
          <VAccordionContent>C</VAccordionContent>
        </VAccordionItem>
      </VAccordion>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("a11y: region role and aria-hidden", async () => {
    const { container } = renderAccordion({ defaultValue: "item-1" });
    const regions = container.querySelectorAll('[role="region"]');
    expect(regions[0]).toHaveAttribute("aria-hidden", "false");
    expect(regions[1]).toHaveAttribute("aria-hidden", "true");
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderAccordion({ defaultValue: "item-1" });
    await axeTest(container);
  });
});

describe("VAccordion regressions", () => {
  const renderRich = (props = {}) =>
    renderWithTheme(
      <VAccordion type="multiple" {...props}>
        {["a", "b", "c"].map((v) => (
          <VAccordionItem key={v} value={v}>
            <VAccordionTrigger>T{v}</VAccordionTrigger>
            <VAccordionContent>
              <button type="button">inner-{v}</button>
              <textarea aria-label={`area-${v}`} />
            </VAccordionContent>
          </VAccordionItem>
        ))}
      </VAccordion>,
    );

  it("keeps arrow navigation when the user passes onKeyDown", async () => {
    const user = userEvent.setup();
    const onKeyDown = vi.fn();
    renderRich({ onKeyDown });
    screen.getByText("Ta").focus();
    await user.keyboard("{ArrowDown}");
    expect(onKeyDown).toHaveBeenCalled();
    expect(screen.getByText("Tb").closest("button")).toHaveFocus();
  });

  it("does not prevent caret keys typed inside a panel", async () => {
    renderRich({ defaultValue: ["a"] });
    const area = screen.getByLabelText("area-a");
    area.focus();
    for (const key of ["Home", "End", "ArrowUp", "ArrowDown"]) {
      const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
      area.dispatchEvent(event);
      expect(event.defaultPrevented, key).toBe(false);
    }
    expect(area).toHaveFocus();
  });

  it("makes collapsed content inert so its controls leave the tab order", async () => {
    const user = userEvent.setup();
    renderRich();
    const region = screen.getByText("inner-a").closest("[role=region]");
    expect(region).toHaveAttribute("inert");

    await user.click(screen.getByText("Ta"));
    expect(region).not.toHaveAttribute("inert");

    await user.click(screen.getByText("Ta"));
    expect(region).toHaveAttribute("inert");
  });
});
