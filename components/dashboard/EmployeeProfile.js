import { Avatar, HStack, VStack, Text, Flex } from "@chakra-ui/react";

export default function EmployeeProfile({
  fullName,
  jobTitle,
  workEmail,
  businessUnit,
}) {
  return (
    <HStack
      spacing="1.25rem"
      sx={{
        // borderWidth: '1px',
        // borderRadius: '0.375rem',
        // p: '0.75rem',
        alignItems: "stretch",
      }}
    >
      <Avatar
        size="2xl"
        name={fullName}
        bg="lightgray"
        // src='https://via.placeholder.com/200'
      />
      <VStack alignItems="start" spacing="0.0625rem">
        <Text fontSize="2xl" fontWeight={500}>
          {fullName}
        </Text>
        <Text fontSize="0.9375rem" color="gray">
          {jobTitle}
        </Text>
        <Text fontSize="0.9375rem" color="gray">
          {businessUnit}
        </Text>
        <Text fontSize="0.9375rem" mt="0.5rem !important">
          {workEmail}
        </Text>
      </VStack>
    </HStack>
  );
}
