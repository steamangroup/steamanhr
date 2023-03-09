import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/layout";
import EmployeeForm from "@/components/employees/NewEmployee/Form";
import { Fragment, useEffect, useState } from "react";
import EmployeeAction from "@/components/employees/NewEmployee/EmployeeActions";
import { Box, Center, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/auth/login");
    }, 500);
  }, []);

  return (
    <Box bg="#089d8d" h={400}>
      <Center>
        <Text fontSize={60} mt="10rem" color="white" fontWeight="bold">
          Welcome to{" "}
          <span
            style={{
              color: "#d4af37",
            }}
          >
            STEAMANHR
          </span>
        </Text>
      </Center>
    </Box>
  );
}
