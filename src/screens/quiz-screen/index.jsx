import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// FIREBASE CONFIGURATION
import { firebase } from "../../firebase/config";

// REDUX ACTIONS
import {
  view,
  handleQuestionAnswer,
  loadQuiz,
} from "../../redux/slices/quiz-slice";

// COMPONENTS
import Question from "../../components/organisms/question";
import Results from "../../components/organisms/results";
import Membership from "../../components/organisms/membership";
import NextQuizIs from "../../components/organisms/next-quiz-is";

export default function QuizScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(view("INITIAL"));
    navigation.navigate("Home");
    firebase.auth().signOut();
  };

  const state = useSelector((state) => state);
  const quizSlice = useSelector((state) => state.quizSlice);

  // React.useEffect(() => {
  //   if (quizSlice.quiz.length === 0) {
  //     dispatch(loadQuiz());
  //   }
  // }, [quizSlice]);

  return (
    <View style={styles.container}>
      {quizSlice.view === "QUIZ_LOADING" && <Question />}
      {quizSlice.view === "MEMBERSHIP" && <Membership />}
      {quizSlice.view === "RESULTS" && <Results />}
      {quizSlice.view === "NEXT_QUIZ_IS" && <NextQuizIs />}
      <TouchableOpacity
        onPress={handleSignOut}
        style={{
          color: "blue",
          fontSize: 17,
          textAlign: "center",
          margin: 20,
        }}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

// STYLE SHEET
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
