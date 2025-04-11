import { render, screen, fireEvent } from "@testing-library/react";
import { User } from "../modules/users";
import { UserCard } from "../modules/users/components/UserCard";

const mockUser: User = {
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

const mockOnViewDetails = jest.fn();

describe("UserCard", () => {
  beforeEach(() => {
    mockOnViewDetails.mockClear();
  });

  it("renders user name correctly", () => {
    render(<UserCard user={mockUser} onViewDetails={mockOnViewDetails} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders user email correctly", () => {
    render(<UserCard user={mockUser} onViewDetails={mockOnViewDetails} />);
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
  });

  it("calls onViewDetails with correct user ID when button is clicked", () => {
    render(<UserCard user={mockUser} onViewDetails={mockOnViewDetails} />);

    const detailsButton = screen.getByText("Детальніше");

    fireEvent.click(detailsButton);

    expect(mockOnViewDetails).toHaveBeenCalledTimes(1);
    expect(mockOnViewDetails).toHaveBeenCalledWith(1);
  });

  it("applies proper styling to the card", () => {
    render(<UserCard user={mockUser} onViewDetails={mockOnViewDetails} />);

    const card = screen.getByText("John Doe").closest(".mb-2");
    expect(card).toHaveClass("mb-2", "shadow-lg", "rounded-md");
  });

  it("applies proper styling to the button", () => {
    render(<UserCard user={mockUser} onViewDetails={mockOnViewDetails} />);

    const button = screen.getByText("Детальніше");
    expect(button).toHaveClass(
      "w-[200px]",
      "text-white",
      "bg-blue-500",
      "hover:bg-blue-300",
      "cursor-pointer",
      "mt-5",
    );
  });

  it("renders button with correct text", () => {
    render(<UserCard user={mockUser} onViewDetails={mockOnViewDetails} />);
    expect(screen.getByText("Детальніше")).toBeInTheDocument();
  });

  it("renders in a horizontal layout with content and button", () => {
    render(<UserCard user={mockUser} onViewDetails={mockOnViewDetails} />);

    const flexContainer = screen.getByText("John Doe").closest(".flex");
    expect(flexContainer).toHaveClass(
      "flex",
      "items-center",
      "justify-between",
    );
  });
});
