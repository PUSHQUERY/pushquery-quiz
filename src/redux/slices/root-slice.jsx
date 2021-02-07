import { createSlice } from "@reduxjs/toolkit";
import { firebase } from "../../firebase/config";

const rootSlice = createSlice({
  name: "rootSlice",
  initialState: {
    rootSlice: {
      view: firebase.auth().currentUser ? "LOGGED_IN" : "FIRST_NAME",
      attemptInvisibleVerification: true,
      verificationId: "",
      userFirstName: "",
      subject: "Black Holes",
      phoneNumber: "",
    },
  },
  reducers: {
    view: (state, action) => {
      state.rootSlice.view = action.payload;
    },
    verificationId: (state, action) => {
      state.rootSlice.verificationId = action.payload;
    },
    userFirstName: (state, action) => {
      state.rootSlice.userFirstName = action.payload;
    },
    phoneNumber: (state, action) => {
      state.rootSlice.phoneNumber = action.payload;
    },
  },
});

export const rootSliceReducer = rootSlice.reducer;

export const {
  view,
  verificationId,
  userFirstName,
  phoneNumber,
} = rootSlice.actions;
