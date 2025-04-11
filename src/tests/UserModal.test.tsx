import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserModal } from "../modules/users/components/UserModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("../modules/users/hooks/useUserDetails", () => ({
  useUserDetails: jest.fn(),
}));

import { useUserDetails } from "../modules/users/hooks/useUserDetails";

const mockOnClose = jest.fn();

const mockedUseUserDetails = useUserDetails as jest.MockedFunction<
  typeof useUserDetails
>;

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

const renderWithQueryClient = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>,
  );
};

const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "1-770-736-8031 x56442",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
  },
};

describe("UserModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state correctly", () => {
    mockedUseUserDetails.mockReturnValue({
      user: undefined,
      isLoading: true,
      error: null,
    });

    renderWithQueryClient(<UserModal userId={1} onClose={mockOnClose} />);

    expect(screen.getByText("Деталі користувача")).toBeInTheDocument();

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.getByTestId("loader")).toHaveClass("animate-spin");
  });

  it("renders error state correctly", () => {
    mockedUseUserDetails.mockReturnValue({
      user: undefined,
      isLoading: false,
      error: "Failed to fetch user",
    });

    renderWithQueryClient(<UserModal userId={1} onClose={mockOnClose} />);

    expect(screen.getByText(/Помилка завантаження:/)).toBeInTheDocument();
    expect(screen.getByText(/Failed to fetch user/)).toBeInTheDocument();
  });

  it("renders user details correctly when data is loaded", () => {
    mockedUseUserDetails.mockReturnValue({
      user: mockUser,
      isLoading: false,
      error: null,
    });

    renderWithQueryClient(<UserModal userId={1} onClose={mockOnClose} />);

    expect(screen.getByText("Ім'я:")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("Телефон:")).toBeInTheDocument();
    expect(screen.getByText("1-770-736-8031 x56442")).toBeInTheDocument();
    expect(screen.getByText("Адреса:")).toBeInTheDocument();
    expect(
      screen.getByText("Kulas Light, Apt. 556, Gwenborough, 92998-3874"),
    ).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    mockedUseUserDetails.mockReturnValue({
      user: mockUser,
      isLoading: false,
      error: null,
    });

    renderWithQueryClient(<UserModal userId={1} onClose={mockOnClose} />);

    const closeButton = screen.getByText("Закрити");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when dialog is closed via onOpenChange", () => {
    mockedUseUserDetails.mockReturnValue({
      user: mockUser,
      isLoading: false,
      error: null,
    });

    renderWithQueryClient(<UserModal userId={1} onClose={mockOnClose} />);

    const dialog = screen.getByRole("dialog");

    fireEvent.keyDown(dialog, { key: "Escape", code: "Escape" });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls useUserDetails with the correct userId", () => {
    mockedUseUserDetails.mockReturnValue({
      user: mockUser,
      isLoading: false,
      error: null,
    });

    renderWithQueryClient(<UserModal userId={42} onClose={mockOnClose} />);

    expect(mockedUseUserDetails).toHaveBeenCalledWith(42);
  });

  it("renders grid layout for user details", () => {
    mockedUseUserDetails.mockReturnValue({
      user: mockUser,
      isLoading: false,
      error: null,
    });

    renderWithQueryClient(<UserModal userId={1} onClose={mockOnClose} />);

    const gridItems = document.querySelectorAll(".grid.grid-cols-3");
    expect(gridItems.length).toBe(4);
  });
});
