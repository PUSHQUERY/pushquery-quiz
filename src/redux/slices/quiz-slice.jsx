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
    return error;
  }
});

export const handleQuestionAnswer = createAsyncThunk(
  "quiz/handleQuestionAnswer",
  async ({ answer }, { dispatch, getState }) => {
    try {
      const { quizSlice } = getState();
      if (answer === quizSlice.quiz[quizSlice.questionCount].answer.correct) {
        const data = [
          ...quizSlice.results,
          {
            correct: true,
            answer,
          },
        ];
        dispatch(results(data));
        dispatch(correctCount(quizSlice.correctCount + 1));
      } else {
        const data = [
          ...quizSlice.results,
          {
            correct: false,
            answer,
          },
        ];
        dispatch(results(data));
        dispatch(incorrectCount(quizSlice.incorrectCount + 1));
      }
    } catch (error) {
      return error;
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    view: "INITIAL",
    quiz: [],
    results: [],
    questionCount: 0,
    correctCount: 0,
    incorrectCount: 0,
    resultsPageCounter: 0,
    errorMsg: "",
  },
  reducers: {
    view: (state, action) => {
      state.view = action.payload;
    },
    quiz: (state, action) => {
      state.quiz = action.payload;
    },
    results: (state, action) => {
      state.results = action.payload;
    },
    questionCount: (state, action) => {
      state.questionCount = action.payload;
    },
    correctCount: (state, action) => {
      state.correctCount = action.payload;
    },
    incorrectCount: (state, action) => {
      state.incorrectCount = action.payload;
    },
    resultsPageCounter: (state, action) => {
      state.resultsPageCounter = action.payload;
    },
  },
  extraReducers: {
    [loadQuiz.pending]: (state, action) => {
      state.view = "loading";
    },
    [loadQuiz.fulfilled]: (state, { payload }) => {
      state.quiz = payload;
      // state.view = "QUIZ_LOADING";
    },
    [loadQuiz.rejected]: (state, action) => {
      state.status = "failed";
    },
    [handleQuestionAnswer.pending]: (state, action) => {
      state.errorMsg = "loading";
    },
    [handleQuestionAnswer.fulfilled]: (state, { payload }) => {
      // state.quiz = payload;
      // state.errorMsg = action;
    },
    [handleQuestionAnswer.rejected]: (state, action) => {
      state.errorMsg = action.error;
    },
  },
});

export const quizSliceReducer = quizSlice.reducer;

export const {
  view,
  quiz,
  correctCount,
  results,
  incorrectCount,
  questionCount,
  resultsPageCounter
} = quizSlice.actions;
