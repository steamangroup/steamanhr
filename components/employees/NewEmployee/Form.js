import React, { Fragment, useEffect, useReducer } from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import AddEmployeeForm from "./AddEmployee";
import UpdateEmployeeForm from "./UpdateEmployee";
import { useDispatch, useSelector } from "react-redux";
import { toggleChangeAction } from "../../../redux/reducer";

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
