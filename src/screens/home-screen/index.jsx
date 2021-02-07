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

  handleVerificationCodeSubmit = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        rootSlice.verificationId,
        verificationCode
      );
      navigation.navigate("Quiz");
      await firebase.auth().signInWithCredential(credential);
      const storedUser = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const storedUserDoc = await storedUser.get();
      if (storedUserDoc.exists) {
        dispatch(userObj(storedUserDoc.data()));
        return;
      } else {
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
      }
    } catch (err) {
      dispatch(view("INITIAL"));
    }
  };

  handleOpeningSubmit = () => {
    if (firebase.auth().currentUser) {
      navigation.navigate("Quiz");
    } else {
      dispatch(view("FIRST_NAME"));
    }
  };

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
      {rootSlice.view === "PHONE_INPUT" && <CanIGetYourNumber />}
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
