import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "cartCount";
const EXPIRATION_KEY = "cartCountExpiration";
const EXPIRATION_MS = 60 * 60 * 1000;

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCount = localStorage.getItem(STORAGE_KEY);
    const storedExpiration = localStorage.getItem(EXPIRATION_KEY);

    const isExpired = !storedExpiration || Date.now() > Number(storedExpiration);

    if (storedCount && !isExpired) {
      setCartCount(Number(storedCount));
    } else {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(EXPIRATION_KEY);
    }
  }, []);

  const updateCartCount = (newCount) => {
    if (typeof newCount === "number" && !isNaN(newCount)) {
      setCartCount(newCount);
      localStorage.setItem(STORAGE_KEY, newCount.toString());
      localStorage.setItem(EXPIRATION_KEY, (Date.now() + EXPIRATION_MS).toString());
    } else {
      console.warn("updateCartCount received invalid value:", newCount);
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>{children}</CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
