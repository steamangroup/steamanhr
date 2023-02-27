import EmployeeProfile from "@/components/employees/NewEmployee/EmployeeProfile";
import Layout from "@/components/layout";
import React, { useReducer } from "react";
import { useSelector } from "react-redux";

export default function ProfileEmployee() {
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
        <EmployeeProfile
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
