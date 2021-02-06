import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// IMPORT COMPONENTS
import HomeStackNavigator from '../home-stack-navigator';

// CREATE STACK
const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Root' component={HomeStackNavigator} />
    </Stack.Navigator>
  );
}
