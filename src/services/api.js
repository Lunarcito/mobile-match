export const fetchProducts = async () => {
  const cacheKey = "productsCache";
  const cacheExpirationKey = "productsCacheExpiration";
  const cacheTTL = 60 * 60 * 1000;

  const cachedData = localStorage.getItem(cacheKey);
  const cachedExpiration = localStorage.getItem(cacheExpirationKey);

  if (cachedData && cachedExpiration && Date.now() < Number(cachedExpiration)) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await fetch("https://itx-frontend-test.onrender.com/api/product");
    if (!response.ok) {
      throw new Error("Network response error");
    }
    const data = await response.json();

    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(cacheExpirationKey, (Date.now() + cacheTTL).toString());
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  const cacheKey = `product_${id}`;
  const cacheExpirationKey = `product_${id}_expiration`;
  const cacheTTL = 60 * 60 * 1000;

  const cachedData = localStorage.getItem(cacheKey);
  const cachedExpiration = localStorage.getItem(cacheExpirationKey);

  if (cachedData && cachedExpiration && Date.now() < Number(cachedExpiration)) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await fetch(`https://itx-frontend-test.onrender.com/api/product/${id}`);
    if (!response.ok) {
      throw new Error("Network response error");
    }
    const data = await response.json();

    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(cacheExpirationKey, (Date.now() + cacheTTL).toString());
    return data;
  } catch (error) {
    console.error(`Error fetching products details ${id}:`, error);
    throw error;
  }
};

export const addToCart = async ({ id, colorCode, storageCode }) => {
  const res = await fetch("https://itx-frontend-test.onrender.com/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, colorCode, storageCode })
  });
  return res.json();
};
