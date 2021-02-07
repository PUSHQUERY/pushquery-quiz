import { createSlice } from "@reduxjs/toolkit";
import { firebase } from "../../firebase/config";

const rootSlice = createSlice({
  name: "rootSlice",
  initialState: {
    rootSlice: {
      view: "INITIAL",
      attemptInvisibleVerification: true,
      verificationId: "",
      userFirstName: "",
      subject: "Black Holes",
      phoneNumber: "",
      userObj: {},
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
    userObj: (state, action) => {
      state.rootSlice.userObj = action.payload;
    },
  },
});

export const rootSliceReducer = rootSlice.reducer;

export const {
  view,
  verificationId,
  userFirstName,
  phoneNumber,
  userObj,
} = rootSlice.actions;
