import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import { useState } from "react";
import Layout from "@/components/layout";
import EmployeeAction from "@/components/employees/NewEmployee/EmployeeActions";
import EmployeeForm from "@/components/employees/NewEmployee/Form";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction } from "../../redux/reducer";
import UpdateEmployeeForm from "@/components/employees/NewEmployee/UpdateEmployee";

const inter = Inter({ subsets: ["latin"] });

export default function AddEmployeeData() {
  return (
    <>
      <Layout>
        <EmployeeForm />
      </Layout>
    </>
  );
}
