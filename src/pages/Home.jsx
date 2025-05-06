import React, { useState } from "react";
import { Box, Input, Heading } from "@chakra-ui/react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

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
    </Box>
  );
}

export default Home;
