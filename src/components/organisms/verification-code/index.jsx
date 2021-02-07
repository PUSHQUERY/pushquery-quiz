import React from "react";
import { TextInput, Text } from "react-native";

export default function VerificationCode({ onSubmit, onChange }) {
  return (
    <>
      <Text style={{ marginTop: 20 }}>
        Did you get the code that I sent you?
      </Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        // editable={!!phoneAuth.verificationId}
        placeholder='enter your verification code'
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
      />
      {/* <Button
        title='Confirm Verification Code'
        disabled={!phoneAuth.verificationId}
        onPress={async () => {
          try {
            dispatch(view("LOGGED_IN"));

            const credential = firebase.auth.PhoneAuthProvider.credential(
              phoneAuth.verificationId,
              verificationCode
            );
            await firebase.auth().signInWithCredential(credential);
          } catch (err) {
            dispatch(view("PHONE_INPUT"));
          }
        }}
      /> */}
    </>
  );
}
