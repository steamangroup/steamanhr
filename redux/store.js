import { configureStore } from "@reduxjs/toolkit";
import listenterMiddleware from "./listener";

import Reducer from "./reducer";

export const store = configureStore({
  reducer: {
    app: Reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenterMiddleware.middleware),
});
