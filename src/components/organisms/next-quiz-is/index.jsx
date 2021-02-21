import React from "react";
import { View, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// FIREBASE CONFIGURATION
// import { firebase } from "../../firebase/config";

import { view, resultsPageCounter } from "../../../redux/slices/quiz-slice";

export default function NextQuizIs() {
  const dispatch = useDispatch();

  return (
    <View>
      <Text>THE NEXT QUIZ IS ON...</Text>
    </View>
  );
}
