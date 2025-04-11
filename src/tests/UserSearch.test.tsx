import { render, screen, fireEvent } from "@testing-library/react";
import { UserSearch } from "../modules/users/components/UserSearch";
import { useUserStore } from "../modules/users/store/userStore";

jest.mock("../modules/users/store/userStore", () => ({
  useUserStore: jest.fn(),
}));

const mockedUseUserStore = useUserStore as jest.MockedFunction<
  typeof useUserStore
>;

describe("UserSearch", () => {
  const mockSetSearchQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseUserStore.mockReturnValue({
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
    });
  });

  it("renders search input with correct placeholder", () => {
    render(<UserSearch />);

    const searchInput = screen.getByPlaceholderText(
      "Пошук за ім'ям або email...",
    );
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("type", "text");
  });

  it("displays current search query from store", () => {
    mockedUseUserStore.mockReturnValue({
      searchQuery: "test query",
      setSearchQuery: mockSetSearchQuery,
    });

    render(<UserSearch />);

    const searchInput = screen.getByPlaceholderText(
      "Пошук за ім'ям або email...",
    ) as HTMLInputElement;
    expect(searchInput.value).toBe("test query");
  });

  it("calls setSearchQuery when input value changes", () => {
    render(<UserSearch />);

    const searchInput = screen.getByPlaceholderText(
      "Пошук за ім'ям або email...",
    );

    fireEvent.change(searchInput, { target: { value: "john doe" } });

    expect(mockSetSearchQuery).toHaveBeenCalledTimes(1);
    expect(mockSetSearchQuery).toHaveBeenCalledWith("john doe");
  });

  it("applies correct styling to the search input", () => {
    render(<UserSearch />);

    const searchContainer = screen
      .getByPlaceholderText("Пошук за ім'ям або email...")
      .closest("div");
    expect(searchContainer).toHaveClass("mb-4");

    const searchInput = screen.getByPlaceholderText(
      "Пошук за ім'ям або email...",
    );
    expect(searchInput).toHaveClass("w-full");
  });

  it("handles empty search query correctly", () => {
    mockedUseUserStore.mockReturnValue({
      searchQuery: "some query",
      setSearchQuery: mockSetSearchQuery,
    });

    render(<UserSearch />);

    const searchInput = screen.getByPlaceholderText(
      "Пошук за ім'ям або email...",
    );

    fireEvent.change(searchInput, { target: { value: "" } });

    expect(mockSetSearchQuery).toHaveBeenCalledWith("");
  });

  it("preserves input value between renders", () => {
    const { rerender } = render(<UserSearch />);

    mockedUseUserStore.mockReturnValue({
      searchQuery: "updated query",
      setSearchQuery: mockSetSearchQuery,
    });

    rerender(<UserSearch />);

    const searchInput = screen.getByPlaceholderText(
      "Пошук за ім'ям або email...",
    ) as HTMLInputElement;
    expect(searchInput.value).toBe("updated query");
  });
});
