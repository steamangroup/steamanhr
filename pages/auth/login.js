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
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

const BASE_URL = "http://localhost:3000/";

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
      await fetch(`${BASE_URL}api/auth/login`, {
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
    <Flex bg="#F5F5F5" minH="100vh">
      <Center
        m="7% auto"
        h={400}
        border="1px solid #dddd"
        borderRadius={10}
        px={10}
        bg="white"
      >
        <VStack pb={10}>
          <Image
            src="/hr_logo.png"
            boxSize="150px"
            objectFit="contain"
            alt=""
          />
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              width={320}
              onChange={handleChange}
              //placeholder="admin@steamangroup.com"
              name="email"
              value={userData.email}
            />
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={handleChange}
              value={userData.password}
              name="password"
            />
          </FormControl>
          <Button bg="#0b665c" color="white" width={320} onClick={handleSubmit}>
            Login
          </Button>
          <Link href="/auth/register">New user ?Sign up</Link>
        </VStack>
      </Center>
    </Flex>
  );
}
