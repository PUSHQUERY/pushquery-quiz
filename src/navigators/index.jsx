import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

// IMPORT COMPONENTS
import RootNavigator from "./root-navigator";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
