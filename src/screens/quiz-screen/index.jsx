import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// FIREBASE CONFIGURATION
import { firebase } from "../../firebase/config";

// REDUX ACTIONS
import { view, quiz, loadQuiz } from "../../redux/slices/quiz-slice";

// COMPONENTS
import Question from "../../components/organisms/question";

export default function QuizScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(view("FIRST_NAME"));
    navigation.navigate("Home");
    firebase.auth().signOut();
  };

  const state = useSelector((state) => state);
  const quizSlice = useSelector((state) => state.quizSlice);

  React.useEffect(() => {
    dispatch(loadQuiz());
  }, []);
  console.log('quizSlice', quizSlice);
  console.log("state", state);
  return (
    <View style={styles.container}>
      {/* {rootSlice.view === "LOGGED_IN" && <Text>WE'RE IN!</Text>} */}
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
