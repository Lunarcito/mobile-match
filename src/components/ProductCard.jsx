import React from "react";
import { Box, Text, Image, VStack, Flex } from "@chakra-ui/react";

const ProductCard = ({ product, onClick }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      cursor="pointer"
      p={4}
      bg="white"
      height="100%"
      transition="box-shadow 0.2s"
      _hover={{ shadow: "lg" }}
      onClick={() => onClick(product.id)}
    >
      <Flex direction="column" justify="space-between" height="100%">
        <VStack spacing={4} align="center">
          <Image
            src={product.imgUrl}
            alt={product.model}
            boxSize="150px"
            objectFit="contain"
            fallbackSrc="https://via.placeholder.com/150"
          />
          <Text fontWeight="bold" textAlign="center">
            {product.brand} {product.model}
          </Text>
          <Text color="teal.500" fontSize="lg">
            ${product.price}
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ProductCard;
