import React from "react";
import { View, Text, Pressable } from "react-native";

// FIREBASE CONFIGURATION
// import { firebase } from "../../firebase/config";

export default function Question() {
  return (
    <View>
      <Text>QUESTION</Text>
      <Pressable>A</Pressable>
      <Pressable>B</Pressable>
      <Pressable>C</Pressable>
      <Pressable>D</Pressable>
    </View>
  );
}
