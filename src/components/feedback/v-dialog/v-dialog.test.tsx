import { act, useState } from "react";
import { hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, waitFor, axeTest } from "../../../test-utils";
import { ThemeProvider } from "../../../theme";
import { VAlertDialog, VAlertDialogContent } from "../v-alert-dialog";
import { VToaster, toast } from "../v-toast";
import {
  VDialog,
  VDialogTrigger,
  VDialogContent,
  VDialogHeader,
  VDialogFooter,
  VDialogTitle,
  VDialogDescription,
  VDialogClose,
} from "./v-dialog";

describe("VDialog", () => {
  const renderDialog = (props = {}) =>
    renderWithTheme(
      <VDialog {...props}>
        <VDialogTrigger>Open Dialog</VDialogTrigger>
        <VDialogContent>
          <VDialogHeader>
            <VDialogTitle>Dialog Title</VDialogTitle>
            <VDialogDescription>Dialog description text</VDialogDescription>
          </VDialogHeader>
          <p>Body content</p>
          <VDialogFooter>
            <VDialogClose>Cancel</VDialogClose>
          </VDialogFooter>
        </VDialogContent>
      </VDialog>,
    );

  it("renders only the trigger", () => {
    renderDialog();
    expect(screen.getByText("Open Dialog")).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the dialog when the trigger is clicked", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open Dialog"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    expect(screen.getByText("Dialog description text")).toBeInTheDocument();
  });

  it("closes when the close button is clicked", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open Dialog"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByText("Cancel"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it('sets aria-modal="true"', async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open Dialog"));
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("links aria-labelledby/describedby", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open Dialog"));
    const dialog = screen.getByRole("dialog");
    const labelId = dialog.getAttribute("aria-labelledby");
    const descId = dialog.getAttribute("aria-describedby");
    expect(labelId).toBeTruthy();
    expect(descId).toBeTruthy();
    expect(document.getElementById(labelId!)).toHaveTextContent("Dialog Title");
    expect(document.getElementById(descId!)).toHaveTextContent("Dialog description text");
  });

  it("works in controlled mode", () => {
    renderWithTheme(
      <VDialog open={true}>
        <VDialogContent>
          <VDialogHeader>
            <VDialogTitle>Controlled</VDialogTitle>
          </VDialogHeader>
        </VDialogContent>
      </VDialog>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("calls the onOpenChange callback", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    renderDialog({ onOpenChange });
    await user.click(screen.getByText("Open Dialog"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open Dialog"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("a11y: has no accessibility violations", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open Dialog"));
    // The dialog is portaled out of the render container, so check the whole body
    await axeTest(document.body);
  });
  it("moves focus into the dialog when opened", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open Dialog"));
    const dialog = screen.getByRole("dialog");
    await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement));
  });

  it("calls onOpenChange(false) when closed with Escape", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    renderDialog({ onOpenChange });
    await user.click(screen.getByText("Open Dialog"));
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("closes on backdrop click", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open Dialog"));
    // In a browser the full-screen wrapper sits above the dimming layer, so a press outside
    // the panel lands on the wrapper (the panel's parent), never on the layer itself.
    const outside = screen.getByRole("dialog").parentElement as HTMLElement;
    await user.click(outside);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("does not close when the panel itself is clicked", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open Dialog"));
    await user.click(screen.getByText("Body content"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("puts the dimming layer under the click-catching wrapper", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByText("Open Dialog"));
    const wrapper = screen.getByRole("dialog").parentElement as HTMLElement;
    const backdrop = document.querySelector('[aria-hidden="true"]') as HTMLElement;
    // The wrapper comes after the dimming layer and covers the viewport, so it is hit first.
    expect(
      backdrop.compareDocumentPosition(wrapper) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(wrapper.className).toContain("fixed inset-0");
  });

  it("does not close on backdrop click when barrierDismissible=false but closes on Escape", async () => {
    const user = userEvent.setup();
    renderDialog({ barrierDismissible: false });
    await user.click(screen.getByText("Open Dialog"));
    await user.click(screen.getByRole("dialog").parentElement as HTMLElement);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("does not open from a disabled trigger", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VDialog onOpenChange={onOpenChange}>
        <VDialogTrigger disabled>Open</VDialogTrigger>
        <VDialogContent>x</VDialogContent>
      </VDialog>,
    );
    await user.click(screen.getByText("Open"));
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("calls the trigger onClick and does not open after preventDefault", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VDialog>
        <VDialogTrigger onClick={(e) => e.preventDefault()}>Open</VDialogTrigger>
        <VDialogContent>x</VDialogContent>
      </VDialog>,
    );
    await user.click(screen.getByText("Open"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("applies footer actionsAlignment and actionsExpanded", () => {
    renderWithTheme(
      <VDialogFooter data-testid="f" actionsAlignment="center" actionsExpanded>
        <button>a</button>
      </VDialogFooter>,
    );
    const f = screen.getByTestId("f");
    expect(f.className).toContain("justify-center");
    expect(f.className).toContain("[&>*]:flex-1");
  });
});

describe("VDialog overlay behaviour", () => {
  it("restores the page scroll when overlapping dialogs close out of order", async () => {
    function App() {
      const [a, setA] = useState(true);
      const [b, setB] = useState(false);
      return (
        <>
          <button onClick={() => setB(true)}>openB</button>
          <button onClick={() => setA(false)}>closeA</button>
          <button onClick={() => setB(false)}>closeB</button>
          <VDialog open={a} onOpenChange={setA}>
            <VDialogContent>
              <VDialogTitle>A</VDialogTitle>
            </VDialogContent>
          </VDialog>
          <VDialog open={b} onOpenChange={setB}>
            <VDialogContent>
              <VDialogTitle>B</VDialogTitle>
            </VDialogContent>
          </VDialog>
        </>
      );
    }
    const user = userEvent.setup();
    renderWithTheme(<App />);
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(screen.getByText("openB"));
    await user.click(screen.getByText("closeA"));
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(screen.getByText("closeB"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes only the topmost of nested dialogs on Escape", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VDialog defaultOpen>
        <VDialogContent>
          <VDialogTitle>Outer</VDialogTitle>
          <VDialog>
            <VDialogTrigger>open inner</VDialogTrigger>
            <VDialogContent>
              <VDialogTitle>Inner</VDialogTitle>
            </VDialogContent>
          </VDialog>
        </VDialogContent>
      </VDialog>,
    );
    await user.click(screen.getByText("open inner"));
    expect(screen.getAllByRole("dialog")).toHaveLength(2);
    await user.keyboard("{Escape}");
    expect(screen.getAllByRole("dialog")).toHaveLength(1);
    expect(screen.getByRole("dialog", { name: "Outer" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("omits aria-labelledby and aria-describedby when there is no title or description", () => {
    renderWithTheme(
      <VDialog defaultOpen>
        <VDialogContent aria-label="Plain">
          <p>text</p>
        </VDialogContent>
      </VDialog>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).not.toHaveAttribute("aria-labelledby");
    expect(dialog).not.toHaveAttribute("aria-describedby");
  });

  it("names the dialog by its title and description when they exist", () => {
    renderWithTheme(
      <VDialog defaultOpen>
        <VDialogContent>
          <VDialogTitle>Named</VDialogTitle>
          <VDialogDescription>Why</VDialogDescription>
        </VDialogContent>
      </VDialog>,
    );
    const dialog = screen.getByRole("dialog", { name: "Named", description: "Why" });
    expect(dialog).toBeInTheDocument();
  });
});

describe("VDialog portal and inert background", () => {
  const addSibling = (attrs: Record<string, string> = {}) => {
    const el = document.createElement("div");
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    document.body.appendChild(el);
    return el;
  };

  const Basic = (props: { portalContainer?: HTMLElement | null } = {}) => (
    <VDialog defaultOpen {...props}>
      <VDialogContent>
        <VDialogTitle>Portaled</VDialogTitle>
      </VDialogContent>
    </VDialog>
  );

  it("renders the panel under document.body, outside the render container", () => {
    const { container } = renderWithTheme(<Basic />);
    const dialog = screen.getByRole("dialog");
    expect(container).not.toContainElement(dialog);
    expect(document.body).toContainElement(dialog);
    // The panel sits in a dedicated element that is a direct child of the body
    const layer = dialog.closest("[data-v-overlay-portal]") as HTMLElement;
    expect(layer.parentElement).toBe(document.body);
  });

  it("removes the portal element when the dialog closes", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VDialog defaultOpen>
        <VDialogContent>
          <VDialogClose>Done</VDialogClose>
        </VDialogContent>
      </VDialog>,
    );
    expect(document.querySelectorAll("[data-v-overlay-portal]")).toHaveLength(1);
    await user.click(screen.getByText("Done"));
    expect(document.querySelectorAll("[data-v-overlay-portal]")).toHaveLength(0);
  });

  it("makes the other body children inert and restores them on close", async () => {
    const user = userEvent.setup();
    const sibling = addSibling();
    const { container } = renderWithTheme(
      <VDialog>
        <VDialogTrigger>Open</VDialogTrigger>
        <VDialogContent>
          <VDialogClose>Done</VDialogClose>
        </VDialogContent>
      </VDialog>,
    );
    expect(sibling).not.toHaveAttribute("inert");
    await user.click(screen.getByText("Open"));
    const layer = screen.getByRole("dialog").closest("[data-v-overlay-portal]");
    expect(sibling).toHaveAttribute("inert");
    expect(container).toHaveAttribute("inert");
    expect(layer).not.toHaveAttribute("inert");
    await user.click(screen.getByText("Done"));
    expect(sibling).not.toHaveAttribute("inert");
    expect(container).not.toHaveAttribute("inert");
    sibling.remove();
  });

  it("restores the page when the dialog unmounts while open", () => {
    const sibling = addSibling();
    const { container, unmount } = renderWithTheme(<Basic />);
    expect(sibling).toHaveAttribute("inert");
    unmount();
    expect(sibling).not.toHaveAttribute("inert");
    expect(container).not.toHaveAttribute("inert");
    expect(document.querySelectorAll("[data-v-overlay-portal]")).toHaveLength(0);
    sibling.remove();
  });

  it("keeps a sibling that was already inert inert after the dialog closes", async () => {
    const user = userEvent.setup();
    const preInert = addSibling({ inert: "" });
    const plain = addSibling();
    renderWithTheme(
      <VDialog defaultOpen>
        <VDialogContent>
          <VDialogClose>Done</VDialogClose>
        </VDialogContent>
      </VDialog>,
    );
    expect(plain).toHaveAttribute("inert");
    await user.click(screen.getByText("Done"));
    expect(plain).not.toHaveAttribute("inert");
    expect(preInert).toHaveAttribute("inert");
    preInert.remove();
    plain.remove();
  });

  it("leaves elements marked data-v-inert-ignore interactive", () => {
    const ignored = addSibling({ "data-v-inert-ignore": "" });
    const plain = addSibling();
    renderWithTheme(<Basic />);
    expect(plain).toHaveAttribute("inert");
    expect(ignored).not.toHaveAttribute("inert");
    ignored.remove();
    plain.remove();
  });

  it("keeps only the topmost of nested dialogs interactive and restores in order", async () => {
    const user = userEvent.setup();
    const sibling = addSibling();
    renderWithTheme(
      <VDialog defaultOpen>
        <VDialogContent>
          <VDialogTitle>Outer</VDialogTitle>
          <VDialog>
            <VDialogTrigger>open inner</VDialogTrigger>
            <VDialogContent>
              <VDialogTitle>Inner</VDialogTitle>
              <VDialogClose>close inner</VDialogClose>
            </VDialogContent>
          </VDialog>
        </VDialogContent>
      </VDialog>,
    );
    const outerLayer = screen
      .getByRole("dialog", { name: "Outer" })
      .closest("[data-v-overlay-portal]");
    expect(outerLayer).not.toHaveAttribute("inert");

    await user.click(screen.getByText("open inner"));
    const innerLayer = screen
      .getByRole("dialog", { name: "Inner" })
      .closest("[data-v-overlay-portal]");
    expect(innerLayer).not.toBe(outerLayer);
    expect(outerLayer).toHaveAttribute("inert");
    expect(innerLayer).not.toHaveAttribute("inert");
    expect(sibling).toHaveAttribute("inert");

    await user.click(screen.getByText("close inner"));
    expect(outerLayer).not.toHaveAttribute("inert");
    expect(sibling).toHaveAttribute("inert");
    sibling.remove();
  });

  it("restores everything when stacked dialogs close in the opposite order", async () => {
    const user = userEvent.setup();
    const sibling = addSibling();
    const preInert = addSibling({ inert: "" });
    function App() {
      const [a, setA] = useState(true);
      const [b, setB] = useState(true);
      return (
        <>
          <button onClick={() => setA(false)}>closeA</button>
          <button onClick={() => setB(false)}>closeB</button>
          <VDialog open={a}>
            <VDialogContent aria-label="A">a</VDialogContent>
          </VDialog>
          <VDialog open={b}>
            <VDialogContent aria-label="B">b</VDialogContent>
          </VDialog>
        </>
      );
    }
    renderWithTheme(<App />);
    expect(sibling).toHaveAttribute("inert");
    // The first dialog is the lower one; closing it first leaves the page inert under B
    await user.click(screen.getByText("closeA"));
    expect(sibling).toHaveAttribute("inert");
    await user.click(screen.getByText("closeB"));
    expect(sibling).not.toHaveAttribute("inert");
    expect(preInert).toHaveAttribute("inert");
    sibling.remove();
    preInert.remove();
  });

  it("keeps a VToaster usable while the dialog is open", () => {
    renderWithTheme(
      <>
        <Basic />
        <VToaster />
      </>,
    );
    let id = "";
    act(() => {
      id = toast.info("Heads up");
    });
    const viewport = screen.getByText("Heads up").closest(".v-toaster") as HTMLElement;
    expect(viewport).toHaveAttribute("data-v-inert-ignore");
    expect(viewport.closest("[inert]")).toBeNull();
    act(() => toast.dismiss(id));
  });

  it("renders nothing on the server and on the first client render", () => {
    const html = renderToString(
      <ThemeProvider>
        <VDialog defaultOpen>
          <VDialogContent>
            <VDialogTitle>Server</VDialogTitle>
          </VDialogContent>
        </VDialog>
      </ThemeProvider>,
    );
    expect(html).toBe("");
  });

  it("hydrates without a mismatch and mounts the portal after hydration", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const host = document.createElement("div");
    document.body.appendChild(host);
    const ui = (
      <ThemeProvider>
        <p>page</p>
        <VDialog defaultOpen>
          <VDialogContent aria-label="Hydrated">x</VDialogContent>
        </VDialog>
      </ThemeProvider>
    );
    host.innerHTML = renderToString(ui);
    expect(host.querySelector("[role=dialog]")).toBeNull();
    let root!: Root;
    await act(async () => {
      root = hydrateRoot(host, ui);
    });
    expect(errors).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog", { name: "Hydrated" })).toBeInTheDocument();
    expect(host).not.toContainElement(screen.getByRole("dialog"));
    act(() => root.unmount());
    host.remove();
    errors.mockRestore();
  });

  it("mounts into portalContainer when given", () => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const other = addSibling();
    renderWithTheme(<Basic portalContainer={host} />);
    const dialog = screen.getByRole("dialog");
    expect(host).toContainElement(dialog);
    expect(dialog.closest("[data-v-overlay-portal]")?.parentElement).toBe(host);
    // The host stays interactive (it holds the dialog); the rest of the page is inert
    expect(host).not.toHaveAttribute("inert");
    expect(other).toHaveAttribute("inert");
    host.remove();
    other.remove();
  });

  it("falls back to the body when portalContainer is null", () => {
    renderWithTheme(<Basic portalContainer={null} />);
    expect(screen.getByRole("dialog").closest("[data-v-overlay-portal]")?.parentElement).toBe(
      document.body,
    );
  });

  it("does not let Escape through an alert dialog to the dialog below it", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderWithTheme(
      <VDialog defaultOpen onOpenChange={onOpenChange}>
        <VDialogContent aria-label="Below">
          <VAlertDialog defaultOpen>
            <VAlertDialogContent aria-label="Above">x</VAlertDialogContent>
          </VAlertDialog>
        </VDialogContent>
      </VDialog>,
    );
    await user.keyboard("{Escape}");
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog", { name: "Below" })).toBeInTheDocument();
  });

  it("still closes on a wrapper click after the portal move", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Basic />);
    await user.click(screen.getByRole("dialog").parentElement as HTMLElement);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
