import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VListTile } from "./v-list-tile";

describe("VListTile", () => {
  it("renders (title)", () => {
    renderWithTheme(<VListTile title="Item Title" />);
    expect(screen.getByText("Item Title")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    renderWithTheme(<VListTile title="Title" subtitle="Subtitle" />);
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
  });

  it("renders leading and trailing", () => {
    renderWithTheme(
      <VListTile
        title="Title"
        leading={<span data-testid="lead">L</span>}
        trailing={<span data-testid="trail">T</span>}
      />,
    );
    expect(screen.getByTestId("lead")).toBeInTheDocument();
    expect(screen.getByTestId("trail")).toBeInTheDocument();
  });

  it("supports dense mode", () => {
    const { container } = renderWithTheme(<VListTile title="Dense" dense />);
    const tile = container.querySelector(".v-list-tile");
    expect(tile).toHaveAttribute("data-v-dense", "true");
  });

  it("is disabled", () => {
    const { container } = renderWithTheme(<VListTile title="Disabled" disabled />);
    const tile = container.querySelector(".v-list-tile");
    expect(tile).toHaveAttribute("aria-disabled", "true");
  });

  it("is selected", () => {
    const { container } = renderWithTheme(<VListTile title="Selected" selected />);
    const tile = container.querySelector(".v-list-tile");
    expect(tile).toHaveAttribute("data-v-selected", "true");
  });

  it("calls onClick", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VListTile title="Click" onClick={onClick} />);
    await user.click(screen.getByText("Click"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VListTile title="T" className="custom" />);
    const tile = container.querySelector(".v-list-tile");
    expect(tile?.className).toContain("custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VListTile ref={ref} title="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VListTile title="Off" disabled onClick={onClick} />);
    await user.click(screen.getByText("Off"), { pointerEventsCheck: 0 });
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies tileColor and selectedTileColor as the background", () => {
    const { container, rerender } = renderWithTheme(<VListTile title="C" tileColor="red" />);
    const tile = container.querySelector(".v-list-tile") as HTMLElement;
    expect(tile.style.backgroundColor).toBe("red");
    rerender(<VListTile title="C" tileColor="red" selected selectedTileColor="blue" />);
    expect(tile.style.backgroundColor).toBe("blue");
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VListTile title="Item" subtitle="Sub" />);
    await axeTest(container);
  });
});

describe("VListTile keyboard support", () => {
  it("is reachable with Tab and activates with Enter and Space when it has onClick", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(<VListTile title="Inbox" onClick={onClick} />);
    const tile = screen.getByRole("button");
    expect(tile).toHaveAttribute("tabindex", "0");

    await user.tab();
    expect(tile).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("does not activate a disabled tile from the keyboard", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(<VListTile title="Inbox" onClick={onClick} disabled />);
    const tile = screen.getByRole("button");
    expect(tile).toHaveAttribute("tabindex", "-1");
    tile.focus();
    await user.keyboard("{Enter}");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("adds no tab stop to a plain tile or a native button tile", () => {
    renderWithTheme(
      <>
        <VListTile title="Plain" />
        <VListTile title="Native" as="button" />
      </>,
    );
    expect(screen.getByText("Plain").closest(".v-list-tile")).not.toHaveAttribute("tabindex");
    expect(screen.getByRole("button")).not.toHaveAttribute("tabindex");
  });

  it("runs a user onKeyDown and keeps Enter activation", async () => {
    const user = userEvent.setup();
    const onKeyDown = vi.fn();
    const onClick = vi.fn();
    renderWithTheme(<VListTile title="Inbox" onClick={onClick} onKeyDown={onKeyDown} />);
    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    expect(onKeyDown).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("marks the selected tile with aria-current instead of aria-selected", () => {
    renderWithTheme(<VListTile title="Inbox" selected onClick={() => {}} />);
    const tile = screen.getByRole("button");
    expect(tile).toHaveAttribute("aria-current", "true");
    expect(tile).not.toHaveAttribute("aria-selected");
  });
});
