//add actions here
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  client: {
    showAddForm: false,
    formId: undefined,
    userId: Cookies.get("userId"),
    deleteId: null,
    email: undefined,
    employeeId: Cookies.get("employeeId"),
    business: undefined,
    job: undefined,
    leaveDuration: undefined,
  },
};

export const ReducerSlice = createSlice({
  name: "steamanhr",
  initialState,
  reducers: {
    //action name
    toggleChangeAction: (state) => {
      //gettingimage.png current state and returning opposite state
      state.client.showAddForm = !state.client.showAddForm;
    },
    updateAction: (state, action) => {
      state.client.formId = action.payload;
    },

    deleteAction: (state, action) => {
      state.client.deleteId = action.payload;
    },
    userAction: (state, action) => {
      state.client.userId = action.payload;
    },
    userEmail: (state, action) => {
      state.client.email = action.payload;
    },
    employeeAction: (state, action) => {
      state.client.employeeId = action.payload;
    },
    BusinessUnitAction: (state, action) => {
      state.client.business = action.payload;
    },
    jobTitleAction: (state, action) => {
      state.client.job = action.payload;
    },
    leaveDurationAction: (state, action) => {
      state.client.leaveDuration = action.payload;
    },
  },
});

export const {
  toggleChangeAction,
  updateAction,
  deleteAction,
  userAction,
  userEmail,
  employeeAction,
  BusinessUnitAction,
  jobTitleAction,
  leaveDurationAction,
} = ReducerSlice.actions;
export default ReducerSlice.reducer;
