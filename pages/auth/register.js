import { createUser } from "@/lib/helper/user";
import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Image,
  VStack,
  Button,
  Text,
  Link,
  useToast,
  Flex,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const BASE_URL = "http://localhost:3000/";
const NETLIFY_URL = "https://steamanhr.netlify.app/";

export default function Register() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toast = useToast();
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (userData.password !== userData.confirmPassword) {
      return toast({
        title: "Password mismatch",
        description: "Password does not match confirmation password ",
        status: "error",
        duration: 1200,
        isClosable: true,
        position: "top-right",
      });
    } else if (
      userData.firstname === "" ||
      userData.lastname === "" ||
      userData.email === "" ||
      userData.password === "" ||
      userData.confirmPassword === ""
    ) {
      return toast({
        title: "Error",
        description: "Field must not be blank",
        status: "error",
        duration: 1200,
        isClosable: true,
        position: "top-right",
      });
    } else {
      //let { email, password, confirmPassword } = userData;
      //const model = {
      //email: email,
      //password: password,
      //confirmPassword: confirmPassword,
      //};
      //addMutation.mutate(model);
      //if (addMutation.isError) return <div>Error.......</div>;
      //if (addMutation.isLoading) return <div>Loading.....</div>;
      //if (addMutation.isSuccess) return;
      //toast({
      //title: "Success",
      //description: "Account created successfully",
      //status: "success",
      //duration: 1200,
      //isClosable: true,
      //position: "top-right",
      //});

      await fetch(`${NETLIFY_URL}api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (response.status === 200) {
            toast({
              title: "Success",
              description: "Account created successfully",
              status: "success",
              duration: 1200,
              isClosable: true,
              position: "top-right",
            });
            const json = response.json();
            return json;
          } else {
            toast({
              title: "Error",
              description: "Account creation unsuccessful",
              status: "error",
              duration: 1200,
              isClosable: true,
              position: "top-right",
            });

            // const json = response.json();
            //console.log(json);
            return router.push("/auth/register");
          }
        })
        .then((data) => {
          console.log(data);
          if (data) return router.push("/auth/login");
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };

  return (
    <Flex maxH="100vh" bg="white">
      <Center
        m="7% auto"
        h={500}
        //border="1px solid #dddd"
        borderRadius={10}
        px={10}
        //bg="white"
      >
        <VStack pb={10} mb={5}>
          <Image
            src="/hr_logo.png"
            boxSize="150px"
            objectFit="contain"
            alt=""
          />

          <FormControl>
            <HStack>
              <VStack>
                <FormLabel alignSelf="start">
                  First name
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    *
                  </span>
                </FormLabel>
                <Input
                  type="text"
                  width={250}
                  onChange={handleChange}
                  //placeholder="admin@steamangroup.com"
                  name="firstname"
                  value={userData.firstname}
                  bg="#F5F5F5"
                  h={45}
                  placeholder="Enter first name"
                />
              </VStack>
              <VStack>
                <FormLabel alignSelf="start">
                  Last name{" "}
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    *
                  </span>
                </FormLabel>
                <Input
                  type="text"
                  width={250}
                  onChange={handleChange}
                  //placeholder="admin@steamangroup.com"
                  name="lastname"
                  value={userData.lastname}
                  bg="#F5F5F5"
                  h={45}
                  placeholder="Enter last name"
                />
              </VStack>
            </HStack>
            <FormLabel mt={5}>
              Email{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                *
              </span>
            </FormLabel>
            <Input
              type="email"
              width={500}
              onChange={handleChange}
              //placeholder="admin@steamangroup.com"
              name="email"
              value={userData.email}
              bg="#F5F5F5"
              h={45}
              mb={5}
              placeholder="Enter work email"
            />
            <FormLabel>
              Password{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                *
              </span>
            </FormLabel>
            <Input
              type="password"
              onChange={handleChange}
              value={userData.password}
              name="password"
              bg="#F5F5F5"
              h={45}
              mb={5}
              placeholder="Enter password"
            />
            <FormLabel>
              Confirm Password{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                *
              </span>
            </FormLabel>
            <Input
              type="password"
              onChange={handleChange}
              value={userData.confirmPassword}
              name="confirmPassword"
              bg="#F5F5F5"
              h={45}
              placeholder="Enter confirmed password"
            />
            <VStack mt={5} spacing={3}>
              <Button
                bg="#0b665c"
                width={500}
                onClick={handleSubmit}
                color="white"
                h={45}
                _hover={{
                  bg: "#0b665c",
                }}
              >
                Sign up
              </Button>
              <Link href="/auth/login">Already a user ? Login</Link>
            </VStack>
          </FormControl>
        </VStack>
      </Center>
    </Flex>
  );
}
