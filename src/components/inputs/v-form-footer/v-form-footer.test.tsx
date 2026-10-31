import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VFormFooter } from "./v-form-footer";

describe("VFormFooter", () => {
  it("shows the helper", () => {
    renderWithTheme(<VFormFooter helper="Hint" />);
    expect(screen.getByText("Hint")).toBeInTheDocument();
  });

  it("prefers error over success and helper", () => {
    renderWithTheme(<VFormFooter helper="Hint" success successText="Good" error errorText="Bad" />);
    expect(screen.getByText("Bad")).toBeInTheDocument();
    expect(screen.queryByText("Good")).not.toBeInTheDocument();
    expect(screen.queryByText("Hint")).not.toBeInTheDocument();
  });

  it("hides errorText when error is off", () => {
    renderWithTheme(<VFormFooter helper="Hint" errorText="Bad" />);
    expect(screen.getByText("Hint")).toBeInTheDocument();
    expect(screen.queryByText("Bad")).not.toBeInTheDocument();
  });

  it("prefers success over helper", () => {
    renderWithTheme(<VFormFooter helper="Hint" success successText="Good" />);
    expect(screen.getByText("Good")).toBeInTheDocument();
  });

  it("shows the maxLength counter and uses the error color when exceeded", () => {
    renderWithTheme(<VFormFooter maxLength={5} currentLength={7} />);
    expect(screen.getByText("7/5")).toHaveClass("text-[var(--v-error)]");
  });

  it("replaces the default counter with counter", () => {
    renderWithTheme(<VFormFooter maxLength={5} currentLength={1} counter={<b>custom</b>} />);
    expect(screen.getByText("custom")).toBeInTheDocument();
    expect(screen.queryByText("1/5")).not.toBeInTheDocument();
  });

  it("shows extra", () => {
    renderWithTheme(<VFormFooter extra="Note" />);
    expect(screen.getByText("Note")).toBeInTheDocument();
  });

  it("applies messageId to the message", () => {
    renderWithTheme(<VFormFooter helper="Hint" messageId="m" />);
    expect(screen.getByText("Hint")).toHaveAttribute("id", "m");
  });

  it("renders nothing when there is no content", () => {
    const { container } = renderWithTheme(<VFormFooter />);
    expect(container).toBeEmptyDOMElement();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VFormFooter ref={ref} helper="x" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(<VFormFooter helper="Hint" maxLength={5} />);
    await axeTest(container);
  });
});
