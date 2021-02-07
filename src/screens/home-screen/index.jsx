import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// FIREBASE CONFIGURATION
import { firebase } from "../../firebase/config";

// REDUX ACTIONS
import {
  view,
  userFirstName,
  verificationId,
  phoneNumber,
} from "../../redux/slices/root-slice";

// COMPONENTS
import FirstNameInput from "../../components/organisms/first-name-input";
import SubjectShow from "../../components/organisms/subject-show";
import CanIGetYourNumber from "../../components/organisms/can-i-get-your-number";
import VerificationCode from "../../components/organisms/verification-code";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const [verificationCode, setVerificationCode] = React.useState("");

  const rootSlice = useSelector((state) => state.rootSlice);

  handleFirstNameChange = (firstName) => {
    dispatch(userFirstName(firstName));
  };

  handleFirstNameSubmit = () => {
    dispatch(view("SUBJECT"));
  };

  handleSubjectSubmit = () => {
    dispatch(view("PHONE_INPUT"));
  };

  handleNumberChange = (number) => {
    dispatch(phoneNumber(number));
  };

  handleVerificationCodeSubmit = async () => {
    try {
      console.log("line 47");
      dispatch(view("LOGGED_IN"));

      const credential = firebase.auth.PhoneAuthProvider.credential(
        rootSlice.verificationId,
        verificationCode
      );
      await firebase.auth().signInWithCredential(credential);
    } catch (err) {
      dispatch(view("PHONE_INPUT"));
    }
  };

  React.useMemo(() => {
    if (rootSlice.verificationId.length) {
      dispatch(view("VERIFICATION_CODE"));
    }
  }, [rootSlice.verificationId]);

  console.log("rootSlice", rootSlice);
  console.log("firebase.auth().currentUser", firebase.auth().currentUser);
  return (
    <View style={styles.container}>
      {rootSlice.view === "FIRST_NAME" && (
        <FirstNameInput
          onSubmit={handleFirstNameSubmit}
          onChange={handleFirstNameChange}
        />
      )}
      {rootSlice.view === "SUBJECT" && (
        <SubjectShow onSubmit={handleSubjectSubmit} />
      )}
      {rootSlice.view === "PHONE_INPUT" && (
        <CanIGetYourNumber onChange={handleNumberChange} />
      )}
      {rootSlice.view === "VERIFICATION_CODE" && (
        <VerificationCode
          onSubmit={handleVerificationCodeSubmit}
          onChange={setVerificationCode}
        />
      )}
      {rootSlice.view === "LOGGED_IN" && <Text>WE'RE IN!</Text>}
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
