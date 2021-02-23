import React from "react";
import { Text, TextInput, Button } from "react-native";
import { useSelector } from "react-redux";

export default function FirstNameInput({ onSubmit, onChange }) {
  const rootSlice = useSelector((state) => state.rootSlice);
  return (
    <React.Fragment>
      <Text>I'm so happy we could find you,</Text>
      <TextInput
        style={{
          minWidth: 100,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(text) => onChange(text)}
        value={rootSlice.userFirstName}
        autoFocus
        autoCapitalize={"words"}
        onSubmitEditing={onSubmit}
      />
      <Button
        title='Send'
        disabled={!rootSlice.userFirstName}
        onPress={onSubmit}
      />
    </React.Fragment>
  );
}
