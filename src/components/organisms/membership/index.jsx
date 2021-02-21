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

export default function Membership() {
  const dispatch = useDispatch();

  return (
    <View>
      <Text>Membership</Text>
    </View>
  );
}
