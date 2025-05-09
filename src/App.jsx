import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./theme/theme.js";

function App() {
  return (
    <ChakraProvider theme={system}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
