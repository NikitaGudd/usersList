import React from "react";

import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { UserList, useUsers } from "@/modules/users";

interface User {
  id: number;
  name: string;
}

interface UseUsersReturn {
  users: User[];
  isLoading: boolean;
  error: boolean;
}

jest.mock("../modules/users/hooks/useUsers", () => ({
  useUsers: jest.fn(),
}));

jest.mock("react-virtualized-auto-sizer", () => ({
  __esModule: true,
  default: ({
    children,
  }: {
    children: ({ width, height }: { width: number; height: number }) => React.ReactNode;
  }) => children({ width: 1000, height: 600 }),
}));

jest.mock("react-window", () => ({
  FixedSizeList: ({
    children,
    itemCount,
  }: {
    children: ({ index, style }: { index: number; style: React.CSSProperties }) => React.ReactNode;
    itemCount: number;
  }) => (
    <div data-testid="virtual-list">
      {Array.from({ length: itemCount }).map((_, index) => children({ index, style: {} }))}
    </div>
  ),
}));

jest.mock("../modules/users/components/UserCard", () => ({
  UserCard: ({ user, onViewDetails }: { user: User; onViewDetails: (id: number) => void }) => (
    <div data-testid={`user-card-${user.id}`}>
      {user.name}
      <button onClick={() => onViewDetails(user.id)}>View Details</button>
    </div>
  ),
}));

jest.mock("../modules/users/components/UserSearch", () => ({
  UserSearch: () => <div data-testid="user-search">Search Component</div>,
}));

jest.mock("../modules/users/components/UserModal", () => ({
  UserModal: ({ userId, onClose }: { userId: number; onClose: () => void }) => (
    <div data-testid="user-modal">
      User Modal for ID: {userId}
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe("UserList Component", () => {
  const mockUsers: User[] = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ];

  const mockedUseUsers = useUsers as unknown as jest.MockedFunction<() => UseUsersReturn>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays a loading indicator during a data request", () => {
    mockedUseUsers.mockReturnValue({
      users: [],
      isLoading: true,
      error: false,
    });

    render(<UserList />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.getByText("Завантаження користувачів...")).toBeInTheDocument();
  });

  test("displays an error message if the request failed", () => {
    mockedUseUsers.mockReturnValue({
      users: [],
      isLoading: false,
      error: true,
    });

    render(<UserList />);

    expect(screen.getByText("Помилка завантаження.")).toBeInTheDocument();
  });

  test("displays a 'no users found' message when there are no users and no error", () => {
    mockedUseUsers.mockReturnValue({
      users: [],
      isLoading: false,
      error: false,
    });

    render(<UserList />);

    expect(screen.getByText("Користувачів не знайдено")).toBeInTheDocument();
  });

  test("displays a list of users if the data is successfully uploaded", () => {
    mockedUseUsers.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: false,
    });

    render(<UserList />);

    expect(screen.getByTestId("virtual-list")).toBeInTheDocument();
    expect(screen.getByTestId("user-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("user-card-2")).toBeInTheDocument();
    expect(screen.getByTestId("user-card-3")).toBeInTheDocument();
    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("User 2")).toBeInTheDocument();
    expect(screen.getByText("User 3")).toBeInTheDocument();
  });

  test("includes a search component when displaying a list of users", () => {
    mockedUseUsers.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: false,
    });

    render(<UserList />);

    expect(screen.getByTestId("user-search")).toBeInTheDocument();
  });

  test('opens a modal window with user details when clicking on "View Details"', async () => {
    mockedUseUsers.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: false,
    });

    render(<UserList />);

    expect(screen.queryByTestId("user-modal")).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByText("View Details")[0]);

    expect(screen.getByTestId("user-modal")).toBeInTheDocument();
    expect(screen.getByText("User Modal for ID: 1")).toBeInTheDocument();
  });

  test("closes the modal window when clicking the 'Close' button", async () => {
    mockedUseUsers.mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: false,
    });

    render(<UserList />);

    fireEvent.click(screen.getAllByText("View Details")[0]);
    expect(screen.getByTestId("user-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close"));

    await waitFor(() => {
      expect(screen.queryByTestId("user-modal")).not.toBeInTheDocument();
    });
  });
});
