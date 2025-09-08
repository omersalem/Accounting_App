import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/Auth/SignInScreen';

export type AuthStackParamList = {
  SignIn: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: 'Sign In' }}
      />
    </AuthStack.Navigator>
  );
}