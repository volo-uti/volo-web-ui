import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest, waitFor } from "../../../test-utils";
import { ThemeProvider } from "../../../theme";
import {
  VDrawer,
  VDrawerTrigger,
  VDrawerContent,
  VDrawerHeader,
  VDrawerFooter,
  VDrawerClose,
} from "./v-drawer";

describe("VDrawer", () => {
  const renderDrawer = (props = {}) =>
    renderWithTheme(
      <VDrawer {...props}>
        <VDrawerTrigger>Open Drawer</VDrawerTrigger>
        <VDrawerContent>
          <VDrawerHeader>Drawer Title</VDrawerHeader>
          <p>Drawer body</p>
          <VDrawerFooter>
            <VDrawerClose>Close</VDrawerClose>
          </VDrawerFooter>
        </VDrawerContent>
      </VDrawer>,
    );

  it("renders only the trigger", () => {
    renderDrawer();
    expect(screen.getByText("Open Drawer")).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the drawer when the trigger is clicked", async () => {
    const user = userEvent.setup();
    renderDrawer();
    await user.click(screen.getByText("Open Drawer"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Drawer Title")).toBeInTheDocument();
    expect(screen.getByText("Drawer body")).toBeInTheDocument();
  });

  it("closes when the close button is clicked", async () => {
    const user = userEvent.setup();
    renderDrawer();
    await user.click(screen.getByText("Open Drawer"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByText("Close"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it('sets aria-modal="true"', async () => {
    const user = userEvent.setup();
    renderDrawer();
    await user.click(screen.getByText("Open Drawer"));
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("applies the side prop (default: left)", async () => {
    const user = userEvent.setup();
    renderDrawer();
    await user.click(screen.getByText("Open Drawer"));
    expect(screen.getByRole("dialog")).toHaveAttribute("data-v-side", "left");
  });

  it('applies side="left"', async () => {
    const user = userEvent.setup();
    renderDrawer({ side: "left" });
    await user.click(screen.getByText("Open Drawer"));
    expect(screen.getByRole("dialog")).toHaveAttribute("data-v-side", "left");
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    renderDrawer();
    await user.click(screen.getByText("Open Drawer"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("works in controlled mode", () => {
    renderWithTheme(
      <VDrawer open={true}>
        <VDrawerContent>
          <VDrawerHeader>Controlled</VDrawerHeader>
        </VDrawerContent>
      </VDrawer>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("calls the onOpenChange callback", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    renderDrawer({ onOpenChange });
    await user.click(screen.getByText("Open Drawer"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("a11y: has no accessibility violations", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VDrawer>
        <VDrawerTrigger>Open</VDrawerTrigger>
        <VDrawerContent aria-label="Drawer panel">
          <VDrawerHeader>Title</VDrawerHeader>
          <VDrawerFooter>
            <VDrawerClose>Close</VDrawerClose>
          </VDrawerFooter>
        </VDrawerContent>
      </VDrawer>,
    );
    await user.click(screen.getByText("Open"));
    // The drawer is portaled out of the render container, so check the whole body
    await axeTest(document.body);
  });

  it("moves focus into the panel when opened and back to the trigger when closed", async () => {
    const user = userEvent.setup();
    renderDrawer();
    const trigger = screen.getByText("Open Drawer");
    await user.click(trigger);
    await waitFor(() =>
      expect(screen.getByRole("dialog")).toContainElement(document.activeElement as HTMLElement),
    );
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("calls onOpenChange(false) when closed with Escape", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderDrawer({ defaultOpen: true, onOpenChange });
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("accepts disabled and onClick on the trigger and close button", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <VDrawer>
        <VDrawerTrigger disabled onClick={onClick}>
          Open
        </VDrawerTrigger>
        <VDrawerContent />
      </VDrawer>,
    );
    await user.click(screen.getByText("Open"));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("accepts a VSide value for side", async () => {
    renderDrawer({ defaultOpen: true, side: "bottom" });
    expect(screen.getByRole("dialog")).toHaveAttribute("data-v-side", "bottom");
  });

  it("calls the trigger onClick and does not open after preventDefault", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const onPrevent = vi.fn((e: React.MouseEvent) => e.preventDefault());
    renderWithTheme(
      <VDrawer>
        <VDrawerTrigger onClick={onClick}>Plain</VDrawerTrigger>
        <VDrawerTrigger onClick={onPrevent}>Blocked</VDrawerTrigger>
        <VDrawerContent />
      </VDrawer>,
    );
    await user.click(screen.getByText("Blocked"));
    expect(onPrevent).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByText("Plain"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("calls the close button onClick and does not close after preventDefault", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const onPrevent = vi.fn((e: React.MouseEvent) => e.preventDefault());
    renderWithTheme(
      <VDrawer defaultOpen>
        <VDrawerContent>
          <VDrawerClose onClick={onPrevent}>Blocked</VDrawerClose>
          <VDrawerClose onClick={onClick}>Plain</VDrawerClose>
        </VDrawerContent>
      </VDrawer>,
    );
    await user.click(screen.getByText("Blocked"));
    expect(onPrevent).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByText("Plain"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("VDrawer persistent variant", () => {
  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("does not lock the page scroll", () => {
    renderWithTheme(
      <VDrawer variant="persistent" defaultOpen>
        <VDrawerContent aria-label="Navigation">
          <a href="#x">link</a>
        </VDrawerContent>
      </VDrawer>,
    );
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("stays open on Escape", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VDrawer variant="persistent" defaultOpen>
        <VDrawerContent aria-label="Navigation">
          <a href="#x">link</a>
        </VDrawerContent>
      </VDrawer>,
    );
    await user.keyboard("{Escape}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not trap Tab inside the drawer", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <>
        <VDrawer variant="persistent" defaultOpen>
          <VDrawerContent aria-label="Navigation">
            <a href="#x">link</a>
          </VDrawerContent>
        </VDrawer>
        <button type="button">outside</button>
      </>,
    );
    await user.tab();
    expect(screen.getByText("link")).toHaveFocus();
    await user.tab();
    expect(screen.getByText("outside")).toHaveFocus();
  });
});

describe("VDrawer modal variant", () => {
  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("locks the page scroll while open and restores it on close", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VDrawer defaultOpen>
        <VDrawerContent aria-label="Navigation">
          <VDrawerClose>Close</VDrawerClose>
        </VDrawerContent>
      </VDrawer>,
    );
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(screen.getByText("Close"));
    expect(document.body.style.overflow).toBe("");
  });
});

describe("VDrawer portal and inert background", () => {
  afterEach(() => {
    document.body.style.overflow = "";
  });

  const addSibling = (attrs: Record<string, string> = {}) => {
    const el = document.createElement("div");
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    document.body.appendChild(el);
    return el;
  };

  it("renders the modal panel and backdrop under document.body, outside the render container", () => {
    const { container } = renderWithTheme(
      <VDrawer defaultOpen>
        <VDrawerContent aria-label="Nav">x</VDrawerContent>
      </VDrawer>,
    );
    const dialog = screen.getByRole("dialog");
    expect(container).not.toContainElement(dialog);
    const layer = dialog.closest("[data-v-overlay-portal]") as HTMLElement;
    expect(layer.parentElement).toBe(document.body);
    expect(layer.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it("makes the page inert while open and restores it on close", async () => {
    const user = userEvent.setup();
    const plain = addSibling();
    const preInert = addSibling({ inert: "" });
    const ignored = addSibling({ "data-v-inert-ignore": "" });
    const { container } = renderWithTheme(
      <VDrawer defaultOpen>
        <VDrawerContent aria-label="Nav">
          <VDrawerClose>Close</VDrawerClose>
        </VDrawerContent>
      </VDrawer>,
    );
    expect(plain).toHaveAttribute("inert");
    expect(container).toHaveAttribute("inert");
    expect(ignored).not.toHaveAttribute("inert");
    await user.click(screen.getByText("Close"));
    expect(plain).not.toHaveAttribute("inert");
    expect(container).not.toHaveAttribute("inert");
    expect(preInert).toHaveAttribute("inert");
    plain.remove();
    preInert.remove();
    ignored.remove();
  });

  it("closes on a backdrop click after the portal move", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VDrawer defaultOpen>
        <VDrawerContent aria-label="Nav">x</VDrawerContent>
      </VDrawer>,
    );
    const backdrop = screen
      .getByRole("dialog")
      .closest("[data-v-overlay-portal]")
      ?.querySelector('[aria-hidden="true"]') as HTMLElement;
    await user.click(backdrop);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps the persistent variant in place with no portal and no inert", () => {
    const plain = addSibling();
    const { container } = renderWithTheme(
      <>
        <button type="button">outside</button>
        <VDrawer variant="persistent" defaultOpen>
          <VDrawerContent aria-label="Nav">x</VDrawerContent>
        </VDrawer>
      </>,
    );
    expect(container).toContainElement(screen.getByRole("dialog"));
    expect(document.querySelector("[data-v-overlay-portal]")).toBeNull();
    expect(plain).not.toHaveAttribute("inert");
    expect(container).not.toHaveAttribute("inert");
    plain.remove();
  });

  it("renders nothing on the server for the modal variant", () => {
    const html = renderToString(
      <ThemeProvider>
        <VDrawer defaultOpen>
          <VDrawerContent aria-label="Server">x</VDrawerContent>
        </VDrawer>
      </ThemeProvider>,
    );
    expect(html).toBe("");
  });

  it("mounts into portalContainer when given", () => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    renderWithTheme(
      <VDrawer defaultOpen portalContainer={host}>
        <VDrawerContent aria-label="Hosted">x</VDrawerContent>
      </VDrawer>,
    );
    expect(host).toContainElement(screen.getByRole("dialog"));
    expect(host).not.toHaveAttribute("inert");
    host.remove();
  });

  it("nested drawers: only the top layer is interactive, Escape closes it first", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VDrawer defaultOpen>
        <VDrawerContent aria-label="Nav">
          <VDrawer side="right">
            <VDrawerTrigger>more</VDrawerTrigger>
            <VDrawerContent aria-label="More">y</VDrawerContent>
          </VDrawer>
        </VDrawerContent>
      </VDrawer>,
    );
    const outer = screen.getByRole("dialog", { name: "Nav" }).closest("[data-v-overlay-portal]");
    await user.click(screen.getByText("more"));
    expect(outer).toHaveAttribute("inert");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "More" })).not.toBeInTheDocument();
    expect(outer).not.toHaveAttribute("inert");
    expect(screen.getByRole("dialog", { name: "Nav" })).toBeInTheDocument();
  });
});
