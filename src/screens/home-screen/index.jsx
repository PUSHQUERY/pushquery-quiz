import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// REDUX ACTIONS
import {
  view,
  userFirstName,
  setVerificationCode,
  loadQuiz,
  loginCheck,
  userRecaptchaVerifier,
  submitVerificationCode,
} from "../../redux/slices/root-slice";

// COMPONENTS
import FirstNameInput from "../../components/organisms/first-name-input";
import CanIGetYourNumber from "../../components/organisms/can-i-get-your-number";
import VerificationCode from "../../components/organisms/verification-code";
import QuizCountdown from '../../components/organisms/quiz-countdown';

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

  // console.log('Date.now() - 1614703800', Date.now() - 1614703800000 < 1800);
  console.log("rootSlice", rootSlice);
  const VIEW_STATE = {
    NAME: (
      <FirstNameInput
        onSubmit={handleFirstNameSubmit}
        onChange={handleFirstNameChange}
      />
    ),
    PHONE_NUMBER: <CanIGetYourNumber setRecaptcha={setRecaptcha} />,
    VERIFICATION_CODE: (
      <VerificationCode onSubmit={submitCode} onChange={setCode} />
    ),
    QUIZ_COUNTDOWN: <QuizCountdown />,
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
