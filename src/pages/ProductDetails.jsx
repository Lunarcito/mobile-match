import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Text,
  Spinner,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Link,
  Select
} from "@chakra-ui/react";
import { fetchProductById } from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [colorCode, setColorCode] = useState("");
  const [storageCode, setStorageCode] = useState("");

  useEffect(() => {
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        if (data.options?.colors?.length === 1) {
          setColorCode(data.options.colors[0].code);
        }
        if (data.options?.storages?.length === 1) {
          setStorageCode(data.options.storages[0].code);
        }
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
      <Link onClick={() => navigate("/")} color="teal.500" fontWeight="bold">
        ← Back to product list
      </Link>

      <Flex mt={6} direction={{ base: "column", md: "row" }} justify="space-between" gap={8}>
        <Flex flex={{ base: "1", md: "1" }} justify="center" align="center">
          <Image src={product.imgUrl} alt={product.model} maxW="300px" borderRadius="md" />
        </Flex>

        <Box flex={{ base: "1", md: "1" }}>
          <Heading size="lg" mb={2}>
            {product.brand} - {product.model}
          </Heading>
          <Text fontSize="xl" color="teal.600" mb={4}>
            ${product.price}
          </Text>

          <Heading size="md" mt={6} mb={2}>
            Technical Specs
          </Heading>
          <Box p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
            <List spacing={2} fontSize="sm">
              <ListItem>
                <strong>Brand:</strong> {product.brand}
              </ListItem>
              <ListItem>
                <strong>Model:</strong> {product.model}
              </ListItem>
              <ListItem>
                <strong>CPU:</strong> {product.cpu}
              </ListItem>
              <ListItem>
                <strong>RAM:</strong> {product.ram}
              </ListItem>
              <ListItem>
                <strong>OS:</strong> {product.os}
              </ListItem>
              <ListItem>
                <strong>Resolution:</strong> {product.displayResolution}
              </ListItem>
              <ListItem>
                <strong>Battery:</strong> {product.battery}
              </ListItem>
              <ListItem>
                <strong>Cameras:</strong>{" "}
                {[...(product.primaryCamera || []), ...(product.secondaryCamera || [])].join(" ")}
              </ListItem>
              <ListItem>
                <strong>Dimensions:</strong> {product.dimensions || product.dimentions}
              </ListItem>
              <ListItem>
                <strong>Weight:</strong> {product.weight}g
              </ListItem>
            </List>
          </Box>
          <Flex gap={4} mt={6} wrap="wrap">
            <Select
              placeholder="Select color"
              onChange={(e) => setColorCode(e.target.value)}
              value={colorCode}
              w={{ base: "100%", md: "48%" }}
            >
              {product.options?.colors.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </Select>

            <Select
              placeholder="Select storage"
              onChange={(e) => setStorageCode(e.target.value)}
              value={storageCode}
              w={{ base: "100%", md: "48%" }}
            >
              {product.options?.storages.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </Select>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default ProductDetails;
