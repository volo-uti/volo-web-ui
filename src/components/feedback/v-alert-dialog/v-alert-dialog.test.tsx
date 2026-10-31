import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent, axeTest } from "../../../test-utils";
import { ThemeProvider } from "../../../theme";
import {
  VAlertDialog,
  VAlertDialogTrigger,
  VAlertDialogContent,
  VAlertDialogTitle,
  VAlertDialogDescription,
  VAlertDialogAction,
  VAlertDialogCancel,
} from "./v-alert-dialog";

describe("VAlertDialog", () => {
  const renderAlertDialog = (props = {}) =>
    renderWithTheme(
      <VAlertDialog {...props}>
        <VAlertDialogTrigger>Delete</VAlertDialogTrigger>
        <VAlertDialogContent>
          <VAlertDialogTitle>Confirm deletion</VAlertDialogTitle>
          <VAlertDialogDescription>This cannot be undone.</VAlertDialogDescription>
          <VAlertDialogCancel>Cancel</VAlertDialogCancel>
          <VAlertDialogAction>Confirm</VAlertDialogAction>
        </VAlertDialogContent>
      </VAlertDialog>,
    );

  it("renders only the trigger", () => {
    renderAlertDialog();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("opens the alertdialog when the trigger is clicked", async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    await user.click(screen.getByText("Delete"));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByText("Confirm deletion")).toBeInTheDocument();
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
  });

  it("closes when Cancel is clicked", async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    await user.click(screen.getByText("Delete"));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    await user.click(screen.getByText("Cancel"));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("closes when Action is clicked", async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    await user.click(screen.getByText("Delete"));
    await user.click(screen.getByText("Confirm"));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it('sets aria-modal="true"', async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    await user.click(screen.getByText("Delete"));
    expect(screen.getByRole("alertdialog")).toHaveAttribute("aria-modal", "true");
  });

  it("links aria-labelledby/describedby", async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    await user.click(screen.getByText("Delete"));
    const dialog = screen.getByRole("alertdialog");
    const labelId = dialog.getAttribute("aria-labelledby");
    const descId = dialog.getAttribute("aria-describedby");
    expect(document.getElementById(labelId!)).toHaveTextContent("Confirm deletion");
    expect(document.getElementById(descId!)).toHaveTextContent("This cannot be undone.");
  });

  it("works in controlled mode", () => {
    renderWithTheme(
      <VAlertDialog open={true}>
        <VAlertDialogContent>
          <VAlertDialogTitle>Controlled</VAlertDialogTitle>
          <VAlertDialogDescription>Test</VAlertDialogDescription>
          <VAlertDialogCancel>No</VAlertDialogCancel>
          <VAlertDialogAction>Yes</VAlertDialogAction>
        </VAlertDialogContent>
      </VAlertDialog>,
    );
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it("calls the onOpenChange callback", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    renderAlertDialog({ onOpenChange });
    await user.click(screen.getByText("Delete"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("a11y: has no accessibility violations", async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    await user.click(screen.getByText("Delete"));
    // The dialog is portaled out of the render container, so check the whole body
    await axeTest(document.body);
  });
  it("does not close on Escape", async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    await user.click(screen.getByText("Delete"));
    await user.keyboard("{Escape}");
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it("closes on backdrop click only when barrierDismissible", async () => {
    const user = userEvent.setup();
    const { unmount } = renderAlertDialog();
    await user.click(screen.getByText("Delete"));
    // The full-screen wrapper (the panel's parent) is what a press outside the panel hits
    await user.click(screen.getByRole("alertdialog").parentElement as HTMLElement);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    unmount();

    renderAlertDialog({ barrierDismissible: true });
    await user.click(screen.getByText("Delete"));
    await user.click(screen.getByRole("alertdialog").parentElement as HTMLElement);
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("does not close when the panel itself is clicked, even with barrierDismissible", async () => {
    const user = userEvent.setup();
    renderAlertDialog({ barrierDismissible: true });
    await user.click(screen.getByText("Delete"));
    await user.click(screen.getByText("Confirm deletion"));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it("omits aria-labelledby and aria-describedby when there is no title or description", () => {
    renderWithTheme(
      <VAlertDialog defaultOpen>
        <VAlertDialogContent aria-label="Plain">
          <p>text</p>
        </VAlertDialogContent>
      </VAlertDialog>,
    );
    const dialog = screen.getByRole("alertdialog");
    expect(dialog).not.toHaveAttribute("aria-labelledby");
    expect(dialog).not.toHaveAttribute("aria-describedby");
  });

  it("uses the destructive color for Action when destructive", async () => {
    const user = userEvent.setup();
    renderAlertDialog({ destructive: true });
    await user.click(screen.getByText("Delete"));
    expect(screen.getByText("Confirm").className).toContain("--v-destructive");
  });

  it("calls the Action onClick and closes", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <VAlertDialog defaultOpen>
        <VAlertDialogContent>
          <VAlertDialogTitle>T</VAlertDialogTitle>
          <VAlertDialogDescription>D</VAlertDialogDescription>
          <VAlertDialogAction onClick={onClick}>Go</VAlertDialogAction>
        </VAlertDialogContent>
      </VAlertDialog>,
    );
    await user.click(screen.getByText("Go"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });
});

describe("VAlertDialog portal and inert background", () => {
  const addSibling = (attrs: Record<string, string> = {}) => {
    const el = document.createElement("div");
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    document.body.appendChild(el);
    return el;
  };

  it("renders the panel under document.body, outside the render container", () => {
    const { container } = renderWithTheme(
      <VAlertDialog defaultOpen>
        <VAlertDialogContent aria-label="Sure?">x</VAlertDialogContent>
      </VAlertDialog>,
    );
    const dialog = screen.getByRole("alertdialog");
    expect(container).not.toContainElement(dialog);
    expect(dialog.closest("[data-v-overlay-portal]")?.parentElement).toBe(document.body);
  });

  it("makes the page inert while open, keeps pre-inert and ignored siblings, restores on close", async () => {
    const user = userEvent.setup();
    const plain = addSibling();
    const preInert = addSibling({ inert: "" });
    const ignored = addSibling({ "data-v-inert-ignore": "" });
    renderWithTheme(
      <VAlertDialog defaultOpen>
        <VAlertDialogContent aria-label="Sure?">
          <VAlertDialogCancel>Cancel</VAlertDialogCancel>
        </VAlertDialogContent>
      </VAlertDialog>,
    );
    expect(plain).toHaveAttribute("inert");
    expect(ignored).not.toHaveAttribute("inert");
    await user.click(screen.getByText("Cancel"));
    expect(plain).not.toHaveAttribute("inert");
    expect(preInert).toHaveAttribute("inert");
    expect(ignored).not.toHaveAttribute("inert");
    plain.remove();
    preInert.remove();
    ignored.remove();
  });

  it("locks the page scroll while open and restores it on close", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <VAlertDialog defaultOpen>
        <VAlertDialogContent aria-label="Sure?">
          <VAlertDialogCancel>Cancel</VAlertDialogCancel>
        </VAlertDialogContent>
      </VAlertDialog>,
    );
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(screen.getByText("Cancel"));
    expect(document.body.style.overflow).toBe("");
  });

  it("renders nothing on the server", () => {
    const html = renderToString(
      <ThemeProvider>
        <VAlertDialog defaultOpen>
          <VAlertDialogContent aria-label="Server">x</VAlertDialogContent>
        </VAlertDialog>
      </ThemeProvider>,
    );
    expect(html).toBe("");
  });

  it("mounts into portalContainer when given", () => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    renderWithTheme(
      <VAlertDialog defaultOpen portalContainer={host}>
        <VAlertDialogContent aria-label="Hosted">x</VAlertDialogContent>
      </VAlertDialog>,
    );
    expect(host).toContainElement(screen.getByRole("alertdialog"));
    host.remove();
  });
});
