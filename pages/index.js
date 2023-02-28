import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/layout";
import EmployeeForm from "@/components/employees/NewEmployee/Form";
import { useEffect, useState } from "react";
import EmployeeAction from "@/components/employees/NewEmployee/EmployeeActions";
import { useRouter } from "next/router";
import { CircularProgress } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push("/auth/login"), 5000);
  }, []);

  return (
    <>
      <CircularProgress isIndeterminate color="green.300" />
    </>
  );
}
