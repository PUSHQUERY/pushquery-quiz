import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase } from "../../firebase/config";

export const memberShipCheck = createAsyncThunk(
  'root/memberShipCheck',
  async (_, { dispatch, getState }) => {
    const { rootSlice } = getState();
    console.log('LINE 8');
    console.log('rootSlice.userObj', rootSlice.userObj);
    if (rootSlice.userObj?.membershipId && (Date.now() - 1614703800000 < 1800)) {
      dispatch(view('QUIZ_COUNTDOWN'));
    } else if (rootSlice.userObj?.membershipId && (Date.now() - 1614703800000 >= 1800)) {
      dispatch(view('GET_NOTIFIED'));
    } else {
      dispatch(view('MEMBERSHIP'));
    }
  }
)

export const submitVerificationCode = createAsyncThunk(
  "root/submitVerificationCode",
  async (_, { dispatch, getState }) => {
    const { rootSlice } = getState();
    const credential = firebase.auth.PhoneAuthProvider.credential(
      rootSlice.verificationId,
      rootSlice.verificationCode
    );
    // SIGN THE USER IN
    await firebase.auth().signInWithCredential(credential);
    const storedUser = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const storedUserDoc = await storedUser.get();
    // NOT CURRENT USER
    if (!storedUserDoc.exists) {
      firebase.auth().currentUser.updateProfile({ displayName: rootSlice.userFirstName })
      // UPDATE AND SAVE USER INFO IN DBB
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
        // STORE USER IN REDUX STORE
      const storedUser = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const storedUserDoc = await storedUser.get();
      // CHECK IF USER IS MEMBER
      dispatch(memberShipCheck());
      return storedUserDoc.data();
    } else {
      // CHECK IF USER IS MEMBER
      // dispatch(memberShipCheck());
      // return storedUserDoc.data();
      // if (rootSlice.userObj?.membershipId && (Date.now() - 1614703800000 < 1800)) {
      //   dispatch(view('QUIZ_COUNTDOWN'));
      // } else if (rootSlice.userObj?.membershipId && (Date.now() - 1614703800000 >= 1800)) {
      //   dispatch(view('GET_NOTIFIED'));
      // } else {
      //   dispatch(view('MEMBERSHIP'));
      // }
      console.log('storedUserDoc.data()', storedUserDoc.data());
    }
  }
);

export const loginCheck = createAsyncThunk(
  "root/loginCheck",
  async (_, { dispatch }) => {
    if (firebase.auth().currentUser) {
      // USER IS LOGGED IN
      dispatch(view("QUIZ_LOADING"));
      const userRef = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const user = await userRef.get();
      if (user) {
        dispatch(userObj(user.data()));
      }
    } else {
      // USER IS NOT LOGGED IN
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
    [loginCheck.rejected]: (state, action) => {
      state.view = "INITIAL";
      state.errorMsg = action.error.message;
    },
    [submitVerificationCode.fulfilled]: (state, action) => {
      // state.view = "QUIZ_LOADING";
      state.userObj = action.payload;
      console.log('LINE - 123');
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
