import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/layout";
import EmployeeForm from "@/components/employees/NewEmployee/Form";
import { useState } from "react";
import EmployeeAction from "@/components/employees/NewEmployee/EmployeeActions";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //Toggle the form
  const [visible, setVisible] = useState(false);
  const handler = () => {
    setVisible(!visible);
  };
  return (
    <>
      <Layout>
        {/***** <EmployeeAction handleClick={handler} />* */}
        {visible ? <EmployeeForm></EmployeeForm> : <></>}
      </Layout>
    </>
  );
}
