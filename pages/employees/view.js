import UpdateEmployeeForm from "@/components/employees/NewEmployee/UpdateEmployee";
import ViewEmployeeForm from "@/components/employees/NewEmployee/ViewEmployee";
import Layout from "@/components/layout";
import React, { useReducer } from "react";
import { useSelector } from "react-redux";

export default function ViewEmployee() {
  const formReducer = (state, event) => {
    return {
      ...state,
      [event.target.name]: event.target.value,
    };
  };

  const [formData, setFormData] = useReducer(formReducer, {});
  const userId = useSelector((state) => state.app.client.userId);

  return (
    <Layout navHeading="Employee Profile">
      {userId ? (
        <ViewEmployeeForm
          // formData={formData}
          //setFormData={setFormData}
          userId={userId}
        />
      ) : (
        <div></div>
      )}
      ;
    </Layout>
  );
}
