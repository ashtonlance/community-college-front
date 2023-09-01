import { render, screen, waitFor } from "@testing-library/react";
import { Button } from "@/components/Button";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";

describe("Button component", () => {
  test("renders button with content", async () => {
    act(() => {
      render(<Button content="Click me" />);
    });

    await waitFor(() => {
      const buttonElement = screen.getByText("Click me");
      expect(buttonElement).toBeInTheDocument();
    });
  });

  test("renders button with arrow icon when arrow prop is true", async () => {
    act(() => {
      render(<Button content="Click me" arrow={true} />);
    });

    await waitFor(() => {
      const arrowIcon = screen.getByAltText("");
      expect(arrowIcon).toBeInTheDocument();
    });
  });

  test("renders button with custom classes", async () => {
    act(() => {
      render(<Button content="Click me" classes="custom-btn" />);
    });

    await waitFor(() => {
      const buttonElement = screen.getByText("Click me");
      expect(buttonElement).toHaveClass("custom-btn");
    });
  });

  test("renders button with link when linkto prop is provided", async () => {
    act(() => {
      render(<Button content="Click me" linkto="/some-page" />);
    });

    await waitFor(() => {
      const linkElement = screen.getByRole("link");
      expect(linkElement).toHaveAttribute("href", "/some-page");
    });
  });

  test("renders button with target attribute when target prop is provided", async () => {
    act(() => {
      render(<Button content="Click me" target="_blank" />);
    });

    await waitFor(() => {
      const linkElement = screen.getByRole("link");
      expect(linkElement).toHaveAttribute("target", "_blank");
    });
  });

  test("renders button with original content when content prop has originalContent property", async () => {
    act(() => {
      const originalContent = "<span>Original content</span>";
      render(<Button content={{ originalContent }} />);
    });

    await waitFor(() => {
      const buttonElement = screen.getByText("Original content");
      expect(buttonElement).toBeInTheDocument();
    });
  });
});
