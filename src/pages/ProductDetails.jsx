import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Text, Spinner, Flex } from "@chakra-ui/react";
import { fetchProductById } from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <Flex height="100vh" justify="center" align="center">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );

  if (!product)
    return (
      <Box textAlign="center" p={6}>
        <Text color="red.500" fontSize="lg">
          Product not found or failed to load.
        </Text>
        <Button mt={4} onClick={() => navigate("/")}>
          ← Back to product list
        </Button>
      </Box>
    );

  return (
    <Box p={6}>
      <Button onClick={() => navigate("/")} colorScheme="teal" mb={4}>
        ← Back to product list
      </Button>
      <Text>Product details</Text>
    </Box>
  );
}

export default ProductDetails;
