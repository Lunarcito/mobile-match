import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "../pages/Home";
import { MemoryRouter } from "react-router-dom";
import * as api from "../services/api";
import { vi } from "vitest";

vi.mock("../services/api", () => ({
  fetchProducts: vi.fn()
}));

vi.mock("../context/CartContext", () => ({
  useCart: () => ({
    cartCount: 0,
    updateCartCount: vi.fn()
  })
}));

describe("Home", () => {
  const mockProducts = [
    {
      id: "1",
      brand: "Apple",
      model: "iPhone 13"
    },
    {
      id: "2",
      brand: "Samsung",
      model: "Galaxy S21"
    },
    {
      id: "3",
      brand: "Google",
      model: "Pixel 6"
    }
  ];

  beforeEach(() => {
    api.fetchProducts.mockResolvedValue(mockProducts);
  });

  it("filters products based on search input", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/iPhone 13/i)).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search products/i);

    fireEvent.change(searchInput, { target: { value: "pixel" } });

    await waitFor(() => {
      expect(screen.getByText(/Pixel 6/i)).toBeInTheDocument();
      expect(screen.queryByText(/iPhone 13/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Galaxy S21/i)).not.toBeInTheDocument();
    });
  });
});
