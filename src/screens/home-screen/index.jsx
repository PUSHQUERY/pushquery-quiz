import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// FIREBASE CONFIGURATION
import { firebase } from "../../firebase/config";

// REDUX ACTIONS
import {
  view,
  userFirstName,
  userPhoneNumber,
  setVerificationCode,
  loginCheck,
  submitPhoneNumber,
  userRecaptchaVerifier,
  submitVerificationCode,
} from "../../redux/slices/root-slice";

// COMPONENTS
import FirstNameInput from "../../components/organisms/first-name-input";
import SubjectShow from "../../components/organisms/subject-show";
import CanIGetYourNumber from "../../components/organisms/can-i-get-your-number";
import VerificationCode from "../../components/organisms/verification-code";
import OpeningScene from "../../components/organisms/opening-scene";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const rootSlice = useSelector((state) => state.rootSlice);

  const handleFirstNameChange = (firstName) => {
    dispatch(userFirstName(firstName));
  };

  const handleFirstNameSubmit = () => {
    dispatch(view("PHONE_INPUT"));
  };

  const handlePhoneNumberSubmit = () => {
    dispatch(submitPhoneNumber());
  };

  const setPhoneNumberCode = (phoneNumber) => {
    dispatch(userPhoneNumber(phoneNumber));
  };

  const setCode = (code) => {
    dispatch(setVerificationCode(code));
  };

  const submitCode = () => {
    dispatch(submitVerificationCode());
  };

  const setRecaptcha = (recaptchaVerifier) => {
    dispatch(userRecaptchaVerifier(recaptchaVerifier));
  };

  React.useEffect(() => {
    if (state.rootSlice.view === "INITIAL") {
      dispatch(loginCheck());
    }
  }, []);

  console.log("state.rootSlice", state.rootSlice);
  return (
    <View style={styles.container}>
      {rootSlice.view === "NAME" && (
        <FirstNameInput
          onSubmit={handleFirstNameSubmit}
          onChange={handleFirstNameChange}
        />
      )}
      {rootSlice.view === "PHONE_INPUT" && (
        <CanIGetYourNumber
          onSubmit={handlePhoneNumberSubmit}
          onChange={setPhoneNumberCode}
          setRecaptcha={setRecaptcha}
        />
      )}
      {rootSlice.view === "VERIFICATION_CODE" && (
        <VerificationCode
          onSubmit={submitCode}
          onChange={setCode}
        />
      )}
    </View>
  );
}

// STYLE SHEET
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
