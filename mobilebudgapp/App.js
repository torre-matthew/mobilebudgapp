import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, RefreshControl, Button } from 'react-native';
import * as Google from 'expo-google-app-auth'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './Screens/mainScreen';
import LoginScreen from './Screens/loginScreen';
import CreateNewBudgetScreen from './Screens/createNewBudgetScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
      <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
        />
        <Stack.Screen
          name="Create New Budget"
          component={CreateNewBudgetScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;