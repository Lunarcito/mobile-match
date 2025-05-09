import React from "react";
import {
  Flex,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link as ChakraLink,
  Text
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
  const { cartCount } = useCart();
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <Box as="header" p={4} borderBottom="1px solid #e2e8f0" mb={6}>
      <Flex justify="space-between" align="center" wrap="wrap">
        <ChakraLink as={Link} to="/" fontSize="xl" fontWeight="bold" color="teal.500">
          📱 Mobile match
        </ChakraLink>
        <Breadcrumb separator=">" color="teal.500">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/" color="teal.500">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathnames.length === 2 && pathnames[0] === "product" && (
            <BreadcrumbItem isCurrentPage>
              <Text color="teal.500">Product Details</Text>
            </BreadcrumbItem>
          )}
        </Breadcrumb>

        <Box fontWeight="bold" color="teal.600">
          🛒 Cart: {cartCount} item{cartCount !== 1 ? "s" : ""}
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
