import React from "react";
import { View, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// FIREBASE CONFIGURATION
// import { firebase } from "../../firebase/config";

import {
  handleQuestionAnswer,
  questionCount,
  view,
} from "../../../redux/slices/quiz-slice";

const buttonOptions = ["a", "b", "c", "d"];
export default function Question() {
  const dispatch = useDispatch();

  const quizSlice = useSelector((state) => state.quizSlice);
  const quiz = quizSlice.quiz;
  const resultsCount = quizSlice.results.length;

  const handleAnswer = (answer) => {
    dispatch(handleQuestionAnswer({ answer }));
  };

  const handleNextQuestion = () => {
    if (resultsCount === 12) {
      dispatch(view('RESULTS'));
    } else {
      dispatch(questionCount(quizSlice.questionCount + 1));
    }
  };

  return (
    <View>
      {resultsCount === quizSlice.questionCount && (
        <Text>{quiz[quizSlice.questionCount].question_text}</Text>
      )}
      {resultsCount === quizSlice.questionCount &&
        buttonOptions.map((answer, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => handleAnswer(answer)}
              style={{
                color: "blue",
                fontSize: 17,
                textAlign: "center",
                margin: 20,
              }}
            >
              <Text>{answer}</Text>
              <Text>{quiz[quizSlice.questionCount].options[answer]}</Text>
            </Pressable>
          );
        })}
      {resultsCount !== quizSlice.questionCount && (
        <Text>
          Correct answer is:{" "}
          {
            quiz[quizSlice.questionCount].options[
              quiz[quizSlice.questionCount].answer.correct
            ]
          }
        </Text>
      )}
      {resultsCount !== quizSlice.questionCount && (
        <Text>{quiz[quizSlice.questionCount].answer.details}</Text>
      )}
      {resultsCount !== quizSlice.questionCount && (
        <Text>{quiz[quizSlice.questionCount].answer.source}</Text>
      )}
      {resultsCount !== quizSlice.questionCount && (
        <Pressable
          onPress={handleNextQuestion}
          style={{
            color: "blue",
            fontSize: 17,
            textAlign: "center",
            margin: 20,
          }}
        >
          <Text>Next Question</Text>
        </Pressable>
      )}
    </View>
  );
}
