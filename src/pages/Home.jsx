import React, { useState, useEffect } from "react";
import { Box, Input, Center, Spinner, Text, Grid, Flex } from "@chakra-ui/react";
import { fetchProducts } from "../services/api";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const fullName = product.brand + " " + product.model;
    return fullName.toLowerCase().includes(normalizedSearch);
  });

  return (
    <Box p={6}>
      <Header />
      <Flex justify="flex-end" mb={6}>
        <Box w={{ base: "100%", md: "25%" }}>
          <Input
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
      </Flex>
      {loading ? (
        <Center minH="200px">
          <Spinner size="lg" color="teal.500" />
        </Center>
      ) : filteredProducts.length === 0 ? (
        <Text>No products found</Text>
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)"
          }}
          gap={6}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product.id)}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Home;
