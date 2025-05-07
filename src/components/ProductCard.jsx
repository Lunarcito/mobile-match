import React from "react";
import { Box, Text } from "@chakra-ui/react";

const ProductCard = ({ product, onClick }) => {
  return (
    <Box
      p={3}
      borderWidth="1px"
      borderRadius="md"
      textAlign="center"
      cursor="pointer"
      _hover={{ shadow: "md" }}
      onClick={() => onClick(product.id)}
    >
      <Text fontWeight="bold">{product.name}</Text>
    </Box>
  );
};

export default ProductCard;
