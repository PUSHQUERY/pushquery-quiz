import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// FIREBASE CONFIGURATION
import { firebase } from "../../firebase/config";

// REDUX ACTIONS
import {
  view,
  userFirstName,
  phoneNumber,
  userObj,
} from "../../redux/slices/root-slice";

// COMPONENTS
import FirstNameInput from "../../components/organisms/first-name-input";
import SubjectShow from "../../components/organisms/subject-show";
import CanIGetYourNumber from "../../components/organisms/can-i-get-your-number";
import VerificationCode from "../../components/organisms/verification-code";
import OpeningScene from "../../components/organisms/opening-scene";

export default function HomeScreen({ navigation }) {
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
      const credential = firebase.auth.PhoneAuthProvider.credential(
        rootSlice.verificationId,
        verificationCode
      );

      await firebase.auth().signInWithCredential(credential);
      await firebase.auth().currentUser.updateProfile({
        phoneNumber: rootSlice.phoneNumber,
        displayName: rootSlice.userFirstName,
      });
      const user = firebase.auth().currentUser;
      console.log("user", user);
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set({
          uid: firebase.auth().currentUser.uid,
          createdAt: new Date().getTime(),
          phoneNumber: rootSlice.phoneNumber,
          displayName: rootSlice.userFirstName,
        });
      console.log("SUCCESS");
      navigation.navigate("Quiz");
    } catch (err) {
      console.log("err - line 96", err);
      dispatch(view("PHONE_INPUT"));
    }
  };

  handleOpeningSubmit = () => {
    if (firebase.auth().currentUser) {
      navigation.navigate("Quiz");
    } else {
      dispatch(view("FIRST_NAME"));
    }
  };

  React.useMemo(() => {
    if (rootSlice.verificationId.length) {
      dispatch(view("VERIFICATION_CODE"));
    }
  }, [rootSlice.verificationId]);

  console.log("rootSlice", rootSlice);
  return (
    <View style={styles.container}>
      {rootSlice.view === "INITIAL" && (
        <OpeningScene onSubmit={handleOpeningSubmit} />
      )}
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
