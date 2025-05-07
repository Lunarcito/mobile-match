import React from "react";
import { Box, Text, Image, VStack } from "@chakra-ui/react";

const ProductCard = ({ product, onClick }) => {
  return (
    <Box
      p={3}
      borderWidth="1px"
      borderRadius="md"
      textAlign="center"
      overflow="hidden"
      cursor="pointer"
      _hover={{ shadow: "md" }}
      onClick={() => onClick(product.id)}
    >
      <VStack spacing={3}>
        <Image src={product.imgUrl} alt={product.model} boxSize="150px" objectFit="contain" />
        <Text fontWeight="bold">
          {product.brand} {product.model}
        </Text>
        <Text color="teal.500" fontSize="lg">
          ${product.price}
        </Text>
      </VStack>
    </Box>
  );
};

export default ProductCard;
