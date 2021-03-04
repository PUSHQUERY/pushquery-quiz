import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase } from "../../firebase/config";

export const loginCheck = createAsyncThunk(
  "root/loginCheck",
  async (_, { dispatch }) => {
    dispatch(loadQuiz());
    if (firebase.auth().currentUser) {
      // USER IS LOGGED IN
      dispatch(view('QUIZ_COUNTDOWN'));
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

export const loadQuiz = createAsyncThunk(
  "root/loadQuiz",
  async (_, { dispatch }) => {
    //TODO REPLACE WITH new Date().slice(-9) FOR DATE FORMATED QUIZES
    const quiz = await firebase.firestore().collection("quizes").doc("20210207").get();
    // console.log('quiz', quiz);
    if (Object.keys(quiz).length) {
      dispatch(isQuizStartingInTwoMin({ quiz: quiz.data() }));
      return quiz.data();
    }
  }
);

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
    const storedUser = await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get();
    // NOT CURRENT USER
    if (!storedUser.data().membershipId) {
      firebase
        .auth()
        .currentUser.updateProfile({ displayName: rootSlice.userFirstName });
      // UPDATE AND SAVE USER INFO IN DB
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
        .doc(firebase.auth().currentUser.uid)
        .get();
      // CHECK IF USER IS MEMBER
      dispatch(view('MEMBERSHIP'));
      return storedUser.data();
    } else {
      // CHECK IF USER IS MEMBER
      if (storedUser.data().membershipId) {
        dispatch(view('QUIZ_COUNTDOWN'))
      } else {
        dispatch(view('MEMBERSHIP'));
      }
      return storedUser.data();
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
    quiz: {},
    isQuizStartingInTwoMin: null,
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
    isQuizStartingInTwoMin: (state, action) => {
      //TODO CHANGE COUNTDOWN VALUE TO 2 MINUTES IN EPOCH, NOT 120 MINTES
      const two_hours = 7200;
      const two_minutes = 120;
      if (Date.now() - action.payload?.quiz?.epoch_start_time < two_hours) {
        state.isQuizStartingInTwoMin = true;
      } else {
        state.isQuizStartingInTwoMin = false;
      }
    },
  },
  extraReducers: {
    [submitVerificationCode.fulfilled]: (state, action) => {
      // state.view = "QUIZ_LOADING";
      state.userObj = action.payload;
    },
    [submitVerificationCode.pending]: (state, action) => {
      state.view = "QUIZ_COUNTDOWN";
      state.userObj = action.payload;
    },
    [submitVerificationCode.rejected]: (state, action) => {
      state.view = "NAME";
      state.errorMsg = action.error.message;
    },
    [loadQuiz.fulfilled]: (state, action) => {
      state.quiz = action.payload;
    },
    [loadQuiz.rejected]: (state, action) => {
      state.errorMsg = action;
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
  isQuizStartingInTwoMin,
} = rootSlice.actions;
