
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomerList from '../components/CustomerList'

// Mock fetch API
global.fetch = jest.fn();

describe("CustomerList Component", () => {
  const mockCustomers = [
    { id: 1, first_name: "John", last_name: "Doe", email: "john@example.com", city: "New York" },
    { id: 2, first_name: "Jane", last_name: "Smith", email: "jane@example.com", city: "Los Angeles" },
  ];

  const mockPagination = {
    current_page: 1,
    next_page: 2,
    prev_page: null,
    total_pages: 3,
    total_count: 40,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading state initially", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ customers: mockCustomers, pagination: mockPagination }))
    );
    
    render(<CustomerList />);
    
    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());
  });

  it("renders customer list on successful fetch", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ customers: mockCustomers, pagination: mockPagination }))
    );
    
    render(<CustomerList />);
    
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  it("shows error message on fetch failure", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));
    
    render(<CustomerList />);
    
    await waitFor(() => expect(screen.getByText("No customers found")).toBeInTheDocument());
  });

  it("handles pagination correctly", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ customers: mockCustomers, pagination: mockPagination }))
    );
    
    render(<CustomerList />);
    
    await waitFor(() => expect(screen.getByText("Page 1 of 3")).toBeInTheDocument());
    
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).not.toBeDisabled();
    
    userEvent.click(nextButton);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/v1/customers?page=2&per_page=20");
    });
  });
});
