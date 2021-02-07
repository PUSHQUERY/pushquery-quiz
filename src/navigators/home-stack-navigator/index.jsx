import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// COMPONENTS
import HomeScreen from "../../screens/home-screen";
import QuizScreen from "../../screens/quiz-screen";

// FIREBASE CONFIGURATION
import { firebase } from "../../firebase/config";

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={firebase.auth().currentUser ? "Quiz" : "Home"}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Quiz' component={QuizScreen} />
    </Stack.Navigator>
  );
}
