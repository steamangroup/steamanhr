import { VStack, Flex, Box, Text } from "@chakra-ui/react";
import React from "react";
import Indicator from "../config/indicator";

function LeaveOverView({
  pendingLeaveTime,
  approvedLeaveTime,
  remainingLeaveTime,
  totalLeaveTime,
}) {
  return (
    <VStack
      sx={{
        borderWidth: "1px",
        borderRadius: "0.375rem",
        p: "0.75rem",
        alignItems: "stretch",
        maxW: "250px",
      }}
    >
      <VStack spacing="0.0625rem">
        <ListRow
          indicatorColor="gold"
          label="Pending"
          time={pendingLeaveTime}
        />
        <ListRow
          indicatorColor="green"
          label="Approved"
          time={approvedLeaveTime}
        />
        <ListRow
          indicatorColor="blue"
          label="Remaining"
          time={remainingLeaveTime}
        />
        <ListRow indicatorColor="gray" label="Total" time={totalLeaveTime} />
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
      <Box flex={1}>
        <Text>{label}</Text>
      </Box>
      <Box>
        <Text>{time} Days</Text>
      </Box>
    </Flex>
  );
};

export default LeaveOverView;
