import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// COMPONENTS
import HomeScreen from '../../screens/home-screen/';

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  );
}
