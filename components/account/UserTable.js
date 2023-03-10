import {
  Flex,
  VStack,
  Box,
  Text,
  useToast,
  Avatar,
  Tooltip,
} from "@chakra-ui/react";

import { useQuery, useQueryClient } from "react-query";

import { useRouter } from "next/router";
import { EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";

export default function UserAccountTable({ children }) {
  return (
    <Box mt="0.5rem">
      <VStack
        spacing={2}
        sx={{
          borderWidth: "1px",
          borderRadius: "0.375rem",
          alignItems: "stretch",
          mt: "1rem",
        }}
      >
        <UserAccountTable.Heading />
        {children}
      </VStack>
    </Box>
  );
}

UserAccountTable.Heading = function () {
  return (
    <Flex
      sx={{
        p: "0.5rem",

        color: "white",
        gap: "0.1rem",
        fontSize: "0.75rem",
        bg: "#419170",
      }}
    >
      <Box flex={0.2}></Box>
      <Box flex={0.7}>
        <Text fontSize={14} fontWeight="400">
          First name
        </Text>
      </Box>
      <Box flex={0.7}>
        <Text fontSize={14} fontWeight="400" textAlign="center">
          Last name
        </Text>
      </Box>
      <Box flex={1}>
        <Text fontSize={14} fontWeight="400" textAlign="center">
          Work Email
        </Text>
      </Box>
      <Box flex={1}>
        <Text fontSize={14} fontWeight="400" textAlign="center">
          Role
        </Text>
      </Box>

      <Box flex={0.7}>
        <Text fontSize={14} fontWeight="400" textAlign="center">
          Actions
        </Text>
      </Box>
    </Flex>
  );
};

UserAccountTable.Row = function ({ firstName, lastName, workEmail, role }) {
  return (
    <Flex
      sx={{
        p: "0.75rem",
        w: "100%",
        gap: "0.625rem",
        borderTopWidth: "1px",
        fontSize: "0.875rem",
        bg: "#fbfdfd",
        //
        _hover: {
          bg: "#e0f1ea",

          cursor: "pointer",
        },
        "&:nth-of-type(even)": {
          bg: "#eef7f3",
        },
      }}
    >
      <Flex>
        <Avatar
          size="sm"
          name={`${firstName} ${lastName}`}
          bg="lightgray"
          color="black"
          // src='https://via.placeholder.com/200'
        />
      </Flex>

      <Flex flex={2}>
        <Text whiteSpace="nowrap" fontSize={14}>
          {firstName}
        </Text>
      </Flex>
      <Flex flex={2}>
        <Text whiteSpace="nowrap" fontSize={14}>
          {lastName}
        </Text>
      </Flex>
      <Box fontSize={13} flex={2}>
        <Text>{workEmail}</Text>
      </Box>

      <Box flex={2} whiteSpace="nowrap" fontSize={13} textAlign="center">
        <Text>{role}</Text>
      </Box>

      <Flex flex={2} gap={5}>
        {/****
        <Tooltip label="View record">
          <ExternalLinkIcon onClick={viewEmployeeRecord} />
        </Tooltip>
        <Tooltip label="update record">
          <EditIcon
            onClick={OpenUpdateForm}
            color="blue.500"
            cursor="pointer"
          />
        </Tooltip>
        * */}
        {/*****
        <DeleteModal deletehandler={handleDelete} onDelete={onDelete} />
      ** */}
      </Flex>
    </Flex>
  );
};
