import React, { Fragment, useReducer } from "react";

import { useSelector } from "react-redux";

import AddLeaveForm from "./AddLeaveForm";
import UpdateLeaveForm from "./UpdateLeaveForm";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

function LeaveForm() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const formId = useSelector((state) => state.app.client.formId);

  return (
    <Fragment>
      {!formId ? (
        <AddLeaveForm formData={formData} setFormData={setFormData} />
      ) : (
        <UpdateLeaveForm
          formId={formId}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </Fragment>
  );
}

export default LeaveForm;
