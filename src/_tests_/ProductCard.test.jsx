import { render, screen } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

const mockProduct = {
  id: "1",
  imgUrl: "https://via.placeholder.com/150",
  model: "Model X",
  brand: "Brand Y",
  price: "99.99"
};

const mockOnClick = vi.fn();

test("renders product card with product details", () => {
  render(<ProductCard product={mockProduct} onClick={mockOnClick} />);

  const image = screen.getByAltText(mockProduct.model);
  expect(image).toBeInTheDocument();

  const text = screen.getByText(/Model X/);
  expect(text).toBeInTheDocument();
});
