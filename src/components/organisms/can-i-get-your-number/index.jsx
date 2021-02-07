import React from "react";
import { Text, TextInput, Button } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { useDispatch, useSelector } from "react-redux";

// FIREBASE CONFIGURATION
import { firebase } from "../../../firebase/config";

// REDUX ACTIONS
import {
  view,
  userFirstName,
  verificationId,
  phoneNumber,
} from "../../../redux/slices/root-slice";

export default function CanIGetYourNumber({ onChange }) {
  const recaptchaVerifier = React.useRef(null);

  const dispatch = useDispatch();

  const rootSlice = useSelector((state) => state.rootSlice);

  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;

  console.log(
    "rootSlice.attemptInvisibleVerification",
    rootSlice.attemptInvisibleVerification
  );
  return (
    <React.Fragment>
      <Text>Hey, in case we get lost. Can I get your number?</Text>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={rootSlice.attemptInvisibleVerification}
      />
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder='+1 999 999 9999'
        autoFocus
        enablesReturnKeyAutomatically
        autoCompleteType='tel'
        keyboardType='phone-pad'
        textContentType='telephoneNumber'
        onChangeText={(phoneNumber) => onChange(phoneNumber)}
      />
      <Button
        title='Send'
        disabled={!rootSlice.phoneNumber}
        onPress={async () => {
          try {
            console.log("line 52");
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verifyId = await phoneProvider.verifyPhoneNumber(
              rootSlice.phoneNumber,
              recaptchaVerifier.current
            );
            console.log("verifyId", verifyId);
            dispatch(verificationId(verifyId));
          } catch (err) {
            console.log("ERRROR", err);
            dispatch(view("PHONE_INPUT"));
          }
        }}
      />
    </React.Fragment>
  );
}
