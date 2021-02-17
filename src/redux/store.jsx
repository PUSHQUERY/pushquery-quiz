import { configureStore } from "@reduxjs/toolkit";
import { rootSliceReducer } from "./slices/root-slice";
import { quizSliceReducer } from "./slices/quiz-slice";

const reducer = {
  quizSlice: quizSliceReducer,
  rootSlice: rootSliceReducer,
};
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});
