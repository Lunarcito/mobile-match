import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./theme/theme.js";

function App() {
  return (
    <ChakraProvider value={system}>
      <h1>Mobile Tech</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
