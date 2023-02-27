import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/layout";
import EmployeeForm from "@/components/employees/NewEmployee/Form";
import { useEffect, useState } from "react";
import EmployeeAction from "@/components/employees/NewEmployee/EmployeeActions";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push("/auth/login"), 1000);
  }, []);

  return (
    <>
      <Layout></Layout>
    </>
  );
}
