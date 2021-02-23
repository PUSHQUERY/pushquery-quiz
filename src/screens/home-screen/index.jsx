import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

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
import CanIGetYourNumber from "../../components/organisms/can-i-get-your-number";
import VerificationCode from "../../components/organisms/verification-code";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const rootSlice = useSelector((state) => state.rootSlice);
  const current_view = useSelector((state) => state.rootSlice.view);

  const handleFirstNameChange = (firstName) => {
    dispatch(userFirstName(firstName));
  };

  const handleFirstNameSubmit = () => {
    dispatch(view("PHONE_NUMBER"));
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
    dispatch(submitVerificationCode({ navigation }));
  };

  const setRecaptcha = (recaptchaVerifier) => {
    dispatch(userRecaptchaVerifier(recaptchaVerifier));
  };

  React.useEffect(() => {
    if (rootSlice.view === "INITIAL") {
      dispatch(loginCheck());
    }
  }, []);

  console.log("rootSlice", rootSlice);
  const VIEW_STATE = {
    NAME: (
      <FirstNameInput
        onSubmit={handleFirstNameSubmit}
        onChange={handleFirstNameChange}
      />
    ),
    PHONE_NUMBER: (
      <CanIGetYourNumber
        onSubmit={handlePhoneNumberSubmit}
        onChange={setPhoneNumberCode}
        setRecaptcha={setRecaptcha}
      />
    ),
    VERIFICATION_CODE: (
      <VerificationCode onSubmit={submitCode} onChange={setCode} />
    ),
  };

  return <View style={styles.container}>{VIEW_STATE[current_view]}</View>;
}

// STYLE SHEET
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
