import { createSlice } from "@reduxjs/toolkit";
import { firebase } from "../../firebase/config";

console.log(firebase.auth().currentUser);

const phoneAuthSlice = createSlice({
  name: "phoneAuthSlice",
  initialState: {
    phoneAuth: {
      view: firebase.auth().currentUser ? "LOGGED_IN" : "PHONE_INPUT",
      attemptInvisibleVerification: true,
      verificationId: '',
    },
  },
  reducers: {
    view: (state, action) => {
      state.phoneAuth.view = action.payload;
    },
    verificationId: (state, action) => {
      state.phoneAuth.verificationId = action.payload;
    },
  },
});

export const phoneAuthReducer = phoneAuthSlice.reducer;

export const {
  view,
  attemptInvisibleVerification,
  verificationId,
} = phoneAuthSlice.actions;
