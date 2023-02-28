import { Box, TabIndicator } from "@chakra-ui/react";

const Indicator = ({ color }) => {
  return <Box w="0.625rem" h="0.625rem" borderRadius="9999px" bg={color} />;
};

export default Indicator;
