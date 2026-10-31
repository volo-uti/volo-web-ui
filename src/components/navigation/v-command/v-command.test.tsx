import { createRef, useState } from "react";
import { fireEvent } from "@testing-library/react";
import { VoloProvider } from "../../../provider";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { VCommand } from "./v-command";

const setup = () => {
  const onNew = vi.fn();
  const onOpen = vi.fn();
  const onOff = vi.fn();
  const groups = [
    {
      heading: "File",
      items: [
        { label: "New file", onClick: onNew },
        { label: "Open file", onClick: onOpen },
        { label: "Hidden", disabled: true, onClick: onOff },
      ],
    },
  ];
  return { groups, onNew, onOpen, onOff };
};

describe("VCommand", () => {
  it("renders by default", () => {
    renderWithTheme(<VCommand>content</VCommand>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("merges className", () => {
    const { container } = renderWithTheme(<VCommand className="custom">content</VCommand>);
    expect(container.firstChild).toHaveClass("v-command", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VCommand ref={ref}>content</VCommand>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("calls onClick and onOpenChange(false) when an item is clicked", async () => {
    const { groups, onNew } = setup();
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VCommand groups={groups} onOpenChange={onOpenChange} />);
    await user.click(screen.getByText("New file"));
    expect(onNew).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes on select in uncontrolled mode", async () => {
    const { groups } = setup();
    const user = userEvent.setup();
    const { container } = renderWithTheme(<VCommand groups={groups} />);
    await user.click(screen.getByText("New file"));
    expect(container.querySelector(".v-command")).toBeNull();
  });

  it("does not render when open=false", () => {
    const { groups } = setup();
    const { container } = renderWithTheme(<VCommand groups={groups} open={false} />);
    expect(container.querySelector(".v-command")).toBeNull();
  });

  it("selects with arrow keys and Enter", async () => {
    const { groups, onNew, onOpen } = setup();
    const user = userEvent.setup();
    renderWithTheme(<VCommand groups={groups} open />);
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onNew).not.toHaveBeenCalled();
  });

  it("clears the query on Escape first and closes when it is empty", async () => {
    const { groups } = setup();
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<VCommand groups={groups} onOpenChange={onOpenChange} />);
    await user.type(screen.getByPlaceholderText("Search..."), "new");
    await user.keyboard("{Escape}");
    expect(onOpenChange).not.toHaveBeenCalled();
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not select a disabled item", async () => {
    const { groups, onOff } = setup();
    const user = userEvent.setup();
    renderWithTheme(<VCommand groups={groups} />);
    expect(screen.getByRole("button", { name: "Hidden" })).toBeDisabled();
    await user.click(screen.getByText("Hidden"));
    expect(onOff).not.toHaveBeenCalled();
  });

  it("skips disabled items when moving with the arrow keys", async () => {
    const { groups, onNew, onOff } = setup();
    const user = userEvent.setup();
    renderWithTheme(<VCommand groups={groups} />);
    // New file -> Open file -> (disabled Hidden is skipped) -> New file
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    expect(onOff).not.toHaveBeenCalled();
    expect(onNew).toHaveBeenCalledTimes(1);
  });

  it("End and Home land on enabled items", async () => {
    const { groups, onOpen, onNew } = setup();
    const user = userEvent.setup();
    const { container } = renderWithTheme(<VCommand groups={groups} />);
    await user.keyboard("{End}");
    const buttons = Array.from(container.querySelectorAll("button"));
    expect(buttons[1]).toHaveAttribute("data-v-highlighted", "true");
    expect(buttons[2]).not.toHaveAttribute("data-v-highlighted");
    await user.keyboard("{Enter}");
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onNew).not.toHaveBeenCalled();
  });

  it("starts closed when defaultOpen=false and opens with open", () => {
    const { groups } = setup();
    const { container, rerender } = renderWithTheme(
      <VCommand groups={groups} defaultOpen={false} />,
    );
    expect(container.querySelector(".v-command")).toBeNull();
    rerender(<VCommand groups={groups} open />);
    expect(container.querySelector(".v-command")).not.toBeNull();
  });

  it("filters by the query", async () => {
    const { groups } = setup();
    const user = userEvent.setup();
    renderWithTheme(<VCommand groups={groups} />);
    await user.type(screen.getByPlaceholderText("Search..."), "open");
    expect(screen.queryByText("New file")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open file" })).toBeInTheDocument();
  });

  it("a11y: has no accessibility violations", async () => {
    const { groups } = setup();
    const { container } = renderWithTheme(<VCommand groups={groups} />);
    await axeTest(container);
  });
});

describe("VCommand keyboard and state", () => {
  const items = [{ label: "Alpha" }, { label: "Beta" }];

  it("keeps the built-in keys working next to a user onKeyDown", async () => {
    const onKeyDown = vi.fn();
    const user = userEvent.setup();
    const { container } = renderWithTheme(
      <VCommand groups={[{ heading: "G", items }]} onKeyDown={onKeyDown} />,
    );
    await user.keyboard("{ArrowDown}");
    expect(onKeyDown).toHaveBeenCalled();
    const buttons = Array.from(container.querySelectorAll("button"));
    expect(buttons[1]).toHaveAttribute("data-v-highlighted", "true");
  });

  it("lets a user onKeyDown opt out with preventDefault", async () => {
    const user = userEvent.setup();
    const { container } = renderWithTheme(
      <VCommand groups={[{ heading: "G", items }]} onKeyDown={(e) => e.preventDefault()} />,
    );
    await user.keyboard("{ArrowDown}");
    const buttons = Array.from(container.querySelectorAll("button"));
    expect(buttons[0]).toHaveAttribute("data-v-highlighted", "true");
  });

  it("ignores Enter while an IME composition is active", () => {
    const onClick = vi.fn();
    renderWithTheme(<VCommand groups={[{ heading: "G", items: [{ label: "A", onClick }] }]} />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.keyDown(input, { key: "Enter", isComposing: true, keyCode: 229 });
    expect(onClick).not.toHaveBeenCalled();
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("clamps the highlight when the list shrinks", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const big = [{ heading: "G", items: [{ label: "A" }, { label: "B" }, { label: "C" }] }];
    const small = [{ heading: "G", items: [{ label: "A", onClick }] }];
    const { rerender } = renderWithTheme(<VCommand groups={big} />);
    await user.keyboard("{End}");
    rerender(<VCommand groups={small} />);
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("starts with a clean query and highlight after being closed and reopened", async () => {
    const user = userEvent.setup();
    function App() {
      const [open, setOpen] = useState(true);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            reopen
          </button>
          <VCommand open={open} onOpenChange={setOpen} groups={[{ heading: "G", items }]} />
        </>
      );
    }
    renderWithTheme(<App />);
    await user.type(screen.getByPlaceholderText("Search..."), "alp");
    await user.keyboard("{Enter}");
    expect(screen.queryByPlaceholderText("Search...")).not.toBeInTheDocument();
    await user.click(screen.getByText("reopen"));
    expect(screen.getByPlaceholderText("Search...")).toHaveValue("");
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("scrolls the highlighted item into view", async () => {
    const scrollIntoView = vi.fn();
    const original = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = scrollIntoView;
    try {
      const user = userEvent.setup();
      renderWithTheme(<VCommand groups={[{ heading: "G", items }]} />);
      scrollIntoView.mockClear();
      await user.keyboard("{ArrowDown}");
      expect(scrollIntoView).toHaveBeenCalledWith({ block: "nearest" });
    } finally {
      Element.prototype.scrollIntoView = original;
    }
  });

  it("takes its placeholder and empty text from the locale text", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VoloProvider
        locale="fr"
        localeText={{ commandPlaceholder: "Find...", commandNoResults: "Nothing found" }}
      >
        <VCommand groups={[{ heading: "G", items }]} />
      </VoloProvider>,
    );
    const input = screen.getByPlaceholderText("Find...");
    await user.type(input, "zzz");
    expect(screen.getByText("Nothing found")).toBeInTheDocument();
  });
});
