import React from "react";
import { View, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// FIREBASE CONFIGURATION
// import { firebase } from "../../firebase/config";

import { view, resultsPageCounter } from "../../../redux/slices/quiz-slice";

export default function Results() {
  const dispatch = useDispatch();

  const quizSlice = useSelector((state) => state.quizSlice);
  const rootSlice = useSelector((state) => state.rootSlice);

  const handleNextResult = () => {
    if (quizSlice.resultsPageCounter === 11) {
      dispatch(view("NEXT_QUIZ_IS"));
    } else {
      dispatch(resultsPageCounter(quizSlice.resultsPageCounter + 1));
    }
  };

  return (
    <View>
      <Text>Results:</Text>
      {quizSlice.resultsPageCounter !== 12 && (
        <>
          <Text>
            {rootSlice.userObj.displayName
              ? `${rootSlice.userObj.displayName}, you answered ${quizSlice.correctCount} correctly!`
              : `You answered ${quizSlice.correctCount} correctly!`}
          </Text>
          <Text>
            {`For question number ${
              quizSlice.resultsPageCounter + 1
            }, you answered ${
              quizSlice.results[quizSlice.resultsPageCounter].correct
                ? "correctly"
                : "incorrectly"
            } with:`}
          </Text>
          <Text>{`Question: ${
            quizSlice.quiz[quizSlice.resultsPageCounter].question_text
          }`}</Text>
          <Text>{`Your answer: ${
            quizSlice.quiz[quizSlice.resultsPageCounter].options[
              quizSlice.results[quizSlice.resultsPageCounter].answer
            ]
          }`}</Text>
          {quizSlice.results[quizSlice.resultsPageCounter].correct == false && (
            <Text>{`
      The correct answer was: ${
        quizSlice.quiz[quizSlice.resultsPageCounter].options[
          quizSlice.quiz[quizSlice.resultsPageCounter].answer.correct
        ]
      }
      `}</Text>
          )}
        </>
      )}
      <Pressable
        onPress={handleNextResult}
        style={{
          color: "blue",
          fontSize: 17,
          textAlign: "center",
          margin: 20,
        }}
      >
        <Text>See the next answer!</Text>
      </Pressable>
    </View>
  );
}
