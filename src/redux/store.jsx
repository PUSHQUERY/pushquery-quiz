import { configureStore } from "@reduxjs/toolkit";
import { rootSliceReducer } from "./slices/root-slice";

export const store = configureStore({
  reducer: rootSliceReducer,
});
