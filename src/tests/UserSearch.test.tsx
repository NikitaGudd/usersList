import { UserSearch } from "@/modules/users/components/UserSearch";
import { useUserStore } from "@/modules/users/store/userStore";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("@/modules/users/store/userStore", () => ({
  useUserStore: jest.fn(),
}));

jest.mock("lodash", () => ({
  ...jest.requireActual("lodash"),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  debounce: (fn: Function) => {
    function debouncedFn(...args: unknown[]) {
      return fn(...args);
    }
    debouncedFn.cancel = jest.fn();
    return debouncedFn;
  },
}));

const mockedUseUserStore = useUserStore as jest.MockedFunction<
  typeof useUserStore
>;

interface UserStoreState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

describe("UserSearch", () => {
  const mockSetSearchQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseUserStore.mockReturnValue({
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
    } as UserStoreState);
  });

  it("renders search input with correct placeholder", () => {
    render(<UserSearch />);

    const searchInput = screen.getByPlaceholderText(
      "Пошук за ім'ям або email...",
    );
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("type", "text");
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
    render(<UserSearch />);

    const searchInput = screen.getByPlaceholderText(
      "Пошук за ім'ям або email...",
    );

    fireEvent.change(searchInput, { target: { value: "something" } });
    fireEvent.change(searchInput, { target: { value: "" } });

    expect(mockSetSearchQuery).toHaveBeenCalledWith("");
  });

  it("updates input value when text is entered", () => {
    render(<UserSearch />);

    const searchInput = screen.getByPlaceholderText(
      "Пошук за ім'ям або email...",
    ) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: "updated query" } });

    expect(searchInput.value).toBe("updated query");
  });
});
