import { createListenerMiddleware } from "@reduxjs/toolkit";
import { toggleChangeAction, updateAction } from "./reducer";

const listenterMiddleware = createListenerMiddleware();

//listening to specific action
listenterMiddleware.startListening({
  actionCreator: toggleChangeAction,
  effect: async (action, listenerApi) => {
    //action to get the payload and the listener for dispatching anywhere
    listenerApi.dispatch(updateAction(action.payload));
  },
});

export default listenterMiddleware;
