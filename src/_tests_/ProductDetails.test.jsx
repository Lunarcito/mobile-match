import { render, screen, waitFor } from "@testing-library/react";
import ProductDetails from "../pages/ProductDetails";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useCart } from "../context/CartContext";
import * as api from "../services/api";

vi.mock("../context/CartContext", () => ({
  useCart: vi.fn()
}));

vi.mock("../services/api", () => ({
  fetchProductById: vi.fn(),
  addToCart: vi.fn()
}));

describe("ProductDetails", () => {
  const mockUpdateCartCount = vi.fn();
  const mockNavigate = vi.fn();
  const productData = {
    id: "1",
    imgUrl: "https://via.placeholder.com/150",
    brand: "Brand X",
    model: "Model Y",
    price: "999.99",
    options: {
      colors: [{ code: "red", name: "Red" }],
      storages: [{ code: "64gb", name: "64GB" }]
    },
    cpu: "2.5GHz",
    ram: "8GB",
    os: "Android",
    displayResolution: "1080p",
    battery: "4000mAh",
    primaryCamera: ["12MP"],
    secondaryCamera: ["8MP"],
    dimensions: "150 x 75 x 8 mm",
    weight: "200"
  };

  beforeEach(() => {
    useCart.mockReturnValue({ updateCartCount: mockUpdateCartCount });
  });

  it("should display loading spinner while fetching data", () => {
    api.fetchProductById.mockResolvedValueOnce(productData);

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("should display error message when product is not found", async () => {
    api.fetchProductById.mockRejectedValueOnce(new Error("Product not found"));

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Product not found or failed to load.")).toBeInTheDocument()
    );
  });

  it("should render product details when data is successfully fetched", async () => {
    api.fetchProductById.mockResolvedValueOnce(productData);

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(productData.brand)).toBeInTheDocument());
    expect(screen.getByText(productData.model)).toBeInTheDocument();
    expect(screen.getByText(`$${productData.price}`)).toBeInTheDocument();
  });

  it("should show product options (color and storage)", async () => {
    api.fetchProductById.mockResolvedValueOnce(productData);

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const colorSelect = screen.getByRole("combobox", { name: /color/i });
      const storageSelect = screen.getByRole("combobox", { name: /storage/i });

      expect(colorSelect).toBeInTheDocument();
      expect(storageSelect).toBeInTheDocument();
    });
  });
});
