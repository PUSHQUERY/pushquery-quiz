import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase } from "../../firebase/config";

export const loadQuiz = createAsyncThunk("quiz/loadQuiz", async () => {
  try {
    const quiz = firebase.firestore().collection("quizes").doc("20210207");

    const storedQuiz = await quiz.get();
    if (storedQuiz.exists) {
      return storedQuiz.data();
    }
  } catch (error) {
    return "error" + error;
  }
});

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    view: "INITIAL",
    quiz: {},
  },
  reducers: {
    view: (state, action) => {
      state.view = action.payload;
    },
    quiz: (state, action) => {
      state.quiz = action.payload;
    },
  },
  extraReducers: {
    [loadQuiz.pending]: (state, action) => {
      state.view = "loading";
    },
    [loadQuiz.fulfilled]: (state, { payload }) => {
      state.quiz = payload;
      state.view = "success";
    },
    [loadQuiz.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const quizSliceReducer = quizSlice.reducer;

export const { view, quiz } = quizSlice.actions;
