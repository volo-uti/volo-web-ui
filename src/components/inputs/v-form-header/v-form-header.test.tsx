import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme, screen, axeTest } from "../../../test-utils";
import { VFormHeader } from "./v-form-header";

describe("VFormHeader", () => {
  it("associates the label with the htmlFor target", () => {
    renderWithTheme(
      <>
        <VFormHeader label="Email" htmlFor="e" />
        <input id="e" />
      </>,
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("shows the default mark * when required", () => {
    renderWithTheme(<VFormHeader label="Email" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("changes the mark with requiredMark", () => {
    renderWithTheme(<VFormHeader label="Email" required requiredMark="(required)" />);
    expect(screen.getByText("(required)")).toBeInTheDocument();
  });

  it("renders tooltip and more", () => {
    renderWithTheme(
      <VFormHeader label="Email" tooltip={<i data-testid="tip" />} more="Optional" />,
    );
    expect(screen.getByTestId("tip")).toBeInTheDocument();
    expect(screen.getByText("Optional")).toBeInTheDocument();
  });

  it("renders nothing when there is no content", () => {
    const { container } = renderWithTheme(<VFormHeader />);
    expect(container).toBeEmptyDOMElement();
  });

  it("does not leak its own props to DOM attributes", () => {
    const { container } = renderWithTheme(<VFormHeader label="L" requiredMark="!" size="lg" />);
    expect(container.firstChild).not.toHaveAttribute("requiredmark");
    expect(container.firstChild).not.toHaveAttribute("size");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<VFormHeader ref={ref} label="L" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("a11y: has no accessibility violations", async () => {
    const { container } = renderWithTheme(
      <>
        <VFormHeader label="Name" htmlFor="n" required />
        <input id="n" />
      </>,
    );
    await axeTest(container);
  });
});
