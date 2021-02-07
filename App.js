import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

// COMPONENTS
import Navigation from "./src/navigators/";
// REDUX
import { store } from "./src/redux/store";

export default function App() {

    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </Provider>
    );
  }
