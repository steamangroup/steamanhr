import { Box } from "@chakra-ui/react";

export default ({ color }) => {
  return <Box w="0.625rem" h="0.625rem" borderRadius="9999px" bg={color} />;
};
