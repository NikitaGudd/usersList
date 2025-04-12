import { fireEvent, render, screen } from "@testing-library/react";

import { UserSearch } from "@/modules/users/components/UserSearch";
import { useUserStore } from "@/modules/users/store/userStore";

jest.mock("@/modules/users/store/userStore", () => ({
  useUserStore: jest.fn(),
}));

const mockedUseUserStore = useUserStore as jest.MockedFunction<typeof useUserStore>;

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

    const searchInput = screen.getByPlaceholderText("Пошук за ім'ям або email...");
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

    const searchInput = screen.getByPlaceholderText("Пошук за ім'ям або email...");

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

    const searchInput = screen.getByPlaceholderText("Пошук за ім'ям або email...");
    expect(searchInput).toHaveClass("w-full");
  });

  it("handles empty search query correctly", () => {
    mockedUseUserStore.mockReturnValue({
      searchQuery: "some query",
      setSearchQuery: mockSetSearchQuery,
    });

    render(<UserSearch />);

    const searchInput = screen.getByPlaceholderText("Пошук за ім'ям або email...");

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

  it("does not display clear button when search query is empty", () => {
    mockedUseUserStore.mockReturnValue({
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
    });

    render(<UserSearch />);

    const clearButton = screen.queryByLabelText("Очистити пошук");
    expect(clearButton).not.toBeInTheDocument();
  });

  it("displays clear button when search query is not empty", () => {
    mockedUseUserStore.mockReturnValue({
      searchQuery: "test query",
      setSearchQuery: mockSetSearchQuery,
    });

    render(<UserSearch />);

    const clearButton = screen.getByLabelText("Очистити пошук");
    expect(clearButton).toBeInTheDocument();
  });

  it("calls setSearchQuery with empty string when clear button is clicked", () => {
    mockedUseUserStore.mockReturnValue({
      searchQuery: "test query",
      setSearchQuery: mockSetSearchQuery,
    });

    render(<UserSearch />);

    const clearButton = screen.getByLabelText("Очистити пошук");
    fireEvent.click(clearButton);

    expect(mockSetSearchQuery).toHaveBeenCalledTimes(1);
    expect(mockSetSearchQuery).toHaveBeenCalledWith("");
  });

  it("has X icon in the clear button", () => {
    mockedUseUserStore.mockReturnValue({
      searchQuery: "test query",
      setSearchQuery: mockSetSearchQuery,
    });

    render(<UserSearch />);

    const clearButton = screen.getByLabelText("Очистити пошук");
    expect(clearButton).toBeInTheDocument();

    const buttonSVG = clearButton.querySelector("svg");
    expect(buttonSVG).toBeInTheDocument();
  });

  it("positions clear button correctly", () => {
    mockedUseUserStore.mockReturnValue({
      searchQuery: "test query",
      setSearchQuery: mockSetSearchQuery,
    });

    render(<UserSearch />);

    const clearButton = screen.getByLabelText("Очистити пошук");
    expect(clearButton.closest("button")).toHaveClass("absolute");
    expect(clearButton.closest("button")).toHaveClass("right-0");
    expect(clearButton.closest("button")).toHaveClass("top-1/2");
    expect(clearButton.closest("button")).toHaveClass("transform");
    expect(clearButton.closest("button")).toHaveClass("-translate-y-1/2");
  });
});
