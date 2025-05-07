export const fetchProducts = async () => {
  const response = await fetch("https://itx-frontend-test.onrender.com/api/product");
  if (!response.ok) {
    throw new Error("Error in network response");
  }
  return await response.json();
};
