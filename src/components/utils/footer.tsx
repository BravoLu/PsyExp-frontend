import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box p={4} bg="orange.500" color="white" width="100%" textAlign="center">
      <Box>
        <Text as="b" fontSize={{ base: 10, sm: 5, md: 10, lg: 15 }}>
          &copy; 2023 Bravo's Studio. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
