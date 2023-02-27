import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/layout";
import EmployeeForm from "@/components/employees/NewEmployee/Form";
import { useState } from "react";
import EmployeeAction from "@/components/employees/NewEmployee/EmployeeActions";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //Toggle the form
  const [visible, setVisible] = useState(false);
  const handler = () => {
    setVisible(!visible);
  };
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push("/login"), 1000);
  }, []);

  return (
    <>
      <Layout></Layout>
    </>
  );
}
