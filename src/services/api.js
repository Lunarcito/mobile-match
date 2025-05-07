export const fetchProducts = async () => {
  const response = await fetch("https://itx-frontend-test.onrender.com/api/product");
  if (!response.ok) {
    throw new Error("Error in network response");
  }
  return await response.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`/api/product/${id}`);
  return res.json();
};
