import React, { Fragment, useEffect, useReducer } from "react";

import AddEmployeeForm from "./AddEmployee";
import UpdateEmployeeForm from "./UpdateEmployee";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

function EmployeeForm() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const formId = useSelector((state) => state.app.client.formId);

  return (
    <Fragment>
      {!formId ? (
        <AddEmployeeForm formData={formData} setFormData={setFormData} />
      ) : (
        <UpdateEmployeeForm
          formId={formId}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </Fragment>
  );
}

export default EmployeeForm;
