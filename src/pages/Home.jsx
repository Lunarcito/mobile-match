import React, { useState, useEffect } from "react";
import { Box, Input, Heading, Center, Spinner, Text, SimpleGrid } from "@chakra-ui/react";
import { fetchProducts } from "../services/api";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

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
        <SimpleGrid minChildWidth="250px" spacing={5}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product.id)}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default Home;
