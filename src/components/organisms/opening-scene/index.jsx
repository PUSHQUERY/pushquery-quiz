import React from "react";
import { Text, Pressable } from "react-native";
import { useSelector } from "react-redux";

export default function OpeningScene({ onSubmit }) {
  return (
    <Pressable onPress={onSubmit}>
      <Text>Welcome</Text>
    </Pressable>
  );
}
