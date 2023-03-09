import { isAuth } from "@/lib/helper/jwt_helper";
import { loginUser } from "@/lib/helper/user";
import { userAction } from "@/redux/reducer";
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
  Box,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

const BASE_URL = "http://localhost:3000/";
const NETLIFY_URL = "https://steamanhr.netlify.app/";

export default function Login() {
  const dispatch = useDispatch();

  const toast = useToast();
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.email === "" || userData.password === "") {
      return toast({
        title: "Error",
        description: "Field must not be blank",
        status: "error",
        duration: 1200,
        isClosable: true,
        position: "top-right",
      });
    } else {
      await fetch(`${NETLIFY_URL}api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        Authorization: "",
        body: JSON.stringify(userData),
      })
        .then((response) => {
          console.log(response.headers);
          if (response.status === 200) {
            toast({
              title: "Success",
              description: "Login successful",
              status: "success",
              duration: 1200,
              isClosable: true,
              position: "top-right",
            });
            //router.push("/[username]");
            const json = response.json();
            return json;
          } else {
            toast({
              title: "Error",
              description: "Login unsuccessful",
              status: "error",
              duration: 1200,
              isClosable: true,
              position: "top-right",
            });
            const json = response.json();
            return json;
          }
        })
        .then((data) => {
          const { email, id } = data;
          dispatch(userAction(id));

          if (email == undefined /***&& isAuth*/) {
            router.push("/auth/login");
          } else {
            console.log(data);

            router.push(`/user/${[email]}`);
          }

          //alert("Sucess");
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };

  return (
    <Flex bg="white" minH="100vh">
      <Center
        m="7% auto"
        h={400}
        // w={100}
        // border="1px solid #dddd"
        borderRadius={10}
        px={10}
        //bg="white"
      >
        <VStack pb={10}>
          <Image
            src="/hr_logo.png"
            boxSize="150px"
            objectFit="contain"
            align=""
            alt=""
          />

          <FormControl>
            <FormLabel>
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
              width={420}
              h={50}
              mb={7}
              onChange={handleChange}
              //placeholder="admin@steamangroup.com"
              name="email"
              value={userData.email}
              bg="#F5F5F5"
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
              width={420}
              h={50}
              bg="#F5F5F5"
              mb={7}
              placeholder="Enter password"
            />
          </FormControl>
          <Flex flexDirection="column" gap={5}>
            <Button
              bg="#0b665c"
              color="white"
              width={420}
              h={50}
              onClick={handleSubmit}
              _hover={{
                bg: "#0b665c",
              }}
            >
              Login to steamanHR
            </Button>
            <Link href="/auth/register" textAlign="center">
              New user ? Sign up
            </Link>
          </Flex>
        </VStack>
      </Center>
    </Flex>
  );
}
