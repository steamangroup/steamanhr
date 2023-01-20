import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, VStack, Box, Text, Badge } from "@chakra-ui/react";
import NewLeaveRequest from "./LeaveRequestAction";

export default function LeaveTable({ children }) {
  return (
    <Box mt="1.25rem">
      <NewLeaveRequest />
      <VStack
        spacing={2}
        sx={{
          borderWidth: "1px",
          borderRadius: "0.375rem",
          alignItems: "stretch",
          mt: 5,
        }}
      >
        <LeaveTable.Heading />
        {children}
      </VStack>
    </Box>
  );
}

LeaveTable.Heading = function () {
  return (
    <Flex
      sx={{
        px: "0.75rem",
        py: "0.125rem",
        color: "gray",
        gap: "0.625rem",
        fontSize: "0.75rem",
      }}
    >
      <Box flex={2}>
        <Text fontSize={15} fontWeight="400">
          Leave Type
        </Text>
      </Box>
      <Box flex={2}>
        <Text fontSize={15} fontWeight="400">
          Leave Status
        </Text>
      </Box>
      <Box flex={2}>
        <Text fontSize={15} fontWeight="400">
          Dates
        </Text>
      </Box>
      <Box flex={1}>
        <Text fontSize={15} fontWeight="400">
          Duration
        </Text>
      </Box>
      <Box flex={1}>
        <Text fontSize={15} fontWeight="400">
          Actions
        </Text>
      </Box>
    </Flex>
  );
};

LeaveTable.Row = function ({
  leaveType,
  leaveTypeColor,
  leaveStatus,
  leaveDates,
  leaveDuration,
}) {
  return (
    <Flex
      sx={{
        p: "0.75rem",
        w: "100%",
        gap: "0.625rem",
        borderTopWidth: "1px",
        fontSize: "0.875rem",
      }}
    >
      <Flex flex={2}>
        <Text whiteSpace="nowrap">{leaveType}</Text>
      </Flex>
      <Box flex={2}>
        <Badge mx="0.625rem" colorScheme={leaveTypeColor}>
          {leaveStatus}
        </Badge>
      </Box>
      <Box flex={2} textAlign="center">
        <Text>{leaveDates}</Text>
      </Box>
      <Box flex={2} textAlign="center">
        <Text>{leaveDuration}</Text>
      </Box>

      <Flex flex={1} gap={5}>
        <EditIcon />
        <DeleteIcon />
      </Flex>
    </Flex>
  );
};
