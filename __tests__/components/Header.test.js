import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Header } from "@/components/Header";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";

describe("Header component", () => {
  test("renders the logo", async () => {
    act(() => {
      render(<Header menuItems={[]} form={null} />);
    });

    await waitFor(() => {
      const logoElement = screen.getByAltText("header-logo");
      expect(logoElement).toBeInTheDocument();
    });
  });

  test('opens login modal when "Login" is clicked', async () => {
    act(() => {
      render(<Header menuItems={[]} form={null} />);
    });

    await waitFor(() => {
      const loginLinkElement = screen.getByRole("button", { name: "Login" });
      fireEvent.click(loginLinkElement);

      const modalElement = screen.getByTestId("login-modal");
      expect(modalElement).toBeInTheDocument();
    });
  });
});
