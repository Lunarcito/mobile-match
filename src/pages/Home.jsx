import React, { useState, useEffect } from "react";
import { Box, Input, Heading } from "@chakra-ui/react";
import { fetchProducts } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  const filteredProducts = products.filter(
    (product) => product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box p={3}>
      <Heading mb={3}>Product List</Heading>
      <Input
        placeholder="Search products"
        mb={3}
        maxW="300px"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredProducts.map((product) => (
        <Box key={product.id}>
          <p>{product.name}</p>
        </Box>
      ))}
    </Box>
  );
}

export default Home;
