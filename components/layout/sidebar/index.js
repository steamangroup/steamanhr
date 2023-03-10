import { getUser } from "@/lib/helper/user";
import {
  CalendarIcon,
  ChatIcon,
  EditIcon,
  EmailIcon,
  HamburgerIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import {
  VStack,
  Box,
  Button,
  Text,
  HStack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Layout from "..";
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

  if (isLoading)
    return (
      <Layout>
        <Center mt={200}>
          <Spinner size="md" color="teal.300" />;
        </Center>
        ;
      </Layout>
    );

  if (isError)
    return (
      <Layout>
        <Center mt={200}>
          <Spinner size="md" color="red.300" />;
        </Center>
      </Layout>
    );

  let { role, _id } = data;
  console.log("Current user role");
  console.log(role);
  return (
    <VStack spacing={5} position="fixed">
      <Box pb="1.875rem">
        <Logo />
      </Box>
      <VStack spacing={0} flex={1} alignItems="stretch">
        {role == "ADMIN" ? (
          <VStack spacing={8} alignItems="start">
            <HStack
              _hover={linkHoverStyles}
              px="0.7rem"
              py="0.385rem"
              borderRadius="0.25rem"
              spacing={4}
            >
              <HamburgerIcon color="white" />
              <Text
                as={Link}
                fontSize="0.875rem"
                fontWeight="500"
                color="white"
                cursor="default"
                href="/user/[username]"
              >
                Dashboard
              </Text>
            </HStack>

            <HStack
              _hover={linkHoverStyles}
              px="0.7rem"
              py="0.385rem"
              borderRadius="0.25rem"
              spacing={4}
            >
              <ChatIcon color="white" />
              <Text
                as={Link}
                fontSize="0.875rem"
                fontWeight="500"
                color="white"
                cursor="default"
                href="/employees"
              >
                Employees
              </Text>
            </HStack>

            <HStack
              _hover={linkHoverStyles}
              px="0.5rem"
              py="0.385rem"
              borderRadius="0.25rem"
              spacing={4}
            >
              <InfoOutlineIcon color="white" />
              <Text
                as={Link}
                fontSize="0.875rem"
                fontWeight="500"
                color="white"
                cursor="default"
                href="/account"
              >
                Users
              </Text>
            </HStack>

            <HStack
              _hover={linkHoverStyles}
              px="0.5rem"
              py="0.385rem"
              borderRadius="0.25rem"
              spacing={4}
            >
              <CalendarIcon color="white" />
              <Text
                as={Link}
                fontSize="0.875rem"
                fontWeight="500"
                color="white"
                cursor="default"
                href="/leaves"
              >
                Leaves
              </Text>
            </HStack>

            <HStack
              _hover={linkHoverStyles}
              px="0.5rem"
              py="0.385rem"
              borderRadius="0.25rem"
              spacing={4}
            >
              <EmailIcon color="white" />
              <Text
                as={Link}
                fontSize="0.875rem"
                fontWeight="500"
                color="white"
                cursor="default"
                href="/notifications"
              >
                Notifications
              </Text>
            </HStack>

            <HStack
              _hover={linkHoverStyles}
              px="0.5rem"
              py="0.385rem"
              borderRadius="0.25rem"
              spacing={4}
            >
              <EditIcon color="white" />
              <Text
                as={Link}
                fontSize="0.875rem"
                fontWeight="500"
                color="white"
                cursor="default"
                href="/asset"
              >
                Assets
              </Text>
            </HStack>
          </VStack>
        ) : (
          <VStack spacing={10} alignItems="start">
            <HStack
              _hover={linkHoverStyles}
              px="0.7rem"
              py="0.385rem"
              borderRadius="0.25rem"
              spacing={4}
            >
              <HamburgerIcon color="white" />
              <Text
                as={Link}
                fontSize="0.875rem"
                fontWeight="500"
                color="white"
                cursor="default"
                href="/user/[username]"
              >
                Dashboard
              </Text>
            </HStack>

            <HStack
              _hover={linkHoverStyles}
              px="0.5rem"
              py="0.385rem"
              borderRadius="0.25rem"
              spacing={4}
            >
              <EmailIcon color="white" />
              <Text
                as={Link}
                fontSize="0.875rem"
                fontWeight="500"
                color="white"
                cursor="default"
                href="/notifications"
              >
                Notifications
              </Text>
            </HStack>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
}
