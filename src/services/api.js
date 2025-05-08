export const fetchProducts = async () => {
  const response = await fetch("https://itx-frontend-test.onrender.com/api/product");
  if (!response.ok) {
    throw new Error("Error in network response");
  }
  return await response.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`https://itx-frontend-test.onrender.com/api/product/${id}`);
  return res.json();
};

export const addToCart = async ({ id, colorCode, storageCode }) => {
  const res = await fetch("https://itx-frontend-test.onrender.com/api/product/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, colorCode, storageCode })
  });
  return res.json();
};
