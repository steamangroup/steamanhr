import { hrMenu, userMenu } from "@/components/config/navigation";
import { getUser } from "@/lib/helper/user";
import { roles } from "@/utils/constants";
import { VStack, Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Logo from "./Logo";

export default function SideBar() {
  const linkHoverStyles = {
    bg: "#089d8d",
  };

  const userId = useSelector((state) => state.app.client.userId);

  console.log(`This  ${userId}`);

  const { isLoading, isError, data, error, status } = useQuery(
    ["users", userId],
    () => getUser(userId)
  );
  if (isLoading) return <div>loading.......</div>;
  if (isError) return <div>Error.......</div>;

  let { role } = data;
  console.log("Mine role");
  console.log(role);
  return (
    <VStack spacing={10} position="fixed">
      <Box pb="1.875rem">
        <Logo />
      </Box>
      <VStack spacing={0} flex={1} alignItems="stretch">
        {role == "ADMIN" ? (
          <VStack spacing={10} alignItems="start">
            <Text
              as={Link}
              _hover={linkHoverStyles}
              px="0.5rem"
              py="0.385rem"
              fontSize="0.875rem"
              fontWeight="500"
              borderRadius="0.25rem"
              color="white"
              cursor="default"
              href="/user/[username]"
            >
              Dashboard
            </Text>
            <Text
              as={Link}
              _hover={linkHoverStyles}
              px="0.5rem"
              py="0.385rem"
              fontSize="0.875rem"
              fontWeight="500"
              borderRadius="0.25rem"
              color="white"
              cursor="default"
              href="/employees"
            >
              Employees
            </Text>
            <Text
              as={Link}
              _hover={linkHoverStyles}
              px="0.5rem"
              py="0.385rem"
              fontSize="0.875rem"
              fontWeight="500"
              borderRadius="0.25rem"
              color="white"
              cursor="default"
              href="/leaves"
            >
              Leaves
            </Text>

            <Text
              as={Link}
              _hover={linkHoverStyles}
              px="0.5rem"
              py="0.385rem"
              fontSize="0.875rem"
              fontWeight="500"
              borderRadius="0.25rem"
              color="white"
              cursor="default"
              href="/notifications"
            >
              Notifications
            </Text>
            <Text
              _hover={linkHoverStyles}
              as={Link}
              px="0.5rem"
              py="0.385rem"
              fontSize="0.875rem"
              fontWeight="500"
              borderRadius="0.25rem"
              color="white"
              cursor="default"
              href="/account"
            >
              Users
            </Text>
          </VStack>
        ) : (
          <VStack spacing={10} alignItems="start">
            <Text
              as={Link}
              _hover={linkHoverStyles}
              px="0.5rem"
              py="0.385rem"
              fontSize="0.875rem"
              fontWeight="500"
              borderRadius="0.25rem"
              color="white"
              cursor="default"
              href="/user/[username]"
            >
              Dashboard
            </Text>

            <Text
              as={Link}
              _hover={linkHoverStyles}
              px="0.5rem"
              py="0.385rem"
              fontSize="0.875rem"
              fontWeight="500"
              borderRadius="0.25rem"
              color="white"
              cursor="default"
              href="/notifications"
            >
              Notifications
            </Text>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
}
