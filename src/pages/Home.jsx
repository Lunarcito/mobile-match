import React, { useState, useEffect } from "react";
import { Box, Input, Heading, Center, Spinner, Text } from "@chakra-ui/react";
import { fetchProducts } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
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

      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : filteredProducts.length === 0 ? (
        <Text>No products found</Text>
      ) : (
        filteredProducts.map((product) => <Box key={product.id}></Box>)
      )}
    </Box>
  );
}

export default Home;
