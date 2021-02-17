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
  userPhoneNumber,
} from "../../../redux/slices/root-slice";

export default function CanIGetYourNumber({ onChange }) {
  const recaptchaVerifier = React.useRef(null);

  const dispatch = useDispatch();

  const [number, setNumber] = React.useState("");

  const rootSlice = useSelector((state) => state.rootSlice);

  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;

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
        onChangeText={(phoneNumber) => setNumber(phoneNumber)}
      />
      <Button
        title='Send'
        disabled={!number}
        onPress={async () => {
          try {
            dispatch(userPhoneNumber(number));
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verifyId = await phoneProvider.verifyPhoneNumber(
              number,
              recaptchaVerifier.current
            );
            setNumber("");
            dispatch(verificationId(verifyId));
            dispatch(view("VERIFICATION_CODE"));
          } catch (err) {
            console.log('err', err);
            dispatch(view("INITIAL"));
          }
        }}
      />
    </React.Fragment>
  );
}
