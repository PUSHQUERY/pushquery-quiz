import { configureStore } from "@reduxjs/toolkit";
import { phoneAuthReducer } from "./slices/phone-auth-slice";

export const store = configureStore({
  reducer: phoneAuthReducer,
});
