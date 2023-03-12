import Layout from "@/components/layout";
import { getUser } from "@/lib/helper/user";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function UsersPage() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const { isLoading, isError, data } = useQuery(["users", id], () =>
    getUser(id)
  );

  if (isLoading)
    return (
      <Alert status="success">
        <AlertIcon />
        <AlertTitle>Fetching user data.......</AlertTitle>
        <AlertDescription>Just a few sconds</AlertDescription>
      </Alert>
    );
  if (isError)
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Could not fetch user data</AlertDescription>
      </Alert>
    );
  console.log("this is my data");
  console.log(data);
  const { firstname, lastname, role, email } = data;
  const username = `${firstname} ${lastname}`;
  console.log(lastname);
  return (
    <Layout navHeading="Account">
      <Flex>
        <Box mr={70}>
          <Avatar name={username} size="2xl" bg="lightgray" color="black" />
        </Box>

        <Box w={600}>
          <Stack spacing={7}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                size="sm"
                type="text"
                defaultValue={firstname}
                name="firstName"
                h={10}
                borderRadius={10}
                boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px;"
                //onChange={setFormData}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last name</FormLabel>
              <Input
                size="sm"
                type="text"
                defaultValue={lastname}
                name="lastName"
                h={10}
                borderRadius={10}
                boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px;"
                //onChange={setFormData}
              />
            </FormControl>
            <FormControl>
              <FormLabel>User role</FormLabel>
              <Input
                size="sm"
                type="text"
                defaultValue={role}
                name="role"
                h={10}
                borderRadius={10}
                boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px;"
                //onChange={setFormData}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                size="sm"
                type="text"
                defaultValue={email}
                name="firstName"
                h={10}
                borderRadius={10}
                boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px;"
                //onChange={setFormData}
              />
            </FormControl>
          </Stack>
        </Box>
      </Flex>
    </Layout>
  );
}
