import { VStack, Flex, Box, Text } from "@chakra-ui/react";
import React from "react";
import Indicator from "../config/indicator";

function LeaveOverView({
  pendingLeaveTime,
  approvedLeaveTime,
  remainingLeaveTime,
  rejectedLeaveTime,
  totalLeaveTime,
}) {
  return (
    <VStack
      sx={{
        borderWidth: "1px",
        borderRadius: "0.375rem",
        p: "0.75rem",
        alignItems: "stretch",
        maxW: "270px",
      }}
    >
      <VStack spacing="0.1900rem">
        <ListRow
          indicatorColor="gold"
          label="Pending leaves"
          time={pendingLeaveTime}
        />
        <ListRow
          indicatorColor="green"
          label="Approved leaves"
          time={approvedLeaveTime}
        />
        <ListRow
          indicatorColor="red"
          label="Rejected leaves"
          time={rejectedLeaveTime}
        />
        <ListRow
          indicatorColor="blue"
          label="Remaining leave days"
          time={remainingLeaveTime}
        />
        <ListRow
          indicatorColor="gray"
          label="Total leave days"
          time={totalLeaveTime}
        />
      </VStack>
    </VStack>
  );
}

const ListRow = ({ indicatorColor, label, time }) => {
  return (
    <Flex alignItems="center" w="100%" fontSize="0.875rem">
      <Box mr="1.25rem">
        <Indicator color={indicatorColor} />
      </Box>
      <Box flex={2}>
        <Text>{label}</Text>
      </Box>
      <Box>
        <Text>{time}</Text>
      </Box>
    </Flex>
  );
};

export default LeaveOverView;
