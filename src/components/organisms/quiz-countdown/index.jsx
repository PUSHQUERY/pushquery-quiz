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

export default function QuizCountdown() {
  const dispatch = useDispatch();
  const rootSlice = useSelector((state) => state.rootSlice);

  const [counter, setCounter] = React.useState(rootSlice.quiz?.epoch_start_time)

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    return [
      h,
      m > 9 ? m : (h ? '0' + m : m || '0'),
      s > 9 ? s : '0' + s
    ].filter(Boolean).join(':');
  };

  React.useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  },[counter])

  console.log('rootSlice.quiz', rootSlice.quiz);
  return (
    <View>
      <Text>QuizCountdown</Text>
      <Text>The Quiz Begins In:</Text>
      <Text>{formatTime(Math.floor((counter - Date.now()) / 1000))}</Text>
    </View>
  );
}
