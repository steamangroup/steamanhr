import { toggleChangeAction } from "../../../redux/reducer";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function EmployeeAction() {
  const router = useRouter();
  const visible = useSelector((state) => state.app.client.showAddForm);

  const dispatch = useDispatch();
  const OpenForm = () => {
    //updating value of the state
    //dispatch(toggleChangeAction());

    console.log(visible);
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
