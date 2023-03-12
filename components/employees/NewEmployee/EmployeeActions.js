import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";

import { useRouter } from "next/router";

export default function EmployeeAction() {
  const router = useRouter();

  const OpenForm = () => {
    // console.log(visible);
    router.push("employees/add");
  };

  return (
    <Flex justifyContent="flex-end">
      <Box></Box>

      <Box>
        <Button onClick={OpenForm} colorScheme="green" size="sm">
          Add Employee
        </Button>
      </Box>
    </Flex>
  );
}
