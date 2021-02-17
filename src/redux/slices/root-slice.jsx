import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase } from "../../firebase/config";

export const submitVerificationCode = createAsyncThunk(
  "root/submitPhoneNumber",
  async (_, { dispatch, getState }) => {
    console.log("line 7 - root");
    const { rootSlice } = getState();
    dispatch(view("QUIZ_LOADING"));
    const credential = firebase.auth.PhoneAuthProvider.credential(
      rootSlice.verificationId,
      rootSlice.verificationCode
    );
    await firebase.auth().signInWithCredential(credential);
    const storedUser = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const storedUserDoc = await storedUser.get();
    if (!storedUserDoc.exists) {
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set({
          uid: firebase.auth().currentUser.uid,
          createdAt: new Date().getTime(),
          phoneNumber: rootSlice.phoneNumber,
          displayName: rootSlice.userFirstName,
        });
      const storedUser = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const storedUserDoc = await storedUser.get();
      return storedUserDoc.data();
    } else {
      return storedUserDoc.data();
    }
  }
);

export const loginCheck = createAsyncThunk(
  "root/loginCheck",
  async (_, { dispatch, getState }) => {
    if (firebase.auth().currentUser) {
      dispatch(view("QUIZ_LOADING"));
      const userRef = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const user = await userRef.get();
      return user.data();
    } else {
      dispatch(view("NAME"));
    }
  }
);

const rootSlice = createSlice({
  name: "root",
  initialState: {
    view: "INITIAL",
    attemptInvisibleVerification: true,
    verificationId: "",
    userFirstName: "",
    phoneNumber: "",
    verificationCode: "",
    userObj: {},
    errorMsg: "",
  },
  reducers: {
    view: (state, action) => {
      state.view = action.payload;
    },
    verificationId: (state, action) => {
      state.verificationId = action.payload;
    },
    userFirstName: (state, action) => {
      state.userFirstName = action.payload;
    },
    userPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    userObj: (state, action) => {
      state.userObj = action.payload;
    },
    setVerificationCode: (state, action) => {
      state.verificationCode = action.payload;
    },
  },
  extraReducers: {
    [loginCheck.fulfilled]: (state, action) => {
      // state.errorMsg = action;
      // state.view = "QUIZ_LOADING";
    },
    [loginCheck.rejected]: (state, action) => {
      state.view = "NAME";
      state.errorMsg = action.error.message;
    },
    [submitVerificationCode.fulfilled]: (state, action) => {
      state.errorMsg = action;
      state.view = "QUIZ_LOADING";
      state.userObj = action.payload;
    },
    [submitVerificationCode.rejected]: (state, action) => {
      state.view = "NAME";
      state.errorMsg = action.error.message;
    },
  },
});

export const rootSliceReducer = rootSlice.reducer;

export const {
  view,
  verificationId,
  userFirstName,
  userPhoneNumber,
  userObj,
  setVerificationCode,
} = rootSlice.actions;
