import React from "react";
import { Text, Pressable } from "react-native";
import { useSelector } from "react-redux";

export default function SubjectShow({ onSubmit }) {
  const rootSlice = useSelector((state) => state.rootSlice);
  return (
    <Pressable onPress={onSubmit}>
      <Text>{`Great ${rootSlice.userFirstName},`}</Text>
      <Text>{`We are going to learn about ${rootSlice.subject} today - let's go!`}</Text>
    </Pressable>
  );
}
