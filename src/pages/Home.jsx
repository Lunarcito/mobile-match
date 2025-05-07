import React, { useState, useEffect } from "react";
import { Box, Input, Heading, Center, Spinner, Text } from "@chakra-ui/react";
import { fetchProducts } from "../services/api";
import { useNavigate } from "react-router-dom";

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

  const filteredProducts = products.filter(
    (product) =>
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.model.toLowerCase().includes(searchQuery.toLowerCase())
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
        filteredProducts.map((product) => (
          <Box key={product.id} onClick={() => handleProductClick(product.id)} cursor="pointer">
            <p>
              {product.brand} - {product.model}
            </p>
          </Box>
        ))
      )}
    </Box>
  );
}

export default Home;
