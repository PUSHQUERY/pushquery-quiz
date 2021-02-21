import React from "react";
import { useSelector } from "react-redux";
import { TextInput, Text, Button } from "react-native";

export default function VerificationCode({ onSubmit, onChange }) {
  const rootSlice = useSelector((state) => state.rootSlice);
  return (
    <>
      <Text style={{ marginTop: 20 }}>
        Did you get the code that I sent you?
      </Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        // editable={!!phoneAuth.verificationId}
        placeholder='enter your verification code'
        onChangeText={(code) => onChange(code)}
      />
      <Button
        title='Confirm Verification Code'
        disabled={!rootSlice.verificationId}
        onPress={() => onSubmit()}
      />
    </>
  );
}
