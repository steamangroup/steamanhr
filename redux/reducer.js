//add actions here
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: {
    showAddForm: false,
    formId: undefined,
    userId: undefined,
    deleteId: null,
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
  },
});

export const { toggleChangeAction, updateAction, deleteAction, userAction } =
  ReducerSlice.actions;
export default ReducerSlice.reducer;
